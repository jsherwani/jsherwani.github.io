# Strong & Steady — Plan of Record and PWA Build Spec

This document has two parts:

1. **The fitness plan** (what the app implements)
2. **The app spec** (a static, offline-first PWA deployed to GitHub Pages, no backend, no push notifications)

It is written to be handed directly to a coding agent. Where the spec says "MUST," treat it as an acceptance criterion.

---

## Part 1 — The Fitness Plan

### 1.1 User profile

- Age 46, ~150 lb (68 kg), no injuries or limitations
- Goals: **strength gain and longevity** (not fat loss)
- Prior barbell experience (squat, deadlift, bench); does not want to depend on a gym
- Can currently do a few pull-ups
- Already walks **4 hours/day on a treadmill desk at 1.6 mph, 5° incline** (≈8.7% grade, ≈4.2 METs, moderate intensity, ≈6.4 miles/day)
- Does hourly "grease the groove" (GTG) pull-ups during the workday
- 30 minutes/day available for dedicated training

### 1.2 Equipment (all owned, nothing to buy)

- Adjustable dumbbells
- Pull-up bar
- Resistance band(s) + door anchor
- Yoga mat
- Backpack (only for weighted pull-ups later)

The app also supports optional/occasional equipment: kettlebell, barbell + rack, gymnastics rings, jump rope (see §2.6 Equipment switching).

### 1.3 Weekly schedule

| Day | Session (30 min) | Extras |
|---|---|---|
| Mon | Strength A | jumps in warm-up |
| Tue | Vigorous intervals (~15 min) + mobility (~15 min) | |
| Wed | Strength B | 5 min jumps in warm-up |
| Thu | Mobility + balance + core (~30 min) | optional VILPA snacks |
| Fri | Strength A (or Strength C once unlocked) | jumps in warm-up |
| Sat | Vigorous intervals (different mode than Tue) + farmer's carries | |
| Sun | Rest / easy walk / long mobility | |
| Every workday | Hourly GTG pull-ups | treadmill desk as normal |

### 1.4 Strength A (Mon, Fri) — push/pull/vertical/core

Antagonist supersets. Rest 60–90 s between paired exercises.

| # | Exercise | Sets × reps | Pattern | Notes |
|---|---|---|---|---|
| A1 | Push-up (progression ladder) | 3 × 8–15 | Horizontal push | superset with A2 |
| A2 | Band row via door anchor | 3 × 10–15 | Horizontal pull | superset with A1 |
| B1 | Pull-up | 3 × (max − 2) | Vertical pull | leave ~2 reps in reserve |
| C1 | Dumbbell overhead press | 3 × 8–12 | Vertical push | superset with C2. Replaces pike push-up. |
| C2 | Plank (or band deadbug) | 3 × 30–45 s | Core anti-extension | superset with C1 |

### 1.5 Strength B (Wed) — squat/hinge/single-leg/carry/core

| # | Exercise | Sets × reps | Pattern | Notes |
|---|---|---|---|---|
| A1 | Goblet squat or bodyweight squat ladder | 3 × 8–15 | Squat | superset with A2 |
| A2 | Dumbbell Romanian deadlift | 3 × 8–12 | Hinge | **anchor lift**; double progression |
| B1 | Bulgarian split squat or single-leg RDL (dumbbells) | 3 × 8–12 per leg | Single-leg | |
| B2 | Farmer's carry (both dumbbells) | 3 × 30–40 s | Carry / grip | |
| C1 | Band Pallof press via door anchor | 3 × 10 per side | Core anti-rotation | |

### 1.6 Strength C (optional, unlocks later)

Rotates in when the user has advanced past the middle of the ladders: archer push-ups, ring rows / ring push-ups, Nordic curl negatives, hanging leg raises, weighted pull-ups (backpack). The app should suggest C for the Friday slot once ≥2 patterns are past ladder step 3.

### 1.7 Programming rules (apply to every strength session)

- **Effort:** most sets stop at **1–2 reps in reserve (RIR)**. Occasionally 0–1 RIR on safe movements (push-ups, rows, RDL). Never grind bodyweight skill moves to failure.
- **Tempo:** ~2 s lowering, brief pause, then up with intent (fast concentric).
- **Sets:** 2–4 per movement; 3 is the default.
- **Rest:** 60–90 s between paired exercises.
- **Progression rule (the single most important rule):**
  - Hit the **top of the rep range with clean form for two consecutive sessions** → advance.
  - Bodyweight exercises advance by **ladder step** (harder variation).
  - Dumbbell exercises advance by **double progression**: add reps until the top of the range, then add the smallest load increment and drop back to the bottom of the range.
  - If an exercise is impossible at the current step → regress one step.
