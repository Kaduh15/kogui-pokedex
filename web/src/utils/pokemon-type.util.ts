export type PokemonType =
  | 'normal' | 'fire' | 'water' | 'grass' | 'electric' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic'
  | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export type TypeVariant = 'solid' | 'soft' | 'ring' | 'gradient';

interface TypeStyle {
  solid: string;
  soft: string;
  ring: string;
  gradient: string;
}

const TYPE_STYLES: Record<PokemonType, TypeStyle> = {
  normal: { solid: 'bg-stone-500 text-white', soft: 'bg-stone-100 text-stone-800', ring: 'ring-1 ring-stone-300', gradient: 'bg-gradient-to-br from-stone-400 to-stone-600 text-white' },
  fire: { solid: 'bg-orange-500 text-white', soft: 'bg-orange-100 text-orange-800', ring: 'ring-1 ring-orange-300', gradient: 'bg-gradient-to-br from-orange-500 to-orange-700 text-white' },
  water: { solid: 'bg-blue-500 text-white', soft: 'bg-blue-100 text-blue-800', ring: 'ring-1 ring-blue-300', gradient: 'bg-gradient-to-br from-blue-500 to-blue-700 text-white' },
  grass: { solid: 'bg-green-500 text-white', soft: 'bg-green-100 text-green-800', ring: 'ring-1 ring-green-300', gradient: 'bg-gradient-to-br from-green-500 to-green-700 text-white' },
  electric: { solid: 'bg-yellow-500 text-black', soft: 'bg-yellow-100 text-yellow-900', ring: 'ring-1 ring-yellow-300', gradient: 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black' },
  ice: { solid: 'bg-cyan-500 text-white', soft: 'bg-cyan-100 text-cyan-800', ring: 'ring-1 ring-cyan-300', gradient: 'bg-gradient-to-br from-cyan-500 to-cyan-700 text-white' },
  fighting: { solid: 'bg-red-600 text-white', soft: 'bg-red-100 text-red-800', ring: 'ring-1 ring-red-300', gradient: 'bg-gradient-to-br from-red-600 to-red-800 text-white' },
  poison: { solid: 'bg-purple-600 text-white', soft: 'bg-purple-100 text-purple-800', ring: 'ring-1 ring-purple-300', gradient: 'bg-gradient-to-br from-purple-600 to-purple-800 text-white' },
  ground: { solid: 'bg-amber-600 text-white', soft: 'bg-amber-100 text-amber-900', ring: 'ring-1 ring-amber-300', gradient: 'bg-gradient-to-br from-amber-600 to-amber-800 text-white' },
  flying: { solid: 'bg-sky-600 text-white', soft: 'bg-sky-100 text-sky-800', ring: 'ring-1 ring-sky-300', gradient: 'bg-gradient-to-br from-sky-500 to-sky-700 text-white' },
  psychic: { solid: 'bg-fuchsia-500 text-white', soft: 'bg-fuchsia-100 text-fuchsia-800', ring: 'ring-1 ring-fuchsia-300', gradient: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 text-white' },
  bug: { solid: 'bg-lime-600 text-white', soft: 'bg-lime-100 text-lime-800', ring: 'ring-1 ring-lime-300', gradient: 'bg-gradient-to-br from-lime-500 to-lime-700 text-white' },
  rock: { solid: 'bg-yellow-500 text-white', soft: 'bg-yellow-100 text-yellow-900', ring: 'ring-1 ring-yellow-300', gradient: 'bg-gradient-to-br from-yellow-600 to-yellow-800 text-white' },
  ghost: { solid: 'bg-indigo-500 text-white', soft: 'bg-indigo-100 text-indigo-800', ring: 'ring-1 ring-indigo-300', gradient: 'bg-gradient-to-br from-indigo-600 to-indigo-800 text-white' },
  dragon: { solid: 'bg-violet-600 text-white', soft: 'bg-violet-100 text-violet-800', ring: 'ring-1 ring-violet-300', gradient: 'bg-gradient-to-br from-violet-600 to-violet-800 text-white' },
  dark: { solid: 'bg-slate-700 text-white', soft: 'bg-slate-100 text-slate-900', ring: 'ring-1 ring-slate-300', gradient: 'bg-gradient-to-br from-slate-700 to-slate-900 text-white' },
  steel: { solid: 'bg-zinc-500 text-white', soft: 'bg-zinc-100 text-zinc-800', ring: 'ring-1 ring-zinc-300', gradient: 'bg-gradient-to-br from-zinc-500 to-zinc-700 text-white' },
  fairy: { solid: 'bg-rose-400 text-white', soft: 'bg-rose-100 text-rose-800', ring: 'ring-1 ring-rose-300', gradient: 'bg-gradient-to-br from-rose-400 to-rose-600 text-white' },
};

export function getPokemonTypeClasses(
  type: PokemonType,
  variant: TypeVariant = 'soft'
): string {
  const style = TYPE_STYLES[type];
  return style?.[variant] || '';
}
