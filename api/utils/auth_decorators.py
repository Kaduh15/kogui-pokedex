from functools import wraps
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.usuario_model import UsuarioModel
from utils.http_status import HttpStatus


def auth_required(f):
    """
    Decorator que requer autenticação JWT válida.
    Adiciona o usuário atual ao contexto da função.
    """

    @wraps(f)
    @jwt_required()
    def decorated_function(*args, **kwargs):
        try:
            current_user_id = get_jwt_identity()
            current_user = UsuarioModel.query.get(int(current_user_id))

            if not current_user:
                return (
                    jsonify({"message": "User not found"}),
                    HttpStatus.UNAUTHORIZED,
                )

            # Passar o usuário para a função
            return f(current_user=current_user, *args, **kwargs)

        except Exception as e:
            print(f"Error occurred: {e}")
            return (
                jsonify({"message": "Invalid token"}),
                HttpStatus.UNAUTHORIZED,
            )

    return decorated_function
