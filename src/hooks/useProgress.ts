import { useEffect, useState } from 'react'
import type { AppProgress } from '../types'
import { loadProgress, saveProgress } from '../domain/storage'
import { createEmptyProgress } from '../domain/progress'

export function useProgress(preview = false) {
  const [progress, setProgress] = useState<AppProgress>(() => preview ? createEmptyProgress() : loadProgress())
  useEffect(() => { if (!preview) saveProgress(progress) }, [progress, preview])
  return [progress, setProgress] as const
}
