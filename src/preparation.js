import {lifecycle,reviewRecord,DECLARATIONS} from './real-core.js';
const clean=value=>String(value??'').slice(0,800).replace(/[<>]/g,'').replace(/\r/g,'');
export function deadlinePresentation(record,now=new Date()){
 const life=lifecycle(record,now);if(life.state==='expired')return {label:'Deadline passed',detail:record.deadlineLabel,closed:true};
 const warning=life.stale?'Previously verified — recheck. ':life.state==='unverified'?'Source review needed. ':'';
 if(record.kind==='posting'&&!record.deadline)return {label:warning+'Open/continuous — may close without notice',detail:'No closing date announced; recheck the official recruitment.',closed:false};
 if(!record.deadline)return {label:warning+'Ongoing pathway — no individual deadline',detail:record.deadlineLabel,closed:false};
 const soon=Date.parse(record.deadline)-now.getTime()<=14*86400000;
 return {label:warning+(soon?'Closing soon':'Dated intake / vacancy'),detail:record.deadlineLabel,closed:false};
}
export function actionPlan(record,now=new Date()){
 const deadline=record.deadline?Date.parse(record.deadline):null,start=now.getTime();
 if(deadline!==null&&deadline<=start)return [{action:'Find a current official replacement; do not use an expired application plan.',due:null,kind:'expired'}];
 return [[0,'Recheck the full official source, identity, deadline and all conditions.'],[1,'Ask an advisor or employer about unresolved qualifications and substitutions.'],[3,'Draft a truthful work sample and assemble the required documents.'],[7,'Have a human review the packet, accessibility needs and remaining questions.'],[14,'Use the official application only if appropriate; no application is sent by this tool.']].map(([days,action])=>({action,due:new Date(Math.min(start+days*86400000,deadline??Infinity)).toISOString(),kind:deadline===null?'personal target — not an employer deadline':'no later than the official deadline'}));
}
export function worksheetExport(record,rows=[]){return ['## Editable experience-to-evidence worksheet','Fictional declarations and proposed artifacts, not completed work or verified credentials.',...rows.flatMap((row,i)=>{const criterion=record.requirements.find(c=>c.id===row.requirement);return [`### Connection ${i+1}`,`Experience (fictional / unverified): ${clean(row.experience)||'Not entered'}`,`Skill: ${clean(row.skill)||'Not selected'}`,`Source requirement / role task: ${criterion?.label||(row.requirement?.startsWith('duty:')?record.duties?.[Number(row.requirement.slice(5))]:null)||'Not selected'}`,`Source: ${record.sourceUrl}`,`Proposed artifact: ${clean(row.artifact)||'Not entered'}`,`Human verification / open question: ${clean(row.verification)||'Not entered'}`,''];})].join('\n');}
export function preparationStatus(record,facts={},rows=[],documents={},sourceInspected=false,now=new Date()){
 const checks=reviewRecord(record,facts,now);return {source:sourceInspected?'Self-marked inspected; not independent verification':'Not marked inspected',declarations:Object.values(facts).filter(v=>v!==''&&v!=='unknown').length,consistent:checks.filter(c=>c.value==='yes').length,conflicts:checks.filter(c=>c.value==='no').length,unknown:checks.filter(c=>c.value==='unknown').length,worksheetFields:rows.reduce((n,r)=>n+['experience','skill','requirement','artifact','verification'].filter(k=>r[k]?.trim()).length,0),worksheetExpected:rows.length*5,documentsPrepared:record.materials.filter((_,i)=>documents[i]).length,documentsExpected:record.materials.length};
}
export function preparationExport(record,facts,rows,documents,sourceInspected,now=new Date()){
 const s=preparationStatus(record,facts,rows,documents,sourceInspected,now),date=deadlinePresentation(record,now);
 return [worksheetExport(record,rows),'','## Preparation progress (self-declared, not eligibility)',`Source: ${s.source}`,`Selected conditions: ${s.consistent} declared consistent; ${s.conflicts} possible conflicts; ${s.unknown} unknown.`,`Worksheet: ${s.worksheetFields}/${s.worksheetExpected} fields entered.`,`Documents marked prepared: ${s.documentsPrepared}/${s.documentsExpected}.`,...record.materials.map((m,i)=>`- [${documents[i]?'x':' '}] ${m}`),'','## Deadline-aware preparation targets',date.label,date.detail,...actionPlan(record,now).map(p=>`- ${p.due||'No application target'} (${p.kind}): ${p.action}`),'Personal preparation dates are not employer promises. Employer deadlines and early withdrawal control.'].join('\n');
}
