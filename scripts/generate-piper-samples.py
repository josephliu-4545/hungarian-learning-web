"""Generate local, unpublished Hungarian pronunciation samples using Piper."""
import argparse
import hashlib
import html
import importlib.metadata
import json
from pathlib import Path
import subprocess
import sys
import wave

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / ".piper-work"
MODELS = WORK / "models"
OUTPUT = WORK / "samples"
VOICES = ("hu_HU-anna-medium", "hu_HU-imre-medium")
SAMPLES = (
    ("jo-reggelt", "Jó reggelt!"),
    ("koszonom-szepen", "Köszönöm szépen."),
    ("gyogyszer", "gyógyszer"),
    ("gyogyszeresz", "gyógyszerész"),
    ("vernyomasmero", "vérnyomásmérő"),
    ("nogyogyaszat", "nőgyógyászat"),
    ("egeszseg", "egészség"),
    ("szivesen", "Szívesen"),
)


def sha256(path):
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def valid_wav(path):
    try:
        with wave.open(str(path), "rb") as audio:
            return audio.getnframes() > 0 and audio.getframerate() > 0
    except (OSError, EOFError, wave.Error):
        return False


def write_index():
    rows = []
    for sample_id, text in SAMPLES:
        cells = []
        for voice in VOICES:
            relative = f"{voice}/{sample_id}.wav"
            if valid_wav(OUTPUT / relative):
                cells.append(f'<td><audio controls preload="none" src="{relative}"></audio></td>')
            else:
                cells.append("<td>Not generated</td>")
        rows.append(f"<tr><th lang='hu'>{html.escape(text)}</th>{''.join(cells)}</tr>")
    document = """<!doctype html><html lang="en"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Magyar | Piper pronunciation comparison</title>
<style>
body{font:16px/1.55 system-ui,sans-serif;background:#f7f6f2;color:#29352e;margin:0;padding:24px}
main{max-width:980px;margin:auto} h1{font-weight:600} table{border-collapse:collapse;width:100%;background:#fffdf9}
td,th{padding:12px;text-align:left;border-bottom:1px solid #e2e5de} audio{width:250px;max-width:100%}
.wrap{overflow:auto} small{color:#53635a}
</style><main><h1>Hungarian pronunciation comparison</h1>
<p>Compare Anna and Imre. Ask a fluent Hungarian speaker to check vowel length, consonants, stress, and naturalness.</p>
<p><small>Unapproved synthetic speech for private evaluation only. These samples are not published in the learning app.</small></p>
<div class="wrap"><table><thead><tr><th>Hungarian</th><th>Anna</th><th>Imre</th></tr></thead><tbody>"""
    (OUTPUT / "index.html").write_text(document + "".join(rows) + "</tbody></table></div></main></html>", encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--voice", choices=(*VOICES, "both"), default="both")
    parser.add_argument("--force", action="store_true", help="Regenerate existing samples")
    args = parser.parse_args()
    try:
        from piper import PiperVoice
        version = importlib.metadata.version("piper-tts")
    except ImportError:
        parser.exit(1, "Piper is missing. Install it with: python -m pip install piper-tts\n")
    MODELS.mkdir(parents=True, exist_ok=True)
    OUTPUT.mkdir(parents=True, exist_ok=True)
    voices = VOICES if args.voice == "both" else (args.voice,)
    for name in voices:
        model = MODELS / f"{name}.onnx"
        config = MODELS / f"{name}.onnx.json"
        if not model.is_file() or not config.is_file():
            subprocess.run([sys.executable, "-m", "piper.download_voices", "--data-dir", str(MODELS), name], check=True)
        fingerprint = {"voice": name, "piper_version": version, "model_sha256": sha256(model), "config_sha256": sha256(config)}
        folder = OUTPUT / name
        folder.mkdir(exist_ok=True)
        voice = None
        for sample_id, text in SAMPLES:
            target = folder / f"{sample_id}.wav"
            metadata = folder / f"{sample_id}.json"
            expected = {**fingerprint, "text": text}
            try:
                saved = json.loads(metadata.read_text(encoding="utf-8"))
            except (OSError, ValueError):
                saved = None
            if not args.force and valid_wav(target) and saved == expected:
                print(f"Cached: {name}/{sample_id}")
                continue
            if voice is None:
                voice = PiperVoice.load(str(model))
            temporary = target.with_suffix(".tmp")
            try:
                with wave.open(str(temporary), "wb") as audio:
                    voice.synthesize_wav(text, audio)
                if not valid_wav(temporary):
                    raise RuntimeError(f"Invalid WAV: {sample_id}")
                temporary.replace(target)
                metadata.write_text(json.dumps(expected, ensure_ascii=False, indent=2), encoding="utf-8")
            finally:
                temporary.unlink(missing_ok=True)
            print(f"Generated: {name}/{sample_id}")
        write_index()
    print(f"\nOpen in your browser: {OUTPUT / 'index.html'}")


if __name__ == "__main__":
    main()
