import sys
import os
# Adding the parent directory to the system path to allow imports from the project
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from app import app, db
from models import User

# Fixture to provide a test client for the Flask application
@pytest.fixture
def client():
    # Creating a test client for simulating requests
    with app.test_client() as client:
        yield client  # Yield the client to be used in test functions

# Test to verify successful user registration
def test_register_success(client):
    # Sending a POST request to the /register route with valid data
    response = client.post('/register', data=dict(
        username='newuser',  # Username for the new user
        email='newuser@example.com',  # Email address for the new user
        password='password',  # Password for the new user
        confirm_password='password'  # Confirm password matching the original password
    ), follow_redirects=True)  # Follow redirects to the final response
    
    # Assert the response status code is 200 (OK)
    assert response.status_code == 200
    # Check if the success message appears in the response data
    assert b'Account created successfully' in response.data
    
    # Verify the user is successfully added to the database
    user = User.query.filter_by(email='newuser@example.com').first()
    assert user is not None  # Assert the user exists in the database

# Test to verify failure of user registration due to mismatched passwords
def test_register_failure(client):
    # Sending a POST request to the /register route with mismatched passwords
    response = client.post('/register', data=dict(
        username='newuser',  # Username for the new user
        email='newuser@example.com',  # Email address for the new user
        password='password',  # Original password
        confirm_password='differentpassword'  # Confirm password that doesn't match
    ), follow_redirects=True)  # Follow redirects to the final response

    # Assert the response status code is 200 (OK)
    assert response.status_code == 200
    # Check if the error message indicating mismatched passwords appears in the response data
    assert b'Passwords must match' in response.data
