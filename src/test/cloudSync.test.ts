import { describe, expect, it } from 'vitest'
import { accountCacheKey, planSync, sameLearningState, type CloudSnapshot, type LearningSnapshot } from '../domain/cloudSync'
import { createEmptyProgress, recordAssessment } from '../domain/progress'

const blank = (): LearningSnapshot => ({ progress: createEmptyProgress('2026-01-01T00:00:00.000Z'), voice: 'anna' })
const edit = (snapshot: LearningSnapshot, id: string): LearningSnapshot => ({ ...snapshot, progress: recordAssessment(snapshot.progress, id, 'quiz', true) })
const cloud = (snapshot: LearningSnapshot, revision = 1): CloudSnapshot => ({ ...snapshot, revision })

describe('cloud synchronization planning', () => {
  it('creates a new cloud record only when no baseline or remote record exists', () => {
    expect(planSync(blank(), null, null).kind).toBe('insert')
    expect(planSync(blank(), cloud(blank()), null).kind).toBe('remote-missing')
  })
  it('downloads remote changes when the local snapshot has not changed', () => {
    const initial = blank()
    const remote = cloud(edit(initial, 'greetings-jo-reggelt'), 2)
    expect(planSync(initial, cloud(initial), remote)).toEqual({ kind: 'download', remote })
  })
  it('uploads local changes with the currently observed remote revision', () => {
    const initial = blank(), local = edit(initial, 'greetings-jo-reggelt')
    expect(planSync(local, cloud(initial), cloud(initial, 3))).toEqual({ kind: 'upload', local, expectedRevision: 3 })
  })
  it('does not silently replace progress when both devices have edits', () => {
    const initial = blank()
    expect(planSync(edit(initial, 'greetings-jo-reggelt'), cloud(initial), cloud(edit(initial, 'greetings-jo-napot'), 2))).toMatchObject({ kind: 'conflict', reason: 'concurrent-edits' })
  })
  it('requires an explicit decision when linking unrelated guest and cloud progress', () => {
    expect(planSync(edit(blank(), 'greetings-jo-reggelt'), null, cloud(blank()))).toMatchObject({ kind: 'conflict', reason: 'first-connection' })
  })
  it('treats equal content as unchanged even with different timestamps or property ordering', () => {
    const local = blank()
    const remote = cloud({ ...local, progress: { ...local.progress, updatedAt: '2026-02-01T00:00:00.000Z' } })
    expect(sameLearningState(local, remote)).toBe(true)
    expect(planSync(local, null, remote).kind).toBe('unchanged')
  })
  it('includes voice changes and distinguishes individual account caches', () => {
    const local = blank()
    expect(sameLearningState(local, { ...local, voice: 'imre' })).toBe(false)
    expect(accountCacheKey('00000000-0000-4000-8000-000000000001')).not.toBe(accountCacheKey('00000000-0000-4000-8000-000000000002'))
    expect(() => accountCacheKey('guest')).toThrow()
  })
})
