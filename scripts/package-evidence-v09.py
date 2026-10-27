from pathlib import Path
import json,hashlib,zipfile
root=Path('.');out=root/'output/evidence-v09';files=[p for p in out.rglob('*') if p.is_file() and p.name!='PACKAGE_MANIFEST.json']
files += [root/'data/cceb/v1.json',root/'package.json',root/'LICENSE',root/'evidence.html',root/'finalist.html']
files += list((root/'src').glob('*'))
files += list((root/'evidence/v09').glob('*'))
files += [root/'scripts'/n for n in ['cceb-run.mjs','cceb-verify.mjs','cceb-metrics.mjs','cceb-report.mjs','cceb-diagnostics.mjs','pilot-model.mjs','source-change-v09.mjs','analyze-study.mjs','verify-v09-public.py','package-evidence-v09.py']]
files=[f for f in files if f.is_file()]
manifest={'purpose':'Public substantive evidence. No authenticated traces, personal data or invented human outcomes.','files':{f.as_posix():hashlib.sha256(f.read_bytes()).hexdigest() for f in sorted(files)}}
(out/'PACKAGE_MANIFEST.json').write_text(json.dumps(manifest,indent=2)+'\n');files.append(out/'PACKAGE_MANIFEST.json')
z=root/'output/OpportunityBridge-v09-Evidence-Packet.zip'
with zipfile.ZipFile(z,'w',zipfile.ZIP_DEFLATED) as pack:
 for f in sorted(files):
  item=zipfile.ZipInfo(f.as_posix(),(2026,10,27,0,0,0));item.compress_type=zipfile.ZIP_DEFLATED;item.external_attr=0o644<<16;pack.writestr(item,f.read_bytes())
with zipfile.ZipFile(z) as pack:
 for name,digest in manifest['files'].items():
  assert hashlib.sha256(pack.read(name)).hexdigest()==digest,name
print(json.dumps({'file':str(z),'files':len(files),'bytes':z.stat().st_size,'sha256':hashlib.sha256(z.read_bytes()).hexdigest()}))
