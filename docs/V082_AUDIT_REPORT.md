# v0.8.2 targeted judging audit and repair

This is a repair of v0.8.1 at e8ba988c3c6a186f434992fa751b2055300e4928, not a new feature sprint. Independent unfamiliar participants remain n=0; the internal mock remains 87/100. Software acceptance is a different denominator from judging.

## CityGov saved-field discrepancy: resolved for inspected sessions

Actual DOM value properties contain the expected project title and demo/repository/video URLs. The question prompt is the description placeholder attribute; https:// is the URL placeholder attribute. Neither is the saved value. After reload, the description contains 8,966 characters, begins with SOLUTION DESCRIPTION and ends with the public repository URL. A fresh authenticated tab using the same browser cookies shows the same values. No direct database access or independently reauthenticated login is claimed. The authorized UI does not expose raw backend records; server persistence is supported by reloaded form values. Exact first/last 100 characters and all non-sensitive field values are in evidence/v082/citygov-before-repair.json.

Team Kenny! has one member, Makenna Rodriguez, shown as captain. A team of one is valid. Required named profile fields are populated, the photo renders, and visibility is Public. No shareable member-profile URL or copy-link affordance is exposed in the inspected profile editor. /profile is an account editor, not a claimed public member link. That official submission requirement remains Needs owner confirmation; no URL was invented. No team, eligibility, consent or binding declaration was changed.

The actual saved PDF attachment was retrieved from the href exposed in the authorized portal and is byte-identical to the two-page packet inspected by text and rendered-page review. SHA-256 f1da541c63aff7f776f0daffb9cecbb8bf1989bef67db58800f583ccc6a991f9. Page1 covers proposed host roles, 25 adults/25 sources/60 days and timeline; page2 covers staffing/cost assumptions, outcomes, privacy and evidence limitations. No host, staff or funds are committed. Native link-click download did not complete and is not counted as a successful native download; direct retrieval of the actual exposed attachment URL verified the file. Ordinary app-generated Journey, Passport, ledger, HTML and handoff downloads were obtained through actual native download events.

## Confirmed defects and necessary repairs

1. Generic saved status stayed reassuring after a Passport edit outside its explicit capture. A persistent state panel now distinguishes route/progress saving, no draft, uncaptured draft, captured draft and unsaved changes. Actual Passport input updates refresh the state. Route autosaving never silently captures new text.
2. Device deletion and full reset were easy to confuse. Clearly labeled actions now delete only the saved copy (working memory stays), reset only the working session (device copy stays; saving pauses), or delete everything and reset. Reload checks verify each scope. Existing full-session reset remains.
3. Journey JSON and other outputs were scattered and poorly explained. Save, Export & Restore groups controls, explains Journey/Passport/Advisor/Quest files and visibly labels the native chooser. File selected/validating is distinct from import success. Errors retain role=status, aria-live and input description linkage. Strict validation and zero trusted imported XP remain.
4. Active filters and result counts were below a secondary selector. They now sit directly beside filter controls; pressed states, individual/directory counts, deterministic reset and paid-project empty fallback are preserved.
5. Rebuilding route buttons and the Passport view toggle lost keyboard focus. Route/node focus is restored; the stable Show all five fields toggle retains focus after rendering. Beginner guidance identifies Experience and Next field.

Journey product0.8.1 exports migrate to product0.8.2 without renewing source provenance or trusting imported awards. Schema remains opportunitybridge-journey-1; learning version remains0.8.1 because checks/snapshots did not change. Unknown/future versions remain rejected. All approved qualification mappings and original review dates remain unchanged.

## Executed acceptance and files

Before patch, all T01–T12 and Q1–Q5 were exercised on the public v0.8.1 release using the frozen320-record discovery fixture and clock2026-10-27T12:00:00Z. The functional baseline passes despite the separately confirmed UX defects. After patch, all12 functional and all5 quest checks pass locally, including native file-chooser import of an actual generated Journey, actual repaired HTML and handoff inspection. Reports list actual actions, expected/observed values, status, environment and files; incomplete actions are never marked PASS. The local repair-specific reset/save receipt verifies the new boundaries. Public post-patch receipts are added after deployment.

