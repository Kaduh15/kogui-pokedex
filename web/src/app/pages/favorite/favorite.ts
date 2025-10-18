import { Component, inject, OnInit } from '@angular/core';
import { Heart, LucideAngularModule } from 'lucide-angular';

import { CardPokemon } from '../../components/card-pokemon/card-pokemon';
import { Header } from "../../components/header/header";
import { Api, ResultGetPokemon } from '../../services/api';

@Component({
  selector: 'app-favorite',
  imports: [Header, CardPokemon, LucideAngularModule],
  templateUrl: './favorite.html'
})
export class Favorite implements OnInit {
  readonly HeartIcon = Heart
  pokemons: (ResultGetPokemon & {
    isFavorite: boolean
    isTeam: boolean
  })[] = [];

  apiService = inject(Api)

  ngOnInit() {
    this.apiService.getPokemonsUser().subscribe({
      next: (res) => {
        this.pokemons = res.data.map((pokemon) => ({
          id: parseInt(pokemon.codigo),
          name: pokemon.nome,
          types: pokemon.tipos.map(tipo => tipo.descricao.toLowerCase()),
          imageUrl: pokemon.imagem_url,
          generation: 0,
          isFavorite: pokemon.favorito,
          isTeam: pokemon.grupo_batalha,
        }));
      },
      error: (err) => {
        console.error('Failed to fetch pokemons:', err);
      }
    });
  }
}
