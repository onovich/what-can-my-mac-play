const STEAM_GET_APP_LIST_URL =
  'https://api.steampowered.com/IStoreService/GetAppList/v1/'

const UPSTREAM_TIMEOUT_MS = 8_000

export interface SteamAppListQuery {
  lastAppId?: number
  maxResults: number
  ifModifiedSince?: number
}

export interface SteamCatalogApp {
  steamAppId: number
  title: string
  lastModified?: number
  priceChangeNumber?: number
}

export interface SteamAppListPage {
  apps: SteamCatalogApp[]
  page: {
    hasMore: boolean
    nextLastAppId?: number
  }
}

export class SteamUpstreamError extends Error {
  constructor(
    readonly code: 'bad_status' | 'invalid_response' | 'timeout' | 'unavailable',
    readonly upstreamStatus?: number,
  ) {
    super(`Steam App List request failed: ${code}`)
    this.name = 'SteamUpstreamError'
  }
}

type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function optionalInteger(
  record: Record<string, unknown>,
  key: string,
): number | undefined {
  const value = record[key]
  return Number.isSafeInteger(value) && typeof value === 'number'
    ? value
    : undefined
}

function parseApp(value: unknown): SteamCatalogApp | null {
  if (!isRecord(value)) return null

  const appId = value.appid
  const title = value.name
  if (!Number.isSafeInteger(appId) || typeof appId !== 'number') return null
  if (typeof title !== 'string' || title.trim() === '') return null

  const app: SteamCatalogApp = {
    steamAppId: appId,
    title: title.trim(),
  }
  const lastModified = optionalInteger(value, 'last_modified')
  const priceChangeNumber = optionalInteger(value, 'price_change_number')
  if (lastModified !== undefined) app.lastModified = lastModified
  if (priceChangeNumber !== undefined) app.priceChangeNumber = priceChangeNumber
  return app
}

function parsePage(value: unknown): SteamAppListPage {
  if (!isRecord(value) || !isRecord(value.response)) {
    throw new SteamUpstreamError('invalid_response')
  }

  const rawApps = value.response.apps
  if (!Array.isArray(rawApps)) {
    throw new SteamUpstreamError('invalid_response')
  }

  const apps = rawApps.map(parseApp)
  if (apps.some((app) => app === null)) {
    throw new SteamUpstreamError('invalid_response')
  }

  const page: SteamAppListPage['page'] = {
    hasMore: value.response.have_more_results === true,
  }
  const nextLastAppId = optionalInteger(value.response, 'last_appid')
  if (nextLastAppId !== undefined) page.nextLastAppId = nextLastAppId

  return {
    apps: apps.filter((app): app is SteamCatalogApp => app !== null),
    page,
  }
}

export async function getSteamAppList(
  apiKey: string,
  query: SteamAppListQuery,
  fetcher: FetchLike = fetch,
): Promise<SteamAppListPage> {
  const url = new URL(STEAM_GET_APP_LIST_URL)
  url.searchParams.set('key', apiKey)
  url.searchParams.set('max_results', String(query.maxResults))
  if (query.lastAppId !== undefined) {
    url.searchParams.set('last_appid', String(query.lastAppId))
  }
  if (query.ifModifiedSince !== undefined) {
    url.searchParams.set(
      'if_modified_since',
      String(query.ifModifiedSince),
    )
  }

  let response: Response
  try {
    response = await fetcher(url, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      throw new SteamUpstreamError('timeout')
    }
    throw new SteamUpstreamError('unavailable')
  }

  if (!response.ok) {
    throw new SteamUpstreamError('bad_status', response.status)
  }

  let payload: unknown
  try {
    payload = await response.json()
  } catch {
    throw new SteamUpstreamError('invalid_response')
  }
  return parsePage(payload)
}