- **Deload:** every 6–8 weeks, or when performance drops for 2 sessions in a row, do one week at ~50% volume (same exercises, half the sets).
- **Barbell re-acclimation:** if the user switches to barbells, the first 2–3 weeks run at 3+ RIR before pushing effort.

### 1.8 Progression ladders (per movement pattern)

| Pattern | Step 1 | Step 2 | Step 3 | Step 4 | Step 5 |
|---|---|---|---|---|---|
| Horizontal push | Incline push-up | Push-up | Feet-elevated push-up | Archer push-up | One-arm push-up negatives → one-arm |
| Horizontal pull | Band row (light) | Band row (heavy/doubled) or ring row | Feet-elevated ring row | Archer row | Front-lever row progressions |
| Vertical pull | Negative pull-ups | Pull-up | Weighted pull-up (backpack) | Archer pull-up | One-arm negatives |
| Vertical push | DB overhead press (double progression) | — | Pike push-up (optional branch) | Elevated pike push-up | Wall handstand push-up |
| Squat | Bodyweight squat | Goblet squat (double progression) | Split squat | Shrimp squat | Pistol squat |
| Hinge | DB RDL (double progression) | Single-leg RDL | Nordic curl negatives | Nordic curl | — |
| Single-leg | Split squat | Bulgarian split squat (DB) | Single-leg RDL (DB) | Skater squat | Pistol |
| Core anti-extension | Plank | Long-lever plank | Band deadbug | Ab-wheel (knees) | Hanging leg raise |
| Core anti-rotation | Pallof press | Pallof press + step-out | Pallof press (heavier band) | — | — |

Dumbbell-loaded steps do not have a "next step" until the dumbbells max out; they progress by load.

### 1.9 Hourly GTG pull-ups (separate daily task)

- **Each set = 40–50% of current max reps**, rounded down, minimum 1. Max 5 → 2 reps per set.
- One set per hour during configured work hours (default 6–8 sets/day), 5 days/week.
- **One full rest day per week** (default Sunday; configurable).
- **Never to failure**, perfect form every rep.
- Rotate grip across the week: pronated (pull-up), supinated (chin-up), neutral (if the bar allows).
- **Retest max every 1–2 weeks** (the app prompts). Recalculate target.
- **Ache flag:** if the user marks elbow/shoulder discomfort, reduce that week's per-set target by ~30% (round down, min 1) and show a note.
- **Stall rule:** if max hasn't increased in 3–4 weeks, suggest reducing GTG volume (fewer sets/day) for one week rather than adding.
- Long-term path: more reps → weighted (backpack) → archer → one-arm negatives.

### 1.10 Vigorous cardio (Tue, Sat)

The treadmill desk is moderate intensity and does not train VO₂max. Two hard sessions per week:

- **Norwegian 4×4:** 4 min hard (can barely speak) / 3 min easy × 4 rounds, plus warm-up/cool-down. ~25 min total, ~16 min hard.
- **Short intervals:** 30–60 s hard / 1–2 min easy × 8–10 rounds. Modes: jump rope, burpees, stair sprints, hill sprints, treadmill at a steep incline/fast pace.
- Use a **different mode on Tue vs Sat**.
- Log: mode, rounds, session RPE (1–10).
- **VILPA snacks:** brisk stair climbs or 1–2 min hard bursts during the day, logged as a one-tap counter.

### 1.11 Power / impact (Mon, Wed, Fri warm-ups)

- 2–3 sets × 3–5 reps of broad jumps, box jumps, jump squats, or pogo hops.
- At 150 lb this is the primary bone-loading stimulus; keep it in the plan for life.
- **Joint-pain flag:** if the user marks pain on impact, swap to low-impact power (fast band/dumbbell concentric reps, kettlebell swings) for two weeks.

### 1.12 Mobility & balance (Tue, Thu, plus Sun optional)

10–15 min (30 min on Thu). Checklist:

