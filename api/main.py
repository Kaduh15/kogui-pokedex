from flask import Flask
from flask_jwt_extended import JWTManager
from config import Config
from database import init_db

from routes.auth_routes import auth_routes


jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    init_db(app)
    jwt.init_app(app)

    app.register_blueprint(auth_routes, url_prefix="/auth")

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
