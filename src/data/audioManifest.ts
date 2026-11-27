// Only include reviewed pronunciation files with confirmed redistribution rights.
// Paths are relative to public/ (for example, audio/greetings-jo-reggelt.mp3).
export type ApprovedAudio = { text: string; path: string; source: 'native-recording' | 'hungarian-neural-tts'; reviewer: string }
export const approvedAudio: Readonly<Record<string, ApprovedAudio | undefined>> = {}