- Calf/soleus stretch, ankle dorsiflexion (wall knee-to-wall)
- Couch stretch (hip flexors)
- Hamstring and hip mobility (90/90, pigeon)
- Thoracic extension and rotation
- Deep squat hold (accumulate 2–3 min)
- Single-leg balance: eyes open → eyes closed, log seconds per leg

### 1.13 Supporting habits (daily checklist)

- Protein ~1.6 g/kg → **~110 g/day**
- Creatine monohydrate **3–5 g/day**
- Sleep **7–9 h**
- Body weight (weekly)

### 1.14 Benchmarks (every 8–12 weeks; app prompts)

| Benchmark | Unit |
|---|---|
| Max pull-ups | reps |
| Max push-ups | reps |
| Dead hang | seconds |
| Single-leg balance, eyes closed | seconds (each leg) |
| Sit-to-rise test | score /10 |
| Standing broad jump | inches or cm |
| Grip strength (if dynamometer) | kg |
| Resting heart rate | bpm |
| 1-mile walk time or Cooper 12-min distance | min or m |

### 1.15 Decade adaptations (informational, shown in the Plan screen)

- **40s:** build the base, push ladders, establish intervals.
- **50s:** keep intensity; emphasize power and impact; protect tendons; keep protein high.
- **60s:** prioritize power, balance, carries; joint-friendly variations; extra recovery days.
- **70s+:** power and balance become the priority; reduce impact if joints demand; never drop resistance training or intervals.

### 1.16 Automatic adjustment thresholds (smart alerts)

| Condition | Alert |
|---|---|
| GTG max unchanged for 3–4 weeks | "Reduce GTG volume for a week" |
| Benchmark VO₂ proxy not improving | "Intervals not hard enough — aim for can't-talk effort" |
| Hinge load unchanged for 4 weeks with reps at top of range | "Add load to RDL" |
| Joint-pain flag on impact | "Swap jumps for low-impact power for 2 weeks" |
| 6–8 weeks since last deload, or 2 consecutive performance drops | "Deload week" |
| Any exercise at top of range 2 sessions in a row | "Advance to [next step]" |

---

## Part 2 — App Spec

### 2.1 Summary

A single-user, **fully static, offline-first PWA** served from GitHub Pages. No backend, no accounts, no analytics, no push notifications. All data lives in IndexedDB on the device, with JSON export/import for backup. Reminders are handled by a generated calendar file and/or the user's own phone alarms.

Design principles:

1. **One-tap-first.** The Today screen has one primary button. Every log pre-fills from the last session.
2. **Never break the chain twice.** Streaks reward consistency; a single miss never resets; a 2-minute "minimum viable" session still counts.
3. **Honest science.** Every plan item has a short "Why this works" card with a real citation and an honesty flag where evidence is weak.
4. **Equipment-agnostic.** Every slot is a movement pattern; the app picks the best exercise for the day's equipment while keeping per-variant history.
5. **Zero maintenance.** Static hosting, no server, no dependencies that need a build service beyond GitHub Actions.

### 2.2 Tech stack

- **Vite + Svelte + TypeScript** (plain Svelte SPA, not SvelteKit, to avoid adapter/base-path complexity)
- **vite-plugin-pwa** with `injectManifest` (Workbox) for precaching and offline
- **Dexie.js** for IndexedDB
- **uPlot** or **Chart.js** for trend charts (keep bundle small)
- Client-side routing with hash routing (`#/today`, `#/workout`) so GitHub Pages needs no 404 rewrite
- No UI framework required; a small hand-written CSS with light/dark via `prefers-color-scheme`
- Tests: Vitest for the pure logic modules (progression engine, GTG math, treadmill math, streaks)

### 2.3 GitHub Pages deployment

- **Repo:** `<username>.github.io` (user site, served at the domain root) is simplest and avoids base-path issues. If a project repo is used instead, set Vite `base: '/<repo>/'` and the PWA `scope`/`start_url` to match.
- **Deploy:** GitHub Actions workflow (`.github/workflows/deploy.yml`) using `actions/checkout`, `actions/setup-node`, `npm ci && npm run build`, then `actions/upload-pages-artifact` + `actions/deploy-pages`. Enable Pages → Source: GitHub Actions.
- GitHub Pages serves HTTPS, which service workers require.
- `manifest.webmanifest` MUST include: `name`, `short_name`, `start_url`, `scope`, `display: "standalone"`, `theme_color`, `background_color`, 192×192 and 512×512 PNG icons (plus a maskable icon). Add `<link rel="apple-touch-icon">` and `<meta name="apple-mobile-web-app-capable" content="yes">` for iOS.
- Service worker MUST precache the app shell so the app opens fully offline after first load. Use `registerType: 'prompt'` and show a small "Update available — reload" toast.

