import type { VocabularyItem } from '../types'
import { approvedAudio } from '../data/audioManifest'

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

export function playHungarian(item: VocabularyItem, rate: number, onUnavailable: (unavailable: boolean) => void) {
  stopHungarian()
  const token = generation
  const current = () => token === generation
  onUnavailable(false)
  const fallback = () => {
    if (!current()) return
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') { onUnavailable(true); return }
    const synth = window.speechSynthesis
    const speak = () => {
      if (!current()) return true
      const voice = selectHungarianVoice(synth.getVoices())
      if (!voice) return false
      const utterance = new SpeechSynthesisUtterance(item.hungarian)
      utterance.lang = voice.lang
      utterance.voice = voice
      utterance.rate = rate
      utterance.onerror = () => { if (current()) onUnavailable(true) }
      try { synth.speak(utterance) } catch { if (current()) onUnavailable(true) }
      return true
    }
    if (speak()) return
    if (synth.getVoices().length) { onUnavailable(true); return }
    const clear = () => { window.clearTimeout(timer); synth.removeEventListener('voiceschanged', retry); cancelVoiceWait = undefined }
    const retry = () => { if (speak()) clear() }
    const timer = window.setTimeout(() => { clear(); if (!speak() && current()) onUnavailable(true) }, 900)
    cancelVoiceWait = clear
    synth.addEventListener('voiceschanged', retry)
  }
  const recording = approvedAudio[item.id]
  if (recording && recording.text.normalize('NFC') === item.hungarian.normalize('NFC')) {
    const audio = new Audio(import.meta.env.BASE_URL + recording.path)
    activeAudio = audio
    audio.playbackRate = rate
    let failed = false
    const recover = () => { if (!current() || failed) return; failed = true; audio.pause(); activeAudio = undefined; fallback() }
    audio.addEventListener('error', recover, { once: true })
    audio.play().catch(recover)
  } else fallback()
}
