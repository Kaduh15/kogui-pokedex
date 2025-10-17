from typing import Optional
from database import db
from models.pokemon_tipe_model import TipoPokemonModel
from models.pokemon_usuario_model import PokemonUsuarioModel
from models.pokemon_usuario_tipo_model import PokemonUsuarioTipoModel
from services.pokeapi_service import PokeAPIService

pokeapi_service = PokeAPIService()


class PokemonService:
    @staticmethod
    def add_pokemon_to_user(
        user_id: int,
        pokemon_id: str,
        as_favorite: bool = False,
        in_battle_group: bool = False,
    ) -> PokemonUsuarioModel:
        """Adiciona um pokémon ao usuário, criando tipos se necessário.

        Args:
            user_id: ID do usuário
            pokemon_id: ID ou nome do pokémon na PokeAPI
            as_favorite: Se deve marcar como favorito
            in_battle_group: Se deve adicionar ao grupo de batalha

        Returns:
            PokemonUsuarioModel: Instância do pokémon criado

        Raises:
            ValueError: Se pokémon não for encontrado na PokeAPI
            RuntimeError: Se houver erro ao validar grupo de batalha
        """
        pokemon_data = pokeapi_service.get_pokemon_details(str(pokemon_id))
        if not pokemon_data:
            raise ValueError(f"Pokémon with ID {pokemon_id} not found.")
        existing = PokemonUsuarioModel.query.filter_by(
            id_usuario=user_id, codigo=str(pokemon_data["id"])
        ).first()

        if existing:
            if as_favorite:
                existing.mark_favorite(True)
            if in_battle_group:
                PokemonService._validate_battle_group_limit(user_id, existing.id)
                existing.set_battle_group(True)
            db.session.commit()
            return existing

        tipos_objs = []
        for tipo_name in pokemon_data["types"]:
            tipo_obj = TipoPokemonModel.query.filter_by(
                descricao=tipo_name.capitalize()
            ).first()

            if not tipo_obj:
                tipo_obj = TipoPokemonModel(descricao=tipo_name.capitalize())
                db.session.add(tipo_obj)
                db.session.flush()

            tipos_objs.append(tipo_obj)

        if in_battle_group:
            PokemonService._validate_battle_group_limit(user_id)

        pokemon_usuario = PokemonUsuarioModel(
            id_usuario=user_id,
            codigo=str(pokemon_data["id"]),
            nome=pokemon_data["name"].capitalize(),
            imagem_url=pokemon_data.get("sprite"),
            favorito=as_favorite,
            grupo_batalha=in_battle_group,
        )

        db.session.add(pokemon_usuario)
        db.session.flush()

        for tipo_obj in tipos_objs:
            associacao = PokemonUsuarioTipoModel(
                id_pokemon_usuario=pokemon_usuario.id, id_tipo_pokemon=tipo_obj.id
            )
            db.session.add(associacao)

        db.session.commit()
        return pokemon_usuario

    @staticmethod
    def add_favorite_pokemon(user_id: int, pokemon_id: str) -> PokemonUsuarioModel:
        """Adiciona pokémon como favorito do usuário."""
        return PokemonService.add_pokemon_to_user(
            user_id=user_id, pokemon_id=pokemon_id, as_favorite=True
        )

    @staticmethod
    def add_to_battle_group(user_id: int, pokemon_id: str) -> PokemonUsuarioModel:
        """Adiciona pokémon ao grupo de batalha do usuário."""
        return PokemonService.add_pokemon_to_user(
            user_id=user_id, pokemon_id=pokemon_id, in_battle_group=True
        )

    @staticmethod
    def _validate_battle_group_limit(
        user_id: int, exclude_pokemon_id: Optional[int] = None
    ):
        """Valida se usuário não excede limite de 6 pokémons no grupo de batalha."""
        query = PokemonUsuarioModel.query.filter_by(
            id_usuario=user_id, grupo_batalha=True
        )

        if exclude_pokemon_id:
            query = query.filter(PokemonUsuarioModel.id != exclude_pokemon_id)

        count = query.count()
        if count >= 6:
            raise RuntimeError(
                "Usuário já possui 6 pokémons no grupo de batalha (limite máximo)"
            )
