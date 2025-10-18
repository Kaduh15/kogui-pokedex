import { Component, inject, Input } from '@angular/core';
import { Heart, LucideAngularModule, Plus, X } from 'lucide-angular';

import { PokemonType } from '../../../utils/pokemon-type.util';
import { Api } from '../../services/api';
import { TypePokemonBadge } from "../type-pokemon-badge/type-pokemon-badge";

@Component({
  selector: 'app-card-pokemon',
  imports: [LucideAngularModule, TypePokemonBadge],
  templateUrl: './card-pokemon.html'
})
export class CardPokemon {
  readonly PlusIcon = Plus
  readonly XIcon = X
  readonly HeartIcon = Heart

  @Input() id!: number;
  @Input() name!: string;
  @Input() types: PokemonType[] = [];
  @Input() imageUrl!: string;
  @Input() isTeam: boolean = false;
  @Input() isFavorite: boolean = false;

  apiService = inject(Api);

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    console.log(`Pokémon ${this.name} favorite status: ${this.isFavorite}`);

    if (this.isFavorite) {
      this.apiService.addFavoritePokemon(this.id).subscribe({
        next: (res) => {
          console.log('Favorite added:', res);
        },
        error: (err) => {
          console.error('Failed to add favorite:', err);
          this.isFavorite = !this.isFavorite;
        }
      });
    }
  }

  toggleTeam() {
    this.isTeam = !this.isTeam;
    console.log(`Pokémon ${this.name} team status: ${this.isTeam}`);
  }
}
