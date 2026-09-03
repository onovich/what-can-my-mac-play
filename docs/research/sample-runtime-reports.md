# Sample runtime reports: conservative first-person evidence

Reviewed: 2026-09-04. Scope: the six published sample games; local non-VM routes only. This research did not install or run any game. These are attributed external self-reports, not MacPlay tests, benchmarks, or purchase assurances.

Retrieval note: searching `site.codeweavers.com "Elden Ring" "M1" CrossOver` returned the original forum thread; a subsequent direct web open of `https://www.codeweavers.com/compatibility/crossover/forum/elden-ring?msg=300967` successfully exposed all three posts. Later requests intermittently returned HTTP 403. Post #1 visibly says Finley, posted 2024-03-21 07:58; post #2 visibly says Pratik Nichite, posted 2024-03-31 11:15 and edited 17:31. Times have no confirmed timezone and are therefore not normalized to UTC. All selected fields below come from that visible original body, not guessed from search titles. Paulthetall's original page was successfully opened directly.

## Inclusion rules

- A report must have an identifiable author and original account of their own run. A vendor-hosted community forum is not vendor QA.
- Preserve missing fields as `null`. Publication, edit, retrieval, and test dates are different fields. Do not infer a test date from a post date.
- Steam app ID is the catalog identity, not proof that the report tested the Steam edition.
- Do not combine hardware, OS, or settings from different authors in the same thread.
- All selected reports are historical. None establishes compatibility with current game builds or the visitor's environment. Keep them outside current-environment scoring until matching requirements are met.

## 1. Elden Ring: M1 / CrossOver gameplay self-report

Source: [CodeWeavers forum, Pratik Nichite, post #2](https://www.codeweavers.com/compatibility/crossover/forum/elden-ring?msg=300967).

```yaml
id: cw-elden-ring-pratik-20240331
appId: 1245620
sourceType: community-firsthand
author: Pratik Nichite
storefront: steam
runner: crossover
runnerVersion: 24.0.0.1
machine: MacBook Air
chip: M1
memoryGB: 8
macOS: null
backend: d3dmetal
backendVersion: null
gameBuild: null
publishedAt: 2024-03-31
editedAt: 2024-03-31
testedAt: null
retrievedAt: 2026-09-04
status: gameplay-reported
fps: null
completion: unknown
multiplayer: unknown
```

Author describes resolving an initial launch failure, and reports D3DMetal/MSync enabled, DXVK/ESync/high-resolution mode disabled. Missing OS, build, exact test date, duration, measured performance, save integrity, completion, and online validation. Linked recording was not independently inspected. This cannot inherit the Intel author's Sonoma version below.

## 2. Elden Ring: Intel / CrossOver launch failure

Source: [CodeWeavers forum, Finley, post #1](https://www.codeweavers.com/compatibility/crossover/forum/elden-ring?msg=300967).

```yaml
id: cw-elden-ring-finley-20240321
appId: 1245620
sourceType: community-firsthand
author: Finley
storefront: unknown
runner: crossover
runnerVersion: 23.7.1
machine: MacBook Pro 2019
chip: Intel Core i7 2.6 GHz
memoryGB: null
macOS: 14.4
backend: null
backendVersion: null
gameBuild: null
publishedAt: 2024-03-21
testedAt: null
retrievedAt: 2026-09-04
status: launch-failed
fps: null
completion: unknown
multiplayer: unknown
```

White window and Wine error reported. Missing store, GPU, memory, backend, build, and test date. Do not generalize failure to all Intel Macs or Apple Silicon, or apply another user's workaround as a verified fix.

## 3. Noita: maintainer's brief Porting Kit trial

Source: [Paulthetall, Noita for Mac](https://www.paulthetall.com/noita-for-mac/).

```yaml
id: paulthetall-noita-20230812
appId: 881100
sourceType: maintainer-firsthand
author: paulthetall
storefront: gog
storefrontBasis: article's GOG offline-installer recipe; exact tested package unnamed
runner: porting-kit
runnerVersion: null
engineVersion: null
machine: MacBook Pro
chip: Apple Silicon; generation unspecified
memoryGB: null
macOS: null
backend: null
backendVersion: null
gameBuild: null
publishedAt: 2023-08-12
updatedAt: 2023-08-15
testedAt: null
retrievedAt: 2026-09-04
status: brief-gameplay-reported
fps: null
completion: unknown
multiplayer: unknown
```

The maintainer says he briefly tried the game on his Apple Silicon MacBook Pro and found it worked well. The article provides a GOG offline-installer recipe, not Steam testing. Chip generation, memory, OS, runner/engine/backend versions, game build, test date, duration, saves, and completion are missing. This is the **same source as the existing recipe evidence**, not a second independent confirmation. Keep the GOG context visible on the Steam-indexed game page.

## Leads not promoted to structured reports

- [Noita's CodeWeavers overview](https://www.codeweavers.com/compatibility/crossover/noita): aggregate version ratings and media captions are not one test environment. Its modification date is not the rating's test date. Do not combine them.
- [Noita M3 Pro forum post](https://www.codeweavers.com/compatibility/crossover/forum/noita?msg=307255): firsthand positive impression on M3 Pro / 36 GB, published 2024-08-06, but no runner version, OS, store, or build; no measured benchmark. A possible future supplementary report, not selected to pad coverage.
- [Portal 2 forum index](https://www.codeweavers.com/compatibility/crossover/forum/portal-2): a ten-hour M1 thread exists, but its body could not be reliably retrieved during this pass. Its title alone is insufficient.
- [Sekiro overview](https://www.codeweavers.com/compatibility/crossover/sekiro-shadows-die-twice): per-run evidence could not be retrieved; summary stars are not hardware-specific validation.
- [Witcher discussion](https://www.codeweavers.com/support/forums/general?msg=278437&t=27): a GOG next-generation M2 Max / CrossOver 23.5 firsthand lead appeared, but complete post metadata was unavailable. Do not promote without the source post and publication date.
- No qualifying Ori report was obtained in this bounded pass. This is a research gap, not evidence of incompatibility.

## Implementation recommendation

Show a small attributed **historical runtime reports** section with known environment, missing fields, original link, and clearly labeled publication date. Do not award scores, claim current compatibility, or synthesize missing values. Use explicit unknown states for games without accepted reports. Prioritize a reproducible newer report with store/build, exact Mac/OS, runner/backend versions, and separate launch/gameplay/save/completion results over adding more low-detail positive anecdotes.
