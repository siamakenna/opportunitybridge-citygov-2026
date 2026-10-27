// CCEB input-only adapters. References and case IDs never enter these functions.
import {reviewRecord,lifecycle,catalogIssues} from './real-core.js';
import {heldCatalog} from './pulse-core.js';
import {normalizeOpportunity,normalizeText} from './taxonomy.js';
import {mappingApproved} from './source-review.js';
import {connectionReview} from './passport.js';
import {preparationStatus} from './preparation.js';
import {validateJourney,makeJourney} from './journey-core.js';
import {sourceDetective,questSources,questVersion} from './quest-core.js';
import {outcomes} from './outcomes.js';
export function inputOnly(c,d){return {input:structuredClone(c.input),record:structuredClone(c.input.record||d.sources[c.input.recordId]?.record),clock:d.clock};}
const state=v=>({yes:'supported',no:'conflict',unknown:'insufficient'})[v];
const numeric=x=>x!==''&&x!==undefined&&x!==null&&Number.isFinite(Number(x))&&Number(x)>=0?Number(x):null;
function primary(r){if(r.recordKind==='directory'||r.kind==='program')return 'directory';const t=r.opportunityTypes||r.classifications?.map(c=>c.type)||[];return t.includes('course')?'course':t.includes('fellowship')?'fellowship':t.some(x=>x.includes('internship'))?'internship':t.some(x=>['full-time','part-time'].includes(x))?'job':'unknown';}
export function evaluateInput(payload,method='C'){
 const {input:i,clock}=payload,now=new Date(clock),original=structuredClone(payload.record),patched={...original,...i.patch};
 const r=heldCatalog([patched],i.observation?[{id:patched.id,...i.observation}]:[])[0];
 const base={method,task:i.task,sourceUrl:r.sourceUrl||null,overallEligibility:null,limit:'Selected task only. Fictional declarations, unverified evidence; employer/human review required.'};
 const answer=o=>({...base,...o});const unsupported=()=>answer({supported:false,reason:'Task not implemented by this baseline; excluded from its denominator.'});
 if(i.task==='classification'){
  if(method==='C')return answer({supported:true,primary:primary(normalizeOpportunity(r)),raw:normalizeOpportunity(r).classifications});
  if(method==='B')return answer({supported:true,primary:i.sourceFacts?.primary||primary(r),reason:'Explicit source type metadata only.'});
  const text=normalizeText(r.title+' '+r.summary),neg=/\bnot (an? )?(internship|fellowship)\b/.test(text),job=/\bfull time\b/.test(text);
  return answer({supported:true,primary:r.recordKind==='directory'||r.kind==='program'?'directory':/\b(course|training guide)\b/.test(text)?'course':job&&(neg||/\b(coordinator|manager)\b/.test(text))?'job':/\b(fellow|fellowship)\b/.test(text)?'fellowship':/\b(intern|internship)\b/.test(text)&&!neg?'internship':job?'job':'unknown',reason:'Normalized word boundaries, explicit negation and full-time wording.'});
 }
 if(i.task==='deadline'){
  const time=r.deadline?Date.parse(r.deadline):null,review=Date.parse(r.verifiedAt),life=lifecycle(r,now);
  const basic=time!==null&&!Number.isFinite(time)?'hold':time!==null&&time<=+now?'expired':time===null?'continuous':'announced';
  return answer({supported:true,deadlineStatus:method==='C'?(catalogIssues([r]).some(x=>x.includes('invalid deadline'))?'hold':life.state==='expired'?'expired':life.stale||life.state==='unverified'?'hold':basic):method==='B'&&(!Number.isFinite(review)||review>+now||+now-review>48*3600000)?'hold':basic,raw:method==='C'?life:undefined,reason:method==='A'?'Date parsing only; no review gate.':method==='B'?'Dates and review timestamp; no source observation gate.':'Production lifecycle and catalog validity guards.'});
 }
 if(i.task==='mapping')return method==='C'?answer({supported:true,state:mappingApproved(r)?'supported':'insufficient',reason:'Production exact approved mapping snapshot.'}):unsupported();
 if(i.task==='import'){
  if(method!=='C')return unsupported();
  const j=makeJourney({},'local',now),checks=sourceDetective().checks;checks[Object.keys(checks)[0]]=false;
  j.questLedger=[{key:'source@'+questVersion,questId:'source',questVersion,checks,sourceSnapshot:questSources['md-admin'],completedAt:clock,notes:'',xp:30,type:'In-app learning progress',origin:'current-session'}];
  try{validateJourney(j);return answer({supported:true,state:'supported',reason:'Import accepted'});}catch(e){return answer({supported:true,state:'insufficient',reason:e.message});}
 }
 if(i.task==='documents'){
  const s=method==='C'?preparationStatus(r,i.facts,[],i.documents||{},false,now):{documentsExpected:r.materials.length,documentsPrepared:r.materials.filter((_,n)=>i.documents?.[n]).length};
  const missingDocuments=s.documentsExpected-s.documentsPrepared;return answer({supported:true,state:missingDocuments?'insufficient':'supported',missingDocuments,reason:'Self-marked document checklist only; not verified evidence or eligibility.'});
 }
 if(i.task==='pay')return answer({supported:true,state:/\$\s*\d/.test(r.pay||'')?'supported':'insufficient',reason:'Exact compensation amount requires an explicit amount, not a paid label.'});
 if(i.task==='plan'){
  if(method!=='C')return unsupported();const raw=connectionReview(r,i.row||{},outcomes);
  return answer({supported:true,state:raw.unknowns.length?'insufficient':'supported',raw,unknowns:raw.unknowns,reason:'Production field completeness and limited claim screen, not semantic truth verification.',rubric:{source:!!r.sourceUrl,target:raw.target!=='Unselected / unknown',artifact:!!i.row?.artifact?.trim(),humanQuestion:!!i.row?.verification?.trim(),limits:true}});
 }
 if(i.task==='condition'){
  if(method==='C'){const checks=reviewRecord(r,i.facts,now),selected=checks.find(c=>c.id===i.question.criterion);return answer({supported:true,state:state(selected?.value||'unknown'),raw:selected||null,unknowns:checks.filter(c=>c.value!=='yes').map(c=>c.label),reason:selected?.reason||'No selected reviewed condition.'});}
  const f=i.facts||{},key=i.question.criterion,criterion=r.requirements?.find(c=>c.id===key),text=normalizeText(JSON.stringify(criterion||{})),admin=r.id==='md-admin',finance=r.id==='md-vendor';let value='insufficient';
  if(key==='education'){value=f.hs==='yes'?'supported':f.hs==='no'&&admin?'conflict':'insufficient';}
  if(key==='experience'&&(admin||finance)){
   const m=numeric(f[admin?'adminMonths':'financeMonths']),c=numeric(f[admin?'collegeCredits':'accountingCredits']);
   if(admin&&text.includes('30'))value=(m!==null&&m>=6)||(c!==null&&c>=30)?'supported':m!==null&&c!==null&&f.military==='no'?'conflict':'insufficient';
   if(finance)value=m!==null&&m>=24||m!==null&&m>=12&&c!==null&&c>=6?'supported':c!==null&&c>=12&&m!==null&&m<12?'insufficient':m!==null&&c!==null&&f.military==='no'&&f.vocational==='no'?'conflict':'insufficient';
  }
  return answer({supported:true,state:value,reason:method==='A'?'Minimal normalized source-keyword thresholds; no full provenance gate.':'Minimal selected structured threshold formulas; no full provenance gate.'});
 }
 return unsupported();
}
