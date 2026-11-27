import { useEffect, useState } from 'react'
import type { AppProgress } from '../types'
import { loadProgress, saveProgress } from '../domain/storage'

export function useProgress() {
  const [progress, setProgress] = useState<AppProgress>(() => loadProgress())
  useEffect(() => { saveProgress(progress) }, [progress])
  return [progress, setProgress] as const
}

