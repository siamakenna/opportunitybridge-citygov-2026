"""Read public sources and propose a review queue. Never renews dates or qualification rules."""
import concurrent.futures,datetime,hashlib,json,re,subprocess
from pathlib import Path
from html.parser import HTMLParser
class Text(HTMLParser):
 def __init__(self):super().__init__();self.text=[];self.hidden=0
 def handle_starttag(self,t,a):
  if t in ('script','style'):self.hidden+=1
 def handle_endtag(self,t):
  if t in ('script','style'):self.hidden=max(0,self.hidden-1)
 def handle_data(self,s):
  if not self.hidden:self.text.append(s)
records=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {catalog} from './src/catalog.js';console.log(JSON.stringify(catalog))"],text=True))
def scan(r):
 at=datetime.datetime.now(datetime.timezone.utc).isoformat();p=subprocess.run(['curl','-fsSL','--max-time','25',r['sourceUrl']],capture_output=True);html=p.stdout.decode(errors='replace');parser=Text();parser.feed(html);text=' '.join(' '.join(parser.text).split());lower=text.casefold()
 start=lower.find('minimum qualifications');semantic=lower[start:] if start>=0 else lower
 footer=semantic.find('powered by');semantic=semantic[:footer] if footer>=0 else semantic
 return {'id':r['id'],'sourceUrl':r['sourceUrl'],'recruitment':r.get('recruitment'),'fetchedAt':at,'retrieved':p.returncode==0,'identityConfirmed':not r.get('recruitment') or r['recruitment'] in text,'withdrawn':any(s in lower for s in ['this recruitment is closed','this recruitment has closed','no longer accepting applications','position has been filled','job not found']),'semanticHash':hashlib.sha256(semantic.encode()).hexdigest() if not p.returncode else None,'rawHash':hashlib.sha256(p.stdout).hexdigest() if not p.returncode else None,'excerptChecks':[{'id':c['id'],'found':' '.join(c['exact'].split()).casefold() in lower} for c in r['requirements'] if c.get('exact')],'error':p.stderr.decode()[:160] if p.returncode else None}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:observations=list(pool.map(scan,records))
Path('evidence/source-observations-latest.json').write_text(json.dumps({'observations':observations,'policy':'Observations are candidates only; no dates, rules or claims renewed.'},indent=2)+'\n')
subprocess.run(['node','scripts/source-maintenance.mjs'],check=True)
