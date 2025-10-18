from flask import Blueprint, jsonify

from services.pokeapi_service import PokeAPIService
from services.pokemon_service import PokemonService
from utils.auth_decorators import auth_required
from utils.http_status import HttpStatus

pokemon_routes = Blueprint("pokemon_routes", __name__)

pokeapi_service = PokeAPIService()


@pokemon_routes.route("/pokemon", methods=["GET"])
@auth_required
def get_pokemon(current_user):
    data = pokeapi_service.get_pokemon()

    return (
        jsonify({"message": "Pokémon acessado com sucesso!", "data": data}),
        HttpStatus.OK,
    )


# Adiciona pokémon ao usuário como favorito ou grupo de batalha
@pokemon_routes.route("/pokemon/user/<int:pokemon_id>/favorite", methods=["POST"])
@auth_required
def add_favorite_pokemon(current_user, pokemon_id):
    try:
        pokemon = PokemonService.add_favorite_pokemon(current_user.id, str(pokemon_id))
        return (
            jsonify(
                {
                    "message": f"Pokémon {pokemon.nome} favoritado com sucesso!",
                    "data": pokemon.to_dict(),
                }
            ),
            HttpStatus.OK,
        )
    except ValueError as e:
        return jsonify({"error": str(e)}), HttpStatus.NOT_FOUND
    except RuntimeError as e:
        return jsonify({"error": str(e)}), HttpStatus.BAD_REQUEST
    except Exception:
        return (
            jsonify({"error": "Internal server error"}),
            HttpStatus.INTERNAL_SERVER_ERROR,
        )


@pokemon_routes.route("/pokemon/user/<int:pokemon_id>/battle-group", methods=["POST"])
@auth_required
def add_battle_group_pokemon(current_user, pokemon_id):
    try:
        pokemon = PokemonService.add_to_battle_group(current_user.id, str(pokemon_id))
        return (
            jsonify(
                {
                    "message": f"Pokémon {pokemon.nome} adicionado ao grupo de batalha!",
                    "data": pokemon.to_dict(),
                }
            ),
            HttpStatus.OK,
        )
    except ValueError as e:
        return jsonify({"error": str(e)}), HttpStatus.NOT_FOUND
    except RuntimeError as e:
        return jsonify({"error": str(e)}), HttpStatus.BAD_REQUEST
    except Exception:
        return (
            jsonify({"error": "Internal server error"}),
            HttpStatus.INTERNAL_SERVER_ERROR,
        )
