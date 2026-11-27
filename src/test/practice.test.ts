import { describe, expect, it } from 'vitest'
import { PRACTICE_TOPICS } from '../data/practice'
import { PREVIEW_VOCABULARY, VOCABULARY, HELD_VOCABULARY_IDS, VERIFIED_VOCABULARY } from '../data/curriculum'
import { OVERLAPPING_IDS, sharesAnswerGroup } from '../data/answerGroups'
import { checkPracticeAnswer, createPracticeRound } from '../domain/practice'
import { buildSession } from '../domain/studySession'

const topics = Object.values(PRACTICE_TOPICS).flat()
const exercises = topics.flatMap(topic => topic.exercises)
describe('expanded provisional curriculum',()=>{
  it('preserves unique IDs, excludes held content, and leaves the approval gate closed',()=>{
    expect(new Set(VOCABULARY.map(item=>item.id)).size).toBe(VOCABULARY.length)
    expect(PREVIEW_VOCABULARY.every(item=>!HELD_VOCABULARY_IDS.has(item.id))).toBe(true)
    expect(VERIFIED_VOCABULARY).toHaveLength(0)
    for(const group of OVERLAPPING_IDS) for(const id of group) expect(VOCABULARY.some(item=>item.id===id)).toBe(true)
  })
  it('does not use known synonymous questions as competing answers',()=>{
    const pool=PREVIEW_VOCABULARY.filter(item=>item.moduleId==='introductions')
    const item=pool.find(item=>item.id==='introductions-mi-a-nemzetisege')!
    const other=pool.find(item=>item.id==='introductions-milyen-nemzetisegu')!
    expect(sharesAnswerGroup(item,other)).toBe(true)
    for(let i=0;i<10;i++){const q=buildSession([item],'quiz',Math.random,false,pool)[0];expect(q.reverse).toBe(false);expect(q.choices).not.toContain(other.english)}
  })
})
describe('practice exercises',()=>{
  it('has unique exercises, valid choices and matching audio references',()=>{
    expect(new Set(exercises.map(q=>q.id)).size).toBe(exercises.length)
    for(const q of exercises){expect(q.answers.length).toBeGreaterThan(0);if(q.audioId)expect(PREVIEW_VOCABULARY.some(item=>item.id===q.audioId)).toBe(true);if(q.kind==='choice'){expect(q.distractors?.length).toBeGreaterThan(0);expect(q.distractors?.some(value=>checkPracticeAnswer(q,value))).toBe(false)}}
  })
  it('accepts valid time formatting, but not incorrect times or missing accents',()=>{
    const clock=exercises.find(q=>q.id==='time-quarter-ten')!
    expect(checkPracticeAnswer(clock,'9:15')).toBe(true)
    expect(checkPracticeAnswer(clock,'09:15')).toBe(true)
    expect(checkPracticeAnswer(clock,'10:15')).toBe(false)
    expect(checkPracticeAnswer(clock,'9:75')).toBe(false)
    const plural=exercises.find(q=>q.id==='plural-fecskendo')!
    expect(checkPracticeAnswer(plural,'Fecskendők')).toBe(true)
    expect(checkPracticeAnswer(plural,'fecskendok')).toBe(false)
    expect(checkPracticeAnswer(exercises.find(q=>q.id==='s-1')!,'nyolc órától')).toBe(true)
  })
  it('builds rounds of at most ten unique questions with a single correct choice',()=>{
    for(const topic of topics){const round=createPracticeRound(topic.exercises);expect(round.length).toBe(Math.min(10,topic.exercises.length));expect(new Set(round.map(q=>q.id)).size).toBe(round.length);for(const q of round.filter(q=>q.kind==='choice'))expect(q.choices.filter(value=>checkPracticeAnswer(q,value))).toHaveLength(1)}
  })
})
