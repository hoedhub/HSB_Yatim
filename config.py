import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    # Database
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'database.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Security
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hsb-yatim-jaya'  # Change in production
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'hsb-yatim-jwt'  # Change in production

    # Session/Cookie
    SESSION_COOKIE_SECURE = False  # Set to True in production
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'  # Set to 'Strict' in production

    # JWT
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)

    # Debug
    DEBUG = True  # Set to False in production

    # Logging
    LOGGING_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    LOG_LEVEL = 'DEBUG'  # Set to 'INFO' or 'WARNING' in production
