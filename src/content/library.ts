import type { Locale } from '../i18n/locale'

export type LibraryPreviewState = 'public' | 'private' | 'empty'

export const libraryContent: Record<Locale, {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  lede: string
  availabilityLabel: string
  availabilityTitle: string
  availabilityBody: string
  flowTitle: string
  flowSteps: readonly { title: string; body: string; token: string }[]
  previewEyebrow: string
  previewTitle: string
  previewBody: string
  previewLabel: string
  previewTabs: Record<LibraryPreviewState, string>
  publicTitle: string
  publicBody: string
  publicCount: (count: number) => string
  compatibility: string
  confidence: string
  viewGame: string
  privateTitle: string
  privateBody: string
  privateSteps: readonly string[]
  emptyTitle: string
  emptyBody: string
  browseSamples: string
  privacyTitle: string
  privacyItems: readonly string[]
}> = {
  en: {
    metaTitle: 'My Library preview · What Can My Mac Play?',
    metaDescription:
      'Preview how a public Steam library will be matched with evidence-aware Mac compatibility results.',
    eyebrow: 'My Library · interaction preview',
    title: 'Your games. One honest shortlist.',
    lede:
      'The finished flow will read a public Steam library only when you ask, match App IDs to compatibility evidence, and keep uncertainty visible.',
    availabilityLabel: 'Connection status',
    availabilityTitle: 'Steam connection is not active yet.',
    availabilityBody:
      'The server connector and production key must be completed before this page accepts a SteamID. No account information is collected by this preview.',
    flowTitle: 'How the connection will work',
    flowSteps: [
      {
        title: 'Provide a public SteamID',
        body: 'You initiate a read-only lookup. The site never asks for or handles your Steam password.',
        token: 'REQUEST',
      },
      {
        title: 'Match stable App IDs',
        body: 'Owned games are aligned to the catalogue without guessing from titles.',
        token: 'RESOLVE',
      },
      {
        title: 'Rank with caveats attached',
        body: 'Compatibility and confidence remain separate, with source and environment gaps visible.',
        token: 'EXPLAIN',
      },
    ],
    previewEyebrow: 'Clickable state model',
    previewTitle: 'Preview every library outcome.',
    previewBody:
      'These controls use repository sample data and do not contact Steam. They validate the experience before live access is enabled.',
    previewLabel: 'Library result preview',
    previewTabs: {
      public: 'Public library',
      private: 'Private / unavailable',
      empty: 'No games found',
    },
    publicTitle: 'A public library returns ranked matches',
    publicBody:
      'Demo result: four sample games are ordered by the current evidence model. This is not your Steam library.',
    publicCount: (count: number) => `${count} demo matches`,
    compatibility: 'Compatibility',
    confidence: 'Confidence',
    viewGame: 'Review evidence',
    privateTitle: 'This library cannot be read',
    privateBody:
      'A private profile, hidden game details, an invalid SteamID, or an upstream failure can produce this state. The product must not imply that the user owns no games.',
    privateSteps: [
      'Confirm the SteamID or public profile URL.',
      'Make “Game details” public in Steam privacy settings if you choose to.',
      'Try again later when Steam is unavailable; never enter a Steam password here.',
    ],
    emptyTitle: 'No owned games were returned',
    emptyBody:
      'A successful public response can still contain no games. This state stays distinct from a private or failed lookup.',
    browseSamples: 'Browse research samples',
    privacyTitle: 'Privacy boundary for launch',
    privacyItems: [
      'Read-only and initiated by the user.',
      'No Steam passwords, OAuth tokens, or library data in browser storage.',
      'Only the fields needed for matching, with a documented deletion and retention policy before launch.',
    ],
  },
  'zh-CN': {
    metaTitle: '我的游戏库预览 · 我的 Mac 能玩什么？',
    metaDescription: '预览如何将公开 Steam 游戏库与基于证据的 Mac 兼容性结果进行匹配。',
    eyebrow: '我的游戏库 · 交互预览',
    title: '你的游戏，一份诚实的候选清单。',
    lede:
      '完整流程将只在你主动请求时读取公开 Steam 游戏库，使用 App ID 匹配兼容性证据，并始终展示不确定性。',
    availabilityLabel: '连接状态',
    availabilityTitle: 'Steam 连接尚未启用。',
    availabilityBody:
      '服务端连接器和生产密钥完成后，本页面才会接收 SteamID。当前预览不会收集任何账户信息。',
    flowTitle: '未来的连接流程',
    flowSteps: [
      {
        title: '提供公开 SteamID',
        body: '由你主动发起只读查询；网站绝不会要求或处理 Steam 密码。',
        token: '主动请求',
      },
      {
        title: '匹配稳定的 App ID',
        body: '已拥有游戏通过目录主键对齐，不依靠游戏名称猜测。',
        token: '身份校准',
      },
      {
        title: '带着限制进行排序',
        body: '兼容程度与可信度保持分离，并展示来源和环境缺口。',
        token: '解释结果',
      },
    ],
    previewEyebrow: '可点击状态模型',
    previewTitle: '预览游戏库的每一种结果。',
    previewBody:
      '以下控件只使用仓库中的示例数据，不会请求 Steam。它用于在开放实时访问前验证产品体验。',
    previewLabel: '游戏库结果预览',
    previewTabs: {
      public: '公开游戏库',
      private: '私密或不可访问',
      empty: '没有找到游戏',
    },
    publicTitle: '公开游戏库会返回排序后的匹配结果',
    publicBody: '演示结果：四款示例游戏按当前证据模型排序。这不是你的 Steam 游戏库。',
    publicCount: (count: number) => `${count} 个演示匹配`,
    compatibility: '兼容程度',
    confidence: '可信度',
    viewGame: '查看证据',
    privateTitle: '无法读取这个游戏库',
    privateBody:
      '私密资料、隐藏的游戏详情、无效 SteamID 或上游故障都可能进入此状态。产品不能把它误报为“用户没有游戏”。',
    privateSteps: [
      '确认 SteamID 或公开个人资料链接是否正确。',
      '如果你愿意，可以在 Steam 隐私设置中公开“游戏详情”。',
      'Steam 暂时不可用时请稍后重试；绝不要在这里输入 Steam 密码。',
    ],
    emptyTitle: '没有返回已拥有游戏',
    emptyBody: '公开请求成功后仍可能没有游戏；此状态会与私密资料或请求失败明确区分。',
    browseSamples: '浏览研究样本',
    privacyTitle: '上线时的隐私边界',
    privacyItems: [
      '只读，并且仅由用户主动发起。',
      '不处理 Steam 密码、OAuth Token，也不在浏览器存储游戏库数据。',
      '只读取匹配所需字段，并在上线前明确删除和保留策略。',
    ],
  },
}
