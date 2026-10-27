# Career Constellation v0.8.1

The current release adds six actionable nodes and two alternative routes for each declared interest. Discover opens real source content and matching discovery; Learn opens an individually reviewed learning resource; Practice opens a working quest; Build opens the source-linked Passport; Prepare opens Advisor Studio; Connect uses the actual official application/program URL. All nodes are freely available. The text/list toggle exposes the same controls and content. Viewing a node is labeled “viewed,” never a learning accomplishment.

Twelve authored routes explain their source relationship. Accessibility practice relates to MPT’s published content duties. Administrative interpretation uses the frozen Specialist I source. NIH/DOE and MotorWeek routes explicitly identify the MPT exercise as a separate, illustrative planning skill, not those employers’ qualification rules. The optional fourth quest was skipped to preserve the three tested experiences.

## Storage and portable schema

Journey saving is off by default. Only an explicit “Save my journey on this device” opt-in writes the single localStorage key `opportunitybridge.journey.v1`. No cloud service, credential storage, third-party tracking or silent sync. Normal hosting request logs remain. Other device users can inspect local storage; it is not suitable for actual private educational/employment records.

`opportunitybridge-journey-1` / product 0.8.1 records savedAt, sourceCatalogRevision, questVersion, interest, route, saved source URLs, completion ledger, viewed node IDs, locally generated handoff IDs, selected source ID and up to three explicitly captured fictional Passport drafts. A draft retains at most five connections and its original source ID/URL/review timestamp/mapping hash/catalog revision. Actual applicant facts, contact details, private notes, document confirmations and credentials are not captured. Editing a Passport never silently captures its text: press “Capture current fictional Passport draft” to replace that snapshot. Basic rejection of contact/identifier patterns supplements, and does not replace, the fictional-only restriction.

Strict validation bounds file size (128KB), depth, lists and text; rejects unknown fields, HTML markup, unsafe object keys, unsupported URLs/IDs/schema/product/quest versions, invalid source associations and forged check structures. Corrupt/incompatible device data is safely reset. Policy/quota failures are reported and saving disabled. Only this app’s key is deleted; unrelated origin data is untouched. If a browser blocks deletion, the UI explicitly asks the user to clear site storage. No deletion guarantee is made against browser policy.

Import replaces the working journey and does not opt in to persistence. All imported completion records/milestones are unverified; no imported XP/completion award. Replaying all current checks can replace that record with a new local completion, once per quest/version. Device-restored imported records remain unverified. These are unsigned product learning records, not tamper-proof credentials. A modified local browser profile can never be trusted as an employer certification.

Saved/imported draft provenance is separately exported in Passport connections; it never renews current source dates or approves a mapping. Current catalog conditions and unknowns are recomputed. Clear Saved Journey and opt-out delete durable app data, while leaving current working memory explicit. Reset whole session deletes both working drafts and saved app data. Another-tab storage changes pause automatic saving to prevent resurrection of a deleted copy. Downloaded files remain user-controlled and are not deleted by the app.

## Discovery and relevance

Earn, Learn, Build experience and Explore routes display actual matching individual/directory counts. Category chips expose the existing structured types. Five individual learning resources and three directories supplement the catalog; a directory is never an individual vacancy. Neutral chronological and alphabetical sorts remain available.

The explained relevance order is a stable lexicographic sequence: selected goal, visible interest/skill/sector match, source-reviewed type, student/recent-graduate audience metadata, known duration within a selected short-study preference, recorded source freshness, and announced future deadline. Unknown fields do not gain implied values. Remaining ties retain neutral source order. No demographics, protected characteristics, hiring probability or suitability percentage is inferred. Each suggested result exposes its source-based reasons.

## Software evidence versus people

The new browser harness performs two fresh, same-origin iframe trials with the fixed `data/trial-v08.json`, discovery clock 2026-10-27T12:00:00Z, tech interest, fictional source-reading exercise and absent journey storage key. It exercises all 15 required tasks, including real reload, generated JSON Blobs, storage deletion, file-input import, unverified receipt and complete reset. Separate UI-driven actual downloads/import/new-tab checks inspect files on disk. It normalizes only generatedAt, completedAt, savedAt and personal due timestamps; source dates, hashes, versions, checks and unknowns stay exact. Timings are synthetic, unthrottled and share browser cache.

The 117 previous Node checks, six Python checks and 96 browser assertions remain required alongside 16 new journey tests. Classification and safe journey tests are explicit blocking steps in both publishing workflows. Independent unfamiliar participants remain **n=0**. No learning, return, employment, equity or causal speed benefit is established by these software trials.


## v0.8.2 repair

Product0.8.1 Journey data migrates to0.8.2; schema and learning version0.8.1 remain compatible. A content-only capture comparison ignores display provenance, reports current uncaptured/edited text, and never silently captures it. Reset working session pauses saving and preserves the existing device copy; Delete saved device copy leaves working memory; Delete everything resets both. Native input selection enters a validating status before accepted/rejected feedback. Active filter/count feedback and focus retention are repaired. See V082_AUDIT_REPORT.md for actual pre/post checks and unavailable zoom/AT tests.
