from __future__ import annotations

from typing import Any, Dict, List

from database import db


class PokemonUsuarioModel(db.Model):
    """Model que representa um Pokémon salvo por um usuário.

    Observações:
    - `favorito` indica se o usuário marcou o Pokémon como favorito.
    - `grupo_batalha` indica se o Pokémon faz parte do grupo de batalha do
      usuário (máx. 6 membros) — a regra de limite deve ser aplicada no
      serviço/business logic, não no modelo.
    """

    __tablename__ = "pokemons_usuario"

    id = db.Column("IDPokemonUsuario", db.Integer, primary_key=True)
    id_usuario = db.Column(
        "IDUsuario", db.Integer, db.ForeignKey("usuarios.IDUsuario"), nullable=False
    )
    codigo = db.Column("Codigo", db.String(50), nullable=False)
    nome = db.Column("Nome", db.String(100), nullable=False)
    imagem_url = db.Column("ImagemURL", db.String(255))
    grupo_batalha = db.Column("GrupoBatalha", db.Boolean, default=False)
    favorito = db.Column("Favorito", db.Boolean, default=False)

    usuario = db.relationship("UsuarioModel", back_populates="pokemons")
    tipos = db.relationship("PokemonUsuarioTipoModel", back_populates="pokemon")

    def __repr__(self) -> str:  # pragma: no cover - trivial
        return f"<PokemonUsuario {self.nome}>"

    def to_dict(self) -> Dict[str, Any]:
        """Retorna uma representação serializável do Pokémon do usuário.

        Inclui os tipos aninhados (lista de dicts) quando disponíveis.
        """
        tipos_list: List[Dict[str, Any]] = []
        for link in self.tipos or []:
            if getattr(link, "tipo", None):
                tipos_list.append(link.tipo.to_dict())

        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "codigo": self.codigo,
            "nome": self.nome,
            "imagem_url": self.imagem_url,
            "grupo_batalha": bool(self.grupo_batalha),
            "favorito": bool(self.favorito),
            "tipos": tipos_list,
        }

    def mark_favorite(self, value: bool = True) -> None:
        """Marca ou desmarca como favorito."""
        self.favorito = bool(value)

    def set_battle_group(self, value: bool = True) -> None:
        """Inclui ou remove o Pokémon do grupo de batalha.

        Nota: validação do limite (máx. 6) deve ocorrer antes de chamar esse
        método no nível de serviço.
        """
        self.grupo_batalha = bool(value)
