from flask import Blueprint, request, jsonify, make_response, current_app
from werkzeug.security import generate_password_hash
import jwt
from datetime import datetime, timedelta
from models.models import User, db
from functools import wraps

auth_bp = Blueprint('auth', __name__)

# Token Required Decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')

        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['user_id']).first()
        except:
            return jsonify({'error': 'Token is invalid'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Validate required fields
    if not all(k in data for k in ('username', 'email', 'password')):
        return jsonify({'error': 'Missing required fields'}), 400

    # Check existing user
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400

    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already taken'}), 400

    try:
        hashed_password = generate_password_hash(data['password'])
        new_user = User(
            username=data['username'],
            email=data['email'],
            password=hashed_password
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    current_app.logger.info("Login attempt received")

    data = request.get_json()
    current_app.logger.debug(f"Login data received: {data}")

    if not all(k in data for k in ('username', 'password')):
        return jsonify({'error': 'Missing credentials'}), 400

    try:
        user = User.query.filter_by(username=data['username'].lower().strip()).first()
        current_app.logger.debug(f"User found: {user is not None}")
        if user:
            print(f"User found: {user.username}")
            print(f"Password hash: {user.password}")
            print(f"Password valid: {generate_password_hash('123456')}")
        if not user:
            current_app.logger.warning(f"User not found: {data.get('username')}")
            return jsonify({'error': 'Invalid credentials'}), 401

        # Debug password check
        password_valid = user.check_password(data['password'])
        current_app.logger.debug(f"Password valid: {password_valid}")

        if not password_valid:
            current_app.logger.warning(f"Invalid password for user: {user.username}")
            return jsonify({'error': 'Invalid credentials'}), 401

        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, current_app.config['SECRET_KEY'])

        response = make_response(jsonify({
            'message': 'Login successful',
            'user': user.to_dict(),
            'redirect': '/dashboard'
        }))

        response.set_cookie(
            'token',
            token,
            httponly=True,
            secure=False,  # Set True in production
            samesite='Lax',
            max_age=86400  # 24 hours
        )

        current_app.logger.info(f"Successful login for user: {user.username}")
        return response

    except Exception as e:
        current_app.logger.error(f"Login error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/logout')
def logout():
    response = make_response(jsonify({'message': 'Logout successful'}))
    response.set_cookie('token', '', expires=0)
    return response

@auth_bp.route('/check')
def check_auth():
    token = request.cookies.get('token')
    if not token:
        return jsonify({
                    'authenticated': False,
                    'message': 'No token found'
                }), 200  #

    try:
        data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
        user = User.query.filter_by(id=data['user_id']).first()
        if user:
            return jsonify({
                'authenticated': True,
                'user': user.to_dict()
            })
        return jsonify({
            'authenticated': False,
            'message': 'User not found'
        }), 200
    except:
        return jsonify({
            'authenticated': False,
            'message': 'Invalid token'
        }), 200

@auth_bp.route('/profile')
@token_required
def get_profile(current_user):
    return jsonify(current_user.to_dict())

# Error handlers
@auth_bp.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Not found'}), 404

@auth_bp.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Internal server error'}), 500

# Optional: Password reset functionality
@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()

    if not data or 'email' not in data:
        return jsonify({'error': 'Email is required'}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({'error': 'Email not found'}), 404

    # Generate password reset token
    reset_token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(hours=1)
    }, current_app.config['SECRET_KEY'])

    # Here you would typically send an email with the reset token
    # For now, we'll just return it in the response
    return jsonify({
        'message': 'Password reset instructions sent',
        'reset_token': reset_token
    })

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()

    if not all(k in data for k in ('reset_token', 'new_password')):
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        token_data = jwt.decode(data['reset_token'],
                              current_app.config['SECRET_KEY'],
                              algorithms=["HS256"])

        user = User.query.get(token_data['user_id'])
        if not user:
            return jsonify({'error': 'User not found'}), 404

        user.password = generate_password_hash(data['new_password'])
        db.session.commit()

        return jsonify({'message': 'Password reset successful'})
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Reset token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid reset token'}), 401
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Optional: Update user profile
@auth_bp.route('/update-profile', methods=['PUT'])
@token_required
def update_profile(current_user):
    data = request.get_json()

    try:
        if 'username' in data and data['username'] != current_user.username:
            if User.query.filter_by(username=data['username']).first():
                return jsonify({'error': 'Username already taken'}), 400
            current_user.username = data['username']

        if 'email' in data and data['email'] != current_user.email:
            if User.query.filter_by(email=data['email']).first():
                return jsonify({'error': 'Email already registered'}), 400
            current_user.email = data['email']

        if 'password' in data:
            current_user.password = generate_password_hash(data['password'])

        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
