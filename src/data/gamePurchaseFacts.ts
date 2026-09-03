import type { GamePurchaseFacts, PurchaseFact } from '../domain/purchase'

// Manually checked snapshots, not live storefront data or gameplay reports.
// Sources and limits: docs/research/sample-game-purchase-evidence.md.
const checkedAt = '2026-09-04'
const appIds = [881100, 292030, 814380, 620, 1057090, 1245620] as const

const portalPlatformConflict: PurchaseFact = {
  kind: 'store-requirements', edition: 'steam', checkedAt,
  sourceUrl: 'https://store.steampowered.com/api/appdetails?appids=620&l=english',
  summary: {
    en: 'Steam marks macOS availability as false but retains old Mac requirements (OS X 10.6.7 and Intel Core Duo). Those leftover fields do not establish current native or Rosetta support.',
    'zh-CN': 'Steam 的 macOS 可用标记为 false，却仍保留 OS X 10.6.7、Intel Core Duo 等旧 Mac 要求。这些残留字段不能证明当前原生或 Rosetta 支持。',
  },
}

const noitaGogRecipe: PurchaseFact = {
  kind: 'installation-recipe', edition: 'gog', checkedAt,
  sourcePublishedAt: '2023-08-12',
  sourceUrl: 'https://www.paulthetall.com/noita-for-mac/',
  summary: {
    en: 'A 2023 Porting Kit maintainer article describes a GOG offline-installer recipe, not a verified Steam setup. Its brief Apple silicon test omits the chip model, macOS, engine/backend and game build. Current compatibility remains unverified; do not transfer this to the Steam edition.',
    'zh-CN': 'Porting Kit 维护者在 2023 年发布的是 GOG 离线安装器配方，并非已验证的 Steam 配置。其短时 Apple silicon 测试没有具体芯片、macOS、引擎/后端与游戏版本。当前兼容性仍未核实，不能套用到 Steam 版本。',
  },
}

export const gamePurchaseFacts: readonly GamePurchaseFacts[] = appIds.map((appId) => ({
  appId,
  store: {
    kind: 'store-requirements', edition: 'steam', checkedAt,
    sourceUrl: appId === 292030
      ? 'https://store.steampowered.com/api/appdetails?appids=292030&l=english&cc=us'
      : `https://store.steampowered.com/app/${appId}/`,
    summary: appId === 292030 ? {
      en: 'Steam currently lists Windows, not macOS, and says system requirements will change on 29 September 2026. Recheck the game build and requirements before purchase; the older CrossOver snapshot does not validate a later update.',
      'zh-CN': 'Steam 当前列出 Windows 而非 macOS，并提示配置要求将在 2026 年 9 月 29 日变更。购买前请重新核对游戏版本与要求，旧 CrossOver 快照不能证明后续更新可玩。',
    } : appId === 620 ? {
      en: 'The current Steam page lists Windows and Linux requirements, not macOS. Do not buy this Steam edition on the assumption that an old Mac release supports your current Mac.',
      'zh-CN': '当前 Steam 页面列出 Windows 和 Linux 要求，未列出 macOS。不要因为曾有 Mac 版本，就假定当前 Mac 能直接运行并据此购买。',
    } : {
      en: 'The current Steam listing is Windows-only; macOS is not listed. Running this edition on a Mac needs separate compatibility evidence. This does not establish availability in other stores.',
      'zh-CN': '当前 Steam 仅列出 Windows 版本，未列出 macOS。在 Mac 上运行此版本需要额外兼容性证据；这一结论不涉及其他商店的版本。',
    },
  },
  routes: {
    ...(appId === 620 ? { native: [portalPlatformConflict], rosetta: [portalPlatformConflict] } : {}),
    ...(appId === 881100 ? { 'porting-kit': [noitaGogRecipe] } : {}),
  },
}))
