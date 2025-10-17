from __future__ import annotations

from datetime import datetime
from typing import Dict, Any

from database import db


class UsuarioModel(db.Model):
    """Model para usuários do sistema.

    Campos seguem a modelagem proposta:
    - id (IDUsuario)
    - nome, login, email, senha
    - dt_inclusao, dt_alteracao

    Relações:
    - pokemons: lista de `PokemonUsuarioModel` pertencentes ao usuário
    """

    __tablename__ = "usuarios"

    id = db.Column("IDUsuario", db.Integer, primary_key=True)
    nome = db.Column("Nome", db.String(100), nullable=False)
    login = db.Column("Login", db.String(100), unique=True, nullable=False)
    email = db.Column("Email", db.String(100), unique=True, nullable=False)
    senha = db.Column("Senha", db.String(255), nullable=False)
    dt_inclusao = db.Column("DtInclusao", db.DateTime, default=datetime.utcnow)
    dt_alteracao = db.Column("DtAlteracao", db.DateTime, onupdate=datetime.utcnow)

    pokemons = db.relationship(
        "PokemonUsuarioModel", back_populates="usuario", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Usuario {self.nome}>"

    def to_dict(self) -> Dict[str, Any]:
        """Retorna o usuário como dict incluindo campos não-sensíveis.

        Nota: este método atualmente inclui a senha (campo `senha`). Para
        enviar dados ao cliente, utilize `to_safe_dict`.
        """
        return {
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
            "senha": self.senha,
            "dt_inclusao": self.dt_inclusao.isoformat() if self.dt_inclusao else None,
            "dt_alteracao": (
                self.dt_alteracao.isoformat() if self.dt_alteracao else None
            ),
        }

    def to_safe_dict(self) -> Dict[str, Any]:
        """Retorna dicionário seguro para exposição pública (sem senha)."""
        data = self.to_dict()
        data.pop("senha", None)
        return data
