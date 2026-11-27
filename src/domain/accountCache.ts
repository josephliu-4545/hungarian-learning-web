import { accountCacheKey, type LearningSnapshot, type CloudSnapshot } from './cloudSync'
import { validateProgress } from './backup'

export type AccountCache = { local: LearningSnapshot; base: CloudSnapshot | null }
function validSnapshot(value: unknown): value is LearningSnapshot {
  if (!value || typeof value !== 'object') return false
  const s = value as Record<string, unknown>
  return validateProgress(s.progress) && (s.voice === 'anna' || s.voice === 'imre')
}
export function readAccountCache(id: string, storage: Pick<Storage,'getItem'> = localStorage): AccountCache | null {
  const raw = storage.getItem(accountCacheKey(id))
  if (!raw) return null
  const data: unknown = JSON.parse(raw)
  if (!data || typeof data !== 'object') throw new Error('Invalid local account cache')
  const c = data as AccountCache
  if (!validSnapshot(c.local) || (c.base !== null && (!validSnapshot(c.base) || !Number.isSafeInteger(c.base.revision) || c.base.revision < 1))) throw new Error('Invalid local account cache')
  return c
}
export function writeAccountCache(id: string, cache: AccountCache, storage: Pick<Storage,'setItem'> = localStorage) {
  storage.setItem(accountCacheKey(id), JSON.stringify(cache))
}