### 2.4 iOS specifics (the user is on a phone; assume iPhone is possible)

- The app MUST detect iOS + not-standalone (`navigator.standalone !== true` and `!matchMedia('(display-mode: standalone)').matches`) and show a one-time coach mark: "Tap Share → Add to Home Screen." Home-screen install exempts the app from Safari's 7-day storage eviction and enables wake lock.
- Call `navigator.storage.persist()` on launch (best-effort).
- Use the **Screen Wake Lock API** during the workout player and interval timers (feature-detect).
- The **Vibration API is unavailable on iOS**; timers MUST use Web Audio beeps (unlocked by a user gesture at timer start). Use vibration additionally where available.
- **No Apple Health / Health Connect access from a web app.** Walking is manual entry (one number: hours). Document an optional iOS Shortcut workaround in Settings help text but do not depend on it.
- No notification permission is requested anywhere. No badge API.

### 2.5 Reminders (no push)

- **Settings → Reminders** generates a downloadable `.ics` with:
  - A daily all-days event at the user's workout deadline time with an alarm (e.g., 19:00), labeled with the day's session type
  - Hourly events during work hours on GTG days with a 0-minute alarm, labeled "GTG set"
  - Optional Sunday "rest" event with no alarm
- Provide a short help block describing the alternative: iOS Shortcuts → Automation → Time of Day, or Clock alarms.
- The Today screen shows "Not logged yet" state prominently so opening the app is itself the reminder.

### 2.6 Equipment switching

**Profiles:** `minimal` (bands, bar, mat, backpack) · `dumbbells` (default for this user) · `kettlebell` · `barbell` · `rings`. Multiple can be active. A per-session "Today I have…" toggle overrides the default without changing it.

Every plan slot references a **movement pattern**. Each pattern has a list of **exercise variants** tagged with required equipment and a priority per profile. The player picks the highest-priority variant available; the user can override with one tap. Progress history is stored per variant; the pattern stores the ladder pointer for bodyweight variants.

| Pattern | Minimal | Dumbbells (default) | Kettlebell | Barbell |
|---|---|---|---|---|
| Horizontal push | Push-up ladder | Push-up ladder (DB floor press optional) | KB floor press | Bench press |
| Horizontal pull | Band row / ring row | Band row / DB row | KB row | Barbell row |
| Vertical push | Band overhead press | **DB overhead press** | KB press | Overhead press |
| Vertical pull | Pull-up ladder | Pull-up ladder (weighted via backpack) | Weighted pull-up | Weighted pull-up |
| Squat | BW ladder | **Goblet squat** or BW ladder | Goblet squat | Back/front squat |
| Hinge | Backpack RDL / band good morning | **DB RDL** | KB RDL / swing | Deadlift / RDL |
| Single-leg | Split squat / SL RDL | **DB Bulgarian split squat / DB SL RDL** | KB SL RDL | Barbell split squat |
| Carry / grip | Backpack carry / dead hang | **Farmer's carry** | KB farmer/suitcase carry | Barbell hold |
| Core anti-extension | Plank / band deadbug | Plank / DB plank drag | Plank | Barbell rollout |
| Core anti-rotation | Band Pallof press | Band Pallof press | KB Pallof | Landmine/cable Pallof |
| Power | Jumps | Jumps (DB jump squat light) | KB swing | Jumps (unloaded) |
| Conditioning | Jump rope / burpees / stairs | same | KB swing intervals | Barbell complex (advanced) |

Rep ranges and RIR are the same across tiers. Loaded variants use double progression; bodyweight variants use ladders. Science cards swap by tier (bands-vs-weights card on minimal; heavy-loading/bone card on barbell).

### 2.7 Tracking scope

