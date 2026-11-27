import type { AppProgress, AssessedMode, WordProgress } from '../types'

export const emptyWord = (): WordProgress => ({ seen: false, meaningCorrect: 0, meaningIncorrect: 0, spellingCorrect: 0, spellingIncorrect: 0, consecutiveIncorrect: 0, needsReview: false })
export const createEmptyProgress = (now = new Date().toISOString()): AppProgress => ({ schemaVersion: 1, completedModuleIds: [], words: {}, assessmentCorrect: 0, assessmentAttempts: 0, statsByMode: { listening: { correct: 0, attempts: 0 }, spelling: { correct: 0, attempts: 0 }, quiz: { correct: 0, attempts: 0 } }, updatedAt: now })

export function getWordStatus(word?: WordProgress): 'new' | 'learning' | 'mastered' {
  if (!word || (!word.seen && word.meaningCorrect + word.meaningIncorrect + word.spellingCorrect + word.spellingIncorrect === 0)) return 'new'
  if (!word.demoted && word.meaningCorrect >= 2 && word.spellingCorrect >= 1) return 'mastered'
  return 'learning'
}

export function recordCardOpen(progress: AppProgress, wordId: string): AppProgress {
  return { ...progress, words: { ...progress.words, [wordId]: { ...(progress.words[wordId] ?? emptyWord()), seen: true } }, updatedAt: new Date().toISOString() }
}

export function recordAssessment(progress: AppProgress, wordId: string, mode: AssessedMode, correct: boolean, now = new Date().toISOString()): AppProgress {
  const before = progress.words[wordId] ?? emptyWord()
  const wasMastered = getWordStatus(before) === 'mastered'
  const meaning = mode !== 'spelling'
  const consecutiveIncorrect = correct ? 0 : before.consecutiveIncorrect + 1
  const word: WordProgress = {
    ...before, seen: true, lastPracticedAt: now, consecutiveIncorrect,
    needsReview: correct ? false : true,
    meaningCorrect: before.meaningCorrect + (meaning && correct ? 1 : 0),
    meaningIncorrect: before.meaningIncorrect + (meaning && !correct ? 1 : 0),
    spellingCorrect: before.spellingCorrect + (!meaning && correct ? 1 : 0),
    spellingIncorrect: before.spellingIncorrect + (!meaning && !correct ? 1 : 0),
    demoted: before.demoted || (wasMastered && !correct && consecutiveIncorrect >= 2),
  }
  if (word.demoted && correct && word.meaningCorrect >= 2 && word.spellingCorrect >= 1) word.demoted = false
  return { ...progress, words: { ...progress.words, [wordId]: word }, assessmentCorrect: progress.assessmentCorrect + (correct ? 1 : 0), assessmentAttempts: progress.assessmentAttempts + 1, statsByMode: { ...progress.statsByMode, [mode]: { correct: progress.statsByMode[mode].correct + (correct ? 1 : 0), attempts: progress.statsByMode[mode].attempts + 1 } }, updatedAt: now }
}

export const percentage = (correct: number, total: number): number | null => total ? Math.round((correct / total) * 100) : null

