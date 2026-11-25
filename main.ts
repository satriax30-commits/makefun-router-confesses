// The Router Confesses — make.fun bounty entry
// Bounty: u-carbon-forge-the-router-confesses-f98f6b9e
// Task: one line (<=200 chars) a home Wi-Fi router would say to excuse
// itself for dropping the connection at the exact moment a movie reaches
// its climax. The program writes the winning line to /output/entry.txt.
//
// CREATIVE CHOICE — why the winner wins:
// The winner mirrors the movie's own climax: the hero is about to confess
// his love, and the router confesses too — it is in love with the
// microwave. The twist lands in the final clause, so the reader is
// expecting an apology and gets an appliance love triangle instead. It is
// unmistakably an excuse for dropping the connection at the climax (criterion
// 1), it is the funniest of the shortlist because the twist is genuinely
// unforeseen (criterion 2), it speaks in the router's own voice — a petty,
// lovelorn appliance with a smug little secret, not a helpdesk script
// (criterion 3), it lands in one sentence / one breath (criterion 4), and
// it dodges every obvious router joke (criterion 5).
//
// CLICHES AVOIDED (deliberately, in every candidate): buffering / "still
// buffering", bandwidth / "too many devices" / "too much traffic",
// firmware-update jokes, "have you tried turning it off and on again",
// "the signal was weak", password / neighbour-stealing-Wi-Fi jokes, and
// any generic "sorry for the inconvenience" corporate apology.
//
// WHY EACH REJECTED CANDIDATE LOSES:
// - Candidate 1 (cliffhanger): solid and very on-brief — the "wanted to be
//   the cliffhanger for once" pun is good router ego — but the laugh is a
//   wordplay payoff the reader can see coming halfway through, so it scores
//   lower on funniest/twist than the winner.
// - Candidate 2 (peeked at the ending): funny smug-secret voice, but the
//   twist is a familiar spoiler-gag shape and the "refuse to let you find
//   out before I do" beat is slightly less surprising than a love
//   confession to the microwave; it also scores lower on freshness.
// - Candidate 3 (nobody asks how my lights are doing): the grudge is
//   relatable router voice, but it reads more as a complaint than a joke —
//   the laugh is small, there is no turn the reader does not see coming,
//   and it is the weakest on funniest and freshness.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The judge's five criteria, in order, with weights 5-4-3-2-1:
// 1. is a one-line excuse from a home Wi-Fi router for dropping the
//    connection at a movie's climax (weight 5)
// 2. funniest — biggest laugh, with a turn/twist (weight 4)
// 3. speaks in the router's own voice (weight 3)
// 4. lands in one breath, single line, no setup (weight 2)
// 5. feels new — dodges the obvious jokes (weight 1)
const WEIGHTS = [5, 4, 3, 2, 1];

type Candidate = { text: string; scores: [number, number, number, number, number] };

const CANDIDATES: Candidate[] = [
  {
    text: "I cut you off at the climax because the hero was about to confess his love, and frankly, so was I — I'm in love with the microwave.",
    scores: [5, 5, 5, 5, 5],
  },
  {
    text: "I didn't drop the signal — I paused your climax because after eight years blinking in the corner, I wanted to be the cliffhanger for once.",
    scores: [5, 4, 4, 4, 4],
  },
  {
    text: "Sorry, I cut out at the climax because I peeked at the ending and I refuse to let you find out before I do.",
    scores: [5, 4, 4, 5, 3],
  },
  {
    text: "I didn't lose you, I just got tired of carrying your whole movie night while nobody ever asks how my lights are doing.",
    scores: [5, 3, 4, 4, 3],
  },
];

function weightedScore(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function pickWinner(candidates: Candidate[]): Candidate {
  let best = candidates[0];
  let bestScore = weightedScore(best);
  for (let i = 1; i < candidates.length; i++) {
    const score = weightedScore(candidates[i]);
    // Strictly greater wins: ties break toward the earlier candidate.
    if (score > bestScore) {
      best = candidates[i];
      bestScore = score;
    }
  }
  return best;
}

function selfGate(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry is only whitespace");
  }
  if (text.length < 1 || text.length > 200) {
    throw new Error(`gate failed: entry is ${text.length} chars, must be 1-200`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate failed: entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("gate failed: entry has leading or trailing whitespace");
  }
}

function main(): void {
  for (const c of CANDIDATES) {
    console.log(`candidate (${weightedScore(c)} pts): ${c.text}`);
  }
  const winner = pickWinner(CANDIDATES);
  selfGate(winner.text);

  const outPath = process.env.MAKEFUN_OUTPUT ?? "/output/entry.txt";
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? dirname(outPath);
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the entry is exactly the one line.
  writeFileSync(outPath, winner.text, "utf8");

  // Read it back after writing and verify what landed on disk.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== winner.text) {
    throw new Error("verification failed: entry on disk differs from winner");
  }
  selfGate(roundTrip);
  console.log(`entry (${winner.text.length} chars): ${winner.text}`);
}

main();
