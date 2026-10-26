# 60-day pilot operations kit · v0.4

**Proposed only. No institution, employer or participant has agreed.** Use with PILOT_PLAN.md; the $6,240 economic budget and $500 cash envelope if labor is donated are unchanged. The public source mappings were reviewed by Codex, not an independent HR reviewer. Before pilot use, two authorized people must approve each mapping.

## Staff and intake

Campus lead (32 hours): owns recruitment, consent, advising and withdrawal. Municipal HR reviewer (16): validates source criteria, substitutions, deadlines and escalation. Content steward (20): maintains a 25-record inventory and twice-weekly checks. Maintainer (20): repairs defects and preserves versions. Independent evaluator (16): freezes tasks, counterbalances order and coordinates blinded scoring. Accessibility reviewer (8): tests accommodations and paper alternatives. Each role requires a named backup and an agreed availability window before launch. Cost rates and totals are in PILOT_PLAN.md.

Intake: public accessible invitation → adult self-selection → plain-language consent → accommodation/device choice → pseudonymous task ID → random matched task order → identical source packet → optional independent follow-up consent. No grades, disability details, citizen status, résumé or identifiers enter the public app. Campus scheduling stays in its existing approved system, separate from evaluation IDs. Services remain available when a learner declines or withdraws.

## Source verification SOP

1. Open the publisher's official source; distinguish job, intake, ongoing program, discovery link and historical account.
2. Record title, employer, stable ID, pay, location/remote, opening and closing date with timezone, materials, exact short excerpts, substitutions and missing conditions. Save an approved internal snapshot/hash for evaluation, with reuse permission checked.
3. Review the complete source, not a search snippet. Maintain required/preferred distinction and exceptions. Never infer sensitive eligibility or turn keyword overlap into a positive decision.
4. Reviewer A maps a selected condition; independent reviewer B verifies it against the full source. Record both names/roles privately, date, scope, disagreements, confidence (high/medium/low with reason) and unresolved questions. Low confidence remains unknown; no unresolved rule is activated for pilot use.
5. Check links twice weekly and before advising. Mark stale after 48 hours; expired deadlines leave default results automatically. Manual removal is required for early withdrawal. Do not extend dates without new official evidence.
6. Revalidate within 48 hours before submission and before each pilot session. `npm run sources` checks schema, not live freshness; `python3 scripts/source-observations.py` checks public retrieval/excerpt consistency and does not approve or refresh a record.

## Learner-facing consent template (host must approve)

“You are invited to test a career-information worksheet for about 30 minutes. Participation is voluntary and will not affect your advising, education or employment. You will use fictional facts and public job sources. We record a study ID, task answers, completion, actions and elapsed time, plus optional feedback. Do not enter personal identifiers or sensitive information. You may skip questions or stop at any point. The app keeps drafts only in this browser tab; downloaded files remain on your device. We will use aggregate findings to improve the service. Your institution will identify the responsible contact, retention date and withdrawal route before you agree. Human/paper assistance and accommodations are available. Any participation compensation is independent of completion. Do you consent to these task records?”

Optional follow-up: ask separately whether the learner permits a 14-day report of their chosen next action. Do not make this a condition of services. Do not collect application identifiers or proof containing sensitive data. Store any necessary linkage in the host system, restrict access and delete within 90 days after close unless approved policy requires otherwise. Withdrawal cannot retrieve already published non-identifiable aggregate results; explain the limit in advance.

## Advisor scoring rubric

Blind to condition, score each item 0/1: (1) correct official source and deadline; (2) required/preferred/substitution distinction; (3) uncertainty and missing conditions preserved; (4) plausible artifact supported by learner declarations; (5) specific feasible next step before the real deadline. Actionable means ≥4/5 with no false definite qualification statement. A second rater scores independently. Record disagreement, reconcile against source and publish numerator/denominator plus missing work.

## Accessibility protocol and paper route

Test keyboard-only selection, focus order, escape from controls, visible focus, meaningful headings, labeled inputs, exported text and 200–400% zoom; test mobile reflow, reduced motion, high contrast and actual screen-reader reading with an access specialist. Ask about needed assistance without collecting diagnoses. A source-read-only printout, blank evidence table and the same advisor questions form the paper/telephone alternative. Print the selected app checklist or use evidence/real-manual-worksheet.md. Report unresolved barriers honestly. English-only content is a limitation; reviewed translation needs budget and governance.

## Weekly deliverables and outcome dashboard specification

Weeks 1–2: signed responsibilities, governance determination, consent and 25 double-reviewed sources. Weeks 3–4: frozen tasks, gold review, accessibility fixes and dry run. Weeks 5–6: up to 25 consenting adult sessions; counterbalance matched manual/assisted tasks. Weeks 7–8 plus days 57–60: follow-up, blinded scoring, costs and aggregate go/no-go report.

Dashboard input schema: study ID, condition/order, task ID, source-version hash, attempt/completion, correct/total criterion judgments, evidence-complete/expected fields, unsupported claims, missed required conditions, actual interactions, actual elapsed seconds, five rubric items, assistance route and optional 14-day action status (self-report versus advisor-confirmed). Missing stays null, not zero. No contact information or sensitive characteristics. Output: raw denominators, medians/ranges, disagreements, withdrawals, blockers and workload. No causal hiring claim, fabricated time, subgroup parity assertion or confidence interval from this small convenience cohort.

Continue only with willing hosts, acceptable correctness/access and manageable upkeep. Institutions can use MIT source, standard browsers, printed worksheets and ordinary spreadsheets; no proprietary API or learner fee is required. Scale after a repeat audit, not after a polished demo alone.
