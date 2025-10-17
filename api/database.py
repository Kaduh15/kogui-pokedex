from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# Import models after db creation to avoid circular imports
def import_models():
    from models.usuario_model import UsuarioModel  # noqa: F401
    from models.pokemon_usuario_model import PokemonUsuarioModel  # noqa: F401
    from models.pokemon_tipe_model import TipoPokemonModel  # noqa: F401
    from models.pokemon_usuario_tipo_model import PokemonUsuarioTipoModel  # noqa: F401


def init_db(app):
    """
    The function `init_db` initializes the database for a Flask application.
    """
    db.init_app(app)
    import_models()  # Import models here
    with app.app_context():
        db.create_all()
    return db
