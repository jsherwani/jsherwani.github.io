# Strong & Steady — long-term fitness plan

Version 2.0 · 24 September 2026 · status: new plan of record; app not yet built.

This replaces the earlier fitness plan and static-only app specification. The goal is sustainable strength, aerobic fitness, physical capability, and healthy aging within your actual schedule. No exercise prescription can guarantee longevity or establish a universal optimum. This is an evidence-informed starting program with a defined process for improving it from your results.

- **Training:** this document is the starting prescription. Once the app is live, its activated, versioned plan governs daily training; update this narrative from that plan at each 8–12-week block review.
- **Phone app and shared database:** [PWA build specification](docs/APP_SPEC.md).
- **Regular reviews and plan changes:** [Check-in protocol](docs/CHECK_INS.md).
- **Implementation boundary:** these documents specify the system; they do not mean an app, database, reminders, or autonomous monitoring already exist.

## 1. Your constraints and decisions

| Item | Confirmed requirement |
|---|---|
| Profile | Age 46; approximately 150 lb / 68 kg; prior barbell experience; no reported injuries or limitations |
| Goal | Strength gain and overall fitness/longevity, not weight loss or advanced calisthenic skills |
| Dedicated time | Up to 30 minutes/day; less on the support/recovery day; one rest day |
| Walking | Egofit desk treadmill, 1.6 mph, fixed **5 degrees** (approximately 8.75% grade), currently about 4 h/day; log actual days/hours |
| Cardio equipment | Access to a Woodway treadmill for dedicated cardio; home strength does not depend on gym access |
| Strength equipment | Two adjustable dumbbells, **25 lb maximum each**; pull-up bar; bands and door anchor; mat; backpack |
| Future equipment | Use what you own now; heavier dumbbells are acceptable later if the training records justify them |
| Work breaks | Up to four short breaks on workdays, **easy pull-up practice only**; no established GTG habit yet |
| Tracking | Phone PWA, durable server database, offline logging, assistant-readable history, versioned plan changes |

Still to calibrate, without delaying the plan: current clean pull-up capacity, appropriate assistance, starting dumbbell loads and push-up variation, Woodway speed/grade at the target effort, and how hard desk walking feels. Do not infer these from age or past barbell experience.

## 2. The priorities

1. Complete balanced resistance training consistently and progress it.
2. Maintain habitual walking and develop aerobic capacity with two focused cardio sessions.
3. Practice a small amount of power, balance, and useful mobility.
4. Recover and eat sufficiently to support training.
5. Use records to adjust one thing at a time; retain what works.

