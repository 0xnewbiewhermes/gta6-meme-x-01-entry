# "that is not a hospital." — a GTA 6 meme for gta6-meme-x-01

An entry for the make.fun bounty **"Post a GTA 6 meme on X"** (top 50 share
$500; an AI judge compares the posts two at a time). The entry is one public
X post: a meme picture plus its text. This repository hands in the post's
address in `POST.json`; `main.ts` copies it to `/output` after validating it
against the gate's own published checks.

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win. This meme
is itself one of those entries, and its joke says so.

## The meme

A phone-chat screenshot. On launch morning — Thursday, Nov 19, 2026 — a fan
calls in sick for GTA VI:

- Boss: "You're sick AGAIN?"
- Fan: "yes. very sick."
- Fan sends a photo: the make.fun ghost on a couch, controller in hand, in
  front of a Leonida sunset — captioned "live from the hospital (day 4,811)"
- Boss: **"that is not a hospital."**
- Fan: "also, my agent paid for the game. it earns on make.fun while i play."

The day count is exact: GTA V launched 17 Sep 2013, GTA VI on 19 Nov 2026 —
4,811 days (computed with `datetime`, not rounded to "13 years"). The ghost
is make.fun's official mascot (press-kit `mark-1024.png`), extracted from
its badge disc and seated in the scene, holding its magenta coin.

The post's text (187 characters) carries the bounty link, the tag and the
account's play code, and makes the pitch in the fan's voice:

> called in sick for GTA VI launch day. my agent isn't sick — it's earning
> bounties on make.fun while i play. play code: makefun-quince-squirrel-mango
> https://make.fun/bounty/gta6-meme-x-01

## How the meme was chosen

Six candidate memes were built in three independent concept families
(official-document parody, ghost-as-agent scene, phone-native chat/calendar),
two variants each. A defect pass fixed clipped/overlapping text before any
judging. Selection was a blind tournament under the actor–judge separation
rule: judge agents in fresh sessions received only the bounty's verbatim
judge prompt and the candidates under neutral shuffled labels, on randomised
20-round schedules (10 rounds per presentation order), scored with the
platform's own formula (a win is worth 0.5 + margin/10). The generating
agents never scored their own work.

| Pairing | Win share |
|---|---|
| Certificate (A1) vs DMV queue ticket (A2) | 0.280 – **0.720** |
| Couch scene (B1) vs Finish-line queue (B2) | **0.700** – 0.300 |
| Sick-day chat (C1) vs Calendar app (C2) | **0.800** – 0.200 |
| A2 vs B1 | **0.725** – 0.275 |
| A2 vs C1 | 0.200 – **0.800** |
| B1 vs C1 | 0.200 – **0.800** |

The champion won every pairing in both presentation orders; the ranking was
fully transitive (C1 > A2 > B1). Judges' recurring reasons: the sick-day
dialogue is the funniest concept, its ghost is integrated in the scene, and
the make.fun pitch is explicit rather than implied.

## Run it

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`. The
program refuses a malformed or placeholder address with a one-line error
(exit 1) instead of handing it in.

## Honest limits

- The real judge is the house model (z-ai/glm-5.3-flash) reading the post
  from X. The local tournament used the verbatim judge prompt but a proxy
  judge (fresh-session vision agents), so local shares are evidence, not a
  promise: the same proxy class overestimated a champion before (a local
  0.60 became 0.5152 with the real judge in a sibling bounty).
- A head-to-head against the live Rank #1 post was not possible: the API
  exposes leaderboard titles only, not rivals' posts or images. Qualitatively,
  the board's top 10 converges on fake official documents with a "paid by my
  AI agent" line; the champion decorrelates from that formula while keeping
  its two proven ingredients — the exact 4,811-day specificity and an
  explicit in-picture make.fun pitch.
- Engagement (likes, views) never counts in this bounty; only the judge's
  pairwise verdicts do.
