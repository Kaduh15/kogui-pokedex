import { Component, inject } from '@angular/core';
import { LucideAngularModule, Users } from "lucide-angular";

import { CardPokemon } from "../../components/card-pokemon/card-pokemon";
import { Header } from "../../components/header/header";
import { UserService } from '../../services/user/user.service';
import { PokemonWithUserStatus } from '../../types';

@Component({
  selector: 'app-team',
  imports: [CardPokemon, LucideAngularModule, Header],
  templateUrl: './team.html'
})
export class Team {
  readonly UsersIcon = Users

  pokemons: PokemonWithUserStatus[] = [];
  userService = inject(UserService)

  constructor() {
    this.userService.pokemons$.subscribe(pokemons => {
      console.info('🚀 ~ :21 ~ Team ~ constructor ~ pokemons:', pokemons)
      this.pokemons = pokemons.filter(p => p.isInTeam);
    });
  }
}
