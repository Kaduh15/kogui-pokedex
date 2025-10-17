from __future__ import annotations

from typing import Dict, Any

from database import db


class TipoPokemonModel(db.Model):
    """Model que representa um tipo de Pokémon (ex: Fogo, Água, Planta...)."""

    __tablename__ = "tipos_pokemon"

    id = db.Column("IDTipoPokemon", db.Integer, primary_key=True)
    descricao = db.Column("Descricao", db.String(50), unique=True, nullable=False)

    pokemons = db.relationship("PokemonUsuarioTipoModel", back_populates="tipo")

    def __repr__(self) -> str:  # pragma: no cover - trivial
        return f"<TipoPokemon {self.descricao}>"

    def to_dict(self) -> Dict[str, Any]:
        return {"id": self.id, "descricao": self.descricao}
