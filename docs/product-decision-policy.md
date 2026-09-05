# Decision-first player experience

Adopted: 2026-09-04, following the product owner's direction.

## Player contract

The product makes an editorial decision instead of assigning research to the player. Show one preferred route, a direct action, and at most two material conditions. The three route statuses are recommended, use with conditions, and not supported in the current catalog.

“Not supported” is a closed support-list policy: a game/runner pair without an admitted entry receives no endorsement. It is not an empirical claim that running the game is technically impossible. Do not turn absence of evidence into a fabricated failed test.

Positive route recommendations are choices among running methods, not unconditional purchase approvals or promises for every Mac. Purchase-specific exclusions must be direct: for example, do not buy Elden Ring for Mac multiplayer. A newer release, different store, different runner or different architecture does not automatically inherit support.

## Presentation

- Route labels are generated from the structured `runner` through one shared localized lookup in list and detail views. Never handwrite composite route titles per game. Edition names belong in game titles; material restrictions belong in an optional separate `note`, not in the route identity. Steam is common catalog context and is not repeated in every route label.

- Featured order is an explicit editorial order, considering support quality, material restrictions and gameplay variety; it is not a measured performance leaderboard. Search ranks exact names/aliases before prefix and substring matches and normalizes punctuation/spacing without equating different editions.
- The expansion reviewed on 2026-09-05 is recorded in `docs/research/catalog-expansion-2026-09-05.md`, resolving its `store:<appId>:2026-09-05` and `codeweavers:<appId>:2026-09-05` references. P5R's macOS 15+ recommendation is an editorial supported scope grounded in recorded configurations, not a claimed publisher Mac requirement.

- Homepage discovery prioritizes Windows games that lack a current Steam Mac edition but have an explicitly supported compatibility route. Official Mac editions remain searchable fallback data; they are not homepage picks. This is the product's core service, rather than repeating Steam's Mac catalog.

- With an empty search, show separately selected featured games. Searching queries the complete published catalog, including games with purchase restrictions. A recommended route alone does not qualify a game for homepage selection.
- The current Steam listing explicitly offering macOS support admits the Steam Mac edition. If current macOS support is absent, do not admit it from legacy requirement text alone (for example Portal 2). Missing CPU architecture is not a reason to deny a listed Mac edition; only state architecture restrictions actually published by the source.
- The internal `native` route means the official Mac edition, not necessarily an ARM-native binary. Display “Mac edition” / “Mac 版”. Apply the Steam client macOS requirement as well as the game requirements.

- Start with a short task title and the search input. No manifesto, methodology card, self-promotion, or separate anchor-button detour before search.
- State each game's decision once. Use neutral labels such as Route and Conditions, not “our conclusion” or instructions on how to read the page. Put alternatives behind a native collapsed disclosure.
- Unavailable features have no primary navigation entry. The library URL shows availability and a search link, not simulated account states or an implementation roadmap.
- Player entry points show our synthesis, not original posts, author names, source ratings, field gaps, or numerical compatibility/confidence scores.
- Keep known cost, version, display-mode and single-player restrictions when they change the action. Do not hide a material failure to make a recommendation sound stronger.
- Keep one small, folded explanation of what the catalog covers. Do not repeat disclaimers throughout the page.
- Tool/store links are actions, not evidence-reading assignments.
- Remove the home-page profile mockup until selections actually influence the result.

## Internal evidence remains intact

Original observations, provenance, uncertainty, and scoring replay remain in the repository for audit. This change creates no new test results and does not increase evidence confidence. The older report components are no longer routed into player pages; their data and tests remain available internally.

`src/data/recommendations.ts` is an explicit reviewed support list. `basisIds` resolve to existing research replay evidence IDs, runtime report IDs, or `store:<appId>:<review date>` snapshots in `src/data/gamePurchaseFacts.ts`, `docs/research/homepage-native-picks.md`, and `docs/research/homepage-crossover-picks.md`. The Mac-edition research records `steam:macos-client:2026-09-05` and `factorio:fff-371`; the CrossOver research records `codeweavers:<appId>:2026-09-05`. Sources remain internal; no source URL is required in the player-facing copy.

Current editorial choices: Noita and Portal 2 prefer CrossOver; Witcher 3, Sekiro, Ori and Elden Ring require the listed conditions. These are editorial inferences from the already reviewed corpus, not fresh or independently verified gameplay claims. A positive aggregate supports considering a route, not claiming every feature works. Unlisted alternative routes stay outside the supported Steam catalog; the historical Noita GOG recipe does not admit a Steam/Porting Kit entry.

Before adding a route: require game/store-specific support information, review material restrictions, record the decision and evidence references, and test that adjacent runners/stores do not inherit it. Before promoting a conditional route: resolve the condition that drove that decision. Do not automatically promote a route by counting anecdotes or hiding unknown fields.
