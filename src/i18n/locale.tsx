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
      sampleLibrary: 'Sample library',
      method: 'Method',
      primaryNavigation: 'Primary navigation',
      status: 'Research preview',
      language: 'Language',
      english: 'English',
      chinese: '简体中文',
    },
    hero: {
      eyebrow: 'Evidence before guesswork',
      title: 'Start with the games',
      emphasis: 'you already own.',
      lede:
        'Match a Mac profile with dated compatibility reports, then see what is likely to play—and how much confidence the evidence deserves.',
      explore: 'Explore sample matches',
      method: 'See how evidence works',
      note: 'Research preview · No Steam sign-in · No compatibility guarantees',
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
      privacy: 'Prototype only. These selections are not stored.',
    },
    explorer: {
      eyebrow: 'Research snapshot · September 2026',
      title: 'A sample library, with the caveats left in.',
      intro:
        'These are static examples from the repository research—not live compatibility results. Every conclusion still points back to its source.',
      searchLabel: 'Find a sample game',
      searchPlaceholder: 'Try Portal 2',
      filterLabel: 'Filter evidence signal',
      filters: { all: 'All samples', strong: 'Stronger evidence', caution: 'Needs caution' },
      count: (visible: number, total: number) =>
        `Showing ${visible} of ${total} research samples`,
      steamReviews: 'Steam reviews',
      positive: 'positive',
      sourceRating: 'Source rating',
      steamAppId: 'Steam App ID',
      evidence: 'Evidence',
      emptyTitle: 'No sample game matches that search.',
      emptyBody: 'Clear the search or choose another evidence filter.',
      reset: 'Reset samples',
    },
    method: {
      eyebrow: 'The decision model',
      title: '“Works on Mac” is the start of the question.',
      intro:
        'The MVP is built around a traceable path from a real machine profile to an appropriately cautious answer.',
      steps: [
        {
          title: 'Match the environment',
          body: 'A result belongs to a chip, macOS version, runner, graphics backend, and moment in time—not just a game title.',
          token: 'DEVICE × RUNNER',
        },
        {
          title: 'Keep the evidence attached',
          body: 'Ratings, configuration notes, and feature failures retain their source URL and observation date.',
          token: 'SOURCE + DATE',
        },
        {
          title: 'Separate fit from certainty',
          body: 'Compatibility describes how well a game appears to run. Confidence describes how much evidence supports that judgment.',
          token: 'FIT ≠ CERTAINTY',
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
      sampleLibrary: '示例游戏库',
      method: '判断方法',
      primaryNavigation: '主导航',
      status: '研究预览版',
      language: '语言',
      english: 'English',
      chinese: '简体中文',
    },
    hero: {
      eyebrow: '先看证据，再下结论',
      title: '先从你已经拥有的',
      emphasis: '游戏开始。',
      lede:
        '将你的 Mac 配置与带日期的兼容性报告进行匹配，了解哪些游戏更可能正常运行，以及这些判断有多少证据支撑。',
      explore: '查看示例匹配',
      method: '了解证据如何工作',
      note: '研究预览版 · 无需登录 Steam · 不作兼容性保证',
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
      privacy: '仅用于原型预览，这些选择不会被保存。',
    },
    explorer: {
      eyebrow: '研究快照 · 2026 年 9 月',
      title: '保留所有限制条件的示例游戏库。',
      intro:
        '这些是仓库研究中的静态示例，并非实时兼容性结果。每一项结论仍会链接回原始来源。',
      searchLabel: '查找示例游戏',
      searchPlaceholder: '试试 Portal 2',
      filterLabel: '筛选证据信号',
      filters: { all: '全部示例', strong: '证据较强', caution: '需要谨慎' },
      count: (visible: number, total: number) => `显示 ${visible} / ${total} 个研究样本`,
      steamReviews: 'Steam 评价',
      positive: '好评',
      sourceRating: '来源评级',
      steamAppId: 'Steam 应用 ID',
      evidence: '查看证据',
      emptyTitle: '没有符合搜索条件的示例游戏。',
      emptyBody: '请清空搜索内容或选择其他证据筛选条件。',
      reset: '重置示例',
    },
    method: {
      eyebrow: '判断模型',
      title: '“能在 Mac 上运行”只是问题的开始。',
      intro: 'MVP 会把真实设备配置与可追溯证据连接起来，给出足够谨慎的答案。',
      steps: [
        {
          title: '匹配运行环境',
          body: '结果属于特定芯片、macOS 版本、运行工具、图形后端和测试时间，而不只属于某个游戏名称。',
          token: '设备 × 运行方式',
        },
        {
          title: '让证据始终可追溯',
          body: '评级、配置说明和功能故障都会保留来源链接与观察日期。',
          token: '来源 + 日期',
        },
        {
          title: '区分兼容程度与可信度',
          body: '兼容程度说明游戏看起来运行得如何；可信度说明有多少证据支持这个判断。',
          token: '兼容度 ≠ 可信度',
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
