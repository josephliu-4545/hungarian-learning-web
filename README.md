# Magyar Learning

A calm, mobile-first Hungarian vocabulary practice app for international students learning everyday and medical Hungarian. The MVP is a static React application: there is no account, server, database, tracking service, or API key.

## Local development

Requires a current Node.js LTS release.

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite. Other commands:

```bash
npm test       # Vitest + Testing Library
npm run lint   # ESLint
npm run build  # Type-check and create dist/
```

## Curriculum and content QA

Curriculum is deliberately separate from the UI in `src/data/curriculum.ts`. Every entry has a stable ID, module ID, Hungarian text in Unicode NFC, English meaning, kind, source pages, and a `verified` flag.

The curriculum is an expanded **provisional transcription for review**. Every entry remains excluded from live activities until a fluent Hungarian speaker or teacher explicitly approves it. The source PDF is handwritten study material and is not treated as authoritative structured content.

The current reviewer register is `content/qa/magyar-vocabulary-review.csv`. Regenerate it from typed curriculum data with `npm run qa:vocabulary`, and follow `docs/content-review-process.md` before changing any `verified` flag.

Data-entry workflow:

1. Manually transcribe one item from the permitted source, retaining its page number.
2. Normalize Hungarian text to Unicode NFC; preserve every accent.
3. Have a qualified reviewer verify spelling, meaning, grammar, and any accepted alternative.
4. Keep crossed-out, unclear, or inconsistent material at `verified: false` with an editorial note.
5. Only after review, change `verified` to `true`. Live activities filter the data and cannot expose false entries.
6. Never publish scans or arbitrary PDF fragments through this app.

Stable IDs must not be changed casually because local progress is keyed by word ID. If IDs or the progress format change, add an explicit migration or increment the backup schema version.

## Learning and progress rules

- A card opening changes a word from New to Learning but cannot create mastery.
- Mastery requires two correct meaning/listening/quiz responses and one correct spelling response.
- One assessed error flags a word for review. Two consecutive assessed errors demote a mastered word to Learning.
- A later correct reassessment clears the flag; flipping a card does not.
- Module completion is separate: a final quiz score of at least 80% completes a module.
- Accuracy counts checked submissions only. Empty histories display “Not started.”

Progress is saved after changes in `localStorage` under `magyar-learning-progress:v1`. JSON import is size- and schema-validated, rejects unknown word IDs, previews the studied-word count, and requires overwrite confirmation. Invalid imports do not replace current progress. Reset also requires confirmation.

## Text-to-speech limitations

Listening uses the browser's `speechSynthesis` API and prefers a voice whose locale begins with `hu`. Voice availability and quality depend on the operating system and browser. If speech is unavailable, the activity presents a text fallback and remains usable. The app does not record audio or claim to assess pronunciation.

## Static deployment

Run `npm run build` and publish the generated `dist/` directory to any static host (for example GitHub Pages, Netlify, Cloudflare Pages, or Render Static Sites). No server runtime or environment variables are required. Configure the host's build command as `npm run build` and publish directory as `dist`.

## Source scope

The six module definitions map to pages 2–17 of `Magyar.pdf`. The original scan is not copied into this repository or shown in the app. Final vocabulary counts must always be derived from the verified entries rather than estimates.

