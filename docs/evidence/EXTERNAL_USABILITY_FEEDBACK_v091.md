# OpportunityBridge v0.9.1 — external usability feedback and executed refinement

Prepared October 28, 2026 Pacific; engineering receipts continue October 29 UTC. Baseline: `51967987d6aad1d5dcbd77d5fac7cbf336ced0c6`. Implemented code: `276a7b10c3b693443ac691819d7a57782a82aba3`; subsequent release commits add audit records/documentation, not new benchmark references. Current exact public release revision is in [source.json](../../source.json) and the v0.9.1 GitHub release.

## A. Feedback integration

External informal qualitative usability review: **1 owner-reported reviewer**. This is an anonymized paraphrase supplied by the owner, without a verified role, compensation, expertise, attribution permission, consent record, timed session or task scores. The reviewer found the project promising and understood the fictional framing; neither statement establishes benefit. No testimonial or identifying information is published.

| Feedback | Concern / screen | Proposed and actual implementation | Actual check / result | Remaining uncertainty |
|---|---|---|---|---|
| A: make MPT explanation prominent | Practice mistaken for employer qualification; cards, journey, two MPT quests, Passport/Advisor | Full practice/eligibility boundary plus official source and relevance before fields; compact persistent source/boundary strips; exported MPT practice context | Browser assertions, native MPT walkthrough, real Passport/handoff downloads and 320px screenshot passed; unresolved conditions retained | Whether unfamiliar users comprehend it, and actual screen-reader experience |
| B: collapse sections 1–6 | Long stack, especially mobile | Six independent native details/summary regions; original nodes, IDs, fields and handlers retained; current selected source/deadline/unknown and Pulse warnings outside closed content | Native Enter open/close, direct section-3 link, Browser Back, Passport text retained; targeted harness passed | Discoverability/preference and scrolling comfort for real users |
| C: shorter opening | First-use reading burden; homepage and study | Three immediate actions, 13-word lead, short study orientation with meaningful consent/privacy still accessible | Structural counts below; one-action Explore and two-action quest start | No observed comprehension or speed improvement |
| D: kit may exceed 15 minutes | Eight substantive answers plus extensive navigation; original forms | Three brief answers/case; proposed 2+5+5+3 schedule; verbal/paper alternative; no full quest/Passport requirement; C/D reverse case order; separately versioned five-minute option | Actual supplied archives inspected; original preserved; four generated forms and unit checks; blank analysis reports pending n=0 | Time cap is unvalidated; actual setup, reading, interruptions and completion duration remain blank |
| E: JSON is confusing | Participant saving | Primary Save My Responses; explicit .json explanation; readable .txt alternative; partial/empty saves; no organizer-receipt claim | Six actual browser files generated/downloaded and parsed/read, including Unicode, 500-character answer, withdrawn and readable variants | File generation can detect errors but page cannot confirm OS download success or organizer receipt |
| F: show progress | Position confused with completion | Separate four-stage position and six-answer count; three answers/task; timers/visited steps never prove completion; tab-only state | Native 0/6→1/6→6/6, Back retained Unicode text, timeout/withdrawal unit checks passed | No genuine participant engagement/return measure |

All six actionable comments were implemented. Full zoom/screen-reader validation was attempted but could not be completed because macOS Computer Use permission was denied; those remain **UNTESTED**. No acknowledgment gate was added to the MPT practice warning.

## B. Structural UX measurements (not human task performance)

Same in-app browser, 900 CSS-pixel viewport height, frozen `trial=v081` discovery input, real application clock, default state/no hash. Baseline v0.9 and v0.9.1 measured with the same browser. Rehearsal participant pages are explicitly flagged software QA. Width was verified from actual `innerWidth`, not inferred from a requested override. Raw before/after JSON and screenshot are in `evidence/v091/`.

| CSS viewport | Main default page height, px | Reduction | Participant opening height, px |
|---|---|---|---|
| 320 × 900 | 42,080 → 11,839 | 71.9% | 5,878 → 2,831 |
| 390 × 900 | 37,027 → 10,662 | 71.2% | 5,172 → 2,576 |
| 768 × 900 | 21,909 → 7,676 | 65.0% | 4,015 → 1,930 |
| 1366 × 900 | 16,384 → 6,855 | 58.2% | 3,878 → 1,971 |

Opening lead: **18→13 words**. Full homepage opening section: **103→51 words at 320/390px**, **103→73 at 768/1366px**; mobile hides decorative supporting cues. Participant initial orientation: **113→53 words** (original intro versus new active-step heading/three orientation paragraphs before consent). This is relocated/contextual reading, not elimination of consent/privacy. Total initially visible study text: 574→279 words including the explicit software-rehearsal label. Privacy, source, saving and withdrawal remain available.

