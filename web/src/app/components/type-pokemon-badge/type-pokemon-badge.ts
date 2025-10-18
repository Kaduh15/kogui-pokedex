import { Component, Input } from '@angular/core';

import { getPokemonTypeClasses, PokemonType } from '../../../utils/pokemon-type.util';

@Component({
  selector: 'app-type-pokemon-badge',
  imports: [],
  templateUrl: './type-pokemon-badge.html'
})
export class TypePokemonBadge {
  @Input() type!: PokemonType;
  @Input() variant: 'solid' | 'soft' | 'gradient' = 'soft';

  getClass() {
    return `${getPokemonTypeClasses(this.type, this.variant)} px-3 py-0.5 rounded-full text-xs font-semibold flex items-center justify-center`;
  }
}
