# Mythical Train Journey — Project Handoff

A keyboard-driven, browser-based "train window" experience: a mythical rail journey
Karachi → Hawaii (Big Island) → San Francisco → Lisbon, with brick tunnels between
cities. Built entirely from AI-generated clips (Higgsfield) plus a hand-written
single-file HTML player. This doc is the handoff for continuing locally with Claude Code.

---

## 1. Concept & constraints (as evolved through the session)

- View is from a **train passenger window**: strict 90° side-on perspective,
  passenger-window height (~3m), **no window frame** in the footage (a physical
  metal plate on set surrounds the screen), no train parts, no vanishing point,
  no receding lines, the train's own tracks never visible.
- All scenery travels **right-to-left** (train moving "forward"), with parallax:
  near fast, mid medium, far slow.
- Cities are **endless loops** (no fixed repetition count). Tunnels are a **fixed
  chain**: city→tunnel transition → tunnel (exactly 1 cycle, no looping) →
  tunnel→next-city transition.
- Original deliverable was a fixed 450s MP4 (4 cities × 90s + 3 tunnels × 30s);
  the project later pivoted to the interactive web player (the MP4 assemblies
  still exist, see §4).

## 2. Final clip roster (the winners)

All hosted on Higgsfield CDN, base URL:
`https://d8j0ntlcm91z4.cloudfront.net/user_3CkO7uW4kLN7beBuWrOrFiFPoSh/`

City loops — Seedance 2.0 Mini, 15s, 720p, 16:9, native ambient audio:

| Segment | Job ID | File |
|---|---|---|
| Karachi loop | 1bb23aa0 | hf_20260706_184807_1bb23aa0-6f3e-46fe-a371-c992e2c3770c.mp4 |
| Hawaii loop | 3adbdfe5 | hf_20260706_231741_3adbdfe5-84f1-40a1-87e4-21a290f26526.mp4 |
| San Francisco loop | 6b9ac00c | hf_20260706_185446_6b9ac00c-cb49-4a81-8a32-e013e7d38317.mp4 |
| Lisbon loop | a1adb59e | hf_20260707_002258_a1adb59e-5309-4ec7-8281-bb1c77ed5775.mp4 |

Tunnel + transitions — Kling 3.0, 15s, 720p, sound on (except the two Seedance SF ones):

| Segment | Model | Job ID | File |
|---|---|---|---|
| Tunnel loop (1 cycle) | Kling 3.0 | 33662d28 | hf_20260706_055108_33662d28-2019-4398-a3b3-d1c74c77f3d3.mp4 |
| Karachi → Tunnel | Kling 3.0 | 7a77d922 | hf_20260706_055132_7a77d922-e20d-4cab-a4e5-7c96fcf63fed.mp4 |
| Tunnel → Hawaii | Kling 3.0 | 95316a97 | hf_20260706_060649_95316a97-c497-4131-8474-8c716dac15b6.mp4 |
| Hawaii → Tunnel | Kling 3.0 | dbd449c2 | hf_20260706_062519_dbd449c2-f03c-4b21-a7cd-88ea4cb5106f.mp4 |
| Tunnel → San Francisco | Seedance 2.0 std | b5f68075 | hf_20260706_063148_b5f68075-f0e7-4c69-941e-333b31b82eb5.mp4 |
| San Francisco → Tunnel | Seedance 2.0 std | 5a3cff0d | hf_20260706_063201_5a3cff0d-65dc-45ae-88f3-9d92385ff26e.mp4 |
| Tunnel → Lisbon | Kling 3.0 | 179e5a1f | hf_20260706_062557_179e5a1f-47c0-4625-928f-fded57621e0a.mp4 |

Start-frame stills (nano_banana_2, 16:9, used as video start/end anchors):
Karachi `3c27152e`, Hawaii `75d4959b`, SF `8f0d8c33`, Lisbon `218fc37a`,
big-brick tunnel wall `700dfb90` (bright friendly red brick, NO lamps/fixtures).

## 3. Hard-won generation lessons (important for any regeneration)

