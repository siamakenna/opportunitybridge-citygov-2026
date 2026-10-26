/** OpportunityBridge transparent matching engine, v0.2. No AI inference or external requests. */
export const STATES = Object.freeze({yes:'Supported by declared information',no:'Potential conflict — confirm with organizer',unknown:'Unknown — ask organizer'});
export const sampleProfiles = Object.freeze([
  {id:'maya',name:'Maya · recent graduate',descriptor:'Early-career researcher with coding experience',skills:['data','research','science','writing'],facts:{enrolled:'no',graduated:'yes',data:'yes',writing:'yes',outreach:'unknown',local:'unknown'}},
  {id:'jordan',name:'Jordan · current undergraduate',descriptor:'Student with organizing and communication experience',skills:['community','writing','mentoring'],facts:{enrolled:'yes',graduated:'no',data:'unknown',writing:'yes',outreach:'yes',local:'yes'}},
  {id:'alex',name:'Alex · career changer',descriptor:'Adult learner shifting from education to public service',skills:['mentoring','community','writing'],facts:{enrolled:'no',graduated:'yes',data:'no',writing:'yes',outreach:'yes',local:'unknown'}}
]);
export const sampleOpportunities = Object.freeze([
 {id:'civic-data',title:'Civic Data Analyst Fellowship',category:'Civic technology',sector:'City innovation office',description:'Analyze municipal service datasets and communicate actionable findings to program managers.', duration:'Illustrative 12-week cohort',skills:['data','research','writing'],criteria:[
   {key:'graduated',required:true,label:'Completed a degree or certificate',excerpt:'Applicants have completed a qualifying postsecondary credential.'},
   {key:'data',required:false,label:'Experience working with data',excerpt:'Spreadsheet, statistics or programming experience is helpful but not mandatory.'},
   {key:'writing',required:false,label:'Ability to communicate findings',excerpt:'Candidates should be comfortable preparing short written summaries.'} ]},
 {id:'public-health',title:'Community Health Research Associate',category:'Public health',sector:'City health department',description:'Support public-health data-quality reviews, community feedback and accessible research summaries.',duration:'Illustrative 10-week project',skills:['science','research','data','community'],criteria:[
   {key:'graduated',required:false,label:'Completed degree or relevant training',excerpt:'A completed program or equivalent experience is preferred.'},
   {key:'data',required:false,label:'Data-quality experience',excerpt:'Ability to organize research data is desirable.'},
   {key:'outreach',required:true,label:'Community-facing experience',excerpt:'The associate must engage respectfully with community partners.'} ]},
 {id:'engagement',title:'Neighborhood Engagement Project Fellow',category:'Community services',sector:'City community affairs office',description:'Support resident listening sessions, summarize needs and prepare public-friendly resource materials.',duration:'Illustrative 8-week pilot',skills:['community','writing','mentoring'],criteria:[
   {key:'writing',required:true,label:'Written communication',excerpt:'Applicants must be able to prepare clear, accessible summaries.'},
   {key:'outreach',required:false,label:'Facilitation or outreach',excerpt:'Experience facilitating group discussions is preferred.'},
   {key:'local',required:false,label:'Local availability',excerpt:'Some sessions may require in-person attendance in the pilot city.'} ]},
 {id:'climate',title:'Urban Resilience Student Internship',category:'Sustainability',sector:'City resilience and planning office',description:'Map neighborhood resilience needs and present findings to a city planning team.',duration:'Illustrative 10-week internship',skills:['data','science','community'],criteria:[
   {key:'enrolled',required:true,label:'Currently enrolled',excerpt:'Applicants must be currently enrolled in an education program.'},
   {key:'local',required:true,label:'Able to attend local meetings',excerpt:'Selected interns participate in at least two onsite sessions.'},
   {key:'data',required:false,label:'Basic data or mapping skills',excerpt:'Data or mapping skills are beneficial but can be developed during the internship.'} ]}
]);
export const proofExamples = Object.freeze([
 {skill:'data',translation:'Data literacy and quality assurance',example:'Describe a dataset cleaned, checked or summarized, including a concrete result.'},
 {skill:'research',translation:'Evidence synthesis and documentation',example:'Show how a documented research question became a reproducible finding.'},
 {skill:'science',translation:'Public-health and evaluation thinking',example:'Explain how you distinguish a well-supported conclusion from missing evidence.'},
 {skill:'writing',translation:'Public-facing communication',example:'Turn a technical description into a one-paragraph summary for a resident.'},
 {skill:'community',translation:'Resident engagement and service design',example:'Document a listening activity, what was learned and whose views were missing.'},
 {skill:'mentoring',translation:'Guidance and stakeholder collaboration',example:'Give an example of helping someone navigate unfamiliar requirements.'}
]);
export function evaluateCriterion(criterion,facts){const value=facts[criterion.key]??'unknown';if(!['yes','no','unknown'].includes(value))throw Error('Unknown fact state');return { ...criterion, value, state:value==='yes'?'supported':value==='no'?'conflict':'unknown',explanation:STATES[value],source_type:'fictional_sample',source_note:'Illustrative brief, NOT a live vacancy or employer-authored rule'};}
export function evaluateOpportunity(opportunity,facts){const checks=opportunity.criteria.map(c=>evaluateCriterion(c,facts));const count=s=>checks.filter(x=>x.state===s).length;const conflicts=checks.filter(x=>x.required&&x.state==='conflict').length;const unknowns=checks.filter(x=>x.required&&x.state==='unknown').length;const state=conflicts?'Potential requirement conflict':unknowns?'Required facts unknown':'No declared required conflicts';return {...opportunity,checks,counts:{supported:count('supported'),unknown:count('unknown'),conflict:count('conflict')},state,rankingWeight:conflicts*20+unknowns*6+count('unknown')*2+count('conflict')};}
export function evaluateAll(facts,opportunities=sampleOpportunities){return opportunities.map(o=>evaluateOpportunity(o,facts)).sort((a,b)=>a.rankingWeight-b.rankingWeight || a.title.localeCompare(b.title));}
export function matchedProofs(skills){return proofExamples.filter(p=>skills.includes(p.skill));}
export function createPlan(profile,assessment){if(!profile||!assessment)throw Error('A profile and role assessment are required');const gaps=assessment.checks.filter(c=>c.state!=='supported');const related=matchedProofs(profile.skills).filter(p=>assessment.skills.includes(p.skill));const lines=[`# OpportunityBridge — Career Bridge Plan`,``,`**Prototype only · ${new Date().toISOString().slice(0,10)}**`,``,`Persona: ${profile.name} (fictional demonstration)`,`Sample pathway: ${assessment.title} (${assessment.sector})`,`Source status: FICTIONAL opportunity brief. This is not an advertised job, confirmed eligibility, or a placement offer.`,``,`## Declared-information review`, `Interpretation: ${assessment.state}. Verification by an actual opportunity organizer is always required.`,``,...assessment.checks.map(c=>`- **${c.label}** — ${c.explanation}. Sample evidence: “${c.excerpt}” [Fictional example]`),``,`## Translate existing experience`,...(related.length?related.map(p=>`- **${p.translation}:** ${p.example}`):['- Identify one relevant project, skill or volunteer example.']),``,`## Questions to verify with a real organizer`,...(gaps.length?gaps.map(c=>`- Does “${c.label}” apply to my situation? The sample description says: “${c.excerpt}”`):['- Where can I find the actual application, deadline, interview requirements and relevant accommodations?']),``,`## Suggested two-week action plan`,`- Days 1–2: Find an official open opportunity from a city/county employer, public career center or university career office.`,`- Days 3–4: Verify eligibility, deadlines, compensation, location and supporting documents with that source.`,`- Days 5–7: Prepare one short work sample translating existing skills into the target role.`,`- Days 8–10: Request a career-services review and ask for a warm introduction only with consent.`,`- Days 11–14: Apply through the official employer system if eligible; log follow-up and outcome.`,``,`## Privacy and limitations`,`All sample profiles and opportunities are fictional. Declarations and notes stay in the tab. Hosting providers receive ordinary request logs; official links open external sites. The downloadable file is generated locally; manage and delete your copy yourself. No recommendation is an application, introduction, qualification determination or hiring prediction.`];return lines.join('\n');}


