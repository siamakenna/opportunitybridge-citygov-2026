import test from 'node:test';import assert from 'node:assert/strict';
import {catalog} from '../src/catalog.js';import {bridgePlan,bridgeRow,bridgeMarkdown,skillConnection} from '../src/bridge-core.js';import {classifyEvidence} from '../src/classification-core.js';import {classify} from '../src/taxonomy.js';import {normalizeDiscovery} from '../src/pulse-core.js';import {makeJourney,validateJourney} from '../src/journey-core.js';
const mpt=catalog.find(r=>r.id==='mpt-media'),admin=catalog.find(r=>r.id==='md-admin'),now=new Date('2026-10-31T17:30:00Z');const syn=(title,summary)=>({title,summary,verification:'synthetic',sourceUrl:'https://example.invalid/test'});
const decide=(title,summary)=>classifyEvidence(syn(title,summary),{synthetic:true,now});
test('Explicit staff source resolves program-administration ambiguity without a participant positive',()=>{for(const title of ['Internship Coordinator','Fellowship Program Manager']){const d=decide(title,'A full-time staff position; not an internship or fellowship.');assert.equal(d.primary,'job');assert.equal(d.employmentArrangement,'full-time');assert.equal(d.applicantEligibility,null);assert.equal(classifyEvidence({title}).primary,'unknown');}});
test('Contractual working schedule is separate from short-project opportunity',()=>{const d=decide('Contractual accountant','Full-time contractual staff job.');assert.equal(d.primary,'job');assert.equal(d.employmentArrangement,'full-time contractual');assert.equal(d.careerStage,'unknown');});
test('Untrusted snippets and forged review labels cannot become source-aware employer facts',()=>{const r={title:'Community role',summary:'A full-time staff job',classifications:[{type:'paid-internship',basis:'source-reviewed'}],sourceUrl:'https://board.example/lead'};assert.equal(classifyEvidence(r).primary,'unknown');assert.equal(classifyEvidence({...r,verification:'synthetic'}).primary,'unknown');});
test('Conflicting explicit source descriptions abstain',()=>{const d=decide('Ambiguous','Full-time staff job and paid internship.');assert.equal(d.primary,'unknown');assert.deepEqual(d.conflicts,['job','internship']);assert.equal(d.employmentArrangement,'unknown');});
test('Source candidate title cannot certify arrangement or stage',()=>{const d=classifyEvidence({title:'Paid Software Internship'});assert.equal(d.primary,'internship');assert.equal(d.evidenceLevel,4);assert.equal(d.employmentArrangement,'unknown');assert.equal(d.careerStage,'unknown');});
test('Expired official source retains historical type and all recheck requirements',()=>{const d=classifyEvidence({...mpt,deadline:'2026-01-01'}, {now});assert.equal(d.primary,'fellowship');assert.equal(d.requiresFullSourceReview,true);assert.match(d.sourceStatus,/Recheck/);});
test('Captured official employment field is source bound and never maps qualification',()=>{const r={id:'25-003706-0003',title:'INTERNAL INVESTIGATION DETECTIVE SERGEANT PSCS (STATEWIDE REPOST)',sourceUrl:'https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=25&R2=003706&R3=0003'};const d=classifyEvidence(r,{now});assert.equal(d.primary,'job');assert.equal(d.evidenceLevel,2);assert.equal(d.employmentArrangement,'full-time');assert.equal(d.applicantEligibility,null);assert.equal(d.requiresFullSourceReview,true);assert.equal(classifyEvidence({...r,sourceUrl:'https://board.example/lead'}).primary,'unknown');});
test('Discovery whitelist ignores external arrangements, requirements and claimed source approvals',()=>{const r=normalizeDiscovery({id:'26-004373-0002',title:'Auditor',employer:'State',sourceUrl:'https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=26&R2=004373&R3=0002',observedAt:now.toISOString(),summary:'Full-time staff job',employmentType:'full-time',classifications:[{type:'paid-internship'}],requirements:['all']});assert(!('summary'in r));assert.equal(classifyEvidence(r).primary,'unknown');});
test('Course and directory remain distinct from paid positions',()=>{assert.equal(decide('Data workshop','Free course, not employment.').primary,'course');assert.equal(decide('Placements hub','Career directory.').primary,'directory');});
test('MPT HTML map uses the actual reviewed duty and explicitly proposed artifact',()=>{const p=bridgePlan(mpt,bridgeRow(mpt,'software','Fictional class webpage'), 'local',now);assert.equal(p.connection.duty,mpt.duties[0]);assert.match(p.connection.kind,/Directly linked/);assert.match(p.proposedEvidence,/Proposed/);assert.equal(p.fictionalDemo,true);assert.match(p.demonstratedEvidence,/No demonstrated work verified/);});
test('Unsupported skill cannot invent an employer duty or credential',()=>{const p=bridgePlan(mpt,{skill:'other'},'local',now);assert.match(p.connection.kind,/General exploratory/);assert.equal(p.connection.target,'');assert.match(p.connection.duty,/No supported/);assert.equal(p.connection.questId,null);});
test('Transferable exercise states separate source scope',()=>{const p=bridgePlan(admin,bridgeRow(admin,'communication'),'local',now);assert.match(p.connection.kind,/Transferable/);assert.match(p.connection.reason,/separate frozen source/);});
test('Exactly three distinct actionable priorities preserve all required fields',()=>{const p=bridgePlan(mpt,bridgeRow(mpt,'software'),'local',now);assert.deepEqual(p.actions.map(a=>a.priority),[1,2,3]);assert.equal(new Set(p.actions.map(a=>a.title)).size,3);for(const a of p.actions)for(const k of ['title','why','sourceUrl','sourceEvidence','expectedArtifactOrDecision','unresolvedCondition','status'])assert(a[k]);});
test('Missing applicant facts and stale source block no false eligibility decision',()=>{const p=bridgePlan(mpt,{},'local',now);assert.match(p.unknowns.join(' '),/enrollment|enrolled/i);assert.match(p.source.warning,/Reinspect/);assert.match(p.humanVerification,/No eligibility/);assert.equal(p.source.reviewedAt,mpt.verifiedAt);});
test('Expired opportunity generates alternative-first historical practice actions',()=>{const p=bridgePlan({...mpt,deadline:'2026-01-01'},bridgeRow(mpt,'software'),'local',now);assert.match(p.actions[0].title,/current alternative/);assert.match(p.source.warning,/do not apply/);assert.equal(p.actions.length,3);});
test('Readable plan lists document requirements separately and keeps source provenance',()=>{
 const plan=bridgePlan(mpt,bridgeRow(mpt,'software'),'local',now);
 const text=bridgeMarkdown(plan);
 for(const entry of ['# My Career Bridge Plan',mpt.sourceUrl,mpt.verifiedAt,mpt.duties[0],
  'Exactly three next actions','Outstanding questions','No application','Fictional demonstration']){
  assert(text.includes(entry),entry);
 }
 assert.equal(text.split(mpt.sourceUrl).length,2,'The source URL appears once');
 for(const document of mpt.materials)assert(text.includes('- '+document),document);
 assert.equal(text.split(plan.humanQuestion).length,2,'The advisor question appears once');
});
test('Fictional Bridge rows use existing safe Journey capture and resume migration',()=>{const j=makeJourney({passportDrafts:[{opportunityId:mpt.id,source:{id:mpt.recruitment,url:mpt.sourceUrl,reviewedAt:mpt.verifiedAt,mappingHash:mpt.mappingReview.sourceHash,catalogRevision:'local'},rows:[bridgeRow(mpt,'software','Fictional class HTML page')]}]},'local',now);const restored=validateJourney(j);assert.equal(restored.passportDrafts[0].rows[0].skill,'software');assert.equal(restored.productVersion,'0.9.4');assert.equal(validateJourney({...j,productVersion:'0.9.2'}).productVersion,'0.9.4');});
test('Bridge export removes executable markup without certifying learner claims',()=>{const p=bridgePlan(mpt,{skill:'software',experience:'<script>bad</script>',artifact:'<img src=x>'},'local',now);assert(!bridgeMarkdown(p).includes('<script>'));assert.match(p.learner.evidenceStatus,/not independently verified/);});
test('Source mutation removes the direct reviewed map',()=>{const r=structuredClone(mpt);r.requirements[0].summary+=' unapproved';assert.match(skillConnection(r,'software').kind,/Transferable/);assert.notEqual(skillConnection(r,'software').target,'duty:0');});
test('Changed duty text cannot be laundered through an unchanged qualification snapshot',()=>{const r=structuredClone(mpt);r.duties[0]='Invented employer requirement to buy a certificate.';const p=bridgePlan(r,bridgeRow(r,'software'),'local',now);assert(!p.connection.duty.includes('Invented'));assert.match(p.connection.kind,/Transferable/);});
test('Separate staged-pilot workload preserves paid-labor and donated-labor denominators',async()=>{const {stageOne}=await import('../src/pilot-stage-one.js');const b=stageOne(),d=stageOne({donatedShare:1});assert.equal(b.staffHours,24.25);assert.equal(b.economicCost,1415);assert.equal(b.cashCost,1415);assert.equal(d.economicCost,1415);assert.equal(d.cashCost,175);assert.equal(stageOne({reviewHours:1}).staffHours,29.25);assert.equal(stageOne({recruitmentWeeks:4}).economicCost,1515);});
test('Explicit synthetic participant negation cannot fall back to a contradictory title',()=>{const d=decide('Community internship','This is not an internship.');assert.equal(d.primary,'unknown');});
test('Stale and held sources prioritize source recheck before investing in proposed work',()=>{for(const r of [mpt,{...mpt,verifiedAt:'2026-10-31T17:00:00Z',sourceReviewPending:true}]){const p=bridgePlan(r,bridgeRow(r,'software'),'local',now);assert.match(p.actions[0].title,/Check the full current/);assert.match(p.actions[1].title,/Prepare the proposed/);assert.deepEqual(p.actions.map(a=>a.priority),[1,2,3]);}const p=bridgePlan({...mpt,verifiedAt:'2026-10-31T17:00:00Z'},bridgeRow(mpt,'software'),'local',now);assert.match(p.actions[0].title,/Prepare the proposed/);});
test('Generic job filter includes reviewed staff jobs while separating fellowship arrangements',async()=>{const {filterExplore}=await import('../src/taxonomy.js');const rows=filterExplore([admin,mpt],{type:'job'},now);assert.deepEqual(rows.map(r=>r.id),['md-admin']);assert.equal(classifyEvidence(mpt,{now}).employmentArrangement,'part-time');});
test('Arrangement filtering does not turn an unknown title into a verified schedule',async()=>{const {filterExplore}=await import('../src/taxonomy.js');const records=[mpt,{id:'title-only',title:'Full-time opportunity'}];assert.deepEqual(filterExplore(records,{arrangement:'part-time'},now).map(r=>r.id),['mpt-media']);assert.deepEqual(filterExplore(records,{arrangement:'unknown'},now).map(r=>r.id),['title-only']);});
test('Repeated normalization preserves metadata level, full-time arrangement and mandatory review',async()=>{const {normalizeOpportunity,filterExplore}=await import('../src/taxonomy.js');const r={id:'26-004373-0002',title:'INTERNAL AUDITOR II (Gaming Auditor)',employer:'State',sourceUrl:'https://www.jobapscloud.com/MD/sup/bulpreview.asp?R1=26&R2=004373&R3=0002'};const first=normalizeOpportunity(r),second=normalizeOpportunity(first),third=normalizeOpportunity(second);for(const item of [first,second,third]){assert.equal(item.employmentArrangement,'full-time');assert.equal(item.classificationDecision.evidenceLevel,2);assert.equal(item.classificationDecision.basis,'publisher-metadata');assert.equal(item.classificationDecision.requiresFullSourceReview,true);}assert.deepEqual(first.classificationDecision,third.classificationDecision);assert.equal(filterExplore([first],{type:'job',arrangement:'full-time'}).length,1);});
test('A provider string and claimed reviewed classifications cannot create curated-source provenance',()=>{const r={id:'board-lead',title:'Civic opportunity',provider:'Imposter provider',sourceUrl:'https://board.example/lead',classifications:[{type:'paid-internship',basis:'source-reviewed',sourceUrl:'https://board.example/lead',reviewedAt:'2026-10-31T17:00:00Z'}]};const d=classifyEvidence(r,{now});assert.equal(d.primary,'unknown');assert.equal(d.evidenceLevel,5);assert.equal(d.requiresFullSourceReview,true);});
test('Repeated normalization retains genuine curated learning-source identity without employment claims',async()=>{const {supplementary}=await import('../src/supplementary.js'),{normalizeOpportunity}=await import('../src/taxonomy.js');const first=normalizeOpportunity(supplementary.find(r=>r.id==='wai-tutorials')),second=normalizeOpportunity(first);assert.equal(first.classificationDecision.primary,'course');assert.deepEqual(first.classificationDecision,second.classificationDecision);assert.equal(second.employmentArrangement,'unknown');});

