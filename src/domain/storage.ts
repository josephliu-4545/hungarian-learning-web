import type { AppProgress } from '../types'
import { createEmptyProgress } from './progress'
import { validateProgress } from './backup'
export const STORAGE_KEY = 'magyar-learning-progress:v1'
export const BETA_STORAGE_KEY = 'magyar-learning-beta-progress:v1'

export function loadProgress(storage: Pick<Storage, 'getItem'> = localStorage, key = STORAGE_KEY): AppProgress {
  try { const raw = storage.getItem(key); if (!raw) return createEmptyProgress(); const parsed: unknown = JSON.parse(raw); return validateProgress(parsed) ? parsed : createEmptyProgress() } catch { return createEmptyProgress() }
}
export function saveProgress(progress: AppProgress, storage: Pick<Storage, 'setItem'> = localStorage, key = STORAGE_KEY): void { try { storage.setItem(key, JSON.stringify(progress)) } catch { /* Continue in memory when storage is unavailable. */ } }

