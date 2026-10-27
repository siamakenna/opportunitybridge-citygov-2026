# CCEB v1.0 — baseline comparison

Internal, developer-authored source-backed cases; independent adjudication pending n=0. Same inputs for A/B/C. Explicit sourceFacts.primary in classification fixtures is supplied metadata, not extracted by B: its advantage is conditional on that metadata being correct. C intentionally abstains when its reviewed mapping cannot decide. No independent gold, human-time comparison or population accuracy claim.

## condition

| Metric | Keyword A | Structured B | Production C |
|---|---|---|---|
| correctness | 20/25 (80.0%; Wilson 60.9–91.1%) | 20/25 (80.0%; Wilson 60.9–91.1%) | 23/25 (92.0%; Wilson 75.0–97.8%) |
| supportedAnswerCorrectness | 6/6 (100.0%; Wilson 61.0–100.0%) | 6/6 (100.0%; Wilson 61.0–100.0%) | 5/6 (83.3%; Wilson 43.6–97.0%) |
| requiredAbstention | 11/16 (68.8%; Wilson 44.4–85.8%) | 11/16 (68.8%; Wilson 44.4–85.8%) | 16/16 (100.0%; Wilson 80.6–100.0%) |
| incorrectAbstention | 0/9 (0.0%; Wilson 0.0–29.9%) | 0/9 (0.0%; Wilson 0.0–29.9%) | 2/9 (22.2%; Wilson 6.3–54.7%) |
| falseOverallEligibilityAssertions | 0/25 (0.0%; Wilson 0.0–13.3%) | 0/25 (0.0%; Wilson 0.0–13.3%) | 0/25 (0.0%; Wilson 0.0–13.3%) |

Unsupported IDs: {"A":[],"B":[],"C":[]}.

Paired source/family bootstrap: {"CminusA":{"n":25,"clusters":6,"difference":0.12,"bootstrap95":[-0.3333333333333333,0.3111111111111111],"draws":5000,"seed":20261027,"limitation":"Few dependent source/family clusters; descriptive, not a significance test."},"CminusB":{"n":25,"clusters":6,"difference":0.12,"bootstrap95":[-0.3333333333333333,0.3111111111111111],"draws":5000,"seed":20261027,"limitation":"Few dependent source/family clusters; descriptive, not a significance test."}}

## classification

| Metric | Keyword A | Structured B | Production C |
|---|---|---|---|
| correctness | 12/12 (100.0%; Wilson 75.8–100.0%) | 12/12 (100.0%; Wilson 75.8–100.0%) | 6/12 (50.0%; Wilson 25.4–74.6%) |
| supportedAnswerCorrectness | N/A | N/A | N/A |
| requiredAbstention | N/A | N/A | N/A |
| incorrectAbstention | N/A | N/A | N/A |
| falseOverallEligibilityAssertions | 0/12 (0.0%; Wilson 0.0–24.2%) | 0/12 (0.0%; Wilson 0.0–24.2%) | 0/12 (0.0%; Wilson 0.0–24.2%) |

Unsupported IDs: {"A":[],"B":[],"C":[]}.

Paired source/family bootstrap: {"CminusA":{"n":12,"clusters":3,"difference":-0.5,"bootstrap95":[-0.6,0],"draws":5000,"seed":20261027,"limitation":"Few dependent source/family clusters; descriptive, not a significance test."},"CminusB":{"n":12,"clusters":3,"difference":-0.5,"bootstrap95":[-0.6,0],"draws":5000,"seed":20261027,"limitation":"Few dependent source/family clusters; descriptive, not a significance test."}}

Confusion matrices and per-class denominators/precision/recall/F1: see BENCHMARK_RESULTS.json (all + both partitions). Macro F1 A/B/C: 1.0000 / 1.0000 / 0.6333.

## deadline

| Metric | Keyword A | Structured B | Production C |
|---|---|---|---|
| correctness | 6/10 (60.0%; Wilson 31.3–83.2%) | 8/10 (80.0%; Wilson 49.0–94.3%) | 10/10 (100.0%; Wilson 72.2–100.0%) |
| supportedAnswerCorrectness | N/A | N/A | N/A |
| requiredAbstention | N/A | N/A | N/A |
| incorrectAbstention | N/A | N/A | N/A |
| falseOverallEligibilityAssertions | 0/10 (0.0%; Wilson 0.0–27.8%) | 0/10 (0.0%; Wilson 0.0–27.8%) | 0/10 (0.0%; Wilson 0.0–27.8%) |

