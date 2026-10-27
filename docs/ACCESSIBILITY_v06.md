# v0.6 accessibility observations

Tool-driven implementer checks, not a human usability/screen-reader study or WCAG certification.

- Keyboard Tab moved from sample-load to clear-declarations with a visible 3 px outline. Native buttons/selects/details and a skip link remain available; skippable tour avoids a modal focus trap.
- Selected MPT workspace: zero unlabeled input/select/textarea controls and zero duplicate IDs. Numeric errors name accepted bounds; invalid values do not become supported evidence. Added evaluation fields have labels and out-of-range scores remain unknown.
- At 320 CSSpx: document client/scroll width 305/305; no horizontal overflow.390 px and desktop/public checks are recorded in execution receipt. Narrow viewport is a reflow check, not a claim of an actual 200%browser-zoom study.
- Eight rendered foreground/background contrast samples: body 14.24, source warning 7.54, card text 6.75, qualification summary 8.70, primary action 12.23, progress 13.65, credit shortcut 8.23, review text 14.37. Selected text only; not a comprehensive color audit.
- A prefers-reduced-motion rule is present and suppresses scrolling/animation transitions. No actual motion-preference user study.
- Full-text print snapshot includes current edited facts, evidence and source URLs instead of clipped textareas. The browser regression checked its generated content; no physical printer was used. Blank paper worksheet and Markdown/CSV exports support low-bandwidth routes.
- English-only, no actual assistive-technology or physical-device test, no independent audit. The existing PDF is untagged; an accessible Markdown operating kit is provided alongside it. Do not call the PDF fully screen-reader accessible.


Current v0.8.1 adds Career Constellation, optional local journey storage, strict unverified import and two reviewed W3C learning guides. See CAREER_CONSTELLATION_METHOD.md and EXECUTION_REPORT.md for actual tests, privacy boundaries and limits. No source date renewal, independent participant finding, credential or accessibility certification is implied.
