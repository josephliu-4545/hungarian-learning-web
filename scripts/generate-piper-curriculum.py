"""Generate local, unpublished Piper audio for the current curriculum."""
import argparse
import importlib.metadata
import json
from pathlib import Path
import re
import runpy
import subprocess
import sys
import wave

ROOT = Path(__file__).resolve().parents[1]
helpers = runpy.run_path(str(ROOT / "scripts" / "generate-piper-samples.py"))
MODELS = helpers["MODELS"]
OUTPUT = ROOT / ".piper-work" / "curriculum-preview"
sha256 = helpers["sha256"]
valid_wav = helpers["valid_wav"]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--voice", choices=("anna", "imre", "both"), default="both")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    from piper import PiperVoice
    version = importlib.metadata.version("piper-tts")
    result = subprocess.run(["node", "scripts/export-piper-curriculum.mjs"], cwd=ROOT, check=True, capture_output=True, encoding="utf-8")
    items = json.loads(result.stdout)
    if not items or len({item["id"] for item in items}) != len(items):
        raise ValueError("Empty curriculum or duplicate IDs")
    for item in items:
        if not re.fullmatch(r"[a-z0-9-]+", item["id"]) or not item["text"].strip():
            raise ValueError(f"Invalid curriculum item: {item['id']}")
    voices = ("anna", "imre") if args.voice == "both" else (args.voice,)
    MODELS.mkdir(parents=True, exist_ok=True)
    for label in voices:
        name = f"hu_HU-{label}-medium"
        model = MODELS / f"{name}.onnx"
        config = MODELS / f"{name}.onnx.json"
        if not model.is_file() or not config.is_file():
            subprocess.run([sys.executable, "-m", "piper.download_voices", "--data-dir", str(MODELS), name], check=True)
        fingerprint = {"voice": name, "piper_version": version, "model_sha256": sha256(model), "config_sha256": sha256(config)}
        folder = OUTPUT / label
        folder.mkdir(parents=True, exist_ok=True)
        voice = None
        generated = cached = 0
        for item in items:
            target = folder / f"{item['id']}.wav"
            metadata = target.with_suffix(".json")
            expected = {**fingerprint, "text": item["text"]}
            try:
                saved = json.loads(metadata.read_text(encoding="utf-8"))
            except (OSError, ValueError):
                saved = None
            if not args.force and valid_wav(target) and saved == expected:
                cached += 1
                continue
            if voice is None:
                voice = PiperVoice.load(str(model))
            temporary = target.with_suffix(".tmp")
            metadata.unlink(missing_ok=True)
            try:
                with wave.open(str(temporary), "wb") as audio:
                    voice.synthesize_wav(item["text"], audio)
                if not valid_wav(temporary):
                    raise RuntimeError(f"Invalid WAV: {item['id']}")
                temporary.replace(target)
                metadata.write_text(json.dumps(expected, ensure_ascii=False, indent=2), encoding="utf-8")
                generated += 1
            finally:
                temporary.unlink(missing_ok=True)
            print(f"{label}: {generated + cached}/{len(items)} {item['id']}", flush=True)
        print(f"{label}: {generated} generated, {cached} cached, {len(items)} total")
    print("Local preview ready. Start Vite and open http://localhost:5173/?preview=1")


if __name__ == "__main__":
    main()
