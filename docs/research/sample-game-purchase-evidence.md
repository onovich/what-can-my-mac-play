# Published sample games: purchase evidence

Checked: 2026-09-04. Scope: the six entries in `src/data/sampleGames.ts`. This is a dated, read-only source review, not a playtest or a purchase recommendation. No software or games were installed.

## Method and interpretation

Read official Steam store pages and fetched Valve's public `store.steampowered.com/api/appdetails` endpoint with `l=english&cc=us`. Inspect `platforms`, `pc_requirements`, and `mac_requirements` separately. The endpoint is a first-party observation, not a promise of a stable documented API contract. Requirements are publisher/store statements for the listed platform; Windows minimum memory/GPU requirements cannot be translated into equivalent Mac hardware requirements.

The public store browser reader returned age gates for Witcher 3, Sekiro, and Elden Ring; their requirements below were read from the official JSON endpoint without changing browser state. Country-specific pricing was not researched or stored.

## Verified Steam facts

All six currently return `platforms.mac: false`. This supports “Steam does not currently list macOS support for this app,” not “the game can never run on a Mac.” Non-VM Windows compatibility tools require separate game/build/tool/environment evidence.

| Published game / App ID | Current Steam platform flags | Published Windows minimum, abbreviated | Sources |
| --- | --- | --- | --- |
| Noita / 881100 | Windows true; Mac false; Linux false | Windows Vista/7/8/8.1/10; 4 GB RAM; OpenGL 3.0; 1,600 MB storage | [Store](https://store.steampowered.com/app/881100/?l=english), [official data](https://store.steampowered.com/api/appdetails?appids=881100&l=english&cc=us) |
| The Witcher 3: Wild Hunt / 292030 | Windows true; Mac false; Linux false | 64-bit Windows 7/8/8.1; 6 GB RAM; DirectX 11; 50 GB storage. Data currently names the game “The Witcher 3: Wild Hunt - Complete Edition.” Both minimum and recommended requirements carry a planned change date of 2026-09-29. | [Store](https://store.steampowered.com/app/292030/?l=english), [official data](https://store.steampowered.com/api/appdetails?appids=292030&l=english&cc=us) |
| Sekiro: Shadows Die Twice / 814380 | Windows true; Mac false; Linux false | Windows 7/8/10 64-bit; 4 GB RAM; DirectX 11; 25 GB storage. Current store name specifies GOTY Edition. | [Store](https://store.steampowered.com/app/814380/?l=english), [official data](https://store.steampowered.com/api/appdetails?appids=814380&l=english&cc=us) |
| Portal 2 / 620 | Windows true; Mac false; Linux true | Windows 7/Vista/XP; 2 GB RAM; DirectX 9.0c; 8 GB storage. See the legacy Mac metadata caveat below. | [Store](https://store.steampowered.com/app/620/?l=english), [official data](https://store.steampowered.com/api/appdetails?appids=620&l=english&cc=us) |
| Ori and the Will of the Wisps / 1057090 | Windows true; Mac false; Linux false | Windows 10 version 18362.0 or later; 8 GB RAM; DirectX 11; 20 GB storage | [Store](https://store.steampowered.com/app/1057090/?l=english), [official data](https://store.steampowered.com/api/appdetails?appids=1057090&l=english&cc=us) |
| Elden Ring / 1245620 | Windows true; Mac false; Linux false | 64-bit CPU/OS; Windows 10; 12 GB RAM; DirectX 12; 60 GB storage | [Store](https://store.steampowered.com/app/1245620/?l=english), [official data](https://store.steampowered.com/api/appdetails?appids=1245620&l=english&cc=us) |

Steam's legacy Windows requirements can mention old Windows releases, while Steam's store note says its Windows client only supports Windows 10 or later from 2024-01-01. Do not recommend installing obsolete Windows versions based on the game's historical minimum. [Noita store requirement/client note](https://store.steampowered.com/app/881100/?l=english)

### Portal 2: contradictory legacy metadata is not Mac support

The live official JSON still contains `mac_requirements.minimum`: OS X 10.6.7 or later, Intel Core Duo at 2 GHz or better, 2 GB RAM, 8 GB storage, and older Intel/AMD/NVIDIA graphics. However, `platforms.mac` is false, and the current public store's system requirements tabs list Windows and SteamOS/Linux, not macOS. Therefore a non-empty `mac_requirements` object must not be treated as evidence of a supported native or Rosetta path. [Official JSON](https://store.steampowered.com/api/appdetails?appids=620&l=english&cc=us), [store](https://store.steampowered.com/app/620/?l=english)

An explicit Portal 2 “macOS 10.15 unsupported” notice was **not present in the current inspected store requirements**. Do not attribute that quote to this check or infer a supported pre-10.15 setup from its absence. This review did not verify the currently delivered Mac executable architecture or perform a historical depot/build audit.

### Witcher 3: requirements are due to change

The official JSON explicitly schedules a requirements change for 2026-09-29. Recheck before that date or before deriving a new recommendation; do not treat the current DX11 minimum or the older CrossOver snapshot as proof about a later game update. [Official JSON](https://store.steampowered.com/api/appdetails?appids=292030&l=english&cc=us)

## Game-specific alternative-route evidence

### Noita: Porting Kit recipe exists, but the cited edition is GOG

The Porting Kit maintainer's [Noita for Mac article](https://www.paulthetall.com/noita-for-mac/) is dated 2023-08-12/updated 2023-08-15. It says a game-specific port was added and reports a short test on the author's Apple Silicon MacBook Pro. Its installation instructions specifically use **GOG offline backup installers**. It does not provide a chip model, RAM, macOS, engine/backend version, game build, quantitative performance, or completion test.

Safe product classification: `historical recipe / different storefront`, with article date and GOG edition visible. It is not Steam App 881100 validation. Do not increase Steam/CrossOver confidence or transfer a GOG result into Steam/Porting Kit confidence. The site's generic sidebar suggests Steam wrapper builds, but that does not make its Noita GOG instructions a verified Steam recipe. Recheck the current Porting Kit recipe and exact edition before use.

The limited official-site search did not produce an inspectable, specific recipe for the other five games within this review. This is “not verified here,” not “no recipe exists.” Do not fill route evidence using generic Porting Kit download/home pages or third-party reports.

## Bilingual-ready factual copy

- All six, EN: “Steam does not currently list macOS support for this app. A Windows compatibility route needs separate evidence for your setup.”
- All six, ZH: “Steam 当前未为此应用标注 macOS 支持。Windows 兼容方案仍需与你的配置相匹配的独立证据。”
- Portal 2, EN: “Legacy Intel Mac requirements remain in Steam's data, but its current Mac support flag is off. This is not evidence that native or Rosetta play works on your Mac.”
- Portal 2, ZH: “Steam 数据仍保留旧 Intel Mac 配置要求，但当前 Mac 支持标记已关闭；不能据此认定你的 Mac 可通过原生或 Rosetta 运行。”
- Witcher 3, EN: “Steam says system requirements will change on September 29, 2026. Recheck the game version and requirements before purchase.”
- Witcher 3, ZH: “Steam 提示配置要求将在 2026 年 9 月 29 日变更。购买前请重新核对游戏版本与配置要求。”
- Noita / Porting Kit, EN: “A 2023 maintainer recipe covers the GOG edition, not a verified Steam setup. Current runner, macOS, and game-build compatibility remain unverified.”
- Noita / Porting Kit, ZH: “维护者在 2023 年发布的方案针对 GOG 版本，并非已验证的 Steam 配置；当前运行工具、macOS 与游戏版本的兼容性仍未核实。”

## Explicit unknowns / next evidence collection

For every alternative route: exact game/store build, runner/backend version, macOS, Mac chip/RAM, resolution/settings, sustained FPS/frame pacing, test duration, save/load and progression, multiplayer/anti-cheat, launchers/DRM, and update regression status. Store metadata and a recipe's existence are not playability reports. Keep the sample count at six and retain “insufficient evidence for a purchase assurance.”
