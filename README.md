# OpportunityBridge — From Education to Real Civic Careers, With Evidence

CityGov 2026 · Kenny! · v0.6 · October 26, 2026

[Public app](https://siamakenna.github.io/opportunitybridge-citygov-2026/) · [Judge guide](https://siamakenna.github.io/opportunitybridge-citygov-2026/judge.html) · [Practice Mode](https://siamakenna.github.io/opportunitybridge-citygov-2026/practice.html)

Official opportunities are the first interaction. Inspect a real record, compare fictional declarations to selected source-grounded criteria, draft evidence, prepare an application checklist and download an advisor handoff. Historical civic work shows what other programs produced, with institutional versus first-person provenance. No certification, rejection, hiring guarantee or endorsement.

## Run and verify

`npm start` serves http://localhost:5173. No package install, paid API or account is needed for the app. `npm test` runs 80 Node tests. `npm run benchmark` runs eight real-source task checks plus the retained twelve practice judgments. `npm run sources` checks catalog schema/provenance and dates without refreshing sources. `npm run build` copies the public distribution to dist/ and versions entry modules, imports and styles with the release SHA to avoid mixed cached releases.

Run `npm run build`, then open `/tests/real-browser.html` for 23 real-workflow browser assertions and `/tests/browser.html` for the preserved 15 Practice Mode assertions. `/tests/evaluation-browser.html` adds nine guided-instrument assertions; `/tests/v06-browser.html` adds25 workflow/print/evaluation/partner assertions. These load actual HTTP modules. `npm run sources:scan` records actual public HTTPS retrieval/content hashes, identity and withdrawal checks; `npm run sources:report` emits the queue; failures remain explicit and dates are not silently refreshed.

## What is real, historical and fictional

Twelve official-source records: five specific Maryland recruitments, two research intakes, four ongoing career/search pathways and one expired fellowship intake. Eleven appear by default on the observation date; none of these counts means twelve open vacancies. [Source inventory](docs/SOURCE_INVENTORY.md) links original pages and limitations. After 48 hours sources become previously observed and positive selected-condition interpretations stop until recheck. Passed deadlines leave default results.

Five historical accounts/reports retain published names, source type, deliverables and limited career outcomes. Portfolio exercises are OpportunityBridge recommendations, not fellow artifacts. Snipta Mallick’s later work is attributed to an outside contractor; Soma Badri’s account describes an offer, not an inferred accepted job. No one endorses this app.

The original three fictional personas/four roles and engine remain in practice.html. `baseline-v0.4` preserves the last real-career release and `baseline-v0.2` preserves the published baseline for rollback; old resources.js and fixture documents are retained as historical evidence. The optional v0.3 Impact Lab was unavailable and not integrated.

## Privacy and limits

No runtime model, backend, account, uploaded résumé, private learner records, demographic scoring, automatic email or application. Notes/shortlist live in memory, reset on reload, and clear with the session button. Downloads remain on the device. Hosting receives ordinary request logs; outbound sites have separate policies and may require accounts. Google general job search, LinkedIn and Handshake are optional discovery, not validated results or platform partnerships.

Independent unfamiliar users n=0. Internal tests are not manual-comparison results, certified accessibility or career impact. No partner has committed. [Pilot](docs/PILOT_PLAN.md) and [operations kit](docs/PILOT_OPERATIONS.md) propose 25 adults/25 double-reviewed sources over 60 days; $6,240 illustrative economic cost, $500 cash if staff labor donated. MIT code; [AI-use and third-party credits](docs/AI_DISCLOSURE.md).

[Execution report](docs/EXECUTION_REPORT.md) · [Submission copy](docs/SUBMISSION_DRAFT.md) · [Benchmark](docs/BENCHMARK_PROTOCOL.md) · [QA](docs/BROWSER_QA_README.md) · [Mock judging](docs/CITYGOV_RUBRIC_MATRIX.md) · [Release receipt](docs/RELEASE.md) · [Owner actions](docs/OWNER_ACTIONS.md).

Real-workflow browser regression loads `dist/index.html`; run `npm run build` first. Numeric input is tested before blur/change so displayed declarations and generated exports cannot silently diverge.

[Guided matched-source evaluation](evaluation.html) · [Two-page manager PDF](output/pdf/OpportunityBridge-Pilot-Packet.pdf) · [Source review queue](docs/SOURCE_REVIEW_REPORT.md). Seven records re-inspected lateOctober26 Eastern/October27 UTC; raw automated retrievals seven passed/five failed, retained in the ledger. NIH SIP was separately inspected using the official web reader. Review dates and rule mappings require explicit documented approval; no unattended renewal. Independent n=0, mock87/100.

Featured MPT guided tour and five-stage workspace, editable multi-connection evidence worksheet, self-declared document progress, bounded preparation dates and full-text printing. [Proposed partner handoffs and downloadable kit](pilot.html). Daily source-check workflow emits observation artifacts only; no automatic date renewal, mapping approval or publication. Use `npm run sources:prepare -- <id>` for an unapproved source-specific review candidate.