Six main numbered areas: **6→0 default expanded**, independently openable; Constellation, quests, hero and navigation remain directly available. Measured first-screen actionable choices: 12→12 at 320px, 14→14 at 390px, 16→14 at 768/1366px. Therefore mobile first-screen choice count did **not** improve. Both versions retain 26 DOM form controls overall; this is a DOM count, not a claim that controls inside closed sections are visible. Page height reductions measure disclosure, not reduction of total available content.

Start actions: Explore remains one hero action; quest play requires hero Quest plus Play (two). A direct section-3 hash opens automatically. Study now requires adult-voluntary consent plus Begin (two controls), then a source link; original static form had no in-page consent gate, so these counts are not a speed comparison. No consent checkbox gates local blank/partial saving.

### Actual task burden

| Work item | Supplied original 1.0 | Revised shortform 2.0 |
|---|---|---|
| Substantive questions | 8 (4/case) | 6 (3/case) |
| Text-entry fields across session | 12 (11 textareas + optional code) | 8 (6 task answers + optional code/comment); only active task's 3 displayed |
| Rating/select controls | 3 | 3 optional finish controls |
| HTML required attributes | 0 | 0; consent gates Begin, unanswered tasks remain incomplete |
| Employer sources to consult | 2 | Same 2; unavailable/changed/expired status retained |
| External link choices across tasks | 3 | Same 3: 2 employer links and assisted app link |
| Internal task transitions | Both tasks on one static page | Begin, next task, finish: 3 transitions; Back retains answers |
| Task decisions | Four substantive judgments/case | Three brief judgments/case; no hidden game/portfolio completion gate |
| Save steps | Export action then local file handling | One Save action then local file handling; optional readable alternative |
| Tab switching | Employer/app tabs as needed | Employer/app links open separate tabs; same source-only/assisted conditions, no observed switch count |
| Reading scope | Full employer sources and long static form | Same full sources; shorter active instructions, MPT warning before fields |
| Setup/interruptions | Not observed | Not observed; observer timing sheets remain blank; browser intervals/pauses are supporting events only |

Protocol 2.0 uses a proposed two-minute orientation, five-minute cap per task, three-minute optional feedback/save/debrief. Browser cap exhaustion records timed-out work and never certifies completion. Reading sources may still exceed the cap. No actual participant time distribution or feasibility result exists.

Semantic native disclosure state, labels, heading focus, keyboard Enter, restored summary focus, original URLs, deep links, Back, draft preservation, reduced-motion CSS, 320/390/768/1366 reflow and mobile warning order were checked. No horizontal overflow in measured default states. Actual 200% browser zoom and assistive technology: UNTESTED after permission failure; no WCAG certification. Reflow/DOM assertions do not substitute for AT.

## C. Revised study kits

Both supplied archives were available and inspected, not reconstructed. Their original bytes remain unchanged outside the public repository. Digests are in `KIT_VERIFICATION.json`. The participant ZIP contains four standalone HTML forms, START_HERE, plain-text TASK_CARDS, PRIVACY_AND_SAVING, separate FIVE_MINUTE_FIRST_IMPRESSION and VERSION.json (9 files). No installation, account, external script/font, network upload, localStorage or cloud sync is required. Script-disabled users have paper/verbal instructions.

Protocol **opportunitybridge-shortform-2.0**, kit **2.0**, target app **0.9.1**, prospective amendment prepared before additional formal participants. Original A: ADMIN source-only→MEDIA assisted; B: ADMIN assisted→MEDIA source-only. Both originally began ADMIN, an order confound. New C: MEDIA source-only→ADMIN assisted; D: MEDIA assisted→ADMIN source-only. Case facts/questions are equivalent across conditions; assign cyclically in blocks before outcomes, record deviations. This is counterbalancing, not randomization or proof of causal effect.

Three short answers preserve source grounding, selected qualification interpretation, unknown eligibility and next steps. Separate exact-pay/deadline/all-four-material/whole-portfolio scoring burdens were removed; the new five-point private rubric differs. **Do not pool original 1.0, shortform 2.0 or first-impression 1.0.** The independent source-only reviewer benchmark remains CCEB 1.0, unchanged.

The private facilitator ZIP contains original/revised private keys, blind scoring guidance, consent/withdrawal/retention guidance, timing/observation/qualitative blank forms, counterbalancing, amendment, archive digests and anonymous analysis. It is delivered as a local private file outside the repository/Pages/release. The new rubric is developer-authored and awaits independent review; no true participant rows are supplied. The analysis script on the blank CSV returns pending n=0 and excludes rehearsal/withdrawn/incompatible/unverified records. Host governance, actual consent, source-version capture and independent raters are still needed before collection.