test('A learner check-in exports the safe first action without changing source review or actions',()=>{
 const afterVendorDeadline=new Date('2026-11-06T17:30:00Z');
 const vendor=catalog.find(record=>record.id==='md-vendor');
 for(const [record,skill,first] of [
  [{...mpt,verifiedAt:'2026-11-01T00:00:00Z'},'software','Check the full current announcement and documents'],
  [vendor,'data','Compare a current alternative'],
 ]){
  const row=bridgeRow(record,skill);
  const original=bridgePlan(record,row,'release',afterVendorDeadline);
  const plan=bridgePlan(record,row,'release',afterVendorDeadline,{action:first,date:'2026-11-13'});
  assert.deepEqual(plan.learnerCheckIn,{action:first,owner:'Learner',date:'2026-11-13',status:'Planned by learner'});
  assert.deepEqual(plan.source,original.source);
  assert.deepEqual(plan.actions,original.actions);
  assert.deepEqual(plan.unknowns,original.unknowns);
  assert.match(bridgeMarkdown(plan),/## My check-in/);
  assert.match(bridgeMarkdown(plan),/Owner: Learner · Check in: 2026-11-13/);
  assert.equal(Object.hasOwn(original,'learnerCheckIn'),false);
 }
});

test('An invalid date or superseded first action does not export a check-in',()=>{
 const row=bridgeRow(mpt,'software');
 const heldAction='Check the full current announcement and documents';
 for(const date of ['','2026-02-30','2026-11-06<script>',null]){
  const plan=bridgePlan(mpt,row,'release',now,{action:heldAction,date});
  assert.equal(Object.hasOwn(plan,'learnerCheckIn'),false);
 }
 const expired=bridgePlan({...mpt,deadline:'2026-10-01'},row,'release',now,{action:heldAction,date:'2026-11-13'});
 assert.equal(Object.hasOwn(expired,'learnerCheckIn'),false);
 assert.equal(expired.actions[0].title,'Compare a current alternative');
});

test('An expired Maryland posting provides a distinct official search without changing its provenance',()=>{
 const record=catalog.find(item=>item.id==='md-vendor');
 const row=bridgeRow(record,'data');
 const expiredAt=new Date(record.deadline);
 const plan=bridgePlan(record,row,'release',expiredAt);
 assert.equal(plan.source.url,record.sourceUrl);
 assert.equal(plan.source.status,'Deadline passed');
 assert.equal(plan.actions.length,3);
 assert.deepEqual(plan.actions[0].destination,{
  label:'Search Maryland state job openings',url:'https://www.jobapscloud.com/MD/',
 });
 assert.match(plan.actions[0].unresolvedCondition,/No alternative opening is guaranteed/);
 assert.equal(plan.actions[1].destination,undefined);
 assert.match(bridgeMarkdown(plan),/Search Maryland state job openings: https:\/\/www\.jobapscloud\.com\/MD\//);
 assert.equal(bridgePlan(record,row,'release',new Date(expiredAt.getTime()-1)).actions[0].destination,undefined);
 assert.equal(bridgePlan({...record,sourceUrl:'https://example.org/MD/sup/bulpreview.asp?R1=26&R2=004518&R3=0015'},row,'release',expiredAt).actions[0].destination,undefined);
});

test('A practice check-in is omitted when the source ages out and recheck takes priority',()=>{
 const record={...mpt,verifiedAt:'2026-11-01T00:00:00Z'};
 const row=bridgeRow(record,'software');
 const boundary=Date.parse(record.verifiedAt)+48*3600*1000;
 const checkIn={action:'Prepare the proposed work sample',date:'2026-11-04'};
 assert.equal(bridgePlan(record,row,'release',new Date(boundary),checkIn).learnerCheckIn?.date,'2026-11-04');
 const stale=bridgePlan(record,row,'release',new Date(boundary+1),checkIn);
 assert.equal(stale.learnerCheckIn,undefined);
 assert.match(stale.actions[0].title,/Check the full current announcement/);
});
