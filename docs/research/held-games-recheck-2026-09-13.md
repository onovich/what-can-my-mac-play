# Held games recheck — 2026-09-13

## Scope and evidence handling

Rechecked only the six held games below. Steam API was fetched directly today with `l=english&cc=us`; each response was successful and returned `windows: true, mac: false, linux: false`. CodeWeavers direct page opens returned HTTP 403, so the compatibility observations and community reports below were read from the search index, crawled within the last month (mostly one or two weeks). These are not live page reads or hands-on hardware tests. Community tips are firsthand reports, not CodeWeavers support guarantees. CrossOver ratings do not separately certify DLC, mods, every machine, or future patches.

## Admission decisions

Final integration decision: admit NieR only from this recheck. Defer New Vegas because a self-contained safe audio repair is not yet established; the conditional option below is research context, not a published recommendation.

| Game / Steam app | Current indexed Mac rating | Decision | Concise Chinese conclusion |
| --- | --- | --- | --- |
| NieR:Automata / 524220 | Runs Great, CrossOver 26.3.0; CodeWeavers app 17296 | **Accept, conditional; searchable, not featured** | 用 CrossOver 玩。英文版新建存档若无法输入名字，可临时切换游戏语言完成输入。 |
| Fallout: New Vegas / 22380 | Runs Well, 26.3.0; CodeWeavers app 8109 | **Accept only with audio limitation disclosed; not featured** | 可用 CrossOver 玩；电台歌曲缺失时需要补音频组件。不要宣称开箱即用。 |
| Monster Hunter: World / 582010 | Runs Great, 26.2.0; CodeWeavers app 16048 | **Hold** | 创建会话问题尚无可核实的稳定解决方案，本批不作购买推荐。 |
| MONSTER HUNTER RISE / 1446780 | Runs Great, 26.3.0; CodeWeavers app 17894 | **Hold** | 联机大厅有未解决的卡死报告，不推荐为了联机购买。 |
| Fallout 4 / 377160 | Runs Great, 26.3.0; CodeWeavers app 13922 | **Hold** | 当前评分已核实，但音频配置方案互相冲突，本批不发布确定安装方案。 |
| Prey (2017) / 480490 | Runs Great, 26.3.0; CodeWeavers app 17882 | **Hold** | 仍未核实当前版本的 AVX 自动配置行为，暂缓入库。 |

“Hold” is an editorial admission decision, not proof that all setups fail. Do not publish those games as technically impossible to run.

## NieR:Automata — previous save-entry blocker resolved

