import sys
import os
# Adding the parent directory to the system path to enable importing modules from the project
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from app import app, db
from models import User

# Pytest fixture to provide a test client for simulating requests to the Flask app
@pytest.fixture
def client():
    # Creating a test client context for the app
    with app.test_client() as client:
        yield client  # Yield the client for use in test functions

# Pytest fixture to create a test user in the database for authentication tests
@pytest.fixture
def create_user():
    # Creating a test user instance
    user = User(username='testuser', email='test@example.com', password='password')
    db.session.add(user)  # Add the user to the database session
    db.session.commit()   # Commit the session to save the user in the database
    return user  # Return the created user for use in tests

# Test to verify successful login with valid credentials
def test_login_success(client, create_user):
    # Sending a POST request to the /login route with valid credentials
    response = client.post('/login', data=dict(
        email='test@example.com',
        password='password'
    ), follow_redirects=True)  # Follow redirects to ensure we see the final page
    
    # Assert that the response status code is 200 (OK)
    assert response.status_code == 200
    # Check if the success message containing the username appears in the response data
    assert b'Welcome, testuser!' in response.data

# Test to verify login failure with invalid credentials
def test_login_failure(client):
    # Sending a POST request to the /login route with incorrect credentials
    response = client.post('/login', data=dict(
        email='wrong@example.com',
        password='wrongpassword'
    ), follow_redirects=True)  # Follow redirects to ensure we see the final page
    
    # Assert that the response status code is 200 (OK)
    assert response.status_code == 200
    # Check if the error message indicating invalid credentials appears in the response data
    assert b'Invalid email or password' in response.data
