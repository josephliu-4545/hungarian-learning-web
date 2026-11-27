import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw, Volume2 } from 'lucide-react'
import { PRACTICE_TOPICS, type PracticeTopic } from '../data/practice'
import { COUNTRY_FORMS, PLURAL_FORMS } from '../data/expandedVocabulary'
import { PREVIEW_VOCABULARY } from '../data/curriculum'
import { checkPracticeAnswer, createPracticeRound, type PracticeQuestion } from '../domain/practice'
import { playHungarian, stopHungarian, type PlaybackStatus } from '../domain/hungarianAudio'
import type { PiperVoiceId } from '../data/audioManifest'
import type { ModuleId } from '../types'

type Props = { moduleId: ModuleId; voice: PiperVoiceId; setVoice: (voice: PiperVoiceId) => void }
export function Practice({ moduleId, voice, setVoice }: Props) {
  const [topic, setTopic] = useState<PracticeTopic | null>(null)
  if (!topic) return <section className="practice-library"><div className="section-heading"><div><span className="eyebrow">Apply what you know</span><h2>Choose a practice activity</h2></div><p>Scores are for this session only.</p></div><div className="practice-grid">{PRACTICE_TOPICS[moduleId].map(item => <button className="module-card practice-tile" key={item.id} onClick={() => setTopic(item)}><span className="module-copy"><strong>{item.title}</strong><small>{item.description}</small></span><span className="module-foot">{item.exercises.length} exercises<ChevronRight size={16}/></span></button>)}</div></section>
  return <PracticeRound key={topic.id} topic={topic} voice={voice} setVoice={setVoice} back={() => setTopic(null)}/>
}

function Clock({ hour, minute }: { hour: number; minute: number }) {
  return <svg className="practice-clock" viewBox="0 0 120 120" role="img" aria-label={String(hour).padStart(2,'0')+':'+String(minute).padStart(2,'0')}><circle cx="60" cy="60" r="55" fill="#fffdf9" stroke="#42634e" strokeWidth="2"/>{Array.from({length:12},(_,i)=>{const angle=(i+1)*Math.PI/6;return <text key={i} x={60+43*Math.sin(angle)} y={64-43*Math.cos(angle)} textAnchor="middle" fontSize="10" fill="#29352e">{i+1}</text>})}<line x1="60" y1="60" x2="60" y2="35" stroke="#29352e" strokeWidth="4" strokeLinecap="round" transform={`rotate(${(hour%12)*30+minute/2} 60 60)`}/><line x1="60" y1="60" x2="60" y2="21" stroke="#6b8f71" strokeWidth="3" strokeLinecap="round" transform={`rotate(${minute*6} 60 60)`}/><circle cx="60" cy="60" r="3" fill="#42634e"/></svg>
}

