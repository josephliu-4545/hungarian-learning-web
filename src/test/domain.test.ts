import { describe, expect, it } from 'vitest'
import { getCharacterDiff, isSpellingCorrect, normalizeSpelling } from '../domain/spelling'
import { createEmptyProgress, getWordStatus, recordAssessment } from '../domain/progress'
import { parseBackup } from '../domain/backup'

describe('spelling', () => {
  it('normalizes NFC, case, and insignificant whitespace', () => {
    expect(normalizeSpelling('  JO\u0301   NAPOT ')).toBe('jó napot')
  })
  it('preserves accents when checking', () => {
    expect(isSpellingCorrect('gyogyszer', 'gyógyszer')).toBe(false)
    expect(isSpellingCorrect(' GYÓGYSZER ', 'gyógyszer')).toBe(true)
  })
  it('identifies character-level spelling differences without stripping accents', () => {
    expect(getCharacterDiff('gyogyszer', 'gyógyszer')).toEqual([
      { character: 'g', correct: true }, { character: 'y', correct: true },
      { character: 'ó', correct: false }, { character: 'g', correct: true },
      { character: 'y', correct: true }, { character: 's', correct: true },
      { character: 'z', correct: true }, { character: 'e', correct: true },
      { character: 'r', correct: true },
    ])
  })
})

describe('progress rules', () => {
  it('requires two meaning and one spelling correct attempts for mastery', () => {
    let app = createEmptyProgress('2026-01-01T00:00:00.000Z')
    app = recordAssessment(app, 'word', 'listening', true, '2026-01-01T00:00:01.000Z')
    app = recordAssessment(app, 'word', 'quiz', true, '2026-01-01T00:00:02.000Z')
    expect(getWordStatus(app.words.word)).toBe('learning')
    app = recordAssessment(app, 'word', 'spelling', true, '2026-01-01T00:00:03.000Z')
    expect(getWordStatus(app.words.word)).toBe('mastered')
  })
  it('deduplicates review and demotes mastery after two consecutive errors', () => {
    let app = createEmptyProgress('2026-01-01T00:00:00.000Z')
    for (const mode of ['listening', 'quiz', 'spelling'] as const) app = recordAssessment(app, 'word', mode, true)
    app = recordAssessment(app, 'word', 'quiz', false)
    expect(getWordStatus(app.words.word)).toBe('mastered')
    expect(app.words.word.needsReview).toBe(true)
    app = recordAssessment(app, 'word', 'quiz', false)
    expect(getWordStatus(app.words.word)).toBe('learning')
    expect(Object.keys(app.words).filter((id) => app.words[id].needsReview)).toEqual(['word'])
  })
  it('clears a review flag on a later correct assessed answer', () => {
    let app = recordAssessment(createEmptyProgress(), 'word', 'quiz', false)
    app = recordAssessment(app, 'word', 'listening', true)
    expect(app.words.word.needsReview).toBe(false)
  })
})

describe('backup validation', () => {
  it('rejects invalid and incompatible data', () => {
    expect(() => parseBackup('{"schemaVersion":2}', ['word'])).toThrow(/version/i)
    expect(() => parseBackup('not json', ['word'])).toThrow(/valid JSON/i)
    expect(() => parseBackup(JSON.stringify({ schemaVersion: 1, progress: { schemaVersion: 1, completedModuleIds: ['bogus'], words: {}, assessmentCorrect: 0, assessmentAttempts: 0, statsByMode: {} } }), ['word'])).toThrow(/schema/i)
  })
  it('rejects unknown word ids from a compatible backup', () => {
    const data = createEmptyProgress()
    data.words.unknown = { seen: true, meaningCorrect: 0, meaningIncorrect: 0, spellingCorrect: 0, spellingIncorrect: 0, consecutiveIncorrect: 0, needsReview: false }
    expect(() => parseBackup(JSON.stringify({ schemaVersion: 1, exportedAt: new Date().toISOString(), progress: data }), ['word'])).toThrow(/unknown/i)
  })
})

