/** Exact snapshot comparison is a review-change guard, not a cryptographic trust claim. */
export function mappingSnapshot(record){return JSON.stringify({id:record.id,sourceUrl:record.sourceUrl,recruitment:record.recruitment||null,requirements:record.requirements,preferred:record.preferred,substitutions:record.substitutions,restrictions:record.restrictions,qualificationSummary:record.qualificationSummary||null});}
export function mappingApproved(record){return !!record.mappingReview?.snapshot&&record.mappingReview.snapshot===mappingSnapshot(record)&&!!record.mappingReview.sourceHash;}
export function maintenanceState(record,observation,baseline,now=new Date()){
 if(record.deadline&&Date.parse(record.deadline)<=now.getTime())return 'expired';
 if(!observation?.retrieved)return 'unavailable';
 if(observation.withdrawn)return 'withdrawn';
 if(record.recruitment&&!observation.identityConfirmed)return 'identity_missing';
 if(!baseline)return 'unreviewed';
 return observation.semanticHash===baseline.semanticHash?'unchanged':'changed_review_required';
}
export function capacityAt(records,when){return records.filter(r=>['posting','intake'].includes(r.kind)&&(!r.deadline||Date.parse(r.deadline)>Date.parse(when))).map(r=>r.id);}
