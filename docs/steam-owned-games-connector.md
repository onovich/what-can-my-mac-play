# Steam owned-games connector

The Worker route `POST /api/steam/library` is the server-side boundary for
Steam's documented `IPlayerService/GetOwnedGames` method. Production access is
currently disabled by `STEAM_LIBRARY_LOOKUP_ENABLED=false` in `wrangler.jsonc`.
This is intentional: the endpoint must not be enabled until the production API
key, final privacy copy, and live public/private/empty account tests are ready.

When enabled, the route accepts only this JSON body:

```json
{ "steamId": "76561198000000000" }
```

Safety properties:

- accepts only `POST` with `application/json`;
- limits request bodies to 1 KiB and upstream responses to 4 MiB;
- validates SteamID64 as exactly 17 decimal digits;
- keeps `STEAM_WEB_API_KEY` in the Worker secret binding;
- asks Steam for no app names or icons;
- returns only approved AppID and playtime fields;
- never echoes, logs, caches, or stores the SteamID64 or raw Steam response;
- applies a shared 60-request/minute Steam API route limit and a
  5-request/minute per-library limit before calling Steam;
- derives the per-library limiter key with SHA-256, so the raw SteamID64 is not
  passed to the limiter or retained in its counter key;
- serializes all allowed calls for each UTC day through a SQLite-backed Durable
  Object and stops at 80,000 calls, below Valve's published daily ceiling;
- represents public, empty, and private/invalid libraries as explicit states;
- emits structured failure logs containing only request IDs and error classes.

The response always uses `Cache-Control: no-store`. The current `/library`
screen remains a local interaction preview and does not call this route.

These Cloudflare Rate Limiting bindings are short-window, per-location abuse
controls. Their counters are eventually consistent, so they are deliberately
not treated as the hard global accounting needed to stay below Valve's daily
limit. The daily Durable Object is the authoritative global counter; it stores
only the number of consumed calls, never a SteamID64 or response payload.

Before enabling production:

1. Install the production API key with `pnpm wrangler secret put STEAM_WEB_API_KEY`.
2. Verify public, private, invalid, and genuinely empty libraries with approved
   test accounts.
3. Reconfirm that the privacy notice and on-screen consent copy match the exact
   fields and retention behavior.
4. Set `STEAM_LIBRARY_LOOKUP_ENABLED` to `true`, regenerate Worker types, run
   `pnpm check`, and deploy.

References: [Valve GetOwnedGames documentation](https://partner.steamgames.com/doc/webapi/IPlayerService#GetOwnedGames),
[Steam Web API Terms of Use](https://steamcommunity.com/dev/apiterms), and
[Cloudflare Workers Rate Limiting bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).
