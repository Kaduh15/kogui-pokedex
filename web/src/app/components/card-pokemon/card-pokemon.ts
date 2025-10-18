import { Component, inject, Input } from '@angular/core';
import { Heart, LucideAngularModule, Plus, X } from 'lucide-angular';
import { ToastService, ScAngularToastify } from 'sc-angular-toastify';

import { Api } from '../../services/api';
import { UserService } from '../../services/user/user.service';
import { CreatePokemonData, PokemonType } from '../../types';
import { TypePokemonBadge } from '../type-pokemon-badge/type-pokemon-badge';

@Component({
  selector: 'app-card-pokemon',
  imports: [LucideAngularModule, TypePokemonBadge, ScAngularToastify],
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

  #toast: ToastService = inject(ToastService);

  toggleFavorite() {
    this.loadingToggleFavorite = true;

    if (this.isFavorite) {
      this.apiService.removeFavoritePokemon(this.id).subscribe({
        next: () => {
          this.userService.removePokemon(this.id);
          this.isFavorite = false;

          this.#toast.show(`${this.name} foi removido dos seus favoritos! Favorito Removido`);
        },
        error: (err) => {
          this.#toast.show(err.error?.error || 'Erro ao remover dos favoritos.');
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
            types: this.types,
            imageUrl: this.imageUrl,
            generation: 0,
            isFavorite: true,
            isInTeam: this.isInTeam,
          };
          this.userService.addPokemon(pokemonData);

          this.#toast.show(`${this.name} foi adicionado aos seus favoritos! Favorito Adicionado`);
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
    this.loadingToggleTeam = true;

    if (this.isInTeam) {
      this.apiService.removePokemonFromTeam(this.id).subscribe({
        next: () => {
          this.userService.removePokemon(this.id);
          this.isInTeam = false;
          this.#toast.show(`${this.name} foi removido da sua equipe! Pokémon Removido`);
        },
        error: (err) => {
          this.#toast.show(err.error?.error || 'Erro ao remover Pokémon da equipe.');
        },
        complete: () => {
          this.loadingToggleTeam = false;
        }
      });
    } else {
      this.apiService.addPokemonToTeam(this.id).subscribe({
        next: () => {
          const pokemonData: CreatePokemonData = {
            id: this.id,
            name: this.name,
            types: this.types,
            imageUrl: this.imageUrl,
            generation: 0,
            isFavorite: this.isFavorite,
            isInTeam: true,
          };
          this.userService.addPokemon(pokemonData);
          this.isInTeam = true;

          this.#toast.show(`${this.name} foi adicionado à sua equipe! Pokémon Adicionado`);
        },
        error: (err) => {
          console.error('Failed to add to team:', err);
          this.#toast.show(err.error?.error || 'Erro ao adicionar Pokémon à equipe.');
        },
        complete: () => {
          this.loadingToggleTeam = false;
        }
      });
    }
  }
}
