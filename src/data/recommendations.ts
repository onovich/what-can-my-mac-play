import type { RouteRecommendation } from '../domain/recommendation'

// Editorial route recommendations, not performance guarantees or automated score bands.
// Admission: game-specific support record + review of material restrictions.
// Not listed => not supported by our current catalog. Never infer support across runners/stores.
export const recommendations: readonly RouteRecommendation[] = [
  {
    appId: 881100, runner: 'crossover', status: 'recommended', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:881100:2026-09-02'],
    copy: {
      en: { title: 'Choose CrossOver', reason: 'For the Steam edition, CrossOver is our first choice. It has game-specific support records; there is no reason to start with a custom Wine setup.', action: 'Use CrossOver for the Steam edition. Skip custom wrappers as your first route.', conditions: ['CrossOver is paid software; include its cost in your budget.'] },
      'zh-CN': { title: '首选 CrossOver', reason: 'Steam 版优先选择 CrossOver。它有对应游戏的支持记录，没必要从自配 Wine 开始折腾。', action: '玩 Steam 版就先走 CrossOver，不把自定义封装作为第一选择。', conditions: ['CrossOver 是付费软件，预算需要包含运行工具费用。'] },
    },
  },
  {
    appId: 292030, runner: 'crossover', status: 'conditional', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:292030:2026-09-02', 'store:292030:2026-09-04'],
    copy: {
      en: { title: 'Choose CrossOver with DX11', reason: 'DX11 is our preferred route for this game. Do not make DX12 or ray tracing the reason to buy it for Mac.', action: 'Already own it? Start with DX11. For a new Mac-only purchase, wait until the announced requirements change has been reviewed.', conditions: ['Use DX11 instead of starting with DX12.', 'Steam announces a requirements change on 29 September 2026; this recommendation covers the reviewed version, not that update.'] },
      'zh-CN': { title: '选 CrossOver，走 DX11', reason: '这款游戏优先走 DX11。不要为了 DX12 或光追体验而给 Mac 购买它。', action: '已经拥有就从 DX11 开始；如果专门为 Mac 新购，先等已公告的配置要求变更完成复核。', conditions: ['优先使用 DX11，不从 DX12 开始。', 'Steam 公告 2026 年 9 月 29 日变更配置要求；本结论针对已复核版本，不覆盖该次更新。'] },
    },
  },
  {
    appId: 814380, runner: 'crossover', status: 'conditional', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:814380:2026-09-02', 'reddit-sekiro-oztruwa-20250721'],
    copy: {
      en: { title: 'Choose CrossOver; take care with external displays', reason: 'CrossOver is our preferred route. The specific issue to avoid is changing graphics settings while fullscreen on an external display.', action: 'Use CrossOver. On an external display, switch to windowed mode before opening graphics settings.', conditions: ['The external-display workaround comes from a reviewed Preview setup; do not treat it as a fix for every build.', 'Do not buy on the expectation of a guaranteed frame rate.'] },
      'zh-CN': { title: '选 CrossOver，注意外接屏设置', reason: 'CrossOver 是首选路线。需要避开的具体问题是：外接屏全屏状态下进入图形设置。', action: '采用 CrossOver；使用外接屏时，先切到窗口模式再打开图形设置。', conditions: ['外接屏处理办法来自已复核的 Preview 配置，不作为所有版本的通用修复。', '不要以保证某个帧率为前提购买。'] },
    },
  },
  {
    appId: 620, runner: 'crossover', status: 'recommended', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:620:2026-09-02', 'store:620:2026-09-04'],
    copy: {
      en: { title: 'Choose CrossOver, not the legacy Mac route', reason: 'Use the Windows edition through CrossOver. Do not choose a native or Rosetta route based on old Mac labels.', action: 'Choose CrossOver for the Steam Windows edition.', conditions: ['CrossOver is paid software.', 'If co-op is the reason for buying, this catalog does not recommend that purchase.'] },
      'zh-CN': { title: '首选 CrossOver，不走旧 Mac 版', reason: '选择通过 CrossOver 运行 Windows 版。不要根据旧 Mac 标记选择原生或 Rosetta 路线。', action: 'Steam Windows 版使用 CrossOver。', conditions: ['CrossOver 是付费软件。', '如果购买目的主要是合作联机，当前清单不推荐为此购买。'] },
    },
  },
  {
    appId: 1057090, runner: 'crossover', status: 'conditional', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:1057090:2026-09-02'],
    copy: {
      en: { title: 'Choose CrossOver; do not rely on 25.0.0', reason: 'Our reviewed route includes CrossOver 25.0.1, not a confirmed 25.0.0 setup. Treat the runner version as a requirement.', action: 'For an existing copy, use the reviewed 25.0.1 route. Do not purchase solely on a 25.0.0 setup.', conditions: ['An unreviewed newer release is not automatically equivalent to the reviewed setup.', 'Include CrossOver licensing in your budget.'] },
      'zh-CN': { title: '选 CrossOver，不以 25.0.0 为依据', reason: '已复核路线包含 CrossOver 25.0.1，而不是确认可用的 25.0.0 配置。运行器版本是使用条件。', action: '已经拥有游戏，可按已复核的 25.0.1 路线尝试；不要仅凭 25.0.0 配置为 Mac 新购。', conditions: ['未经复核的更新版本，不自动等同于已复核配置。', '预算需包含 CrossOver 授权费用。'] },
    },
  },
  {
    appId: 1245620, runner: 'crossover', status: 'conditional', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:1245620:2026-09-02', 'cw-elden-ring-pratik-20240331', 'cw-elden-ring-finley-20240321'],
    copy: {
      en: { title: 'CrossOver for solo play only', reason: 'Keep this on your list for solo play. If online play is the reason to buy, our answer is no.', action: 'Already own it and want solo play? Choose CrossOver. Do not buy it for Mac multiplayer.', conditions: ['Multiplayer and anti-cheat are outside our supported feature list.', 'Do not apply an Apple silicon route to an Intel Mac.'] },
      'zh-CN': { title: '只考虑 CrossOver 单人路线', reason: '以单人游玩为目的可以考虑；如果为了联机而买，我们的结论是不推荐。', action: '已经拥有、主要玩单人，就选 CrossOver；不要为了 Mac 联机体验购买。', conditions: ['联机与反作弊不在当前支持功能清单内。', 'Apple silicon 路线不能套用到 Intel Mac。'] },
    },
  },
]
