import {classify as legacy,normalizeText} from './taxonomy-v092.js';
import {mappingApproved} from './source-review.js';
import {classificationEvidence} from './classification-evidence.js';
const participantStaff=t=>/\b(internship|fellowship)\b/.test(t)&&/\b(coordinator|manager|director|administrator)\b/.test(t);
const primary=types=>types.includes('course')?'course':types.includes('fellowship')?'fellowship':types.some(x=>x.includes('internship'))?'internship':types.some(x=>['job','full-time','part-time'].includes(x))?'job':types.find(x=>['apprenticeship','research','micro','service','scholarship','competition','resource'].includes(x))||'unknown';
const arrangement=text=>{const s=normalizeText(text);return /\bfull time\b/.test(s)?(/\bcontractual\b/.test(s)?'full-time contractual':'full-time'):/\bpart time\b/.test(s)?'part-time':/\btemporary\b/.test(s)?'temporary':/\bcontractual\b/.test(s)?'contractual':'unknown';};
function fromDescription(text){
 const s=normalizeText(text),found=[];
 // First remove explicit negative clauses; do not let “not employment” negate a course.
 const clean=s.replace(/\bnot (?:an? )?(?:internship|fellowship)(?: participant opening)?\b/g,'');
 if(/\b(?:staff (?:job|position)|full time (?:licensed )?(?:[a-z]+ )?job|part time position)\b/.test(clean))found.push('job');
 if(/\b(?:paid|unpaid) internship\b|\bfellowship participant opening\b/.test(clean))found.push(/\binternship\b/.test(clean)?'internship':'fellowship');
 if(/\b(?:free course|training course)\b/.test(clean))found.push('course');
 if(/\bcareer directory\b/.test(clean))found.push('directory');
 if(/\bshort paid project\b/.test(clean))found.push('micro');
 if(/\bapprenticeship\b/.test(clean))found.push('apprenticeship');
 if(/\bvolunteer service\b/.test(clean))found.push('service');
 if(/\bscholarship\b/.test(clean))found.push('scholarship');
 if(/\bcompetition\b/.test(clean))found.push('competition');
 return [...new Set(found)];
}
function canonical(url){try{const u=new URL(url);u.searchParams.delete('b');u.searchParams.sort();return u.href;}catch{return null;}}
export function classifyEvidence(r,{now=new Date(),synthetic=false}={}){
 const title=normalizeText(r.title),url=r.sourceUrl||r.originalSourceUrl||null;
 let result={primary:'unknown',employmentArrangement:'unknown',careerStage:'unknown',applicantEligibility:null,evidenceLevel:5,basis:'unknown',sourceUrl:url,sourceDate:null,explanation:'Missing a reviewed type, provenanced publisher field or explicit source description. A title alone does not establish employment arrangement or eligibility.',unknowns:['Applicant eligibility','Full qualifications','Career stage','Employment duration'],requiresFullSourceReview:true,conflicts:[],synthetic:false};
 const assign=(p,level,basis,reason,date=null,arr='unknown')=>Object.assign(result,{primary:p,evidenceLevel:level,basis,explanation:reason,sourceDate:date,employmentArrangement:arr});
 const historical=mappingApproved(r)&&r.verification==='official';
 if(historical){const cs=legacy(r);assign(primary(cs.map(c=>c.type)),1,'source-reviewed','Individually reviewed official mapping; the original review date and all freshness/observation holds still apply.',r.mappingReview.reviewedAt,arrangement(r.type||'')!=='unknown'?arrangement(r.type):cs.some(c=>c.type==='part-time')?'part-time':cs.some(c=>c.type==='full-time')?'full-time':'unknown');}
 else if(r.classifications?.length&&r.classifications.every(c=>c.sourceUrl===url&&Number.isFinite(Date.parse(c.reviewedAt)))&&r.provider){assign(primary(r.classifications.map(c=>c.type)),1,'source-reviewed','Curated provider resource metadata. No employment or qualification approval.',r.reviewedAt||r.verifiedAt);}
 else {
  const e=classificationEvidence.find(e=>e.id===r.id&&canonical(e.sourceUrl)===canonical(url)&&title.startsWith(normalizeText(e.title)));
  if(e){
   const described=fromDescription(e.description||''),metadata=arrangement(e.employmentType||''),types=legacy({...r,classifications:null}).map(c=>c.type),candidate=primary(types);
   if(described.length>1){result.conflicts=described;assign('unknown',3,'official-description','Conflicting provenanced source descriptions; full review is required.',e.capturedAt);}
   else if(e.employmentType){assign(described[0]|| (candidate==='unknown'?'job':candidate),2,'publisher-metadata','Official Employment Type field inspected for this exact recruitment. This describes the schedule, not student suitability, duration or qualification approval.',e.capturedAt,metadata);}
   else if(described.length===1)assign(described[0],3,'official-description','Explicit descriptive language in the source-bound, inspected official snapshot; no applicant qualification approval.',e.capturedAt,arrangement(e.description));
  }
  else if(synthetic&&r.verification==='synthetic'){
   result.synthetic=true;const types=fromDescription(r.summary||'');
   if(types.length>1){result.conflicts=types;assign('unknown',3,'synthetic-description','Conflicting explicit scenario descriptions; abstain until the source resolves the type.');}
   else if(types.length===1)assign(types[0],3,'synthetic-description','Explicit developer-authored scenario description; not an employer fact or independent source interpretation.',r.observedAt||null,arrangement(r.summary));
  }
  if(result.primary==='unknown'&&!result.conflicts.length){
   if(r.recordKind==='directory'||r.kind==='program')assign('directory',4,'inferred-candidate','This record identifies an outbound directory, not an individual opening.',r.observedAt||null);
   else if(!participantStaff(title)&&!(result.synthetic&&/\bnot (?:an? )?(?:internship|fellowship)\b/.test(normalizeText(r.summary)))){
    const cs=legacy({...r,classifications:null,requirements:null}),p=primary(cs.map(c=>c.type));
    if(p!=='unknown')assign(p,4,'inferred-candidate','Bounded publisher-title candidate only. Full source review is required; no verified employment arrangement or applicant eligibility follows.',r.observedAt||null);
   }else result.explanation='Program-administration title without a provenanced staff description. Do not infer a participant internship or fellowship.';
  }
 }
 const t=Date.parse(result.sourceDate),held=r.sourceReviewPending||!Number.isFinite(t)||t>+now||+now-t>48*3600000||!!(r.deadline&&Date.parse(r.deadline)<=+now);
 result.requiresFullSourceReview=held||result.evidenceLevel>1;
 result.sourceStatus=held?'Recheck / historical or missing review':'Recorded type review within48hours; availability not guaranteed';
 if(result.employmentArrangement==='unknown')result.unknowns.push('Employment arrangement');
 return result;
}
