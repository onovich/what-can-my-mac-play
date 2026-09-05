# Mac-edition fallback catalog research

Reviewed: 2026-09-05. Scope: official Steam Mac editions retained as searchable fallback data. **Balatro, Factorio, Hades II and Stardew Valley** are not homepage selections. The homepage instead features supported Windows games described in [CrossOver picks](homepage-crossover-picks.md). The complete searchable catalog currently contains twelve games. These records summarize published support, not device testing or a frame-rate ranking.

## Shared decision

Use `native` as the **Mac edition route**, not as a claim that every executable is ARM-native. None of these routes needs a paid Windows compatibility tool. The game purchase is separate; no current regional price is embedded.

Product rule: a Mac edition listed on the Steam store establishes Mac-edition support; without that listing, the Steam Mac-edition route is not supported. CPU architecture is a separate condition. An unspecified architecture does not exclude an officially listed Mac edition from the searchable catalog.

For all Steam routes below, show **macOS 12 or later**. Valve ended macOS 11 support on 2025-10-15, and states that subsequent clients require macOS 12+. Older game-only minimum versions are insufficient for the complete Steam workflow. [Valve support](https://help.steampowered.com/en/faqs/view/659D-A19E-018A-81A6)

Intel Mac apps can use Rosetta on Apple silicon. Do not equate “official Mac edition” with “Apple silicon native”; where the publisher has not specified architecture, do not invent it. [Apple support](https://support.apple.com/en-us/102527)

## Balatro — appId 2379780

- Basis: [publisher Steam listing](https://store.steampowered.com/app/2379780/Balatro/).
- Mac support: explicitly lists Intel and Apple silicon processors. This confirms support for both families, not the binary architecture.
- Published Mac requirements: macOS 11+, CPU either Intel or Apple silicon, memory 1 GB, storage 150 MB. The graphics field separately says **4 GB RAM**; preserve this inconsistency internally rather than interpreting it as 4 GB VRAM. For concise player guidance, use macOS 12+ and 4 GB RAM, without calling the latter an unambiguous publisher minimum.
- Supports single-player. Card combinations and repeatable deck-building runs give the recommendation a concrete gameplay reason.
- Catalog zh: **单人卡牌构筑，直接安装 Mac 版。**
- Catalog en: **Single-player deck-building with a Mac edition.**
- Detail zh: **购买 Steam 版，在 Mac 上直接安装。** Conditions: **macOS 12 或更新版本；Intel 和 Apple 芯片均受支持。** **建议至少 4 GB 内存；无需购买 CrossOver。**
- Detail en: **Buy the Steam edition and install it on your Mac.** Conditions: **macOS 12 or later; Intel and Apple silicon are supported.** **Use at least 4 GB RAM; no CrossOver purchase is needed.**

## Factorio — appId 427520

- Basis: [publisher Steam listing](https://store.steampowered.com/app/427520/Factorio/), [developer Apple silicon announcement](https://www.factorio.com/blog/post/fff-371).
- Native Intel and Apple silicon binaries confirmed by developer, with Apple silicon support introduced in 1.1.71.
- Published Mac minimum: OS X 10.10, 2016 Mac, 8 GB memory, 5 GB storage; normal sprites, low compression quality, 1080p. Recommended: 2020 Apple silicon, 16 GB memory, 10 GB storage; high sprites/compression quality. Steam route still requires macOS 12+.
- Official 2.1 experimental announcement raises game-only macOS minimum to 10.13. This is compatible with the stricter Steam gate; do not claim the older 10.10 entry applies to every branch. [Developer 2.1 announcement](https://www.factorio.com/blog/post/fff-444)
- Single-player automation/factory building; free demo is offered on Steam. Recommend trying the demo as a useful purchase action. Scope is the base game, not a promise about Space Age, arbitrary mods or enormous factories.
- Catalog zh: **建造自动化工厂，支持 Mac，可先试玩。**
- Catalog en: **Build automated factories on Mac; a demo is available.**
- Detail zh: **先试玩，再决定是否购买。** Conditions: **macOS 12 或更新版本，至少 8 GB 内存；推荐 Apple 芯片和 16 GB 内存。** **直接安装 Mac 版，无需 CrossOver。**
- Detail en: **Try the demo before buying.** Conditions: **macOS 12 or later and at least 8 GB RAM; Apple silicon and 16 GB RAM are recommended.** **Install the Mac edition; no CrossOver is needed.**

## Searchable catalog: Stardew Valley — appId 413150

- Basis: [publisher Steam listing](https://store.steampowered.com/app/413150/Stardew_Valley/), [developer compatibility guide](https://www.stardewvalley.net/compatibility/).
- Official Mac edition and single-player support confirmed. CPU architecture is not specified in this listing: do not claim ARM-native or universal binary support.
- Published Mac requirements: OS X 10.10+, 2 GHz CPU, 2 GB RAM, 256 MB graphics memory with OpenGL 2, 500 MB storage. Developer explains systems at macOS 10.12 or earlier need a compatibility branch. For the normal Steam purchase route, use macOS 12+ and the standard game branch.
- Farming, fishing and town-life progression make this a distinct quieter single-player option. Co-op exists officially, but is unnecessary to justify this catalog entry; no mod compatibility promise.
- Catalog zh: **种田、钓鱼、经营农场，提供 Mac 版。**
- Catalog en: **Farm, fish and build a country life with the Mac edition.**
- Detail zh: **购买 Steam 版，安装 Mac 版开始经营农场。** Conditions: **macOS 12 或更新版本，至少 2 GB 内存。** **使用官方 Mac 版，无需 CrossOver。**
- Detail en: **Buy the Steam edition and install the Mac version.** Conditions: **macOS 12 or later and at least 2 GB RAM.** **Use the official Mac edition; no CrossOver is needed.**
- Architecture fact: the reviewed official sources do not explicitly identify Apple silicon support or a binary architecture. Do not turn Apple's general Rosetta explanation into game-specific support evidence, or claim Intel-only support. The Steam Mac listing is sufficient to include this supported Mac-edition route in the searchable catalog.

## Implementation boundaries

All four Mac editions are searchable fallback entries, with no homepage featured flag. Balatro and Factorio support both CPU families; Hades II requires Apple silicon. Do not label them “best-performing”, guarantee every Mac, infer frame rates, or transfer support to another storefront. Preserve CPU/RAM/storage information internally and display the decisive conditions in details. Keep source links in research records rather than asking players to read source discussions.

## Hades II — appId 1145350

[Publisher Steam listing](https://store.steampowered.com/app/1145350/Hades_II/) explicitly supports the Mac edition on Apple processors only: macOS 12+, Apple M1, 8 GB memory, 11 GB storage. Recommended: macOS 15, M1 Pro, 16 GB memory, same storage. This searchable Mac-edition entry requires Apple silicon; do not show it as Intel-compatible. No extra paid compatibility tool is needed.

Suggested catalog copy: **动作闯关，支持 M1 及更新 Apple 芯片。** / **Action roguelike for M1 and newer Apple silicon Macs.** Detail conditions should retain macOS 12+, 8 GB RAM and 11 GB storage.
