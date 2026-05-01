// Types mirroring the Prisma Url model + server-augmented shortUrl field
export interface UrlRecord {
  id: string
  originalUrl: string
  shortCode: string
  shortUrl: string
  createdAt: string
}

export interface ShortenResponse {
  originalUrl: string
  shortCode: string
  shortUrl: string
  createdAt: string
}

export interface ApiError {
  error: string
}

const BASE = '/api/urls'

/**
 * POST /api/urls/shorten
 * Creates (or returns existing) shortened URL.
 */
export async function shortenUrl(originalUrl: string): Promise<ShortenResponse> {
  const res = await fetch(`${BASE}/shorten`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalUrl }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error((data as ApiError).error || `Request failed: ${res.status}`)
  }

  return data as ShortenResponse
}

/**
 * GET /api/urls
 * Fetches all shortened URLs ordered by createdAt desc.
 */
export async function getAllUrls(): Promise<UrlRecord[]> {
  const res = await fetch(BASE)

  const data = await res.json()

  if (!res.ok) {
    throw new Error((data as ApiError).error || `Request failed: ${res.status}`)
  }

  return data as UrlRecord[]
}