1. **Direction control is unreliable.** Seedance family (all sizes) frequently
   ignores or inverts left/right instructions, especially at 15s. What works:
   the "side-scrolling backdrop" framing ("objects appear at the X edge, cross
   the frame, disappear off the Y edge"), then **check the output and flip the
   stated direction and re-roll if wrong**. It is per-seed random, not a
   systematic inversion. Budget re-rolls.
2. **Do NOT pin start+end to the same frame for loops** — the model plays the
   motion backward/boomerangs to reach the end frame. Use start_image only and
   demand constant velocity; loop seams are handled by the player's wipes.
3. **Positive motion language beats negative.** "Opens mid-motion at cruising
   speed, holds that exact velocity every frame, closes mid-motion as if cut
   from an endless shot" works better than "no easing".
4. Kling 3.0 was the most direction-obedient for transitions; Seedance 2.0 had
   the nicest city imagery; Mini was the cost/quality sweet spot for loops.
5. Anti-zoom clause that worked: "camera bolted in place; framing/zoom/FOV on
   the last frame IDENTICAL to the first; no push-in, no dolly, no pan, no tilt."
6. Transition clips use start_image = city still, end_image = tunnel still (or
   reverse), with the brick wall described as entering "FROM THE RIGHT EDGE
   (the direction new scenery always comes from)".

## 4. Fixed MP4 assemblies (Higgsfield explainer_video, free)

- v1 (obsolete clips): job `01d9890d`
- v2, 72 blocks, 1280×720, exactly 450s: job `bc6818c3`
  (structure: city 5s-loops ×15 + 15s exit; tunnel 15s ×1 + 15s arrival; Lisbon ×18 —
  note this predates the final 15s city loops and the light-free tunnel isn't in it).
If a fresh fixed MP4 is wanted, re-assemble from §2 winners:
Karachi ×5 → K→T → tunnel ×1 → T→H → Hawaii ×5 → H→T → tunnel → T→SF → SF ×5 →
SF→T → tunnel → T→L → Lisbon ×6 = 30 blocks of 15s = 450s.

### Current browser export script

Use the committed export wrapper for the current interactive player:

```bash
scripts/export-train-journey.sh
```

It records `http://localhost:8000/` for 460s by default, auto-starts
`python3 -m http.server 8000` if nothing is already serving localhost, captures
the exact 1280×720 browser viewport through headless Chrome DevTools, records
the page's Web Audio output, and writes:

```text
exports/train-journey-screen-record.mp4
```

Smoke test without waiting for the full journey:

```bash
scripts/export-train-journey.sh --duration 5 --out exports/export-smoke.mp4
```

Useful overrides: `--url`, `--duration`, `--out`, `--cdp-port`, `--chrome`,
and `--no-server`.

## 5. The web player — `train-journey-player.html`

Single self-contained HTML file, no build step, streams clips from the CDN.
Needs to be served over http(s) — **file:// breaks the YouTube music** (that's
the only reason for hosting). `python3 -m http.server` is sufficient.

### Segment model
13 segments: `city` (endless, self-looping via wipes), `trans` (plays once,
auto-advances), `tunnel` (plays exactly ONE cycle, auto-advances). Order:
Karachi, K→T, Tunnel, T→H, Hawaii, H→T, Tunnel, T→SF, SF, SF→T, Tunnel, T→L, Lisbon.

### Controls
- Boot: paused on Karachi's first frame.
- **Space / →**: from a city, depart (starts the auto tunnel chain). During
  city→tunnel or tunnel: skip to the tunnel→city arrival clip. During an
  arrival clip: skip to the next city. Ignored at Lisbon.
- **← / Backspace**: cross-fade directly to the previous CITY (skips the tunnel
  chain entirely; from inside a chain, returns to the departed city).
- **Tab**: tweak pane (per-clip start/end trims + per-city music URLs, ordered
  by appearance; "Copy JSON" exports `{trims, music}` for hardcoding).
- Mouse move / touch / any key wakes the HUD; hint + dots fade after 4s.
  The subtitle (city/transition name, 30px) NEVER fades.

### Rendering machinery
- Two stacked `<video>` layers; only the active one visible; the idle layer
  preloads the next file invisibly (earlier bug: idle layer painted a frozen
  frame on top — fixed by explicit opacity management).
- **Every boundary is a wipe** (including a loop wiping into a fresh copy of
  itself and transition→loop handoffs): both videos playing, a 200px vertical
  band sweeps right→left; right of band = incoming, left = outgoing, with a
  linear alpha gradient inside the band via CSS mask-image, plus a moving
  `backdrop-filter: blur(10px)` bar. Clip audio crossfades with the sweep.
  A scheduler rAF fires the wipe `WIPE_MS` (1100ms) before the trimmed end of
  the current clip so nothing ever stalls or goes silent.
- Back-navigation uses a fade-on-top (old keeps playing beneath; no black dip).
- Dots row (bottom, under subtitle): 13 micro progress bars — at rest each is a
  circle (width == height == rounded ends); the current one stretches into a
  pill whose white fill tracks playback over the trimmed range; done = filled.

### Trims (baked defaults; Tab pane still live)
```json
{
  "karachi": {"start": 0, "end": 0},
  "hawaii":  {"start": 0, "end": 0},
  "sf":      {"start": 0, "end": 0},
  "lisbon":  {"start": 0, "end": 0},
  "tunnel":  {"start": 0, "end": 0},
  "k2t":  {"start": 7, "end": 0},
  "t2h":  {"start": 3, "end": 5.5},
  "h2t":  {"start": 6, "end": 3},
  "t2sf": {"start": 0, "end": 6},
  "sf2t": {"start": 2, "end": 3},
  "t2l":  {"start": 0, "end": 3}
}
```

### Music (YouTube IFrame API, hidden 1px players)
- Defaults: Karachi `eK5gPcFjQps`, Hawaii `V1bFr2SWP1I`,
  SF `A-7XPCNrD5Y`, Lisbon `-sze5rpbklM`.
- **Starts** (fade-in 2.5s, from t=0, no looping) when the tunnel→city ARRIVAL
  transition starts (Karachi: on initial departure keypress; back-nav into a
  city also starts its track).
- Plays untouched through all city loops.
- **Departure envelope**, driven by the city→tunnel clip's live progress over
  its trimmed range: 0–50% = pan phase; 50–100% = linear volume fade 100→0;
  100% = paused.
- **KNOWN LIMITATION**: true stereo panning of YouTube iframe audio is
  impossible (Web Audio can't attach cross-origin). The 0–50% phase currently
  holds volume steady. `musicDepartureEnvelope(progress)` is the hook — if
  music sources become direct MP3s, route them through an `<audio>` element +
  `AudioContext` + `StereoPannerNode` and ramp pan 0→-1 in that phase.
- Browsers require a user gesture for audio; the first keypress satisfies it.

## 6. Hosting status / open items

- Goal: a public URL (file:// kills YouTube API). Higgsfield website hosting
  (`create_website`) returned **422 Unprocessable Entity** twice (request IDs
  `0c993508-d12d-4ef7-aa6e-494086157db6`, `393dc201-6b58-43fa-af71-5ac596429083`)
  — unresolved; possibly plan-gated. Workarounds: Netlify Drop / tiiny.host
  (rename to `index.html`), or local `python3 -m http.server`.
- Open/possible next steps:
  - Real stereo pan (requires direct audio files, see §5 music limitation).
  - Fresh fixed-MP4 assembly from the final winners (§4 recipe) if wanted.
  - Optional: preload ALL clips at boot; touch/click controls; fullscreen.
  - Hardcode tweak-pane values once final and strip the pane.

## 7. Account/context notes

- Higgsfield connected via MCP; credits were topped up twice during the session;
  generation costs: nano_banana_2 image ≈1.5cr; Seedance Mini 15s/720p ≈37.5cr;
  Seedance 2.0 std 15s ≈67.5cr; Kling 3.0 15s std+sound = 30cr; assembly free.
- The physical installation supplies the metal window frame around the screen,
  so all footage is full-bleed with no frame.
