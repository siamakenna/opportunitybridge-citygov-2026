export const evaluationSequences=Object.freeze([
 [{task:'admin',condition:'manual'},{task:'fiscal',condition:'assisted'}],
 [{task:'admin',condition:'assisted'},{task:'fiscal',condition:'manual'}],
 [{task:'fiscal',condition:'manual'},{task:'admin',condition:'assisted'}],
 [{task:'fiscal',condition:'assisted'},{task:'admin',condition:'manual'}]
]);
export const evaluationTasks=Object.freeze({
 admin:{recordId:'md-admin',title:'Administrative coursework route',facts:'Fictional adult: high-school credential declared; zero administrative months, 30 accredited college credits; military substitution not used. Other employer conditions unknown.',question:'Locate the official source and application route. Identify the mandatory experience condition and any published college-credit alternative. Explain what the declarations support and what they do not establish. Propose a work sample, one advisor question and a next step.'},
 fiscal:{recordId:'md-vendor',title:'Financial coursework route',facts:'Fictional adult: high-school credential declared; 12 qualifying financial-transaction months, six accredited accounting credits; vocational/military alternatives not used. Other employer conditions unknown.',question:'Locate the official source and application route. Identify the mandatory experience condition and the limited accounting-credit alternative. Distinguish a preferred skill. Explain missing conditions; propose a work sample, one advisor question and a next step.'}
});
export function assignedTasks(sequence){const n=Number(sequence);if(!Number.isInteger(n)||n<0||n>3)throw Error('Choose sequence 1-4');return evaluationSequences[n].map(item=>({...item,...evaluationTasks[item.task]}));}
export function measuredSeconds(start,end){return Number.isFinite(start)&&Number.isFinite(end)&&end>=start?Math.round((end-start)/100)/10:null;}
export function evaluationExport(session){return JSON.stringify({...session,independentParticipantsVerifiedByProject:0,recordType:'Local self-declared evaluation record, not verified participant evidence',limitations:'No independent result or causal advantage is established by this file. Task elapsed time includes reading, external browsing and interruptions; outside interactions require observer counting.'},null,2);}
