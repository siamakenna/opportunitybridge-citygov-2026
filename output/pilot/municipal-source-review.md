# Municipality / HR source-review checklist

Proposed role, not a committed agency. Double-review 25 candidate opportunities before pilot use.

- [ ] Open the original complete official announcement; record exact recruitment ID and canonical URL.
- [ ] Record actual inspection time, reviewer ID and method; compare opened/closing dates and timezone. Continuous recruitment has no invented closing date.
- [ ] Inspect every mandatory and preferred condition, sensitive condition, education/experience substitution, accepted document and application destination.
- [ ] Preserve exact selected excerpts and surrounding context; do not infer stacking, accreditation or military equivalence.
- [ ] Run `npm run sources:scan`; inspect identity, withdrawal, excerpt, content and fetch failures. Failure is unknown, not confirmation.
- [ ] Run `npm run sources:prepare -- <id>`. This creates an unapproved candidate only.
- [ ] Fill actual findings, method, reviewer, inspectedAt and verify/hold decision. The source/mapping/raw hashes must match the inspected observation. An official alternate reader needs an explicit evidence object; automated failure stays visible.
- [ ] Have a second reviewer adjudicate the complete mapping. Keep disagreements and hold uncertainty.
- [ ] Apply `node scripts/approve-source-review.mjs <file>`, run tests, benchmark and build, then publish and compare public source.json to the successful Pages SHA.
- [ ] Recheck within 48 hours and before application; urgent changes/withdrawal go to the content steward and technical maintainer immediately. Hold the record until resolved.

Daily GitHub observation produces artifacts/summary only. It has read-only repository access and does not approve, commit or deploy changes. The latest scheduled artifact may be newer than the public catalog: a named steward must inspect it. GitHub schedules can be delayed; manual checking remains available.
