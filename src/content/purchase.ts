import type { Locale } from '../i18n/locale'
import type { Runner } from '../domain/compatibility'

export const purchaseCopy = {
  en: {
    title: 'Before you buy',
    verdict: 'Not enough evidence for a purchase recommendation yet.',
    intro: 'The scores above summarize a CrossOver research snapshot, not a test of your Mac. They do not apply to other routes.',
    choose: 'Compare a non-VM route',
    cost: 'Extra software cost',
    setup: 'Setup and limitations',
    evidence: 'Evidence for this game',
    partial: 'Partial CrossOver evidence only. The scored snapshot does not establish a fully matched environment or full-playthrough coverage. First-hand reports below are shown separately.',
    missing: 'Not verified for this game. This does not mean it cannot run; no score or purchase recommendation is inferred.',
    source: 'Official route information',
    storeTitle: 'This store edition',
    storeUnknown: 'Store requirements have not been checked for this game yet.',
    factsBoundary: 'Store requirements and installation recipes do not establish performance on your Mac and do not change the scores.',
    scope: 'Virtual machines, cloud gaming and remote streaming are excluded. Whisky is historical-only because it is unmaintained. GPTK is a developer toolkit; D3DMetal, DXVK and DXMT are graphics backends, not separate consumer routes.',
    checklist: 'Check these before paying',
    checks: [
      'Confirm the exact store edition and macOS requirements; an old Mac label is not proof of current Apple silicon support.',
      'Find a dated report matching chip, memory, macOS, runner and graphics backend versions.',
      'Verify launchers, DRM, anti-cheat, multiplayer, saves and completion separately. Unknown does not mean supported.',
      'Include runner cost and setup time. Check current trial and refund terms; do not assume a refund is guaranteed.',
    ],
    reviewed: 'Route research checked: 4 September 2026. Links describe the tools, not proof that this game works.',
  },
  'zh-CN': {
    title: '购买前检查',
    verdict: '当前证据还不足以支持购买建议。',
    intro: '上方评分仅概括 CrossOver 研究快照，不是对你的 Mac 的实测，也不适用于其他运行方案。',
    choose: '对比非虚拟机运行方案',
    cost: '额外软件费用',
    setup: '配置门槛与限制',
    evidence: '这款游戏的对应证据',
    partial: '仅有不完整的 CrossOver 证据。评分快照尚未覆盖完整匹配的环境与通关情况；下方第一手报告单独展示。',
    missing: '尚未验证这款游戏在此方案下的表现。不代表不能运行，也不会据此生成评分或购买建议。',
    source: '查看方案官方说明',
    storeTitle: '这款游戏的商店版本',
    storeUnknown: '尚未核对这款游戏的商店要求。',
    factsBoundary: '商店要求和安装配方不能证明在你的 Mac 上的运行表现，也不参与评分。',
    scope: '排除虚拟机、云游戏和远程串流。Whisky 已停止维护，仅保留历史参考。GPTK 是开发者工具包；D3DMetal、DXVK 和 DXMT 是图形后端，不是独立的玩家运行方案。',
    checklist: '付款前需要确认',
    checks: [
      '核对具体商店版本与 macOS 要求；旧的 Mac 支持标志不能证明支持当前 Apple silicon 环境。',
      '寻找带日期、匹配芯片、内存、macOS、运行器与图形后端版本的报告。',
      '分别确认启动器、DRM、反作弊、联机、存档与通关情况；未知不等于支持。',
      '计入运行方案费用与配置时间。查看当前试用和退款条件，不将退款视为保证。',
    ],
    reviewed: '方案调研核对日期：2026 年 9 月 4 日。链接介绍工具，不代表这款游戏已验证可玩。',
  },
} satisfies Record<Locale, unknown>

type RouteCopy = { cost: string; setup: string }

type PurchaseRoute = {
  id: Exclude<Runner['kind'], 'virtual-machine' | 'whisky'>
  url: string | null
  copy: Record<Locale, RouteCopy>
}

export const purchaseRoutes: readonly PurchaseRoute[] = [
  { id: 'native', url: null, copy: {
    en: { cost: 'No separate Windows compatibility tool', setup: 'Check the store evidence below for this exact edition, chip architecture and supported macOS versions. A Mac listing alone does not establish Apple silicon compatibility.' },
    'zh-CN': { cost: '无需另购 Windows 兼容工具', setup: '结合商店证据核对具体版本、芯片架构与支持的 macOS。商店列出 Mac 版本，不等于已经支持 Apple silicon。' },
  } },
  { id: 'rosetta', url: 'https://support.apple.com/en-us/102527', copy: {
    en: { cost: 'No separately purchased runner', setup: 'For compatible Intel Mac apps on Apple silicon, not Windows executables. Does not restore support for old 32-bit Mac apps.' },
    'zh-CN': { cost: '无需另购运行器', setup: '用于在 Apple silicon 上运行符合条件的 Intel Mac 应用，不用于 Windows 程序，也不会恢复旧 32 位 Mac 应用支持。' },
  } },
  { id: 'crossover', url: 'https://www.codeweavers.com/crossover', copy: {
    en: { cost: 'Paid; trial available — check current terms', setup: 'Consumer-facing Wine-based tool. Bottle, runner and backend versions still matter; no Windows installation required.' },
    'zh-CN': { cost: '付费；提供试用，以当前条款为准', setup: '面向普通用户的 Wine 类兼容工具。仍需匹配 Bottle、运行器与图形后端版本；无需安装 Windows。' },
  } },
  { id: 'porting-kit', url: 'https://www.paulthetall.com/portingkit-2/', copy: {
    en: { cost: 'Free tool; game purchase separate', setup: 'Game/store-specific installation recipes. Check whether the supported port matches your store edition and engine.' },
    'zh-CN': { cost: '工具免费；游戏另购', setup: '按游戏与商店提供安装方案。需核对是否存在适用于你的商店版本与引擎的 Port。' },
  } },
  { id: 'wine', url: 'https://www.winehq.org/', copy: {
    en: { cost: 'Open-source foundation; distribution-dependent', setup: 'A compatibility layer, not a turnkey game installer. Pin the distribution, build, dependencies and graphics configuration.' },
    'zh-CN': { cost: '开源基础组件；具体发行方式不同', setup: '兼容层而非开箱即用的游戏安装器。需明确发行版、构建版本、依赖与图形配置。' },
  } },
  { id: 'sikarugir', url: 'https://github.com/Sikarugir-App/Sikarugir', copy: {
    en: { cost: 'Check project and component terms', setup: 'Wineskin successor for custom wrappers, not a drop-in CrossOver replacement. Requires recipe/engine-specific verification. Use the official repository, not lookalike sites.' },
    'zh-CN': { cost: '以项目及各组件条款为准', setup: 'Wineskin 的后继工具，用于自定义封装，不能直接替代 CrossOver。需按配方与引擎验证；仅使用官方仓库，避免同名仿冒站。' },
  } },
]
