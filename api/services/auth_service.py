from models.usuario_model import UsuarioModel
from flask_jwt_extended import create_access_token
from utils.hash import hash_password, check_password
from database import db


class AuthService:
    @staticmethod
    def register_user(data):
        hash_senha = hash_password(data["senha"])
        data["senha"] = hash_senha

        user = UsuarioModel(**data)
        db.session.add(user)
        db.session.commit()

        token = create_access_token(identity=str(user.id))

        return user, token

    @staticmethod
    def get_user_by_unique_field(field, value):
        if field not in ["login", "email"]:
            raise ValueError("Field must be either 'login' or 'email'")
        attr = getattr(UsuarioModel, field)
        return UsuarioModel.query.filter(attr == value).first()

    @staticmethod
    def authenticate_user(email, password):

        user = AuthService.get_user_by_unique_field("login", email)

        if not user:
            user = AuthService.get_user_by_unique_field("email", email)

        if not user:
            return None, None

        if check_password(password, user.senha):
            token = create_access_token(identity=str(user.id))
            return user, token

        return None, None