Resistance work across the major muscle groups at least twice weekly and regular aerobic activity are the foundation. The exact exercises, supersets, intervals, and review thresholds below are coaching choices, not proven longevity formulas. [ACSM 2026](https://acsm.org/resistance-training-guidelines-update-2026/), [WHO guidelines](https://www.who.int/publications/i/item/9789240014886)

## 3. Your normal week

| Day | Dedicated session | Work breaks |
|---|---|---|
| Monday | Strength A + brief power, <=30 min | Easy pull-up practice if recovered |
| Tuesday | Woodway intervals, 30 min | Easy pull-up practice if recovered |
| Wednesday | Strength B, <=30 min | Skip GTG: dedicated pull-up work today |
| Thursday | Balance, core, carry, targeted mobility, 15–20 min | Easy pull-up practice if recovered |
| Friday | Strength C + brief power, <=30 min | Easy pull-up practice if recovered |
| Saturday | Woodway intervals, 30 min | None prescribed |
| Sunday | Rest; comfortable recreational movement if wanted | None |

The normal week has five substantial training sessions plus a brief support day. Walking is additional habitual activity, not another quota to increase. The training schedule and GTG rules can be shifted together when workdays change; preserve a recovery day between full-body strength sessions where feasible.

### First two weeks: establish actual tolerances

- Use **two working sets per exercise**, approximately 3 repetitions in reserve (RIR); stop well before a grind.
- Keep both cardio appointments, using the introductory interval timer in section 6. Shorten the hard portion further if necessary; do not force vigorous work through unusual symptoms or poor recovery.
- Start GTG on Tuesday/Thursday only, two easy sets spread through each day. Expand toward the normal schedule after a comfortable week; four is a cap, not a target worth straining for.
- First power session: practice small takeoffs and quiet, controlled landings rather than maximal-distance jumps.
- Time the sessions, including adjustments and both legs. Do not trim preparation or rush repetitions to make the template fit.

### Weeks 3–8: build the repeatable routine

- Progress repetitions/load using section 5.
- Move toward **three working sets on the four main exercises** if sessions fit and recovery is good. Add the third set to the most undertrained/stalled pattern first; do not increase every exercise and cardio intensity simultaneously.
- Use the normal interval timer once the introductory sessions are repeatable.
- Retain two sets wherever they are producing progress or a third would exceed 30 minutes. Nine weekly sets per pattern is a possible destination, not a universal minimum.
- First review after two weeks, then approximately every four weeks; a short weekly check keeps the data honest.

## 4. Strength sessions: four main movements, paired efficiently

**RIR** means how many additional clean repetitions you estimate you could still perform. Most work sets finish at **2 RIR** (an acceptable working range is 1–3). Your early estimates will be imperfect; record them without pretending they are precise measurements.

Each row below is an exercise slot. Begin with two sets per slot, then use the individually assigned two or three sets. For a unilateral exercise, complete both sides; one left-plus-right round counts as one set per leg, not two sets for each leg.

### Strength A — Monday

| Pair | Exercise | Reps per working set | Selection notes |
|---|---|---|---|
| A1 | DB split squat | 8–12 each leg | Start with a stable stance; use only the load you control |
| A2 | Band row | 10–15 | Fixed anchor height and stance; record band/setup |
| B1 | DB Romanian deadlift | 8–12 | Two dumbbells; use a comfortable full hinge range |
| B2 | Push-up | 6–15 | Incline, floor, or feet elevated as needed to hit effort |

After the warm-up and before working sets: **2 × 3 small vertical jumps**, progressing to 3–5 crisp reps per set when landings are reliable. Rest enough that every rep is controlled.

### Strength B — Wednesday

| Pair | Exercise | Reps per working set | Selection notes |
|---|---|---|---|
| A1 | Goblet squat or two-DB squat | 8–15 | Keep only while challenging; switch to split squat if load-limited |
| A2 | Assisted or unassisted pull-up | 4–8 | Adjust assistance to preserve ~2 RIR; no `max minus 2` formula |
| B1 | DB RDL or B-stance RDL | 8–12; each side for B-stance | Use B-stance when bilateral load is insufficient, not as automatic graduation |
| B2 | Push-up | 6–15 | Same variation as Monday unless a deliberate change is logged |

If squat grip fatigue limits pull-ups, rest longer or use straight sets for the pull-up slot. No GTG today. No additional max pull-up test unless it is the scheduled benchmark and replaces, rather than adds to, a work set.

### Strength C — Friday

| Pair | Exercise | Reps per working set | Selection notes |
|---|---|---|---|
| A1 | DB split squat | 8–12 each leg | Same setup as Monday for a comparable progression record |
| A2 | DB overhead press | 6–12 | Press first within the pair if that better preserves performance |
| B1 | DB RDL or established B-stance RDL | 8–12 | Keep the chosen hinge stable across the training block |
| B2 | Band row | 10–15 | Upright supported stance; avoid turning this into a second fatigued hinge |

Power after warm-up: **2 × 3–5 controlled jumps**, as Monday. If dumbbell adjustments between split squats and pressing cost too much time, use the band overhead press with an established setup; log it as a distinct variant. A longer transition is preferable to choosing the wrong load.

### Weekly dose, before GTG and support work

| Movement | At 2 sets/slot | At 3 sets/slot |
|---|---:|---:|
| Squat/split squat | 6 sets per leg | 9 sets per leg |
| Hip hinge | 6 | 9 |
| Horizontal push | 4 | 6 |
| Overhead press | 2 | 3 |
| Horizontal pull | 4 | 6 |
| Vertical pull | 2 | 3 |

These are movement-pattern counts, not additive muscle-specific volumes. Shoulders and triceps also work during push-ups; the back works during both pulls. Major muscle groups are trained repeatedly; every individual exercise need not appear twice. If overhead strength becomes a priority and the Monday session consistently finishes early, consider one or two additional press sets there **at a check-in**, rather than adding them by default.

### Superset execution and the 30-minute limit

- Prepare for about **4–5 minutes**: easy movement plus rehearsal/lighter sets of that day's exercises. Desk walking does not replace shoulder or hinge preparation.
- On power days allow **2–3 minutes** for jumps and their recovery.
- Perform exercise 1; take roughly **20–30 seconds** to transition/recover; perform exercise 2; rest **60–90 seconds** before repeating. These are starting settings, not compulsory limits.
- Budget roughly **9–11 minutes per pair**, including both sides, equipment changes, and logging. Actual pace decides whether two or three rounds fit.
- Increase rest if grip, breathing, or another muscle limits the intended exercise. Pairing different patterns does not eliminate shared trunk/grip fatigue.
- At 30 minutes finish safely and record what was actually done. Repeated overruns trigger a smaller prescription, not a faster timer. Trim the last optional/third set first; preserve two quality sets across the four main slots where possible.
- No default drop sets, forced reps, rest-pause sets, or intentionally very slow negatives. Controlled lowering and purposeful lifting are sufficient.

Supersets can save time with broadly similar adaptations on average, but individual pairings can reduce performance. Saving rest is useful only while productive work is maintained. [Superset review](https://pmc.ncbi.nlm.nih.gov/articles/PMC12011898/), [whole-body trial](https://pubmed.ncbi.nlm.nih.gov/39072654/)

## 5. Progression, equipment, and recovery

### The progression rule

For each exercise variant, retain the same load, assistance, setup, range, and prescribed number of sets until **all prescribed working sets** reach the top of the rep range with clean technique and **at least 2 RIR on two consecutive comparable exposures**.

Then change just one variable:

- **Dumbbells:** smallest available increase; return toward the bottom of the rep range.
- **Bands:** a reproducible resistance increase; record band, doubled configuration, anchor, and stance. Do not invent a kilogram equivalent.
- **Push-ups:** a modest leverage change or safely secured resistance; no forced progression to one-arm skills.
- **Pull-ups:** reduce assistance gradually; use added load only once unassisted repetitions are comfortably within the working range at the intended effort. There is no universal magic rep threshold.

If a new step overshoots the target, use a smaller change, a wider temporary rep range, or the earlier version. Do not force a failed progression. Missed/skipped sets do not satisfy the progression gate. A variant change starts a new comparison series; it does not erase the old records.

If the strongest safe band setup becomes too easy, use a supported one-arm dumbbell row if your available load is challenging, or obtain suitable higher resistance/heavier dumbbells. Start a separate variant record. There is no requirement to substitute an advanced bodyweight exercise or improvise a furniture anchor.

### What happens when 25 lb dumbbells become too light

- First verify full useful range, honest RIR, and reproducible technique. Do not assume a fixed date when you will outgrow them.
- Squat: bilateral squat → loaded split squat; rear-foot elevation is optional if comfortable and stable.
- Hinge: bilateral RDL → B-stance RDL with the rear foot assisting. Use supported single-leg work only if balance does not prevent muscle loading.
- Temporarily extend leg sets toward **15–20 reps** if needed. This can remain productive, but long sets consume more of the time budget.
- Consider heavier adjustable dumbbells when the hardest practical stable version repeatedly reaches the upper rep range with substantial reserve, or high-rep sets make the 30-minute sessions impractical.
- Select the purchase around the measured loading gap, safe handling, and small increments; this plan does not prescribe a brand or speculative weight ceiling.
- Keep a hip hinge even if you later add hamstring curls/Nordics. Advanced calisthenics remain optional interests.

Light loads can support muscle growth when effort is high; greater external loads generally better support maximal-strength development. That is the reason to permit an equipment upgrade instead of endlessly extending the skill ladder. [Load comparison](https://pubmed.ncbi.nlm.nih.gov/28834797/)

### When progress stalls

A flat week is not a failure. After roughly **3–4 comparable exposures** without improvement, inspect attendance, load/assistance increments, rest, technique, sleep, food, walking fatigue, and GTG first. Holding performance during a stressful week is acceptable.

- If well recovered and doing two sets: consider a third set for the stalled pattern, within the time limit.
- If tired or sore with declining performance: reduce workload before adding it.
- Do not respond to a stall by increasing volume, reducing rest, changing exercises, and adding intervals at once.

### Recovery week and pain

No automatic calendar deload. If performance declines across two comparable sessions **with unusual fatigue/soreness**, or normal training is becoming difficult to recover from, use about one week with one or two sets per exercise, 3–4 RIR, easier cardio, and no GTG. Reassess before returning to the previous dose. Exact thresholds are coaching heuristics.

For pain, stop the provoking exercise; select a comfortable alternative or skip it. A minimum-one-rep rule must never override this. Persistent or worsening pain, swelling, weakness, or altered movement calls for clinical assessment; do not prescribe an arbitrary two-week return date. New chest pressure, fainting, or severe unusual breathlessness warrants stopping and prompt medical evaluation.

## 6. Cardio: two repeatable Woodway sessions

Use the **Woodway**, preferably brisk incline walking initially if it achieves the intended effort comfortably. Jogging is an option if preferable and tolerated. Use the same mode for both days at first so progress is interpretable. Grade is normally recorded as **percent** on the Woodway; do not copy the Egofit's degree setting into that field.

### Timers that actually total 30 minutes

| Stage | Warm-up | Hard efforts | Recoveries between efforts | Cool-down/easy finish | Total |
|---|---:|---:|---:|---:|---:|
| Introductory | 8 min | 3 × 2 min | 2 × 3 min | 10 min | 30 min |
| Normal | 8 min | 3 × 3 min | 2 × 3 min | 7 min | 30 min |

Progress from easy walking during warm-up. Hard efforts should be repeatable, about **7–8/10 perceived effort**, with speech reduced to a few words but no all-out sprinting. Finish feeling another effort would have been possible. Easy periods should allow breathing to settle. Use lower intensity/reduced hard time when recovering poorly.

Speed and grade are calibrated in the first sessions. Do not prescribe a fixed speed from your age or a fixed incline just because it is available. Avoid leaning on the handrails to sustain an excessive setting. If steep walking aggravates calves/Achilles, use less incline and a suitable pace/mode.

The 3×3 format is a practical time-budget adaptation, not a uniquely validated optimum. Standard Norwegian 4×4 with 10 min warm-up, three 3 min recoveries, and 5 min cool-down takes **40 minutes**. It can be a later option if you voluntarily expand the time budget; it is not squeezed into a 30-minute timer. [NTNU protocol](https://www.ntnu.edu/cerg/advice)

### Cardio progression

When both weekly sessions are completed at controlled effort without deteriorating pace/form or problematic recovery for two weeks, increase **either** speed **or** grade by a small machine increment. Keep the timer unchanged. Heart rate, if available, is supporting information; do not chase a guessed `220 − age` target or sprint to make a sensor respond.

Two weekly vigorous sessions are the target, not a promise that they outperform every alternative for lifespan. Trials support aerobic fitness improvement; mortality comparisons between exercise intensities are less definitive. [Frequency study, exploratory](https://pmc.ncbi.nlm.nih.gov/articles/PMC12451023/), [Generation 100](https://www.bmj.com/content/371/bmj.m3485)

If Woodway access is temporarily unavailable, use a safe familiar outdoor hill or another suitable aerobic option if available. Otherwise log a moderate session as a substitution; do not invent an equivalent vigorous dose. No additional VILPA quota, repeated stair sprints, or required second mode.

### Your Egofit walking

Continue if comfortable, compatible with work, and not compromising leg recovery. Reduce duration/pace when calf/foot fatigue, unintended weight loss, or recovery problems suggest it is too much. Four hours is your current habit, not a lifetime minimum.

At 1.6 mph and 5°, distance after four hours is 6.4 miles and the ACSM equation estimates about 4.2 METs. This speed is below the equation's stated most-accurate range; desk support and individual gait further affect estimates. Do not use estimated calories as a food prescription or a training target. [Walking-equation validation](https://pmc.ncbi.nlm.nih.gov/articles/PMC7896743/)

During week 1, record a brief talk test/RPE while walking normally, plus heart rate if already available. Moderate activity often allows conversation but not comfortable singing. If desk walking is mostly light for you, preserve its value but arrange enough purposeful moderate activity across the week; the two short interval blocks alone do not reach the general aerobic-volume recommendation. Prefer upgrading a manageable part of existing walking or the Thursday slot before adding hours. [CDC intensity guidance](https://www.cdc.gov/physical-activity-basics/measuring/index.html)

The general adult target is **150–300 minutes/week of moderate activity, or 75–150 vigorous, or an equivalent combination**; one vigorous minute counts as about two moderate minutes. This is a population guideline, not a sharp biological threshold or a ceiling. Count actual qualifying walking and cardio minutes, not each entire interval session as vigorous. If desk walking contributes none, the normal intervals supply 18 vigorous minutes (about 36 moderate-equivalent minutes), leaving about 114 moderate minutes to reach the lower target before counting any qualifying warm-up/recovery work. Aim to fit that within existing walking time; if that is impractical, revise the weekly schedule at the two-week review instead of pretending the gap is covered. [WHO guidelines](https://www.who.int/publications/i/item/9789240014886)

## 7. Easy GTG pull-up breaks — only pull-ups

This is optional skill practice, separate from hard sets. It is not another full-body snack program and does not need to produce sweat or fatigue. Direct evidence for GTG as a named method is limited; use improvement and tolerance to decide whether it earns its place.

- **Target:** up to four brief sets on eligible workdays, roughly an hour or more apart. Start smaller as in section 3. No catch-up sets.
- **Skip Wednesday** because it has dedicated pull-up work. Skip any day with elbow/shoulder discomfort or impaired recovery. Weekends have no GTG obligation.
- **Effort:** at least **3 clean reps in reserve every set**, not just on the first set of the day.
- If your clean maximum is **4–5**, begin with **one unassisted rep**. This is an entry example, not a requirement to test to failure.
- If your maximum is **1–3**, unknown, or a single feels strenuous: use secure band assistance for **2–3 easy reps** with at least three remaining. No compulsory negatives.
- Use a comfortable grip consistently; rotation is optional. Brief easy shoulder movement before the set is preparation, not extra training.
- Add a rep or reduce assistance only when the new dose would still leave at least three reps available. Review the target about monthly; never auto-increase from an isolated max test.
- If dedicated pulling declines or local soreness accumulates, first reduce GTG from four to two sets/day, then suspend it if needed. Pain can set the target to **zero**.

Log set count, actual reps, assistance, and discomfort. Report practice separately from the strength-session sets. The default mature schedule has a maximum of **16 GTG sets/week** (Mon/Tue/Thu/Fri), not an obligation to accumulate 16.

## 8. Power, balance, core, and mobility

**Power:** Monday/Friday, 2 × 3–5 controlled jumps after warming up. Start with small vertical jumps and stable landings; stop when landing quality or speed deteriorates. No box required, no max-distance test to earn progression. If impact is uncomfortable, omit it and use a pain-free fast-but-controlled concentric strength movement; that is a power alternative, not an equivalent bone-loading intervention.

Impact and resistance work can support bone health, but evidence from specific older/low-bone-mass populations does not establish your optimal dose. Your body weight alone does not make jumping the "primary" stimulus. [LIFTMOR trial](https://pubmed.ncbi.nlm.nih.gov/28975661/)

**Thursday, 15–20 minutes:**

1. Single-leg balance beside a stable support, eyes open, 2 × 30–45 s per leg. Progress with controlled reaches/head turns rather than mandatory eyes-closed attempts.
2. Deadbug, 2 × 6–10 controlled reps per side.
3. Farmer or suitcase carry, 2 × 30–45 s; stop before grip/form fails. Reduce/omit if it interferes with Friday's pulling.
4. Spend 3–5 minutes on an actual restriction: ankle dorsiflexion/calf comfort, hip extension, or thoracic rotation. No compulsory deep-squat, pigeon, or stretching score.

A shorter support session or a rest day is fine when recovering poorly. Full-range strength work can contribute to mobility; balance evidence for fall prevention is strongest in older adults. These brief practices are preparation for continued function, not proven lifespan extensions at age 46. [ROM trial, limited population](https://pubmed.ncbi.nlm.nih.gov/38943165/)

## 9. Food, sleep, and the broader longevity context

- Aim for approximately **110 g protein/day** (~1.6 g/kg at 68 kg), conveniently spread across meals. A practical target, not a hard biological cutoff. [Protein evidence](https://pubmed.ncbi.nlm.nih.gov/28698222/)
- Eat enough to support stable weight and progressing performance. You are not trying to lose fat. If weight trends down unintentionally while recovery suffers, increase food and/or reduce activity rather than trusting a treadmill-calorie estimate.
- **Creatine monohydrate 3–5 g/day is optional.** No loading phase required for this plan. It supports resistance-training outcomes; it is not a demonstrated longevity treatment. Relevant health conditions/medication questions belong with your clinician. [Creatine evidence](https://pubmed.ncbi.nlm.nih.gov/29138605/)
- Protect a regular **7–9-hour sleep opportunity**; investigate persistent poor sleep rather than treating extra training as the solution. [CDC sleep guidance](https://www.cdc.gov/sleep/about/)
- Keep an overall nutritious eating pattern, avoid smoking, minimize alcohol, and maintain social/recreational activities you enjoy. Keep age/risk-appropriate preventive care, blood pressure and lipid review with your clinician. These are part of longevity; the workout app is not a substitute. [CDC prevention guidance](https://www.cdc.gov/chronic-disease/prevention/index.html)

Only sleep/recovery and occasional weight/protein confirmation need routine logging. Do not turn the app into a burdensome food diary or medical record.

## 10. Long-term phases and contingencies

| Period | Objective | What changes |
|---|---|---|
| Weeks 1–2 | Establish tolerable loads, accurate logging, actual session duration | Conservative sets/effort, intro intervals, small GTG dose |
| Weeks 3–8 | Build consistent progressive work | Add reps/load first; selected third sets if justified; normal intervals |
| Weeks 9–12 | Evaluate the first block | Compare like-for-like performance, adjust one limiting factor |
| Months 4–12 | Repeat useful blocks | Keep stable exercises while improving; upgrade load when indicated |
| Year 2 onward | Maintain and selectively build capacity | Preserve strength, aerobic fitness, power and balance; adapt to life and function |

Every 8–12 weeks ask whether the plan is producing useful improvement at an acceptable cost. A maintenance block during work/family stress is a successful choice, not a broken streak. Do not demand lifetime linear progression. There are no automatic birthday-based exercise changes.

**Busy week:** aim for two full-body sessions using two sets per slot (include squat, hinge, push, pull), one cardio session, and normal comfortable movement. This is a temporary maintenance compromise, not the claimed optimum. Suspend GTG first if necessary.

**Missed session:** resume the next scheduled session; do not cram two hard workouts into the next day. After repeated misses, simplify the schedule at review.

**Travel:** retain squat/split squat, push-up, band row, and an available hinge. Log substitutions honestly. Walking is useful even when interval equipment is unavailable.

**Return after illness or a prolonged gap:** begin below your previous volume/intensity and build back based on symptoms and recovery. Archived PRs do not determine the first return session.

## 11. What we measure and how we adjust

### Daily/session records (minimal friction)

- Actual exercise/variant, reps, load or assistance, and RIR; confirm each completed set rather than auto-crediting a target.
- Actual session duration and a quick recovery/discomfort flag.
- Cardio timer completed, hard/easy durations, Woodway speed/grade and session RPE; heart rate optional.
- GTG actual reps/assistance and set count, recorded separately.
- Walking hours when different from usual; the app may prefill but must not silently log four hours.

### Baseline and every 8–12 weeks

1. **Strength:** compare load/reps at the same variant, range and RIR on split squat, hinge, push-up, and row/press. No compulsory 1RM tests.
2. **Pull-up capacity:** optional single technical-max set after warm-up, replacing one Wednesday set; stop when another clean rep is unlikely. Do not force failure. Assistance changes remain separate series.
3. **Aerobic benchmark:** a repeatable 10-minute submaximal Woodway stage after an 8-minute warm-up, followed by easy cool-down to 30 minutes. Fix speed/grade/mode from baseline; record RPE and, if available, average heart rate over the last 3 minutes. It replaces one interval session. Similar/lower effort at the same workload is useful context, not a VO2max measurement.
4. **Function:** balance eyes open near support; optionally a comfortable floor rise. These are capability checks, not longevity scores.

Standardize equipment, timing, prior fatigue, and sensor use as much as practical. Avoid comparing different variants or interpreting a single heart-rate change as fitness improvement.

### Review cadence

- **Weekly, about 2 minutes:** confirm sync and missing records, attendance, symptoms, sleep/recovery, and whether sessions fit.
- **After week 2:** calibrate loads, timer and GTG; do not redesign everything from noisy baselines.
- **Every 4 weeks:** assistant check-in using the live database and your brief subjective report.
- **Every 8–12 weeks:** benchmark review and next training block.
- **Earlier:** symptoms, repeated performance decline, equipment limits, major schedule change, or your request.

The assistant should explain the observed data, uncertainty, proposed change, and a review date. Change one major programming variable at a time unless pain/illness requires broader reduction. Changes appear as a new plan version you can review and activate in the app; past prescriptions and completed logs remain intact.

The app can remind you that a check-in is due. An ordinary conversation does **not** create a background coach or scheduled access to your records. Initially, open a conversation and ask for a check-in. [Detailed workflow](docs/CHECK_INS.md)

## 12. What changed from the original plan

- Full-body A/B/C every week; no advanced-skill unlock.
- Explicit superset order/rest, unilateral timing, and a real 30-minute budget.
- Correct 25 lb-per-dumbbell limit and a measured path to heavier equipment.
- Dedicated cardio on the available Woodway; honest 30-minute timers.
- Easy optional GTG capped at four breaks on eligible days; no invalid `max minus 2` targets or pain-enforced reps.
- Targeted support work; fewer low-value tests and no automatic "go harder" alerts.
- Review-driven progression, recovery and long-term adaptation.
- A private server-backed PWA with assistant-readable history replaces the original browser-only GitHub Pages architecture. No public health-log pages, no database credentials in the browser, and no automatic AI prescription changes.
