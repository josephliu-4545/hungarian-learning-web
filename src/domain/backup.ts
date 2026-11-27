import type { AppProgress } from '../types'
import { MODULES } from '../data/curriculum'

export type BackupEnvelope = { schemaVersion: 1; exportedAt: string; progress: AppProgress }
export const exportProgress = (progress: AppProgress): string => JSON.stringify({ schemaVersion: 1, exportedAt: new Date().toISOString(), progress }, null, 2)

const isCount = (value: unknown) => Number.isInteger(value) && Number(value) >= 0
const wordKeys = ['seen','meaningCorrect','meaningIncorrect','spellingCorrect','spellingIncorrect','consecutiveIncorrect','needsReview','demoted','lastPracticedAt']
export function validateProgress(value: unknown, validWordIds?: string[]): value is AppProgress {
  if (!value || typeof value !== 'object') return false
  const p = value as Record<string, unknown>, modes = p.statsByMode as Record<string, unknown> | undefined
  if (p.schemaVersion !== 1 || !Array.isArray(p.completedModuleIds) || !p.completedModuleIds.every(id => MODULES.some(m => m.id === id)) || !p.words || typeof p.words !== 'object' || !isCount(p.assessmentCorrect) || !isCount(p.assessmentAttempts) || !modes) return false
  if (!['listening','spelling','quiz'].every(mode => { const s=modes[mode] as Record<string,unknown>|undefined; return s && isCount(s.correct) && isCount(s.attempts) })) return false
  return Object.entries(p.words as Record<string,unknown>).every(([id,value]) => {
    if (validWordIds && !validWordIds.includes(id)) return false
    if (!value || typeof value !== 'object' || Object.keys(value).some(k=>!wordKeys.includes(k))) return false
    const w=value as Record<string,unknown>
    return typeof w.seen==='boolean' && typeof w.needsReview==='boolean' && ['meaningCorrect','meaningIncorrect','spellingCorrect','spellingIncorrect','consecutiveIncorrect'].every(k=>isCount(w[k]))
  })
}

export function parseBackup(raw: string, validWordIds: string[]): BackupEnvelope {
  if (raw.length > 1_000_000) throw new Error('Backup is too large')
  let value: unknown
  try { value = JSON.parse(raw) } catch { throw new Error('Backup is not valid JSON') }
  if (!value || typeof value !== 'object' || (value as { schemaVersion?: unknown }).schemaVersion !== 1) throw new Error('Incompatible schema version')
  const envelope = value as Partial<BackupEnvelope>
  const p = envelope.progress
  if (!validateProgress(p)) throw new Error('Backup has an invalid progress schema')
  const unknown = Object.keys(p.words).filter(id=>!validWordIds.includes(id))
  if (unknown.length) throw new Error(`Backup contains unknown word IDs: ${unknown.join(', ')}`)
  if (!validateProgress(p, validWordIds)) throw new Error('Backup has an invalid progress schema')
  return { schemaVersion: 1, exportedAt: typeof envelope.exportedAt === 'string' ? envelope.exportedAt : new Date().toISOString(), progress: p }
}

