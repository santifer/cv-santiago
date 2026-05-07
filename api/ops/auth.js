import { corsHeaders } from '../_shared/ops-auth.js'

export const config = { runtime: 'edge' }

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    })
  }

  try {
    const { password } = await req.json()
    const secret = process.env.OPS_DASHBOARD_SECRET

    if (!secret) {
      return new Response(JSON.stringify({ error: 'Dashboard not configured' }), {
        status: 503,
        headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
      })
    }

    if (!password || password !== secret) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ ok: true, token: password }), {
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    })
  }
}
