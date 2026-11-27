# Hungarian pronunciation and study sessions

The app now refuses to speak Hungarian text using a non-Hungarian browser voice. Install a Hungarian voice on the device if available; reload and retry. Browser voices vary in quality and are not certified native-speaker recordings.

For consistent audio across devices, put licensed, reviewer-approved MP3 files in `public/audio/` and add the stable vocabulary ID, exact Hungarian text, relative file path, source type and reviewer to `src/data/audioManifest.ts`. A changed word will not use the old recording. Playback prefers the static asset, then a Hungarian browser voice; failed audio is reported. No recordings or API credentials are included in this branch.

For native-quality audio, either obtain consent and redistribution rights for a native speaker's recordings or evaluate licensed Hungarian neural voices from an official provider. Compare samples with a fluent speaker (Jó reggelt, Köszönöm szépen, gyógyszer, gyógyszerész, vérnyomásmérő, nőgyógyászat, egészség, szívesen). Record the provider, voice, version, license, exact text and reviewer before adding each clip. Do not publish provisional vocabulary.

Questions and answer choices are generated once per session; distractors are sampled from the current module, with obvious shared translations excluded. Listening answers unlock only after audio finishes. Quiz restarts generate fresh questions and directions; missed questions can be retried using the original distractor pool, without counting a shortened retry as a completed module; spelling order is shuffled, flashcards can be shuffled manually. Semantic ambiguity still needs language review. Preview progress stays in memory and is not written to normal storage.

Run npm ci, npm test, npm run lint and npm run build before merging. Manually verify real Hungarian audio on a device, repeated quiz restarts and option stability after an answer, and preview isolation.
