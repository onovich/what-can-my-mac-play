import { createContext, useContext } from 'react'

export const supportedLocales = ['en', 'zh-CN'] as const

export type Locale = (typeof supportedLocales)[number]

export const localeStorageKey = 'what-can-my-mac-play:locale'

export const messages = {
  en: {
    meta: {
      title: 'What Can My Mac Play?',
      description: 'Explore evidence-aware game compatibility for Apple silicon Macs.',
    },
    accessibility: { skipToContent: 'Skip to content' },
    header: {
      homeLabel: 'What Can My Mac Play? home',
      sampleLibrary: 'Find a game',
      myLibrary: 'My Library',
      method: 'Method',
      primaryNavigation: 'Primary navigation',
      status: 'Research preview',
      language: 'Language',
      english: 'English',
      chinese: '简体中文',
    },
    hero: {
      eyebrow: 'Evidence before guesswork',
      title: 'Before you buy,',
      emphasis: 'check your Mac.',
      lede:
        'Find a game. Get our preferred Mac route, a clear recommendation, and only the conditions that change your decision.',
      explore: 'Check a game before buying',
      method: 'How we decide',
      note: 'Curated catalog · Local non-VM routes · No Steam sign-in',
    },
    profile: {
      label: 'Your test profile',
      title: 'Make the question specific.',
      chip: 'Chip',
      memory: 'Memory',
      runner: 'Preferred route',
      chips: ['Apple silicon', 'M1 family', 'M2 family', 'M3 family', 'M4 family', 'Other'],
      memories: ['16 GB memory', '8 GB memory', '24 GB memory', '32 GB+ memory'],
      runners: ['CrossOver 25', 'CrossOver 26', 'Native Mac', 'Not decided'],
      preview: (chip: string, memory: string, runner: string) =>
        `Previewing evidence for ${chip}, ${memory}, using ${runner}.`,
      privacy: 'Planning preview only. Selections are not stored and do not filter or recalculate the research scores.',
    },
    explorer: {
      eyebrow: 'Curated Mac play guide',
      title: 'Find a game. Check before buying.',
      intro:
        'One preferred route per game. See the recommendation first, and the important conditions second.',
      searchLabel: 'Game name',
      searchPlaceholder: 'Try Portal 2',
      filterLabel: 'Filter recommendations',
      filters: { all: 'All games', strong: 'Stronger evidence', caution: 'Needs caution' },
      count: (visible: number, total: number) =>
        `Showing ${visible} of ${total} reviewed games`,
      steamReviews: 'Steam reviews',
      positive: 'positive',
      sourceRating: 'Source rating',
      steamAppId: 'Steam App ID',
      evidence: 'Evidence',
      viewDetails: 'See recommendation',
      compatibility: 'Compatibility',
      confidence: 'Confidence',
      scoreLabel: (label: string, title: string, score: number | null) =>
        score === null
          ? `${label} score for ${title}: unavailable`
          : `${label} score for ${title}: ${score} out of 100`,
      confidenceBand: (score: number) =>
        score < 40 ? 'Low confidence' : score < 60 ? 'Medium confidence' : 'Higher confidence',
      conflictUnknown: 'Conflict unknown · one source',
      conflictPresent: 'Conflicting evidence detected',
      noMajorConflict: 'No major cross-source conflict',
      whyScore: 'Why this score',
      evidenceBase: (sources: number, reports: number) =>
        `${sources} source${sources === 1 ? '' : 's'} · ${reports} report${reports === 1 ? '' : 's'}`,
      evidenceBaseLabel: 'Evidence base',
      upstreamDate: 'Upstream test date',
      dateMissing: 'Not reported',
      modelNotice: 'Derived estimate · algorithm v0.1.0',
      emptyTitle: 'No matching game.',
      emptyBody: 'Try another game name. Games outside this catalog are not endorsed.',
      reset: 'Clear search',
    },
    gameDetail: {
      back: 'Find a game',
      steamAppId: 'Steam App ID',
      researchSnapshot: 'Research snapshot',
      decisionTitle: 'What the current evidence says',
      decisionIntro:
        'This is an evidence-weighted estimate for the repository’s partial CrossOver environment—not a guarantee for every Mac.',
      evidenceTitle: 'Evidence record',
      environmentTitle: 'Environment coverage',
      caveatsTitle: 'Read before trying',
      compatibility: 'Compatibility',
      confidence: 'Confidence',
      sourceRating: 'Source rating',
      source: 'Source',
      observedAt: 'Observed by this project',
      upstreamTestDate: 'Upstream test date',
      runner: 'Scoring target',
      latestRunner: 'Latest runner record seen',
      chipCoverage: 'Chip coverage',
      unknown: 'Not reported',
      partialEnvironment: 'CrossOver 25.0 · partial environment',
      unknownChip: 'Unknown · no chip-specific claim',
      oneSource: 'One source only',
      conflictUnknown: 'Cross-source conflict cannot be assessed yet',
      derived: 'Derived estimate · algorithm v0.1.0',
      caveats: [
        'The source record is an aggregate, not a full test report for your exact Mac.',
        'No upstream test date or frame-rate measurement is available in this snapshot.',
        'Check the linked source again before buying software or changing your setup.',
      ],
      viewEvidence: 'Open source evidence',
      viewSteam: 'View on Steam',
      notFoundEyebrow: 'Sample not found',
      notFoundTitle: 'This game is not in the catalog.',
      notFoundBody:
        'There is no recommendation for this game yet.',
      notFoundAction: 'Find a game',
      metaTitle: (title: string) => `${title} Mac compatibility · What Can My Mac Play?`,
      metaDescription: (title: string) =>
        `See our preferred Mac route, recommendation and essential conditions for ${title}.`,
    },
    method: {
      eyebrow: 'The decision model',
      title: 'We do the research. You get the decision.',
      intro:
        'A recommended route, the conditions that matter, or a clear no. No original-post reading required.',
      steps: [
        {
          title: 'Admit supported combinations',
          body: 'A game-specific support record is required. Unlisted combinations are not supported by our catalog.',
          token: 'SUPPORT LIST',
        },
        {
          title: 'Make the call',
          body: 'We weigh the material and choose a route. Sources remain in the internal audit trail, not in your reading queue.',
          token: 'EDITORIAL JUDGMENT',
        },
        {
          title: 'Keep decisive conditions',
          body: 'Paid tools, required versions and single-player restrictions stay visible. Unsupported features are not part of our recommendation.',
          token: 'ACTION + CONDITIONS',
        },
      ],
    },
    closing: {
      eyebrow: 'Build the useful thing first',
      title: 'A smaller catalog with honest evidence beats a giant vague list.',
      github: 'Follow the project on GitHub',
    },
    footer: {
      statement: 'is an independent product research project.',
      home: 'MVP home:',
      privacy: 'Privacy',
      dataDeletion: 'Data deletion',
    },
  },
  'zh-CN': {
    meta: {
      title: '我的 Mac 能玩什么？',
      description: '基于可追溯证据，探索 Apple 芯片 Mac 的游戏兼容性。',
    },
    accessibility: { skipToContent: '跳到主要内容' },
    header: {
      homeLabel: '我的 Mac 能玩什么？首页',
      sampleLibrary: '查找游戏',
      myLibrary: '我的游戏库',
      method: '判断方法',
      primaryNavigation: '主导航',
      status: '研究预览版',
      language: '语言',
      english: 'English',
      chinese: '简体中文',
    },
    hero: {
      eyebrow: '先看证据，再下结论',
      title: '购买之前，先确认',
      emphasis: '你的 Mac 能否胜任。',
      lede:
        '找到游戏，直接看我们选出的 Mac 运行方案、明确建议，以及真正影响选择的条件。',
      explore: '查询游戏购买参考',
      method: '我们如何判断',
      note: '精选支持清单 · 本地非虚拟机方案 · 无需登录 Steam',
    },
    profile: {
      label: '你的测试配置',
      title: '让问题足够具体。',
      chip: '芯片',
      memory: '内存',
      runner: '首选运行方式',
      chips: ['Apple 芯片', 'M1 系列', 'M2 系列', 'M3 系列', 'M4 系列', '其他'],
      memories: ['16 GB 内存', '8 GB 内存', '24 GB 内存', '32 GB 及以上内存'],
      runners: ['CrossOver 25', 'CrossOver 26', 'Mac 原生版', '尚未决定'],
      preview: (chip: string, memory: string, runner: string) =>
        `正在预览 ${chip}、${memory}，使用 ${runner} 时的证据。`,
      privacy: '仅用于配置规划预览，选择不会保存，也不会筛选或重新计算研究评分。',
    },
    explorer: {
      eyebrow: 'Mac 游戏决策指南',
      title: '找到游戏，先看购买参考。',
      intro:
        '每款游戏给出一个首选方案。先看结论，再看真正影响选择的条件。',
      searchLabel: '游戏名称',
      searchPlaceholder: '试试 Portal 2',
      filterLabel: '筛选使用建议',
      filters: { all: '全部游戏', strong: '证据较强', caution: '需要谨慎' },
      count: (visible: number, total: number) => `显示 ${visible} / ${total} 款已评估游戏`,
      steamReviews: 'Steam 评价',
      positive: '好评',
      sourceRating: '来源评级',
      steamAppId: 'Steam 应用 ID',
      evidence: '查看证据',
      viewDetails: '查看使用建议',
      compatibility: '兼容程度',
      confidence: '可信度',
      scoreLabel: (label: string, title: string, score: number | null) =>
        score === null
          ? `${title} 的${label}评分：暂无数据`
          : `${title} 的${label}评分：${score} / 100`,
      confidenceBand: (score: number) =>
        score < 40 ? '低可信度' : score < 60 ? '中等可信度' : '较高可信度',
      conflictUnknown: '冲突未知 · 仅一个来源',
      conflictPresent: '检测到证据冲突',
      noMajorConflict: '未发现重大跨来源冲突',
      whyScore: '为什么是这个分数',
      evidenceBase: (sources: number, reports: number) =>
        `${sources} 个来源 · ${reports} 份报告`,
      evidenceBaseLabel: '证据基础',
      upstreamDate: '上游测试日期',
      dateMissing: '未提供',
      modelNotice: '推导估计值 · 算法 v0.1.0',
      emptyTitle: '没有匹配的游戏。',
      emptyBody: '试试其他游戏名称；清单外的游戏不在当前推荐范围。',
      reset: '清空搜索',
    },
    gameDetail: {
      back: '查找游戏',
      steamAppId: 'Steam 应用 ID',
      researchSnapshot: '研究快照',
      decisionTitle: '当前证据说明了什么',
      decisionIntro:
        '这是针对仓库中 CrossOver 部分环境的证据加权估计，并不保证适用于每一台 Mac。',
      evidenceTitle: '证据记录',
      environmentTitle: '环境覆盖情况',
      caveatsTitle: '尝试前请先了解',
      compatibility: '兼容程度',
      confidence: '可信度',
      sourceRating: '来源评级',
      source: '来源',
      observedAt: '本项目观察日期',
      upstreamTestDate: '上游测试日期',
      runner: '评分目标环境',
      latestRunner: '发现的最新运行工具记录',
      chipCoverage: '芯片覆盖',
      unknown: '未提供',
      partialEnvironment: 'CrossOver 25.0 · 部分环境',
      unknownChip: '未知 · 没有特定芯片结论',
      oneSource: '目前仅一个来源',
      conflictUnknown: '暂时无法判断跨来源冲突',
      derived: '推导估计值 · 算法 v0.1.0',
      caveats: [
        '来源记录是汇总评级，并非针对你的具体 Mac 的完整测试报告。',
        '当前快照没有上游测试日期或帧率测量数据。',
        '购买软件或更改配置前，请再次检查链接中的原始来源。',
      ],
      viewEvidence: '打开原始证据',
      viewSteam: '在 Steam 中查看',
      notFoundEyebrow: '未找到样本',
      notFoundTitle: '清单中没有这款游戏。',
      notFoundBody: '暂未提供这款游戏的使用建议。',
      notFoundAction: '查找游戏',
      metaTitle: (title: string) => `${title} Mac 兼容性 · 我的 Mac 能玩什么？`,
      metaDescription: (title: string) =>
        `查看 ${title} 的 Mac 首选运行方案、使用建议与必要条件。`,
    },
    method: {
      eyebrow: '判断模型',
      title: '研究由我们做，结论直接给你。',
      intro: '推荐哪个方案、需要什么条件，或直接告诉你不推荐。无需翻原帖、读测试档案。',
      steps: [
        {
          title: '只纳入有支持项的组合',
          body: '游戏和运行方案必须有对应支持记录。没有纳入的组合，当前清单不支持。',
          token: '支持清单',
        },
        {
          title: '整合之后给出判断',
          body: '由我们权衡资料并选出路线。原始来源留在内部审核，不交给玩家自己研究。',
          token: '判断，而非转述',
        },
        {
          title: '只保留决策必要条件',
          body: '付费工具、必要版本、单人限制需要说清楚；不支持的功能不纳入推荐范围。',
          token: '怎么做 + 必要条件',
        },
      ],
    },
    closing: {
      eyebrow: '先做真正有用的产品',
      title: '一个证据诚实的小型目录，胜过一份庞大却含糊的列表。',
      github: '在 GitHub 上关注项目',
    },
    footer: {
      statement: '是一个独立的产品研究项目。',
      home: 'MVP 地址：',
      privacy: '隐私',
      dataDeletion: '数据删除',
    },
  },
} as const

