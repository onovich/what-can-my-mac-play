# Mature Windows-game candidates — 2026-09-13

## Method and decision

Checked Steam's first-party appdetails API on 2026-09-13 and CodeWeavers' own compatibility entries. **Final batch decision: admit Max Payne 2, Command & Conquer 3 Tiberium Wars, Stronghold Crusader HD, Portal and F.E.A.R.; defer Oblivion GOTY.** All six have a positive **Mac** rating and a Steam mapping, but this batch does not publish Oblivion without a complete, current audio-configuration recommendation. Admission does not imply automatic homepage promotion. Ratings are compatibility-database evidence, not our own hardware testing or an unconditional performance guarantee. `Last Tested` is a CrossOver version, not a test date. An outdated Linux badge is not a Mac restriction.

Some CodeWeavers canonical URLs returned HTTP 403 to direct fetching. In those cases the search engine's indexed first-party page supplied the rating and distribution table; its crawl may lag the live page. No secondary rating site was used. Steam API requests were live and returned `success: true` for all eight checked games.

## Verified candidate evidence

| Steam app ID / exact product | Steam platforms | CodeWeavers entry / Mac rating | Editorial scope |
| --- | --- | --- | --- |
| 12150 — Max Payne 2: The Fall of Max Payne | Windows true, Mac false, Linux false | 49; Runs Great; 26.1.0 | Steam Windows game via CrossOver; no new purchase blocker established. |
| 24790 — Command & Conquer 3 Tiberium Wars | Windows true, Mac false, Linux false | 2857; Runs Great; 26.2.0 | Steam game, not the incompatible disc-DRM release. |
| 40970 — Stronghold Crusader HD (2012) | Windows true, Mac false, Linux false | 10851; Runs Great; 26.0.0 | HD (2012), not the separate Definitive Edition. |
| 400 — Portal | Windows true, Mac false, Linux true | 3424; Runs Well; 26.3.0 | Steam Windows route; do not offer a native Mac route from historical Mac availability. |
| 22330 — The Elder Scrolls IV: Oblivion Game of the Year Edition (2009) | Windows true, Mac false, Linux false | 2407; Runs Well; 26.1.0 | **Deferred this batch:** original GOTY, not Oblivion Remastered; current complete audio setup needs resolution. |
| 21090 — F.E.A.R. | Windows true, Mac false, Linux false | 2894; Runs Well; 26.3.0 | Base game, not F.E.A.R. Combat or separate expansions. |

### Max Payne 2

