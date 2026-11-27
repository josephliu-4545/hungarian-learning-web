# Hungarian Vocabulary Review and Approval

This procedure prepares curriculum changes without publishing unreviewed handwriting or changing stable vocabulary IDs. The review register is `content/qa/magyar-vocabulary-review.csv`; application data is split between the original records in `src/data/curriculum.ts` and expanded provisional records in `src/data/provisionalVocabulary.ts`.

## Reviewer role

The final reviewer must be a fluent Hungarian speaker, preferably a teacher or a medical professional familiar with Hungarian terminology. The PDF is a set of handwritten study notes, not an authoritative dictionary. Crossed-out marks, English annotations, and apparent translations are evidence to inspect, not automatic approval.

## Allowed approval statuses

- `pending`: not decided; the application must keep `verified: false`.
- `approved`: the reviewer has confirmed the Hungarian spelling, accents, English meaning, grammar, source page, and context.
- `rejected`: unsuitable, unsupported, duplicated, or intentionally excluded; the application must keep `verified: false`.

Use these exact lowercase values. Do not use blanks, initials, colors, or free-form substitutes as the decision.

## Review procedure

1. Run `npm run qa:vocabulary`, then open `Magyar.pdf` and the CSV side by side. Locate every row on the stated source page.
2. Confirm the Hungarian text character by character, including long vowels (`á é í ó ő ú ű`) and Unicode NFC normalization.
3. Confirm the English meaning and its context. Prefer one clear student-facing meaning; record any genuinely accepted alternate spelling separately in code after approval.
4. Check whether the item is a word or phrase and whether formality, number, or medical context changes the meaning.
5. Resolve the text in `Suspected problems`. Enter the final reviewed text in the Hungarian, English, or source-page columns; do not alter `Vocabulary ID` or `Module`.
6. Set `Reviewer approval status` to `approved` only when all required fields are complete and supported. Otherwise leave it `pending` or set it to `rejected`.
7. Save the file as UTF-8 CSV and retain the header names and column order.

## Import safety

Stable IDs are the compatibility boundary for local progress and exported backups. Never rename, regenerate, or recycle an existing ID. A corrected Hungarian form, English meaning, or page reference must remain attached to the existing ID.

Before applying decisions, map each CSV row to the existing `VOCABULARY` item by `Vocabulary ID` and call `validateApprovedReviewRows` from `src/domain/curriculumQa.ts`. The validator:

- rejects unknown or duplicate IDs;
- rejects module changes;
- ignores `pending` and `rejected` rows;
- rejects approved rows with empty text or invalid/missing source pages; and
- returns only explicit approvals with the original stable ID and `verified: true`.

The validator does not modify files or browser storage. After it accepts the reviewed rows, a developer may update only the matching fields in `src/data/curriculum.ts`, keeping the ID unchanged. Review the resulting diff before setting `verified: true`.

## Required checks after an approved import

Run:

```bash
npm test
npm run lint
npm run build
```

Confirm that existing localStorage keys and backup schema remain unchanged. Do not edit `WordProgress`, `AppProgress`, `STORAGE_KEY`, vocabulary IDs, or backup schema version as part of content approval.

## Current audit notes

- The register contains all 198 proposed rows across all six modules: 22 greetings, 32 introductions, 59 numbers/time, 11 appointments, 34 hospital-equipment, and 40 department records.
- No duplicate stable IDs were detected. Two exact Hungarian forms (`kardiológus`, `urológus`) intentionally appear in both introductions and appointments; the CSV flags both for reviewer confirmation rather than deduplicating them automatically.
- No blank Hungarian text, English translation, or source-page list was detected.
- All Hungarian strings are currently NFC-normalized; no obvious accent omission was detected by structural checks.
- Several entries have source-location or translation-context concerns recorded in the CSV. These require human judgment and must not be auto-corrected.
- `unreviewed-example` is a placeholder rather than supported curriculum and is marked rejected, without deleting its stable ID.
- `introductions-diak`, `appointments-idopont`, `hospital-objects-agy`, and `departments-gyogyszertar` remain preserved but carry unresolved source-traceability flags.
- New replacement concepts use new IDs: `introductions-hallgato` and `departments-patika` do not overwrite the unsupported originals.

