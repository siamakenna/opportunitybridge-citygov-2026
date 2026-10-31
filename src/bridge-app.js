import {bridgeSkills,bridgePlan,bridgeRow,bridgeMarkdown} from './bridge-core.js';
import {revealSection} from './sections.js';
const el=(tag,text='',cls='')=>{const x=document.createElement(tag);x.textContent=text;x.className=cls;return x;};
export function mountBridge({catalog,revision,onSelect,onDraft,onQuest,onPassport,onCapture}){
 const $=id=>document.getElementById(id),root=$('career-bridge');let record=null,row={};
 const select=$('bridge-opportunity'),skill=$('bridge-skill'),experience=$('bridge-experience');
 for(const r of catalog)select.append(new Option(r.title+(r.deadline&&Date.parse(r.deadline)<=Date.now()?' · historical':''),r.id));
 for(const [id,label]of Object.entries(bridgeSkills))skill.append(new Option(label,id));
 const emit=()=>{if(!record)return;row=bridgeRow(record,skill.value,experience.value);onDraft(record.id,row);render();};
 select.addEventListener('change',()=>onSelect(select.value));skill.addEventListener('change',emit);experience.addEventListener('input',()=>{if(record){row={...row,experience:experience.value};onDraft(record.id,row);}});
 function render(){
  const output=$('bridge-preview');output.replaceChildren();if(!record){$('bridge-result').textContent='Choose an opportunity or load the fictional HTML example. No account or quest is required.';return;}
  const p=bridgePlan(record,row,revision);$('bridge-result').textContent='Fictional preparation · '+p.source.status+' · full applicant eligibility unknown.';
  const dl=el('dl','', 'bridge-map');for(const [k,v]of [['What I have learned',p.learner.skill+' · '+p.learner.experience],['What the employer asks for',p.connection.duty],['How they connect',p.connection.kind+'. '+p.connection.reason],['What I can demonstrate',p.proposedEvidence+' · Proposed, not completed.'],['What is still unknown',p.unknowns.join('; ')]])dl.append(el('dt',k),el('dd',v));
  const source=el('a','Inspect the official employer announcement ↗');source.href=p.source.url;source.target='_blank';source.rel='noopener noreferrer';
  output.append(dl,source,el('p',`Original review: ${p.source.reviewedAt} · ${p.source.warning}`,'source-notice'));
  const h=el('h3','Three next actions');h.id='bridge-plan-title';h.tabIndex=-1;const list=el('ol','', 'bridge-actions');for(const a of p.actions){const li=el('li');li.append(el('strong',a.title),el('p',a.why),el('p','Prepare: '+a.expectedArtifactOrDecision),el('p','Still unresolved: '+a.unresolvedCondition),el('small',a.status));list.append(li);}output.append(h,list,el('p',p.humanVerification));
  $('bridge-quest').disabled=!p.connection.questId;$('bridge-quest').textContent=p.connection.kind.startsWith('Directly')?'Try the linked fictional accessibility exercise':'Try transferable practice · separate source';
 }
 function saveFile(format){if(!record)return;const p=bridgePlan(record,row,revision),text=format==='json'?JSON.stringify(p,null,2):bridgeMarkdown(p),blob=new Blob([text],{type:format==='json'?'application/json':'text/markdown;charset=utf-8'}),url=URL.createObjectURL(blob),a=el('a');a.href=url;a.download='OpportunityBridge-Career-Bridge-'+record.id+'.'+(format==='json'?'json':'md');document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);$('bridge-result').textContent='Career Bridge Plan download generated locally. It has not been sent to an advisor or employer.';}
 $('bridge-demo').addEventListener('click',()=>{onSelect('mpt-media');record=catalog.find(r=>r.id==='mpt-media');row=bridgeRow(record,'software','Fictional learner: introductory HTML coursework and a classroom web page; interested in accessible educational resources. Enrollment, work authorization and weekly availability are unverified.');onDraft(record.id,row);sync(record,row);$('bridge-plan-title').focus();});
 $('bridge-generate').addEventListener('click',()=>{if(record){row={...row,experience:experience.value};onDraft(record.id,row);render();$('bridge-plan-title')?.focus();}});
 $('bridge-download-md').addEventListener('click',()=>saveFile('md'));$('bridge-download-json').addEventListener('click',()=>saveFile('json'));
 $('bridge-quest').addEventListener('click',()=>{if(record){const p=bridgePlan(record,row,revision);if(p.connection.questId)onQuest(p.connection.questId);}});
 $('bridge-passport').addEventListener('click',()=>{if(record)onPassport(record.id);});$('bridge-capture').addEventListener('click',()=>{if(record){onCapture();$('bridge-result').textContent='Capture requested. See Save, Export & Restore for the actual save/validation result; device saving stays opt-in.';revealSection('journey-title');location.hash='journey-title';}});
 $('bridge-reset').addEventListener('click',()=>{if(record){row={};onDraft(record.id,row);sync(record,row);$('bridge-skill').focus();}});
 function sync(r,rows){record=r||null;row=rows||{};select.value=r?.id||'';skill.value=Object.hasOwn(bridgeSkills,row.skill)?row.skill:'';experience.value=row.experience||'';for(const id of ['bridge-generate','bridge-download-md','bridge-download-json','bridge-passport','bridge-capture','bridge-reset'])$(id).disabled=!record;render();}
 document.addEventListener('opportunitybridge:reset',()=>sync(null,{}));render();
 return {sync};
}
