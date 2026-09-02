# Representative Game Cohort

Updated: 2026-09-03

This 50-game cohort is a validation queue, not a compatibility ranking. Its purpose is to exercise the domain model across native macOS candidates, DirectX 11 and 12 candidates, anti-cheat, third-party launchers, low-spec baselines, high-end 3D games, and online multiplayer.

## Selection rules

- Each candidate has one provisional canonical identity in the form `game:steam:{appId}` and links to its Steam Store page.
- `nativeMacOsAvailable` remains `null` until the documented Steam catalogue or a manual official-store review confirms the field.
- A `positive-path`, `failure-path`, or `conflict-path` label defines the evidence-processing scenario the candidate should test. It is not a claim about current compatibility.
- The cohort includes the ten games already examined in `steam-crossover-research.md`, plus widely played and technically varied candidates.
- Steam's official charts and macOS-filtered search were used as discovery aids; neither chart position nor an OS search result is stored as compatibility evidence.

## Required verification before publication

1. Resolve each provisional identity through the documented `IStoreService/GetAppList` source.
2. Record native macOS availability only from an approved Steam field or manual official page review.
3. Attach every DirectX, launcher, anti-cheat, and compatibility claim to a dated Evidence record.
4. Replace a candidate axis when research disproves it; never preserve a category merely to satisfy a coverage test.
5. Keep all candidates out of the public catalogue until their identity and minimum evidence are verified.

## Discovery sources

- [Steam official charts](https://store.steampowered.com/charts/)
- [Steam macOS-filtered search](https://store.steampowered.com/search/?os=mac)
- Individual official Steam Store URLs generated from each candidate's App ID
