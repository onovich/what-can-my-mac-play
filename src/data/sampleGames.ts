export type SampleGame = {
  appId: number
  title: string
  steamScore: string
  sourceRating: 'Runs Great' | 'Runs Well'
  signal: 'strong' | 'caution'
  evidence: string
  recommendation: string
  steamUrl: string
  sourceUrl: string
}

export const sampleGames: SampleGame[] = [
  {
    appId: 881100,
    title: 'Noita',
    steamScore: '95%',
    sourceRating: 'Runs Great',
    signal: 'strong',
    evidence: 'Continuous CrossOver 25.x records in the research snapshot.',
    recommendation: 'Lower-risk first try',
    steamUrl: 'https://store.steampowered.com/app/881100/',
    sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/noita',
  },
  {
    appId: 292030,
    title: 'The Witcher 3: Wild Hunt',
    steamScore: '96%',
    sourceRating: 'Runs Great',
    signal: 'strong',
    evidence: 'Recent records favor the DX11 route over DX12.',
    recommendation: 'Start with DX11',
    steamUrl: 'https://store.steampowered.com/app/292030/',
    sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/the-witcher-3-wild-hunt',
  },
  {
    appId: 814380,
    title: 'Sekiro: Shadows Die Twice',
    steamScore: '95%',
    sourceRating: 'Runs Great',
    signal: 'strong',
    evidence: 'CrossOver 25.0 and later records were present in the snapshot.',
    recommendation: 'Strong 3D candidate',
    steamUrl: 'https://store.steampowered.com/app/814380/',
    sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/sekiro-shadows-die-twice',
  },
  {
    appId: 620,
    title: 'Portal 2',
    steamScore: '98%',
    sourceRating: 'Runs Well',
    signal: 'strong',
    evidence: 'Multiple CrossOver 25.x records, with a lower source rating than the top group.',
    recommendation: 'High-review fallback',
    steamUrl: 'https://store.steampowered.com/app/620/',
    sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/portal-2',
  },
  {
    appId: 1057090,
    title: 'Ori and the Will of the Wisps',
    steamScore: '96%',
    sourceRating: 'Runs Well',
    signal: 'caution',
    evidence: 'The snapshot showed 25.0.1 records, but no explicit 25.0.0 record.',
    recommendation: 'Runner update advised',
    steamUrl: 'https://store.steampowered.com/app/1057090/',
    sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/ori-and-the-will-of-the-wisps',
  },
  {
    appId: 1245620,
    title: 'Elden Ring',
    steamScore: '93–94%',
    sourceRating: 'Runs Great',
    signal: 'caution',
    evidence: 'Single-player evidence is positive; Easy Anti-Cheat adds online uncertainty.',
    recommendation: 'Online mode uncertain',
    steamUrl: 'https://store.steampowered.com/app/1245620/',
    sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/elden-ring',
  },
]
