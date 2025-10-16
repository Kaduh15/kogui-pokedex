from database import db


class PokemonUsuarioModel(db.Model):
    __tablename__ = "pokemons_usuario"

    id = db.Column("IDPokemonUsuario", db.Integer, primary_key=True)
    id_usuario = db.Column(
        "IDUsuario",
        db.Integer,
        db.ForeignKey("usuarios.IDUsuario"),
        nullable=False,
    )
    codigo = db.Column("Codigo", db.String(50), nullable=False)
    nome = db.Column("Nome", db.String(100), nullable=False)
    imagem_url = db.Column("ImagemURL", db.String(255))
    grupo_batalha = db.Column("GrupoBatalha", db.Boolean, default=False)
    favorito = db.Column("Favorito", db.Boolean, default=False)

    usuario = db.relationship(
        "UsuarioModel", back_populates="pokemons"
    )
    tipos = db.relationship(
        "PokemonUsuarioTipoModel",
        back_populates="pokemon",
    )

    def __repr__(self):
        return f"<PokemonUsuario {self.nome}>"
