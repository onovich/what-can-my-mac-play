# Non-VM purchase-decision research

Checked: 2026-09-04 (Asia/Shanghai). Scope: local Mac gaming; exclude virtual machines, cloud gaming, and remote streaming. This report researches runtime products, not the compatibility of any individual game. Inclusion decisions below are project judgments, not vendor guarantees.

## MVP decision

Prioritize a pre-purchase check for a named game and Mac configuration. Preserve Steam library analysis as a later reuse of the same evidence. Model multiple non-VM solutions, but never transfer a CrossOver result to another Wine-based product. Show unverified alternatives as **not yet verified**, not playable, broken, or purchase-ready.

| Solution | Verified facts and cost category | MVP treatment |
| --- | --- | --- |
| Native macOS / Apple silicon | Apple distinguishes Intel, Universal, and Apple silicon applications; Universal/Apple silicon builds do not ordinarily require Rosetta. Game purchase cost remains separate. [Apple application architecture guide](https://support.apple.com/en-ca/102527) | First-class route, only when the exact store/build and requirements are evidenced. A macOS store badge alone is not a performance test. |
| Intel macOS via Rosetta 2 | Rosetta translates Intel applications on Apple silicon; it is not a standalone Windows compatibility solution. Apple currently promises general availability through macOS 27, with functionality restricted to certain older games from macOS 28. [Apple Rosetta support](https://support.apple.com/en-ca/102527) | First-class route distinct from native Apple silicon. Record macOS and architecture; do not promise indefinite future availability. |
| CrossOver | Commercial Windows compatibility product, no Windows installation/license required, with a free two-week trial. The product page has current macOS/version requirements. [CodeWeavers](https://www.codeweavers.com/crossover) | First-class consumer route; paid-tool badge and official trial link. Match evidence to CrossOver version and backend. No exact price hardcoded. |
| Porting Kit | Free app with game-specific installation recipes and store-specific sources. Its guide warns that custom ports may not work and requires owning the corresponding store edition. [Official installation guide](https://www.paulthetall.com/portingkit-2/) | First-class alternative in the solution catalog. A game needs its own Porting Kit evidence before a recommendation. |
| Wine (manual/custom) | Wine is a Windows API compatibility layer for systems including macOS, not a virtual machine. WineHQ shows current stable/development releases. [WineHQ](https://www.winehq.org/) | Advanced/manual category, not a single reproducible consumer configuration. Require distribution, engine version, configuration, and backend. |
| Sikarugir | Current Wineskin successor; live README requires macOS 14+, Rosetta on Apple silicon, and explicitly says it is not a replacement for CrossOver or Whisky. Public installation route is documented; no paid checkout is shown. Some components have different licenses. [Official repository](https://github.com/Sikarugir-App/Sikarugir) | Advanced wrapper candidate, not a blanket recommended replacement. Cost label should be “check project” unless free-use terms are separately verified. Link only official GitHub, not the unaffiliated lookalike domain warned about by maintainers. |
| Whisky | Repository archived May 11, 2025; maintainer says no active maintenance or further WhiskyWine/game fixes. [Repository](https://github.com/Whisky-App/Whisky), [maintenance notice](https://docs.getwhisky.app/maintenance-notice.html) | Historical evidence only; prominently mark unmaintained and exclude from default new-purchase recommendations. Do not recommend freezing an outdated Steam client. |
| Wineskin / older wrapper names | The Wineskin project explicitly says it is unmaintained and recommends transitioning to Sikarugir. [Project notice](https://github.com/The-Wineskin-Project) | Preserve historical names in evidence; do not market old Wineskin/Kegworks labels as verified current products. Resolve exact lineage/version before migration. |
| Apple Game Porting Toolkit | Apple's live page now describes GPTK 4 and a Windows-game evaluation environment for developer porting, profiling, and shader validation. Download links lead to Apple Developer resources. [Apple toolkit](https://developer.apple.com/games/game-porting-toolkit/) | Developer/evaluation category, not a turnkey consumer recommendation or native port. Link to Apple; do not bundle or redistribute its binaries. A free download is not evidence of unrestricted redistribution rights. |

Porting Kit has recent maintenance evidence: its official publisher lists wrapper/game updates in July and August 2026. This supports an active-project classification, not compatibility for every game. [Publisher update feed](https://www.paulthetall.com/)

## Runtime product is not graphics backend

Keep `solution` and `graphicsBackend` separate. CrossOver exposes backend choices including Auto, D3DMetal, DXVK, DXMT, and Wine/wined3d. Auto is a selection policy, not proof of the backend actually used. [CodeWeavers backend settings](https://support.codeweavers.com/en_US/advanced-settings-in-crossover-mac)

- D3DMetal: Apple's graphics API translation layer, supporting DirectX 11/12 within the documented CrossOver integration. It is a component of the evaluation technology, not another name for the entire toolkit. [CodeWeavers backend settings](https://support.codeweavers.com/en_US/advanced-settings-in-crossover-mac)
- DXMT: Direct3D 10/11-to-Metal implementation for macOS/Wine; exact supported functionality still depends on version. [Upstream DXMT](https://github.com/3Shain/dxmt)
- DXVK: Vulkan-based Direct3D implementation. Upstream describes Linux/Wine, while CrossOver documents its own integration. Do not import Linux DXVK/Proton compatibility results as Mac evidence. [Upstream DXVK](https://github.com/doitsujin/dxvk), [CrossOver integration](https://support.codeweavers.com/en_US/advanced-settings-in-crossover-mac)
- Wine/wined3d: Wine's Direct3D implementation; not a separate user-facing storefront/runtime product. [CodeWeavers backend settings](https://support.codeweavers.com/en_US/advanced-settings-in-crossover-mac)

## Evidence and purchase-readiness rules

These are proposed project rules, motivated by the version/backend choices above and Porting Kit's store-specific recipes:

1. Record game/store/build, Mac chip and memory, macOS version, runtime product/version, engine/version where relevant, backend/version, tested date, settings, and source URL. Missing values remain explicitly unknown.
2. Keep “runtime maintained,” “game launches,” “playable performance,” “required features work,” and “sufficient evidence to buy” separate. No blanket guarantee follows from any one flag.
3. Storefront edition matters: a GOG recipe does not validate Steam DRM/launcher behavior. DLC, multiplayer, anti-cheat, controllers, and saves require specific evidence; absence of a report is not proof of support.
4. Display additional tool cost, setup effort, known limitations, evidence age, and configuration mismatch before a store link. A trial is useful but is not a refund guarantee for a separately purchased game.
5. An untested alternative must not inherit FPS, score, recommended status, or purchase confidence from CrossOver. Keep existing results attached to their actual solution.
6. VM reports may remain in historical source material but must not contribute to ranking, recommendations, or local non-VM purchase decisions. Cloud/remote routes are also out of scope.

## Research limits and refresh triggers

No runtime was installed and no game was tested in this research. No compatibility claims or FPS measurements were produced. Exact prices, promotions, redistribution terms, and download account requirements were not audited; link to the official provider instead of hardcoding them. WineHQ direct opening returned 403, but its primary-domain search result provided the layer definition and release listing. Apple and Sikarugir search snippets were older than their live pages; the live pages govern this report. Recheck maintenance, requirements, and official links before adding a new recommendation or after major runtime/macOS releases.
