from database import db


class PokemonUsuarioTipoModel(db.Model):
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
