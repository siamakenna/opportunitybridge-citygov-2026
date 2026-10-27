import {createHash} from 'node:crypto';
import {mkdir,copyFile,cp,rm,writeFile,readFile,readdir} from 'node:fs/promises';
import {join} from 'node:path';
const revision=process.env.GITHUB_SHA||'local';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const f of ['index.html','practice.html','judge.html','walkthrough.html','evaluation.html','pilot.html','LICENSE'])await copyFile(f,'dist/'+f);
for(const d of ['src','docs','evidence','media','output','data'])await cp(d,'dist/'+d,{recursive:true});
// A release's entry modules, transitive imports and styles must share one cache identity.
async function versionAssets(directory){for(const item of await readdir(directory,{withFileTypes:true})){const path=join(directory,item.name);if(item.isDirectory()){if(item.name==='src')await versionAssets(path);}else if(/\.(html|js)$/.test(item.name)){const text=await readFile(path,'utf8');const versioned=text.replace(/(['"])(\.{1,2}\/[^'"\s?]+\.(?:js|css|svg))\1/g,(_,quote,url)=>`${quote}${url}?rev=${revision}${quote}`);await writeFile(path,versioned);}}}
await versionAssets('dist');
await writeFile('dist/source.json',JSON.stringify({revision,version:'0.8.0',assetPolicy:'entry modules, relative imports and styles use the release revision'},null,2)+'\n');
console.log('Static distribution ready in dist/; assets versioned to '+revision);

await writeFile('dist/src/release.js',`export const releaseRevision=${JSON.stringify(revision)};\n`);
const pulse=JSON.parse(await readFile('data/pulse.json','utf8'));const report=JSON.parse(await readFile('evidence/source-review-report.json','utf8'));pulse.sourceCatalogRevision=revision;pulse.sourceObservationAt=report.generatedAt;pulse.sourceObservations=report.rows.map(({id,state,fetchedAt,verifiedAt,sourceUrl})=>({id,state,fetchedAt,verifiedAt,sourceUrl}));await writeFile('dist/data/pulse.json',JSON.stringify(pulse,null,2)+'\n');

const pulseBytes=await readFile('dist/data/pulse.json');const source=JSON.parse(await readFile('dist/source.json','utf8'));source.discovery={lastSuccessAt:pulse.lastSuccessAt||null,lastAttemptAt:pulse.lastAttemptAt||null,status:pulse.fetchStatus,sha256:createHash('sha256').update(pulseBytes).digest('hex'),records:pulse.records.length};source.sourceObservationAt=report.generatedAt;await writeFile('dist/source.json',JSON.stringify(source,null,2)+'\n');

// Public reproducibility harness uses the same release modules with an explicitly frozen discovery snapshot.
await mkdir('dist/tests',{recursive:true});for(const f of ['v08-trial.html','v08-trial.js']){try{await copyFile('tests/'+f,'dist/tests/'+f);}catch(e){if(e.code!=='ENOENT')throw e;}}

await versionAssets('dist/tests');

const releaseSource=JSON.parse(await readFile('dist/source.json','utf8'));releaseSource.quest={version:'0.8.1',frozenDiscoverySha256:createHash('sha256').update(await readFile('data/trial-v08.json')).digest('hex')};await writeFile('dist/source.json',JSON.stringify(releaseSource,null,2)+'\n');
