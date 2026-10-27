# v0.6 official source inventory

Twelve records: five specific Maryland recruitments, two dated research intakes, four ongoing pathways and one expired intake. Eleven default records at observation; not twelve open jobs.

| Record | Original recruitment/program | Deadline | Source-backed review (UTC) | Source |
| --- | --- | --- | --- | --- |
| Administrative Specialist I | 26-001755-0041 | 2026-11-03T17:00:00-05:00 | 2026-10-27T00:22:27.535Z | [Official announcement](https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=26&R2=001755&R3=0041&b=) |
| Vendor Table Technician / Fiscal Accounts Clerk II | 26-004518-0015 | 2026-11-05T23:59:00-05:00 | 2026-10-27T00:22:27.538Z | [Official announcement](https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=26&R2=004518&R3=0015&b=) |
| NIH Summer Internship Program · 2027 | nih-sip | 2027-01-26T12:00:00-05:00 | 2026-10-27T00:22:27.538Z | [Official announcement](https://www.training.nih.gov/research-training/pb/sip/) |
| NIH Postbac Program | nih-postbac | No individual vacancy or deadline verified | 2026-10-26T18:03:34Z | [Official announcement](https://www.training.nih.gov/research-training/pb/pb/) |
| Federal Pathways internships | federal-student | No individual vacancy or deadline verified | 2026-10-26T18:03:34Z | [Official announcement](https://www.usajobs.gov/hiringpath/students/) |
| Federal Pathways Recent Graduates | federal-grad | No individual vacancy or deadline verified | 2026-10-26T18:03:34Z | [Official announcement](https://www.usajobs.gov/hiringpath/recentgraduates/) |
| Federal entry-level opportunities | federal-entry | No individual vacancy or deadline verified | 2026-10-26T18:03:34Z | [Official announcement](https://earlycareer.usajobs.gov/search/results) |
| Coding it Forward · 2027 Winter Fellowship | cif-winter | 2026-10-25T23:59:00-07:00 | 2026-10-26T18:03:34Z | [Official announcement](https://codingitforward.com/apply) |
| DOE Science Undergraduate Laboratory Internships · Summer 2027 | doe-suli | 2027-01-06T17:00:00-05:00 | 2026-10-27T00:22:27.538Z | [Official announcement](https://science.osti.gov/wdts/suli) |
| MotorWeek Student Fellow | 26-008996-0006 | Open/continuous in official bulletin; no announced closing date | 2026-10-27T00:22:27.538Z | [Official announcement](https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=26&R2=008996&R3=0006&b=) |
| MD Center for Media Literacy & Education Student Fellow | 26-008996-0007 | Open/continuous in official bulletin; no announced closing date | 2026-10-27T00:22:27.538Z | [Official announcement](https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=26&R2=008996&R3=0007&b=) |
| Administrative Specialist III | 26-002043-0037 | 2026-11-09T17:00:00-05:00 | 2026-10-27T00:22:27.538Z | [Official announcement](https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=26&R2=002043&R3=0037&b=) |

Seven announcements inspected again late October26 Eastern time / October27 UTC. The new MDE Administrative Specialist III (26-002043-0037) closes November9 5PM, $52,354–82,572/year. It requires a high-school credential/equivalent and two qualifying administrative years with published college/military alternatives; this app does not execute a new eligibility formula for it. Read the complete source and supplemental questionnaire. Its Maryland local timezone is assumed from the bulletin.

MPT Media Literacy and MotorWeek remain two specific open/continuous recruitments at inspection, $15.50/hour. Accredited student/recent-graduate routes, high-school junior/senior conditions, minimum16hours/week and four college document items were read again. Media Literacy duties include HTML educational resources, accessibility/PDF support, Moodle and communications. Duties are not invented minimum qualifications.

Five deadline-compatible options beyond November6: md-admin3, both MPT roles, NIH SIP2027 and DOE SULI Summer2027. This is a deadline-only observation, not future availability/freshness. Admin I closesNov3 and fiscalNov5; CIF's Oct25 intake remains expired. Reinspect the most relevant announcements November4–5, within48hours. Ongoing indexes never count as individual jobs.

Raw automated retrievals: 7 success / 5 failure. NIH SIP separately inspected via official reader; its curl failure remains visible. The new MDE source was fully read from actual HTTPS announcement text after the web reader failed. Four pathway timestamps were not renewed. Source-backed Codex review is not independent HR validation. Original ledgers remain in evidence/reviews.

Run npm run sources:scan → inspect prioritized queue → npm run sources:prepare -- <id> → inspect full source and fill actual findings/time/reviewer → explicit approve-source-review.mjs <file> → tests/build/publish → public source.json comparison. Candidate files never approve anything. Full announcement/raw, semantic and selected mapping hashes guard changes. Changed/withdrawn/identity/excerpt errors have priority0; deadline urgency priority1; stale/unavailable/unreviewed priority2.

Daily14:17UTC GitHub workflow source-check.yml creates a step summary and seven-day artifacts only, with read-only repository permission. It neither changes dates/rules nor commits/deploys. Schedules may be delayed. A steward must inspect the artifact, approve supported updates and publish. The public report is a release snapshot, not a live monitor. Manual commands remain sufficient without scheduling.