- [Steam store](https://store.steampowered.com/app/524220/) / [live API](https://store.steampowered.com/api/appdetails?appids=524220&l=english&cc=us) identifies the base game app, currently marketed through Game of the YoRHa Edition content. Do not give DLC a separate compatibility guarantee.
- [CodeWeavers overview](https://www.codeweavers.com/compatibility/crossover/nier-automata) currently indexes Mac Runs Great / 26.3.0, with a Steam Store Page.
- The previously inaccessible [new name-entry workaround](https://www.codeweavers.com/compatibility/crossover/tips/nier-automata/new-input-your-name-workaround), posted 2025-07-16 by Kieran Kenderessy, is now readable in the index. It specifically describes the Steam edition. With the game still running, open its Steam Properties, switch the game language from English to German, return to the game and enter the name, then restore English. This does not require importing somebody else's save or relying on Big Picture's keyboard.
- Scope: a fallback **if** English-language name input fails, not a required step for every install and not evidence the issue remains in every 26.3.0 setup. The author only tested German as the alternative language; do not extend this fix to every language or claim Steam Overlay/Input must be disabled.
- Suggested player condition: `若英文版新建存档无法输入名字，在游戏运行时将 Steam 游戏语言临时改为德语，输入后切回英文。`
- Suggested short note: `新建存档有输入设置要求` (or omit list note and retain the conditional detail; do not say all users must change language).

## Fallout: New Vegas — Steam path established, audio caveat isolated

- [Steam store](https://store.steampowered.com/app/22380/) / [live API](https://store.steampowered.com/api/appdetails?appids=22380&l=english&cc=us).
- [CodeWeavers overview](https://www.codeweavers.com/compatibility/crossover/fallout-new-vegas) indexes Mac Runs Well / 26.3.0.
- The [CrossOver 25 guide](https://www.codeweavers.com/compatibility/crossover/tips/fallout-new-vegas/fallout-new-vegas-guide-crossover-25), updated 2025-08-18, explicitly distinguishes Steam and GOG. Its Steam path uses a Windows 10 64-bit Steam bottle and Bethesda audio-library overrides. The [26.1.0 Steam guide](https://www.codeweavers.com/compatibility/crossover/tips/portal-2/steam-setup-crossover-2610), dated 2026-05-09, again names New Vegas among the Steam games covered by those audio overrides. This resolves the former absence of Steam-specific evidence; it is no longer merely a GOG inference.
- A [2026-07-31 clean-bottle report](https://www.codeweavers.com/compatibility/crossover/tips/fallout-new-vegas/radio-music-silent-mp3-codec-l3codecx-not-registered-after-directx-install) specifies M3, CrossOver 26.2.0, a 64-bit bottle and no mods. The CrossTie game runs, but radio songs are absent while radio speech, effects and voices work. The identified issue is an unregistered `l3codecx.ax` MP3 DirectShow filter. The author supplies codec extraction/registration steps and reports restored music.
- Do not reproduce the author's third-party runtime-download shell recipe in player copy. A supported Microsoft-runtime source and a concise safe guide would be needed before offering automated repair. Do not claim the codec repair is required on all 26.3.0 installs.
- The [Viva New Vegas guide](https://www.codeweavers.com/compatibility/crossover/tips/fallout-new-vegas/viva-new-vegas-crossover-installation-guide), updated 2026-08-02, concerns an optional modpack and references the same radio fix. It does **not** make mods a prerequisite for the base game.
- Suggested player action: `可用 CrossOver 玩，电台音乐需额外留意。` Suggested condition: `若电台只有主持人声音、没有歌曲，需要补装并注册 MP3 音频组件；游戏对白和音效不受这项问题影响。` Keep this out of homepage picks. If this batch only accepts documented self-contained setup paths, defer New Vegas rather than dropping its audio limitation.

## Monster Hunter: World — still held

- [Steam store](https://store.steampowered.com/app/582010/) / [live API](https://store.steampowered.com/api/appdetails?appids=582010&l=english&cc=us).
- [CodeWeavers overview](https://www.codeweavers.com/compatibility/crossover/monster-hunter-world) indexes Mac Runs Great / 26.2.0 and a Steam Store Page.
- [Forum index](https://www.codeweavers.com/compatibility/crossover/forum/monster-hunter-world) still shows “MH: World crashing Steam client when attempting to create new session”, last post 2026-07-16. Its body was not accessible in this bounded recheck. There is no verified resolution here, nor enough detail to label all solo or online sessions broken.

## Monster Hunter Rise — temporary workaround is not durable

- [Steam store](https://store.steampowered.com/app/1446780/) / [live API](https://store.steampowered.com/api/appdetails?appids=1446780&l=english&cc=us).
- [CodeWeavers overview](https://www.codeweavers.com/compatibility/crossover/monster-hunter-rise) indexes Mac Runs Great / 26.3.0.
- [Lobby thread](https://www.codeweavers.com/compatibility/crossover/forum/monster-hunter-rise?msg=350429): initial 2026-04-12 report says ordinary quest play works but joining lobbies freezes the game and closes Steam. A May reply proposes disabling Wi-Fi “Limit IP address tracking”. Later replies contradict durable success: 2026-06-04 still failed, and 2026-07-12 says that setting helped for about eight hours before failure returned. Do not recommend weakening a privacy setting as a reliable fix.
- The [older launch/controller thread](https://www.codeweavers.com/compatibility/crossover/forum/monster-hunter-rise?msg=290412) establishes actual Steam paths but is not a solution to the later lobby issue. Its 2023 D3DMetal success and Steam Input workaround must not be restated as blanket current requirements.

## Fallout 4 — rating blocker resolved, setup conflict remains

- [Steam store](https://store.steampowered.com/app/377160/) / [live API](https://store.steampowered.com/api/appdetails?appids=377160&l=english&cc=us).
- [CodeWeavers overview](https://www.codeweavers.com/compatibility/crossover/fallout-4) now verifiably indexes Mac Runs Great / 26.3.0. This is the base game, not Creation Kit or Fallout London.
- The [26.1.0 Steam guide](https://www.codeweavers.com/compatibility/crossover/tips/portal-2/steam-setup-crossover-2610) includes Fallout 4 and four audio overrides including `x3daudio1_7`.
- A [2026-04-18 working-setup report](https://www.codeweavers.com/compatibility/crossover/forum/fallout-4?msg=350738) instead says **not** to add `x3daudio1_7`; it uses DXVK, MSync, DirectX June 2010 and 96 kHz device output, but does not identify the storefront or CrossOver version. These recipes cannot be merged into a reliable universal setup. In particular, do not force all users' system audio to 96 kHz on this evidence.
- Hold this batch rather than claiming the current rating is unknown as the prior note did. The remaining task is now to isolate storefront/version-specific sound behavior, not re-find the overview.

## Prey (2017) — no new AVX resolution

- [Steam store](https://store.steampowered.com/app/480490/) / [live API](https://store.steampowered.com/api/appdetails?appids=480490&l=english&cc=us).
- [Correct CodeWeavers overview](https://www.codeweavers.com/compatibility/crossover/prey-2017) indexes Mac Runs Great / 26.3.0; `/prey` is the different 2006 game and must not be used.
- The [2025-04-11 AVX tip](https://www.codeweavers.com/compatibility/crossover/tips/prey-2017/avx-capabilities) advises adding `ROSETTA_ADVERTISE_AVX=1` to bottle configuration. This recheck found no primary source verifying whether current 26.3.0 setup applies this automatically, or the complete current manual path and OS scope. Old advice alone does not resolve the prior admission blocker.
