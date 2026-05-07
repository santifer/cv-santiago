export const forbiddenPublicIdentityTerms = [
  'santifer',
  'santifer.io',
  'santiago fernández',
  'santiago fernandez',
  'jacobo',
  'business os',
] as const

export function findForbiddenPublicIdentityTerms(text: string): string[] {
  const lower = text.toLowerCase()
  return forbiddenPublicIdentityTerms.filter(term => lower.includes(term))
}