Unsupported IDs: {"A":[],"B":[],"C":[]}.

Paired source/family bootstrap: {"CminusA":{"n":10,"clusters":3,"difference":0.4,"bootstrap95":[0,0.5],"draws":5000,"seed":20261027,"limitation":"Few dependent source/family clusters; descriptive, not a significance test."},"CminusB":{"n":10,"clusters":3,"difference":0.2,"bootstrap95":[0,0.25],"draws":5000,"seed":20261027,"limitation":"Few dependent source/family clusters; descriptive, not a significance test."}}

## pay

| Metric | Keyword A | Structured B | Production C |
|---|---|---|---|
| correctness | 1/1 (100.0%; Wilson 20.7–100.0%) | 1/1 (100.0%; Wilson 20.7–100.0%) | 1/1 (100.0%; Wilson 20.7–100.0%) |
| supportedAnswerCorrectness | N/A | N/A | N/A |
| requiredAbstention | 1/1 (100.0%; Wilson 20.7–100.0%) | 1/1 (100.0%; Wilson 20.7–100.0%) | 1/1 (100.0%; Wilson 20.7–100.0%) |
| incorrectAbstention | N/A | N/A | N/A |
| falseOverallEligibilityAssertions | 0/1 (0.0%; Wilson 0.0–79.3%) | 0/1 (0.0%; Wilson 0.0–79.3%) | 0/1 (0.0%; Wilson 0.0–79.3%) |

Unsupported IDs: {"A":[],"B":[],"C":[]}.

Paired source/family bootstrap: {"CminusA":{"n":1,"clusters":1,"difference":0,"bootstrap95":null,"reason":"Fewer than two source/family clusters."},"CminusB":{"n":1,"clusters":1,"difference":0,"bootstrap95":null,"reason":"Fewer than two source/family clusters."}}

## mapping

| Metric | Keyword A | Structured B | Production C |
|---|---|---|---|
| correctness | N/A | N/A | 1/1 (100.0%; Wilson 20.7–100.0%) |
| supportedAnswerCorrectness | N/A | N/A | N/A |
| requiredAbstention | N/A | N/A | 1/1 (100.0%; Wilson 20.7–100.0%) |
| incorrectAbstention | N/A | N/A | N/A |
| falseOverallEligibilityAssertions | N/A | N/A | 0/1 (0.0%; Wilson 0.0–79.3%) |

Unsupported IDs: {"A":["P01"],"B":["P01"],"C":[]}.

Paired source/family bootstrap: {"CminusA":{"n":0,"clusters":0,"difference":null,"bootstrap95":null,"reason":"Fewer than two source/family clusters."},"CminusB":{"n":0,"clusters":0,"difference":null,"bootstrap95":null,"reason":"Fewer than two source/family clusters."}}

## import

| Metric | Keyword A | Structured B | Production C |
|---|---|---|---|
| correctness | N/A | N/A | 1/1 (100.0%; Wilson 20.7–100.0%) |
| supportedAnswerCorrectness | N/A | N/A | N/A |
| requiredAbstention | N/A | N/A | 1/1 (100.0%; Wilson 20.7–100.0%) |
| incorrectAbstention | N/A | N/A | N/A |
| falseOverallEligibilityAssertions | N/A | N/A | 0/1 (0.0%; Wilson 0.0–79.3%) |

Unsupported IDs: {"A":["P04"],"B":["P04"],"C":[]}.

Paired source/family bootstrap: {"CminusA":{"n":0,"clusters":0,"difference":null,"bootstrap95":null,"reason":"Fewer than two source/family clusters."},"CminusB":{"n":0,"clusters":0,"difference":null,"bootstrap95":null,"reason":"Fewer than two source/family clusters."}}

## documents

