import type { Exercise } from '../data/practice'
import { shuffle, type RandomSource } from './studySession'
import { normalizeSpelling } from './spelling'

export type PracticeQuestion = Exercise & { choices: string[] }
const clean = (text: string) => normalizeSpelling(text).replace(/[.!?]+$/u, '').trim()
function clockValue(text: string): string | undefined {
  const match = /^(\d{1,2}):(\d{2})$/.exec(text.trim())
  if (!match || Number(match[1]) > 23 || Number(match[2]) > 59) return undefined
  return match[1].padStart(2, '0') + ':' + match[2]
}
export function checkPracticeAnswer(question: Exercise, input: string): boolean {
  if (question.kind === 'clock') {
    const value = clockValue(input)
    return value !== undefined && question.answers.some(answer => clockValue(answer) === value)
  }
  return question.answers.some(answer => clean(answer) === clean(input))
}
export function createPracticeRound(exercises: readonly Exercise[], random: RandomSource = Math.random, limit = 10): PracticeQuestion[] {
  return shuffle(exercises, random).slice(0, limit).map(exercise => ({
    ...exercise,
    choices: exercise.kind === 'choice' ? shuffle([exercise.answers[0], ...(exercise.distractors ?? []).filter(value => !checkPracticeAnswer(exercise, value))], random) : [],
  }))
}
