import type { VocabularyItem } from '../types'
import { approvedPath, type PiperVoiceId } from '../data/audioManifest'
import { isBeta } from './releaseMode'

export function betaAudioPath(id: string, voice: PiperVoiceId): string | undefined {
  return /^[a-z0-9-]+$/.test(id) && (voice === 'anna' || voice === 'imre') ? `audio-beta/${voice}/${id}.wav` : undefined
}

export type PlaybackStatus = 'idle' | 'loading' | 'playing' | 'played' | 'unavailable'

let generation = 0
let activeAudio: HTMLAudioElement | undefined
let cancelVoiceWait: (() => void) | undefined

export function selectHungarianVoice<T extends { lang: string }>(voices: readonly T[]): T | undefined {
  const locale = (voice: T) => voice.lang.toLowerCase().replace(/_/g, '-')
  return voices.find((voice) => locale(voice) === 'hu-hu') ?? voices.find((voice) => /^hu(?:-|$)/.test(locale(voice)))
}

export function stopHungarian() {
  generation++
  cancelVoiceWait?.()
  cancelVoiceWait = undefined
  if (activeAudio) { activeAudio.pause(); activeAudio = undefined }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
}

export function playHungarian(item: VocabularyItem, rate: number, onStatus: (status: PlaybackStatus) => void, voice: PiperVoiceId = 'anna', preview = false) {
  stopHungarian()
  const token = generation
  const current = () => token === generation
  onStatus('loading')
  const fallback = () => {
    if (!current()) return
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') { onStatus('unavailable'); return }
    const synth = window.speechSynthesis
    const speak = () => {
      if (!current()) return true
      const voice = selectHungarianVoice(synth.getVoices())
      if (!voice) return false
      const utterance = new SpeechSynthesisUtterance(item.hungarian)
      utterance.lang = voice.lang
      utterance.voice = voice
      utterance.rate = rate
      utterance.onstart = () => { if (current()) onStatus('playing') }
      utterance.onend = () => { if (current()) onStatus('played') }
      utterance.onerror = () => { if (current()) onStatus('unavailable') }
      try { synth.speak(utterance) } catch { if (current()) onStatus('unavailable') }
      return true
    }
    if (speak()) return
    const clear = () => { window.clearTimeout(timer); synth.removeEventListener('voiceschanged', retry); cancelVoiceWait = undefined }
    const retry = () => { if (speak()) clear() }
    const timer = window.setTimeout(() => { clear(); if (!speak() && current()) onStatus('unavailable') }, 900)
    cancelVoiceWait = clear
    synth.addEventListener('voiceschanged', retry)
  }
  const previewPath = import.meta.env.DEV && preview ? `__piper_preview/${voice}/${encodeURIComponent(item.id)}.wav?text=${encodeURIComponent(item.hungarian)}` : undefined
  const path = previewPath ?? (isBeta ? betaAudioPath(item.id, voice) : item.verified ? approvedPath(item.id, item.hungarian, voice) : undefined)
  if (path) {
    const audio = new Audio(import.meta.env.BASE_URL + path)
    activeAudio = audio
    audio.playbackRate = rate
    let failed = false
    const recover = () => { if (!current() || failed) return; failed = true; audio.pause(); activeAudio = undefined; if (isBeta) onStatus('unavailable'); else fallback() }
    audio.addEventListener('playing', () => { if (current() && !failed) onStatus('playing') })
    audio.addEventListener('ended', () => { if (current() && !failed) onStatus('played') })
    audio.addEventListener('error', recover, { once: true })
    try { audio.play().catch(recover) } catch { recover() }
  } else if (isBeta) onStatus('unavailable'); else fallback()
}