function PracticeRound({ topic, voice, setVoice, back }: Omit<Props,'moduleId'> & { topic: PracticeTopic; back: () => void }) {
  const [round, setRound] = useState(() => createPracticeRound(topic.exercises))
  const [index, setIndex] = useState(0), [input,setInput] = useState(''), [result,setResult] = useState<boolean | null>(null), [score,setScore] = useState(0), [missed,setMissed] = useState<PracticeQuestion[]>([]), [done,setDone] = useState(false), [playback,setPlayback] = useState<PlaybackStatus>('idle'), [started,setStarted] = useState(false)
  const question = round[index]
  useEffect(() => () => stopHungarian(), [question?.id])
  const restart = (retry: boolean) => {
    stopHungarian(); setRound(createPracticeRound(retry ? missed : topic.exercises)); setIndex(0); setInput(''); setResult(null); setScore(0); setMissed([]); setDone(false); setPlayback('idle')
  }
  const submit = (value: string) => {
    if (result !== null || !value.trim()) return
    setInput(value); const correct = checkPracticeAnswer(question, value); setResult(correct)
    if (correct) setScore(n=>n+1); else setMissed(prior=>[...prior,question])
  }
  const next = () => {
    stopHungarian(); setPlayback('idle')
    if (index+1 === round.length) { setDone(true); return }
    setIndex(n=>n+1); setInput(''); setResult(null)
  }
  const recording = question?.audioId ? PREVIEW_VOCABULARY.find(item => item.id === question.audioId) : undefined
  return <div className="practice-library"><button className="text-button" onClick={back}><ChevronLeft size={17}/>Practice activities</button><h2>{topic.title}</h2><p className="practice-intro">{topic.description}</p>
  {!started ? <section className="surface-section practice-lesson"><span className="eyebrow">Learn the pattern</span><p>{topic.lesson}</p>{topic.reference === 'countries' && <div className="practice-table-wrap"><table className="practice-table"><thead><tr><th>Place</th><th>English</th><th>Adjective</th><th>Example language</th><th>From</th></tr></thead><tbody>{COUNTRY_FORMS.map(([id,place,en,adj,,lang,origin])=><tr key={id}><td lang="hu">{place}</td><td>{en}</td><td lang="hu">{adj}</td><td lang="hu">{lang}</td><td lang="hu">{origin}</td></tr>)}</tbody></table><small>Languages shown are examples, not exclusive national languages.</small></div>}{topic.reference === 'plurals' && <div className="practice-table-wrap"><table className="practice-table"><thead><tr><th>Singular</th><th>Plural</th><th>English</th></tr></thead><tbody>{PLURAL_FORMS.map(([id,singular,plural,en])=><tr key={id}><td lang="hu">{singular}</td><td lang="hu">{plural}</td><td>{en}</td></tr>)}</tbody></table></div>}<button className="button button-primary" onClick={()=>setStarted(true)}>Start practice<ChevronRight size={17}/></button></section>
  : done ? <section className="study-panel results-panel"><h2>Practice complete</h2><strong className="result-score">{score}<small> / {round.length}</small></strong><p>Session score only. Vocabulary mastery is unchanged.</p><div className="study-controls"><button className="button button-primary" onClick={()=>restart(false)}><RotateCcw size={17}/>New round</button>{missed.length>0 && <button className="button" onClick={()=>restart(true)}>Retry {missed.length} missed</button>}</div></section>
  : <section className="study-panel practice-question"><div className="study-kicker"><span>Question {index+1} of {round.length}</span><span>{score} correct</span></div><p>{question.instruction}</p><h2 className="practice-prompt">{question.prompt}</h2>{question.kind === 'choice' ? <div className="answer-grid">{question.choices.map(choice=><button key={choice} disabled={result!==null} onClick={()=>submit(choice)}>{choice}<ChevronRight size={16}/></button>)}</div> : <form onSubmit={event=>{event.preventDefault();submit(input)}}><label htmlFor="practice-answer">Your answer</label><input id="practice-answer" value={input} onChange={event=>setInput(event.target.value)} disabled={result!==null} autoComplete="off" placeholder={question.kind==='clock'?'HH:MM':'Type your answer…'}/>{question.kind!=='clock' && <div className="accent-keys" aria-label="Hungarian characters">{'áéíóöőúüű'.split('').map(letter=><button className="button" type="button" key={letter} disabled={result!==null} onClick={()=>setInput(value=>value+letter)}>{letter}</button>)}</div>}<button className="button button-primary full-button" disabled={!input.trim()||result!==null}>Check answer</button></form>}
  {result!==null && <div className={`practice-feedback ${result?'feedback-success':'feedback-error'}`} role="status"><strong>{result?'Correct':'Review this answer'}</strong><p>Answer: <b>{question.answers.join(' / ')}</b></p><p>{question.explanation}</p>{question.clock && <Clock hour={question.clock[0]} minute={question.clock[1]}/>}<small>Source topic · page {question.page}</small></div>}
  {result!==null && recording && <div className="study-controls"><label className="voice-control"><span>Pronunciation voice</span><select value={voice} onChange={event=>{stopHungarian();setPlayback('idle');setVoice(event.target.value==='imre'?'imre':'anna')}}><option value="anna">Anna · Female</option><option value="imre">Imre · Male</option></select></label><button className="button" onClick={()=>playHungarian(recording,1,setPlayback,voice,true)}><Volume2 size={16}/>Listen to example</button></div>}{playback==='unavailable' && <p role="status" className="support-note">Audio unavailable. You can continue with the written example.</p>}
  {result!==null && <button className="button button-primary full-button practice-next" onClick={next}>{index+1===round.length?'See results':'Continue'}<ChevronRight size={17}/></button>}</section>}</div>
}
