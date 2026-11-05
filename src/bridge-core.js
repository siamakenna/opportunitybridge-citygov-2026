import {lifecycle} from './real-core.js';
import {mappingApproved} from './source-review.js';
export const bridgeVersion='1.1';
export function reviewedDataDuty(r){const review=r.bridgeDutyReview;return r.id==='md-vendor'&&mappingApproved(r)&&review?.snapshot===JSON.stringify({id:r.id,sourceUrl:r.sourceUrl,recruitment:r.recruitment,duties:r.duties,skill:'data'})&&review.sourceHash===r.mappingReview.sourceHash&&review.reviewedAt===r.verifiedAt?r.duties?.[0]:null;}
export const bridgeSkills={software:'Introductory HTML and web accessibility',communication:'Clear written communication',data:'Organizing and checking data',research:'Finding and explaining source evidence',other:'A skill not yet linked to this source'};
const clean=s=>String(s||'').replace(/[<>\u0000-\u0008]/g,'').slice(0,800);
export function skillConnection(r,skill){
 const approved=mappingApproved(r),duty=r.id==='mpt-media'&&r.duties?.[0]==='Build educational web resource collections using HTML.'?r.duties[0]:null;
 if(r.id==='mpt-media'&&skill==='software'&&duty&&approved)return {kind:'Directly linked to a reviewed employer duty',target:'duty:0',duty,reason:'Introductory HTML can be demonstrated through the educational web collections named in MPT’s reviewed duties. The source also describes accessibility work; this exercise does not prove WCAG conformance or student eligibility.',proposal:'Proposed accessible fictional library resource page, with heading, language, link, alternative-text and label checks.',questId:'accessibility'};
 if(skill==='data'&&reviewedDataDuty(r))return {kind:'Directly linked to a reviewed employer duty',target:'duty:0',duty:reviewedDataDuty(r),reason:'Organizing and checking classroom spreadsheet records connects to the reviewed vendor-table maintenance duty. A fictional data-quality memo can show checking habits; the employer has not accepted this sample or waived financial-experience requirements.',proposal:'Proposed three-row fictional vendor-record table with a duplicate and missing-field check, a correction log and a plain-language quality memo. Use invented IDs only; no real vendors, tax records or personal information.',questId:null};
 if((r.skills||[]).includes(skill)&&skill!=='other')return {kind:'Transferable skill with a reasoned connection',target:approved?r.requirements?.[0]?.id||'':'',duty:approved?(r.requirements?.[0]?.summary||'No reviewed duty available.'):'No approved duty or requirement mapping available; inspect the source.',reason:'This skill is present in the curated source record. A proposed evidence memo can support a conversation; it does not satisfy the selected qualification. The optional exercise uses a separate frozen source.',proposal:'Proposed source-linked '+skill+' evidence memo, reviewed with an advisor.',questId:r.id.startsWith('md-admin')?'source':'evidence'};
 return {kind:'General exploratory learning',target:'',duty:'No supported skill-to-duty connection selected.',reason:'This skill is not mapped to the selected source. Ask an advisor to inspect the employer’s duties before proposing a direct connection.',proposal:'Proposed exploration note asking whether this skill is relevant; no employer duty is invented.',questId:null};
}
export function bridgePlan(r,row={},revision='local',now=new Date()){
 if(!r)throw Error('Choose a reviewed opportunity first.');
 const skill=Object.hasOwn(bridgeSkills,row.skill)?row.skill:'',map=skillConnection(r,skill),life=lifecycle(r,now),declared=clean(row.experience);
 const unknowns=[...new Set([...(r.requirements||[]).filter(x=>x.required).map(x=>x.label),...(r.id==='mpt-media'?['Verified enrollment or accepted recent-graduate route','Weekly availability of at least 16 hours','Work authorization and any full-source conditions']:[]),'Employer acceptance of a proposed sample','Full current announcement and document requirements'])];
 const source={employer:r.employer,title:r.title,url:r.sourceUrl,recruitment:r.recruitment||r.id,reviewedAt:r.verifiedAt,mappingHash:r.mappingReview?.sourceHash||null,catalogRevision:revision,status:life.label,warning:life.state==='expired'?'Deadline passed. Historical practice only; do not apply using this plan.':life.stale?'Previously reviewed / source hold. Reinspect the full current source before application preparation.':'Selected source review only; availability and full conditions must be checked.',deadline:r.deadline||null,deadlineLabel:r.deadlineLabel};
 const question=clean(row.verification)|| (r.id==='mpt-media'?'Which enrollment or recent-graduate records and weekly schedule should I verify for this specific fellowship, and what evidence of accessible HTML work would be useful?':'Which records establish the selected qualification or substitution, and which remaining conditions should HR verify?');
 const action=(priority,title,why,artifact,condition)=>({priority,title,why,sourceUrl:r.sourceUrl,sourceEvidence:map.kind.startsWith('Directly')?map.duty:(r.requirements?.[0]?.summary||r.summary),expectedArtifactOrDecision:artifact,unresolvedCondition:condition,status:'Planned — not completed'});
 const actions=life.state==='expired'?[
  action(1,'Compare a current alternative','The stored deadline has passed.','A currently open official source to inspect','No alternative opening is guaranteed.'),
  action(2,'Keep a clearly historical practice sample',map.reason,map.proposal,'No application or credential follows from practice.'),
  action(3,'Bring a source-specific question to a human advisor',question,'A recorded question; no response invented','Advisor availability and employer decisions remain unknown.')
 ]:[
  action(1,map.target?'Prepare the proposed work sample':'Check whether this skill fits the employer’s work',map.reason,map.proposal,'Learner work is declared/proposed and has not been independently verified.'),
  {...action(2,'Check the full current announcement and documents','The source controls the qualification, schedule, documents and deadline. A static review may be stale.',(r.materials||[]).join('; ')||'A source-linked document and deadline checklist','Availability, accepted documents and all employer conditions require current review.'),documents:r.materials||[]},
  action(3,'Ask an advisor or employer a specific question',question,'A question to discuss voluntarily; no message sent','No eligibility determination or employer response is recorded.')
 ];
 if(life.state!=='expired'&&(life.stale||(r.deadline&&Date.parse(r.deadline)-now.getTime()<72*3600000))){const first=actions.shift();actions.splice(1,0,first);actions.forEach((a,i)=>a.priority=i+1);}
 return {schema:'opportunitybridge-career-bridge-1',bridgeVersion,productVersion:'0.9.4',createdAt:now.toISOString(),fictionalDemo:true,title:'My Career Bridge Plan',source,learner:{experience:declared||'No learner experience declared.',evidenceStatus:'Learner-declared fictional information; not independently verified.',skill:bridgeSkills[skill]||'Not selected'},connection:map,proposedEvidence:clean(row.artifact)||map.proposal,demonstratedEvidence:row.questReceipt?'A fictional exercise receipt is attached in Passport. Replay/check its version; it is not a credential.':'No demonstrated work verified. The sample is proposed.',actions,unknowns,humanQuestion:question,humanVerification:'A human advisor or employer must verify applicant records and interpret full conditions. No eligibility, hiring probability, employment offer or automatic submission is produced.'};
}
export function bridgeRow(r,skill,experience=''){
 const map=skillConnection(r,skill);return {experience:clean(experience),skill:skill==='other'?'':skill,requirement:map.target,artifact:map.proposal,verification:r.id==='mpt-media'?'Which enrollment or recent-graduate records, weekly schedule and accessible HTML sample should I discuss with MPT?':'Which records establish the selected requirement, and what remaining conditions should HR verify?'};
}
export function bridgeDocument(plan) {
 const {source, learner, connection} = plan;
 const documents = plan.actions.find(action => action.documents?.length)?.documents;
 return [
  {paragraphs:[
   'Fictional demonstration for career preparation.',
   source.employer + ' · ' + source.title + ' (' + source.recruitment + ')',
   'Official source: ' + source.url,
   source.status + '. ' + source.warning,
   'Deadline: ' + source.deadlineLabel,
  ]},
  {title:'Skill-to-duty connection', paragraphs:[
   'Learner supplied (fictional): ' + learner.skill + ' · ' + learner.experience,
   'Employer source says (reviewed summary): ' + connection.duty,
   connection.kind + '. ' + connection.reason,
   'App suggests — proposed evidence: ' + plan.proposedEvidence,
   plan.demonstratedEvidence,
  ]},
  {title:'Exactly three next actions', paragraphs:['Planned — not completed'], items:
   plan.actions.map(action => action.title + '. ' + action.unresolvedCondition), ordered:true},
  ...(documents ? [{title:'Documents to check with the employer', items:documents}] : []),
  {title:'Advisor question', paragraphs:[plan.humanQuestion]},
  {title:'Outstanding questions', items:plan.unknowns, paragraphs:[plan.humanVerification]},
  {title:'Source and export details', paragraphs:[
   'Original review date: ' + source.reviewedAt,
   'Source version: ' + source.catalogRevision + ' · mapping hash: ' + (source.mappingHash || 'None'),
   'Generated: ' + plan.createdAt + ' · product ' + plan.productVersion + ' · bridge ' + plan.bridgeVersion,
   'No application or message is sent. Share this plan by choice.',
  ]},
 ];
}

export function bridgeMarkdown(plan) {
 return [
  '# ' + plan.title,
  ...bridgeDocument(plan).map(({title, paragraphs = [], items = [], ordered}) => [
   ...(title ? ['## ' + title] : []),
   ...paragraphs,
   ...(items.length ? [items.map((item, index) => (ordered ? (index + 1) + '. ' : '- ') + item).join('\n')] : []),
  ].join('\n\n')),
 ].join('\n\n') + '\n';
}