| Metric | Keyword A | Structured B | Production C |
|---|---|---|---|
| correctness | 3/3 (100.0%; Wilson 43.9–100.0%) | 3/3 (100.0%; Wilson 43.9–100.0%) | 3/3 (100.0%; Wilson 43.9–100.0%) |
| supportedAnswerCorrectness | 1/1 (100.0%; Wilson 20.7–100.0%) | 1/1 (100.0%; Wilson 20.7–100.0%) | 1/1 (100.0%; Wilson 20.7–100.0%) |
| requiredAbstention | 2/2 (100.0%; Wilson 34.2–100.0%) | 2/2 (100.0%; Wilson 34.2–100.0%) | 2/2 (100.0%; Wilson 34.2–100.0%) |
| incorrectAbstention | 0/1 (0.0%; Wilson 0.0–79.3%) | 0/1 (0.0%; Wilson 0.0–79.3%) | 0/1 (0.0%; Wilson 0.0–79.3%) |
| falseOverallEligibilityAssertions | 0/3 (0.0%; Wilson 0.0–56.1%) | 0/3 (0.0%; Wilson 0.0–56.1%) | 0/3 (0.0%; Wilson 0.0–56.1%) |

Unsupported IDs: {"A":[],"B":[],"C":[]}.

Paired source/family bootstrap: {"CminusA":{"n":3,"clusters":1,"difference":0,"bootstrap95":null,"reason":"Fewer than two source/family clusters."},"CminusB":{"n":3,"clusters":1,"difference":0,"bootstrap95":null,"reason":"Fewer than two source/family clusters."}}

## plan

| Metric | Keyword A | Structured B | Production C |
|---|---|---|---|
| correctness | N/A | N/A | 7/7 (100.0%; Wilson 64.6–100.0%) |
| supportedAnswerCorrectness | N/A | N/A | 1/1 (100.0%; Wilson 20.7–100.0%) |
| requiredAbstention | N/A | N/A | 6/6 (100.0%; Wilson 61.0–100.0%) |
| incorrectAbstention | N/A | N/A | 0/1 (0.0%; Wilson 0.0–79.3%) |
| falseOverallEligibilityAssertions | N/A | N/A | 0/7 (0.0%; Wilson 0.0–35.4%) |

Unsupported IDs: {"A":["A01","A02","A04","A05","A06","A07","A08"],"B":["A01","A02","A04","A05","A06","A07","A08"],"C":[]}.

Paired source/family bootstrap: {"CminusA":{"n":0,"clusters":0,"difference":null,"bootstrap95":null,"reason":"Fewer than two source/family clusters."},"CminusB":{"n":0,"clusters":0,"difference":null,"bootstrap95":null,"reason":"Fewer than two source/family clusters."}}

## Source links, documents, plans and limits

Source-link equality (not current-page validity), unchanged-URL official cases: A 49/49 (100.0%; Wilson 92.7–100.0%); B 49/49 (100.0%; Wilson 92.7–100.0%); C 49/49 (100.0%; Wilson 92.7–100.0%). Document task correctness measures missing mandatory item count. Full missing-fact recall is N/A: there is no adjudicated universal fact inventory. C reports actual unresolved production conditions per case in run files. Plans report five-point completeness plus unresolved questions and claim-screen discrepancies; they cannot establish human usefulness or truthful employment. All methods emit zero overall eligibility assertions by design; no advantage is claimed for that metric. A/B plans/mapping/import are unsupported, not failures.

Binary intervals are descriptive, dependent authored cases. Paired draws cluster by source or synthetic classifier family. No unlike-task aggregate, significance, independent human result or fabricated manual time.

## Classification coverage and abstention

Unknown is a real abstention, not unsupported. Exact reference correctness includes the authored unknown case. Original A/B:11/12 known-type outputs,1/12 unknown;11/11 correct among known outputs,12/12 exact including unknown. Original C:7/12 known-type outputs,5/12 unknown;5/7 correct among known outputs,6/12 exact. Directed C repair:5/12 known-type outputs,7/12 unknown;5/5 correct among known outputs,6/12 exact. More conservative coverage does not become higher exact accuracy. Source/task errors are listed in SOURCE_ERROR_BREAKDOWN.json.

Original plan7/7 is confounded by missing-field authoring defects. Completed-row diagnostics found2/7 discrepancies before repair,0/7 after directed repair; these are not independent samples or a universal claim-screen result. See ERROR_ANALYSIS.md and DIAGNOSTICS_BEFORE/AFTER.json.
