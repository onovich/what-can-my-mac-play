# Decision-first player experience

Adopted: 2026-09-04, following the product owner's direction.

## Player contract

The product makes an editorial decision instead of assigning research to the player. Show one preferred route, a direct action, and at most two material conditions. The three route statuses are recommended, use with conditions, and not supported in the current catalog.

“Not supported” is a closed support-list policy: a game/runner pair without an admitted entry receives no endorsement. It is not an empirical claim that running the game is technically impossible. Do not turn absence of evidence into a fabricated failed test.

Positive route recommendations are choices among running methods, not unconditional purchase approvals or promises for every Mac. Purchase-specific exclusions must be direct: for example, do not buy Elden Ring for Mac multiplayer. A newer release, different store, different runner or different architecture does not automatically inherit support.

## Presentation

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

`src/data/recommendations.ts` is an explicit reviewed support list. `basisIds` resolve to existing research replay evidence IDs, runtime report IDs, or `store:<appId>:<review date>` snapshots in `src/data/gamePurchaseFacts.ts`. Sources remain in the referenced records and research documents. No source URL is required in the player-facing copy.

Current editorial choices: Noita and Portal 2 prefer CrossOver; Witcher 3, Sekiro, Ori and Elden Ring require the listed conditions. These are editorial inferences from the already reviewed corpus, not fresh or independently verified gameplay claims. A positive aggregate supports considering a route, not claiming every feature works. Unlisted alternative routes stay outside the supported Steam catalog; the historical Noita GOG recipe does not admit a Steam/Porting Kit entry.

Before adding a route: require game/store-specific support information, review material restrictions, record the decision and evidence references, and test that adjacent runners/stores do not inherit it. Before promoting a conditional route: resolve the condition that drove that decision. Do not automatically promote a route by counting anecdotes or hiding unknown fields.
