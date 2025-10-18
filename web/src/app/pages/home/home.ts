import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search } from 'lucide-angular';

import { CardPokemon } from "../../components/card-pokemon/card-pokemon";
import { Header } from "../../components/header/header";
import { Api } from '../../services/api';
import { UserService } from '../../services/user/user.service';
import { PokemonWithUserStatus } from '../../types';

@Component({
  selector: 'app-home',
  imports: [Header, LucideAngularModule, FormsModule, CardPokemon],
  templateUrl: './home.html'
})
export class Home {
  readonly SearchIcon = Search
  generations = [
    'Geração 1',
    'Geração 2',
    'Geração 3',
  ]

  selectedGeneration: string = 'all';

  userService = inject(UserService)
  apiService = inject(Api)

  pokemons: PokemonWithUserStatus[] = [];
  userPokemons: PokemonWithUserStatus[] = [];

  constructor() {
    this.apiService.getPokemons().subscribe({
      next: (data) => {
        const userPokemonsMap = new Map<number, PokemonWithUserStatus>();
        this.userService.pokemons$.subscribe(userPokemons => {
          userPokemons.forEach(up => {
            userPokemonsMap.set(up.id, up);
          });
        }).unsubscribe();

        this.pokemons = data.data.results.map(p => ({
          id: p.id,
          name: p.name,
          types: p.types.map(t => t.toLowerCase()),
          imageUrl: p.imageUrl,
          generation: p.generation,
          isFavorite: userPokemonsMap.has(p.id) ? userPokemonsMap.get(p.id)!.isFavorite : false,
          isInTeam: userPokemonsMap.has(p.id) ? userPokemonsMap.get(p.id)!.isInTeam : false,
        }));

        console.info('🚀 ~ :33 ~ Home ~ this.pokemons:', this.userService.pokemons$);
      },
      error: (err) => {
        console.error('Erro ao carregar Pokémons:', err);
      }
    });

    this.userService.pokemons$.subscribe(userPokemons => {
      this.userPokemons = userPokemons.map(up => ({ ...up }));
    });
  }
}