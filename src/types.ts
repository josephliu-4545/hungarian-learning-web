export type ModuleId = 'greetings' | 'introductions' | 'numbers-time' | 'appointments' | 'hospital-objects' | 'departments'
export type StudyMode = 'flashcards' | 'listening' | 'spelling' | 'quiz'
export type AssessedMode = 'listening' | 'spelling' | 'quiz'

export type VocabularyItem = { id: string; moduleId: ModuleId; hungarian: string; english: string; kind: 'word' | 'phrase'; sourcePages: number[]; verified: boolean; notes?: string; acceptedSpellings?: string[] }
export type LearningModule = { id: ModuleId; title: string; description: string; sourcePages: number[]; icon: string }
export type WordProgress = { seen: boolean; meaningCorrect: number; meaningIncorrect: number; spellingCorrect: number; spellingIncorrect: number; consecutiveIncorrect: number; needsReview: boolean; demoted?: boolean; lastPracticedAt?: string }
export type ModeStats = { correct: number; attempts: number }
export type AppProgress = { schemaVersion: 1; completedModuleIds: ModuleId[]; words: Record<string, WordProgress>; assessmentCorrect: number; assessmentAttempts: number; statsByMode: Record<AssessedMode, ModeStats>; lastModuleId?: ModuleId; updatedAt: string }