Both ZIPs pass CRC and clean extraction/byte checks. Extracted A/B forms were opened in the browser, consent/progress exercised and actual files downloaded. A/B/C/D assignments are unit-tested. Empty/partial/complete/Unicode/500-character/withdrawn JSON and readable text were inspected. The local response parser validates original task IDs, correct order/conditions, protocol and actual generation timestamp without treating the file as verified participation. QA files are explicitly rehearsal=true and retained privately, never counted or published as participant results. Both exact official employer links retrieved successfully in the source scan; they are current URL endpoints, not promises of availability or fresh qualification approval. Public app link and kit files are checked again at publication.

[Public Participant Testing Kit](../../output/OpportunityBridge-v091-Participant-Testing-Kit.zip). Private facilitator delivery is deliberately not a public URL. SHA256s and exact ZIP manifests: [verification record](../../output/usability-v091/KIT_VERIFICATION.json).

## D. Software verification and regressions

- **148 JavaScript tests** (all 138 preserved plus 10 new study tests) and **6 Python tests** pass.
- **96 preserved browser assertions** pass: 15 base +23 real +25 v0.6 +9 evaluation +24 v0.7. **74 Evidence Room assertions** pass. **36 new usability assertions** pass.
- **12 native functional checks +5 quest checks** pass, with actual Journey/Passport/learning JSON, repaired HTML and MPT Markdown handoff contents inspected.
- **10 native usability workflows** pass: Explore; keyboard section close; direct section-3 open; retained Passport draft across sections; pre-question MPT warning/source; correct Source Detective; rejected eligibility assumptions; extracted A consent/start; extracted partial B save; actual response parsing/condition metadata. Six participant files downloaded, no automatic upload. Programmatic harnesses and native software walkthroughs are both software QA, not genuine participants.
- Unit checks cover condition balance, actual answer counts, partial exports, independent-participation false, pause/timeout, Unicode bounds, common private-pattern rejection and withdrawal. Sensitive-pattern screening is bounded and cannot detect every private detail.

Three calendar-dependent legacy tests initially failed. The same failures were reproduced on untouched v0.9: source approvals crossed their existing 48-hour limit. Assertions, source approval dates and production freshness policy were **not relaxed**. Explicitly labeled `rehearsal-index.html` / `rehearsal-evaluation.html` use historical 2026-10-27T12:00:00Z only for those software fixtures; normal index/evaluation retain actual clock and stale-source holds. Paths/bootstrap changed, safety assertions retained; cache-versioned builds resolved stale test-module loading. Initial failing receipts are preserved in `calendar-dependency-before.json`. The exact product-version assertion changed 0.9.0→0.9.1 only.

The unchanged 60-case CCEB ran twice from a clean archive of the implemented code and matched every retained method output. Dataset SHA256 **ae6cab115731c5628846ee46da01effdb63574e550dd2b42d33a15fe77360f51**. Production remains **23/25 selected conditions; 10/10 deadlines; 6/12 classification versus 12/12 for both simple baselines**. Original runs, errors, authoring defect and directed repairs are preserved. No new benchmark or accuracy gain is claimed.

Source scan at 2026-10-29T04:49Z: 6 unchanged, 5 unavailable, 1 expired; all remain stale against old approval dates. MPT/ADMIN endpoints retrieved with identity/fragments intact; no observation renewed approval. Source freshness can legitimately prevent current interpretation. Frozen exercise source version 0.8.1 is disclosed, not relabeled current.

## E. Research integrity

**External qualitative reviewers: 1 reported. Completed formal timed independent sessions: 0. Independent gold adjudicators: 0.** No invitations, participant recruitment, real consent, raters, task accuracy, duration, satisfaction scores, employment, placements, return intention or subgroup effects were invented. Human timing/results remain blank. No measurements establish faster completion, improved comprehension, preference, engagement, accessibility for actual AT users or career benefit. Structural reductions and deterministic software behavior are observed; human usefulness remains a hypothesis.

## F. Judging and submission readiness

Internal simulated ten-criterion assessment remains **87/100**, with no forced increase. Both technical and nontechnical perspectives, exact evidence and limitations are in the reassessment. Interface refinement improves the prototype's presentation but cannot raise Career Impact/Equity on absent outcomes. Current entry remains the existing Kenny! saved draft. Final code/public SHA, CI/deployment results, asset downloads and exact save/reload receipt are verified during publication and delivered as separate release receipts to avoid self-referential commit claims.

The retained title, demo/repository/walkthrough URLs, one-member team and pilot PDF must stay unchanged. No judging submission, legal/institutional declaration, team change or outreach is authorized or performed. Owner still needs the shareable member-profile route/organizer clarification, personal/institutional/IP/prize permissions, final draft review and explicit submission authorization before November 6, 2026, 11:59 PM EST. No host/funds/staff commitments or ethics approvals are claimed.
