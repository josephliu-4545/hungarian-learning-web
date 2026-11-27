import { describe, expect, it } from 'vitest'
import { approvedPath, type VoiceRecordings } from '../data/audioManifest'

describe('approved pronunciation assets', () => {
  const manifest: Record<string, VoiceRecordings> = { example: { anna: { text: 'Jó napot', path: 'audio/anna.wav', source: 'piper-tts', reviewer: 'test' }, imre: { text: 'Jó napot', path: 'audio/imre.wav', source: 'piper-tts', reviewer: 'test' } } }
  it('selects each voice independently', () => {
    expect(approvedPath('example', 'Jó napot', 'anna', manifest)).toBe('audio/anna.wav')
    expect(approvedPath('example', 'Jó napot', 'imre', manifest)).toBe('audio/imre.wav')
  })
  it('rejects stale text, unknown IDs and missing voices', () => {
    expect(approvedPath('example', 'Jó reggelt', 'anna', manifest)).toBeUndefined()
    expect(approvedPath('unknown', 'Jó napot', 'anna', manifest)).toBeUndefined()
    expect(approvedPath('example', 'Jó napot', 'imre', { example: { anna: manifest.example.anna } })).toBeUndefined()
  })
})
