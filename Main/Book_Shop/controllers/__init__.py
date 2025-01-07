# Importing necessary controllers from the current package
from .visitor_controller import VisitorController  # Handles visitor-related operations
from .auth_controller import AuthenticatorController  # Manages authentication logic
from .user_controller import UserController  # Deals with user-related functionalities

# Initializing an instance of VisitorController
visitor = VisitorController()  # Creates a visitor object to manage visitor operations

# Initializing an instance of AuthenticatorController
authenticator = AuthenticatorController()  # Creates an authenticator object for authentication tasks

# Initializing an instance of UserController
user = UserController()  # Creates a user object for handling user-specific actions
