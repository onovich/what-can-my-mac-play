# Newer runtime evidence review

Reviewed: 2026-09-04. Bounded follow-up to [sample runtime reports](./sample-runtime-reports.md), covering the six published sample games, 2025–2026 firsthand reports, and local non-VM routes only. No games were installed or tested by MacPlay.

## Outcome

No newly retrieved report meets the complete environment-and-build requirement for current purchase guidance. Two newer original reports have useful concrete environment details, but remain **incomplete historical community evidence**, not verified benchmarks or safe-to-buy judgments. Missing fields must stay unknown; publication dates are not test dates. These findings must not automatically change compatibility scores.

## Candidate 1: Sekiro — gameplay and external-display menu crash

Source: [oztruwa's original report](https://www.reddit.com/r/macgaming/comments/1m5b8ey/sekiro_shadows_die_twice_crossover_macbook_m4_pro/), published 2025-07-21. The original body and author were retrieved; search date metadata and the page's July 21, 2025 navigation agree. A linked recording was not independently watched.

| Field | Reported value |
| --- | --- |
| Catalog game | Sekiro: Shadows Die Twice, app ID 814380 |
| Machine | MacBook Pro, M4 Pro, 24 GB, 12 CPU / 16 GPU cores |
| macOS | 15.5 |
| Runner | CrossOver Preview 20250625 |
| Additional stack | GPTK 3 beta, D3DMetal, MSync |
| Settings | 1440p, maximum graphics |
| Performance | Author reports a 60 FPS ceiling; not an independently measured average |
| Problem | Opening graphics settings in fullscreen on an external monitor crashes; author says the built-in display does not reproduce it |
| Claimed workaround | Enter windowed mode before graphics settings, then return to fullscreen |

Unknown: storefront, exact game build, D3DMetal component version, precise test date, run duration, save/reload integrity, completion, and controller verification. Do not assume Steam from the catalog app ID, or transfer this preview/GPTK beta result to stock CrossOver. The workaround is attributed to the author, not locally validated.

Suggested historical record (unknown values are intentional):

```yaml
id: reddit-sekiro-oztruwa-20250721
appId: 814380
sourceType: community-firsthand
author: oztruwa
sourceUrl: https://www.reddit.com/r/macgaming/comments/1m5b8ey/sekiro_shadows_die_twice_crossover_macbook_m4_pro/
storefront: unknown
runner: crossover
runnerVersion: Preview 20250625
machine: MacBook Pro
chip: M4 Pro
cpuCores: 12
gpuCores: 16
memoryGB: 24
macOS: 15.5
backend: d3dmetal
backendVersion: null
additionalStack: GPTK 3 beta; MSync
gameBuild: null
publishedAt: 2025-07-21
testedAt: null
retrievedAt: 2026-09-04
status: gameplay-with-issues-reported
resolution: 1440p
preset: maximum
averageFps: null
completion: unknown
saveReload: unknown
multiplayer: unknown
```

The original author explicitly contrasts an external display in fullscreen (graphics-menu crash) with the MacBook's own display when the external display is disconnected (problem absent). The author's workaround is Command+Enter to windowed mode **before entering graphics settings**, adjust settings, then Command+Enter back to fullscreen. This is a conditional menu failure, not a claim that all external-display gameplay crashes. Only a textual self-report was verified.

## Candidate 2: Elden Ring — location-specific crashes

Source: [xanitor's original report](https://www.reddit.com/r/macgaming/comments/1j9x1zx/elden_ring_crashes_in_specific_area_crossover_25/), published 2025-03-12 according to indexed original-post date metadata. Direct retrieval exposes the same body and author but renders the date relatively.

| Field | Reported value |
| --- | --- |
| Catalog game | Elden Ring, app ID 1245620 |
| Machine | MacBook Pro, M3 Pro, 18 GB |
| macOS | Sequoia 15.3.1 |
| Runner | CrossOver 25; patch/build unknown |
| Graphics / synchronization | D3DMetal / ESync |
| Problem | Crashes when crossing certain areas; author says this also happened in CrossOver 24 |
| Mod context | Intended co-op mod use; author says the crash also happens in single-player |

Unknown: storefront, game build, exact runner patch/build, backend version, GPU core count, test date, resolution/preset, duration, saves and completion. The report does not establish clean unmodified single-player testing. A reply proposes MSync, but there is no observed confirmation by the original author; do not present that suggestion as a verified fix. FPS claims in subsequent replies belong to a **different author** and must not be merged into this environment.

## Other leads and exclusion reasons

- [Noita Entangled Worlds issue #480](https://github.com/IntQuant/noita_entangled_worlds/issues/480): VaneeshaS, opened 2026-04-12. Original body describes Steam's Windows edition under Wine/Merlot and inability to launch via the mod's Mac proxy. The log identifies Noita's Jan 25, 2025 release label, but hardware, macOS, and runner version are missing. This is a mod/proxy issue, not proof the base game cannot launch or all multiplayer fails. Do not count it as an additional complete report.
- [Portal 2 in Matt Diamond's M4 Macs post #36](https://www.insidemacgames.com/forum/showthread.php?pid=307143): original post dated 2025-03-17 describes Mac Studio M4 Max and CrossOver 25, with a positive highest-settings impression. Missing memory, OS, precise runner, store, build, duration and feature validation. The post says games were *mostly* tested at 3440×1440, so that cannot become Portal 2's definite resolution. Another author's machine configuration in the thread must not be merged.
- [Elden Ring 4K report](https://www.reddit.com/r/macgaming/comments/1k5c171/elden_ring_4k60fps_on_apple_silicon/): aneesiqbal, 2025-04-22, reports CrossOver 25/macOS 15.4.1 and M4 Max, but calls the machine a 13-inch MacBook Pro. Preserve that unresolved model description rather than silently correcting it. Memory, game build and feature coverage are absent; not selected.
- [CodeWeavers March 2025 forum index](https://www.codeweavers.com/support/forums/general?forumcurPos=701%3Bt%3D27): identifies a newer M4 Elden Ring thread, but repeated direct retrieval returned HTTP 403. Index titles and last-post dates are not individual test evidence.
- No new qualifying firsthand Witcher 3 or Ori and the Will of the Wisps report was retrieved in this bounded pass. This is a research gap, not incompatibility. Aggregate compatibility stars, search snippets, and product page modification dates were not treated as a dated run.

## Product implication

The next useful implementation is to make evidence completeness visible and support collecting reproducible reports: store/build, exact chip/memory/macOS, runner plus backend version, actual test date, resolution/preset, duration, launch/gameplay/save/completion and separately tested multiplayer. Publishing these candidates, if desired, requires an incomplete/historical label and no score increase. The existing three records should not be duplicated or refreshed merely because they were re-read today.
