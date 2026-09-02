import { JsonBodyError, readBoundedJson, type FetchLike } from '../http'

const STEAM_GET_OWNED_GAMES_URL =
  'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/'
const UPSTREAM_TIMEOUT_MS = 8_000
const MAX_UPSTREAM_BODY_BYTES = 4 * 1024 * 1024

export interface SteamOwnedGame {
  steamAppId: number
  playtimeMinutes: number
  playtimeMacMinutes?: number
  playtimeTwoWeeksMinutes?: number
  lastPlayedAt?: number
}

export type SteamOwnedGamesResult =
  | { status: 'public'; gameCount: number; games: SteamOwnedGame[] }
  | { status: 'empty'; gameCount: 0; games: [] }
  | { status: 'unavailable'; reason: 'private_or_invalid' }

export class SteamOwnedGamesError extends Error {
  constructor(
    readonly code: 'bad_status' | 'invalid_response' | 'timeout' | 'unavailable',
    readonly upstreamStatus?: number,
  ) {
    super(`Steam Owned Games request failed: ${code}`)
    this.name = 'SteamOwnedGamesError'
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function requiredNonNegativeInteger(
  record: Record<string, unknown>,
  key: string,
): number | null {
  const value = record[key]
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0
    ? value
    : null
}

function optionalNonNegativeInteger(
  record: Record<string, unknown>,
  key: string,
): number | undefined | null {
  if (!(key in record)) return undefined
  return requiredNonNegativeInteger(record, key)
}

function parseGame(value: unknown): SteamOwnedGame | null {
  if (!isRecord(value)) return null
  const steamAppId = requiredNonNegativeInteger(value, 'appid')
  const playtimeMinutes = requiredNonNegativeInteger(value, 'playtime_forever')
  if (steamAppId === null || steamAppId === 0 || playtimeMinutes === null) {
    return null
  }

  const playtimeMacMinutes = optionalNonNegativeInteger(
    value,
    'playtime_mac_forever',
  )
  const playtimeTwoWeeksMinutes = optionalNonNegativeInteger(
    value,
    'playtime_2weeks',
  )
  const lastPlayedAt = optionalNonNegativeInteger(value, 'rtime_last_played')
  if (
    playtimeMacMinutes === null ||
    playtimeTwoWeeksMinutes === null ||
    lastPlayedAt === null
  ) {
    return null
  }

  const game: SteamOwnedGame = { steamAppId, playtimeMinutes }
  if (playtimeMacMinutes !== undefined) {
    game.playtimeMacMinutes = playtimeMacMinutes
  }
  if (playtimeTwoWeeksMinutes !== undefined) {
    game.playtimeTwoWeeksMinutes = playtimeTwoWeeksMinutes
  }
  if (lastPlayedAt !== undefined) game.lastPlayedAt = lastPlayedAt
  return game
}

function parseOwnedGames(value: unknown): SteamOwnedGamesResult {
  if (!isRecord(value) || !isRecord(value.response)) {
    throw new SteamOwnedGamesError('invalid_response')
  }

  const response = value.response
  if (!('game_count' in response) && !('games' in response)) {
    return { status: 'unavailable', reason: 'private_or_invalid' }
  }

  const gameCount = requiredNonNegativeInteger(response, 'game_count')
  if (gameCount === null || !Array.isArray(response.games)) {
    throw new SteamOwnedGamesError('invalid_response')
  }

  const parsedGames = response.games.map(parseGame)
  if (parsedGames.some((game) => game === null)) {
    throw new SteamOwnedGamesError('invalid_response')
  }
  const games = parsedGames.filter((game): game is SteamOwnedGame => game !== null)

  if (gameCount !== games.length) {
    throw new SteamOwnedGamesError('invalid_response')
  }
  if (gameCount === 0) return { status: 'empty', gameCount: 0, games: [] }
  return { status: 'public', gameCount, games }
}

export async function getSteamOwnedGames(
  apiKey: string,
  steamId: string,
  fetcher: FetchLike = fetch,
): Promise<SteamOwnedGamesResult> {
  const url = new URL(STEAM_GET_OWNED_GAMES_URL)
  url.searchParams.set('key', apiKey)
  url.searchParams.set('steamid', steamId)
  url.searchParams.set('include_appinfo', 'false')
  url.searchParams.set('include_played_free_games', 'true')
  url.searchParams.set('format', 'json')

  let response: Response
  try {
    response = await fetcher(url, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      throw new SteamOwnedGamesError('timeout')
    }
    throw new SteamOwnedGamesError('unavailable')
  }

  if (!response.ok) {
    throw new SteamOwnedGamesError('bad_status', response.status)
  }

  let payload: unknown
  try {
    payload = await readBoundedJson(
      response.body,
      response.headers.get('content-length'),
      MAX_UPSTREAM_BODY_BYTES,
    )
  } catch (error) {
    if (error instanceof JsonBodyError) {
      throw new SteamOwnedGamesError('invalid_response')
    }
    throw error
  }
  return parseOwnedGames(payload)
}
