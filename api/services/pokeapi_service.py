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
            print("url", url)
            resp = self.session.get(url, timeout=5)
            resp.raise_for_status()
            return resp.json()
        except RequestException as e:
            raise RuntimeError(f"Erro ao acessar PokeAPI: {e}")

    def get_pokemon_details(self, name: str):
        data = self.get(f"pokemon/{name.lower()}")
        return {
            "id": data["id"],
            "name": data["name"],
            "types": [t["type"]["name"] for t in data["types"]],
            "sprite": (data["sprites"]["other"]["official-artwork"]["front_default"]),
        }

    def list_pokemon_by_generation(self, generation_name, page=1, limit=20):
        data = self.get(f"generation/{generation_name.lower()}")
        species = sorted(data["pokemon_species"], key=lambda s: s["name"])

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

    def list_all_pokemon(self, page=1, limit=20):
        offset = (page - 1) * limit
        data = self.get(f"pokemon?limit={limit}&offset={offset}")

        detailed_results = []
        for item in data["results"]:
            details = self.get_pokemon_details(item["name"])
            detailed_results.append(details)

        return {
            "count": data["count"],
            "next": page + 1 if data["next"] else None,
            "previous": page - 1 if data["previous"] else None,
            "results": detailed_results,
        }

    def get_pokemon(self, page=1, limit=20, gen=None):
        if gen:
            return self.list_pokemon_by_generation(gen, page, limit)
        return self.list_all_pokemon(page, limit)
