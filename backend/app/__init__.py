import os
from flask import Flask, render_template, request, session, redirect
from flask_migrate import Migrate
from .models.db import db
from .models.game import Games
from .models.lesson import Lesson
from .models.user import User
from .config import Config
from flask_cors import CORS
from .api.game_route import game_routes
from .api.lesson_route import lesson_routes
from .api.user_route import user_routes
from flask_login import LoginManager


def create_app():
    app = Flask(__name__, static_folder="../../frontend/dist", static_url_path="/")

    # Registering the .env files
    app.config.from_object(Config)
    db.init_app(app)

    # Helps to cookie
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
    app.config['SESSION_COOKIE_SECURE'] = True 

    Migrate(app, db)

    # Application Security
    CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

    login_manager = LoginManager()
    login_manager.login_view = "user.login_to_account"
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(user_id)

    app.register_blueprint(user_routes, url_prefix="/api/user")
    app.register_blueprint(game_routes, url_prefix="/api/game")
    app.register_blueprint(lesson_routes, url_prefix="/api/lesson")


    @app.before_request
    def https_redirect():
        if os.environ.get("FLASK_ENV") == "production":
            if request.headers.get("X-Forwarded-Proto") == "http":
                url = request.url.replace("http://", "https://", 1)
                code = 301
                return redirect(url, code=code)

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def react_root(path):
        if path == "favicon.ico":
            return app.send_from_directory("public", "favicon.ico")
        return app.send_static_file("index.html")


    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file("index.html")

    return app

app = create_app()
if __name__ == '__main__':
    app.run(debug=True)