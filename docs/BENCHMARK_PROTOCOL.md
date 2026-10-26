# Frozen comparison protocol v1 · October 26, 2026

## What is frozen

`evidence/benchmark-cases.json` contains four fictional tasks with explicit facts, exact sample source briefs via `src/core.js`, and expected judgment states authored separately as fixtures. `scripts/benchmark.mjs` checks 12 criterion judgments and creates a manual worksheet using identical information. Three additional holdout tasks are reserved in `evidence/holdout-cases.json` for an independent evaluator. Do not tune using holdout results before the main protocol is locked.

**Internal software dry run only.** The fixture author and implementation assistant are the same AI-assisted development process. Expected answers are inspectable but not independently certified. Independent unfamiliar users: n=0. No manual participant runs, human timing, user performance gains or career outcomes have been measured.

## Official-source task set (frozen, not executed)

`evidence/source-tasks.json` adds four real-source interpretation tasks: missing credential/experience evidence, a partial accounting-credit substitution, portal-versus-vacancy classification, and expired-deadline handling. Every task has the exact official URL, observation date, equal fictional starting facts, a proposed answer and a separate source-review instruction. The app intentionally offers no eligibility evaluation for these real postings. Assisted participants must use the official-resource links and the same manual source-check worksheet; extra browsing/steps count against the assisted workflow rather than being hidden.

Before running either condition, a reviewer must verify and privately freeze the complete official bulletins (hash and retrieval date recorded for both arms), check gold answers, and confirm current reuse permissions. Do not publish entire bulletins or imply these unexecuted cases are successful app predictions. The selected summaries in `src/resources.js` are not substitutes for complete employer criteria. This official-source comparison has not been run; correctness, interactions and completion are unmeasured in both arms.

## Equal-starting-information study

Give both conditions the same fictional learner facts, full exact brief, task question and worksheet. If future tasks use real vacancies, freeze full approved snapshots with retrieval dates, URLs and hashes for both arms; never give the assisted arm extra qualifications. Manual condition uses the source document, browser find and a blank evidence table; allow normal notes. Assisted condition uses the app with the same case and source. Neither may browse additional resources during scoring. Separately assess free-search discovery with equal starting URLs as a different task; do not conflate discovery and interpretation.

Task: identify required versus preferred conditions, assign yes/no/unknown from declarations, reproduce the exact source, name a plausible evidence artifact, identify an unanswered question, and write one next action. Give the manual baseline a usable worksheet, not an artificially weak search task.

Before recruitment, have an unfamiliar career advisor verify every gold answer, freeze revisions in Git, and assign randomized counterbalanced matched tasks. Each participant sees different but equivalent cases in the two conditions to reduce learning effects; alternate order. Do not score the three holdouts until this lock. Small samples support descriptive results only.

## Recording and scoring

Use pseudonymous session ID, condition/order, case ID, actual start/end timestamps, interactions, completed fields, criterion judgments, exact citations and accessibility route. Interaction means one intentional click, selection, key command or submitted text field (typing a field counts once); log navigation separately. Do not derive counts from guessed workflow steps. Record interruptions and assistance.

Two raters blinded to condition independently score correctness and evidence completeness; report disagreement and reconciliation. Correctness denominator is all criterion judgments attempted plus missing required judgments; missing counts as incomplete. Evidence completeness: six task fields × task starters. Completion: all six fields present and no unsupported definite qualification. Report raw numerator/denominator and medians/ranges; do not invent confidence intervals or causal hiring benefits. Required versus preferred confusion and false definite qualification are separate error counts.

## Current observed results

Run `npm run benchmark` for current fixture results. It measures deterministic software judgments only. Manual correctness, interaction count, time and task-completion comparison are **not measured**. Baseline worksheet: `evidence/manual-worksheet.md`. Raw dry-run result: `evidence/benchmark-results.json`. A full real-source human comparison remains future work, not a completed validation.
