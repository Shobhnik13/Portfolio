// One-time helper to get a Spotify refresh token for /api/now-playing.
// Usage: SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-token.mjs
// Redirect URI http://127.0.0.1:8888/callback must be added in the Spotify app settings.

import http from 'node:http'

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env
if (!id || !secret) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first.')
  process.exit(1)
}

const redirectUri = 'http://127.0.0.1:8888/callback'
const authUrl = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
  client_id: id,
  response_type: 'code',
  redirect_uri: redirectUri,
  scope: 'user-read-currently-playing user-read-recently-played',
})

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, redirectUri)
  if (url.pathname !== '/callback') return res.end()

  const code = url.searchParams.get('code')
  if (!code) {
    res.end('No code in callback.')
    return
  }

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: redirectUri }),
  })
  const data = await tokenRes.json()

  if (data.refresh_token) {
    console.log('\nSPOTIFY_REFRESH_TOKEN=' + data.refresh_token + '\n')
    res.end('Done. Refresh token printed in terminal; you can close this tab.')
  } else {
    console.error(data)
    res.end('Failed. See terminal.')
  }
  server.close()
})

server.listen(8888, '127.0.0.1', () => {
  console.log('Open this URL and approve access:\n\n' + authUrl + '\n')
})
