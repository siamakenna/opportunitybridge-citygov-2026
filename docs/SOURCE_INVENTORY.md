# Source inventory · real opportunities first · v0.4

Canonical records: [src/catalog.js](../src/catalog.js). Nine records: two government vacancies, two dated research intakes, four ongoing pathways and one expired fellowship intake. The default view shows eight; portal/discovery links are separate. These counts are not nine open jobs. Records contain source/application URLs, timestamps, employer, type, stage, pay, dates, selected source text, required/preferred distinction, substitutions, materials, restrictions, reviewer and limits.

| ID / official source | Type and observed state | Deadline |
| --- | --- | --- |
| [md-admin](https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=26&R2=001755&R3=0041&b=) | MDE Administrative Specialist I · vacancy | Nov 3, 2026, 5 PM; Maryland time assumed |
| [md-vendor](https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=26&R2=004518&R3=0015&b=) | Comptroller Vendor Table Technician · vacancy | Nov 5, 2026, 11:59 PM; Maryland time assumed |
| [nih-sip](https://www.training.nih.gov/research-training/pb/sip/) | NIH 2027 summer research intake | Jan 26, 2027, noon ET; references have separate due date |
| [nih-postbac](https://www.training.nih.gov/research-training/pb/pb/) | NIH year-round postbac application pathway | No individual placement verified |
| [federal-student](https://www.usajobs.gov/hiringpath/students/) | Federal student internship pathway | Check each announcement |
| [federal-grad](https://www.usajobs.gov/hiringpath/recentgraduates/) | Federal recent-graduate pathway | Check each announcement |
| [federal-entry](https://earlycareer.usajobs.gov/search/results) | Federal entry-level search pathway | No individual vacancy verified |
| [cif-winter](https://codingitforward.com/apply) | Coding it Forward Winter 2027 · expired intake | Oct 25, 2026, 11:59 PM PT; overrides stale open wording |
| [doe-suli](https://science.osti.gov/wdts/suli) | DOE SULI Summer 2027 intake | Jan 6, 2027, 5 PM ET |

Official-source inspection: October 26, 2026; per-record UTC timestamps and review provenance in catalog.js. Sources reviewed by Codex; no employer or independent human approval. The web tool could read USAJOBS pages; direct curl retrieval was blocked for some of those URLs. The DOE-linked application redirect returned 403 to automated access, so the direct provider destination and limitation are recorded; use the DOE page if access fails. NIH and Maryland destinations may lead to sign-in/terms; nothing is accepted or submitted by this app. A date is not a guarantee against early withdrawal.

`evidence/source-http-observations.json` records actual public HTTPS retrieval hashes and short-excerpt checks, including failures. It does not independently validate employer rules. No full interviews or private records are redistributed. Old v0.2 resources.js is retained for original regression fixtures; the main application uses catalog.js.

## Lifecycle

Passed deadlines leave the default view and remain in history. After 48 hours, a previously checked source is visibly stale and selected-condition positive interpretations are suppressed pending recheck. Missing verification provenance remains unverified. Ongoing pathways never claim an individual vacancy. Static dates cannot detect early withdrawals; the steward must check. Do not automatically refresh observation timestamps without inspecting the source. Revalidate within 48 hours before competition submission. See PILOT_OPERATIONS.md for the two-reviewer pilot gate.

## Historical work gallery

Canonical [outcomes.js](../src/outcomes.js) includes five short attributed records. [PITcases](https://pitcases.org/portfolio/coding-it-forward-civic-digital-fellowship-and-civic-innovation-corps/) publishes Andrade, Kurbonshoeva and Badri’s first-person accounts; do not treat them as independent impact measurements. [NIH’s interview](https://datascience.nih.gov/director/directors-blog-conversation-with-coding-it-forward-civic-digital-fellow-snipta-mallick) describes Mallick’s fellowship and later contractor-supported work. [NIH’s 2022 project report](https://datascience.nih.gov/meet-coding-it-forward-civic-digital-fellows) documents Mahadeshwar’s deliverable. Year is left unestablished when the source does not resolve it. Offers are not accepted jobs; contractor work is not labeled federal civil service. No photos, contacts or substantial quotations are reproduced.

Skills categories and portfolio exercises are OpportunityBridge interpretations/recommendations, not the fellows’ artifacts. None of these people endorse OpportunityBridge, held the cataloged Maryland roles, or demonstrate our outcomes.

## External discovery

Google general job search (not Google-company careers), LinkedIn Jobs, optional institutional Handshake, USAJOBS, Maryland, DC and Philadelphia portals are outbound routes. No login-wall scraping, API partnership or validation of individual search results. Official employer links remain primary. DC listing content was not readable in automated review; Philadelphia is a search resource, not a verified intake.
