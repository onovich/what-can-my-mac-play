import type { CatalogGame } from '../data/catalogGames'

function normalize(value: string): string {
  return value.normalize('NFKC').toLowerCase().replace(/[\p{P}\p{S}\s]+/gu, '')
}

export function findCatalogGames(games: readonly CatalogGame[], query: string): CatalogGame[] {
  if (!query.trim()) {
    return games.filter((game) => game.featured)
      .sort((a, b) => (a.featuredRank ?? Infinity) - (b.featuredRank ?? Infinity))
  }
  const search = normalize(query)
  if (!search) return []
  return games.map((game) => {
    const names = [game.title, ...game.aliases].map(normalize)
    const rank = names.includes(search) ? 0 : names.some((name) => name.startsWith(search)) ? 1 : 2
    return { game, rank, matches: names.some((name) => name.includes(search)) }
  }).filter((result) => result.matches)
    .sort((a, b) => a.rank - b.rank)
    .map((result) => result.game)
}
