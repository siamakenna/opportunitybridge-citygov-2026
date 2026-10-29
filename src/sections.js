// Native disclosures retain the original nodes, IDs, values and event handlers.
export function revealSection(target){if(typeof target==='string')target=document.getElementById(target);if(!target)return;const own=document.getElementById('panel-'+target.id);if(own&&target.contains(own))own.open=true;for(let n=target;n;n=n.parentElement)if(n.tagName==='DETAILS')n.open=true;}
export function mountSections(){
 const workspace=document.getElementById('career-workspace'),library=document.getElementById('explore');library.after(workspace);workspace.classList.add('wrap');
 const sections=[['pulse','01 — Explore opportunities','Find jobs, fellowships and learning resources.'],['explore','02 — Understand the source','Check official requirements and deadlines.'],['career-workspace','03 — Build your evidence','Prepare a Passport and a human conversation.'],['career-work','04 — Explore career stories','Learn from documented public-service work.'],['elsewhere','05 — Find more pathways','Explore additional programs and directories.'],['method','06 — Inspect the evidence','Understand source checks, uncertainty and privacy.']];
 for(const [id,title,description] of sections){const root=document.getElementById(id),panel=document.createElement('details'),summary=document.createElement('summary'),heading=document.createElement('h2'),sub=document.createElement('span'),body=document.createElement('div');panel.id='panel-'+id;panel.className='section-disclosure';summary.id='summary-'+id;heading.textContent=title;sub.textContent=description;summary.append(heading,sub);body.className='section-body';
  const status=[];if(id==='pulse')for(const statusId of ['pulse-status','pulse-warning']){const n=document.getElementById(statusId);if(n)status.push(n);}
  if(id==='explore'){const n=root.querySelector('.source-notice');if(n)status.push(n);}
  for(const n of status)n.remove();for(const child of [...root.childNodes])body.append(child);
  // Original headings stay inside the content, including the dynamic selected-source title.
  panel.append(summary,body);root.append(...status,panel);root.setAttribute('aria-labelledby',summary.id);
  panel.addEventListener('toggle',()=>{if(!panel.open&&body.contains(document.activeElement))summary.focus({preventScroll:true});});
 }
 const navigate=()=>{let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}if(!id)return;const target=document.getElementById(id);if(target){revealSection(target);target.scrollIntoView({block:'start',behavior:'auto'});}};
 document.addEventListener('click',event=>{const a=event.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute('href').slice(1);const target=document.getElementById(id);if(target)revealSection(target);});
 window.addEventListener('hashchange',navigate);window.addEventListener('popstate',navigate);navigate();
 // A dynamic Advisor/Passport target may be created after the initial hash is read.
 return {reveal:revealSection,followHash:navigate};
}
