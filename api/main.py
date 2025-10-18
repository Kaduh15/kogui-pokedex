from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from database import init_db

from routes.user_routes import user_routes
from routes.auth_routes import auth_routes
from routes.pokemon_routes import pokemon_routes

from utils.http_status import HttpStatus


jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    init_db(app)
    jwt.init_app(app)

    @app.route("/health", methods=["GET"])
    def health_check():
        return {"status": "ok"}, HttpStatus.OK

    @app.route("/", methods=["GET"])
    def index():
        return {"message": "Welcome to the Kogui Pokedex API!"}, HttpStatus.OK

    app.register_blueprint(auth_routes, url_prefix="/auth")
    app.register_blueprint(pokemon_routes, url_prefix="/api")
    app.register_blueprint(user_routes, url_prefix="/api")

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
