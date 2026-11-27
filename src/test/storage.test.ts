import { describe, expect, it } from 'vitest'
import { createEmptyProgress, recordAssessment } from '../domain/progress'
import { loadProgress, saveProgress, STORAGE_KEY } from '../domain/storage'
import { VERIFIED_VOCABULARY, VOCABULARY } from '../data/curriculum'

describe('local progress persistence', () => {
  it('restores assessed progress after a refresh', () => {
    const memory = new Map<string, string>()
    const storage = { getItem: (key: string) => memory.get(key) ?? null, setItem: (key: string, value: string) => memory.set(key, value) }
    const progress = recordAssessment(createEmptyProgress(), VOCABULARY[0].id, 'listening', true)
    saveProgress(progress, storage)
    expect(loadProgress(storage).assessmentAttempts).toBe(1)
    expect(memory.has(STORAGE_KEY)).toBe(true)
  })
  it('returns empty progress for malformed storage', () => {
    const storage = { getItem: () => '{broken' }
    expect(loadProgress(storage).assessmentAttempts).toBe(0)
  })
  it('returns safe progress for a partial v1 record', () => {
    const storage = { getItem: () => '{"schemaVersion":1}' }
    expect(loadProgress(storage).statsByMode.listening.attempts).toBe(0)
  })
  it('does not throw when storage writes are denied', () => {
    const storage = { setItem: () => { throw new Error('denied') } }
    expect(() => saveProgress(createEmptyProgress(), storage)).not.toThrow()
  })
})

it('never exposes unverified curriculum in live vocabulary', () => {
  expect(VOCABULARY.some((item) => !item.verified)).toBe(true)
  expect(VERIFIED_VOCABULARY.every((item) => item.verified)).toBe(true)
  expect(VERIFIED_VOCABULARY).toHaveLength(0)
})

it('contains an expanded provisional curriculum with unique stable IDs across all six modules', () => {
  expect(VOCABULARY.length).toBeGreaterThan(150)
  expect(new Set(VOCABULARY.map((item) => item.id)).size).toBe(VOCABULARY.length)
  expect(VOCABULARY.every((item) => item.verified === false)).toBe(true)
  for (const moduleId of ['greetings', 'introductions', 'numbers-time', 'appointments', 'hospital-objects', 'departments']) {
    expect(VOCABULARY.filter((item) => item.moduleId === moduleId).length).toBeGreaterThanOrEqual(10)
  }
  expect(VOCABULARY.find((item) => item.id === 'introductions-diak')?.hungarian).toBe('diák')
  expect(VOCABULARY.find((item) => item.id === 'introductions-hallgato')?.hungarian).toBe('hallgató')
  expect(VOCABULARY.find((item) => item.id === 'departments-patika')?.english).toBe('pharmacy')
  expect(VOCABULARY.find((item) => item.id === 'hospital-objects-gyogyszer')?.sourcePages).toEqual([12])
})

