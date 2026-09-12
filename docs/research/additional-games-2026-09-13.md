# Additional Windows-game candidates — 2026-09-13

## Outcome and method

Admit **Command & Conquer Remastered Collection** only from this six-candidate review. Do not fill a numerical quota by overlooking launch, edition or setup gaps. Keep it searchable, not automatically featured.

Steam API requests were made live with `cc=us&l=english`; all six responses returned `success: true`, Windows true, Mac false and Linux false. The CodeWeavers evidence below comes mostly from indexed first-party pages (generally crawled within the last month). Some direct opens returned HTTP 403; these are not live compatibility-page checks or hands-on game tests. The Red Alert 3 rating was only available from a four-month-old indexed alternate overview. `Last Tested` is the CrossOver version, not a test date. Community tips hosted by CodeWeavers are firsthand community evidence, not vendor guarantees.

## Admission matrix

| Exact Steam product / app | Indexed CodeWeavers Mac rating | Decision |
| --- | --- | --- |
| Command & Conquer Remastered Collection / 1213210 | Runs Great, 26.2.0 (1), entry 16740 | Accept Steam Windows route. |
| Command & Conquer Red Alert 3 / 17480 | Runs Great, 25.1.1 (1), entry 4664 | Hold: Steam-specific launch warning not resolved with a current complete recipe. |
| Age of Mythology: Extended Edition / 266840 | Runs Great, 26.3.0 (1), entry 13860 | Hold: old MSXML/launcher repair and a later M2 failure report are not resolved here. |
| Batman: Arkham Asylum GOTY / 35140 | Will Not Install, 26.1.0 (1), entry 6152 | Do not admit positive route. |
| Batman: Arkham City GOTY / 200260 | Runs Great, 25.1.1 (2), entry 9847 | Hold: exact current Windows Steam GOTY setup not established. |
| Dead Space (2008) / 17470 | Limited Functionality, 26.1.0 (1), entry 5476 | Do not admit positive route. |

## Command & Conquer Remastered Collection

