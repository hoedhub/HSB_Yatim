from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, username: str, email: str, password: str):
        if not username or not email or not password:
            raise ValueError("All fields are required")

        if len(password) < 6:
            raise ValueError("Password must be at least 6 characters long")

        self.username = username.lower().strip()  # Normalize username
        self.email = email.lower().strip()  # Normalize email
        self.password = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        if not password:
            return False
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }
