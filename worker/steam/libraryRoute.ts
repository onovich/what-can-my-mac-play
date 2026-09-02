import {
  JsonBodyError,
  jsonResponse,
  readBoundedJson,
  type FetchLike,
} from '../http'
import { getSteamOwnedGames, SteamOwnedGamesError } from './getOwnedGames'

const MAX_REQUEST_BODY_BYTES = 1_024
const RATE_LIMIT_PERIOD_SECONDS = 60
const ROUTE_RATE_LIMIT_KEY = 'steam-library'

type RateLimitCheck = (key: string) => Promise<boolean>

interface SteamLibraryBindings {
  apiKey: string | undefined
  enabled: boolean
  rateLimits: {
    route: RateLimitCheck
    user: RateLimitCheck
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseSteamId(value: unknown): string | null {
  if (!isRecord(value) || Object.keys(value).length !== 1) return null
  const steamId = value.steamId
  return typeof steamId === 'string' && /^\d{17}$/.test(steamId)
    ? steamId
    : null
}

function isJsonRequest(request: Request): boolean {
  const contentType = request.headers.get('content-type')
  return contentType?.split(';', 1)[0]?.trim().toLowerCase() === 'application/json'
}

function errorStatus(error: SteamOwnedGamesError): number {
  return error.code === 'timeout' ? 504 : 502
}

async function hashedSteamId(steamId: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(steamId),
  )
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('')
}

function rateLimitResponse(requestId: string): Response {
  return jsonResponse(
    { error: { code: 'rate_limit_exceeded', requestId } },
    429,
    requestId,
    'no-store',
    { 'Retry-After': String(RATE_LIMIT_PERIOD_SECONDS) },
  )
}

async function enforceRateLimits(
  steamId: string,
  rateLimits: SteamLibraryBindings['rateLimits'],
  requestId: string,
): Promise<Response | null> {
  try {
    if (!(await rateLimits.route(ROUTE_RATE_LIMIT_KEY))) {
      console.warn(
        JSON.stringify({
          event: 'steam_library_rate_limited',
          requestId,
          scope: 'route',
        }),
      )
      return rateLimitResponse(requestId)
    }

    const userKey = await hashedSteamId(steamId)
    if (!(await rateLimits.user(userKey))) {
      console.warn(
        JSON.stringify({
          event: 'steam_library_rate_limited',
          requestId,
          scope: 'user',
        }),
      )
      return rateLimitResponse(requestId)
    }
    return null
  } catch {
    console.error(
      JSON.stringify({
        event: 'steam_library_rate_limit_failed',
        requestId,
      }),
    )
    return jsonResponse(
      { error: { code: 'rate_limit_unavailable', requestId } },
      503,
      requestId,
    )
  }
}

export async function handleSteamLibraryRequest(
  request: Request,
  bindings: SteamLibraryBindings,
  requestId: string,
  fetcher: FetchLike = fetch,
): Promise<Response> {
  if (request.method !== 'POST') {
    return jsonResponse(
      { error: { code: 'method_not_allowed', requestId } },
      405,
      requestId,
    )
  }
  if (!bindings.enabled) {
    return jsonResponse(
      { error: { code: 'steam_library_not_enabled', requestId } },
      503,
      requestId,
    )
  }
  if (!bindings.apiKey) {
    return jsonResponse(
      { error: { code: 'steam_not_configured', requestId } },
      503,
      requestId,
    )
  }
  if (!isJsonRequest(request)) {
    return jsonResponse(
      { error: { code: 'unsupported_media_type', requestId } },
      415,
      requestId,
    )
  }

  let body: unknown
  try {
    body = await readBoundedJson(
      request.body,
      request.headers.get('content-length'),
      MAX_REQUEST_BODY_BYTES,
    )
  } catch (error) {
    const code =
      error instanceof JsonBodyError && error.code === 'too_large'
        ? 'request_body_too_large'
        : 'invalid_json'
    return jsonResponse(
      { error: { code, requestId } },
      code === 'request_body_too_large' ? 413 : 400,
      requestId,
    )
  }

  const steamId = parseSteamId(body)
  if (steamId === null) {
    return jsonResponse(
      { error: { code: 'invalid_steam_id', requestId } },
      400,
      requestId,
    )
  }

  const limitedResponse = await enforceRateLimits(
    steamId,
    bindings.rateLimits,
    requestId,
  )
  if (limitedResponse !== null) return limitedResponse

  try {
    const result = await getSteamOwnedGames(bindings.apiKey, steamId, fetcher)
    return jsonResponse(
      {
        ...result,
        source: {
          id: 'steam-iplayer-getownedgames',
          attribution: 'Steam',
        },
        fetchedAt: new Date().toISOString(),
      },
      200,
      requestId,
    )
  } catch (error) {
    const upstreamError =
      error instanceof SteamOwnedGamesError
        ? error
        : new SteamOwnedGamesError('unavailable')
    console.error(
      JSON.stringify({
        event: 'steam_owned_games_failed',
        requestId,
        code: upstreamError.code,
        upstreamStatus: upstreamError.upstreamStatus,
      }),
    )
    return jsonResponse(
      { error: { code: 'steam_library_upstream_failed', requestId } },
      errorStatus(upstreamError),
      requestId,
    )
  }
}
