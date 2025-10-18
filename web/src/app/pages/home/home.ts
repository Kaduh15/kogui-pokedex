import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { LucideAngularModule, Search } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { CardPokemon } from "../../components/card-pokemon/card-pokemon";

const mockPokemons = [
  {
    id: 1,
    name: "bulbasaur",
    types: ["grass", "poison"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    generation: 1,
  },
  {
    id: 4,
    name: "charmander",
    types: ["fire"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    generation: 1,
  },
  {
    id: 7,
    name: "squirtle",
    types: ["water"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    generation: 1,
  },
  {
    id: 25,
    name: "pikachu",
    types: ["electric"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    generation: 1,
  },
  {
    id: 6,
    name: "charizard",
    types: ["fire", "flying"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    generation: 1,
  },
  {
    id: 9,
    name: "blastoise",
    types: ["water"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
    generation: 1,
  },
  {
    id: 3,
    name: "venusaur",
    types: ["grass", "poison"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
    generation: 1,
  },
  {
    id: 94,
    name: "gengar",
    types: ["ghost", "poison"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    generation: 1,
  },
  {
    id: 130,
    name: "gyarados",
    types: ["water", "flying"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png",
    generation: 1,
  },
  {
    id: 131,
    name: "lapras",
    types: ["water", "ice"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png",
    generation: 1,
  },
  {
    id: 143,
    name: "snorlax",
    types: ["normal"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png",
    generation: 1,
  },
  {
    id: 150,
    name: "mewtwo",
    types: ["psychic"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    generation: 1,
  },
  {
    id: 152,
    name: "chikorita",
    types: ["grass"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png",
    generation: 2,
  },
  {
    id: 155,
    name: "cyndaquil",
    types: ["fire"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/155.png",
    generation: 2,
  },
  {
    id: 158,
    name: "totodile",
    types: ["water"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/158.png",
    generation: 2,
  },
  {
    id: 249,
    name: "lugia",
    types: ["psychic", "flying"],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png",
    generation: 2,
  },
];

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
  pokemons = mockPokemons;

  selectedGeneration: string = 'all';
}