> Historical starter brief. Current rules were rechecked during v0.2: registration timeline and schedule now both state November 6. See docs/OWNER_ACTIONS.md and docs/RELEASE.md for current status; instructions below describe the starting task, not completed outcomes.

# CODEX — CITYGOV OPPORTUNITYBRIDGE CONSTRUCTION SPRINT

You are continuing a genuinely new civic tech hackathon project started October 26, 2026, not modifying the existing FundPilot submission. Use the attached `opportunitybridge_citygov_v0_1.zip` as the working starting point. Read README, core app and tests, pilot plan, submission draft, judging matrix and development roadmap before changing anything.

## Objective
Build and actually publish a polished, original, accessible, scientifically honest submission to the **CityGov Hackathon 2026**, answering: 'How can colleges and universities help students turn education into meaningful careers?' The official page is https://www.citygov.com/hackathon. Free online solo entry is permitted. Submission deadline November 6, 2026 11:59 PM EST; registration date is inconsistent (Oct 26 versus Nov 6), so ask owner to register immediately, do not register or accept binding terms without owner action. Prize eligibility and outside-activity ethics requirements must be owner confirmed.

## Baseline v0.1 — preserve the working code
- Browser-only static responsive HTML/CSS/JS, no backend, account or live model.
- Three distinct fictional learner profiles; four fictional civic opportunities.
- Exact illustrative requirement excerpts with yes/no/unknown tri-state logic.
- No unverified eligibility claims, protected-attribute scoring, fake referrals or real data.
- Skill translation and downloadable 14-day Career Bridge Plan.
- 60-day pilot design, equity framing and AI disclosure.
- 15 deterministic Node tests passed; desktop/mobile UI smoke passed in a Playwright inline-module test, not yet a true externally hosted deployment.

## Milestone 1 — verify and harden
1. Run `npm test`; verify actual browser module loading via a local HTTP server, not just an inline bundle.
2. Exercise all persona, fact, filter, role, export, reset and no-data states with Playwright on desktop 1366 and mobile 390 widths; check no errors/overflow, keyboard focus, semantic labeling and screen-reader hierarchy.
3. Verify exports continue to reflect the currently edited persona fact states (rather than original demo defaults); add an explicit browser regression test. Repair any observed discrepancy, but do not assume the v0.1 behavior is broken without reproducing it.
4. Verify no XSS, injection, unwanted network calls, private storage or user information sent to servers. Eliminate CDN fonts if fully offline operation is preferred.
5. Create a source manifest and a real, honest test report.

## Milestone 2 — genuine civic data and better differentiation
1. Find 2–5 *currently open*, official, authoritative municipal, state or city-adjacent workforce opportunity pages, ideally relevant to Maryland/DC and a second region; evaluate permission to quote, actual public dates, eligibility, location, pay, and expiry. Use browsing/search; record canonical URL, date checked, exact source excerpt, employment status and publisher. Do not invent openings, deadlines, salary or endorsements.
2. Keep the four fictional briefs as clearly labeled demo examples. Add a separate 'Verified public resources' view with real posting details only after verification; if no eligible live listings found, state so and show official search portal links instead.
3. Add an advisor/partner handoff: one-page evidence summary with applicant-declared (not verified) skill proof, missing facts, official posting links, next-action questions and privacy note. No automatic emails and no actual sensitive personal data.
4. Make the user journey distinctly innovative: prior experience → transferable civic competency → exact employer requirement → credible portfolio example → human-verification action. Comparisons must distinguish 'relevant skill' from actual official eligibility.
5. Provide plain-language mode and accessible no-jargon tooltips. No ML ranking that discriminates using proxies or protected status.
6. Prefer no paid services, no mandatory login, no sensitive data retention and no new external API keys. A stable, fast static demo beats a brittle AI backend.

## Milestone 3 — pilot and impact rigor
1. Expand `docs/PILOT_PLAN.md` into an implementable, low-cost 60-day joint career office/city HR evaluation proposal. Include exact staff roles, in-kind hours plus loaded cost assumptions, recruiter commitment requirements, content governance, accessibility/privacy process, risks and sustainability.
2. Use the pre-written 25 learners / 25 opportunities as a **proposed cohort**, never a completed result. If unable to obtain real partner consent, use a simulated dry-run and label it.
3. Create a frozen, source-backed benchmark comparing assisted versus manual requirement interpretation for the same task; use a strong human-readable baseline, held-out cases and explicit denominators. Record real time only when truly instrumented. No invented participant counts or job placements.
4. If real consenting users are available, test with unfamiliar students/career advisors using equivalent starting information; if not, state `n=0 independent users` without suggesting otherwise.
5. Deliver a legible Impact & Equity brief with measured observations and explicit limitations. CityGov tie-breakers prioritize equity impact and pilot feasibility.

## Milestone 4 — shipping and competition package
1. Create a **new, independent** GitHub repository named `opportunitybridge-citygov-2026` if authorized, with an accurate MIT license, source, tests, evidence, screenshots, pilot, provenance and citations. Do not overwrite or copy private FundPilot or NIH research repos.
2. Deploy the tested static project for free (Render Static Site or GitHub Pages). Obtain and verify the real live anonymous URL. Do not modify the existing FundPilot Render services or GitLab release.
3. Record an authentic two-minute narrated walkthrough (optional Round 1, helpful for judges) showing actual working site and observed behaviors; add English captions and accurate disclosure if synthetic media/music are used. Never fake employers or demonstrated results.
4. Prepare complete **CityGov-specific** submission materials: title; solo team lead (owner-approved account/profile link); problem; target users; 500–750-word solution; ≤400-word equity section; 60-day pilot with cost, staff, risks; ≥3 proposed success measures; public no-login demo; source/credits; AI-use disclosure. Verify portal form fields against actual site.
5. Use `docs/CITYGOV_RUBRIC_MATRIX.md` to self-review all A–J criteria with evidence rather than fake high scores. Seek a credible 90+/100 only when justified; pay special attention to civic relevance, realistic employer needs, equitable career access, trial feasibility and clarity for nonspecialists.
6. Target Round 1 submission no later than Nov 5, before Nov 6 11:59 PM EST. Final prize entry/terms only after owner checks eligibility and instructs submission. Preserve user-controlled confirmation and capture actual submission receipt.

## Guardrails
- Required disclosure: significant AI use in writing, programming, design, evaluation and media, consistent with CityGov rules Section 12.
- Use sample/consented/anonymized data only. Do not publish private research, real resumes, participant contact data, or assumed partner endorsements.
- No fabricated university, city, school or municipal partnerships; hypothetical host is labeled 'proposed'.
- Ownership of preexisting work remains distinct; show exact new construction during Oct 12–Nov 6 2026.
- Do not produce a fake live job database. Source identity, dates and requirements must be verified.
- No fee-based infrastructure unless owner explicitly approves. Keep free deployment viable throughout.
- No hackathon registration, age/affiliation/prize or employer declarations without owner action.

## Finish this execution with real outputs
Provide latest commit SHA, public repository link (if created), live demo URL (if published), test and browser evidence, verified real-source inventory, proper pilot and budget, updated competition-ready submission copy, honest A–J mock scorecard, remaining eligibility or portal owner-only steps. Do not merely offer another roadmap; do the independently possible development, testing, publishing and documentation.