- [Steam store](https://store.steampowered.com/app/1213210/) / [live API](https://store.steampowered.com/api/appdetails?appids=1213210&cc=us&l=english) establish the Windows-only remastered collection. Do not substitute the original Red Alert, Red Alert 3 or C&C 3.
- [CodeWeavers overview](https://www.codeweavers.com/compatibility/crossover/command-and-conquer-remastered) gives the positive Mac rating above. The old Linux rating and its outdated badge are not Mac restrictions.
- [Steam-specific installation tip, 2024-05-27](https://www.codeweavers.com/compatibility/crossover/tips/command-and-conquer-remastered/getting-command-and-conquer-remastered-collection-running-crossover-24-steam) explicitly identifies Steam and Windows 10 64-bit. It offers original graphics via Space if performance is poor and matching screen resolution. Those are conditional performance adjustments, not proof current versions require degraded graphics.
- [Updated Steam setup, 2026-05-06](https://www.codeweavers.com/compatibility/crossover/tips/command-and-conquer-remastered/guide-for-steam-setup-crossover-2610) uses the Steam CrossTie and installs **DirectX for Modern Games into that same Steam bottle**. Its optional cursor-hiding utilities are not a required game dependency; do not recommend installing unrelated utilities.
- [EA App-only failure thread](https://www.codeweavers.com/compatibility/crossover/forum/command-and-conquer-remastered?msg=286737) expressly excludes Steam, and a June 2024 reply distinguishes a working Steam copy. Do not transfer the EA App failure into this Steam recommendation.
- Editorial action: use CrossOver for the Steam Windows release. Keep at most one practical setup condition: `在 CrossOver 的 Steam 容器中安装 DirectX for Modern Games，再安装游戏。` Do not promise multiplayer, a minimum frame rate or every Mac configuration. The setup is a documented path, not proof that a fresh current CrossTie always needs manual dependency repair.

## Deferred candidates

### Red Alert 3

[Steam API](https://store.steampowered.com/api/appdetails?appids=17480&cc=us&l=english) confirms app identity and Mac false. The [CodeWeavers canonical entry](https://www.codeweavers.com/compatibility/crossover/command-and-conquer-red-alert-3) has an [indexed alternate overview](https://www.codeweavers.com/compatibility/crossover/changelog/command-and-conquer-red-alert-3/?sort%5Bcustomer_id%5D=%3Bcmd%3Dedit%3Blog_id%3D41872) with a positive Mac rating but a Steam-row launch warning. The CD/DVD cross-tie instructions are a different distribution. The [forum index](https://www.codeweavers.com/compatibility/crossover/forum/command-and-conquer-red-alert-3) leads to a [2021 Steam DirectX 9 launch failure](https://www.codeweavers.com/compatibility/crossover/forum/command-and-conquer-red-alert-3?msg=252089) with no answer. This bounded review did not establish a complete current Steam launch path; it does not prove all installations fail.

### Age of Mythology: Extended Edition

[Steam API](https://store.steampowered.com/api/appdetails?appids=266840&cc=us&l=english) and [CodeWeavers overview](https://www.codeweavers.com/compatibility/crossover/age-of-mythology-extended-edition) identify the original Extended Edition, not Retold. The [2023 setup tip](https://www.codeweavers.com/compatibility/crossover/tips/age-of-mythology-extended-edition/how-to-get-the-game-running) establishes Steam mapping but includes MSXML removal/reinstallation and window/resolution repair. It also says the game-specific installer supplies dependencies; this is not verification of current 26.x behavior. The [forum index](https://www.codeweavers.com/compatibility/crossover/forum/age-of-mythology-extended-edition) lists a 2025-12-06 M2 not-running-properly report; its [body](https://www.codeweavers.com/compatibility/crossover/forum/age-of-mythology-extended-edition?msg=341009) was inaccessible. Hold rather than offer destructive DLL deletion or claim the later report is resolved.

### Batman: Arkham Asylum GOTY

[Steam API](https://store.steampowered.com/api/appdetails?appids=35140&cc=us&l=english) identifies GOTY. The [CodeWeavers overview](https://www.codeweavers.com/compatibility/crossover/batman-arkham-asylum) is negative on Mac despite positive Linux results. A [2025-12-23 staff reply](https://www.codeweavers.com/compatibility/crossover/forum/batman-arkham-asylum?msg=314074) explains x87-heavy code can cause Rosetta slowdowns; the initiating installation was GOG, so it is not an exact Steam test. The negative Mac overview alone is enough to reject this positive-admission batch.

### Batman: Arkham City GOTY

[Steam API](https://store.steampowered.com/api/appdetails?appids=200260&cc=us&l=english) currently says Mac false. The [CodeWeavers entry](https://www.codeweavers.com/compatibility/crossover/batman-arkham-city) lists Steam and GOG, but its Steam note says a native Mac version exists. The [tips index](https://www.codeweavers.com/compatibility/crossover/tips/batman-arkham-city) dates that note to 2014; do not override current Steam metadata with it. The only [retrieved setup discussion](https://www.codeweavers.com/compatibility/crossover/forum/batman-arkham-city?msg=160563) is from 2014, does not establish current Steam GOTY mapping, and mentions unresolved mouse rotation. Hold for edition-specific Windows Steam evidence, not because historical native support makes CrossOver unnecessary.

### Dead Space (2008)

[Steam API](https://store.steampowered.com/api/appdetails?appids=17470&cc=us&l=english) identifies the original 2008 game. Its [CodeWeavers entry](https://www.codeweavers.com/compatibility/crossover/dead-space) is Limited Functionality on Mac. The [2023 remake entry](https://www.codeweavers.com/compatibility/crossover/dead-space-2023) is a different product and has a positive 26.2.0 rating; that cannot be transferred to the original. The remake was not fully researched in this bounded six-candidate pass.

## Additional main-agent check: Titan Quest Anniversary Edition

The main agent live-checked [Steam API app 475150](https://store.steampowered.com/api/appdetails?appids=475150&cc=us&l=english): Mac false. The indexed [CodeWeavers Titan Quest entry](https://www.codeweavers.com/compatibility/crossover/titan-quest) shows Mac Runs Well on 26.3.0 and Steam distribution. Its [forum index](https://www.codeweavers.com/compatibility/crossover/forum/titan-quest) includes a 2026-07-27 topic about disabling x87-based ragdoll animations on Apple Silicon. The actual steps were inaccessible. Hold rather than invent a setting or omit a material setup requirement. This was an additional main-agent check, not a seventh candidate researched by this worker.
