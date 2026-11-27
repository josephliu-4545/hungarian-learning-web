// Only include reviewed pronunciation files with confirmed redistribution rights.
export type PiperVoiceId = 'anna' | 'imre'
export type ApprovedAudio = { text: string; path: string; source: 'native-recording' | 'hungarian-neural-tts' | 'piper-tts'; reviewer: string }
export type VoiceRecordings = Partial<Record<PiperVoiceId, ApprovedAudio>>
export const approvedAudio: Readonly<Record<string, VoiceRecordings | undefined>> = {}

export function approvedPath(id: string, text: string, voice: PiperVoiceId, manifest = approvedAudio): string | undefined {
  const recording = manifest[id]?.[voice]
  return recording && recording.text.normalize('NFC') === text.normalize('NFC') ? recording.path : undefined
}
