from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

from models.usuario_model import UsuarioModel
from models.pokemon_usuario_model import PokemonUsuarioModel
from models.pokemon_tipe_model import TipoPokemonModel
from models.pokemon_usuario_tipo_model import PokemonUsuarioTipoModel


def init_db(app):
    """
    The function `init_db` initializes the database for a Flask application.
    """
    db.init_app(app)
    with app.app_context():
        db.create_all()
    return db
