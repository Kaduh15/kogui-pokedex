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
    def authenticate_user(login_or_email, password):
        """
        Autentica um usuário usando login/email e senha.

        Args:
            login_or_email (str): Login ou email do usuário
            password (str): Senha do usuário

        Returns:
            tuple: (UsuarioModel, token) se autenticação bem-sucedida,
                   (None, None) caso contrário
        """
        # Tentar buscar por login primeiro
        user = AuthService.get_user_by_unique_field("login", login_or_email)

        # Se não encontrou por login, tentar por email
        if not user:
            user = AuthService.get_user_by_unique_field(
                "email",
                login_or_email
            )

        # Se usuário não existe, retorna None
        if not user:
            return None, None

        # Verificar a senha
        if check_password(password, user.senha):
            # Gerar token JWT
            token = create_access_token(identity=str(user.id))
            return user, token

        return None, None
