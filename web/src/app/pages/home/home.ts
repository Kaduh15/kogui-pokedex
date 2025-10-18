import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search } from 'lucide-angular';

import { CardPokemon } from "../../components/card-pokemon/card-pokemon";
import { Header } from "../../components/header/header";
import { Api, ResultGetPokemon } from '../../services/api';

@Component({
  selector: 'app-home',
  imports: [Header, LucideAngularModule, FormsModule, CardPokemon],
  templateUrl: './home.html'
})
export class Home implements OnInit {
  readonly SearchIcon = Search
  generations = [
    'Geração 1',
    'Geração 2',
    'Geração 3',
  ]
  pokemons: ResultGetPokemon[] = [];

  selectedGeneration: string = 'all';

  apiService = inject(Api)

  ngOnInit() {
    this.apiService.getPokemons().subscribe({
      next: (res) => {
        this.pokemons = res.data.results;
      },
      error: (err) => {
        console.error('Failed to fetch pokemons:', err);
      }
    });
  }
}