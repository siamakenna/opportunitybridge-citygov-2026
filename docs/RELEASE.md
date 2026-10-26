# Publication and verification receipt · October 26, 2026

- Public prototype: https://siamakenna.github.io/opportunitybridge-citygov-2026/
- Public judge guide: https://siamakenna.github.io/opportunitybridge-citygov-2026/judge.html
- Separate public source: https://github.com/siamakenna/opportunitybridge-citygov-2026
- First deployed implementation revision: `fa2c0a66543244965dac7927714ab3085a7a4fe7`.
- Successful first CI/deployment: https://github.com/siamakenna/opportunitybridge-citygov-2026/actions/runs/40362566696
- Hosting: GitHub Pages on the new public repository. No paid service/API or Render resource was created. No existing FundPilot repository/service was modified.

## Anonymous verification

The public site returned HTTP 200 through an unauthenticated request and loaded its actual modules in the browser without a login gate. Selected the civic data sample, edited credential to No and data to Not sure, entered a fictional draft and downloaded the advisor packet. Read the actual file: it contained `graduated: no`, `data: unknown`, the draft, unverified labels and the 14-day plan. Reset cleared selection and restored four roles. The judge guide opened through the public footer. Error-log query returned no errors during this flow.

`source.json` in each subsequent deployed build records GitHub Actions' exact `GITHUB_SHA`. The final source SHA is the commit shown in the successful latest Pages workflow and that public JSON; Git history provides all release changes. Source and deployed revisions should be checked together before submission, because an unsuccessful future workflow could leave the previous version live.

## Verification assets

22 Node tests; 15 HTTP-browser regression assertions; 12/12 internal fixture judgments. Browser observations, screenshots and limits: BROWSER_QA_README.md. Benchmark is not an independent manual comparison. Independent unfamiliar users remain n=0.

## Remaining owner work

See OWNER_ACTIONS.md. The 594-word solution and 276-word equity statement are ready for owner review; name/profile/registration details are intentionally unfilled. No competition terms were accepted, registration performed or entry submitted. Optional video has a script only. Pilot institutions, costs and cohort are proposals, not commitments/results. Recheck current official sources before submitting.
