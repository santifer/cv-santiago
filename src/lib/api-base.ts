export function apiUrl(path: string): string {
  const configuredBase = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')
  const base = configuredBase || (import.meta.env.PROD ? 'https://api.sayagos.tech' : '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalizedPath}`
}
