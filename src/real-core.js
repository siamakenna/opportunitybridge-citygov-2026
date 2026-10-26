import {outcomes} from './outcomes.js';
export const DECLARATIONS = Object.freeze({yes:'Declared evidence appears consistent',no:'Possible conflict — verify',unknown:'Insufficient information'});
export function lifecycle(record, now=new Date()) {
 const time=now.getTime(), checked=Date.parse(record.verifiedAt);
 if(record.deadline && time>=Date.parse(record.deadline))return {state:'expired',label:'Deadline passed',stale:time-checked>48*3600000};
 if(record.verification!=='official'||!Number.isFinite(checked))return {state:'unverified',label:'External discovery link — not verified',stale:true};
 const stale=time-checked>48*3600000 || checked>time;
 if(stale)return {state:'stale',label:'Previously observed — recheck',stale:true};
 if(record.kind==='program')return {state:'program',label:'Ongoing career program — no individual vacancy verified',stale:false};
 return {state:'verified',label:'Verified from official source',stale:false};
}
export function filterCatalog(records, filters={}, now=new Date()) {
 return records.filter(r=>{const life=lifecycle(r,now);if(filters.view==='expired'?life.state!=='expired':filters.view==='shortlist'?!filters.shortlist?.includes(r.id):life.state==='expired')return false;
 if(filters.sector&&filters.sector!=='all'&&r.sector!==filters.sector)return false;
 if(filters.region&&filters.region!=='all'&&!r.region.includes(filters.region))return false;
 if(filters.stage&&filters.stage!=='all'&&!r.stages.includes(filters.stage))return false;
 if(filters.deadline==='dated'&&!r.deadline)return false;
 if(filters.deadline==='soon'&&(!r.deadline||Date.parse(r.deadline)<now.getTime()||Date.parse(r.deadline)-now.getTime()>14*86400000))return false;
 if(filters.query&&!`${r.title} ${r.employer} ${r.summary}`.toLowerCase().includes(filters.query.toLowerCase()))return false;return true;});
}
const number=x=>x===''||x===null||x===undefined?null:(Number.isFinite(Number(x))&&Number(x)>=0&&Number(x)<=10000?Number(x):null);
const tri=x=>['yes','no'].includes(x)?x:'unknown';
function experience(f,kind){
 const months=number(f[kind==='admin'?'adminMonths':'financeMonths']),credits=number(f[kind==='admin'?'collegeCredits':'accountingCredits']);
 if(kind==='admin'){
  if((months!==null&&months>=6)||(credits!==null&&credits>=30))return ['yes',credits>=30?'Declared 30-credit substitution route; verify accreditation and records.':'Declared six-month route; verify duties and duration.'];
  if(months!==null&&credits!==null&&tri(f.military)==='no')return ['no','Neither declared numeric route reaches the threshold; ask HR about equivalence.'];
  return ['unknown','Need qualifying months or 30 accredited credits; military equivalence cannot be inferred.'];
 }
 if(months!==null&&months>=24)return ['yes','Declared 24-month route; verify the financial duties.'];
 if(months!==null&&months>=12&&credits!==null&&credits>=6)return ['yes','Six accounting credits plus at least 12 qualifying months appear consistent with the published one-year substitution.'];
 if(credits!==null&&credits>=12&&months!==null&&months<12)return ['unknown','Whether multiple accounting-credit substitutions can be combined is not established; ask HR.'];
 if(months!==null&&credits!==null&&months<12&&tri(f.vocational)==='no'&&tri(f.military)==='no')return ['no','Declared experience is short of the modeled routes; six credits alone do not establish 24 months.'];
 return ['unknown','Six accounting credits replace one year only. Vocational/military equivalence or stacking needs HR review.'];
}
export function reviewRequirement(record, criterion, facts={}, now=new Date()) {
 const life=lifecycle(record,now);let value='unknown',reason='This condition needs a human review of the complete official source.';
 if(life.state==='expired'||life.stale||life.state==='unverified')reason='Source is expired, stale or unverified. Recheck before interpreting declarations.';
 else if(!criterion.context||(!criterion.exact&&!criterion.summary))reason='Incomplete source context; no automated interpretation.';
 else if(criterion.rule==='md-admin-experience'||criterion.rule==='md-finance-experience') [value,reason]=experience(facts,criterion.rule==='md-admin-experience'?'admin':'finance');
 else if(criterion.rule==='md-education'||criterion.rule==='vendor-education') {value=tri(facts.hs);if(value==='no'&&criterion.rule==='vendor-education')value='unknown';reason=value==='yes'?'Declared credential only; inspect supporting evidence.':'Credential or published education-equivalence route needs verification.';}
 else if(['office','enrolled','local'].includes(criterion.rule)){value=tri(facts[criterion.rule]);reason=criterion.rule==='local'?'Availability declaration only; no home address is needed.':'Learner declaration only; verify against the full criterion.';}
 return {...criterion,value,statusLabel:DECLARATIONS[value],reason,sourceUrl:record.sourceUrl,sourceContext:criterion.context,limited:true};
}
export function reviewRecord(record,facts={},now=new Date()){return record.requirements.map(c=>reviewRequirement(record,c,facts,now));}
export function discoveryLinks(record){const query=`${record.title} ${record.region}`;return [
 {name:'Google job search',url:'https://www.google.com/search?q='+encodeURIComponent(query+' jobs'),note:'General Google discovery, not Google-company careers or verified listings.'},
 {name:'LinkedIn Jobs',url:'https://www.linkedin.com/jobs/search/?keywords='+encodeURIComponent(query),note:'Optional external discovery; login may be required. Results are not verified.'},
 {name:'Handshake',url:'https://joinhandshake.com/',note:'Optional institutional access may be required. Sign in through your school and search the title.'},
 {name:'USAJOBS',url:'https://www.usajobs.gov/Search/Results?k='+encodeURIComponent(record.title),note:'Official federal search; individual results must be checked.'}];}
