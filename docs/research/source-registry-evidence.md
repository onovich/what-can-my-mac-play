# Source Registry Evidence

Audit date: 2026-09-03

This note records the official or first-party evidence used to decide which upstream sources the MVP may ingest. It is an engineering risk assessment, not legal advice. A public endpoint, an open-source client, or a permissive `robots.txt` file is not by itself a license to republish a database.

## Decision summary

| Source | MVP decision | Permitted MVP use | Blocked or conditional use |
| --- | --- | --- | --- |
| Steam Web API: `IStoreService/GetAppList` | Approved with conditions | Retrieve public app identifiers/names through the documented API using a protected API key; keep attribution, privacy, and call-limit controls | Do not expose the key, imply Valve endorsement, or exceed the terms; re-check terms periodically |
| Steam Web API: `IPlayerService/GetOwnedGames` | Approved with conditions; production disabled | Process a SteamID64 only after an explicit user request and return the minimum owned-game/playtime fields without storage | Keep disabled until rate limiting and public/private/empty live-account tests are complete; never log SteamID64 or retain raw responses |
| Steam Store `appreviews` | Hold for automated ingestion | Link to Steam review pages; manually inspect a small validation sample without copying review text | No official endpoint documentation or separate redistribution grant was located; obtain Valve clarification before scheduled collection or republication |
| CodeWeavers Compatibility Center | Reference-only pending permission | Link to individual compatibility pages and record a small number of manually reviewed, attributed observations | Do not bulk crawl, mirror ratings, or treat the site as an API until CodeWeavers grants permission |
| AppleGamingWiki | Conditional, non-commercial/share-alike only | Cite and adapt individual wiki facts with attribution under CC BY-NC-SA, while keeping provenance and the same-license obligation in scope | Its API lives under a robots-disallowed path and the license is non-commercial; no automated ingestion for this project without written clarification and a licensing review |
| MacGamingDB | Reference-only pending permission | Link to individual reports and use the public project code as MIT-licensed software if desired | MIT covers the software, not clearly the community-submitted database; do not ingest its REST data until the operator confirms data rights and automation policy |
| DoesItARM | Approved for attributed verdict facts; API not yet live | Reuse individual verdict facts under CC BY 4.0 with attribution and `lastVerified`; current repository list is also explicitly licensed | Do not build against the preview API until launch; bulk/export and redistribution capabilities are described as paid/gated |
| Does It Mac | Citation-only; bulk access pending license | Cite/share individual compatibility records with a backlink and date | API is “Coming Soon”; bulk structured use is offered as data/API licensing and `/api/` is robots-disallowed, so contact the operator first |

## Steam / Valve

### Documented app catalogue

