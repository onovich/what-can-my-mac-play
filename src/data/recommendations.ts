import type { RouteRecommendation } from '../domain/recommendation'

// Editorial route recommendations, not performance guarantees or automated score bands.
// Admission: game-specific support record + review of material restrictions.
// Not listed => not supported by our current catalog. Never infer support across runners/stores.
export const recommendations: readonly RouteRecommendation[] = [
  {
    appId: 881100, runner: 'crossover', status: 'recommended', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:881100:2026-09-02'],
    copy: {
      en: { title: 'Steam edition · CrossOver', reason: 'Game-specific CrossOver support record.', action: 'Play the Steam edition with CrossOver.', conditions: [] },
      'zh-CN': { title: 'Steam 版 · CrossOver', reason: '有对应游戏的 CrossOver 支持记录。', action: 'Steam 版使用 CrossOver。', conditions: [] },
    },
  },
  {
    appId: 292030, runner: 'crossover', status: 'conditional', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:292030:2026-09-02', 'store:292030:2026-09-04'],
    copy: {
      en: { title: 'CrossOver · Wait before buying for Mac', reason: 'DX11 is the reviewed route.', action: 'Already own it? Use DX11. Buying for Mac? Wait for the update review.', conditions: ['Do not buy for DX12 or ray tracing.', 'Steam announces a requirements change on 29 September 2026; this recommendation covers the reviewed version, not that update.'] },
      'zh-CN': { title: 'CrossOver · Mac 新购暂缓', reason: '已复核路线使用 DX11。', action: '已有游戏使用 DX11；为 Mac 新购暂缓，等待更新复核结果。', conditions: ['不要为了 DX12 或光追体验购买。', 'Steam 公告 2026 年 9 月 29 日变更配置要求；本结论针对已复核版本，不覆盖该次更新。'] },
    },
  },
  {
    appId: 814380, runner: 'crossover', status: 'conditional', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:814380:2026-09-02', 'reddit-sekiro-oztruwa-20250721'],
    copy: {
      en: { title: 'CrossOver · External-display workaround required', reason: 'External-display graphics settings need a workaround.', action: 'On an external display, switch to windowed mode before opening graphics settings.', conditions: ['The external-display workaround comes from a reviewed Preview setup; do not treat it as a fix for every build.', 'Do not buy on the expectation of a guaranteed frame rate.'] },
      'zh-CN': { title: 'CrossOver · 外接屏需切换窗口模式', reason: '外接屏图形设置需要绕过处理。', action: '使用外接屏时，先切到窗口模式再打开图形设置。', conditions: ['外接屏处理办法来自已复核的 Preview 配置，不作为所有版本的通用修复。', '不要以保证某个帧率为前提购买。'] },
    },
  },
  {
    appId: 620, runner: 'crossover', status: 'recommended', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:620:2026-09-02', 'store:620:2026-09-04'],
    copy: {
      en: { title: 'CrossOver · Not for a co-op purchase', reason: 'Use the Steam Windows edition, not the legacy Mac edition.', action: 'Use the Steam Windows edition, not the legacy Mac edition.', conditions: ['Do not buy for co-op play on Mac.'] },
      'zh-CN': { title: 'CrossOver · 不建议为合作联机购买', reason: '使用 Steam Windows 版，不走旧 Mac 版。', action: '使用 Steam Windows 版，不走旧 Mac 版。', conditions: ['不要为了 Mac 合作联机体验购买。'] },
    },
  },
  {
    appId: 1057090, runner: 'crossover', status: 'conditional', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:1057090:2026-09-02'],
    copy: {
      en: { title: 'CrossOver · Version-specific support', reason: 'The reviewed route includes 25.0.1, not 25.0.0.', action: 'Already own it? Use CrossOver 25.0.1. Do not buy based on a 25.0.0 setup.', conditions: ['An unreviewed newer release is not automatically equivalent to the reviewed setup.'] },
      'zh-CN': { title: 'CrossOver · 有版本要求', reason: '已复核路线包含 25.0.1，不是 25.0.0。', action: '已有游戏使用 CrossOver 25.0.1；不要仅凭 25.0.0 配置为 Mac 新购。', conditions: ['未经复核的更新版本，不自动等同于已复核配置。'] },
    },
  },
  {
    appId: 1245620, runner: 'crossover', status: 'conditional', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:1245620:2026-09-02', 'cw-elden-ring-pratik-20240331', 'cw-elden-ring-finley-20240321'],
    copy: {
      en: { title: 'CrossOver · Solo play only', reason: 'Solo play only.', action: 'For existing owners playing solo. Do not buy for Mac multiplayer.', conditions: ['Anti-cheat is not supported.', 'Apple silicon only; do not apply this route to an Intel Mac.'] },
      'zh-CN': { title: 'CrossOver · 仅限单人', reason: '仅限单人游玩。', action: '适合已有游戏的单人玩家；不要为了 Mac 联机体验购买。', conditions: ['不支持反作弊功能。', '仅适用于 Apple silicon，不能套用到 Intel Mac。'] },
    },
  },
]
