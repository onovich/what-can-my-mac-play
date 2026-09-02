# Scoring Methodology v0

Version: `0.1.0`

The scoring module produces two separate outputs for one game and one target environment:

- **Compatibility Score** estimates how well the game is expected to run.
- **Confidence Score** estimates how much trust to place in that compatibility estimate.

An unknown outcome produces no compatibility value. It is never converted to zero or treated as evidence that a game is unplayable.

## Report values

| Structured outcome | Base value |
| --- | ---: |
| Excellent | 95 |
| Playable | 80 |
| Limited | 55 |
| Gameplay failure | 30 |
| Launch failure | 10 |
| Installation failure | 0 |
| Unknown | Excluded |

Failed save, video, completion, launcher, audio, controller, and mod features can reduce the general compatibility value. Multiplayer and anti-cheat failures remain visible feature outcomes but do not reduce the general single-player score; a later product layer must calculate an online-specific score.

## Report weighting

Each known report receives this weight:

```text
source reliability
× target-environment similarity
× freshness decay
× evidence completeness
× independence factor
```

Freshness uses a 180-day half-life by default. A report with no upstream test date receives a conservative freshness factor of `0.5`; its assessment date is not substituted as though it were the test date. Reports sharing one `independenceKey` divide that evidence item's weight, so mirrors do not masquerade as independent confirmation.

The compatibility result uses a neutral prior of 50 with weight 0.75. This deliberately pulls a single report toward the middle while allowing a larger body of relevant evidence to dominate.

## Confidence

The documented confidence formula is implemented as:

```text
100 × (
  0.25 × source diversity
  + 0.20 × effective sample size
  + 0.20 × freshness
  + 0.20 × target-environment coverage
  + 0.15 × cross-source agreement
)
```

Source diversity is capped by the number of independent evidence items. Cross-source agreement is unavailable with fewer than two independent sources. A gap of 40 points or more between independent observations marks a conflict and applies a `0.65` confidence multiplier.

## Interpretation boundaries

- Scores are derived estimates, not first-party test results.
- Every report must remain traceable to Evidence records and source URLs.
- Compatibility must be `null` when no report has a known outcome.
- Confidence can increase without changing compatibility when corroborating evidence arrives.
- Algorithm versions are stored with every assessment so historical results can be reproduced.
- The constants in v0 are validation hypotheses and must be recalibrated against the representative cohort before public ranking.
