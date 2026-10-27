"""One advertised public RSS request; metadata only. Never modifies catalog approvals."""
import datetime,email.utils,hashlib,json,os,re,subprocess,xml.etree.ElementTree as ET
from pathlib import Path
from html import unescape
from html.parser import HTMLParser
from urllib.parse import urlsplit,parse_qs,urlencode
from zoneinfo import ZoneInfo
RSS='https://www.jobapscloud.com/MD/rss.asp'
class Plain(HTMLParser):
 def __init__(self):super().__init__();self.parts=[]
 def handle_data(self,s):self.parts.append(s)
def plain(s):
 p=Plain();p.feed(s or '');return ' '.join(' '.join(p.parts).split())
def canonical(url):
 p=urlsplit(unescape(url));q={k.lower():v[0] for k,v in parse_qs(p.query).items()};ids=[q.get(k,'') for k in ('r1','r2','r3')]
 if p.scheme!='https' or p.netloc.lower()!='www.jobapscloud.com' or p.path.lower()!='/md/sup/bulpreview.asp' or not re.fullmatch(r'\d{2}-\d{6}-\d{4}','-'.join(ids)):return None
 return 'https://www.jobapscloud.com/MD/sup/bulpreview.asp?'+urlencode(dict(zip(['R1','R2','R3'],ids)))
def parse_feed(xml,at):
 root=ET.fromstring(xml);out=[]
 for item in root.findall('.//item'):
  url=canonical(item.findtext('link',''));title=plain(item.findtext('title',''));m=re.search(r'#(\d{2}-\d{6}-\d{4})',title)
  if not url or not m:continue
  if '-'.join(parse_qs(urlsplit(url).query)[k][0] for k in ['R1','R2','R3'])!=m.group(1):continue
  desc=item.findtext('description','');pairs={}
  for label,value in re.findall(r'<strong>\s*([^<:]+):\s*</strong>(.*?)(?=<strong>|$)',desc,re.S|re.I):pairs[label.strip().lower()]=plain(value).split('View this Recruitment:')[0].strip().rstrip('.')[:250]
  raw=pairs.get('filing deadline','Not supplied');deadline=None
  if not re.search('continuous',raw,re.I):
   try:deadline=datetime.datetime.strptime(raw,'%m/%d/%Y %I:%M:%S %p').replace(tzinfo=ZoneInfo('America/New_York')).isoformat()
   except ValueError:pass
  pub=item.findtext('pubDate','').strip();published=None
  try:published=email.utils.parsedate_to_datetime(pub).isoformat()
  except (ValueError,TypeError):pass
  out.append({'id':m.group(1),'title':title.split(' - #')[0][:180],'employer':'State of Maryland · '+pairs.get('department','Department not supplied'),'sourceUrl':url,'location':pairs.get('work location','Not supplied'),'pay':pairs.get('salary','Not supplied'),'deadline':deadline,'deadlineLabel':raw,'publishedAt':published,'publisherDate':pub,'observedAt':at,'firstObservedAt':at,'status':'discovered','source':'Maryland advertised public RSS','limitation':'Discovery metadata only. Full announcement and qualifications have not been individually reviewed. Maryland local deadline timezone assumed; publisher date retained as supplied.'})
 return list({r['sourceUrl']:r for r in out}.values())
def curl(url):return subprocess.run(['curl','-fsSL','--max-time','25',url],capture_output=True,check=True).stdout
if __name__=='__main__':
 path=Path('data/pulse.json');previous=json.loads(path.read_text()) if path.exists() else {};at=datetime.datetime.now(datetime.timezone.utc).isoformat()
 if os.environ.get('GITHUB_ACTIONS')=='true':
  try:
   remote=json.loads(curl('https://siamakenna.github.io/opportunitybridge-citygov-2026/data/pulse.json'))
   if remote.get('lastSuccessAt','')>previous.get('lastSuccessAt',''):previous=remote
  except Exception:pass
 try:
  body=curl(RSS);records=parse_feed(body,at)
  if not records:raise ValueError('No valid recruitment entries; preserve previous snapshot')
  old={r['sourceUrl']:r for r in previous.get('records',[])};changes=[]
  for r in records:
   prior=old.get(r['sourceUrl']);r['firstObservedAt']=prior.get('firstObservedAt',at) if prior else at
   if prior:
    for k in ['deadline','deadlineLabel','pay','title','employer','location']:
     if r[k]!=prior.get(k):changes.append({'id':r['id'],'sourceUrl':r['sourceUrl'],'field':k,'before':prior.get(k),'after':r[k],'observedAt':at,'status':'RSS metadata difference — awaiting full source review'})
  missing=[{'id':r['id'],'sourceUrl':r['sourceUrl'],'field':'feed membership','before':'Previously observed','after':'Not in latest feed; removal/withdrawal reason unconfirmed','observedAt':at,'status':'Awaiting review; not proof of withdrawal'} for u,r in old.items() if u not in {r['sourceUrl'] for r in records}]
  result={'schemaVersion':1,'connection':'scheduled snapshot, not live','feedUrl':RSS,'lastAttemptAt':at,'lastSuccessAt':at,'fetchStatus':'ok','records':records,'changes':changes+missing,'rawFeedSha256':hashlib.sha256(body).hexdigest(),'coverage':'Public Maryland RSS only; not all civic careers. Categories are keyword discovery aids, not eligibility.','usajobs':'Not connected: owner-approved API key and registered email required.'}
 except Exception as e:
  result={**previous,'schemaVersion':1,'connection':'scheduled snapshot, not live','feedUrl':RSS,'lastAttemptAt':at,'fetchStatus':'unavailable','error':'Public RSS retrieval or parsing failed; previous successful snapshot retained.','records':previous.get('records',[]),'changes':previous.get('changes',[])}
 path.parent.mkdir(exist_ok=True);path.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({'fetchStatus':result['fetchStatus'],'records':len(result['records']),'lastSuccessAt':result.get('lastSuccessAt'),'lastAttemptAt':at,'changes':len(result.get('changes',[]))}))
