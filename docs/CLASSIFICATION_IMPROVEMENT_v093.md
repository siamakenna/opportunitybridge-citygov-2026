# Source-aware classification — v0.9.3

Classification describes a source, never a person's eligibility. `classification-core.js` separates opportunity type, employment arrangement, career stage and applicant eligibility. No numeric confidence is claimed. Receipts include source URL/date, evidence level, rationale, unknown attributes, conflicts and need for full-source review.

The hierarchy is individually reviewed official mapping; source-bound inspected publisher metadata; explicit provenanced descriptive language; bounded title candidate; unknown. Approved mapping snapshots and original source holds remain separate. Discovery's whitelist cannot import job-board summaries, claimed approvals or qualifications. Runtime data cannot add arbitrary `sourceEvidence` to the immutable inspected evidence registry. Registry binding checks exact recruitment, official URL and normalized title; it is an ingestion/change guard, not authentication of arbitrary third-party JSON.

`classification-evidence.js` adds two selected official Employment Type observations for recruitment25-003706-0003. [Official bulletin](https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=25&R2=003706&R3=0003) states Full-Time. It supports a generic job and schedule, not student suitability, duration or qualification approval. No source qualification approval date was renewed. The auditor page was unavailable to the web reader; normal-TLS native curl subsequently retrieved it and its Full-Time field. A second source-bound observation for26-004373-0002 now supports generic job classification. All Python certificate failures and successful native-curl digests remain in SOURCE_PROVENANCE.json; TLS verification was not disabled. Unregistered/title-only records still abstain. The parser supports source-bound descriptive evidence, but no new broad description feed has been connected.

## Original cases and input asymmetry

CCEB v1 bytes and references are unchanged. The historical adapter explicitly imports exact `taxonomy-v092.js`; all60 inputs×3 methods still match retained adverse outputs. Historical conditions23/25,deadlines10/10,classification6/12 versus both baselines12/12 remain public. Evidence Room labels that adapter historical rather than current production.

| Cases | Old | New with supplied description | Explanation |
| --- | --- | --- | --- |
| C01 internal auditor; C02 investigation sergeant | unknown | job | Explicit synthetic full-time staff job description was previously ignored. |
| C03 graduate engineer | unknown | job | Explicit licensed engineering job; no entry-level assertion. |
| C04 contractual accountant | unknown | job; full-time contractual arrangement | Staff job does not imply a short project or duration. |
| C05 internship coordinator; C06 fellowship manager | unknown | job | Explicit staff description resolves administration versus participation. Title alone still abstains. |
| C07–C12 | 6 correct | 6 correct | Internship,course,two reviewed fellowships,directory,required unknown retained. |

Revised12/12(100%); macroF1=1.0; coverage11/12(91.67%); abstention1/12(8.33%);11/11non-abstentions correct; zero false participant positives or incorrect definite types. **This is metadata/description-assisted coverage on known developer-authored cases. Production RSS normally lacks those descriptions. It is not independent interpretation, an unseen test or measured production accuracy.** Synthetic descriptions require explicit evaluation mode and never become employer facts in production. `input.sourceFacts.primary` and references do not enter the new classifier.

## Separately frozen challenge

28 distinct synthetic cases and expected primary/arrangement outcomes were committed atdcf6a11 before implementation. Manifest SHA256 `ae63a51931a9918066c58c2a5c1e1b8c6b0edb11ed27b2c53485e61a120a4930`. Cases include utilities apprenticeship,archives internship,geospatial course,careers directory,short poster project,temporary ranger,program staff,title-only ambiguity,untrusted snippets,forged source labels and conflicting descriptions. All references are developer-authored; independent adjudicators0. The author saw the cases: call this a frozen authored challenge, **not independently unseen**. No challenge-derived failure was used for tuning. First scoring already passed; final source-registry support and reviewed-arrangement propagation were completed afterward without targeting challenge errors. First and final receipts retain that chronology.

Final28/28 exact primary;28/28 arrangement; macroF1=1.0; coverage19/28(67.86%); abstention9/28(32.14%);19/19non-abstentions correct; all9required unknowns correct. Zero false internship/fellowship participant labels and zero incorrect definite types. One explicit conflicting-description control abstains. Precision,recall,F1,confusion matrices and level-stratified denominators are in [CLASSIFICATION_RESULTS.json](../output/career-bridge-v093/CLASSIFICATION_RESULTS.json). Small authored strata do not establish calibration or external generalization.

Run `node scripts/classification-v093.mjs` and `npm run benchmark:cceb`. Original first-run failures,retained directed repairs and independent-review-needed status are preserved.

The Pulse UI also separates primary job type from employment arrangement. The job filter includes reviewed generic staff jobs; full-time/part-time/temporary/contractual/unknown arrangement is a separate metadata filter. This does not infer a schedule or career stage from a title. Original legacy tags remain in receipts for compatibility.

## Live integration failure and repaired provenance

Final live filtering exposed a genuine repeated-normalization defect: the automatically added provider string allowed generated publisher-metadata classifications to enter the curated-resource branch. A second pass promoted evidence level2 to1 and discarded the full-time arrangement, so the job/full-time filter returned an incorrect empty result. Initial unit/challenge and UI trials had missed that combination; their passing receipts remain preserved and do not erase the failure.

The stable v0.9.2 main-ref workflow was rerun and its exact79ceb6a deployment verified before repair. Curated resource provenance is now bound to the immutable supplementary registry and matching identity,title,type,basis,source URL and date fields. Provider text cannot create an approval. Three new JavaScript regressions and ten browser assertions cover repeated passes,arrangement retention,mandatory full-source review,unknown eligibility,forged provider metadata and real curated learning. The actual auditor filter now returns the expected source-bound metadata result. Frozen CCEB/challenge references and source approval dates remain unchanged. This is a repaired integration failure,not new independent accuracy evidence.
