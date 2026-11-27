import { useCallback, useEffect, useRef, useState, type SetStateAction } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { AppProgress } from '../types'
import type { PiperVoiceId } from '../data/audioManifest'
import { createEmptyProgress } from '../domain/progress'
import { loadProgress, BETA_STORAGE_KEY } from '../domain/storage'
import { planSync, sameLearningState, type CloudSnapshot, type LearningSnapshot } from '../domain/cloudSync'
import { readCloud, writeCloud } from '../domain/cloudRemote'
import { readAccountCache, writeAccountCache, type AccountCache } from '../domain/accountCache'

type Status = 'loading' | 'saved' | 'pending' | 'offline' | 'conflict' | 'import' | 'missing' | 'cache-error'
const empty = (): LearningSnapshot => ({ progress: createEmptyProgress(), voice: 'anna' })
type Initial = { cache: AccountCache | null; invalid: boolean }
function initial(id: string): Initial {
  try { return { cache: readAccountCache(id), invalid: false } }
  catch { return { cache: null, invalid: true } }
}
export function useCloudProgress(client: SupabaseClient, userId: string) {
  const [start] = useState(() => initial(userId))
  const current = useRef<AccountCache | null>(start.cache)
  const [snapshot, setSnapshot] = useState<LearningSnapshot | null>(start.cache?.local ?? null)
  const [status, setStatus] = useState<Status>(start.invalid ? 'cache-error' : 'loading')
  const [conflict, setConflict] = useState<CloudSnapshot | null>(null)
  const [guest, setGuest] = useState<AppProgress | null>(null)
  const [storageWarning, setStorageWarning] = useState(false)
  const blocked = useRef(start.invalid)
  const active = useRef(false)
  const kick = useRef<() => void>(() => {})
  const persist = useCallback((next: AccountCache) => {
    current.current = next
    try { writeAccountCache(userId, next); setStorageWarning(false) }
    catch { setStorageWarning(true) }
    setSnapshot(next.local)
  }, [userId])
  useEffect(() => {
    let alive = true, busy = false
    let timer: ReturnType<typeof setTimeout> | undefined
    active.current = true
    const schedule = () => {
      clearTimeout(timer)
      timer = setTimeout(() => { void sync() }, 600)
    }
    async function sync() {
      if (!alive || busy || blocked.current) return
      busy = true
      try {
        const remote = await readCloud(client,userId)
        if (!alive || blocked.current) return
        let state = current.current
        if (!state) {
          if (remote) { persist({local:remote,base:remote}); setStatus('saved'); return }
          const prior = loadProgress(undefined,BETA_STORAGE_KEY)
          if (Object.keys(prior.words).length || prior.assessmentAttempts || prior.completedModuleIds.length || prior.lastModuleId) {
            blocked.current = true; setGuest(prior); setStatus('import'); return
          }
          state = { local: empty(), base: null }
          persist(state)
        }
        const decision = planSync(state.local,state.base,remote)
        if (decision.kind === 'conflict') { blocked.current = true; setConflict(decision.remote); setStatus('conflict'); return }
        if (decision.kind === 'remote-missing') { blocked.current = true; setStatus('missing'); return }
        if (decision.kind === 'unchanged' || decision.kind === 'download') { persist({local:decision.remote,base:decision.remote}); setStatus('saved'); return }
        setStatus('pending')
        const sent = decision.local
        const saved = await writeCloud(client,userId,sent,decision.kind === 'upload' ? decision.expectedRevision : null)
        if (!alive) return
        if (!saved) { schedule(); return }
        const latest = current.current?.local ?? sent
        const changed = !sameLearningState(latest,sent)
        persist({local:changed ? latest : saved,base:saved})
        setStatus(changed ? 'pending' : 'saved')
        if (changed) schedule()
      } catch { if (alive) setStatus('offline') }
      finally { busy = false }
    }
    kick.current = schedule
    const onWake = () => { void sync() }
    const interval = setInterval(onWake,15000)
    window.addEventListener('online',onWake); window.addEventListener('focus',onWake)
    void sync()
    return () => { alive = false; active.current = false; clearTimeout(timer); clearInterval(interval); window.removeEventListener('online',onWake); window.removeEventListener('focus',onWake) }
  },[client,userId,persist])
  const change = useCallback((fn: (local: LearningSnapshot) => LearningSnapshot) => {
    const state = current.current
    if (!active.current || !state || blocked.current) return
    const local = fn(state.local)
    if (sameLearningState(local,state.local)) return
    persist({ ...state, local }); setStatus('pending'); kick.current()
  },[persist])
  const setProgress = useCallback((value: SetStateAction<AppProgress>) => change(local => ({...local,progress:typeof value === 'function' ? value(local.progress) : value})),[change])
  const setVoice = useCallback((voice: PiperVoiceId) => change(local => ({...local,voice})),[change])
  const startAccount = (importGuest: boolean) => {
    if (!guest) return
    persist({local:importGuest ? {progress:guest,voice:'anna'} : empty(),base:null})
    blocked.current = false; setGuest(null); setStatus('pending'); kick.current()
  }
  const resolve = (keepLocal: boolean) => {
    if (!conflict || !current.current) return
    persist({local:keepLocal ? current.current.local : conflict,base:conflict})
    blocked.current = false; setConflict(null); setStatus('pending'); kick.current()
  }
  const retry = () => { if (!blocked.current) kick.current() }
  const hasPending = () => {
    const c=current.current
    return !!c && (!c.base || !sameLearningState(c.local,c.base))
  }
  return { snapshot,status,guest,conflict,storageWarning,setProgress,setVoice,startAccount,resolve,retry,hasPending }
}
