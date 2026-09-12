import { describe, expect, it } from 'vitest'
import { catalogGames, type CatalogGame } from '../data/catalogGames'
import { findCatalogGames } from './catalogSearch'

describe('catalog search', () => {
  it('finds the September 13 batch without transferring support to other editions', () => {
    for (const [query, appId] of [['马克思佩恩2', 12150], ['泰伯利亚战争', 24790], ['要塞十字军', 40970], ['传送门1', 400], ['FEAR', 21090], ['尼尔机械纪元', 524220]] as const) {
      expect(findCatalogGames(catalogGames, query).map((game) => game.appId)).toEqual([appId])
    }
    expect(findCatalogGames(catalogGames, 'Portal')[0].appId).toBe(400)
    expect(findCatalogGames(catalogGames, 'Portal 2').map((game) => game.appId)).toEqual([620])
    expect(findCatalogGames(catalogGames, 'Stronghold Crusader Definitive Edition')).toEqual([])
  })
  it('finds newly reviewed games by alias without merging sequels', () => {
    expect(findCatalogGames(catalogGames, '耻辱2').map((game) => game.appId)).toEqual([403640])
    expect(findCatalogGames(catalogGames, '耻辱')[0].appId).toBe(205100)
    expect(findCatalogGames(catalogGames, '天国拯救').map((game) => game.appId)).toEqual([379430])
    expect(findCatalogGames(catalogGames, 'AC7').map((game) => game.appId)).toEqual([502500])
  })
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
