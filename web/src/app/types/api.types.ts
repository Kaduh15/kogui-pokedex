/**
 * Resposta base da API
 */
export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
}

/**
 * Resposta de erro da API
 */
export interface ApiErrorResponse {
  error: string;
  message?: string;
  statusCode?: number;
}

export interface APIUserInfo {
  dt_alteracao: string | null
  dt_inclusao: string
  email: string
  id: number
  nome: string
}

/**
 * Pokemon vindo da API externa (PokeAPI)
 */
export interface ApiPokemon {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
  generation: number;
}

/**
 * Lista paginada de Pokemon da API
 */
export interface ApiPokemonList {
  count: number;
  next: number | null;
  previous: number | null;
  results: ApiPokemon[];
}

/**
 * Response para lista de Pokemon
 */
export interface GetPokemonsResponse extends ApiResponse<ApiPokemonList> { }

/**
 * Pokemon do usuário vindo do backend
 */
export interface ApiUserPokemon {
  codigo: string;
  id: number;
  id_usuario: number;
  nome: string;
  imagem_url: string;
  favorito: boolean;
  grupo_batalha: boolean;
  tipos: ApiPokemonType[];
}

/**
 * Tipo de Pokemon do backend
 */
export interface ApiPokemonType {
  id: number;
  descricao: string;
}

/**
 * Response para Pokemon do usuário
 */
export interface GetUserPokemonsResponse extends ApiResponse<ApiUserPokemon[]> { }

/**
 * Dados de login
 */
export interface LoginRequest {
  email: string;
  senha: string;
}

/**
 * Dados de registro
 */
export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

/**
 * Token de autenticação
 */
export interface AuthToken {
  access_token: string;
}

/**
 * Response de autenticação
 */
export interface AuthResponse extends ApiResponse<{ token: AuthToken }> { }

/**
 * Response simples (para ações como favoritar, adicionar ao time, etc)
 */
export interface SimpleResponse extends ApiResponse<null> { }

export interface GetUserInfoResponse extends ApiResponse<{ user: APIUserInfo }> { }