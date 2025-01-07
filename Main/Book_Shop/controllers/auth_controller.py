from flask import render_template, request, redirect, url_for, flash
from flask_login import login_user, logout_user
from werkzeug.security import check_password_hash, generate_password_hash
from models import User
from extension import db


class AuthenticatorController:
    
    def sign_up(self):
        if request.method == 'POST':
            try:
                # Extracting user input from the form
                info = {
                    'name': request.form['name'],
                    'email': request.form['email'],
                    'password': request.form['password']
                }

                # Check if the user already exists in the database
                existing_user = User.query.filter_by(email=info['email']).one_or_none()

                if existing_user:
                    flash('کاربر از قبل وجود دارد')  # Notify that the user already exists
                    return redirect(url_for('sign_in'))  # Redirect to the sign-in page

                # Hashing the password for security
                hashed_password = info['password']
                new_user = User(name=info['name'], email=info['email'], password=hashed_password)

                # Add the new user to the database
                db.session.add(new_user)
                db.session.commit()

                # Log the user in and redirect to the homepage
                login_user(new_user)
                flash('ثبت‌نام با موفقیت انجام شد!')  # Notify successful registration
                return redirect(url_for('index'))

            except Exception as e:
                # Log and handle unexpected errors during the sign-up process
                print(e)

        # Render the registration page for GET requests
        return render_template('main/register.html')
    
    def sign_in(self):
        try:
            if request.method == 'POST':
                # Extract email and password from the form
                email = request.form['email']
                password = request.form['password']
                
                # Look up the user in the database
                user = User.query.filter_by(email=email).one_or_none()
                
                if user:
                    # Validate the provided password against the stored hash
                    if check_password_hash(user.password_hash, password):
                        login_user(user)  # Log the user in
                        return redirect(url_for('index'))  # Redirect to the homepage
                    else:
                        flash('username or pass invalid')  # Notify invalid credentials
                        return redirect(url_for('sign_in'))
                else:
                    flash('user not in web please register')  # Prompt the user to register
                    return redirect(url_for('sign_up'))

        except Exception as e:
            # Handle errors during the sign-in process
            flash('Error')
            print(e)
            return redirect(url_for('sign_in'))
        
        # Render the login page for GET requests
        return render_template('/main/login.html')
    

    def sign_out(self):
        # Log the user out and redirect to the homepage
        logout_user()
        return redirect(url_for('index'))
