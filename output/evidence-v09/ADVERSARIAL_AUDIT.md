# Red-team audit — original cases and directed repairs

Twenty named scenarios map to twenty existing cases in data/cceb/v1.json; they are not extra independent samples. RED_TEAM_RESULTS.json retains all actual/reference outputs. Original exact matches: 17/20. R04/C01, R05/C03 and R06/C04 conservatively return unknown instead of authored job. Those remain exact failures. This prevents interpreting INTERNAL as intern, graduate as entry-level or contractual as a short engagement, but does not establish full classification accuracy.

R01/U03 checks a missing education declaration, not a full applicant decision. R02 expiry, R03 continuous/no availability promise, R07 changed URL, R08 course, R09 guarantee, R10 missing pay, R11 unavailable source, R12 changed mapping, R13 similar recruitment, R15 invalid receipt, R16 external instruction text, R17 contradictory dates, R18 partial substitution and R20 identity mismatch retain their raw outputs. No critical provenance/receipt approval bypass observed in these controlled cases. External text is never evaluated as code.

R14/A02 and R19/A04 original passes were confounded by the authoring defect; corrected complete-row diagnostics exposed two misses and directed repairs. See ERROR_ANALYSIS.md. Neither original 17/20 nor diagnostic 7/7 establishes comprehensive semantic safety. C05/C06 additional participant-title failures remain in the failure log with before/after, even though outside the twenty named map.

All source changes are synthetic copies: revised deadline D09, withdrawn/unavailable/identity holds in SOURCE_CHANGE_SIMULATION.json, qualification P02, identity P03/P05 and snippets D05. Authentic employer pages were not changed. Review dates never renewed by observation.


Additional post-freeze R09 diagnostic explicitly tested a fellowship plan claiming a guaranteed internship, rather than relying on the adjacent guaranteed-job fixture. It exposed a third literal-screen miss; R09_DIAGNOSTIC_BEFORE/AFTER.json preserves the complete row and directed repair. The shared Passport/Quest screen now includes internship/placement guarantees. This is a known-case repair, not independent evidence of general claim safety.