| Domain | What is logged | Tap budget |
|---|---|---|
| Workout | completion, minimum-viable flag, duration; per set: variant, reps, load, RIR | 1 tap per set (pre-filled), 1 tap to finish |
| GTG | timestamp, reps, grip; derived: sets/day, daily/weekly totals, current max, target, retest due, ache flag | 1 tap "Log set at target" |
| Walking | hours (defaults 1.6 mph / 5°, editable); derived distance, steps, METs, kcal | 1 number |
| Intervals | mode, rounds, RPE; built-in 4×4 and custom interval timers | timer auto-logs |
| Power | type, sets × reps, joint-pain flag | 1 tap |
| Mobility/balance | checklist ticks; balance seconds L/R | ticks + 2 numbers |
| VILPA | counter | 1 tap |
| Habits | protein (g or ✓), creatine ✓, sleep h, weight | ticks |
| Benchmarks | 9 metrics; prompt every 8–12 weeks | guided runner |
| Deload | scheduled/active flag | auto |

**Treadmill math (ACSM walking equation):**

```
speed_m_min = mph * 26.8
grade = tan(degrees * π / 180)        // 5° → 0.0875
vo2 = 0.1 * speed_m_min + 1.8 * speed_m_min * grade + 3.5   // mL/kg/min
mets = vo2 / 3.5
kcal_per_min = vo2 * weight_kg / 1000 * 5
distance_miles = mph * hours
steps ≈ distance_miles * 2000 * (1.1)   // ~2,200 steps/mile at slow pace; make the per-mile constant a setting
```

For 1.6 mph, 5°, 68 kg, 4 h: ≈4.2 METs, ≈4.9 kcal/min, ≈1,180 kcal, ≈6.4 mi. Show these as estimates.

**GTG target math:** `target = max(1, floor(currentMax * 0.45))`; with ache flag: `max(1, floor(target * 0.7))`.

**Streak logic:** a day counts if the scheduled session is logged (full or minimum-viable) or it is the rest day. One missed day shows "Don't miss twice" and does not reset; two consecutive misses reset. Streak freezes: 1 per calendar month, applied automatically to the first miss.

### 2.8 Screens

1. **Today (home)**
   - Header: date, streak, weekly scorecard mini-bar (strength days done / 3, vigorous sessions / 2, WHO minutes)
   - Primary button: **Start [Strength A]** (auto-selected from schedule). Secondary: "Log minimum version (2 min)."
   - GTG widget: current max, target, sets logged today (dots per work hour), big "Log set" button, grip selector, "Retest due" chip when applicable, ache toggle
   - Walking: hours input (pre-filled 4.0), computed metrics line
   - Habit ticks: protein, creatine, sleep, VILPA +1
   - Smart alerts list (dismissable)
2. **Workout player**
   - One superset pair per screen: exercise name, ladder step or load, target reps, RIR chip, tempo cue, "Why" link to science card
   - Rest timer between pairs with beep; wake lock on
   - Set rows pre-filled from last session; tap to confirm, long-press to edit
   - "Swap variant" and "Equipment today" controls
   - Finish → summary with PRs and any "Advance!" prompts
3. **Intervals**
   - Preset 4×4 and custom interval timers; mode picker; RPE at end; auto-log
4. **Mobility / Balance**
   - Checklist with optional timers; balance seconds input
5. **Progress**
   - Charts: GTG daily total + max, RDL load, pull-up max, walking hours/week, each benchmark; PR list; benchmark runner
6. **Plan**
   - Weekly schedule, Strength A/B/C tables, ladders with current position highlighted, rules, decade adaptations
7. **Science**
   - All cards, searchable, with citations and honesty flags (content in §2.10)
8. **Settings**
   - Equipment profiles; work hours; GTG rest day; deadline time; weight; step constant; export JSON/CSV; import JSON; generate `.ics`; reset data; install/coach mark status

### 2.9 Data model (Dexie tables)