Q1 awards30XP; Q2 rejects wrong answers and prevents duplicate reward. Q3 awards40XP and downloads self-contained HTML with label association, h2, corrected link/text, no script/external resource/form submission. Q4 rejects empty fields and a separately populated unsupported-eligibility claim. Q5 uses the brief’s exact fictional example, awards40XP and transfers populated fields. Final ledger: exactly3 records and110XP; employer conditions remain unknown. Actual file contents, not button presence, establish these results. Native tests are software trials, not human research.

136 Node tests (133 preserved plus migration/capture feedback regressions),6 Python tests,96 preserved browser assertions, the original two24-check trials and two25-check Constellation trials pass locally. Full public checks follow deployment. Frozen fixture SHA256786d492fb5fdfa10783b16975aa723b7933e0710dc6e2bbcb4fad5325144c366. No new paid microproject or fourth quest.

## Accessibility and known limits

Keyboard, focus restoration, mobile reflow, plain learning view, semantic feedback and native import errors are checked with the working controls. Safari native access was attempted for actual200% browser zoom, but macOS Computer Use permission is not granted. The IAB exposes viewport resizing only. Actual200% zoom remains UNTESTED; viewport testing is not substituted. No actual screen-reader/VoiceOver session is available, so screen-reader usability remains UNTESTED even though live-region semantics are inspected. No certification or physical-device claim.

## Submission gate

See SUBMISSION_COMPLIANCE_v082.md and V082_JUDGING_REVIEW.md. Existing Kenny! draft only; save/reload after public acceptance, preserve title/three URLs/original PDF. No Submit for Judging, new agreement, team edit or eligibility declaration. Owner must confirm actual eligibility/permissions and provide a genuine shareable CityGov member link. Source/date review close to submission remains necessary; AdminI closes November3 and fiscal November5 in the recorded announcements. Pilot hosts and independent adult/assistive-technology evidence remain absent.


## Source and file audit observations

All12 catalog sources were scanned:6 unchanged,3 federal routes unavailable to retrieval,2 NIH pages unreviewed,1 expired intake. No scan approved or renewed a mapping. All12 expiry states and original dates are recorded in source-expiry.json; AdminI and fiscal dates need a near-submission recheck. Eight supplementary URL observations returned200 for W3C2/Forage/Parker Dewey/apprenticeship and403 for OpenLearn2/AmeriCorps. HTTP403 is a retrieval block, not proof of a closed provider; manual reinspection is needed. Historical review dates and training/directory classifications are preserved. No individual paid project was invented.

Both actual homepage Spotlight links were read in the authorized browser. The launch article describes participation/rounds and the judge announcement remains a preliminary panel notice. Neither supplies a new field limit or deadline. Automated extraction of those two detail pages failed; browser review, not a failed search result, supports the limited observation. Later/unlinked notices remain outside that claim.

Local keyboard-only checks reached the list toggle, activated a route without losing focus, moved from a node to its heading and retained focus on the all-fields toggle. All seven actual invalid-file chooser attempts rejected safely. Import feedback has role=status/aria-live=polite and the file input references it. At320/390/768/1366px no horizontal overflow or visible unlabeled controls was found. Safari actual zoom access was explicitly attempted and refused by macOS permission; no permission settings were changed.


The public330-record feed exposed a legacy harness assumption that the first12 newest results always contain both metadata leads and preparation-ready cards. Product behavior was correct: newer metadata filled the first page. The v0.7 acceptance page now explicitly uses the existing frozen fixture/clock, retaining every assertion. Live snapshots are used for freshness only. This is a test-determinism repair, not a promotion of any discovery lead. Three earlier MutationObserver errors were logged during harness navigation; they are retained in the browser receipt without an unsupported zero-error or resolved-source claim.
