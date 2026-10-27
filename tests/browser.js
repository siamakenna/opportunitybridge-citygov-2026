// Test-only harness: serve the repository, open /tests/browser.html.
// Uses the actual HTTP-loaded application and captures its generated download Blob.
const frame=document.querySelector('iframe'),output=document.querySelector('#results');
let passed=0;const lines=[];
function check(value,label){if(!value)throw Error(label);passed++;lines.push('PASS '+label);output.textContent=lines.join('\n');}
try{
 await new Promise(resolve=>{if(frame.contentDocument?.readyState==='complete'&&frame.contentDocument.querySelector('script[type="module"]'))resolve();else frame.addEventListener('load',resolve,{once:true});});
 const w=frame.contentWindow,d=frame.contentDocument;
 check(d.querySelectorAll('.role').length===4,'Actual modules initialize four roles');
 check(d.querySelector('#download').disabled,'No-selection export disabled');
 d.querySelector('.select-role').click();
 check(d.activeElement.id==='plan-title','Role selection focuses plan heading');
 for(const [key,value] of [['graduated','no'],['data','unknown']]){const select=d.querySelector('#fact-'+key);select.value=value;select.dispatchEvent(new w.Event('change',{bubbles:true}));}
 check(d.querySelector('#requirement-data').textContent.includes('Unknown'),'Edited unknown fact reaches requirement display');
 check(!d.querySelector('.proofs').textContent.includes('Data literacy'),'Contradicted skill no longer offered as supported');
 const input=d.querySelector('#proof-data');input.value='Fictional regression artifact';input.dispatchEvent(new w.Event('input',{bubbles:true}));
 let captured;const original=w.URL.createObjectURL;w.URL.createObjectURL=blob=>{captured=blob;return original.call(w.URL,blob);};
 d.addEventListener('click',e=>{if(e.target.tagName==='A'&&e.target.download)e.preventDefault();});
 d.querySelector('#download').click();let text=await captured.text();
 check(text.includes('Completed a degree or certificate** — Potential conflict'),'Downloaded plan uses edited credential');
 check(text.includes('Experience working with data** — Unknown'),'Downloaded plan uses edited unknown');
 d.querySelector('#handoff').click();text=await captured.text();
 check(text.includes('Fictional regression artifact'),'Handoff includes current draft');
 check(text.includes('data: unknown'),'Handoff includes current declarations');
 d.querySelector('#plain-language').click();check(d.querySelector('#proof-data').value==='Fictional regression artifact','Simpler explanation preserves draft');
 d.querySelectorAll('.profile-choice')[1].click();
 check(d.querySelector('#download').disabled,'Persona switch clears selection');
 d.querySelector('[data-filter="Civic technology"]').click();check(d.querySelectorAll('.role').length===1,'Technology filter returns one sample');
 d.querySelector('#reset').click();
 check(d.querySelectorAll('.role').length===4,'Reset restores all roles');
 d.querySelector('.select-role').click();check(d.querySelector('#proof-data').value==='','Reset clears sample draft');
 check(d.querySelector('#plain-language').getAttribute('aria-pressed')==='false','Reset clears simpler-explanation state');
 output.textContent=passed+' assertions passed\n'+lines.join('\n');document.title='PASS · OpportunityBridge browser regression';
}catch(error){output.textContent='FAIL '+error.message+'\n'+lines.join('\n');document.title='FAIL · OpportunityBridge browser regression';}
