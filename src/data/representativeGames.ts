import type { Game } from '../domain/compatibility'

export type ValidationAxis =
  | 'native-macos-candidate'
  | 'dx11-candidate'
  | 'dx12-candidate'
  | 'anti-cheat-candidate'
  | 'third-party-launcher-candidate'
  | 'low-spec-baseline'
  | 'high-end-3d'
  | 'online-multiplayer'

export type EvidenceScenario =
  | 'positive-path'
  | 'failure-path'
  | 'conflict-path'

export type RepresentativeGame = Game & {
  cohort: {
    validationAxes: readonly ValidationAxis[]
    evidenceScenario: EvidenceScenario
  }
  identity: {
    status: 'provisional-steam-alignment'
    source: 'steam-store-url'
  }
}

type RepresentativeGameSeed = {
  steamAppId: number
  canonicalTitle: string
  validationAxes: readonly ValidationAxis[]
  evidenceScenario: EvidenceScenario
}

const seeds = [
  {
    steamAppId: 881100,
    canonicalTitle: 'Noita',
    validationAxes: ['dx11-candidate', 'low-spec-baseline'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 813230,
    canonicalTitle: 'ANIMAL WELL',
    validationAxes: ['low-spec-baseline'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 292030,
    canonicalTitle: 'The Witcher 3: Wild Hunt',
    validationAxes: ['dx11-candidate', 'dx12-candidate', 'high-end-3d'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 814380,
    canonicalTitle: 'Sekiro: Shadows Die Twice',
    validationAxes: ['dx11-candidate', 'high-end-3d'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 274170,
    canonicalTitle: 'Hotline Miami 2: Wrong Number',
    validationAxes: ['low-spec-baseline'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 894020,
    canonicalTitle: "Death's Door",
    validationAxes: ['dx11-candidate'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 620,
    canonicalTitle: 'Portal 2',
    validationAxes: ['native-macos-candidate', 'low-spec-baseline'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 1057090,
    canonicalTitle: 'Ori and the Will of the Wisps',
    validationAxes: ['dx11-candidate'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 374320,
    canonicalTitle: 'DARK SOULS III',
    validationAxes: ['dx11-candidate', 'high-end-3d'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 1245620,
    canonicalTitle: 'ELDEN RING',
    validationAxes: ['dx12-candidate', 'anti-cheat-candidate', 'high-end-3d', 'online-multiplayer'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 1086940,
    canonicalTitle: "Baldur's Gate 3",
    validationAxes: ['native-macos-candidate', 'dx11-candidate', 'high-end-3d', 'online-multiplayer'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 413150,
    canonicalTitle: 'Stardew Valley',
    validationAxes: ['native-macos-candidate', 'low-spec-baseline', 'online-multiplayer'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 105600,
    canonicalTitle: 'Terraria',
    validationAxes: ['native-macos-candidate', 'low-spec-baseline', 'online-multiplayer'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 367520,
    canonicalTitle: 'Hollow Knight',
    validationAxes: ['native-macos-candidate', 'low-spec-baseline'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 1145360,
    canonicalTitle: 'Hades',
    validationAxes: ['native-macos-candidate', 'low-spec-baseline'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 427520,
    canonicalTitle: 'Factorio',
    validationAxes: ['native-macos-candidate', 'low-spec-baseline', 'online-multiplayer'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 294100,
    canonicalTitle: 'RimWorld',
    validationAxes: ['native-macos-candidate', 'low-spec-baseline'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 570,
    canonicalTitle: 'Dota 2',
    validationAxes: ['native-macos-candidate', 'online-multiplayer'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 275850,
    canonicalTitle: "No Man's Sky",
    validationAxes: ['native-macos-candidate', 'high-end-3d', 'online-multiplayer'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 1142710,
    canonicalTitle: 'Total War: WARHAMMER III',
    validationAxes: ['native-macos-candidate', 'high-end-3d', 'online-multiplayer'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 289070,
    canonicalTitle: "Sid Meier's Civilization VI",
    validationAxes: ['native-macos-candidate', 'online-multiplayer'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 1158310,
    canonicalTitle: 'Crusader Kings III',
    validationAxes: ['native-macos-candidate', 'high-end-3d', 'online-multiplayer'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 281990,
    canonicalTitle: 'Stellaris',
    validationAxes: ['native-macos-candidate', 'online-multiplayer'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 632470,
    canonicalTitle: 'Disco Elysium - The Final Cut',
    validationAxes: ['native-macos-candidate', 'low-spec-baseline'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 435150,
    canonicalTitle: 'Divinity: Original Sin 2 - Definitive Edition',
    validationAxes: ['native-macos-candidate', 'online-multiplayer'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 264710,
    canonicalTitle: 'Subnautica',
    validationAxes: ['native-macos-candidate', 'high-end-3d'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 892970,
    canonicalTitle: 'Valheim',
    validationAxes: ['native-macos-candidate', 'high-end-3d', 'online-multiplayer'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 1313140,
    canonicalTitle: 'Cult of the Lamb',
    validationAxes: ['native-macos-candidate', 'low-spec-baseline'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 646570,
    canonicalTitle: 'Slay the Spire',
    validationAxes: ['native-macos-candidate', 'low-spec-baseline'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 588650,
    canonicalTitle: 'Dead Cells',
    validationAxes: ['native-macos-candidate', 'low-spec-baseline'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 1091500,
    canonicalTitle: 'Cyberpunk 2077',
    validationAxes: ['dx12-candidate', 'high-end-3d'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 1174180,
    canonicalTitle: 'Red Dead Redemption 2',
    validationAxes: ['high-end-3d', 'third-party-launcher-candidate', 'online-multiplayer'],
    evidenceScenario: 'failure-path',
  },
  {
    steamAppId: 271590,
    canonicalTitle: 'Grand Theft Auto V Legacy',
    validationAxes: ['dx11-candidate', 'anti-cheat-candidate', 'third-party-launcher-candidate', 'online-multiplayer'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 990080,
    canonicalTitle: 'Hogwarts Legacy',
    validationAxes: ['dx12-candidate', 'high-end-3d'],
    evidenceScenario: 'failure-path',
  },
  {
    steamAppId: 2050650,
    canonicalTitle: 'Resident Evil 4',
    validationAxes: ['dx12-candidate', 'high-end-3d'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 1817070,
    canonicalTitle: "Marvel's Spider-Man Remastered",
    validationAxes: ['dx12-candidate', 'high-end-3d'],
    evidenceScenario: 'failure-path',
  },
  {
    steamAppId: 582010,
    canonicalTitle: 'Monster Hunter: World',
    validationAxes: ['dx11-candidate', 'high-end-3d', 'online-multiplayer'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 1446780,
    canonicalTitle: 'MONSTER HUNTER RISE',
    validationAxes: ['dx12-candidate', 'high-end-3d', 'online-multiplayer'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 377160,
    canonicalTitle: 'Fallout 4',
    validationAxes: ['dx11-candidate', 'high-end-3d'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 489830,
    canonicalTitle: 'The Elder Scrolls V: Skyrim Special Edition',
    validationAxes: ['dx11-candidate', 'high-end-3d'],
    evidenceScenario: 'positive-path',
  },
  {
    steamAppId: 730,
    canonicalTitle: 'Counter-Strike 2',
    validationAxes: ['anti-cheat-candidate', 'online-multiplayer'],
    evidenceScenario: 'failure-path',
  },
  {
    steamAppId: 578080,
    canonicalTitle: 'PUBG: BATTLEGROUNDS',
    validationAxes: ['dx11-candidate', 'anti-cheat-candidate', 'online-multiplayer'],
    evidenceScenario: 'failure-path',
  },
  {
    steamAppId: 1172470,
    canonicalTitle: 'Apex Legends',
    validationAxes: ['dx11-candidate', 'anti-cheat-candidate', 'third-party-launcher-candidate', 'online-multiplayer'],
    evidenceScenario: 'failure-path',
  },
  {
    steamAppId: 359550,
    canonicalTitle: "Tom Clancy's Rainbow Six Siege",
    validationAxes: ['dx11-candidate', 'anti-cheat-candidate', 'third-party-launcher-candidate', 'online-multiplayer'],
    evidenceScenario: 'failure-path',
  },
  {
    steamAppId: 381210,
    canonicalTitle: 'Dead by Daylight',
    validationAxes: ['dx11-candidate', 'anti-cheat-candidate', 'online-multiplayer'],
    evidenceScenario: 'failure-path',
  },
  {
    steamAppId: 252490,
    canonicalTitle: 'Rust',
    validationAxes: ['native-macos-candidate', 'anti-cheat-candidate', 'online-multiplayer'],
    evidenceScenario: 'conflict-path',
  },
  {
    steamAppId: 393380,
    canonicalTitle: 'Squad',
    validationAxes: ['dx11-candidate', 'anti-cheat-candidate', 'online-multiplayer'],
    evidenceScenario: 'failure-path',
  },
  {
    steamAppId: 581320,
    canonicalTitle: 'Insurgency: Sandstorm',
    validationAxes: ['dx11-candidate', 'anti-cheat-candidate', 'online-multiplayer'],
    evidenceScenario: 'failure-path',
  },
  {
    steamAppId: 1238810,
    canonicalTitle: 'Battlefield V',
    validationAxes: ['dx11-candidate', 'dx12-candidate', 'anti-cheat-candidate', 'third-party-launcher-candidate', 'online-multiplayer'],
    evidenceScenario: 'failure-path',
  },
  {
    steamAppId: 1222670,
    canonicalTitle: 'The Sims 4',
    validationAxes: ['dx11-candidate', 'third-party-launcher-candidate'],
    evidenceScenario: 'conflict-path',
  },
] as const satisfies readonly RepresentativeGameSeed[]

export const representativeGames: readonly RepresentativeGame[] = seeds.map((seed) => ({
  id: `game:steam:${seed.steamAppId}`,
  steamAppId: seed.steamAppId,
  canonicalTitle: seed.canonicalTitle,
  aliases: [],
  storeUrl: `https://store.steampowered.com/app/${seed.steamAppId}/`,
  nativeMacOsAvailable: null,
  tags: [],
  cohort: {
    validationAxes: seed.validationAxes,
    evidenceScenario: seed.evidenceScenario,
  },
  identity: {
    status: 'provisional-steam-alignment',
    source: 'steam-store-url',
  },
}))
