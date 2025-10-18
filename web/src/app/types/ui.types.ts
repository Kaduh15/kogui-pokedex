/**
 * Variantes para badges de tipo Pokemon
 */
export type TypeVariant = 'solid' | 'soft' | 'ring' | 'gradient';

/**
 * Estados de loading para diferentes ações
 */
export interface LoadingStates {
  toggleFavorite: boolean;
  toggleTeam: boolean;
  loadingPokemons: boolean;
  loadingUserPokemons: boolean;
}

/**
 * Estado de erro
 */
export interface ErrorState {
  message: string;
  type?: 'warning' | 'error' | 'info';
  timestamp?: Date;
}

/**
 * Propriedades do componente Card Pokemon
 */
export interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
  isFavorite: boolean;
  isInTeam: boolean;
}

/**
 * Eventos emitidos pelo Card Pokemon
 */
export interface PokemonCardEvents {
  onToggleFavorite: (id: number) => void;
  onToggleTeam: (id: number) => void;
  onPokemonClick: (id: number) => void;
}

/**
 * Configuração de paginação
 */
export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
}

/**
 * Configuração de ordenação
 */
export interface SortConfig {
  field: 'id' | 'name' | 'generation';
  direction: 'asc' | 'desc';
}