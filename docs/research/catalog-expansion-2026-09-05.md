# Non-native Steam catalog expansion

Reviewed: 2026-09-05. Scope: games sold on Steam without a listed Mac edition, with a game-specific positive CrossOver Mac record. Ratings below were read from the CodeWeavers search-index representation where direct overview retrieval returned HTTP 403. No access control was bypassed. These are reported compatibility ratings, not our own hardware tests. CodeWeavers explains the community/staff reporting model in its [database documentation](https://support.codeweavers.com/en_US/the-compatibility-database).

## Accepted candidates

| Steam appId | Exact game | Mac rating / tested CrossOver | Editorial placement |
| --- | --- | --- | --- |
| 489830 | The Elder Scrolls V: Skyrim Special Edition | Runs Great / 26.3.0 (5 reports) | Homepage candidate: open-world RPG |
| 1687950 | Persona 5 Royal | Runs Great / 26.3.0 (1 report) | Homepage candidate: turn-based RPG, macOS 15 scope |
| 894020 | Death's Door | Runs Great / 26.3.0 (1 report) | Homepage candidate: action adventure |
| 374320 | DARK SOULS III | Runs Well / 26.2.0 (3 reports) | Searchable supported route; lower editorial priority |

Homepage placement is an editorial decision combining positive Mac support and variety. It is not a measured performance ranking. Rated versions are evidence versions, not minimum versions or a claim about the newest available release. All recommendations concern the Steam Windows edition and CrossOver; separate GOG entries, mods, DLC, co-op or performance guarantees do not inherit support automatically. CrossOver is separately paid with a trial.

### Skyrim Special Edition

- [Steam requirements](https://store.steampowered.com/app/489830/The_Elder_Scrolls_V_Skyrim__Special_Edition/) list Windows requirements only, with no macOS section. Under the product rule its Steam-native Mac route is unsupported. This is appId 489830, not the original Skyrim release.
- [CodeWeavers overview](https://www.codeweavers.com/compatibility/crossover/the-elder-scrolls-v-skyrim-special-edition) reports the Mac rating/version in the table. CW appId is 14921, distinct from Steam appId.
- [Media](https://www.codeweavers.com/compatibility/crossover/media/the-elder-scrolls-v-skyrim-special-edition) includes macOS 15 / CrossOver 25.0.1 with DXMT. This older photographed configuration is not the latest rating or a mandatory backend.
- Recommend the unmodified Special Edition. Do not extend the record to a mod collection. The [Mod Organizer 2 listing](https://www.codeweavers.com/compatibility/crossover/mod-organizer-2-v-250) explicitly says mod-running applications are outside CodeWeavers support.
- Search aliases: 上古卷轴5, 上古卷轴五, 天际, 天际特别版, 老滚5, 老滚五, Skyrim SE.

### Persona 5 Royal

- [Steam listing](https://store.steampowered.com/app/1687950/Persona_5_Royal/) is age-gated in the text browser. Valve's public [store metadata](https://store.steampowered.com/api/appdetails?appids=1687950&l=english), retrieved directly on the review date, reports `windows: true, mac: false, linux: false`, empty Mac requirement content and an available purchase package. Windows requirements explicitly include AVX and SSE4.2. No official Steam Mac edition is listed.
- [CodeWeavers overview](https://www.codeweavers.com/compatibility/crossover/persona-5-royal) reports Mac Runs Great / 26.3.0. CW appId 19029.
- [Game media](https://www.codeweavers.com/compatibility/crossover/media/persona-5-royal) shows macOS 15 with CrossOver 24.0.5, 24.0.7 and 25.0.1. A supported product recommendation can be scoped to macOS 15 or newer. This is our chosen environment boundary, not a verified official minimum version for the game. No exact chip minimum or FPS is established.
- [CrossOver 25 announcement](https://www.codeweavers.com/support/forums/announce/?t=24%3Bmsg%3D322440) says it automatically enables AVX for games that require it. Do not invent a manual AVX setup step. Old 2022/2023 forum failures are not current failures and must not override the latest positive record.
- Search aliases: 女神异闻录5皇家版, 女神异闻录5皇家, 女神异闻录5, P5R, Persona5Royal.

### Death's Door

- [Steam listing](https://store.steampowered.com/app/894020/Deaths_Door/) is readable, currently sold, and lists Windows 10 x64 requirements only. [Store metadata](https://store.steampowered.com/api/appdetails?appids=894020&l=english) confirms `mac: false` and empty Mac requirements.
- [CodeWeavers overview](https://www.codeweavers.com/compatibility/crossover/deaths-door) reports Mac Runs Great / 26.3.0. CW appId 17505. Its separately old Linux rating is not used.
- Its single-player action-adventure premise supports a distinct discovery choice. No game-specific blocker or mandatory graphics switch is established by the reviewed overview; do not invent either.
- Search aliases: 死亡之门, Deaths Door, DeathsDoor.

### DARK SOULS III

- [Steam listing](https://store.steampowered.com/app/374320/?l=english) is readable and currently sold, with only Windows requirements and DirectX 11. No macOS section is listed.
- [CodeWeavers overview](https://www.codeweavers.com/compatibility/crossover/dark-souls-iii) reports Mac Runs Well / 26.2.0. CW appId 14360. The higher Linux rating must not be used for Mac.
- The current overview does not specify a reproducible defect. Do not fabricate a crash, graphics issue, resolution restriction, or broken multiplayer claim to explain its lower priority. The lower positive rating supports keeping it searchable without selecting it ahead of current Runs Great options. Single-player is a valid editorial scope, not proof multiplayer is broken.
- Search aliases: 黑暗之魂3, 黑暗之魂三, 黑魂3, 黑魂三, 魂3, DS3, Dark Souls 3.

## Excluded from positive expansion

- [Dark Souls II: Scholar of the First Sin](https://www.codeweavers.com/compatibility/crossover/dark-souls-ii-scholar-of-the-first-sin): current **Mac Limited Functionality / 26.1.0 (2)**; the Runs Great rating belongs to Linux. Do not swap the platform rating or use an older success image to promote it.
- [Metal Gear Solid V: The Phantom Pain](https://www.codeweavers.com/compatibility/crossover/metal-gear-solid-v-the-phantom-pain): current **Mac Installs, Will Not Run / 26.3.0 (3)**. Older macOS 15 / 24.0.5 success media does not establish current positive support.
- [Yakuza 0](https://www.codeweavers.com/compatibility/crossover/yakuza-0): **Mac Runs Great / 26.1.0 (2)**, but [Steam metadata for 638970](https://store.steampowered.com/api/appdetails?appids=638970&l=english) has no purchase packages or price in this retrieval. Excluded from new-purchase discovery pending direct purchase availability confirmation. Do not transfer its record to Director's Cut. Missing packages alone is not a worldwide delisting proof.

## Internal source mapping

For each accepted appId, `store:<appId>:2026-09-05` resolves to the Steam source above and `codeweavers:<appId>:2026-09-05` resolves to its exact CodeWeavers overview. Keep the date, platform, reported rating and tested version together. Source records belong in internal evidence; player copy should describe the game and supported route without research terminology.
