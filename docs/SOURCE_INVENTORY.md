# v0.5 official-source inventory

Actual inspection October 26, 2026; dates below are UTC. Eleven records, ten visible by default at observation: four specific vacancies, two dated intakes, four ongoing pathways and one expired intake. This is not eleven open jobs.

| Record | Original identity | Kind / deadline | Last source-backed review | Official source |
| --- | --- | --- | --- | --- |
| Administrative Specialist I | 26-001755-0041 | posting; 2026-11-03T17:00:00-05:00 | 2026-10-26T22:29:16.846Z | [Announcement](https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=26&R2=001755&R3=0041&b=) |
| Vendor Table Technician / Fiscal Accounts Clerk II | 26-004518-0015 | posting; 2026-11-05T23:59:00-05:00 | 2026-10-26T22:29:16.848Z | [Announcement](https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=26&R2=004518&R3=0015&b=) |
| NIH Summer Internship Program · 2027 | nih-sip | intake; 2027-01-26T12:00:00-05:00 | 2026-10-26T22:29:16.848Z | [Announcement](https://www.training.nih.gov/research-training/pb/sip/) |
| NIH Postbac Program | nih-postbac | program; No individual vacancy or deadline verified | 2026-10-26T18:03:34Z | [Announcement](https://www.training.nih.gov/research-training/pb/pb/) |
| Federal Pathways internships | federal-student | program; No individual vacancy or deadline verified | 2026-10-26T18:03:34Z | [Announcement](https://www.usajobs.gov/hiringpath/students/) |
| Federal Pathways Recent Graduates | federal-grad | program; No individual vacancy or deadline verified | 2026-10-26T18:03:34Z | [Announcement](https://www.usajobs.gov/hiringpath/recentgraduates/) |
| Federal entry-level opportunities | federal-entry | program; No individual vacancy or deadline verified | 2026-10-26T18:03:34Z | [Announcement](https://earlycareer.usajobs.gov/search/results) |
| Coding it Forward · 2027 Winter Fellowship | cif-winter | program; 2026-10-25T23:59:00-07:00 | 2026-10-26T18:03:34Z | [Announcement](https://codingitforward.com/apply) |
| DOE Science Undergraduate Laboratory Internships · Summer 2027 | doe-suli | intake; 2027-01-06T17:00:00-05:00 | 2026-10-26T22:29:16.848Z | [Announcement](https://science.osti.gov/wdts/suli) |
| MotorWeek Student Fellow | 26-008996-0006 | posting; Open/continuous in official bulletin; no announced closing date | 2026-10-26T22:29:16.848Z | [Announcement](https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=26&R2=008996&R3=0006&b=) |
| MD Center for Media Literacy & Education Student Fellow | 26-008996-0007 | posting; Open/continuous in official bulletin; no announced closing date | 2026-10-26T22:29:16.848Z | [Announcement](https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=26&R2=008996&R3=0007&b=) |

New specific recruitments: Maryland Public Television MotorWeek Student Fellow (26-008996-0006) and Maryland Center for Media Literacy & Education Student Fellow (26-008996-0007), each $15.50/hour, open/continuous, student/recent-graduate conditions and at least 16 hours/week. Full employer requirements and document instructions control; no remote placement or continued availability is promised. No qualification automation was invented for these roles.

Four records have an announced deadline beyond November 6 or no announced closing date: NIH Summer Internship Program, DOE SULI Summer 2027 and the two MPT recruitments. This deadline-only capacity is not a verification that they will remain open or fresh on November 6. Reinspect near November 4–5. MD administrative closes November 3, fiscal November 5. Coding it Forward's stated October 25 cutoff has passed and remains in history even if its page says applications open.

## Maintenance operation

Run `npm run sources:scan` to retrieve actual announcements and produce an observation/changed/withdrawn/identity/expiry report. This command does not renew dates or edit mappings. Read the complete official announcement, compare all required/preferred conditions, substitutions, deadline and recruitment identity, and document actual findings. Only then provide an explicit review JSON to `node scripts/approve-source-review.mjs <review.json>`, with source hash, current mapping digest, actual inspection time, method, named reviewer and findings. Use hold for uncertainty; do not relabel a failed fetch as unchanged. Re-run `npm run sources:report`, tests and deploy. Record the exact public source.json revision. This is a manual operating procedure, not an installed unattended monitor.

Selected executable mappings are tied to the exact reviewed qualification snapshot. Unapproved edits return unknown. The app retains 48-hour freshness and deadline gates; builds and timers never renew verification. Review ledgers and baselines are in evidence/reviews and evidence/source-review-baseline.json. A source-backed Codex review is not independent HR endorsement.

Latest raw automated retrievals: 6 succeeded, 5 failed. NIH SIP was separately inspected through the official web reader; its failed curl result remains visible. The ongoing pathways were not renewed. See [full queue](SOURCE_REVIEW_REPORT.md). Program indexes remain search routes, not verified vacancies. Official application links can require sign-in, terms or later employer screening.
