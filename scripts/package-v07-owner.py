from pathlib import Path
import zipfile
files=['PORTAL_COPY.txt','SUBMISSION_DRAFT.md','EXECUTION_REPORT.md','RELEASE.md','PULSE_SOURCES.md','DESIGN_SYSTEM.md','SOURCE_INVENTORY.md','SOURCE_REVIEW_REPORT.md','EVALUATION_PROTOCOL.md','CITYGOV_RUBRIC_MATRIX.md','DEMO_SCRIPT.md','OWNER_ACTIONS.md','AI_DISCLOSURE.md','PILOT_PLAN.md','PILOT_OPERATIONS.md']
with zipfile.ZipFile('output/OpportunityBridge-v07-Owner-Submission-Packet.zip','w',zipfile.ZIP_DEFLATED) as z:
 for f in files:z.write('docs/'+f,f)
 for f in Path('output/pilot').glob('*'):
  if f.suffix!='.zip':z.write(f,'pilot/'+f.name)
 z.write('output/pdf/OpportunityBridge-Pilot-Packet.pdf','OpportunityBridge-Pilot-Packet.pdf')
 z.write('media/v07-walkthrough-transcript.txt','v07-walkthrough-transcript.txt')
 z.write('media/v07-example-passport.json','v07-example-passport.json')
print('v0.7 owner submission packet packaged')
