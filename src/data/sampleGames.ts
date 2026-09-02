import type { Locale } from '../i18n/locale'
import type { ScoringResult } from '../domain/scoring'
import { researchReplayCases } from './researchReplay'

type LocalizedGameCopy = {
  sourceRating: string
  evidence: string
  recommendation: string
}

export type SampleGame = {
  appId: number
  title: string
  steamScore: string
  signal: 'strong' | 'caution'
  localized: Record<Locale, LocalizedGameCopy>
  steamUrl: string
  sourceUrl: string
  scoring: ScoringResult
}

const replayByAppId = new Map(
  researchReplayCases.map((replay) => [replay.appId, replay.result]),
)

function getScoring(appId: number) {
  const scoring = replayByAppId.get(appId)
  if (!scoring) throw new Error(`Missing research replay for Steam App ID ${appId}`)
  return scoring
}

export const sampleGames: SampleGame[] = [
  {
    appId: 881100,
    title: 'Noita',
    steamScore: '95%',
    signal: 'strong',
    localized: {
      en: {
        sourceRating: 'Runs Great',
        evidence: 'Continuous CrossOver 25.x records in the research snapshot.',
        recommendation: 'Lower-risk first try',
      },
      'zh-CN': {
        sourceRating: '运行出色',
        evidence: '研究快照中存在连续的 CrossOver 25.x 测试记录。',
        recommendation: '优先尝试，风险较低',
      },
    },
    steamUrl: 'https://store.steampowered.com/app/881100/',
    sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/noita',
    scoring: getScoring(881100),
  },
  {
    appId: 292030,
    title: 'The Witcher 3: Wild Hunt',
    steamScore: '96%',
    signal: 'strong',
    localized: {
      en: {
        sourceRating: 'Runs Great',
        evidence: 'Recent records favor the DX11 route over DX12.',
        recommendation: 'Start with DX11',
      },
      'zh-CN': {
        sourceRating: '运行出色',
        evidence: '近期记录显示 DX11 方案优于 DX12。',
        recommendation: '建议先使用 DX11',
      },
    },
    steamUrl: 'https://store.steampowered.com/app/292030/',
    sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/the-witcher-3-wild-hunt',
    scoring: getScoring(292030),
  },
  {
    appId: 814380,
    title: 'Sekiro: Shadows Die Twice',
    steamScore: '95%',
    signal: 'strong',
    localized: {
      en: {
        sourceRating: 'Runs Great',
        evidence: 'CrossOver 25.0 and later records were present in the snapshot.',
        recommendation: 'Strong 3D candidate',
      },
      'zh-CN': {
        sourceRating: '运行出色',
        evidence: '快照中包含 CrossOver 25.0 及后续版本的测试记录。',
        recommendation: '表现较强的 3D 游戏候选',
      },
    },
    steamUrl: 'https://store.steampowered.com/app/814380/',
    sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/sekiro-shadows-die-twice',
    scoring: getScoring(814380),
  },
  {
    appId: 620,
    title: 'Portal 2',
    steamScore: '98%',
    signal: 'strong',
    localized: {
      en: {
        sourceRating: 'Runs Well',
        evidence: 'Multiple CrossOver 25.x records, with a lower source rating than the top group.',
        recommendation: 'High-review fallback',
      },
      'zh-CN': {
        sourceRating: '运行良好',
        evidence: '存在多条 CrossOver 25.x 记录，但来源评级低于最高一组。',
        recommendation: '高口碑备选',
      },
    },
    steamUrl: 'https://store.steampowered.com/app/620/',
    sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/portal-2',
    scoring: getScoring(620),
  },
  {
    appId: 1057090,
    title: 'Ori and the Will of the Wisps',
    steamScore: '96%',
    signal: 'caution',
    localized: {
      en: {
        sourceRating: 'Runs Well',
        evidence: 'The snapshot showed 25.0.1 records, but no explicit 25.0.0 record.',
        recommendation: 'Runner update advised',
      },
      'zh-CN': {
        sourceRating: '运行良好',
        evidence: '快照中有 25.0.1 的记录，但没有明确的 25.0.0 记录。',
        recommendation: '建议更新运行工具',
      },
    },
    steamUrl: 'https://store.steampowered.com/app/1057090/',
    sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/ori-and-the-will-of-the-wisps',
    scoring: getScoring(1057090),
  },
  {
    appId: 1245620,
    title: 'Elden Ring',
    steamScore: '93–94%',
    signal: 'caution',
    localized: {
      en: {
        sourceRating: 'Runs Great',
        evidence: 'Single-player evidence is positive; Easy Anti-Cheat adds online uncertainty.',
        recommendation: 'Online mode uncertain',
      },
      'zh-CN': {
        sourceRating: '运行出色',
        evidence: '单人模式证据积极，但 Easy Anti-Cheat 让联机体验存在不确定性。',
        recommendation: '联机模式尚不确定',
      },
    },
    steamUrl: 'https://store.steampowered.com/app/1245620/',
    sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/elden-ring',
    scoring: getScoring(1245620),
  },
]
