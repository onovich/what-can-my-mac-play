import type { Locale } from '../i18n/locale'

export const privacyContent: Record<Locale, {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  summary: string
  effectiveDate: string
  effectiveDateLabel: string
  overviewTitle: string
  overview: string
  dataTitle: string
  dataRows: readonly { data: string; purpose: string; retention: string }[]
  tableLabels: { data: string; purpose: string; retention: string }
  steamTitle: string
  steamParagraphs: readonly string[]
  servicesTitle: string
  servicesParagraph: string
  services: readonly { name: string; purpose: string; href: string }[]
  choicesTitle: string
  choices: readonly string[]
  deletionTitle: string
  deletionIntro: string
  clearButton: string
  cleared: string
  deletionSteps: readonly string[]
  contactTitle: string
  contactBody: string
  contactLink: string
  changesTitle: string
  changesBody: string
}> = {
  en: {
    metaTitle: 'Privacy & Data Deletion · What Can My Mac Play?',
    metaDescription:
      'How the What Can My Mac Play? MVP handles language preferences, device selections, operational logs, and Steam data.',
    eyebrow: 'MVP privacy notice',
    title: 'Privacy and data deletion',
    summary:
      'The current research preview has no accounts, Steam sign-in, advertising, or analytics profile. This notice describes what the live MVP actually handles today.',
    effectiveDate: '2026-09-03',
    effectiveDateLabel: 'Effective September 3, 2026',
    overviewTitle: 'Current scope',
    overview:
      'What Can My Mac Play? is an independent compatibility research project. The current site shows a static research sample and a public Steam catalogue connector that remains disabled until its server-side key is configured.',
    dataTitle: 'Data handled by the MVP',
    tableLabels: { data: 'Data', purpose: 'Why it is used', retention: 'Retention' },
    dataRows: [
      {
        data: 'Language preference (English or Simplified Chinese)',
        purpose: 'Remember your language on this browser.',
        retention: 'Stored in localStorage until you clear it.',
      },
      {
        data: 'Mac profile selections shown in the preview',
        purpose: 'Update the on-page sample description.',
        retention: 'Memory only; removed when the page is closed or reloaded.',
      },
      {
        data: 'Request and error metadata processed by Cloudflare',
        purpose: 'Deliver, secure, and troubleshoot the site.',
        retention: 'Operational Worker logs are retained for no more than 7 days.',
      },
      {
        data: 'Public Steam application IDs, names, and catalogue freshness fields',
        purpose: 'Resolve game identities after the connector is enabled.',
        retention: 'Public catalogue responses may be cached for up to 1 hour.',
      },
    ],
    steamTitle: 'Steam data',
    steamParagraphs: [
      'The current MVP does not ask for a Steam login, SteamID, library visibility change, or Steam password. It does not retrieve or store a user’s game library.',
      'If personal Steam library matching is introduced, it will be opt-in and this notice will be updated before launch to identify the exact fields, purpose, storage location, retention period, and deletion method. Steam data and compatibility results are provided as-is and are not guarantees.',
    ],
    servicesTitle: 'Service providers and sources',
    servicesParagraph:
      'These providers process requests only for the stated infrastructure or data-source purpose. Following an external link subjects you to that provider’s own policy.',
    services: [
      {
        name: 'Cloudflare',
        purpose: 'DNS, security, site delivery, Workers, and operational logs.',
        href: 'https://www.cloudflare.com/policies/privacy/',
      },
      {
        name: 'Valve / Steam',
        purpose: 'Public application catalogue data after the server connector is enabled.',
        href: 'https://steamcommunity.com/dev/apiterms',
      },
    ],
    choicesTitle: 'Your choices',
    choices: [
      'You can use the research preview without a Steam account.',
      'The site does not currently use advertising cookies or cross-site behavioural tracking.',
      'You can clear the saved language preference below or through your browser’s site-data controls.',
    ],
    deletionTitle: 'Delete current MVP data',
    deletionIntro:
      'Because the MVP has no user accounts or stored Steam libraries, there is no server-side profile to delete today.',
    clearButton: 'Clear saved language preference',
    cleared: 'Saved language preference cleared. Your browser language will be used on the next visit.',
    deletionSteps: [
      'Reloading or closing the page clears the temporary Mac profile selections.',
      'Operational logs expire automatically within the retention period above and are not linked to a site account.',
      'Do not include a Steam password, API key, or other private information in a public GitHub issue.',
    ],
    contactTitle: 'Questions',
    contactBody:
      'For an MVP privacy question, open a repository issue without including personal information. A private contact channel will be published before any personal Steam-data feature launches.',
    contactLink: 'Open the project issue tracker',
    changesTitle: 'Changes to this notice',
    changesBody:
      'This page will be revised when the product begins handling new categories of data. The effective date above identifies the current version.',
  },
  'zh-CN': {
    metaTitle: '隐私与数据删除 · 我的 Mac 能玩什么？',
    metaDescription:
      '了解 What Can My Mac Play? MVP 如何处理语言偏好、设备选择、运行日志和 Steam 数据。',
    eyebrow: 'MVP 隐私说明',
    title: '隐私与数据删除',
    summary:
      '当前研究预览版没有账户、Steam 登录、广告或用户画像分析。本说明仅描述线上 MVP 目前实际处理的数据。',
    effectiveDate: '2026-09-03',
    effectiveDateLabel: '生效日期：2026 年 9 月 3 日',
    overviewTitle: '当前范围',
    overview:
      'What Can My Mac Play? 是一个独立的兼容性研究项目。当前网站展示静态研究样本，以及一个尚未配置服务端密钥、因此仍处于停用状态的 Steam 公共目录连接器。',
    dataTitle: 'MVP 处理的数据',
    tableLabels: { data: '数据', purpose: '用途', retention: '保留方式' },
    dataRows: [
      {
        data: '语言偏好（英文或简体中文）',
        purpose: '在当前浏览器中记住你选择的语言。',
        retention: '保存在 localStorage 中，直到你主动清除。',
      },
      {
        data: '预览中选择的 Mac 配置',
        purpose: '更新页面上的示例描述。',
        retention: '仅存在于内存；关闭或刷新页面后清除。',
      },
      {
        data: '由 Cloudflare 处理的请求与错误元数据',
        purpose: '交付、保护网站并排查运行故障。',
        retention: 'Worker 运行日志最长保留 7 天。',
      },
      {
        data: '公开的 Steam 应用 ID、名称和目录更新时间字段',
        purpose: '连接器启用后用于校准游戏身份。',
        retention: '公开目录响应最多缓存 1 小时。',
      },
    ],
    steamTitle: 'Steam 数据',
    steamParagraphs: [
      '当前 MVP 不会要求 Steam 登录、SteamID、调整游戏库可见性或提供 Steam 密码，也不会读取或保存用户游戏库。',
      '如果未来上线个人 Steam 游戏库匹配，该功能将由用户主动启用；上线前会先更新本说明，明确字段、用途、存储地区、保留期限和删除方式。Steam 数据与兼容性结果均按现状提供，不构成任何保证。',
    ],
    servicesTitle: '服务提供方与数据来源',
    servicesParagraph:
      '这些服务仅为所列基础设施或数据来源目的处理请求。访问外部链接后，将适用对应服务商自己的政策。',
    services: [
      {
        name: 'Cloudflare',
        purpose: 'DNS、安全防护、网站交付、Workers 与运行日志。',
        href: 'https://www.cloudflare.com/policies/privacy/',
      },
      {
        name: 'Valve / Steam',
        purpose: '服务端连接器启用后提供公开应用目录数据。',
        href: 'https://steamcommunity.com/dev/apiterms',
      },
    ],
    choicesTitle: '你的选择',
    choices: [
      '无需 Steam 账户即可使用当前研究预览版。',
      '网站目前不使用广告 Cookie，也不进行跨站行为追踪。',
      '你可以使用下方按钮，或通过浏览器的网站数据设置清除语言偏好。',
    ],
    deletionTitle: '删除当前 MVP 数据',
    deletionIntro:
      '由于 MVP 目前没有用户账户，也不存储 Steam 游戏库，因此现在没有可供删除的服务端用户档案。',
    clearButton: '清除已保存的语言偏好',
    cleared: '语言偏好已清除。下次访问时将重新读取浏览器语言。',
    deletionSteps: [
      '刷新或关闭页面即可清除临时的 Mac 配置选择。',
      '运行日志会在上述保留期限内自动过期，并且不会关联到本站账户。',
      '请勿在公开 GitHub Issue 中提交 Steam 密码、API Key 或其他隐私信息。',
    ],
    contactTitle: '问题与联系',
    contactBody:
      '如对 MVP 隐私处理有疑问，可以创建仓库 Issue，但请勿包含个人信息。任何个人 Steam 数据功能上线前，我们会先公布私密联系渠道。',
    contactLink: '打开项目 Issue 页面',
    changesTitle: '本说明的更新',
    changesBody:
      '当产品开始处理新的数据类别时，本页面会同步修订。页面顶部的生效日期代表当前版本。',
  },
}