- [Steam store](https://store.steampowered.com/app/12150/) and [live API](https://store.steampowered.com/api/appdetails?appids=12150&cc=us&l=english) establish product identity and Mac false.
- [CodeWeavers canonical entry](https://www.codeweavers.com/compatibility/crossover/max-payne-2) maps Steam and carries the positive Mac rating. The accessible [indexed alternate entry view](https://www.codeweavers.com/compatibility/crossover/changelog/max-payne-2?sort%5Bupdatetime%5D=ASC%3Bsort%5Blog_id%5D%3DASC%3Bcmd%3Dedit%3Blog_id%3D116507) displayed Mac Runs Great, 26.1.0 (1), entry ID 49.
- [Steam-specific tip, 2023-08-19](https://www.codeweavers.com/compatibility/crossover/tips/max-payne-2/running-max-payne-2-with-a-steam-bottle) specifies a Windows 10 64-bit Steam bottle and notes the desktop cursor may appear when accessing the in-game Steam Community. This old minor overlay symptom does not establish a present-day purchase blocker. The [2012 random-sound tip](https://www.codeweavers.com/compatibility/crossover/tips/max-payne-2/sound-works-but-it-stops-randomly) must not become an unconditional CrossOver 26 restriction.

### Command & Conquer 3 Tiberium Wars

- [Steam store](https://store.steampowered.com/app/24790/) and [live API](https://store.steampowered.com/api/appdetails?appids=24790&cc=us&l=english) establish the Windows-only Steam release.
- [CodeWeavers entry](https://www.codeweavers.com/compatibility/crossover/command-and-conquer-3-tiberium-wars) displays Mac Runs Great, 26.2.0 (2), ID 2857, explicitly lists Steam, and distinguishes nonworking disc DRM. No need to show the disc warning in a Steam-only catalog.
- [Steam-specific CrossOver 24 tip](https://www.codeweavers.com/compatibility/crossover/tips/command-and-conquer-3-tiberium-wars/running-command-and-conquer-3-tiberium-wars-on-steam-crossover-24) specifies a Windows 10 64-bit Steam bottle. This evidence does not verify multiplayer service availability or promise a universal frame rate.

### Stronghold Crusader HD

- [Steam store](https://store.steampowered.com/app/40970/) and [live API](https://store.steampowered.com/api/appdetails?appids=40970&cc=us&l=english) identify HD (2012), not Definitive Edition.
- [CodeWeavers entry](https://www.codeweavers.com/compatibility/crossover/stronghold-crusader-hd) displays Mac Runs Great, 26.0.0 (1), ID 10851, and a Steam Store Page link for the HD product. Unlike some other entries, its text extraction does not show a separate Steam distribution row; identity is based on the explicit Steam Store Page link and matching HD product, not a transferred GOG report.
- The sole listed [freeze workaround](https://www.codeweavers.com/compatibility/crossover/tips/stronghold-crusader-hd/graphic-issue-freeze-from-the-first-screen-castle-but-sound-ok) is expressly **GOG v1.41, Ubuntu 24.04, CrossOver 24.0.2**. Do not tell Mac Steam users they must use an 800×600 window based on this report.

### Portal

- [Steam store](https://store.steampowered.com/app/400/) and [live API](https://store.steampowered.com/api/appdetails?appids=400&cc=us&l=english) currently mark Mac false (Linux true does not change our Mac route).
- [CodeWeavers entry](https://www.codeweavers.com/compatibility/crossover/portal) explicitly lists Steam and displays Mac Runs Well, 26.3.0 (2), ID 3424. Admit the CrossOver route; do not manufacture a specific gameplay limitation merely because the aggregate rating is four stars.
- [Old missing-text forum discussion](https://www.codeweavers.com/compatibility/crossover/forum/portal?msg=7002) dates to 2007–2008 and includes a staff fix discussion. It is not a current mandatory workaround. The [tips page](https://www.codeweavers.com/compatibility/crossover/tips/portal) was intermittently accessible, but no current Steam/Mac-specific blocker was established from it in this bounded review.

### Oblivion GOTY (2009)

- Final editorial decision: **defer**, rather than publish a partial manual-audio recommendation or turn a CrossOver 24 recipe into a mandatory 26.x requirement.
- [Steam store](https://store.steampowered.com/app/22330/) and [live API](https://store.steampowered.com/api/appdetails?appids=22330&cc=us&l=english) establish the original GOTY product and Mac false.
- [CodeWeavers original Oblivion entry](https://www.codeweavers.com/compatibility/crossover/the-elder-scrolls-iv-oblivion) displays Mac Runs Well, 26.1.0 (3), ID 2407, and explicitly maps Steam GOTY. Its disc-DRM warning does not apply to the Steam release.
- [Steam Mac installation tip, 2024-07-10](https://www.codeweavers.com/compatibility/crossover/tips/the-elder-scrolls-iv-oblivion/running-the-elder-scrolls-iv-oblivion-on-steam) describes Windows 10 64-bit Steam, Direct X For Modern Games/Core Fonts and Wine library overrides `x3daudio1_6`, `x3daudio1_7`, `xaudio2_6`, `xaudio2_7`. This is a CrossOver 24 setup recipe, not proof every 26.x install needs manual repair. If retaining a purchase caveat, say this route can involve manual audio configuration; do not claim current unavoidable corruption/crashes.
- The [separate Remastered entry](https://www.codeweavers.com/compatibility/crossover/The_Elder_Scrolls_IV_Oblivion_Remastered) is only Limited Functionality on 26.3.0. Do not transfer original-GOTY support to Remastered or match “重制版” to this product.

### F.E.A.R.

- [Steam store](https://store.steampowered.com/app/21090/) and [live API](https://store.steampowered.com/api/appdetails?appids=21090&cc=us&l=english) identify the base game and Mac false.
- [CodeWeavers entry](https://www.codeweavers.com/compatibility/crossover/fear-first-encounter-assault-recon) maps Steam explicitly; its Steam Store Page link was followed and resolved to app 21090. The fresher indexed page gives Runs Well, 26.3.0 (2), ID 2894; a month-old direct-open snapshot showed 26.1.0 (1). Both are positive Mac ratings; use the fresher observation for review metadata.
- [2011 installation advice](https://www.codeweavers.com/compatibility/crossover/tips/fear-first-encounter-assault-recon/installation) concerns setup/patch/copy protection; [2011 audio advice](https://www.codeweavers.com/compatibility/crossover/tips/fear-first-encounter-assault-recon/fixing-random-crashes-caused-by-audio-issues) mentions an older Steam copy and WMFADist.exe. Neither establishes a mandatory present-day 26.x restriction. Do not extend this base-game decision to separate expansions or the free multiplayer Combat release.

## Deferred editions

- **Tomb Raider: Anniversary, app 8000:** [Steam API](https://store.steampowered.com/api/appdetails?appids=8000&cc=us&l=english) is Mac false. [CodeWeavers](https://www.codeweavers.com/compatibility/crossover/tomb-raider-anniversary) is Mac Runs Well on 25.1.0, but retrieved content did not establish Steam distribution mapping. Its [2025 black-menu fix](https://www.codeweavers.com/compatibility/crossover/tips/tomb-raider-anniversary/main-menu-renders-black-background-without-any-graphics) explicitly concerns GOG and its settings shortcut. Do not carry that fix or support decision into Steam without resolving the mapping.
- **Tomb Raider: Legend, app 7000:** [Steam API](https://store.steampowered.com/api/appdetails?appids=7000&cc=us&l=english) is Mac false. [CodeWeavers](https://www.codeweavers.com/compatibility/crossover/tomb-raider-legend) is Mac Runs Well on 25.1.1, but retrieved distribution text identifies CD/DVD only. Steam mapping remains unproved in this pass.

No other runner, VM, FPS, save-integrity guarantee, multiplayer guarantee or blanket “works on every Mac” claim is admitted by this research.
