from flask import render_template, redirect, request, url_for
from extension import db
from models import Book

class VisitorController:
    def index(self):
        # Fetch the first 8 books from the database for the homepage preview
        books = Book.query.limit(8).all()
        # Render the preview page with the retrieved books and set the current page to 'home'
        return render_template('/main/preview.html', books=books, current_page='home')
    
    def book_dateil(self):
        # Get the book ID from the query string
        book_id = request.args.get('book_id')
        # Fetch the book details by its ID, or return None if not found
        book = Book.query.filter_by(id=book_id).one_or_none()
        if book:
            # Render the book detail page with the book information if it exists
            return render_template('main/book-dateil.html', book=book)
        # Render the book detail page with no book information if the ID is invalid
        return render_template('main/book-dateil.html', book=book)

    def book_shop(self):
        # Placeholder function for the book shop; no functionality implemented yet
        return render_template()

    def blog(self):
        # Placeholder function for the blog section; no functionality implemented yet
        return render_template()

    def about_us(self):
        # Render the "About Us" page
        return render_template('/main/about-us.html')

    def contact_us(self):
        # Render the "Contact Us" page
        return render_template('main/contact-us.html')
