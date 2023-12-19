import http from 'k6/http'

const { SCALE, SUPABASE_KEY, SUPABASE_URL } = __ENV
const scale = Number(SCALE) || 200

export const options = {
  discardResponseBodies: true,
  duration: '3m',
  insecureSkipTLSVerify: true,
  vus: 100,
}

export default function () {
  const { status } = http.get(
    http.url`${SUPABASE_URL}/rest/v1/pgbench_accounts?select=abalance&aid=eq.${Math.floor(
      Math.random() * scale * 100000 + 1
    )}`,
    {
      headers: {
        apikey: SUPABASE_KEY,
      },
    }
  )

  if (status !== 200) {
    console.error(status)
  }
}
