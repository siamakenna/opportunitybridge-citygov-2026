"""Release gate for public kit reproducibility and private-key separation."""
from pathlib import Path
from zipfile import ZipFile
import hashlib,json,re
root=Path(__file__).resolve().parents[1]
expected=['SESSION_A.html','SESSION_B.html','SESSION_C.html','SESSION_D.html','START_HERE.md','TASK_CARDS.md','PRIVACY_AND_SAVING.md','FIVE_MINUTE_FIRST_IMPRESSION.md','VERSION.json']
archive=root/'output/OpportunityBridge-v091-Participant-Testing-Kit.zip'
with ZipFile(archive) as z:
 assert z.testzip() is None
 assert sorted(z.namelist())==sorted('participant/'+f for f in expected)
 for name in expected:
  b=z.read('participant/'+name);assert b==(root/'study/participant'/name).read_bytes(),name+' differs from public source'
  if name.endswith('.html'):
   text=b.decode();assert 'Save My Responses' in text and 'connect-src \'none\'' in text
   assert not re.search(r'<(?:script|link|img)\b[^>]*(?:src|href)=["\']https?://',text,re.I)
   assert not any(s in text for s in ['SCORING_KEY_PRIVATE','fetch(','XMLHttpRequest','localStorage.','sessionStorage.'])
report=json.loads((root/'output/usability-v091/KIT_VERIFICATION.json').read_text());assert report['participant']['sha256']==hashlib.sha256(archive.read_bytes()).hexdigest()
if (root/'dist').exists():
 paths=[p for p in (root/'dist').rglob('*') if p.is_file()]
 forbidden=[str(p.relative_to(root/'dist')) for p in paths if any(s in p.name.lower() for s in ['scoring_key_private','facilitator-scoring-kit','native-b-partial','native-b-complete'])]
 assert not forbidden,forbidden
 assert (root/'dist/output/OpportunityBridge-v091-Participant-Testing-Kit.zip').read_bytes()==archive.read_bytes()
print('PASS: public ZIP CRC, exact nine files/bytes/checksum, four standalone no-upload forms; private facilitator files absent from build.')
