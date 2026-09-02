# Ten-Game Scoring Replay

Updated: 2026-09-03

This replay passes the ten manually reviewed candidates from `steam-crossover-research.md` through scoring algorithm `0.1.0`. It validates data flow and conservative behavior; it is not a public compatibility ranking.

## Input boundaries

- Each game has one manually observed CodeWeavers aggregate rating and source URL.
- CrossOver version proximity is represented as environment similarity.
- Missing chip, memory, macOS, graphics backend, and upstream test date remain unknown.
- Because the upstream test date is absent, scoring applies the documented `0.5` unknown-freshness factor.
- Each game has only one source and one independent evidence item, so confidence must remain below 40.
- Elden Ring keeps anti-cheat compatibility explicitly unknown. That uncertainty does not rewrite the single-player compatibility estimate.

## Outcome

The replay confirms that the v0 model does not turn a favorable aggregate rating into high confidence. It also confirms that every derived gameplay status, verdict, and feature status resolves through an Evidence ID to the original source URL.

| Rank | Game | Compatibility | Confidence |
| ---: | --- | ---: | ---: |
| 1 | The Witcher 3: Wild Hunt | 60 | 38 |
| 2 | Elden Ring | 60 | 37 |
| 3 | Hotline Miami 2: Wrong Number | 59 | 39 |
| 4 | Noita | 59 | 37 |
| 5 | ANIMAL WELL | 59 | 37 |
| 6 | Sekiro: Shadows Die Twice | 59 | 37 |
| 7 | Portal 2 | 57 | 37 |
| 8 | Dark Souls III | 56 | 37 |
| 9 | Death's Door | 56 | 31 |
| 10 | Ori and the Will of the Wisps | 54 | 32 |

The narrow compatibility range is intentional: the neutral prior dominates while evidence is sparse. These numbers should widen only after independent, dated, environment-matched reports are added.

The next calibration step requires independent, dated, environment-specific evidence. Until that exists, these results must stay internal and must not replace the prototype's clearly labeled sample copy.
