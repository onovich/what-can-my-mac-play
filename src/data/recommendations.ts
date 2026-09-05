import type { RouteRecommendation } from '../domain/recommendation'

// Editorial route recommendations, not performance guarantees or automated score bands.
// Admission: game-specific support record + review of material restrictions.
// Not listed => not supported by our current catalog. Never infer support across runners/stores.
export const recommendations: readonly RouteRecommendation[] = [
  {
    appId: 489830, runner: 'crossover', status: 'recommended', reviewedAt: '2026-09-05',
    basisIds: ['codeweavers:489830:2026-09-05', 'store:489830:2026-09-05'],
    copy: {
      en: { reason: 'CodeWeavers rates the Mac route Runs Great, tested with 26.3.0.', action: 'Play Skyrim Special Edition through CrossOver.', conditions: [] },
      'zh-CN': { reason: 'CodeWeavers 的 Mac 路线评级为 Runs Great，测试版本 26.3.0。', action: '使用 CrossOver 游玩《天际特别版》。', conditions: [] },
    },
  },
  {
    appId: 374320, runner: 'crossover', status: 'conditional', reviewedAt: '2026-09-05',
    basisIds: ['codeweavers:374320:2026-09-05', 'store:374320:2026-09-05'],
    copy: {
      en: { reason: 'CodeWeavers rates the Mac route Runs Well, tested with 26.2.0; kept outside the stronger homepage picks.', action: 'Use CrossOver for the Steam Windows edition.', conditions: [] },
      'zh-CN': { reason: 'CodeWeavers 的 Mac 路线评级为 Runs Well，测试版本 26.2.0；不纳入首页优先精选。', action: 'Steam Windows 版使用 CrossOver。', conditions: [] },
    },
  },
  {
    appId: 1687950, runner: 'crossover', status: 'recommended', reviewedAt: '2026-09-05',
    basisIds: ['codeweavers:1687950:2026-09-05', 'store:1687950:2026-09-05'],
    copy: {
      en: { note: 'macOS 15 or later', reason: 'CodeWeavers rates the Mac route Runs Great with 26.3.0. Our supported macOS 15+ scope follows its recorded Mac setups for this AVX game.', action: 'Play the Steam Windows edition with CrossOver.', conditions: ['Use macOS 15 or later for this route.'] },
      'zh-CN': { note: '适用 macOS 15 及以上', reason: 'CodeWeavers 的 Mac 路线评级为 Runs Great，测试版本 26.3.0。此 AVX 游戏的推荐系统范围取自已记录的 macOS 15 配置。', action: '使用 CrossOver 游玩 Steam Windows 版。', conditions: ['本方案适用 macOS 15 或更新系统。'] },
    },
  },
  {
    appId: 894020, runner: 'crossover', status: 'recommended', reviewedAt: '2026-09-05',
    basisIds: ['codeweavers:894020:2026-09-05', 'store:894020:2026-09-05'],
    copy: {
      en: { reason: 'CodeWeavers rates the Mac route Runs Great, tested with 26.3.0.', action: 'Play the Steam Windows edition with CrossOver.', conditions: [] },
      'zh-CN': { reason: 'CodeWeavers 的 Mac 路线评级为 Runs Great，测试版本 26.3.0。', action: '使用 CrossOver 游玩 Steam Windows 版。', conditions: [] },
    },
  },
  {
    appId: 570940, runner: 'crossover', status: 'recommended', reviewedAt: '2026-09-05',
    basisIds: ['codeweavers:570940:2026-09-05', 'store:570940:2026-09-05'],
    copy: {
      en: { reason: 'CodeWeavers lists the Mac route as Runs Great on CrossOver 26.1.0.', action: 'Play the Steam Windows edition with CrossOver.', conditions: [] },
      'zh-CN': { reason: 'CodeWeavers 将 CrossOver 26.1.0 的 Mac 路线列为运行出色。', action: '使用 CrossOver 游玩 Steam Windows 版。', conditions: [] },
    },
  },
  {
    appId: 2321470, runner: 'crossover', status: 'recommended', reviewedAt: '2026-09-05',
    basisIds: ['codeweavers:2321470:2026-09-05', 'store:2321470:2026-09-05'],
    copy: {
      en: { reason: 'CodeWeavers lists the Mac route as Runs Great on CrossOver 26.2.0.', action: 'Play the Steam Windows edition with CrossOver.', conditions: [] },
      'zh-CN': { reason: 'CodeWeavers 将 CrossOver 26.2.0 的 Mac 路线列为运行出色。', action: '使用 CrossOver 游玩 Steam Windows 版。', conditions: [] },
    },
  },
  {
    appId: 413150, runner: 'native', status: 'recommended', reviewedAt: '2026-09-05',
    basisIds: ['store:413150:2026-09-05', 'steam:macos-client:2026-09-05'],
    copy: {
      en: { reason: 'Steam lists a supported Mac edition.', action: 'Install the Steam Mac edition to start your farm.', conditions: ['macOS 12 or later, a 2 GHz CPU and at least 2 GB RAM.', '500 MB storage and OpenGL 2 graphics with 256 MB video memory; no CrossOver is needed.'] },
      'zh-CN': { reason: 'Steam 当前列出受支持的 Mac 版。', action: '安装 Steam 的 Mac 版，开始经营农场。', conditions: ['macOS 12 或更新版本、2 GHz 处理器，至少 2 GB 内存。', '500 MB 存储空间，支持 OpenGL 2 的显卡与 256 MB 显存；无需 CrossOver。'] },
    },
  },
  {
    appId: 2379780, runner: 'native', status: 'recommended', reviewedAt: '2026-09-05',
    basisIds: ['store:2379780:2026-09-05', 'steam:macos-client:2026-09-05'],
    copy: {
      en: { reason: 'The publisher supports Intel and Apple silicon Macs.', action: 'Install the Steam Mac edition and start playing.', conditions: ['macOS 12 or later; Intel and Apple silicon are supported.', 'We recommend at least 4 GB RAM.'] },
      'zh-CN': { reason: '发行商明确支持 Intel 和 Apple 芯片 Mac。', action: '安装 Steam 的 Mac 版即可开始游玩。', conditions: ['macOS 12 或更新版本；支持 Intel 和 Apple 芯片。', '建议至少 4 GB 内存。'] },
    },
  },
  {
    appId: 427520, runner: 'native', status: 'recommended', reviewedAt: '2026-09-05',
    basisIds: ['store:427520:2026-09-05', 'factorio:fff-371', 'steam:macos-client:2026-09-05'],
    copy: {
      en: { note: 'Free demo available', reason: 'Official Intel and Apple silicon builds with a demo.', action: 'Try the Mac demo on Steam before buying.', conditions: ['macOS 12 or later, a 2016 or newer Mac and at least 8 GB RAM; Apple silicon and 16 GB RAM are recommended.', 'This recommendation covers the base game; no CrossOver is needed.'] },
      'zh-CN': { note: '可免费试玩', reason: '官方提供 Intel 和 Apple 芯片版本及试玩。', action: '先在 Steam 试玩 Mac 版，再决定是否购买。', conditions: ['macOS 12 或更新版本、2016 年或更新的 Mac，至少 8 GB 内存；推荐 Apple 芯片与 16 GB 内存。', '本建议针对游戏本体，无需 CrossOver。'] },
    },
  },
  {
    appId: 1145350, runner: 'native', status: 'recommended', reviewedAt: '2026-09-05',
    basisIds: ['store:1145350:2026-09-05'],
    copy: {
      en: { note: 'M1 or newer Apple silicon', reason: 'The publisher supports Apple silicon Macs.', action: 'On an M1 or newer Apple silicon Mac, install the Steam Mac edition.', conditions: ['macOS 12 or later, at least 8 GB RAM and 11 GB storage.', 'Intel Macs are not supported; no CrossOver is needed.'] },
      'zh-CN': { note: '需 M1 或更新 Apple 芯片', reason: '发行商明确支持 Apple 芯片 Mac。', action: '使用 M1 或更新 Apple 芯片的 Mac，直接安装 Steam 的 Mac 版。', conditions: ['macOS 12 或更新版本，至少 8 GB 内存和 11 GB 存储空间。', '不支持 Intel Mac；无需 CrossOver。'] },
    },
  },
  {
    appId: 881100, runner: 'crossover', status: 'recommended', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:881100:2026-09-02'],
    copy: {
      en: { reason: 'Game-specific CrossOver support record.', action: 'Play the Steam edition with CrossOver.', conditions: [] },
      'zh-CN': { reason: '有对应游戏的 CrossOver 支持记录。', action: 'Steam 版使用 CrossOver。', conditions: [] },
    },
  },
  {
    appId: 292030, runner: 'crossover', status: 'conditional', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:292030:2026-09-02', 'store:292030:2026-09-04'],
    copy: {
      en: { note: 'Wait before buying for Mac', reason: 'DX11 is the reviewed route.', action: 'Already own it? Use DX11. Buying for Mac? Wait for the update review.', conditions: ['Do not buy for DX12 or ray tracing.', 'Steam announces a requirements change on 29 September 2026; this recommendation covers the reviewed version, not that update.'] },
      'zh-CN': { note: '暂不建议为 Mac 购买', reason: '已复核路线使用 DX11。', action: '暂不建议为 Mac 购买，等待更新复核结果；已有游戏可使用 CrossOver 的 DX11 方案。', conditions: ['不要为了 DX12 或光追体验购买。', 'Steam 公告 2026 年 9 月 29 日变更配置要求；本结论针对已复核版本，不覆盖该次更新。'] },
    },
  },
  {
    appId: 814380, runner: 'crossover', status: 'conditional', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:814380:2026-09-02', 'reddit-sekiro-oztruwa-20250721'],
    copy: {
      en: { note: 'External-display workaround required', reason: 'External-display graphics settings need a workaround.', action: 'On an external display, switch to windowed mode before opening graphics settings.', conditions: ['The external-display workaround comes from a reviewed Preview setup; do not treat it as a fix for every build.', 'Do not buy on the expectation of a guaranteed frame rate.'] },
      'zh-CN': { note: '外接屏需切换窗口模式', reason: '外接屏图形设置需要绕过处理。', action: '使用外接屏时，先切到窗口模式再打开图形设置。', conditions: ['外接屏处理办法来自已复核的 Preview 配置，不作为所有版本的通用修复。', '不要以保证某个帧率为前提购买。'] },
    },
  },
  {
    appId: 620, runner: 'crossover', status: 'recommended', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:620:2026-09-02', 'store:620:2026-09-04'],
    copy: {
      en: { note: 'Want to play co-op? Hold off on buying.', reason: 'Use the Steam Windows edition, not the legacy Mac edition.', action: 'Use the Steam Windows edition, not the legacy Mac edition.', conditions: ['Want to play co-op with friends on Mac? Hold off on buying.'] },
      'zh-CN': { note: '想玩合作模式，暂不建议购买', reason: '使用 Steam Windows 版，不走旧 Mac 版。', action: '使用 Steam Windows 版，不走旧 Mac 版。', conditions: ['如果想和朋友一起玩合作模式，暂不建议为 Mac 购买。'] },
    },
  },
  {
    appId: 1057090, runner: 'crossover', status: 'conditional', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:1057090:2026-09-02'],
    copy: {
      en: { note: 'Version-specific support', reason: 'The reviewed route includes 25.0.1, not 25.0.0.', action: 'Already own it? Use CrossOver 25.0.1. Do not buy based on a 25.0.0 setup.', conditions: ['An unreviewed newer release is not automatically equivalent to the reviewed setup.'] },
      'zh-CN': { note: '有版本要求', reason: '已复核路线包含 25.0.1，不是 25.0.0。', action: '已有游戏使用 CrossOver 25.0.1；不要仅凭 25.0.0 配置为 Mac 新购。', conditions: ['未经复核的更新版本，不自动等同于已复核配置。'] },
    },
  },
  {
    appId: 1245620, runner: 'crossover', status: 'conditional', reviewedAt: '2026-09-04',
    basisIds: ['evidence:codeweavers:1245620:2026-09-02', 'cw-elden-ring-pratik-20240331', 'cw-elden-ring-finley-20240321'],
    copy: {
      en: { note: 'Solo play only', reason: 'Solo play only.', action: 'For existing owners playing solo. Do not buy for Mac multiplayer.', conditions: ['Anti-cheat is not supported.', 'Apple silicon only; do not apply this route to an Intel Mac.'] },
      'zh-CN': { note: '仅限单人', reason: '仅限单人游玩。', action: '适合已有游戏的单人玩家；不要为了 Mac 联机体验购买。', conditions: ['不支持反作弊功能。', '仅适用于 Apple silicon，不能套用到 Intel Mac。'] },
    },
  },
]
