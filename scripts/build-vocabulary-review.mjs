import { mkdir, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { MODULES, VOCABULARY } = await server.ssrLoadModule('/src/data/curriculum.ts')
await server.close()

const moduleNames = new Map(MODULES.map((module) => [module.id, module.title]))
const concerns = {
  'greetings-kerem': 'Corrected proposal to page 2 and “Please”; contextual uses still require reviewer confirmation.',
  'introductions-diak': 'Not located on cited page 5; the source uses “hallgató” for university student. Preserve this ID and reject if unsupported.',
  'appointments-idopont': 'Standalone source occurrence remains unconfirmed.',
  'hospital-objects-agy': 'Source occurrence remains unconfirmed.',
  'hospital-objects-gyogyszer': 'Corrected proposal to singular “gyógyszer” = “medication” on page 12.',
  'departments-gyogyszertar': 'Unsupported by cited page 17; page 16 uses “patika” for pharmacy. Do not replace this ID silently.',
  'unreviewed-example': 'Placeholder, not source curriculum. Rejected by project direction.',
  'hospital-objects-infuzio': 'The handwritten English gloss says “infection”; proposed “infusion” requires reviewer confirmation.',
  'departments-gyogyszeresz': 'The handwritten English gloss says “pharmacy”; proposed “pharmacist” corrects the person/place distinction and requires reviewer confirmation.',
  'departments-gyogytorna': 'The row is marked with a red X on page 16; treat the mark as a review flag.',
  'departments-intenziv': 'The row is marked with a red X on page 16; wording/context requires review.',
  'departments-gyermekosztaly': 'The row is marked with a red X on page 16; wording/context requires review.',
  'departments-fertozo-osztaly': 'The row is marked with a red X on page 16; wording/context requires review.',
}
const suggestions = {
  'greetings-kerem': 'Confirm “Kérem” = “Please” in the intended context and approve page 2 only if supported.',
  'introductions-diak': 'Locate source evidence or reject; review the separate new “introductions-hallgato” entry instead.',
  'appointments-idopont': 'Locate source evidence or reject without changing the ID.',
  'hospital-objects-agy': 'Locate source evidence or reject without changing the ID.',
  'hospital-objects-gyogyszer': 'Confirm the corrected page and translation.',
  'departments-gyogyszertar': 'Locate source evidence or reject; review the separate new “departments-patika” entry instead.',
  'unreviewed-example': 'Keep rejected; do not import as curriculum.',
}
const crossedOut = new Set(['departments-gyogytorna', 'departments-intenziv', 'departments-gyermekosztaly', 'departments-fertozo-osztaly'])
const originalIds = new Set([
  'greetings-jo-reggelt','greetings-jo-napot','greetings-viszontlatasra','greetings-koszonom','greetings-kerem',
  'introductions-mi-a-neve','introductions-diak','numbers-time-egy','numbers-time-hany-ora','appointments-rendeles',
  'appointments-idopont','hospital-objects-agy','hospital-objects-gyogyszer','departments-sebeszet','departments-rontgen',
  'departments-gyogyszertar','unreviewed-example',
])
const normalizedForms = new Map()
for (const item of VOCABULARY) {
  const key = item.hungarian.normalize('NFC').trim().toLocaleLowerCase('hu-HU')
  normalizedForms.set(key, [...(normalizedForms.get(key) ?? []), item.id])
}

const headers = ['Vocabulary ID','Module','Hungarian word or phrase','English translation','Source PDF page','Current verification status','Suspected problems','Suggested correction','Reviewer approval status']
const rows = VOCABULARY.map((item) => {
  const isNew = !originalIds.has(item.id)
  const duplicateIds = normalizedForms.get(item.hungarian.normalize('NFC').trim().toLocaleLowerCase('hu-HU'))
  const duplicateNote = duplicateIds.length > 1 ? ` Potential duplicate form across modules: ${duplicateIds.join(', ')}.` : ''
  const problem = (concerns[item.id] ?? (isNew ? 'New source transcription; requires character-by-character human verification.' : 'Existing provisional entry; requires final human verification.')) + duplicateNote
  const suggestion = suggestions[item.id] ?? (crossedOut.has(item.id) ? 'Reviewer must interpret the red X and explicitly approve or reject this entry.' : 'Compare with the cited page and approve, correct, or reject explicitly.')
  return [item.id, moduleNames.get(item.moduleId), item.hungarian, item.english, item.sourcePages.join(';'), `provisional / verified=${item.verified}`, problem, suggestion, item.id === 'unreviewed-example' ? 'rejected' : 'pending']
})

const quote = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`
const csv = [headers, ...rows].map((row) => row.map(quote).join(',')).join('\r\n') + '\r\n'
await mkdir('content/qa', { recursive: true })
await writeFile('content/qa/magyar-vocabulary-review.csv', `\uFEFF${csv}`, 'utf8')
console.log(`Wrote ${rows.length} provisional vocabulary rows.`)

