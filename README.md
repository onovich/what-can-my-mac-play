# What Can My Mac Play?

[简体中文](README.zh-CN.md)

An early-stage product research repository for a Mac game compatibility decision engine. The project is designed to help players understand which games are likely to work on their specific Mac—and why—without treating a single compatibility rating as a guarantee.

![What Can My Mac Play? social preview](docs/social-preview.png)

## What the project aims to do

- Match a player's Steam library against available Mac compatibility evidence.
- Model the environment behind each report, including Apple silicon, macOS, CrossOver, and graphics backend details.
- Keep compatibility and confidence as separate scores so sparse or conflicting evidence remains visible.
- Summarize reproducible configurations while preserving source links, dates, and claim boundaries.
- Prefer a native Mac version when it is the simpler supported route.

## Current status

The repository is in the **product research and feasibility phase**. It currently contains the product scope, a proposed data model and scoring approach, source and licensing analysis, and one local Steam/CrossOver research snapshot.

No web application, API, data pipeline, automated test suite, or deployment has been implemented yet. The next gate is to validate legal and stable access to compatibility data before building around large-scale aggregation.

## Repository contents

- [`WHAT_CAN_MY_MAC_PLAY_HANDOFF.md`](WHAT_CAN_MY_MAC_PLAY_HANDOFF.md) — product definition, evidence model, MVP scope, risks, and phased delivery plan.
- [`steam-crossover-research.md`](steam-crossover-research.md) — a point-in-time local research snapshot that demonstrates why version, environment, and evidence freshness matter.
- [`docs/social-preview-ledger.yml`](docs/social-preview-ledger.yml) — evidence and design decisions behind the repository cover.

## Planned MVP

The proposed MVP focuses on Apple silicon Macs, Steam, and CrossOver:

1. Search and browse evidence-backed game compatibility pages.
2. Create a Mac profile with chip, memory, macOS, and CrossOver details.
3. Match a user-authorized public Steam library.
4. Show compatibility, confidence, known blockers, recent evidence, and source links.
5. Explain conflicting or stale reports instead of hiding them behind one score.

The initial validation target is 50 representative games, followed by an internal 100–200 game prototype. Expansion to 500–1,000 public pages depends on data rights and evidence quality.

## Data and accuracy boundaries

The product is intended to aggregate cited third-party reports; it is not an independent testing laboratory. Compatibility depends on hardware, macOS, runner version, graphics backend, game updates, launchers, DRM, and anti-cheat systems.

Technical access does not imply permission to cache or republish data. Each source must have a documented license or approved usage path before production ingestion. Steam credentials must never be collected or stored by this project.

## Documentation

The detailed [handoff document](WHAT_CAN_MY_MAC_PLAY_HANDOFF.md) is the current source of truth for product decisions and the roadmap.

## License

No open-source license is currently included in this repository.
