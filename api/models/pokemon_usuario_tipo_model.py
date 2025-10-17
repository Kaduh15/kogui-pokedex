from __future__ import annotations

from typing import Any, Dict

from database import db


class PokemonUsuarioTipoModel(db.Model):
    """Associação many-to-many entre `PokemonUsuarioModel` e `TipoPokemonModel`.

    Chaves compostas: (IDPokemonUsuario, IDTipoPokemon)
    """

    __tablename__ = "pokemon_usuario_tipo"

    id_pokemon_usuario = db.Column(
        "IDPokemonUsuario",
        db.Integer,
        db.ForeignKey("pokemons_usuario.IDPokemonUsuario"),
        primary_key=True,
    )
    id_tipo_pokemon = db.Column(
        "IDTipoPokemon",
        db.Integer,
        db.ForeignKey("tipos_pokemon.IDTipoPokemon"),
        primary_key=True,
    )

    pokemon = db.relationship("PokemonUsuarioModel", back_populates="tipos")
    tipo = db.relationship("TipoPokemonModel", back_populates="pokemons")

    def __repr__(self) -> str:  # pragma: no cover - trivial
        return (
            f"<PokemonUsuarioTipo PokemonID: {self.id_pokemon_usuario}, "
            f"TipoID: {self.id_tipo_pokemon}>"
        )

    def to_dict(self) -> Dict[str, Any]:
        """Retorna representação do vínculo, incluindo dados do tipo quando
        disponíveis.
        """
        return {
            "id_pokemon_usuario": self.id_pokemon_usuario,
            "id_tipo_pokemon": self.id_tipo_pokemon,
            "tipo": self.tipo.to_dict() if getattr(self, "tipo", None) else None,
        }