```ts
settings        { id: 1, weightKg, workStart, workEnd, gtgRestDay, deadlineTime,
                  equipmentDefault: string[], stepsPerMile, unitSystem, lastDeloadDate }
patterns        { id, name, ladderStep }                       // ladderStep applies to bodyweight variants
variants        { id, patternId, name, equipment: string[], priority: Record<profile, number>,
                  progression: 'ladder'|'double', repMin, repMax, ladderIndex? }
planDays        { id, weekday, type: 'A'|'B'|'C'|'intervals'|'mobility'|'rest',
                  slots: { patternId, sets, repMin, repMax, superset }[] }
sessions        { id, date, planDayId, equipment: string[], completed, minimumViable, durationSec }
sets            { id, sessionId, variantId, setIndex, reps, load, rir, createdAt }
gtgEntries      { id, ts, reps, grip }
gtgState        { id: 1, currentMax, lastRetest, acheFlagUntil, retestIntervalDays }
walkLogs        { id, date, hours, mph, degrees }              // derived values computed on read
intervalLogs    { id, date, mode, rounds, rpe, durationSec }
powerLogs       { id, date, type, sets, reps, jointPain }
mobilityLogs    { id, date, items: string[], balanceL, balanceR }
vilpaLogs       { id, date, count }
habitLogs       { id, date, proteinG, creatine, sleepH, weightKg }
benchmarks      { id, date, metric, value }
alerts          { id, date, type, message, dismissed }
```

Pure logic modules (unit-tested): `progression.ts` (advance/regress rules), `gtg.ts` (target, retest due, stall detection), `treadmill.ts` (ACSM math), `streak.ts`, `alerts.ts` (threshold engine), `ics.ts`.

### 2.10 Science cards (content to ship verbatim, one per plan item)

Each card: title · 2–3 plain sentences · citation · honesty flag if any.

- **Bands work as well as weights.** Elastic-resistance training produced strength gains statistically indistinguishable from conventional weights. *Lopes JSS et al., SAGE Open Medicine 2019; 7:2050312119831116.*
- **A little goes a long way.** One hard set of 6–12 reps, 2–3×/week, produces significant strength gains in trained men. *Androulakis-Korakakis P, Fisher JP, Steele J. Sports Medicine 2020; 50:751–765.*
- **Light loads build muscle too.** Taken near failure, light loads build similar muscle to heavy loads; heavy loads still win for max strength. *Schoenfeld BJ et al. J Strength Cond Res 2017; 31(12):3508–3523.*
- **Stop shy of failure.** Training 1–3 reps from failure builds nearly the same muscle with less fatigue and joint stress. *Refalo MC et al. Sports Medicine 2023; 53:649–665.*
- **Free weights vs machines.** Gains are largely specific to how you train; hypertrophy is similar across modalities. *Haugen ME et al. BMC Sports Sci Med Rehabil 2023; 15:103.*
- **Fitness is survival.** Cardiorespiratory fitness is inversely associated with mortality with no observed upper limit. *Mandsager K et al. JAMA Network Open 2018; 1(6):e183605.*
- **4×4 intervals in older adults.** A 5-year trial in 70-year-olds found HIIT safe and well tolerated. *Honesty flag:* all-cause mortality did not differ significantly between groups; the pro-HIIT trend was exploratory. *Stensvold D et al. BMJ 2020; 371:m3485.*
- **Grip strength predicts mortality.** Each 5 kg lower grip strength was associated with 16% higher all-cause mortality across 17 countries. *Leong DP et al. Lancet 2015; 386:266–273.*
- **VILPA snacks.** In non-exercisers, ~3–4 min/day of vigorous bursts was associated with substantially lower mortality. *Stamatakis E et al. Nature Medicine 2022; 28:2521–2529.* Observational.
- **Sit-to-rise test.** Ability to sit and rise from the floor predicts all-cause mortality in adults 51–80. *de Brito LB et al. Eur J Prev Cardiol 2014; 21:892–898.* Observational.
- **10-second one-leg stance.** Inability to balance on one leg for 10 s was associated with higher mortality in adults 51–75. *Araujo CG et al. Br J Sports Med 2022; 56:975–980.* Observational.
- **Balance training prevents falls.** Balance and functional exercise reduce the rate of falls by ~24% (high-certainty evidence). *Sherrington C et al. Cochrane Database Syst Rev 2019; 1:CD012424.*
- **Heavy loading and impact build bone.** High-intensity resistance plus impact training improved spine and hip bone density. *Watson SL et al. J Bone Miner Res 2018; 33:211–220.* Strongest evidence is in low-bone-mass populations.
- **Jumps keep fast-twitch fibers.** Lifelong strength/power training helps preserve type II fibers and rapid force. *Tøien T, Unhjem R et al. Exp Gerontol 2023; 171:112038.*
- **Protein ~1.6 g/kg.** Muscle gains from training plateau at about 1.6 g/kg/day. *Morton RW et al. Br J Sports Med 2018; 52:376–384.*
- **Creatine 3–5 g/day.** In older adults, creatine with resistance training added lean mass and strength versus training alone. *Chilibeck PD et al. Open Access J Sports Med 2017; 8:213–226.*
- **Steps and mortality.** More daily steps mean progressively lower mortality, leveling off around 8,000–10,000/day under age 60. *Paluch AE et al. Lancet Public Health 2022; 7:e219–e228.*
- **Activity guidelines.** 150–300 min moderate or 75–150 min vigorous per week, plus strength training on 2+ days. *Bull FC et al. (WHO 2020) Br J Sports Med 2020; 54:1451–1462.*
- **Self-monitoring works.** Tracking your own behavior is the single most effective behavior-change technique in a meta-analysis of 122 interventions. *Michie S et al. Health Psychology 2009; 28:690–701.*
- **Habits take ~2 months.** Median 66 days to automaticity; missing one day did not derail habit formation. *Lally P et al. Eur J Soc Psychol 2010; 40:998–1009.*
- **Grease the groove.** Frequent, easy, never-to-failure practice popularized by Pavel Tsatsouline. *Honesty flag:* practitioner method; limited direct trial evidence. Low risk, widely used.

