export type PublicRouteKind = 'home' | 'article' | 'internal'

export interface PublicRoute {
  path: string
  kind: PublicRouteKind
  prerender: boolean
  sitemap: boolean
}

export const publicRoutes: PublicRoute[] = [
  { path: '/', kind: 'home', prerender: true, sitemap: true },
  { path: '/en', kind: 'home', prerender: true, sitemap: true },
  { path: '/blog/mlops-field-notes', kind: 'article', prerender: true, sitemap: true },
]

export const internalRoutes: PublicRoute[] = [
  { path: '/ops', kind: 'internal', prerender: false, sitemap: false },
]

// Legacy previous-owner routes are intentionally not enumerated in the
// client bundle. They fall through to the catch-all 404/noindex route when
// served by an SPA fallback, and receive platform 404s when no static file
// exists.
export const blockedLegacyRoutes = [] as const

const publicRouteSet = new Set(publicRoutes.map(route => route.path))
const internalRouteSet = new Set(internalRoutes.map(route => route.path))
const blockedLegacyRouteSet = new Set<string>(blockedLegacyRoutes)

export function normalizeRoute(path: string): string {
  if (!path) return '/'
  const withoutHash = path.split('#')[0]?.split('?')[0] || '/'
  if (withoutHash === '/') return '/'
  return withoutHash.replace(/\/$/, '')
}

export function isPublicRoute(path: string): boolean {
  return publicRouteSet.has(normalizeRoute(path))
}

export function isInternalRoute(path: string): boolean {
  return internalRouteSet.has(normalizeRoute(path))
}

export function isBlockedLegacyRoute(path: string): boolean {
  return blockedLegacyRouteSet.has(normalizeRoute(path))
}

export function getPrerenderRoutes(): PublicRoute[] {
  return publicRoutes.filter(route => route.prerender)
}

export function getSitemapRoutes(): PublicRoute[] {
  return publicRoutes.filter(route => route.sitemap)
}
