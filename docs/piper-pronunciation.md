# Piper pronunciation evaluation

Piper runs locally as a development tool only. No API key, backend, or runtime speech service is required. The website does not ship Piper, ONNX models, or unreviewed samples.

## Windows setup

From the project root, in PowerShell, with 64-bit Python 3.11 or 3.12 installed:

```powershell
py -3.12 -m venv .piper-venv
.\.piper-venv\Scripts\python.exe -m pip install piper-tts
.\.piper-venv\Scripts\python.exe scripts\generate-piper-samples.py
Start-Process .\.piper-work\samples\index.html
```

If you have Python 3.11 instead, use `py -3.11` for the venv command. The first run needs internet to install Piper and download the two models. Subsequent generation uses local models. Use `--voice hu_HU-anna-medium` or `--voice hu_HU-imre-medium` to generate only one voice, or `--force` to regenerate. Existing valid files are reused when model, config, text and Piper version match.

The local comparison page contains eight evaluation phrases for each model (16 WAV clips total). Open it independently of Vite. To share the comparison privately, zip the entire `.piper-work/samples` folder; the recipient can extract it and open index.html. Do not publish these files as approved learning content.

## Review

Have a fluent Hungarian speaker compare the two voices for vowel length, ő/ű, consonants, initial stress, intelligibility and naturalness. Choose a voice or reject both. Record reviewer feedback, provider/model version and applicable terms before generating the curriculum. Anna and Imre model cards list CC0 datasets, but the engine and model rights and any output redistribution terms should be reviewed separately before publishing.

Sources:
- https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/API_PYTHON.md
- https://huggingface.co/rhasspy/piper-voices/blob/main/hu/hu_HU/anna/medium/MODEL_CARD
- https://huggingface.co/rhasspy/piper-voices/blob/main/hu/hu_HU/imre/medium/MODEL_CARD

After a voice and curriculum entries are approved, generate recordings for the exact approved Hungarian text, validate each clip, and add the approved assets and manifest entries to the existing static audio playback architecture. WAV is supported by browsers; MP3 is optional for smaller downloads. Do not mark vocabulary as verified merely because audio exists.

## Both voices in the local learning preview

With the existing Piper virtual environment and models installed, run from the project root:

```powershell
.\.piper-venv\Scripts\python.exe scripts\generate-piper-curriculum.py
npm run dev
```

The script reads the current TypeScript curriculum via Vite, excludes the rejected placeholder, generates both voices and caches unchanged files. With the current 197 eligible provisional entries this is 394 clips. Open http://localhost:5173/?preview=1 and choose Anna or Imre on flashcards, listening or spelling. The choice is shared during the current app session. Files remain in the ignored .piper-work/curriculum-preview folder. A Vite development-only endpoint checks the exact text and voice before serving local WAV files, and is not registered for production builds. Do not expose the development server publicly.

Production remains gated: only reviewed static assets with a matching approved vocabulary entry can play. Add recordings per vocabulary ID and voice in audioManifest.ts after approval. No provisional recordings are copied into public/ or the production build.
