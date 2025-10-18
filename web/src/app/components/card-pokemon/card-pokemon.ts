import { Component, Input } from '@angular/core';
import { Heart, LucideAngularModule, Plus, X } from 'lucide-angular';
import { TypePokemonBadge } from "../type-pokemon-badge/type-pokemon-badge";
import { PokemonType } from '../../../utils/pokemon-type.util';

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
}
