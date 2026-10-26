# OpportunityBridge — Civic Careers, With Evidence

CityGov 2026 · standalone prototype v0.2 · October 26, 2026

A free, browser-only bridge from learning to civic skills, exact illustrative requirements, portfolio prompts, unanswered questions and a career-advisor handoff.

## Try it

Public source: [opportunitybridge-citygov-2026](https://github.com/siamakenna/opportunitybridge-citygov-2026). Deployment and verification: [release receipt](docs/RELEASE.md).

Locally: `npm start`, then open http://localhost:5173. Node 20+ is sufficient for tests; Python 3 serves the static site. No package installation or API key is needed.

- `npm test`: 22 regression tests, including edited facts and current-skill export behavior.
- `npm run benchmark`: internal 12-judgment software fixture dry run and equal-information manual worksheet; no participant comparison.
- Browser export regression: serve the repository and open `/tests/browser.html` (15 assertions).
- `npm run build`: copy public assets into `dist/` for free static hosting.

Choose a fictional learner, edit declarations and inspect a fictional pathway. Build a sample evidence note; download the plan or advisor packet. Official Maryland postings and DC/Philadelphia search resources appear separately, with source dates and expiry warnings. Real requirements never enter the fictional engine.

## What changed from the supplied v0.1

Retained all three personas, four role briefs, three-state engine, source excerpts, baseline tests and 14-day plan. Corrected translated skill suggestions that retained contradicted persona defaults. Added requirement-linked evidence worksheets, bounded local draft notes, advisor packet, simpler explanations, reset cleanup, mobile/readability improvements, reduced motion, no remote fonts, content policy and official-resource inventory. No account, backend, hosted learner data, automatic email or runtime model.

[Judge’s guide](judge.html) · [Submission copy](docs/SUBMISSION_DRAFT.md) · [Pilot and budget](docs/PILOT_PLAN.md) · [Source inventory](docs/SOURCE_INVENTORY.md) · [QA](docs/BROWSER_QA_README.md) · [Benchmark protocol](docs/BENCHMARK_PROTOCOL.md) · [Mock judging](docs/CITYGOV_RUBRIC_MATRIX.md) · [Owner actions](docs/OWNER_ACTIONS.md).

## Limits and provenance

All personas and assessed pathways are fictional. Official resources are point-in-time observations, not eligibility matches or endorsements. Independent unfamiliar users: n=0. No partner, registration, placement, hiring benefit or certified accessibility is claimed. Pilot target: 25 adults / 25 reviewed opportunities in 60 days, $6,240 illustrative economic cost; no funding committed.

Declarations/notes stay in memory and disappear on reload; exports stay on your device. Hosting receives ordinary page-request logs; external links have separate policies. Use fictional information in the public demo. MIT code; [AI-use disclosure and third-party credits](docs/AI_DISCLOSURE.md). This implementation is separate from FundPilot and Perturb-LM and copied neither project's code or private data during continuation. Owner must review the AI-assisted work and submit personally.
