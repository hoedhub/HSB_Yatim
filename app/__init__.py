from flask import (
    Flask,
    send_from_directory,
    jsonify,
    send_file,
    request,
    redirect
)
from flask_migrate import Migrate
from flask_cors import CORS
from pathlib import Path
import mimetypes
import os
from config import Config
from models.models import db

# Add MIME types
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('image/svg+xml', '.svg')
mimetypes.add_type('image/x-icon', '.ico')

def register_static_routes(app, client_dir):
    """Register routes for static files"""
    @app.route('/build/<path:filename>')
    def serve_build(filename):
        try:
            return send_from_directory(
                os.path.join(client_dir, 'build'),
                filename,
                mimetype=mimetypes.guess_type(filename)[0] or 'application/octet-stream'
            )
        except Exception as e:
            app.logger.error(f"Error serving build file: {e}")
            return jsonify({'error': 'Not Found'}), 404

    @app.route('/favicon.ico')
    def favicon():
        try:
            return send_from_directory(
                client_dir,
                'favicon.ico',
                mimetype='image/x-icon'
            )
        except Exception as e:
            app.logger.error(f"Error serving favicon: {e}")
            return jsonify({'error': 'Not Found'}), 404

    @app.route('/global.css')
    def global_css():
        try:
            return send_from_directory(
                client_dir,
                'global.css',
                mimetype='text/css'
            )
        except Exception as e:
            app.logger.error(f"Error serving global.css: {e}")
            return jsonify({'error': 'Not Found'}), 404

def create_app(config_class=Config):
    # Define absolute paths
    root_dir = Path(__file__).parent.parent.absolute()
    client_dir = str(root_dir / 'client' / 'public')

    app = Flask(__name__, static_folder=None)  # Disable default static handler

    # Configure app
    app.config.from_object(config_class)

    # Debug logging
    app.logger.info(f"Root directory: {root_dir}")
    app.logger.info(f"Client directory: {client_dir}")

    # Initialize extensions
    CORS(app, supports_credentials=True)
    db.init_app(app)
    Migrate(app, db)

    with app.app_context():
        db.create_all()

    # Register static file routes first
    register_static_routes(app, client_dir)

   # Register page routes BEFORE middleware
    @app.route('/login/')  # Tambahkan trailing slash option
    @app.route('/login')
    def login_page():
        return send_file(os.path.join(client_dir, 'index.html'))

    @app.route('/register/')  # Tambahkan trailing slash option
    @app.route('/register')
    def register_page():
        return send_file(os.path.join(client_dir, 'index.html'))

    @app.route('/dashboard/')  # Tambahkan trailing slash option
    @app.route('/dashboard')
    def dashboard_page():
        return send_file(os.path.join(client_dir, 'index.html'))

    # Register blueprints
    from app.auth.routes import auth_bp
    from app.user.routes import user_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/users')

    # Register middleware AFTER routes
    from app.common.middleware import auth_middleware
    app.before_request(auth_middleware)

    # Error handlers
    @app.errorhandler(404)
    def not_found(e):
        if request.path.startswith('/api/'):
            return jsonify({'error': 'Not found'}), 404
        return send_file(os.path.join(client_dir, 'index.html'))

    # Catch-all route harus jadi yang TERAKHIR
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def catch_all(path):
        try:
            if path.startswith('api/'):
                return jsonify({'error': 'Not Found'}), 404
            return send_file(os.path.join(client_dir, 'index.html'))
        except Exception as e:
            app.logger.error(f"Error serving {path}: {e}")
            return jsonify({'error': 'Not Found'}), 404

    return app
