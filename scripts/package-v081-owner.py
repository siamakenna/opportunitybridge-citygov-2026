from pathlib import Path
import zipfile
files=['CAREER_CONSTELLATION_METHOD.md','CAREER_QUEST_METHOD.md','SUPPLEMENTARY_SOURCES.md','COMPETITIVE_MATRIX.md','PORTAL_COPY.txt','SUBMISSION_DRAFT.md','EXECUTION_REPORT.md','RELEASE.md','PULSE_SOURCES.md','DESIGN_SYSTEM.md','SOURCE_INVENTORY.md','SOURCE_REVIEW_REPORT.md','EVALUATION_PROTOCOL.md','CITYGOV_RUBRIC_MATRIX.md','DEMO_SCRIPT.md','OWNER_ACTIONS.md','AI_DISCLOSURE.md','PILOT_PLAN.md','PILOT_OPERATIONS.md']
with zipfile.ZipFile('output/OpportunityBridge-v081-Owner-Submission-Packet.zip','w',zipfile.ZIP_DEFLATED) as z:
 for f in files:z.write('docs/'+f,f)
 for f in Path('output/pilot').glob('*'):
  if f.suffix!='.zip':z.write(f,'pilot/'+f.name)
 z.write('output/pdf/OpportunityBridge-Pilot-Packet.pdf','OpportunityBridge-Pilot-Packet.pdf')
 z.write('media/v081-walkthrough-transcript.txt','v081-walkthrough-transcript.txt')
 z.write('media/v081-example-passport.json','v081-example-passport.json')
 for f in Path('evidence/v081').glob('*'):
  if f.is_file():z.write(f,'test-receipts/'+f.name)
 for f in Path('output/study-v081').glob('*'):
  if f.is_file():z.write(f,'study/'+f.name)
print('v0.8.1 owner submission packet packaged')
