# OpportunityBridge v0.7 design system

Civic optimism with inspectable evidence. Light theme only; no untested dark mode or external font service.

| Token | Value | Use |
| --- | --- | --- |
| Midnight navy | #17243A | Titles, Advisor Studio, primary text |
| Deep teal | #087E80 | Primary actions and preparation-ready accent |
| Soft violet | #A99AF4 | Passport/story personality and source-review accents; dark text |
| Warm coral | #F18B76 | Discovery accent; never the only status indicator |
| Warm ivory | #FFF9F0 | Main page background |
| Pale mint | #D9F2E2 | Supporting reviewed-state tint |
| White | #FFFFFF | Content surfaces |
| Slate | #506079 | Supporting text |

Spacing: 6/12/20/32/56px. Corners: 8/18/28px. System typography: Avenir Next, Segoe UI, system-ui, sans-serif; no restricted font files distributed. Purple visible focus outlines. Text labels accompany all color states.

New information hierarchy: expressive two-journey hero → dated Pulse and review levels → reviewed source library → one Passport stage at a time → inspectable evidence map/text equivalent → Advisor Studio → attributed stories and proposed pilot. Shared navigation and breadcrumbs preserve context across pages.

The path line animates once on entry; hover motion is small and all animation/transitions are disabled under prefers-reduced-motion. New controls retain native keyboard behavior. Rendered contrast/reflow findings and limitations are in the execution report; design tokens alone do not establish accessibility certification.
