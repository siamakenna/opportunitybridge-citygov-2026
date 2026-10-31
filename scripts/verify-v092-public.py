"""Compare published static assets against this SHA-built distribution; metadata separately."""
import json,hashlib,subprocess,concurrent.futures,sys
from pathlib import Path
revision=sys.argv[1]
base='https://siamakenna.github.io/opportunitybridge-citygov-2026/'
def get(path):
 r=subprocess.run(['curl','--fail','--silent','--show-error','--max-time','30',base+path],capture_output=True)
 if r.returncode:raise RuntimeError(path+': '+r.stderr.decode()[:200])
 return r.stdout
source=json.loads(get('source.json?verify='+revision));pulse=get('data/pulse.json?verify='+revision);fixture=get('data/trial-v08.json?verify='+revision)
files=['index.html','practice.html','judge.html','walkthrough.html','evaluation.html','pilot.html','tests/v081-trial.html','tests/v081-trial.js','tests/v08-trial.html','tests/v08-trial.js','docs/CAREER_CONSTELLATION_METHOD.md','docs/EXECUTION_REPORT.md','docs/PORTAL_COPY.txt','docs/CITYGOV_RUBRIC_MATRIX.md','output/OpportunityBridge-v082-Audit-Packet.zip','output/pdf/OpportunityBridge-Pilot-Packet.pdf','media/v081-walkthrough.mp4','media/v081-walkthrough.vtt','media/v081-walkthrough-transcript.txt','media/v081-example-passport.json']
files += ['evidence.html','finalist.html','docs/PORTAL_COPY_v09.txt','data/cceb/v1.json','output/OpportunityBridge-v09-Evidence-Packet.zip','tests/evidence-browser.html','tests/evidence-browser.js']
files += [str(x.relative_to('dist')) for x in Path('dist/output/evidence-v09').iterdir() if x.is_file()]
files += ['docs/V082_AUDIT_REPORT.md','docs/SUBMISSION_COMPLIANCE_v082.md','docs/V082_JUDGING_REVIEW.md']
files += ['tests/'+n+'.'+ext for n in ['real-browser','v06-browser','v07-browser','browser','evaluation-browser'] for ext in ['html','js']]
files += [str(x.relative_to('dist')) for x in Path('dist/src').iterdir() if x.is_file()]
files += [str(x.relative_to('dist')) for x in Path('dist/output/study-v081').iterdir() if x.is_file()]
files += ['rehearsal-index.html','rehearsal-evaluation.html','tests/frozen-clock.js','tests/usability-browser.html','tests/usability-browser.js','output/OpportunityBridge-v091-Participant-Testing-Kit.zip','docs/evidence/EXTERNAL_USABILITY_FEEDBACK_v091.md','docs/PORTAL_COPY_v091.txt']
files += [str(x.relative_to('dist')) for x in Path('dist/study/participant').iterdir() if x.is_file()]
files += [str(x.relative_to('dist')) for x in Path('dist/output/usability-v091').iterdir() if x.is_file()]
files += ['output/OpportunityBridge-v092-Participant-Testing-Kit.zip','docs/evidence/STUDY_INTEGRITY_RELEASE_v092.md','docs/PORTAL_COPY_v092.txt']
files += [str(x.relative_to('dist')) for x in Path('dist/output/usability-v092').iterdir() if x.is_file()]
def compare(path):
 b=get(path+'?verify='+revision);expected=Path('dist',path).read_bytes();return {'path':path,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'matches':b==expected}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:assets=list(pool.map(compare,files))
checks={'revision':source['revision']==revision,'product':source['version']=='0.9.2','learningVersion':source['quest']['version']=='0.8.1','journeySchema':source['journeySchema']=='opportunitybridge-journey-1','pulseDigest':hashlib.sha256(pulse).hexdigest()==source['discovery']['sha256'],'fixtureDigest':hashlib.sha256(fixture).hexdigest()==source['quest']['frozenDiscoverySha256'],'ccebDigest':source['cceb']['datasetSha256']==hashlib.sha256(get('data/cceb/v1.json?verify='+revision)).hexdigest(),'allStaticAssets':all(x['matches']for x in assets)}
report={'status':'PASS'if all(checks.values())else'FAIL','expectedRevision':revision,'checks':checks,'source':source,'assets':assets}
Path('/tmp/ob-v092-public-verification.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({'status':report['status'],'checks':checks,'assetCount':len(assets),'mismatches':[a['path']for a in assets if not a['matches']],'source':source},indent=2))
if report['status']!='PASS':sys.exit(1)
