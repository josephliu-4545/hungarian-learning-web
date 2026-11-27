import type { SupabaseClient } from '@supabase/supabase-js'
import { validateProgress } from './backup'
import type { CloudSnapshot, LearningSnapshot } from './cloudSync'

export function decodeCloud(row: unknown): CloudSnapshot {
  if (!row || typeof row !== 'object') throw new Error('Invalid cloud record')
  const r = row as Record<string, unknown>
  if (!validateProgress(r.progress) || (r.preferred_voice !== 'anna' && r.preferred_voice !== 'imre') || !Number.isSafeInteger(r.revision) || Number(r.revision) < 1) throw new Error('Invalid cloud progress; no data was overwritten')
  return { progress: r.progress, voice: r.preferred_voice, revision: Number(r.revision) }
}
const columns = 'progress,preferred_voice,revision'
export async function readCloud(client: SupabaseClient, userId: string): Promise<CloudSnapshot | null> {
  const { data, error } = await client.from('learning_progress').select(columns).eq('user_id', userId).maybeSingle()
  if (error) throw error
  return data ? decodeCloud(data) : null
}
export async function writeCloud(client: SupabaseClient, userId: string, local: LearningSnapshot, revision: number | null): Promise<CloudSnapshot | null> {
  const values = { progress: local.progress, preferred_voice: local.voice }
  if (revision === null) {
    const { data, error } = await client.from('learning_progress').insert({ user_id: userId, ...values }).select(columns).single()
    if (error?.code === '23505') return null
    if (error) throw error
    return decodeCloud(data)
  }
  const { data, error } = await client.from('learning_progress').update(values).eq('user_id', userId).eq('revision', revision).select(columns).maybeSingle()
  if (error) throw error
  return data ? decodeCloud(data) : null
}
