import { Component, inject } from '@angular/core';
import { Heart, LucideAngularModule } from 'lucide-angular';

import { CardPokemon } from '../../components/card-pokemon/card-pokemon';
import { Header } from "../../components/header/header";
import { UserService } from '../../services/user/user.service';
import { PokemonWithUserStatus } from '../../types';

@Component({
  selector: 'app-favorite',
  imports: [Header, CardPokemon, LucideAngularModule],
  templateUrl: './favorite.html'
})
export class Favorite {
  readonly HeartIcon = Heart

  userService = inject(UserService)

  pokemons: PokemonWithUserStatus[] = [];

  constructor() {
    this.userService.pokemons$.subscribe(pokemons => {
      this.pokemons = pokemons.filter(p => p.isFavorite);
    });
  }
}
