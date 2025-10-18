import { Component, inject, Input } from '@angular/core';
import { Heart, LucideAngularModule, Plus, X } from 'lucide-angular';

import { Api } from '../../services/api';
import { UserService } from '../../services/user/user.service';
import { CreatePokemonData, PokemonType } from '../../types';
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
  @Input() types!: PokemonType[];
  @Input() imageUrl!: string;
  @Input() isInTeam: boolean = false;
  @Input() isFavorite: boolean = false;

  loadingToggleFavorite: boolean = false;
  loadingToggleTeam: boolean = false;

  apiService = inject(Api);
  userService = inject(UserService);

  toggleFavorite() {
    this.loadingToggleFavorite = true;

    if (this.isFavorite) {
      this.apiService.removeFavoritePokemon(this.id).subscribe({
        next: () => {
          this.userService.removePokemon(this.id);
          this.isFavorite = false;
        },
        error: (err) => {
          console.error('Failed to remove favorite:', err);
        },
        complete: () => {
          this.loadingToggleFavorite = false;
        }
      });
    } else {
      this.apiService.addFavoritePokemon(this.id).subscribe({
        next: () => {
          const pokemonData: CreatePokemonData = {
            id: this.id,
            name: this.name,
            types: this.types, // ✅ Já é string[]
            imageUrl: this.imageUrl,
            generation: 0,
            isFavorite: true,
            isInTeam: this.isInTeam,
          };
          this.userService.addPokemon(pokemonData);

          this.isFavorite = true;
        },
        error: (err) => {
          console.error('Failed to add favorite:', err);
        },
        complete: () => {
          this.loadingToggleFavorite = false;
        }
      });
    }
  }

  toggleTeam() {
    this.loadingToggleTeam = true; // ✅ Ativa loading

    if (this.isInTeam) {
      this.apiService.removePokemonFromTeam(this.id).subscribe({
        next: () => {
          this.userService.removePokemon(this.id);
          this.isInTeam = false;
        },
        error: (err) => {
          console.error('Failed to remove from team:', err);
          alert(err.error?.error || 'Erro ao remover Pokémon da equipe.');
        },
        complete: () => {
          this.loadingToggleTeam = false; // ✅ Desativa loading
        }
      });
    } else {
      this.apiService.addPokemonToTeam(this.id).subscribe({
        next: () => {
          const pokemonData: CreatePokemonData = {
            id: this.id,
            name: this.name,
            types: this.types, // ✅ Já é string[]
            imageUrl: this.imageUrl,
            generation: 0,
            isFavorite: this.isFavorite,
            isInTeam: true,
          };
          this.userService.addPokemon(pokemonData);
          this.isInTeam = true;
        },
        error: (err) => {
          console.error('Failed to add to team:', err);
          alert(err.error?.error || 'Erro ao adicionar Pokémon à equipe.');
        },
        complete: () => {
          this.loadingToggleTeam = false; // ✅ Desativa loading
        }
      });
    }
  }
}
