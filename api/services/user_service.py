from models.usuario_model import UsuarioModel
from database import db


class UserService:
    @staticmethod
    def reset_password(user_id, new_hashed_password):
        user = UsuarioModel.query.get(user_id)
        if not user:
            return False

        user.password = new_hashed_password
        db.session.commit()
        return True
