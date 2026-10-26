import {mkdir,copyFile,cp,rm,writeFile} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const f of ['index.html','practice.html','judge.html','walkthrough.html','LICENSE'])await copyFile(f,'dist/'+f);
for(const d of ['src','docs','evidence','media'])await cp(d,'dist/'+d,{recursive:true});
console.log('Static distribution ready in dist/ (no dependencies).');

await writeFile('dist/source.json',JSON.stringify({revision:process.env.GITHUB_SHA||'local',version:'0.4.0'},null,2)+'\n');