### 2.11 Adherence rules baked into the UI

- Self-monitoring is the intervention: the Today screen, streak, and weekly scorecard are always one tap away.
- Onboarding captures two implementation intentions as text shown on Today: "When I start a treadmill hour, I do my GTG set" and "After [anchor], I do my 30-minute session."
- Expectation-setting copy: "Habits take about two months. One miss is fine. Don't miss twice."
- Minimum-viable session (2 min: one set of push-ups, one set of rows, one squat set) always available and counts for the streak.
- Pre-filled logging, auto-selected session, one-tap GTG.
- Visible competence: PRs, "Advance!" prompts, benchmark trend lines.
- No nagging inside the app beyond the "Not logged yet" state.

### 2.12 Onboarding flow

1. Welcome → what the plan is (one screen)
2. Body weight, work hours, GTG rest day, deadline time
3. Equipment profile (defaults: dumbbells, band + anchor, pull-up bar, mat, backpack)
4. Baseline tests: max pull-ups (sets GTG max), max push-ups, dead hang, balance, sit-to-rise (others can be skipped)
5. Two implementation intentions
6. Add to Home Screen coach mark (iOS)
7. Offer `.ics` download for reminders
8. Land on Today

### 2.13 Build phases

**Phase 1 — MVP (the whole plan works offline)**
Vite/Svelte/PWA scaffold, GitHub Actions deploy, Dexie schema, seed data (patterns, variants, ladders, plan days, science cards), Today screen, workout player with pre-filled set logging and rest timer, GTG widget with target math and retest prompt, walking entry with ACSM math, habit ticks, streak logic, JSON export/import, iOS install coach mark, unit tests for logic modules.

**Phase 2 — Progress and rules**
Charts, benchmark runner, alert/threshold engine, deload scheduler, progression prompts, equipment per-session override, interval timers with audio, mobility checklist, `.ics` generator, Science and Plan screens.

**Phase 3 — Polish**
CSV export, update toast, dark mode, Strength C unlock logic, decade-adaptation content, accessibility pass, Lighthouse PWA audit ≥ 90.

### 2.14 Acceptance criteria

- App installs to the Home Screen and opens with no network after first load.
- Logging a set pre-fills the same set next session for that variant.
- Closing the app mid-workout and reopening restores the in-progress session.
- GTG target updates immediately after a max retest; ache flag reduces it by ~30%.
- Entering 4 hours of walking shows ≈4.2 METs and ≈6.4 miles at default settings.
- Hitting the top of a rep range two sessions in a row produces an "Advance" prompt with the correct next ladder step or load.
- Missing one day shows "Don't miss twice"; missing two resets the streak; a monthly freeze auto-covers the first miss.
- Switching equipment to "barbell" for one session changes the hinge to deadlift/RDL and reverts next session.
- Export → wipe → import restores all data exactly.
- Generated `.ics` imports into iOS Calendar with daily and hourly alarms at configured times.
- Lighthouse PWA audit passes; no console errors on iOS Safari standalone or Android Chrome.
