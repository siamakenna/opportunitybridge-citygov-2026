import {bridgeSkills,bridgePlan,bridgeRow,bridgeMarkdown,bridgeDocument} from './bridge-core.js';
import {revealSection} from './sections.js';
const el=(tag,text='',cls='')=>{const x=document.createElement(tag);x.textContent=text;x.className=cls;return x;};
export function mountBridge({catalog,revision,onSelect,onDraft,onQuest,onPassport,onCapture}){
 const $=id=>document.getElementById(id),root=$('career-bridge');let record=null,row={};
 const checkIns=new Map();
 const currentPlan=()=>bridgePlan(record,row,revision,new Date(),checkIns.get(record.id));
 const select=$('bridge-opportunity'),skill=$('bridge-skill'),experience=$('bridge-experience');
 for(const r of catalog)select.append(new Option(r.title+(r.deadline&&Date.parse(r.deadline)<=Date.now()?' · historical':''),r.id));
 for(const [id,label]of Object.entries(bridgeSkills))skill.append(new Option(label,id));
 const emit=()=>{if(!record)return;row=bridgeRow(record,skill.value,experience.value);onDraft(record.id,row);render();};
 select.addEventListener('change',()=>onSelect(select.value));skill.addEventListener('change',emit);experience.addEventListener('input',()=>{if(record){row={...row,experience:experience.value};onDraft(record.id,row);
  const {learner}=bridgePlan(record,row,revision);
  $('bridge-learner-summary').textContent=learner.skill+' · '+learner.experience;
 }});
 function render(){
  const output=$('bridge-preview');output.replaceChildren();$('bridge-tools').hidden=!record;if(!record){$('bridge-result').textContent='Choose an opportunity or load the fictional HTML example. No account or quest is required.';return;}
  const p=currentPlan();$('bridge-result').textContent='Fictional preparation · '+p.source.status+' · full applicant eligibility unknown.';
  const dl=el('dl','', 'bridge-map');for(const [k,v]of [['Learner supplied · fictional',p.learner.skill+' · '+p.learner.experience],['Employer source says · reviewed summary',p.connection.duty],['App explains the connection',p.connection.kind+'. '+p.connection.reason],['App suggests · proposed work',p.proposedEvidence+' · Proposed, not completed.'],['Still unknown · human verification',p.unknowns.join('; ')]]){
   const value=el('dd',v);
   if(!dl.children.length)value.id='bridge-learner-summary';
   dl.append(el('dt',k),value);
  }
  const sourceLabel=p.actions[0].destination?'Inspect the historical employer announcement':'Inspect the official employer announcement';
  const source=el('a',sourceLabel+' ↗');source.href=p.source.url;source.target='_blank';source.rel='noopener noreferrer';source.setAttribute('aria-label',sourceLabel+' (opens a new tab)');
  output.append(dl,source,el('p',`Original review: ${p.source.reviewedAt} · ${p.source.warning}`,'source-notice'));
  const h=el('h3','Three next actions');h.id='bridge-plan-title';h.tabIndex=-1;
  const list=el('ol','','bridge-actions');
  for(const action of p.actions){
   const card=el('li');
   const details=el('details');
   details.append(el('summary',action.title),el('p',action.why));
   if(action.documents?.length){
    const documents=el('ul');
    for(const document of action.documents)documents.append(el('li',document));
    details.append(documents);
   }else{
    details.append(el('p','Prepare: '+action.expectedArtifactOrDecision));
   }
   details.append(el('p','Still unresolved: '+action.unresolvedCondition),el('small',action.status));
   card.append(details);
   if(action.destination){
    const link=el('a',action.destination.label+' ↗');
    link.href=action.destination.url;
    link.target='_blank';
    link.rel='noopener noreferrer';
    link.setAttribute('aria-label',action.destination.label+' (opens a new tab)');
    const destination=el('p');
    destination.append(link);
    card.append(destination);
   }
   list.append(card);
  }
  const question=el('p',p.humanQuestion);question.id='bridge-advisor-question';question.tabIndex=-1;
  const checkIn=el('details','','bridge-more');
  const date=el('input');
  const opportunityId=record.id;
  date.type='date';
  date.value=p.learnerCheckIn?.date||'';
  date.addEventListener('input',()=>{
   if(date.value)checkIns.set(opportunityId,{action:p.actions[0].title,date:date.value});
   else checkIns.delete(opportunityId);
  });
  const label=el('label','My check-in date (optional) ');
  label.append(date);
  checkIn.append(el('summary','Set a check-in for my first action'),
   el('p','My next step: '+p.actions[0].title+'. This date stays in this session and is included when I print or download the plan.'),label);
  output.append(h,list,checkIn,el('h3','Advisor question'),question,el('p',p.humanVerification));
  const quest=$('bridge-quest');
  quest.hidden=!p.connection.questId;
  quest.textContent=p.connection.kind.startsWith('Directly')?'Try the linked fictional accessibility exercise':'Try transferable practice · separate source';
 }
 function saveFile(format){if(!record)return;const p=currentPlan(),text=format==='json'?JSON.stringify(p,null,2):bridgeMarkdown(p),blob=new Blob([text],{type:format==='json'?'application/json':'text/markdown;charset=utf-8'}),url=URL.createObjectURL(blob),a=el('a');a.href=url;a.download='OpportunityBridge-Career-Bridge-'+record.id+'.'+(format==='json'?'json':'md');document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);$('bridge-result').textContent='Career Bridge Plan download generated locally. It has not been sent to an advisor or employer.';}
 $('bridge-demo').addEventListener('click',()=>{onSelect('mpt-media');record=catalog.find(r=>r.id==='mpt-media');row=bridgeRow(record,'software','Fictional learner: introductory HTML coursework and a classroom web page; interested in accessible educational resources. Enrollment, work authorization and weekly availability are unverified.');onDraft(record.id,row);sync(record,row);$('bridge-plan-title').focus();});
 $('start-bridge-example')?.addEventListener('click',()=>{$('bridge-demo').click();$('bridge-title').tabIndex=-1;$('bridge-title').focus({preventScroll:true});root.scrollIntoView({block:'start',behavior:'auto'});});
 $('bridge-data-demo')?.addEventListener('click',()=>{onSelect('md-vendor');record=catalog.find(r=>r.id==='md-vendor');row=bridgeRow(record,'data','Fictional adult learner: an introductory spreadsheet class and a classroom table checked for duplicates and missing fields. Financial-work experience, accredited accounting credits, authorization and screening are unverified.');onDraft(record.id,row);sync(record,row);$('bridge-plan-title').focus();});
 $('bridge-print').addEventListener('click',()=>{
  if(!record)return;
  const plan=currentPlan();
  const printable=el('section','','print-only bridge-print');
  printable.id='printable-career';
  printable.append(el('h1',plan.title));
  for(const {title,paragraphs=[],items=[],ordered} of bridgeDocument(plan)){
   if(title)printable.append(el('h2',title));
   for(const paragraph of paragraphs)printable.append(el('p',paragraph));
   if(items.length){
    const list=el(ordered?'ol':'ul');
    for(const item of items)list.append(el('li',item));
    printable.append(list);
   }
  }
  $('printable-career')?.remove();
  document.body.append(printable);
  window.addEventListener('afterprint',()=>printable.remove(),{once:true});
  $('bridge-result').textContent='Choose Save as PDF in the print dialog to keep a copy.';
  window.print();
 });
 $('bridge-copy-question').addEventListener('click',async()=>{
  const question=$('bridge-advisor-question');
  if(!question)return;
  try{
   await navigator.clipboard.writeText(question.textContent);
   $('bridge-result').textContent='Advisor question copied.';
  }catch{
   if(!question.isConnected)return;
   const selection=window.getSelection();
   if(selection){
    question.focus();
    selection.selectAllChildren(question);
   }
   $('bridge-result').textContent='Clipboard unavailable. Copy the advisor question manually.';
  }
 });
 $('bridge-download-md').addEventListener('click',()=>saveFile('md'));$('bridge-download-json').addEventListener('click',()=>saveFile('json'));
 $('bridge-quest').addEventListener('click',()=>{if(record){const p=bridgePlan(record,row,revision);if(p.connection.questId)onQuest(p.connection.questId);}});
 $('bridge-passport').addEventListener('click',()=>{if(record)onPassport(record.id);});$('bridge-capture').addEventListener('click',()=>{if(record){onCapture();$('bridge-result').textContent='Capture requested. See Save, Export & Restore for the actual save/validation result; device saving stays opt-in.';revealSection('journey-title');location.hash='journey-title';}});
 $('bridge-reset').addEventListener('click',()=>{if(record){checkIns.delete(record.id);row={};onDraft(record.id,row);sync(record,row);$('bridge-skill').focus();}});
 function sync(r,rows){record=r||null;row=rows||{};select.value=r?.id||'';skill.value=Object.hasOwn(bridgeSkills,row.skill)?row.skill:'';experience.value=row.experience||'';render();}
 document.addEventListener('opportunitybridge:reset',()=>{checkIns.clear();sync(null,{});});render();
 return {sync};
}
