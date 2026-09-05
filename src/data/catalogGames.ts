import type { Runner } from '../domain/compatibility'
import type { Locale } from '../i18n/locale'

export type CatalogGame = {
  appId: number
  title: string
  steamUrl: string
  preferredRunner: Runner['kind']
  featured: boolean
  aliases: readonly string[]
  description?: Record<Locale, string>
}

// Homepage selection is an editorial choice, independent of route-support status.
// The public catalog does not require archived research scores.
export const catalogGames: readonly CatalogGame[] = [
  { appId: 570940, title: 'DARK SOULS: REMASTERED', steamUrl: 'https://store.steampowered.com/app/570940/', preferredRunner: 'crossover', featured: true, aliases: ['黑暗之魂', '黑暗之魂重制版'], description: { en: 'Explore a connected world and master demanding combat.', 'zh-CN': '探索相互连通的世界，挑战需要耐心的战斗。' } },
  { appId: 2321470, title: 'Deep Rock Galactic: Survivor', steamUrl: 'https://store.steampowered.com/app/2321470/', preferredRunner: 'crossover', featured: true, aliases: ['深岩银河幸存者', '深岩银河：幸存者'], description: { en: 'Mine resources and survive swarms in a single-player shooter.', 'zh-CN': '单人挖矿、升级武器，在虫群中生存。' } },
  { appId: 413150, title: 'Stardew Valley', steamUrl: 'https://store.steampowered.com/app/413150/', preferredRunner: 'native', featured: false, aliases: ['星露谷物语'], description: { en: 'Farming, fishing and life in a small town.', 'zh-CN': '种田、钓鱼，经营自己的小镇生活。' } },
  { appId: 1145350, title: 'Hades II', steamUrl: 'https://store.steampowered.com/app/1145350/', preferredRunner: 'native', featured: false, aliases: ['哈迪斯2', '哈迪斯 2', '黑帝斯2', '黑帝斯 2'], description: { en: 'Fight through the Underworld in an action roguelike.', 'zh-CN': '在冥界战斗闯关，每次挑战都有新的组合。' } },
  { appId: 2379780, title: 'Balatro', steamUrl: 'https://store.steampowered.com/app/2379780/', preferredRunner: 'native', featured: false, aliases: ['小丑牌'], description: { en: 'Build poker hands and combine jokers for higher scores.', 'zh-CN': '组合扑克牌与小丑牌，挑战更高分数。' } },
  { appId: 427520, title: 'Factorio', steamUrl: 'https://store.steampowered.com/app/427520/', preferredRunner: 'native', featured: false, aliases: ['异星工厂'], description: { en: 'Design production lines and automate a growing factory.', 'zh-CN': '铺设生产线，建造自动运转的工厂。' } },
  { appId: 881100, title: 'Noita', steamUrl: 'https://store.steampowered.com/app/881100/', preferredRunner: 'crossover', featured: true, aliases: ['女巫'], description: { en: 'Build wands and explore a world of reactive pixels.', 'zh-CN': '组合魔杖法术，探索像素会相互作用的地下世界。' } },
  { appId: 292030, title: 'The Witcher 3: Wild Hunt', steamUrl: 'https://store.steampowered.com/app/292030/', preferredRunner: 'crossover', featured: false, aliases: ['巫师3', '巫师 3', '狂猎'] },
  { appId: 814380, title: 'Sekiro: Shadows Die Twice', steamUrl: 'https://store.steampowered.com/app/814380/', preferredRunner: 'crossover', featured: false, aliases: ['只狼'] },
  { appId: 620, title: 'Portal 2', steamUrl: 'https://store.steampowered.com/app/620/', preferredRunner: 'crossover', featured: false, aliases: ['传送门2', '传送门 2'] },
  { appId: 1057090, title: 'Ori and the Will of the Wisps', steamUrl: 'https://store.steampowered.com/app/1057090/', preferredRunner: 'crossover', featured: false, aliases: ['奥日', '精灵与萤火意志'] },
  { appId: 1245620, title: 'Elden Ring', steamUrl: 'https://store.steampowered.com/app/1245620/', preferredRunner: 'crossover', featured: false, aliases: ['艾尔登法环'] },
]
