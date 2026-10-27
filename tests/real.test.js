import test from 'node:test';import assert from 'node:assert/strict';
import {catalog as liveCatalog} from '../src/catalog.js';
// Engine unit fixtures freeze verification time independently of live curation dates.
const catalog=liveCatalog.map(r=>({...r,verifiedAt:'2026-10-26T18:03:34Z'}));import {outcomes} from '../src/outcomes.js';
import {lifecycle,filterCatalog,reviewRecord,reviewRequirement,careerExport,discoveryLinks,catalogIssues} from '../src/real-core.js';
const now=new Date('2026-10-26T20:00:00Z'),admin=catalog.find(x=>x.id==='md-admin'),vendor=catalog.find(x=>x.id==='md-vendor');
const criterion=(r,id,facts,date=now)=>reviewRecord(r,facts,date).find(c=>c.id===id);
test('twelve distinct official records have required provenance fields',()=>{assert.equal(catalog.length,12);assert.deepEqual(catalogIssues(catalog),[]);});
test('default catalog removes closed intake and preserves it in history',()=>{assert.equal(filterCatalog(catalog,{},now).length,11);assert.deepEqual(filterCatalog(catalog,{view:'expired'},now).map(r=>r.id),['cif-winter']);});
test('explicit deadline overrides stale open wording',()=>assert.equal(lifecycle(catalog.find(r=>r.id==='cif-winter'),now).state,'expired'));
test('expiry begins at exact deadline',()=>{assert.equal(lifecycle(admin,new Date(admin.deadline)).state,'expired');assert.equal(lifecycle(admin,new Date(Date.parse(admin.deadline)-1)).state,'stale');});
test('48-hour-old source becomes previously observed',()=>assert.equal(lifecycle(admin,new Date('2026-10-29T20:00:00Z')).label,'Previously observed — recheck'));
test('missing or future verification timestamp is never fresh',()=>{assert.equal(lifecycle({...admin,verifiedAt:''},now).state,'unverified');assert.equal(lifecycle({...admin,verifiedAt:'2027-01-01T00:00:00Z'},now).state,'stale');});
test('program cannot masquerade as a verified individual vacancy',()=>assert.match(lifecycle(catalog.find(r=>r.id==='federal-grad'),now).label,/no individual vacancy verified/));
test('missing declarations remain insufficient information',()=>assert.ok(reviewRecord(admin,{},now).every(x=>x.value==='unknown')));
test('30 accredited credits supports selected admin experience route',()=>assert.equal(criterion(admin,'experience',{collegeCredits:30},now).value,'yes'));
test('29 credits and unknown experience never supports admin route',()=>assert.equal(criterion(admin,'experience',{collegeCredits:29},now).value,'unknown'));
test('six administrative months supports selected experience route',()=>assert.equal(criterion(admin,'experience',{adminMonths:6},now).value,'yes'));
test('known shortfall stays possible conflict rather than rejection',()=>{const x=criterion(admin,'experience',{adminMonths:0,collegeCredits:0,military:'no'});assert.equal(x.value,'no');assert.match(x.statusLabel,/Possible conflict/);});
test('six accounting credits alone do not replace two years',()=>assert.equal(criterion(vendor,'experience',{accountingCredits:6,financeMonths:0,vocational:'no',military:'no'}).value,'no'));
test('six accounting credits and twelve financial months support limited route',()=>assert.equal(criterion(vendor,'experience',{accountingCredits:6,financeMonths:12}).value,'yes'));
test('vocational and military equivalence are not silently inferred',()=>assert.equal(criterion(vendor,'experience',{accountingCredits:6,financeMonths:0,vocational:'yes',military:'unknown'}).value,'unknown'));
test('preferred Office skill never establishes mandatory finance condition',()=>{const x=reviewRecord(vendor,{office:'yes'},now);assert.equal(x.find(c=>c.id==='office').required,false);assert.equal(x.find(c=>c.id==='experience').value,'unknown');});
test('sensitive and ambiguous conditions always require human verification',()=>assert.equal(criterion(admin,'authorization',{hs:'yes',collegeCredits:30}).value,'unknown'));
test('incomplete excerpts without context are not executable rules',()=>assert.equal(reviewRequirement(admin,{id:'x',rule:'office',required:true},{office:'yes'},now).value,'unknown'));
test('stale or closed sources suppress positive requirement interpretation',()=>{for(const when of ['2026-10-30','2026-11-04'])assert.equal(criterion(admin,'experience',{collegeCredits:30},new Date(when)).value,'unknown');});
test('in-person requirement can conflict without rejecting person',()=>assert.equal(criterion(catalog.find(r=>r.id==='nih-sip'),'inperson',{local:'no'}).value,'no'));
test('invalid numeric declarations are not coerced to experience',()=>{for(const val of ['bad',-1,Infinity])assert.equal(criterion(admin,'experience',{adminMonths:val}).value,'unknown');});
test('combined filters, deadline windows and empty results are deterministic',()=>{assert.equal(filterCatalog(catalog,{sector:'Finance',stage:'student'},now).length,1);assert.equal(filterCatalog(catalog,{deadline:'soon'},now).length,2);assert.equal(filterCatalog(catalog,{query:'no such employer'},now).length,0);});
test('shortlist filters use stable IDs even when titles coincide',()=>{const records=[admin,{...admin,id:'another'}];assert.deepEqual(filterCatalog(records,{view:'shortlist',shortlist:['another']},now).map(r=>r.id),['another']);});
test('discovery links encode user-independent queries and declare external limits',()=>{const d=discoveryLinks({title:'test & <script>',region:'DC'});assert.ok(d.every(x=>x.url.startsWith('https://')));assert.ok(d[0].url.includes('%26'));assert.match(d[2].note,/institutional/);});
test('actual-record exports retain source, facts, unknown conditions and bounded draft',()=>{const text=careerExport(admin,{collegeCredits:30},{experience:'<script>'+ 'x'.repeat(1000)},now);for(const value of [admin.sourceUrl,admin.applicationUrl,'collegeCredits: 30','Insufficient information','14-day plan','not a qualification decision'])assert.ok(text.includes(value));assert.ok(!text.includes('<script>'));assert.ok(!text.includes('x'.repeat(801)));});
test('historical gallery separates reports, accounts, offers and contractor employment',()=>{assert.equal(outcomes.length,5);assert.match(outcomes.find(x=>x.id==='badri').career,/offer/);assert.match(outcomes.find(x=>x.id==='mallick').career,/contracting company/);assert.match(outcomes.find(x=>x.id==='mahadeshwar').sourceType,/institutional/);assert.ok(outcomes.every(o=>o.suggestion.startsWith('OpportunityBridge recommendation:')));});

test('requirement title remains distinct from interpretation status',()=>{const x=criterion(admin,'experience',{});assert.equal(x.label,'Administrative experience or a published substitution');assert.equal(x.statusLabel,'Insufficient information');});

test('multiple accounting-credit substitutions stay unknown rather than inventing a cap or stacking rule',()=>assert.equal(criterion(vendor,'experience',{accountingCredits:12,financeMonths:0,vocational:'no',military:'no'}).value,'unknown'));
