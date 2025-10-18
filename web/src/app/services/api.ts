import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import {
  GetPokemonsResponse,
  GetUserPokemonsResponse,
  AuthResponse,
  SimpleResponse,
  LoginRequest,
  RegisterRequest,
  GetUserInfoResponse
} from '../types';


@Injectable({
  providedIn: 'root'
})
export class Api {
  private readonly _apiUrl = environment.apiUrl;
  private readonly _httpClient = inject(HttpClient);

  register(data: RegisterRequest) {
    return this._httpClient.post<AuthResponse>(`${this._apiUrl}/auth/register`, data);
  }

  login(data: LoginRequest) {
    return this._httpClient.post<AuthResponse>(`${this._apiUrl}/auth/login`, data);
  }

  getUserInfo() {
    return this._httpClient.get<GetUserInfoResponse>(`${this._apiUrl}/auth/profile`);
  }

  getPokemons() {
    return this._httpClient.get<GetPokemonsResponse>(`${this._apiUrl}/api/pokemon`);
  }

  getPokemonsUser() {
    return this._httpClient.get<GetUserPokemonsResponse>(`${this._apiUrl}/api/pokemon/user`);
  }

  addFavoritePokemon(pokemonId: number) {
    return this._httpClient.post<SimpleResponse>(`${this._apiUrl}/api/pokemon/user/${pokemonId}/favorite`, {});
  }

  removeFavoritePokemon(pokemonId: number) {
    return this._httpClient.delete<SimpleResponse>(`${this._apiUrl}/api/pokemon/user/${pokemonId}/favorite`);
  }

  addPokemonToTeam(pokemonId: number) {
    return this._httpClient.post<SimpleResponse>(`${this._apiUrl}/api/pokemon/user/${pokemonId}/battle-group`, {});
  }

  removePokemonFromTeam(pokemonId: number) {
    return this._httpClient.delete<SimpleResponse>(`${this._apiUrl}/api/pokemon/user/${pokemonId}/battle-group`);
  }

  getUserPokemons() {
    return this._httpClient.get<GetUserPokemonsResponse>(`${this._apiUrl}/api/pokemon/user`);
  }
}