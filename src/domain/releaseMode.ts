export type ReleaseMode = 'preview' | 'beta' | 'reviewed'
export function resolveReleaseMode(dev: boolean, production: boolean, mode: string, search = ''): ReleaseMode {
  if (dev && new URLSearchParams(search).has('preview')) return 'preview'
  if (production && mode === 'beta') return 'beta'
  return 'reviewed'
}
export const releaseMode = resolveReleaseMode(import.meta.env.DEV, import.meta.env.PROD, import.meta.env.MODE, typeof window === 'undefined' ? '' : window.location.search)
export const isBeta = releaseMode === 'beta'
