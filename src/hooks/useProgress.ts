import { useEffect, useState } from 'react'
import type { AppProgress } from '../types'
import { loadProgress, saveProgress, STORAGE_KEY, BETA_STORAGE_KEY } from '../domain/storage'
import { createEmptyProgress } from '../domain/progress'

export function useProgress(preview = false, beta = false) {
  const key = beta ? BETA_STORAGE_KEY : STORAGE_KEY
  const [progress, setProgress] = useState<AppProgress>(() => preview ? createEmptyProgress() : loadProgress(undefined, key))
  useEffect(() => { if (!preview) saveProgress(progress, undefined, key) }, [progress, preview, key])
  return [progress, setProgress] as const
}
