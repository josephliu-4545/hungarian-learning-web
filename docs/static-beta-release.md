# Static beta release

The normal npm run build continues to produce the reviewed-only build in dist/. Until a human approves vocabulary, that edition has no learning cards. The explicit local beta build contains the 415 provisional learning entries (held entries excluded), all five study tabs, and Anna/Imre audio. It displays an educational beta notice and stores progress under a separate browser key. No preview query parameter, Piper, Python, backend or speech service is required on a student device.

## Local release verification (Windows PowerShell)

1. Stop the existing dev server if desired.
2. git pull --ff-only
3. npm ci (only if dependencies are missing or changed)
4. npm test; npm run lint; npm run build
5. .\.piper-venv\Scripts\python.exe scripts\generate-piper-curriculum.py
6. npm run build:beta
7. npm run preview:beta
8. Open http://localhost:4173/ (no preview query). Test each of six modules, all five study modes, both voices and slow playback, accented spelling, practice retries, refresh persistence, export/import and mobile width.

The beta packager verifies every expected WAV and its text, model/config fingerprints and metadata before packaging. It copies the clips into dist-beta/audio-beta/ and includes a per-recording hash manifest. If a clip is missing/stale, regenerate; no new beta is built. It deliberately uses WAV for compatibility, with the actual package size printed; MP3 optimization is a separate optional step. The package uses relative asset paths for static hosting. The normal dist folder is not overwritten. Do not commit model files, the venv, or generated output.

## Distribution gate

The beta is suitable for local testing and controlled educational review. Do not publish it publicly until rights to distribute the textbook-derived content and synthesized recordings have been confirmed, and a fluent Hungarian reviewer has checked the content and recordings. The model-assisted audit and successful playback are not that approval. Do not mark content verified merely to unlock the normal build. A later reviewed release requires approved vocabulary, individually approved voice assets, and approved practice content.

For private testing, share the resulting static folder only with authorized reviewers once the relevant sharing rights are confirmed. For hosting, use a static host with the contents of dist-beta as its root after the distribution gate is cleared. No runtime API keys or database are needed. Hosting limits and terms must be checked at deployment.