type LocaleStorage = Pick<Storage, 'getItem'>

function isLocale(value: string | null): value is Locale {
  return supportedLocales.includes(value as Locale)
}

function getBrowserLanguages() {
  if (typeof navigator === 'undefined') return []
  if (navigator.languages.length > 0) return navigator.languages
  return navigator.language ? [navigator.language] : []
}

function getStorage(): LocaleStorage | undefined {
  if (typeof window === 'undefined') return undefined
  return window.localStorage
}

export function matchSupportedLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const normalized = language.toLowerCase()
    if (normalized === 'en' || normalized.startsWith('en-')) return 'en'
    if (normalized === 'zh' || normalized.startsWith('zh-')) return 'zh-CN'
  }
  return 'en'
}

export function resolveInitialLocale({
  storage = getStorage(),
  languages = getBrowserLanguages(),
}: {
  storage?: LocaleStorage
  languages?: readonly string[]
} = {}): Locale {
  try {
    const storedLocale = storage?.getItem(localeStorageKey) ?? null
    if (isLocale(storedLocale)) return storedLocale
  } catch {
    // Privacy modes can make localStorage unavailable. Browser language still works.
  }

  return matchSupportedLocale(languages)
}

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  messages: (typeof messages)[Locale]
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale must be used inside LocaleProvider')
  return context
}
