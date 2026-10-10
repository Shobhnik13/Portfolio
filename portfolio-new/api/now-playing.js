// Vercel serverless function: GET /api/now-playing
// Env: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN (see scripts/spotify-token.mjs)

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: SPOTIFY_REFRESH_TOKEN }),
  })
  if (!res.ok) throw new Error(`token ${res.status}`)
  return (await res.json()).access_token
}

function toTrack(item) {
  return {
    title: item.name,
    artist: item.artists.map((a) => a.name).join(', '),
    album: item.album.name,
    albumArt: item.album.images.at(-2)?.url ?? item.album.images[0]?.url ?? null,
    url: item.external_urls.spotify,
  }
}

export default async function handler(req, res) {
  try {
    const token = await getAccessToken()
    const headers = { Authorization: `Bearer ${token}` }

    const now = await fetch(NOW_PLAYING_URL, { headers })
    if (now.status === 200) {
      const data = await now.json()
      if (data.is_playing && data.item?.type === 'track') {
        res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=30')
        return res.status(200).json({ isPlaying: true, ...toTrack(data.item) })
      }
    }

    const recent = await fetch(RECENTLY_PLAYED_URL, { headers })
    if (!recent.ok) throw new Error(`recent ${recent.status}`)
    const last = (await recent.json()).items?.[0]
    if (!last) return res.status(204).end()

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=60')
    return res.status(200).json({ isPlaying: false, playedAt: last.played_at, ...toTrack(last.track) })
  } catch (err) {
    console.error('now-playing:', err.message)
    return res.status(500).json({ error: 'spotify_unavailable' })
  }
}
