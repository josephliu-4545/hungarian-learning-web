import { describe, expect, it } from 'vitest'
import { buildSession, shuffle } from '../domain/studySession'
import { selectHungarianVoice } from '../domain/hungarianAudio'
import type { VocabularyItem } from '../types'

const word = (id: string, english = id): VocabularyItem => ({ id, english, hungarian: 'hu-' + id, kind: 'word', moduleId: 'greetings', sourcePages: [2], verified: true })
const words = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((id) => word(id))
const seeded = (seed: number) => () => { seed = (Math.imul(1664525, seed) + 1013904223) >>> 0; return seed / 4294967296 }

describe('study sessions', () => {
  it('does not mutate the source and is deterministic with the same random seed', () => {
    expect(shuffle(words, seeded(2))).toHaveLength(words.length)
    expect(words.map((w) => w.id)).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
    expect(buildSession(words, 'quiz', seeded(2))).toEqual(buildSession(words, 'quiz', seeded(2)))
  })
  it('varies question order, correct positions and distractor sets', () => {
    const sessions = Array.from({ length: 30 }, (_, i) => buildSession(words, 'listening', seeded(i + 10)))
    expect(new Set(sessions.map((s) => s.map((q) => q.item.id).join(','))).size).toBeGreaterThan(1)
    const questions = sessions.map((s) => s.find((q) => q.item.id === 'a')!)
    expect(new Set(questions.map((q) => q.choices.indexOf(q.correct))).size).toBe(4)
    expect(new Set(questions.map((q) => q.choices.filter((c) => c !== q.correct).sort().join(','))).size).toBeGreaterThan(1)
    for (const q of sessions.flat()) { expect(new Set(q.choices).size).toBe(q.choices.length); expect(q.choices.filter((c) => c === q.correct)).toHaveLength(1) }
  })
  it('excludes duplicate and obviously overlapping glosses', () => {
    const q = buildSession([word('a', 'Hello'), word('b', 'Hello / Goodbye (informal)'), word('c', 'Sorry')], 'listening', seeded(1)).find((q) => q.item.id === 'a')!
    expect(q.choices).toEqual(expect.arrayContaining(['Hello', 'Sorry']))
    expect(q.choices).toHaveLength(2)
    expect(buildSession([word('a'), word('b', 'a')], 'quiz', seeded(2))).toEqual([])
    expect(buildSession([word('a')], 'listening')).toEqual([])
  })
  it('leaves flashcards ordered unless shuffle is requested and includes both quiz directions', () => {
    expect(buildSession(words, 'flashcards').map((q) => q.item)).toEqual(words)
    const quizzes = Array.from({ length: 20 }, (_, i) => buildSession(words, 'quiz', seeded(i))).flat()
    expect(new Set(quizzes.map((q) => q.reverse)).size).toBe(2)
  })
})

describe('Hungarian voice selection', () => {
  it('prefers hu-HU and never chooses an English voice', () => {
    expect(selectHungarianVoice([{ lang: 'en-US' }, { lang: 'hu' }, { lang: 'hu-HU' }])?.lang).toBe('hu-HU')
    expect(selectHungarianVoice([{ lang: 'en-US' }, { lang: 'en-GB' }])).toBeUndefined()
    expect(selectHungarianVoice([{ lang: 'HU_hu' }])?.lang).toBe('HU_hu')
    expect(selectHungarianVoice([])).toBeUndefined()
  })
})
