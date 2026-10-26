# Actual browser verification · October 26, 2026

## v0.2 local HTTP observations

Served the actual HTML and ES modules from Python at `http://127.0.0.1:5173`, not an inline rebuilt bundle. Used the Codex in-app browser. Local bind initially required sandbox network permission; the permitted server loaded successfully.

- 22/22 Node regression tests pass, including current facts in exports, removal/addition of translated skills, unverified bounded draft notes, and deadline transitions.
- Exercised all 12 persona/pathway combinations; each rendered three criteria and enabled the advisor packet.
- Changed Maya credential to No and data to Not sure; on-screen interpretation and the actual downloaded Markdown reflected both changes. Downloaded advisor file was read from disk and contained the entered fictional note, unknown state, potential conflict and 14-day plan.
- Technology category returned one role; reset returned four, cleared selection and disabled exports. Switching persona cleared selection. The initial no-selection state explains the next action and disables both downloads. Every category contains one sample, so a zero-result filter cannot be reached with this fixed inventory.
- Simpler explanations changed requirement wording while preserving underlying source text. Current-draft storage is scoped by role and resets with persona/reset/reload.
- Keyboard Tab moved from skip link to home link; selecting a role moved focus to the plan heading. Native labeled selects and textareas are exposed to the accessibility tree. No actual screen-reader study performed.
- Inspected desktop at measured `window.innerWidth=1366` (client/scroll width 1344) and narrow layout at measured `innerWidth=390` (client/scroll width 368); no horizontal document overflow. Browser viewport override required compensation for existing zoom. Narrow layout changed to one column. This is responsive simulation, not a physical mobile-device test.
- Error log query returned no console errors during the observed local flow. Actual HTTP module loading succeeded.
- Source review: no fetch/XHR, tracker, external font, cookies, localStorage or sessionStorage in application code. Optional notes use text values, not HTML insertion. A restrictive meta content policy disables app network connections. Ordinary hosting page-request logs and external-site policies are disclosed. This is code/behavior review, not a packet-capture privacy audit.

Screenshots: `evidence/desktop-home.jpg` and `evidence/home.jpg` are actual local browser captures. Original `docs/QA_desktop.png` and `docs/QA_mobile.png` are historical v0.1 inline-module smoke evidence only. They must not be described as current release screenshots.

## Reusable browser regression

Serve the repository and open `/tests/browser.html`. The test-only iframe harness loads the actual application modules and checks 15 assertions, including changed declarations in generated plan/handoff Blobs, draft preservation, persona/reset cleanup and focus. It passed in the local HTTP browser. The harness captures download Blobs to avoid repeated file downloads; separate real download checks above and in RELEASE.md verify actual file delivery. No third-party browser package is required.

## Benchmark

12/12 deterministic judgments against explicit internal fixtures; not a human study. `npm run benchmark` writes the raw results and equal-information manual worksheet. Independent unfamiliar users n=0; manual time, correctness and interaction results remain unmeasured. See BENCHMARK_PROTOCOL.md.

## Limits

No independent WCAG audit, screen-reader session, physical-device test, participant study, partner review or measured career benefit. Public anonymous verification is recorded in RELEASE.md after successful publication. Do not infer those from a local test.
