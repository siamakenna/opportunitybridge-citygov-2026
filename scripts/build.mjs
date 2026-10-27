import {mkdir,copyFile,cp,rm,writeFile,readFile,readdir} from 'node:fs/promises';
import {join} from 'node:path';
const revision=process.env.GITHUB_SHA||'local';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const f of ['index.html','practice.html','judge.html','walkthrough.html','evaluation.html','pilot.html','LICENSE'])await copyFile(f,'dist/'+f);
for(const d of ['src','docs','evidence','media','output'])await cp(d,'dist/'+d,{recursive:true});
// A release's entry modules, transitive imports and styles must share one cache identity.
async function versionAssets(directory){for(const item of await readdir(directory,{withFileTypes:true})){const path=join(directory,item.name);if(item.isDirectory()){if(item.name==='src')await versionAssets(path);}else if(/\.(html|js)$/.test(item.name)){const text=await readFile(path,'utf8');const versioned=text.replace(/(['"])(\.{1,2}\/[^'"\s?]+\.(?:js|css|svg))\1/g,(_,quote,url)=>`${quote}${url}?rev=${revision}${quote}`);await writeFile(path,versioned);}}}
await versionAssets('dist');
await writeFile('dist/source.json',JSON.stringify({revision,version:'0.6.0',assetPolicy:'entry modules, relative imports and styles use the release revision'},null,2)+'\n');
console.log('Static distribution ready in dist/; assets versioned to '+revision);
