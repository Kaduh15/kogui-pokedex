from database import db


class TipoPokemonModel(db.Model):
    __tablename__ = "tipos_pokemon"

    id = db.Column("IDTipoPokemon", db.Integer, primary_key=True)
    descricao = db.Column("Descricao", db.String(50), nullable=False)

    pokemons = db.relationship(
        "PokemonUsuarioTipoModel",
        back_populates="tipo"
        )

    def __repr__(self):
        return f"<TipoPokemon {self.descricao}>"
