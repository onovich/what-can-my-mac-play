# Steam App List connector

The Worker endpoint `GET /api/steam/apps` is the server-side boundary for
Steam's documented `IStoreService/GetAppList` method. It exposes only the
catalogue fields approved in `sources.yml`; the Steam Web API key is never sent
to the browser or stored in this repository.

Supported query parameters:

- `maxResults`: 1–1,000; defaults to 250.
- `lastAppId`: non-negative Steam App ID used for pagination.
- `ifModifiedSince`: non-negative Unix timestamp used for incremental sync.

Local setup:

1. Copy `.dev.vars.example` to `.dev.vars`.
2. Put a development Steam Web API key in `.dev.vars`.
3. Run `pnpm dev:worker`.

Production setup:

```sh
pnpm wrangler secret put STEAM_WEB_API_KEY
```

Enter the key only in Wrangler's interactive secret prompt. Before the secret
exists, the endpoint deliberately returns HTTP 503 with
`steam_not_configured`; the static site remains available.

The connector has an eight-second upstream timeout, bounds page size, rejects
malformed upstream data, emits structured error logs without URLs or secrets,
and caches successful public catalogue responses for five minutes in browsers
and one hour at shared caches.
