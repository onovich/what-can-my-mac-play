import type { Runner } from '../domain/compatibility'
import type { Locale } from '../i18n/locale'

export type CatalogGame = {
  appId: number
  title: string
  steamUrl: string
  preferredRunner: Runner['kind']
  featured: boolean
  featuredRank?: number
  aliases: readonly string[]
  description?: Record<Locale, string>
}

// Homepage selection is an editorial choice, independent of route-support status.
// The public catalog does not require archived research scores.
export const catalogGames: readonly CatalogGame[] = [
  { appId: 12150, title: "Max Payne 2: The Fall of Max Payne", steamUrl: 'https://store.steampowered.com/app/12150/', preferredRunner: 'crossover', featured: false, aliases: ["马克思佩恩2","馬克思佩恩2","Max Payne 2"], description: { en: "Fight through a noir story with slow-motion gunplay.", 'zh-CN': "在黑色电影般的故事中体验慢动作枪战。" } },
  { appId: 24790, title: "Command & Conquer 3: Tiberium Wars", steamUrl: 'https://store.steampowered.com/app/24790/', preferredRunner: 'crossover', featured: false, aliases: ["命令与征服3","泰伯利亚战争","C&C3"], description: { en: "Command armies in a real-time strategy campaign.", 'zh-CN': "指挥军队，在即时战略战役中争夺胜利。" } },
  { appId: 40970, title: "Stronghold Crusader HD", steamUrl: 'https://store.steampowered.com/app/40970/', preferredRunner: 'crossover', featured: false, aliases: ["要塞十字军东征HD","要塞十字军","Stronghold Crusader"], description: { en: "Build a castle, manage its economy and withstand sieges.", 'zh-CN': "建造城堡、经营经济，抵御攻城部队。" } },
  { appId: 400, title: "Portal", steamUrl: 'https://store.steampowered.com/app/400/', preferredRunner: 'crossover', featured: false, aliases: ["传送门","传送门1","傳送門","Portal 1"], description: { en: "Solve spatial puzzles with a portal gun.", 'zh-CN': "使用传送门枪，破解空间谜题。" } },
  { appId: 21090, title: "F.E.A.R.", steamUrl: 'https://store.steampowered.com/app/21090/', preferredRunner: 'crossover', featured: false, aliases: ["极度恐慌","極度恐慌","FEAR"], description: { en: "Combine tactical gunfights with supernatural horror.", 'zh-CN': "在超自然恐怖氛围中展开战术枪战。" } },
  { appId: 524220, title: "NieR:Automata", steamUrl: 'https://store.steampowered.com/app/524220/', preferredRunner: 'crossover', featured: false, aliases: ["尼尔机械纪元","尼爾自動人形","NieR Automata"], description: { en: "Explore a ruined world through fast-paced android combat.", 'zh-CN': "操控人造人在废墟世界中探索与战斗。" } },
  { appId: 379430, title: 'Kingdom Come: Deliverance', steamUrl: 'https://store.steampowered.com/app/379430/', preferredRunner: 'crossover', featured: false, aliases: ['天国拯救', '天国拯救1', '天國降臨救贖', 'KCD'], description: { en: 'Live through a grounded medieval adventure in an open-world Bohemia.', 'zh-CN': '走进中世纪波希米亚，在开放世界中经历写实冒险。' } },
  { appId: 205100, title: 'Dishonored', steamUrl: 'https://store.steampowered.com/app/205100/', preferredRunner: 'crossover', featured: false, aliases: ['耻辱', '羞辱', '耻辱1', 'Dishonored 1'], description: { en: 'Combine stealth and supernatural powers to choose your way through a city.', 'zh-CN': '结合潜行与超能力，在城市中选择自己的行动路线。' } },
  { appId: 403640, title: 'Dishonored 2', steamUrl: 'https://store.steampowered.com/app/403640/', preferredRunner: 'crossover', featured: false, aliases: ['耻辱2', '羞辱2'], description: { en: 'Explore intricate locations with two assassins and distinct powers.', 'zh-CN': '扮演拥有不同能力的刺客，探索层次丰富的关卡。' } },
  { appId: 502500, title: 'ACE COMBAT 7: SKIES UNKNOWN', steamUrl: 'https://store.steampowered.com/app/502500/', preferredRunner: 'crossover', featured: false, aliases: ['皇牌空战7', '皇牌空战7未知空域', '皇牌空戰7', 'AC7'], description: { en: 'Pilot fighter jets through aerial battles and a story-driven campaign.', 'zh-CN': '驾驶战机参与空战，体验剧情战役。' } },
  { appId: 489830, title: 'The Elder Scrolls V: Skyrim Special Edition', steamUrl: 'https://store.steampowered.com/app/489830/', preferredRunner: 'crossover', featured: true, featuredRank: 2, aliases: ['上古卷轴5特别版', '上古卷轴5天际特别版', '老滚5', 'Skyrim SE', '上古卷軸5'], description: { en: 'Explore Skyrim and shape your own path through an open-world adventure.', 'zh-CN': '探索天际省，在开放世界中选择自己的冒险道路。' } },
  { appId: 374320, title: 'DARK SOULS III', steamUrl: 'https://store.steampowered.com/app/374320/', preferredRunner: 'crossover', featured: false, aliases: ['黑暗之魂3', '黑魂3', '魂3', 'Dark Souls 3', 'DS3'], description: { en: 'Explore a fading kingdom and face demanding boss battles.', 'zh-CN': '探索走向衰败的王国，挑战强敌与首领。' } },
  { appId: 1687950, title: 'Persona 5 Royal', steamUrl: 'https://store.steampowered.com/app/1687950/', preferredRunner: 'crossover', featured: true, featuredRank: 6, aliases: ['女神异闻录5皇家版', '女神异闻录5', 'P5R', '女神異聞錄5皇家版'], description: { en: 'Balance school life with turn-based adventures as a phantom thief.', 'zh-CN': '白天体验校园生活，夜晚展开怪盗的回合制冒险。' } },
  { appId: 894020, title: "Death's Door", steamUrl: 'https://store.steampowered.com/app/894020/', preferredRunner: 'crossover', featured: true, featuredRank: 1, aliases: ['死亡之门', '死亡之門'], description: { en: 'Explore a mysterious world as a crow, solving puzzles and fighting bosses.', 'zh-CN': '扮演乌鸦探索神秘世界，解谜并挑战强敌。' } },
  { appId: 570940, title: 'DARK SOULS: REMASTERED', steamUrl: 'https://store.steampowered.com/app/570940/', preferredRunner: 'crossover', featured: true, featuredRank: 4, aliases: ['黑暗之魂', '黑暗之魂重制版', '黑魂1', '魂1', 'DSR', 'Dark Souls Remastered'], description: { en: 'Explore a connected world and master demanding combat.', 'zh-CN': '探索相互连通的世界，挑战需要耐心的战斗。' } },
  { appId: 2321470, title: 'Deep Rock Galactic: Survivor', steamUrl: 'https://store.steampowered.com/app/2321470/', preferredRunner: 'crossover', featured: true, featuredRank: 5, aliases: ['深岩银河幸存者', '深岩银河：幸存者', '深岩幸存者', 'DRG Survivor'], description: { en: 'Mine resources and survive swarms in a single-player shooter.', 'zh-CN': '单人挖矿、升级武器，在虫群中生存。' } },
  { appId: 413150, title: 'Stardew Valley', steamUrl: 'https://store.steampowered.com/app/413150/', preferredRunner: 'native', featured: false, aliases: ['星露谷物语', '星露谷', '星露穀物語'], description: { en: 'Farming, fishing and life in a small town.', 'zh-CN': '种田、钓鱼，经营自己的小镇生活。' } },
  { appId: 1145350, title: 'Hades II', steamUrl: 'https://store.steampowered.com/app/1145350/', preferredRunner: 'native', featured: false, aliases: ['哈迪斯2', '哈迪斯 2', '黑帝斯2', '黑帝斯 2'], description: { en: 'Fight through the Underworld in an action roguelike.', 'zh-CN': '在冥界战斗闯关，每次挑战都有新的组合。' } },
  { appId: 2379780, title: 'Balatro', steamUrl: 'https://store.steampowered.com/app/2379780/', preferredRunner: 'native', featured: false, aliases: ['小丑牌'], description: { en: 'Build poker hands and combine jokers for higher scores.', 'zh-CN': '组合扑克牌与小丑牌，挑战更高分数。' } },
  { appId: 427520, title: 'Factorio', steamUrl: 'https://store.steampowered.com/app/427520/', preferredRunner: 'native', featured: false, aliases: ['异星工厂'], description: { en: 'Design production lines and automate a growing factory.', 'zh-CN': '铺设生产线，建造自动运转的工厂。' } },
  { appId: 881100, title: 'Noita', steamUrl: 'https://store.steampowered.com/app/881100/', preferredRunner: 'crossover', featured: true, featuredRank: 3, aliases: ['女巫', '诺伊塔'], description: { en: 'Build wands and explore a world of reactive pixels.', 'zh-CN': '组合魔杖法术，探索像素会相互作用的地下世界。' } },
  { appId: 292030, title: 'The Witcher 3: Wild Hunt', steamUrl: 'https://store.steampowered.com/app/292030/', preferredRunner: 'crossover', featured: false, aliases: ['巫师3', '巫师 3', '狂猎', '巫師3', 'Witcher 3'] },
  { appId: 814380, title: 'Sekiro: Shadows Die Twice', steamUrl: 'https://store.steampowered.com/app/814380/', preferredRunner: 'crossover', featured: false, aliases: ['只狼', '只狼影逝二度', 'Sekiro'] },
  { appId: 620, title: 'Portal 2', steamUrl: 'https://store.steampowered.com/app/620/', preferredRunner: 'crossover', featured: false, aliases: ['传送门2', '传送门 2', '傳送門2'] },
  { appId: 1057090, title: 'Ori and the Will of the Wisps', steamUrl: 'https://store.steampowered.com/app/1057090/', preferredRunner: 'crossover', featured: false, aliases: ['奥日', '精灵与萤火意志', '奥日2', 'Ori 2'] },
  { appId: 1245620, title: 'Elden Ring', steamUrl: 'https://store.steampowered.com/app/1245620/', preferredRunner: 'crossover', featured: false, aliases: ['艾尔登法环', '老头环', '法环', '艾爾登法環'] },
]
