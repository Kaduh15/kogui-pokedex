/**
 * Tipos de Pokemon válidos
 */
export type PokemonType =
  | 'normal' | 'fire' | 'water' | 'grass' | 'electric' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic'
  | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

/**
 * Pokemon base vindo da PokeAPI
 */
export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
  generation: number;
}

/**
 * Pokemon com status do usuário (favorito, time, etc)
 */
export interface PokemonWithUserStatus extends Pokemon {
  isFavorite: boolean;
  isInTeam: boolean;
}

/**
 * Estado completo de um Pokemon na store
 */
export interface PokemonState extends PokemonWithUserStatus {
  // Pode adicionar campos extras específicos da store aqui
}

/**
 * Dados para criar/atualizar Pokemon do usuário
 */
export interface CreatePokemonData {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
  generation: number;
  isFavorite: boolean;
  isInTeam: boolean;
}

/**
 * Filtros para busca de Pokemon
 */
export interface PokemonFilters {
  type?: PokemonType;
  generation?: number;
  favorites?: boolean;
  team?: boolean;
  search?: string;
}