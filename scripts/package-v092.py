"""Package public participant files only; private facilitator source stays outside repo."""
from pathlib import Path
import hashlib,json,sys,zipfile,tempfile
root=Path(__file__).resolve().parents[1]
participant=root/'study/participant'
expected=['SESSION_A.html','SESSION_B.html','SESSION_C.html','SESSION_D.html','START_HERE.md','TASK_CARDS.md','PRIVACY_AND_SAVING.md','FIVE_MINUTE_FIRST_IMPRESSION.md','VERSION.json']
assert sorted(p.name for p in participant.iterdir() if p.is_file())==sorted(expected)
def pack(path,files):
 path.parent.mkdir(parents=True,exist_ok=True)
 with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
  for name,source in sorted(files):
   info=zipfile.ZipInfo(name,(2026,10,30,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16;z.writestr(info,source.read_bytes())
 with zipfile.ZipFile(path) as z:
  assert z.testzip() is None
  with tempfile.TemporaryDirectory(prefix='ob-v092-zip-') as tmp:
   z.extractall(tmp)
   assert all((Path(tmp)/name).read_bytes()==source.read_bytes() for name,source in files)
 return {'name':path.name,'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'crc':'PASS','cleanExtraction':'PASS','files':[name for name,_ in files]}
publicFiles=[('participant/'+name,participant/name) for name in expected]
assert not any('scoring' in n.lower() or 'facilitator' in n.lower() for n,_ in publicFiles)
public=pack(root/'output/OpportunityBridge-v092-Participant-Testing-Kit.zip',publicFiles)
reports={'participant':public,'facilitator':'Private local delivery; not in public build or GitHub release.'}
if len(sys.argv)>1:
 private=Path(sys.argv[1]).resolve();assert not private.is_relative_to(root)
 revised=private/'revised';files=[(str(p.relative_to(revised)),p) for p in revised.rglob('*') if p.is_file() and '__pycache__' not in p.parts]
 assert any('SCORING_KEY_PRIVATE_v2.md' in name for name,_ in files)
 secret=(revised/'facilitator/SCORING_KEY_PRIVATE_v2.md').read_bytes()
 assert all(secret not in f.read_bytes() for _,f in publicFiles)
 report=pack(private/'OpportunityBridge-v092-Facilitator-Scoring-Kit.zip',files);reports['facilitator']={**report,'distribution':'Private local file only. Never upload this key to public Pages/release.'}
 (private/'KIT_VERIFICATION.json').write_text(json.dumps(reports,indent=2)+'\n')
 private.chmod(0o700)
 for f in private.rglob('*'):
  if f.is_file():f.chmod(0o600)
  elif f.is_dir():f.chmod(0o700)
out=root/'output/usability-v092';out.mkdir(exist_ok=True)
# Public record contains private ZIP checksum/file names only, no key or participant data.
(out/'KIT_VERIFICATION.json').write_text(json.dumps(reports,indent=2)+'\n')
print(json.dumps(reports,indent=2))
