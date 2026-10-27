# Opportunity Pulse: sources, permissions and limits

Pulse is a dated public-data snapshot, never a live connection or nationwide job search. The reviewed catalog remains a separate source artifact. A lead's recent observation does not renew its qualification-review date.

| Source | Status | Basis and exact limits |
| --- | --- | --- |
| [Maryland public RSS](https://www.jobapscloud.com/MD/rss.asp) | Connected | The [official recruitment index](https://www.jobapscloud.com/MD/) explicitly advertises this RSS feed. One daily syndication request; store only public vacancy title, department, location, pay, identity, publisher/observation dates and deadline metadata. No analyst names, contacts, applications or full announcement copies are retained. |
| [USAJOBS Search API](https://developer.usajobs.gov/api-reference/get-api-search) | Not connected | Official [authentication](https://developer.usajobs.gov/guides/authentication) requires an API key and the email used to register it. Headers: Host=data.usajobs.gov, User-Agent=registered email, Authorization-Key=owner-approved key. No credentials were requested, invented, accepted or published. Owner controls registration/terms and any future GitHub secret setup. |
| USAJOBS public-data reuse | Evaluated, disabled | [Terms](https://developer.usajobs.gov/guides/terms-of-service) permit reuse of public API data with accuracy/non-affiliation duties; access still requires credentials. [Documented query limits](https://developer.usajobs.gov/guides/rate-limiting): at most 500 rows/page and 10,000/query; other safeguards may change. A future adapter must recheck terms and quotas and redact all credentials from artifacts/logs. |
| [DC careers](https://careers.dc.gov/) and municipal portals | Link-only fallback | No documented permitted vacancy API was verified here. No authenticated scraping, anti-bot bypass or claim of comprehensive municipal coverage. |
| NIH / DOE education-to-government research intakes | Existing reviewed catalog | Curated official announcements and source dates retained. These are not an autonomous nationwide fellowship feed. |
| LinkedIn / Handshake / general search | Optional outgoing links only | No private-platform scraping, imported applicant data, API purchases or implied partnership. |

The initial advertised RSS response contained 331 items; 320 passed the strict numeric recruitment identity/URL schema. Nonstandard/template identities are excluded. These are metadata records, not 320 individually reviewed or guaranteed open jobs. Publisher timestamps are retained exactly, including EST labels supplied outside winter. Maryland local deadline timezone is assumed using America/New_York; no closing date is invented for continuous recruitment. Keyword categories describe discovery, never applicant eligibility.

## Pipeline and failure behavior

Public RSS → allowlisted metadata → identity normalization/deduplication → dated discovery snapshot → review queue → explicit source/mapping approval → preparation-ready catalog. The collector cannot write src/catalog.js or approve a requirement. Normalization drops arbitrary extra fields. Learner declarations never enter the collector or public JSON.

`npm run pulse:refresh` performs the public RSS observation. A successful prior public snapshot is used to preserve first-observed dates and compare publisher metadata across daily runs. On failure, lastSuccessAt remains unchanged and fetchStatus becomes unavailable; no failed fetch is treated as confirmation. A missing feed item is only “not present,” not proof of withdrawal. A body hash change is not an adjudicated requirement/pay/deadline change. The UI explains these distinctions and exposes the source-review queue.

The daily 14:17 UTC workflow now publishes permitted discovery/observation snapshots to the existing Pages site after tests. It does not commit repository changes, renew reviewed dates or edit executable mappings. Source-change/unavailable/unreviewed observations place runtime holds on positive interpretations. Source-specific approval remains an explicit curator action. Both publishing workflows share the Pages concurrency group; a scheduled job skips deployment when its code SHA is no longer main. GitHub schedules may be delayed; manual commands and workflow dispatch remain available.

`source.json` records the code SHA, successful/attempted discovery dates, record count and SHA-256 of the exact published Pulse JSON. Metadata can update under the same code SHA; the snapshot hash and dates identify that update. Browser code makes one credential-free same-origin GET for the public snapshot, with no-store caching. No query, draft, Passport or learner profile is sent. A snapshot/catalog revision mismatch holds preparation and requests a reload.

No public agency endorses OpportunityBridge. Full current official announcements control all applications. Reinspect reviewed sources within 48 hours near November 4–5; ongoing discovery does not remove this owner/steward responsibility.
