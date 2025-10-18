import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

export interface GetPokemonsResponse {
  data: DataGetPokemons
  message: string
}

export interface DataGetPokemons {
  count: number
  next: number
  previous: number | null
  results: ResultGetPokemon[]
}

export interface ResultGetPokemon {
  generation: number
  id: number
  imageUrl: string
  name: string
  types: string[]
}

export interface GetPokemonsUserResponse {
  data: PokemonsUser[]
  message: string
}

export interface PokemonsUser {
  codigo: string
  favorito: boolean
  grupo_batalha: boolean
  id: number
  id_usuario: number
  imagem_url: string
  nome: string
  tipos: Tipo[]
}

export interface Tipo {
  descricao: string
  id: number
}


@Injectable({
  providedIn: 'root'
})
export class Api {
  private readonly _apiUrl = environment.apiUrl;
  private readonly _httpClient = inject(HttpClient);

  register(data: { nome: string, email: string; senha: string }) {
    const res = this._httpClient.post<{
      data: {
        token: {
          access_token: string
        }
      }
    }>(`${this._apiUrl}/auth/register`, data);

    return res;
  }

  login(data: { email: string; senha: string }) {
    const res = this._httpClient.post<{
      data: {
        token: {
          access_token: string
        }
      }
    }>(`${this._apiUrl}/auth/login`, data);

    return res;
  }

  getPokemons() {
    const res = this._httpClient.get<GetPokemonsResponse>(`${this._apiUrl}/api/pokemon`);

    return res;
  }

  getPokemonsUser() {
    const res = this._httpClient.get<GetPokemonsUserResponse>(`${this._apiUrl}/api/pokemon/user`);

    return res;
  }

  addFavoritePokemon(pokemonId: number) {
    const res = this._httpClient.post<{ message: string }>(`${this._apiUrl}/api/pokemon/user/${pokemonId}/favorite`, {});

    return res;
  }
}