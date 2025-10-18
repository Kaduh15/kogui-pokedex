import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { PokemonWithUserStatus, CreatePokemonData } from '../../types';
import { Api } from '../api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  #pokemons = new BehaviorSubject<PokemonWithUserStatus[]>([]);

  pokemons$ = this.#pokemons.asObservable().pipe(
    map(p => structuredClone(p))
  );

  infoUser: {
    email: string;
    name: string;
    createdAt: string;
    role: 'User' | 'Admin';
  } = {
      email: '',
      name: '',
      createdAt: '',
      role: 'User'
    }

  #apiService = inject(Api);

  getUserInfo() {
    this.#apiService.getUserInfo().subscribe({
      next: (res) => {
        const date = new Date(res.data.user.dt_inclusao);

        const formatted = date.toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });


        this.infoUser = {
          email: res.data.user.email,
          name: res.data.user.nome,
          createdAt: formatted,
          role: 'User'
        };
      }
    });
  }

  getPokemons() {
    this.#apiService.getUserPokemons().subscribe({
      next: (res) => {
        const newPokemons = [...res.data];

        this.#pokemons.next(newPokemons.map(p => ({
          id: Number(p.codigo),
          name: p.nome,
          types: p.tipos.map(t => t.descricao.toLowerCase()),
          imageUrl: p.imagem_url,
          generation: 0,
          isFavorite: p.favorito,
          isInTeam: p.grupo_batalha,
        })));
      },
      error: (err) => {
        console.error('Failed to fetch user Pokémons:', err);
      }
    });
  }

  clearPokemons() {
    this.#pokemons.next([]);
  }

  addPokemon(pokemonData: CreatePokemonData) {
    const { id, name, types, imageUrl, generation, isFavorite, isInTeam } = pokemonData;
    const currentPokemons = this.#pokemons.getValue().find(p => p.id === id);

    if (!currentPokemons) {
      this.#pokemons.next([
        ...this.#pokemons.getValue(),
        {
          id,
          name,
          types,
          imageUrl,
          generation,
          isFavorite,
          isInTeam,
        }
      ]);
      return;
    }

    // Atualiza Pokemon existente
    this.#pokemons.next(
      this.#pokemons.getValue().map(p =>
        p.id === id ? { ...p, isFavorite, isInTeam } : p
      )
    );
  }

  removePokemon(id: number) {
    this.#pokemons.next([...this.#pokemons.getValue().filter(p => p.id !== id)]);
  }
}
