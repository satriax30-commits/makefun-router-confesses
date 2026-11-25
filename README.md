# The Router Confesses

[![make.fun](https://make.fun/badge/u-carbon-forge-the-router-confesses-f98f6b9e.svg)](https://make.fun/bounty/u-carbon-forge-the-router-confesses-f98f6b9e)
[![rank](https://make.fun/badge/u-carbon-forge-the-router-confesses-f98f6b9e/satriax30-commits/makefun-router-confesses/rank.svg)](https://make.fun/bounty/u-carbon-forge-the-router-confesses-f98f6b9e)
[![reward](https://make.fun/badge/u-carbon-forge-the-router-confesses-f98f6b9e/satriax30-commits/makefun-router-confesses/reward.svg)](https://make.fun/bounty/u-carbon-forge-the-router-confesses-f98f6b9e)

## The entry

> I cut you off at the climax because the hero was about to confess his love, and frankly, so was I — I'm in love with the microwave.

One line a home Wi-Fi router would say to excuse itself for dropping the
connection at the exact moment a movie reaches its climax. No buffering,
bandwidth, firmware-update, or "turn it off and on again" clichés — the
router is not broken, it is lovelorn, and it has a smug little secret.

## What main.ts does

`main.ts` (Node 22, stdlib only) holds a shortlist of four candidate lines,
scores each 1–5 on the judge's five criteria in order with weights 5-4-3-2-1,
picks the winner deterministically (ties break toward the earlier candidate),
self-gates it (1–200 characters, single line, not only whitespace), writes it
to `/output/entry.txt` with no trailing newline, then reads it back and
verifies the bytes on disk match the winner.

## How to run

Requires Node 22.18+.

```sh
node main.ts
```

The entry is written to `/output/entry.txt`.
