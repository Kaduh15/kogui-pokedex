from datetime import datetime
from database import db


class UsuarioModel(db.Model):
    __tablename__ = "usuarios"

    id = db.Column("IDUsuario", db.Integer, primary_key=True)
    nome = db.Column("Nome", db.String(100), nullable=False)
    email = db.Column("Email", db.String(100), unique=True, nullable=False)
    senha = db.Column("Senha", db.String(255), nullable=False)
    dt_inclusao = db.Column("DtInclusao", db.DateTime, default=datetime.utcnow)
    dt_alteracao = db.Column(
        "DtAlteracao", db.DateTime, onupdate=datetime.utcnow
    )

    pokemons = db.relationship(
        "PokemonUsuarioModel",
        back_populates="usuario",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<User {self.nome}>"

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
            "senha": self.senha,
            "dt_inclusao": (
                self.dt_inclusao.isoformat() if self.dt_inclusao else None
            ),
            "dt_alteracao": (
                self.dt_alteracao.isoformat() if self.dt_alteracao else None
            ),
        }

    def to_safe_dict(self):
        """Retorna um dicionário representando o usuário,
        excluindo campos sensíveis como a senha.
        """
        user_dict = self.to_dict()
        user_dict.pop("senha", None)
        return user_dict
