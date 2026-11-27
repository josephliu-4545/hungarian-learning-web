import type { LearningModule, VocabularyItem } from '../types'
import { PROVISIONAL_VOCABULARY } from './provisionalVocabulary'

export const MODULES: LearningModule[] = [
  { id: 'greetings', title: 'Greetings & Everyday Expressions', description: 'Essential greetings and polite phrases', sourcePages: [2, 3], icon: '👋' },
  { id: 'introductions', title: 'Introductions & Personal Information', description: 'Names, nationalities, and occupations', sourcePages: [3, 4, 5, 6], icon: '💬' },
  { id: 'numbers-time', title: 'Numbers & Time', description: 'Numbers, clocks, and telling time', sourcePages: [7, 8, 9, 10], icon: '🕐' },
  { id: 'appointments', title: 'Medical Appointments', description: 'Appointments and medical specialists', sourcePages: [11], icon: '📅' },
  { id: 'hospital-objects', title: 'In the Hospital', description: 'Objects, equipment, and locations', sourcePages: [12, 13, 14, 15], icon: '🏥' },
  { id: 'departments', title: 'Hospital Departments', description: 'Departments and services', sourcePages: [16, 17], icon: '✚' },
]

// Provisional seed set: reviewed for safe MVP testing, but still requires final fluent-speaker language QA.
export const VOCABULARY: VocabularyItem[] = [
  { id: 'greetings-jo-reggelt', moduleId: 'greetings', hungarian: 'Jó reggelt', english: 'Good morning', kind: 'phrase', sourcePages: [2], verified: false },
  { id: 'greetings-jo-napot', moduleId: 'greetings', hungarian: 'Jó napot', english: 'Good day', kind: 'phrase', sourcePages: [2], verified: false },
  { id: 'greetings-viszontlatasra', moduleId: 'greetings', hungarian: 'Viszontlátásra', english: 'Goodbye', kind: 'word', sourcePages: [2], verified: false },
  { id: 'greetings-koszonom', moduleId: 'greetings', hungarian: 'Köszönöm', english: 'Thank you', kind: 'word', sourcePages: [3], verified: false },
  { id: 'greetings-kerem', moduleId: 'greetings', hungarian: 'Kérem', english: 'Please', kind: 'word', sourcePages: [2], verified: false },
  { id: 'introductions-mi-a-neve', moduleId: 'introductions', hungarian: 'Mi a neve?', english: 'What is your name?', kind: 'phrase', sourcePages: [3], verified: false },
  { id: 'introductions-diak', moduleId: 'introductions', hungarian: 'diák', english: 'student', kind: 'word', sourcePages: [5], verified: false },
  { id: 'numbers-time-egy', moduleId: 'numbers-time', hungarian: 'egy', english: 'one', kind: 'word', sourcePages: [7], verified: false },
  { id: 'numbers-time-hany-ora', moduleId: 'numbers-time', hungarian: 'Hány óra van?', english: 'What time is it?', kind: 'phrase', sourcePages: [9], verified: false },
  { id: 'appointments-rendeles', moduleId: 'appointments', hungarian: 'rendelés', english: 'consultation hours', kind: 'word', sourcePages: [11], verified: false },
  { id: 'appointments-idopont', moduleId: 'appointments', hungarian: 'időpont', english: 'appointment', kind: 'word', sourcePages: [11], verified: false },
  { id: 'hospital-objects-agy', moduleId: 'hospital-objects', hungarian: 'ágy', english: 'bed', kind: 'word', sourcePages: [12], verified: false },
  { id: 'hospital-objects-gyogyszer', moduleId: 'hospital-objects', hungarian: 'gyógyszer', english: 'medication', kind: 'word', sourcePages: [12], verified: false },
  { id: 'departments-sebeszet', moduleId: 'departments', hungarian: 'sebészet', english: 'surgery', kind: 'word', sourcePages: [16], verified: false },
  { id: 'departments-rontgen', moduleId: 'departments', hungarian: 'röntgen', english: 'X-ray', kind: 'word', sourcePages: [16], verified: false },
  { id: 'departments-gyogyszertar', moduleId: 'departments', hungarian: 'gyógyszertár', english: 'pharmacy', kind: 'word', sourcePages: [17], verified: false },
  { id: 'unreviewed-example', moduleId: 'departments', hungarian: 'ellenőrizetlen', english: 'unreviewed', kind: 'word', sourcePages: [16], verified: false },
  ...PROVISIONAL_VOCABULARY,
]

export const VERIFIED_VOCABULARY = VOCABULARY.filter((item) => item.verified)

