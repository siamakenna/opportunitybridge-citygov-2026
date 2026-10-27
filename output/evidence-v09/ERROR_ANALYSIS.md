# Errors, corrections and residual limits

The frozen original run has eight production discrepancies: Q09, Q12 and C01–C06. No failure was removed or relabeled. FAILURE_LOG.json retains each trigger, source, actual response, expected answer, severity, hypothesis, reproduction, decision and retest.

Q09: twelve financial months and zero accounting credits, military/vocational no. Authored selected-condition reference is conflict; production conservatively abstains. Its negative branch covers months below twelve, so this boundary remains unknown. Hold for human review; not a false eligibility certification.

Q12: Administrative Specialist III education yes. Authored reference is supported for the selected credential only; production's human-only rule abstains. Hold rather than add new eligibility automation from a single authored example.

C01–C04: explicit full-time job summaries; title-only production abstains. Keyword A and explicit-metadata B correctly describe them. This is a coverage/classification weakness, not evidence that INTERNAL is an internship or graduate is entry-level. Residual: the system cannot recover every stated arrangement from arbitrary summary text.

C05/C06: Internship Coordinator/Fellowship Program Manager were incorrectly labeled participant openings by title keyword. Scoped production repair returns unknown for program staff headwords (coordinator/manager/director/administrator). Directed retest removes those participant-category false positives; it still does not match authored job labels. Exact classification remains 6/12. Do not count unknown as job-correct.

## Benchmark construction defect

The authoring helper's spread order replaced six partial adversarial rows rather than merging them into the complete five-field row. Frozen plan states 7/7 are therefore confounded by absent fields and cannot prove 7/7 claim-screen accuracy. Original data and scores are immutable. DIAGNOSTICS_BEFORE.json restores the same base row to isolate each question, explicitly post-result/non-independent. A02-complete-row and A04-complete-row then failed: employment phrasing and certain-hiring phrasing escaped the literal screen. Before outputs are preserved. A small production pattern extension flags those exact families; DIAGNOSTICS_AFTER.json is 7/7 directed diagnostic states, not independent evaluation. Unknown phrase variants, sarcasm and semantic falsehoods remain outside a deterministic literal screen. Human verification is mandatory regardless of a complete draft label.

Reproduce original observations from protocol-freeze e977a95; current code reproduces directed-retained results. `node scripts/cceb-diagnostics.mjs /tmp/diagnostics.json` reruns corrected diagnostics. Literal completion never establishes truthful experience, career impact or overall eligibility.


Additional post-freeze R09 diagnostic explicitly tested a fellowship plan claiming a guaranteed internship, rather than relying on the adjacent guaranteed-job fixture. It exposed a third literal-screen miss; R09_DIAGNOSTIC_BEFORE/AFTER.json preserves the complete row and directed repair. The shared Passport/Quest screen now includes internship/placement guarantees. This is a known-case repair, not independent evidence of general claim safety.

A final cross-release browser check exposed cached source.json displaying an older release SHA while the entry module was current. METADATA_CACHE_REPAIR.json preserves actual before values. Metadata now uses the build releaseRevision in its request URL, and a new browser assertion checks displayed revision against the actual release module. This is a provenance-display repair; qualification approvals and benchmark references are unchanged.
