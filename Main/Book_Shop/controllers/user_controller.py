from flask import render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_user, logout_user, current_user
from extension import create_app, db
from models import User, Book, Order, OrderItem


class UserController:
    app = create_app()

    # Display the current user's basket
    def user_current_basket(self):
        # Find the user's current open order (not finalized)
        order_target = Order.query.filter_by(user_id=current_user.id, status=False).first()
        
        # Retrieve all items in the order and their corresponding book details
        get_order_items_target = (
            db.session.query(OrderItem, Book)
            .join(Book, OrderItem.book_id == Book.id)
            .filter(OrderItem.order_id == order_target.id)
            .all()
        )
        
        # Prepare data for the template
        items = []
        for item, book in get_order_items_target:
            items.append({
                'cover_image': book.cover_image,
                'persian_title': book.persian_title,
                'price': book.price,
                'quantity': item.quantity
            })
        
        # Render the current basket template
        return render_template('/main/current-basket.html', items=items)

    # Route to add a book to the user's cart
    @staticmethod
    @app.route('/user/add-to-cart', methods=['POST'])
    def user_add_to_card():
        try:
            # Parse request data
            data = request.json
            book_id = data.get('book_id')
            quantity = 1  # Default quantity

            # Validate the book ID
            if not book_id:
                return jsonify({"status": "error", "message": "شناسه کتاب معتبر نیست!"}), 400
            
            # Find the book in the database
            book_target = Book.query.filter_by(id=book_id).first()
            if not book_target:
                return jsonify({"status": "error", "message": f"کتاب با شناسه {book_id} یافت نشد!"}), 404
            
            # Check if enough stock is available
            if book_target.stock < quantity:
                return jsonify({"status": "error", "message": f"موجودی برای {book_target.persian_title} کافی نیست!"}), 400
        
            # Check if the user already has an open order
            check_exist_order = Order.query.filter_by(user_id=current_user.id, status=False).first()
            if check_exist_order:
                # If the item already exists in the order, increase its quantity
                exist_order_item = OrderItem.query.filter(OrderItem.order_id == check_exist_order.id, OrderItem.book_id == book_id).first()
                if exist_order_item:
                    exist_order_item.quantity += 1
                    db.session.commit()
                else:
                    # Add the book to the existing order as a new item
                    new_order_item = OrderItem(
                        order_id=check_exist_order.id,
                        book_id=book_target.id,
                        quantity=quantity,
                        price=quantity * book_target.price
                    )
                    db.session.add(new_order_item)
                # Update the total price of the order
                check_exist_order.total_price += quantity * book_target.price
            else:
                # If no open order exists, create a new order
                new_order = Order(
                    user_id=current_user.id,
                    total_price=0
                )
                new_order.update_order_date()  # Set the current date for the new order
                db.session.add(new_order)
                db.session.commit()

                # Add the selected book to the new order
                new_order_items = OrderItem(
                    order_id=new_order.id,
                    book_id=book_target.id,
                    quantity=quantity,
                    price=book_target.price
                )
                db.session.add(new_order_items)
            
            # Reduce the stock of the selected book
            book_target.stock -= quantity
            db.session.commit()

            # Return success response
            return jsonify({"status": "success", "message": "سفارش با موفقیت ثبت شد!"})

        except Exception as e:
            # Handle exceptions and rollback changes
            print(e)
            db.session.rollback()
            return jsonify({"status": "error", "message": f"خطا: {str(e)}"}), 500

    # Display all products
    def user_all_product(self):
        books = Book.query.all()  # Retrieve all books
        return render_template('/main/all-product.html', books=books, current_page='stock')

    # Search for a product
    def user_result_search(self):
        target = request.args.get('search')  # Get the search query
        result = Book.query.filter(Book.persian_title.contains(target)).all()  # Filter books by title
        return render_template('/main/result-search.html', result=result)

    # Update and display user information
    def user_info(self):
        if request.method == 'POST':
            try:
                # Collect user input from the form
                data = {
                    'name': request.form['name'],
                    'number': request.form['number'],
                    'zipcode': request.form['zipcode'],
                    'address': request.form['address'],
                    'email': request.form['email'],
                }

                # Update current user's details
                if data['name'] != '':
                    current_user.name = data['name']
                
                if data['email'] != '':
                    current_user.email = data['email']
                
                current_user.number = data['number']
                current_user.zipcode = data['zipcode']
                current_user.address = data['address']

                # Save changes to the database
                db.session.commit()

                return redirect(url_for('index'))

            except Exception as e:
                # Print errors to the console for debugging
                print(e)

        # Render the user information template
        return render_template('/main/userinfo.html')
