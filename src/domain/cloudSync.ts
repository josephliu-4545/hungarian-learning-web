import type { AppProgress } from '../types'
import type { PiperVoiceId } from '../data/audioManifest'

export type LearningSnapshot = { progress: AppProgress; voice: PiperVoiceId }
export type CloudSnapshot = LearningSnapshot & { revision: number }
export type SyncDecision =
  | { kind: 'unchanged'; remote: CloudSnapshot }
  | { kind: 'download'; remote: CloudSnapshot }
  | { kind: 'insert'; local: LearningSnapshot }
  | { kind: 'upload'; local: LearningSnapshot; expectedRevision: number }
  | { kind: 'conflict'; local: LearningSnapshot; remote: CloudSnapshot; reason: 'first-connection' | 'concurrent-edits' }
  | { kind: 'remote-missing'; local: LearningSnapshot }

function stable(value: unknown): string {
  if (Array.isArray(value)) return '[' + value.map(stable).join(',') + ']'
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    return '{' + Object.keys(record).filter(key => record[key] !== undefined).sort().map(key => JSON.stringify(key) + ':' + stable(record[key])).join(',') + '}'
  }
  return JSON.stringify(value) ?? 'null'
}
export function sameLearningState(a: LearningSnapshot, b: LearningSnapshot): boolean {
  // A new timestamp alone does not indicate a learning change.
  const { updatedAt: timeA, ...progressA } = a.progress
  const { updatedAt: timeB, ...progressB } = b.progress
  void timeA
  void timeB
  return a.voice === b.voice && stable(progressA) === stable(progressB)
}

/**
 * Pure, conservative synchronization planner. Account ownership is enforced by
 * the caller and database RLS. Never automatically overwrite divergent snapshots.
 * A missing baseline means no trusted common ancestor is known.
 */
export function planSync(local: LearningSnapshot, base: CloudSnapshot | null, remote: CloudSnapshot | null): SyncDecision {
  if (!remote) return base ? { kind: 'remote-missing', local } : { kind: 'insert', local }
  if (sameLearningState(local, remote)) return { kind: 'unchanged', remote }
  if (!base) return { kind: 'conflict', local, remote, reason: 'first-connection' }
  const localChanged = !sameLearningState(local, base)
  const remoteChanged = !sameLearningState(remote, base)
  if (!localChanged) return { kind: 'download', remote }
  if (!remoteChanged) return { kind: 'upload', local, expectedRevision: remote.revision }
  return { kind: 'conflict', local, remote, reason: 'concurrent-edits' }
}

export function accountCacheKey(userId: string): string {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) throw new Error('Invalid account ID')
  return 'magyar-learning-account:v1:' + userId.toLowerCase()
}
