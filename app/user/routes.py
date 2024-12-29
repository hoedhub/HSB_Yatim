from flask import Blueprint, jsonify
from app.auth.helpers import token_required
from models.models import User

user_bp = Blueprint('user', __name__)

@user_bp.route('/')
@token_required
def get_users(current_user):
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@user_bp.route('/profile')
@token_required
def get_profile(current_user):
    return jsonify(current_user.to_dict())
