from pathlib import Path
import zipfile
with zipfile.ZipFile('output/OpportunityBridge-v082-Audit-Packet.zip','w',zipfile.ZIP_DEFLATED) as z:
 for f in ['V082_AUDIT_REPORT.md','SUBMISSION_COMPLIANCE_v082.md','V082_JUDGING_REVIEW.md','PORTAL_COPY.txt','SUBMISSION_DRAFT.md','CAREER_CONSTELLATION_METHOD.md','AI_DISCLOSURE.md','PILOT_PLAN.md','PILOT_OPERATIONS.md','SOURCE_REVIEW_REPORT.md']:
  z.write('docs/'+f,f)
 for f in Path('evidence/v082').glob('*'):
  if f.is_file():z.write(f,'audit-receipts/'+f.name)
 z.write('output/pdf/OpportunityBridge-Pilot-Packet.pdf','OpportunityBridge-Pilot-Packet.pdf')
 for f in Path('output/study-v081').glob('*'):
  if f.is_file():z.write(f,'blank-study-kit/'+f.name)
print('v0.8.2 audit packet packaged')
