import type { StudyMode, VocabularyItem } from '../types'
import { sharesAnswerGroup } from '../data/answerGroups'

export type RandomSource = () => number
export type StudyQuestion = { item: VocabularyItem; reverse: boolean; choices: string[]; correct: string }

export function shuffle<T>(values: readonly T[], random: RandomSource = Math.random): T[] {
  const result = [...values]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const normalize = (text: string) => text.normalize('NFC').toLocaleLowerCase('hu').trim().replace(/\s+/g, ' ')
// Obvious shared glosses are excluded; human review remains necessary for semantic ambiguity.
const meanings = (text: string) => text.replace(/\([^)]*\)/g, '').split(/\s*\/\s*|;\s*/).map(normalize).filter(Boolean)
const overlaps = (a: string, b: string) => meanings(a).some((part) => meanings(b).includes(part))
const ambiguous = (a: VocabularyItem, b: VocabularyItem) => normalize(a.hungarian) === normalize(b.hungarian) || overlaps(a.english, b.english) || sharesAnswerGroup(a, b)

export function buildSession(items: readonly VocabularyItem[], mode: StudyMode, random: RandomSource = Math.random, shuffleCards = false, pool: readonly VocabularyItem[] = items): StudyQuestion[] {
  const ordered = mode === 'flashcards' && !shuffleCards ? [...items] : shuffle(items, random)
  return ordered.flatMap((item) => {
    if (mode === 'flashcards' || mode === 'spelling') return [{ item, reverse: false, choices: [], correct: item.hungarian }]
    const sameMeaning = pool.some((other) => other.id !== item.id && ambiguous(other, item))
    const reverse = mode === 'quiz' && !sameMeaning && random() < 0.5
    const label = (word: VocabularyItem) => reverse ? word.hungarian : word.english
    const correct = label(item)
    const eligible = shuffle(pool.filter((other) => other.id !== item.id && !ambiguous(other, item)), random)
    // Stable sort preserves random order within each preferred group.
    eligible.sort((a, b) => Number(b.moduleId === item.moduleId) - Number(a.moduleId === item.moduleId) || Number(b.kind === item.kind) - Number(a.kind === item.kind))
    const selected: VocabularyItem[] = []
    for (const other of eligible) {
      if (selected.length === 3) break
      if (normalize(label(other)) === normalize(correct) || selected.some((prior) => normalize(label(prior)) === normalize(label(other)) || ambiguous(prior, other))) continue
      selected.push(other)
    }
    if (!selected.length) return []
    return [{ item, reverse, correct, choices: shuffle([correct, ...selected.map(label)], random) }]
  })
}
