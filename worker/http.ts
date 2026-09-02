export type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>

export function jsonResponse(
  body: unknown,
  status: number,
  requestId: string,
  cacheControl = 'no-store',
  additionalHeaders?: HeadersInit,
): Response {
  const headers = new Headers(additionalHeaders)
  headers.set('Cache-Control', cacheControl)
  headers.set('Content-Type', 'application/json; charset=utf-8')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-Request-Id', requestId)

  return Response.json(body, {
    status,
    headers,
  })
}

export class JsonBodyError extends Error {
  constructor(readonly code: 'invalid_json' | 'too_large') {
    super(`JSON body could not be read: ${code}`)
    this.name = 'JsonBodyError'
  }
}

function declaredBodyIsTooLarge(
  contentLength: string | null,
  maximumBytes: number,
): boolean {
  if (contentLength === null || !/^\d+$/.test(contentLength)) return false
  const declaredBytes = Number(contentLength)
  return Number.isSafeInteger(declaredBytes) && declaredBytes > maximumBytes
}

export async function readBoundedJson(
  body: ReadableStream<Uint8Array> | null,
  contentLength: string | null,
  maximumBytes: number,
): Promise<unknown> {
  if (declaredBodyIsTooLarge(contentLength, maximumBytes)) {
    throw new JsonBodyError('too_large')
  }
  if (body === null) throw new JsonBodyError('invalid_json')

  const reader = body.getReader()
  const chunks: Uint8Array[] = []
  let totalBytes = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    totalBytes += value.byteLength
    if (totalBytes > maximumBytes) {
      try {
        await reader.cancel()
      } catch {
        // The size error remains authoritative if stream cancellation fails.
      }
      throw new JsonBodyError('too_large')
    }
    chunks.push(value)
  }

  const bytes = new Uint8Array(totalBytes)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }

  try {
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes)
    const parsed: unknown = JSON.parse(text)
    return parsed
  } catch {
    throw new JsonBodyError('invalid_json')
  }
}
