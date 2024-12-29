from flask import request, jsonify, redirect, current_app
from flask.wrappers import Response as FlaskResponse
from werkzeug.wrappers.response import Response as WerkzeugResponse
import jwt
from typing import Optional, Tuple, Union

ResponseType = Union[FlaskResponse, WerkzeugResponse]

class AuthMiddleware:
    def __init__(self):
        # Static files that are always accessible
        self.public_static = {
            '/favicon.ico',
            '/global.css',
            '/build/bundle.css',
            '/build/bundle.js',
            '/build/bundle.js.map',
        }

        # Pages that can be accessed without authentication
        self.public_pages = {
            '/login',
            '/register'
        }

        # API endpoints that are always accessible
        self.public_api_endpoints = {
            '/api/auth/login',
            '/api/auth/register',
            '/api/auth/check'
        }

        # Routes that should redirect to dashboard if logged in
        self.auth_redirect_routes = {
            '/login',
            '/register',
            '/'
        }

        # Static file extensions
        self.static_extensions = {
            '.js', '.css', '.ico', '.png', '.jpg',
            '.jpeg', '.gif', '.svg', '.map'
        }

    def is_static_file(self, path: str) -> bool:
        """Check if the path is a static file"""
        return any(path.endswith(ext) for ext in self.static_extensions) or \
               path in self.public_static or \
               path.startswith('/build/')

    def verify_token(self, token: str) -> bool:
        """Verify JWT token"""
        try:
            jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            return True
        except:
            return False

def auth_middleware() -> Optional[Union[ResponseType, Tuple[FlaskResponse, int]]]:
    """Main middleware function"""
    current_app.logger.debug(f"Processing request for path: {request.path}")

    auth = AuthMiddleware()
    current_path = request.path.rstrip('/')  # Normalize path by removing trailing slash

    # Debug log
    current_app.logger.debug(f"Checking path: {current_path}")
    current_app.logger.debug(f"Public pages: {auth.public_pages}")

    # Step 1: Allow static files without any checks
    if auth.is_static_file(current_path):
        current_app.logger.debug(f"Allowing static file: {current_path}")
        return None

    # Get token from cookies
    token = request.cookies.get('token')
    is_authenticated = token and auth.verify_token(token)
    current_app.logger.debug(f"Authentication status: {is_authenticated}")

    # Step 2: Handle public pages BEFORE handling root route
    if current_path == '/register' or current_path == '/login':
        current_app.logger.debug(f"Processing auth page: {current_path}")
        if is_authenticated:
            current_app.logger.debug("User is authenticated, redirecting to dashboard")
            return redirect('/dashboard')
        current_app.logger.debug("Allowing access to auth page")
        return None

    # Step 3: Handle API routes
    if current_path.startswith('/api/'):
        current_app.logger.debug(f"Processing API route: {current_path}")
        if current_path in auth.public_api_endpoints:
            return None
        if not is_authenticated:
            return jsonify({'error': 'Unauthorized'}), 401
        return None

    # Step 4: Handle root route
    if current_path == '' or current_path == '/':
        current_app.logger.debug("Processing root route")
        if is_authenticated:
            return redirect('/dashboard')
        return redirect('/login')

    # Step 5: All other routes require authentication
    if not is_authenticated:
        current_app.logger.debug(f"Unauthorized access attempt to: {current_path}")
        return redirect('/login')

    current_app.logger.debug(f"Allowing access to: {current_path}")
    return None
