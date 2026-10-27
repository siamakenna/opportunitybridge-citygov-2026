/** Exact snapshot comparison is a review-change guard, not a cryptographic trust claim. */
export function mappingSnapshot(record){return JSON.stringify({id:record.id,sourceUrl:record.sourceUrl,recruitment:record.recruitment||null,requirements:record.requirements,preferred:record.preferred,substitutions:record.substitutions,restrictions:record.restrictions,qualificationSummary:record.qualificationSummary||null});}
export function mappingApproved(record){return !!record.mappingReview?.snapshot&&record.mappingReview.snapshot===mappingSnapshot(record)&&!!record.mappingReview.sourceHash;}
export function maintenanceState(record,observation,baseline,now=new Date()){
 if(record.deadline&&Date.parse(record.deadline)<=now.getTime())return 'expired';
 if(!observation?.retrieved)return 'unavailable';
 if(observation.withdrawn)return 'withdrawn';
 if(record.recruitment&&!observation.identityConfirmed)return 'identity_missing';
 if(observation.excerptChecks?.some(x=>!x.found))return 'excerpt_mismatch';
 if(!baseline)return 'unreviewed';
 if(baseline.rawHash&&observation.rawHash!==baseline.rawHash)return 'changed_review_required';
 return observation.semanticHash===baseline.semanticHash?'unchanged':'changed_review_required';
}
export function capacityAt(records,when){return records.filter(r=>['posting','intake'].includes(r.kind)&&(!r.deadline||Date.parse(r.deadline)>Date.parse(when))).map(r=>r.id);}

export function reviewPriority(record,state,now=new Date()){
 if(['withdrawn','identity_missing','changed_review_required','excerpt_mismatch'].includes(state))return 0;
 const remaining=record.deadline?Date.parse(record.deadline)-now.getTime():Infinity;
 if(state==='expired'||remaining<=72*3600000)return 1;
 if(state==='unavailable'||state==='unreviewed'||!Number.isFinite(Date.parse(record.verifiedAt))||now.getTime()-Date.parse(record.verifiedAt)>48*3600000)return 2;
 return 3;
}
