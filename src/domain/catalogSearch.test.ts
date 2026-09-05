import { describe, expect, it } from 'vitest'
import { catalogGames, type CatalogGame } from '../data/catalogGames'
import { findCatalogGames } from './catalogSearch'

describe('catalog search', () => {
  it('ignores spacing, punctuation and full-width characters', () => {
    expect(findCatalogGames(catalogGames, 'Ｐｏｒｔａｌ：２').map((game) => game.appId)).toEqual([620])
    expect(findCatalogGames(catalogGames, ' 星 露 谷 ').map((game) => game.appId)).toEqual([413150])
    expect(findCatalogGames(catalogGames, '!!!')).toEqual([])
  })
  it('puts exact names before longer partial matches and keeps sequels distinct', () => {
    const base = catalogGames[0]
    const games: CatalogGame[] = [
      { ...base, appId: 1, title: 'Example 2', aliases: [] },
      { ...base, appId: 2, title: 'Example', aliases: [] },
    ]
    expect(findCatalogGames(games, 'example').map((game) => game.appId)).toEqual([2, 1])
    expect(findCatalogGames(games, 'example 2').map((game) => game.appId)).toEqual([1])
  })
  it('orders homepage picks independently of catalog insertion order', () => {
    const base = catalogGames[0]
    const games: CatalogGame[] = [
      { ...base, appId: 1, featured: true, featuredRank: 2 },
      { ...base, appId: 2, featured: false, featuredRank: 0 },
      { ...base, appId: 3, featured: true, featuredRank: 1 },
    ]
    expect(findCatalogGames(games, '').map((game) => game.appId)).toEqual([3, 1])
  })
})
