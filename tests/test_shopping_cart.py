import sys
import os
# Adjusting the system path to include the parent directory for imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from app import app, db
from models import User, Book, Cart

# Fixture to provide a test client for simulating app requests
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client  # Provide the test client to test functions

# Fixture to create a sample user in the database
@pytest.fixture
def create_user():
    user = User(username='testuser', email='test@example.com', password='password')
    db.session.add(user)
    db.session.commit()  # Save the user to the database
    return user  # Return the user for use in tests

# Fixture to create a sample book in the database
@pytest.fixture
def create_book():
    book = Book(title='Test Book', price=29.99)  # Creating a book instance
    db.session.add(book)
    db.session.commit()  # Save the book to the database
    return book  # Return the book for use in tests

# Fixture to create a sample cart for a user in the database
@pytest.fixture
def create_cart(create_user):
    cart = Cart(user_id=create_user.id)  # Create a cart linked to the test user
    db.session.add(cart)
    db.session.commit()  # Save the cart to the database
    return cart  # Return the cart for use in tests

# Test for adding a book to the cart
def test_add_to_cart(client, create_user, create_book):
    # Simulate a POST request to add a book to the cart
    response = client.post('/add_to_cart', data=dict(
        book_id=create_book.id  # Book ID to add to the cart
    ), follow_redirects=True)

    # Assert the request was successful
    assert response.status_code == 200

    # Verify the cart exists for the user
    cart = Cart.query.filter_by(user_id=create_user.id).first()
    assert cart is not None

    # Check that the book was added to the cart
    assert len(cart.books) == 1

# Test for removing a book from the cart
def test_remove_from_cart(client, create_user, create_book, create_cart):
    # Add a book to the cart for setup
    cart = create_cart
    cart.books.append(create_book)  # Append the book to the cart
    db.session.commit()  # Save changes to the database

    # Simulate a POST request to remove the book from the cart
    response = client.post('/remove_from_cart', data=dict(
        book_id=create_book.id  # Book ID to remove from the cart
    ), follow_redirects=True)

    # Assert the request was successful
    assert response.status_code == 200

    # Verify the cart is empty after the book is removed
    cart = Cart.query.filter_by(user_id=create_user.id).first()
    assert len(cart.books) == 0
