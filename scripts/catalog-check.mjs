import {catalog} from '../src/catalog.js';import {outcomes} from '../src/outcomes.js';import {catalogIssues,lifecycle} from '../src/real-core.js';
const issues=catalogIssues(catalog);for(const o of outcomes)for(const k of ['sourceUrl','sourceType','observedAt','career','unknown','suggestion'])if(!o[k])issues.push(o.id+': missing '+k);
for(const r of catalog)console.log(`${r.id}: ${lifecycle(r).label}; checked ${r.verifiedAt}`);
if(issues.length){console.error(issues);process.exitCode=1;}else console.log('Source schema/provenance checks passed. This command does not refresh official pages.');
