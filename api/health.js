export const config = {
  runtime: 'edge',
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || 'https://sayagos.tech',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
  }
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() })
  }

  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders() })
  }

  return new Response(JSON.stringify({
    ok: true,
    service: 'farid-portfolio-api',
    timestamp: new Date().toISOString(),
  }), {
    status: 200,
    headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
  })
}