- Valve documents `IStoreService/GetAppList` as returning apps available on the Steam Store. It supports type filters, pagination using `last_appid`, a maximum page size of 50,000, and incremental retrieval via `if_modified_since`. The method requires “any web API key.” [Valve: IStoreService/GetAppList](https://partner.steamgames.com/doc/webapi/IStoreService#GetAppList)
- The older `ISteamApps/GetAppList/v2` endpoint is explicitly deprecated because it no longer scales; Valve directs clients to `IStoreService/GetAppList`. It must not be the production source. [Valve: ISteamApps/GetAppList](https://partner.steamgames.com/doc/webapi/ISteamApps#GetAppList)
- Valve distinguishes public methods from protected methods and says Web API requests should use TLS where possible. Web API keys are required for some methods and must be handled by trusted back ends where protected data is involved. [Valve: Web API overview](https://partner.steamgames.com/doc/webapi_overview)

### Governing API terms

Valve's Steam Web API Terms provide the relevant license for Steam Web API data, with material constraints:

- Steam Data may be presented to end users through the application identified in the API-key signup, subject to the API documentation and terms.
- The application must publish a privacy policy when using non-public end-user data, explain stored Steam Data, and only retrieve a user's data when the user requests it.
- The API key must remain confidential; the implementation must not appear endorsed by or affiliated with Valve; Steam Data must be supplied on an “as is” basis with appropriate disclaimers.
- The published limit is 100,000 calls per day, Valve may change or terminate access, and all rights not expressly granted are reserved.

Source: [Steam Web API Terms of Use](https://steamcommunity.com/dev/apiterms). Valve's separate [privacy policy](https://store.steampowered.com/privacy_agreement/) governs Valve's own handling of personal data; it does not replace the MVP's required privacy notice.

**Registry implication:** allow only the documented `IStoreService/GetAppList` fields needed for canonical identity and freshness (`appid`, name, item type, `last_modified`, and `price_change_number` if used). Keep the key server-side, identify this site consistently when registering it, display source attribution, and implement a hard daily request budget below Valve's ceiling.

### User-requested owned games

- Valve documents `IPlayerService/GetOwnedGames` as returning games owned by a player only when their owned games and game details are visible to the caller. The request requires an API key and SteamID64 and supports excluding app metadata while including played free games. [Valve: IPlayerService/GetOwnedGames](https://partner.steamgames.com/doc/webapi/IPlayerService#GetOwnedGames)
- The MVP connector therefore requests no app names or icons, returns only identifiers and selected playtime timestamps, applies `no-store`, and treats an empty response object as private or otherwise unavailable rather than as a transport failure.

**Registry implication:** production access stays behind `STEAM_LIBRARY_LOOKUP_ENABLED=false` until a per-user/global request budget and live public/private/empty account tests exist. The Worker may process SteamID64 only for the active request; it must not log or persist the identifier or raw Steam response.

### Store review endpoint

- `https://store.steampowered.com/appreviews/{appid}?json=1` currently returns JSON containing aggregate review counts and individual review records. This is an observed Valve-hosted endpoint, but no official Steamworks/Web API reference or endpoint-specific redistribution license was located during this audit. [Observed Valve endpoint (Portal 2 example)](https://store.steampowered.com/appreviews/620?json=1)
- Steam Store's current robots file does not list `/appreviews/` as disallowed. It does disallow several account, email, widget, and token-bearing paths. Absence from `robots.txt` is not affirmative permission to copy or republish reviews. [Steam Store robots.txt](https://store.steampowered.com/robots.txt)

**Registry implication:** mark `appreviews` as `permission_required`. Until Valve confirms acceptable use, do not schedule requests, retain user-authored review text, or republish author/profile fields. For the 50-game validation set, prefer aggregate information obtained through an approved source or treat a manually viewed review page only as discovery evidence linked back to Steam.

## CodeWeavers Compatibility Center

- CodeWeavers describes the Compatibility Center as a database its team tests and updates, supplemented by user rankings and votes. The page exposes application, company, last-updated, platform rating, and community statistics. [CodeWeavers Compatibility Center](https://www.codeweavers.com/compatibility)
- The public footer links a privacy policy and contact form but no general content-reuse or database license. The privacy policy confirms that compatibility ratings may include submitted Mac hardware details and describes how those submissions are used. [CodeWeavers privacy policy](https://www.codeweavers.com/privacy-policy)
- The official robots file allows the general site but sets `Crawl-delay: 100`, blocks several paths, and publishes content signals allowing search while reserving model-training use and limiting AI use to reference. These crawler instructions do not grant permission to mirror the compatibility database. [CodeWeavers robots.txt](https://www.codeweavers.com/robots.txt)
- CodeWeavers provides an official contact form with “General Information” and “Website Comment” categories. [CodeWeavers contact](https://www.codeweavers.com/contact-us)

**Registry implication:** mark as `reference_only`. Allow source URL, observation date, named rating/method, and a short independently written summary for a small manually reviewed sample. Preserve the link and clearly label CodeWeavers/community provenance. Ask CodeWeavers for written permission covering API availability, allowed fields, request rate, caching, display attribution, derivative scoring, and commercial use before automation.

## AppleGamingWiki

- Every inspected article footer states that content is available under “Creative Commons Attribution Non-Commercial Share Alike unless otherwise noted.” [AppleGamingWiki home](https://www.applegamingwiki.com/wiki/Home) and [example game article](https://www.applegamingwiki.com/wiki/Telling_Lies)
- The wiki exposes useful evidence detail such as tester, date, device, macOS, method/version, game version, store, resolution, settings, frame rate, controller, and supporting URL. [AppleGamingWiki Refdevice documentation](https://www.applegamingwiki.com/wiki/Template:Refdevice/Documentation)
- The MediaWiki API is live at `/w/api.php`, but the site's official `robots.txt` disallows `/w/` while allowing only selected static resources below it. It also publishes Cloudflare content signals permitting search/reference while prohibiting AI training. [AppleGamingWiki MediaWiki API](https://www.applegamingwiki.com/w/api.php?action=query&meta=siteinfo&format=json) and [robots.txt](https://www.applegamingwiki.com/robots.txt)

**Registry implication:** the CC BY-NC-SA terms are incompatible with an unqualified commercial or proprietary aggregation plan. Even for a non-commercial MVP, attribution and share-alike obligations must be designed explicitly. Because the API path is crawler-disallowed, mark automated collection `permission_required`; contact the site before using it. In the meantime, use links and individually attributed facts only, without copying prose or images.

## MacGamingDB

- MacGamingDB is a community-driven database of Apple Silicon performance reports. Its first-party repository documents reviews containing FPS, play method, graphics settings, and Mac configuration, and includes a REST API server plus an OpenAPI document. [MacGamingDB repository](https://github.com/neo773/macgamingdb)
- The repository's `openapi.json` describes a REST API at `https://macgamingdb.app/api/rest`, including game, review, Mac configuration, and contributor surfaces. Publishing an OpenAPI contract establishes technical discoverability, not necessarily permission to copy or redistribute all returned records. [MacGamingDB OpenAPI document](https://github.com/neo773/macgamingdb/blob/master/openapi.json)
- The repository is MIT licensed, and the license text expressly applies to “this software and associated documentation files.” It does not expressly license community-submitted database content or grant database rights. [MacGamingDB MIT license](https://github.com/neo773/macgamingdb/blob/master/LICENSE)
- The live site has a privacy policy, while `/terms` returned 404 during this audit. No first-party data license or automation policy was located. [MacGamingDB privacy policy](https://macgamingdb.app/privacy)

**Registry implication:** mark REST ingestion `permission_required`. The project's source code can be reused under MIT with the required notice, but that must not be conflated with rights in user reports. Ask the maintainer to clarify database license, API stability/rate limits, caching, attribution, deletion/correction propagation, commercial use, and whether screenshots or contributor identifiers may be retained.

## DoesItARM

- DoesItARM's first-party repository is an open list of reported Apple Silicon support. It says entries are manually reported or automatically gathered and links the source behind each status. [DoesItARM repository](https://github.com/ThatGuySam/doesitarm)
- Its repository license explicitly says the list in `README.md` is under CC BY 4.0. [DoesItARM list license](https://github.com/ThatGuySam/doesitarm/blob/master/LICENSE)
- Current API documentation labels the API “Preview — documented before it ships” and says no keys are issued yet. It plans anonymous free lookup/search/category reads, free keys for higher limits, and paid access for the change feed, bulk/export, SLA, and a redistribution license. [Authentication](https://docs.doesitarm.com/api/authentication/) and [rate limits](https://docs.doesitarm.com/api/rate-limits/)
- The planned citation policy says individual verdict facts are CC BY 4.0 and should be cited with status/layer, alternative if relevant, and `lastVerified`. It separately describes bulk/export and redistribution capability as gated. [DoesItARM agents and citation](https://docs.doesitarm.com/api/citation/)
- The consumer site's robots file currently allows all paths. [DoesItARM robots.txt](https://doesitarm.com/robots.txt)

**Registry implication:** individual verdict facts and the expressly licensed repository list may be used with clear DoesItARM attribution, source URL, and verification date. Do not depend on the preview API or assume bulk rights; wait for launch and accept the applicable tier/license before automated ingestion.

## Does It Mac

- Does It Mac distinguishes first-party tested, moderated community, and named external evidence, and says sync dates are not human verification dates. [Does It Mac methodology](https://doesitmac.com/about)
- Individual app pages state that compatibility data is free to cite and share and instruct users to link back for current updates. [Example compatibility record](https://doesitmac.com/app/among-us)
- Its terms prohibit bypassing rate limits and scraping at a level that disrupts normal operation; they do not provide a general bulk database license. [Does It Mac terms](https://doesitmac.com/terms)
- The API page is explicitly “Coming Soon.” It shows planned endpoints and advertises a future free tier, but it is not a live API grant. [Does It Mac API](https://doesitmac.com/api)
- The partnership page offers structured compatibility data under “Data and API licensing,” which is strong evidence that bulk structured reuse should be arranged with the operator. [Does It Mac partnerships](https://doesitmac.com/partners)
- The official robots file allows the site generally but disallows `/api/`. [Does It Mac robots.txt](https://doesitmac.com/robots.txt)

**Registry implication:** individual dated citations with backlinks are acceptable under the site's published wording. Mark bulk ingestion `permission_required`; wait for the API or negotiate data/API licensing. Preserve evidence level and date rather than presenting externally sourced records as first-party tests.

## Required follow-ups before expanding ingestion

1. Register a Steam Web API key for the production domain, keep it in server-side secrets, publish the MVP privacy policy and Steam-data disclaimer, and build a request counter below 100,000 calls/day.
2. Ask Valve whether automated use of the Store `appreviews` JSON endpoint and retention/republication of aggregate review fields are allowed for this application. Do not request permission to retain review text unless it is actually necessary.
3. Contact CodeWeavers and AppleGamingWiki before automation; provide the exact fields, cadence, cache lifetime, attribution design, and intended commercial status.
4. Contact MacGamingDB specifically about database rights. Treat its MIT software license and its user-contributed data as separate assets.
5. Use DoesItARM only through currently licensed repository data or individual cited pages until its API exits preview; retain attribution and verification dates.
6. Use Does It Mac only for linked, individual citations until its API launches or a data license is agreed.

## Provenance rules for the MVP

- Store the canonical source URL, retrieval time, upstream evidence date, source evidence class, and license/permission status for every imported observation.
- Never upgrade “community reported” or “named external source” into “first-party tested.”
- Keep raw evidence separate from the derived compatibility score; a source may change without retroactively changing what was observed on a prior date.
- Compatibility and confidence are separate outputs. Multiple low-detail sources may agree while still producing low confidence.
- If permission or licensing status is unknown, fail closed: retain only a link and an internal review note, not copied content.
