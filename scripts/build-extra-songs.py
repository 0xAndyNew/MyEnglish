import math
import os
import struct
import subprocess
import tempfile
import wave

OUT_DIR = os.path.join(os.getcwd(), "public", "audio", "kids-songs")

SONGS = [
    {
        "filename": "fruits.mp3",
        "rate": 0,
        "bpm": 112,
        "melody": [60, 64, 67, 72, 69, 67, 64, 67, 65, 64, 62, 67, 64, 62, 60, 60],
        "lyrics": (
            "Sweet, sweet fruits, yummy every day! "
            "Apple, banana, come out and play! "
            "Orange and mango, golden and bright! "
            "Watermelon, grapes, juicy and light! "
            "Red strawberry, sweet little treat! "
            "Yummy fruits for kids to eat!"
        ),
    },
    {
        "filename": "seasons.mp3",
        "rate": -1,
        "bpm": 106,
        "melody": [60, 62, 64, 67, 64, 62, 60, 64, 67, 69, 72, 69, 67, 64, 62, 60],
        "lyrics": (
            "Four happy seasons spin round and round! "
            "Spring brings pretty flowers up from the ground! "
            "Summer shines sunny, warm skies so blue! "
            "Autumn drops gentle gold leaves for you! "
            "Winter brings snowflakes dancing at night! "
            "Every season is magical and bright!"
        ),
    },
    {
        "filename": "shapes.mp3",
        "rate": 0,
        "bpm": 114,
        "melody": [60, 60, 67, 67, 69, 69, 67, 67, 65, 65, 64, 64, 62, 62, 60, 60],
        "lyrics": (
            "Circle goes round like the bright yellow sun! "
            "Square has four sides, count every one! "
            "Triangle points up high to the sky! "
            "Twinkle little star goes way up high! "
            "Oval and diamond, heart full of cheer! "
            "Shapes are hiding everywhere right here!"
        ),
    },
    {
        "filename": "birthday.mp3",
        "rate": 0,
        "bpm": 116,
        "melody": [60, 60, 62, 60, 65, 64, 60, 60, 62, 60, 67, 65, 60, 60, 72, 69],
        "lyrics": (
            "Happy, happy birthday! Hip, hip, hooray! "
            "Blow out the candles and dance and play! "
            "Floating balloons up high in the room! "
            "Pop go the party poppers, boom, boom, boom! "
            "Open the gift box, share sweet cake! "
            "What a joyful birthday song we make!"
        ),
    },
    {
        "filename": "jobs.mp3",
        "rate": 0,
        "bpm": 110,
        "melody": [64, 67, 72, 67, 69, 65, 67, 64, 62, 65, 64, 62, 60, 64, 67, 60],
        "lyrics": (
            "Look around town at heroes we see! "
            "Doctor and nurse help you and me! "
            "Kind teacher reads a story with joy! "
            "Brave firefighter saves every girl and boy! "
            "Pilot flies high above the white cloud! "
            "Say thank you helpers, cheerful and loud!"
        ),
    },
    {
        "filename": "bedtime.mp3",
        "rate": -2,
        "bpm": 92,
        "melody": [64, 64, 67, 64, 64, 67, 64, 67, 72, 71, 69, 69, 67, 65, 64, 60],
        "lyrics": (
            "Twinkle little stars shine softly tonight. "
            "Crescent moon glows with gentle white light. "
            "Brush your teeth clean and hug Teddy tight. "
            "Close both your eyes, Mommy turns down the light. "
            "Good night, sweet dreams till the sun shines bright."
        ),
    },
]


def synth_sapi_wav(text: str, out_wav: str, rate: int = 0) -> None:
    escaped = text.replace("'", "''")
    ps = (
        "Add-Type -AssemblyName System.Speech; "
        "$s = New-Object System.Speech.Synthesis.SpeechSynthesizer; "
        "$s.SelectVoice('Microsoft Zira Desktop'); "
        f"$s.Rate = {rate}; "
        f"$s.SetOutputToWaveFile('{out_wav}'); "
        f"$s.Speak('{escaped}'); "
        "$s.Dispose()"
    )
    subprocess.run(["powershell", "-NoProfile", "-Command", ps], check=True)


def synth_melody_wav(out_wav: str, duration_sec: float, bpm: int, notes: list[int]) -> None:
    sample_rate = 44100
    total_samples = int(duration_sec * sample_rate)
    step_sec = 60.0 / bpm / 1.5

    buf = [0.0] * total_samples
    t = 0.0
    idx = 0
    while t < duration_sec:
        midi = notes[idx % len(notes)]
        freq = 440.0 * (2.0 ** ((midi - 69) / 12.0))
        chord_freq = freq * 0.5
        start_sample = int(t * sample_rate)
        note_len = int(min(step_sec * 1.4, duration_sec - t) * sample_rate)
        for s in range(note_len):
            pos = start_sample + s
            if pos >= total_samples:
                break
            dt = s / sample_rate
            env = math.exp(-dt * 5.2) * min(1.0, dt / 0.012)
            val = (
                0.24 * math.sin(2.0 * math.pi * freq * dt)
                + 0.06 * math.sin(2.0 * math.pi * freq * 2.0 * dt)
                + 0.10 * math.sin(2.0 * math.pi * chord_freq * dt)
            ) * env
            buf[pos] += val
        t += step_sec
        idx += 1

    fade_samples = min(int(0.8 * sample_rate), total_samples)
    for i in range(fade_samples):
        buf[total_samples - 1 - i] *= i / fade_samples

    with wave.open(out_wav, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        frames = bytearray()
        for v in buf:
            clamped = max(-0.95, min(0.95, v))
            frames.extend(struct.pack("<h", int(clamped * 32767)))
        wf.writeframes(bytes(frames))


def get_duration(path: str) -> float:
    res = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            path,
        ],
        capture_output=True,
        text=True,
        check=True,
    )
    return float(res.stdout.strip())


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for song in SONGS:
            vocal_wav = os.path.join(tmp, f"vocal_{song['filename']}.wav")
            bgm_wav = os.path.join(tmp, f"bgm_{song['filename']}.wav")
            out_mp3 = os.path.join(OUT_DIR, song["filename"])

            synth_sapi_wav(song["lyrics"], vocal_wav, song["rate"])
            dur = get_duration(vocal_wav) + 1.5
            synth_melody_wav(bgm_wav, dur, song["bpm"], song["melody"])

            subprocess.run(
                [
                    "ffmpeg",
                    "-y",
                    "-i",
                    vocal_wav,
                    "-i",
                    bgm_wav,
                    "-filter_complex",
                    "[0:a]asetrate=22050*1.08,aresample=44100,atempo=0.9259,adelay=350|350,volume=1.15[v];[1:a]aresample=44100,volume=0.40[b];[v][b]amix=inputs=2:duration=longest:dropout_transition=1,loudnorm=I=-16:TP=-1.5:LRA=11[a]",
                    "-map",
                    "[a]",
                    "-ac",
                    "2",
                    "-ar",
                    "44100",
                    "-b:a",
                    "128k",
                    out_mp3,
                ],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                check=True,
            )
            final_dur = get_duration(out_mp3)
            print(f"[OK] {song['filename']} ({final_dur:.1f}s)")


if __name__ == "__main__":
    main()
