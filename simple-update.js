import http from 'k6/http'

const { SCALE, SUPABASE_KEY, SUPABASE_URL } = __ENV
const scale = Number(SCALE) || 200

export const options = {
  discardResponseBodies: true,
  duration: '3m',
  insecureSkipTLSVerify: true,
  vus: 500,
}

export default function () {
  const { status } = http.post(
    `${SUPABASE_URL}/rest/v1/rpc/simple_update`,
    JSON.stringify({
      aid: Math.floor(Math.random() * scale * 100000 + 1),
      bid: Math.floor(Math.random() * scale + 1),
      tid: Math.floor(Math.random() * scale * 10 + 1),
      delta: Math.floor(Math.random() * 4999) - 5000,
    }),
    {
      headers: {
        apikey: SUPABASE_KEY,
      },
    }
  )

  if (status !== 204) {
    console.error(status)
  }
}
