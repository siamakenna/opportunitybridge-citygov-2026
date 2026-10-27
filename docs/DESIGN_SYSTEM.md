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

## v0.8 Career Quest

Gold #FFD36C is reserved for optional learning progress and the Try destination, always with navy text. Four selectable Explore/Try/Build/Launch destinations lead to working controls. Three main cards use a consistent shape, numbered marker, time estimate, state, source-focused objective and Play button; the journey links remain freely navigable. Plain learning view replaces the grid with a list and hides XP/decoration. Predefined library content is a local interactive example, not an external iframe or real service.

Quest workbenches show controls and a forming preview, with 44px minimum game controls, explicit labels, constructive status feedback, wrapped source hashes, reduced-motion overrides and responsive collapse. Passport offers all fields or guided stages, live source/unknown previews and direct resets. Supplementary records have visible type/provenance and directory/training distinctions. Interest/category changes never imply eligibility.
