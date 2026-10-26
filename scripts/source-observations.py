"""Public-source consistency check. Does not update verification dates or certify eligibility."""
import concurrent.futures,datetime,hashlib,json,re,subprocess
from pathlib import Path
from html.parser import HTMLParser
class Text(HTMLParser):
 def __init__(self):super().__init__();self.parts=[];self.hidden=0;self.links=[]
 def handle_starttag(self,tag,attrs):
  if tag in ('script','style'):self.hidden+=1
  if tag=='a':self.links += [v for k,v in attrs if k=='href']
 def handle_endtag(self,tag):
  if tag in ('script','style'):self.hidden=max(0,self.hidden-1)
 def handle_data(self,s):
  if not self.hidden:self.parts.append(s)
records=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {catalog} from './src/catalog.js';import {outcomes} from './src/outcomes.js';console.log(JSON.stringify([...catalog,...outcomes]));"],text=True))
def observe(url):
 stamp=datetime.datetime.now(datetime.timezone.utc).isoformat();proc=subprocess.run(['curl','-fsSL','--max-time','25',url],capture_output=True);data=proc.stdout
 result={'url':url,'requestedAt':stamp,'method':'public HTTPS GET via system curl; no authentication','retrieved':proc.returncode==0,'sha256':hashlib.sha256(data).hexdigest() if not proc.returncode else None,'error':proc.stderr.decode()[:180] if proc.returncode else None}
 if not proc.returncode:
  parser=Text();parser.feed(data.decode(errors='replace'));text=' '.join(' '.join(parser.parts).split()).casefold();result['shortExcerptChecks']=[{'record':r['id'],'criterion':c['id'],'found': ' '.join(c['exact'].split()).casefold() in text} for r in records if r['sourceUrl']==url for c in r.get('requirements',[]) if c.get('exact')]
 return result
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:results=list(pool.map(observe,sorted({r['sourceUrl'] for r in records})))
Path('evidence/source-http-observations.json').write_text(json.dumps({'purpose':'Consistency observation only, not independent human review or automatic refresh','results':results},indent=2)+'\n')
for r in results:print(('OK' if r['retrieved'] else 'UNVERIFIED')+' '+r['url']+' '+str(r.get('shortExcerptChecks',[])))