const clean=x=>String(x??'').slice(0,800).replace(/[<>]/g,'').replace(/\r/g,'');
export function careerExport(record,facts={},notes={},now=new Date(),type='advisor'){
 const life=lifecycle(record,now),checks=reviewRecord(record,facts,now);
 const lines=[`# OpportunityBridge — ${type==='portfolio'?'Portfolio plan':'Application checklist and advisor handoff'}`,'',`Opportunity: ${record.title}`,`Employer: ${record.employer}`,`Recruitment: ${record.recruitment||'Program / no individual vacancy'}`,`Source: ${record.sourceUrl}`,`Official application/search: ${record.applicationUrl}`,`Status: ${life.label}`,`Verified at: ${record.verifiedAt} (${record.reviewer})`,`Deadline: ${record.deadlineLabel}`,`Compensation: ${record.pay}`,`Location / remote: ${record.region} / ${record.remote}`,'','Partial source review, not a qualification decision. Use fictional declarations in this demo. Human/employer verification required.','',
 '## Source-grounded requirements',...checks.flatMap(c=>[`${c.required?'Required':'Preferred'} — ${c.label}: ${c.label&&c.value?DECLARATIONS[c.value]:'Insufficient information'}`,c.exact?`Exact source fragment: “${c.exact}”`:'No exact excerpt included; consult linked source.',`Context: ${c.context}`,`Summary: ${c.summary}`,`Review: ${c.reason}`,`Draft evidence (unverified): ${clean(notes[c.id])||'Not entered'}`,'']),
 '## Published substitutions (summaries; full bulletin controls)',...(record.substitutions.length?record.substitutions:['No substitution verified for this record.']),
 '','## Application materials',...record.materials.map(x=>'- '+x),'','## Conditions to verify',record.restrictions,record.limitations,
 '','## Open questions',...checks.filter(c=>c.value!=='yes').map(c=>'- '+c.label+': '+c.reason),'- What full requirements, schedule, accommodations and accepted evidence apply?',
 '','## OpportunityBridge portfolio recommendations (not completed work)',...record.skills.map(x=>'- '+portfolioPrompts[x]),
 '','## Historical analogies (not endorsements or these exact vacancies)',...record.outcomes.map(id=>{const o=outcomes.find(x=>x.id===id);return o?`${o.name}: ${o.summary} Source: ${o.sourceUrl}. ${o.career}`:'No record';}), 'No historical outcome guarantees a future placement.', '','## Current fictional declarations',...Object.entries(facts).map(([key,value])=>`- ${key}: ${clean(value)||'unknown'}`),
 '','## 14-day plan','- Days 1–2: Recheck source, deadline and all conditions. If expired, find a new official posting.','- Days 3–4: Confirm substitutions and unclear conditions with an advisor or employer; share only by choice.','- Days 5–7: Prepare a relevant work sample and document its limits.','- Days 8–10: Review the checklist, official materials and accessibility options with an advisor.','- Days 11–14: Apply only through the official system if appropriate and before its actual deadline; otherwise use a future search.','A deadline sooner than day 14 takes priority; this plan never extends it.',
 '','## Privacy and limits','Tab-only notes and shortlist reset on reload. Downloads are your responsibility. Hosting receives page-request logs. No email, application or referral is sent. No demographic eligibility is inferred. Historical fellows do not endorse this product and their work does not predict your hiring outcome.'];
 return lines.join('\n');
}
export const portfolioPrompts=Object.freeze({data:'Build a small public-data table or chart with validation steps and missing-data notes.',research:'Write a source-linked research memo or fictional interview plan; use consent for any real interviews.',communication:'Write a one-page plain-language guide with sources and an accessibility check.',software:'Build a fictional service-navigation feature with tests and a decision log.'});
export function catalogIssues(records){const issues=[];const ids=new Set();for(const r of records){if(ids.has(r.id))issues.push(r.id+': duplicate ID');ids.add(r.id);for(const k of ['employer','sourceUrl','applicationUrl','verifiedAt','reviewer','limitations'])if(!r[k])issues.push(r.id+': missing '+k);for(const key of ['sourceUrl','applicationUrl'])if(!/^https:\/\//.test(r[key]||''))issues.push(r.id+': unsafe '+key);if(!Number.isFinite(Date.parse(r.verifiedAt)))issues.push(r.id+': invalid verification timestamp');if(r.deadline&&!Number.isFinite(Date.parse(r.deadline)))issues.push(r.id+': invalid deadline');}return issues;}
