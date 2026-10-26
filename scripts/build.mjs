import {mkdir,copyFile,cp,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const f of ['index.html','judge.html','LICENSE'])await copyFile(f,'dist/'+f);
for(const d of ['src','docs','evidence'])await cp(d,'dist/'+d,{recursive:true});
console.log('Static distribution ready in dist/ (no dependencies).');
