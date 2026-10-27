import {readFile,writeFile} from 'node:fs/promises';import {pilotBase,pilotModel,pilotScenarios} from '../src/pilot-model.js';
const folder='output/evidence-v09/',input=process.argv[2]?JSON.parse(await readFile(process.argv[2],'utf8')):pilotBase,results=Object.fromEntries(Object.entries(pilotScenarios).map(([name,patch])=>[name,pilotModel({...input,...patch})]));
await writeFile(folder+'PILOT_COST_MODEL.json',JSON.stringify({editableAssumptions:input,scenarios:results},null,2)+'\n');
await writeFile(folder+'PILOT_COST_MODEL.csv','assumption,value,unit\n'+Object.entries(input).map(([k,v])=>`${k},${v},planning assumption`).join('\n')+'\n');
await writeFile(folder+'PILOT_SCENARIOS.csv','scenario,staff_hours,economic_cost,cash_cost,source_review_hours,backlog,modeled_plans,cost_per_modeled_plan,stop\n'+Object.entries(results).map(([name,r])=>[name,r.staffHours,r.economicCost,r.cashCost,r.doubleReviewHours,r.reviewBacklog,r.modeledPlans,r.costPerModeledPlan,r.stop].join(',')).join('\n')+'\n');
console.log(Object.fromEntries(Object.entries(results).map(([k,r])=>[k,{hours:r.staffHours,economic:r.economicCost,cash:r.cashCost,backlog:r.reviewBacklog,stop:r.stop}])));