/** Use the current declarations for editable skills; never retain a contradicted default. */
export function currentProfile(profile, facts) {
  const skills = new Set(profile.skills);
  for (const [key, skill] of Object.entries({data:'data', writing:'writing', outreach:'community'})) {
    skills.delete(skill);
    if (facts[key] === 'yes') skills.add(skill);
  }
  return {...profile, facts:{...facts}, skills:[...skills]};
}
export const bridges = Object.freeze({
  graduated:{experience:'A completed course of study or certificate',skill:'Documenting learning',artifact:'A credential checklist with award date and official verification route.',question:'Does this credential meet the actual employer’s definition?'},
  enrolled:{experience:'Current coursework or a capstone project',skill:'Applied learning',artifact:'A course project summary; verify enrollment separately with the institution.',question:'Which programs and enrollment dates does the employer accept?'},
  data:{experience:'A spreadsheet, research dataset or class analysis',skill:'Data quality and interpretation',artifact:'An anonymized before/after table, validation steps and a 150-word finding.',question:'What tools and level of data experience does the actual role require?'},
  writing:{experience:'A class report, newsletter or event guide',skill:'Clear public communication',artifact:'A one-page resident guide with plain language, headings and source links.',question:'Would this writing sample demonstrate the communication expected?'},
  outreach:{experience:'Mentoring, volunteering or organizing a campus event',skill:'Listening and resident engagement',artifact:'An anonymized listening-session plan, feedback themes and missing perspectives.',question:'What counts as community-facing experience for this role?'},
  local:{experience:'Scheduling and travel planning for a group project',skill:'Practical coordination',artifact:'A proposed availability and travel plan; disclose no home address.',question:'What location, schedule and accommodation options apply?'}
});
export function createHandoff(profile, assessment, notes = {}) {
  const clean = value => String(value ?? '').slice(0,800).replace(/[<>]/g,'').replace(/\r/g,'');
  const lines = [createPlan(profile,assessment),'','## Career-advisor handoff','Prepared locally. Learner declarations and draft examples are unverified. Share only by choice.','',
    '### Current learner declarations', ...Object.entries(profile.facts).map(([key,value])=>`- ${key}: ${value}`),'',
    '### Evidence portfolio worksheet'];
  for (const c of assessment.checks) {
    const b = bridges[c.key];
    lines.push('',`#### ${c.label} (${c.required?'required':'preferred / contextual'})`,
      `Experience prompt: ${b.experience}`,`Transferable skill: ${b.skill}`,
      `Exact fictional requirement: “${c.excerpt}”`, `Current declaration: ${c.value}`,
      `Suggested artifact (not completed proof): ${b.artifact}`,
      `Learner draft (unverified): ${clean(notes[c.key]) || 'Not entered'}`,
      `Ask a human: ${b.question}`);
  }
  lines.push('','### Official search starting points',
    '- Maryland: https://www.jobapscloud.com/MD/',
    '- District of Columbia: https://careers.dc.gov/',
    '- Philadelphia: https://www.phila.gov/jobs/',
    'These are search resources, not matches or endorsements. Check the full current posting.',
    '', '### Advisor review checklist',
    '- Open the actual posting; verify deadline, employer and all mandatory criteria.',
    '- Review the evidence sample without treating a related skill as a qualification.',
    '- Resolve unknown facts with the learner; record substitutions and accommodations.',
    '- Agree one next step and a review date within 14 days.',
    '- Ask permission before sharing; remove identifiers and delete unneeded copies.');
  return lines.join('\n');
}
