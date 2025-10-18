import requests
from requests_cache import CachedSession
from requests.exceptions import RequestException


class PokeAPIService:
    BASE_URL = "https://pokeapi.co/api/v2"

    def __init__(self, cache=True, expire_after=3600):
        self.session = (
            CachedSession("pokeapi_cache", expire_after=expire_after)
            if cache
            else requests.Session()
        )

    def get(self, endpoint):
        try:
            url = f"{self.BASE_URL}/{endpoint}"
            resp = self.session.get(url, timeout=5)
            resp.raise_for_status()
            return resp.json()
        except RequestException as e:
            raise RuntimeError(f"Erro ao acessar PokeAPI: {e}")

    def get_generation_from_id(self, pokemon_id: int) -> int:
        if pokemon_id <= 151:
            return 1
        elif pokemon_id <= 251:
            return 2
        elif pokemon_id <= 386:
            return 3
        elif pokemon_id <= 493:
            return 4
        elif pokemon_id <= 649:
            return 5
        elif pokemon_id <= 721:
            return 6
        elif pokemon_id <= 809:
            return 7
        else:
            return 8

    def get_pokemon_details(self, name: str):
        data = self.get(f"pokemon/{name.lower()}")
        generation = self.get_generation_from_id(data["id"])
        return {
            "id": data["id"],
            "name": data["name"],
            "types": [t["type"]["name"] for t in data["types"]],
            "imageUrl": data["sprites"]["other"]["official-artwork"]["front_default"],
            "generation": generation,
        }

    def list_pokemon_by_generation(
        self, generation_name, page=1, limit=20, name_filter=None
    ):
        data = self.get(f"generation/{generation_name.lower()}")
        species = sorted(data["pokemon_species"], key=lambda s: s["name"])

        if name_filter:
            species = [s for s in species if name_filter.lower() in s["name"].lower()]

        total = len(species)
        start = (page - 1) * limit
        end = start + limit
        page_species = species[start:end]

        detailed_results = []
        for s in page_species:
            details = self.get_pokemon_details(s["name"])
            detailed_results.append(details)

        return {
            "count": total,
            "next": page + 1 if end < total else None,
            "previous": page - 1 if page > 1 else None,
            "results": detailed_results,
        }

    def list_all_pokemon(self, page=1, limit=20, name_filter=None):
        offset = (page - 1) * limit
        data = self.get(f"pokemon?limit={limit}&offset={offset}")

        results = data["results"]
        if name_filter:
            results = [r for r in results if name_filter.lower() in r["name"].lower()]

        detailed_results = []
        for item in results:
            details = self.get_pokemon_details(item["name"])
            detailed_results.append(details)

        return {
            "count": data["count"],
            "next": page + 1 if data["next"] else None,
            "previous": page - 1 if data["previous"] else None,
            "results": detailed_results,
        }

    def get_pokemon(self, page=1, limit=20, gen=None, name=None):
        if gen:
            return self.list_pokemon_by_generation(gen, page, limit, name_filter=name)
        return self.list_all_pokemon(page, limit, name_filter=name)


if __name__ == "__main__":
    service = PokeAPIService()

    # print mais bonito da listagem de pokemons
    import pprint

    pprint.pprint(
        service.get_pokemon(page=1, limit=10, gen="generation-ii")
    )
