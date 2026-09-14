(()=>{
const body=document.body;
const menuBtn=document.getElementById('menu-toggle');
const menu=document.getElementById('mobile-nav');
function closeMenu(){menu?.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false');body.classList.remove('menu-open')}
menuBtn?.addEventListener('click',()=>{const open=menuBtn.getAttribute('aria-expanded')==='true';menuBtn.setAttribute('aria-expanded',String(!open));menu?.classList.toggle('open',!open);body.classList.toggle('menu-open',!open)});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

if('IntersectionObserver' in window){
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.classList.contains('copper-draw'))io.unobserve(e.target)}}),{threshold:.14});
 document.querySelectorAll('.reveal,.copper-draw').forEach(el=>io.observe(el));
 const scenes=[...document.querySelectorAll('.scene')];
 if(scenes.length){const sio=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const n=e.target.dataset.scene;document.querySelectorAll('.scene-nav span').forEach((s,i)=>s.classList.toggle('active',String(i+1).padStart(2,'0')===n))}}),{threshold:.55});scenes.forEach(s=>sio.observe(s));}
}else{document.querySelectorAll('.reveal,.copper-draw').forEach(el=>el.classList.add('in'));}

const form=document.getElementById('brief-form');
if(form){form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const locale=form.dataset.locale||'en';const labels=locale==='ar'?{title:'MILLENNIUM — موجز مشروع',project:'المشروع',decision:'القرار المطلوب',remain:'ما الذي يجب أن يبقى',conf:'السرية'}:{title:'MILLENNIUM — Project Brief',project:'Project',decision:'Decision required',remain:'What must remain',conf:'Confidentiality'};const text=[labels.title,'',`${labels.project}: ${data.get('project')||''}`,'',`${labels.decision}: ${data.get('decision')||''}`,'',`${labels.remain}: ${data.get('remain')||''}`,'',`${labels.conf}: ${data.get('confidentiality')||''}`,'','Generated locally in the browser. No form submission occurred.'].join('\n');const blob=new Blob([text],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='MILLENNIUM-project-brief.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});}


const heroSequence=document.querySelector('[data-hero-sequence]');
if(heroSequence){
 const frames=[...heroSequence.querySelectorAll('.hero-seq-frame')];
 const controls=[...heroSequence.querySelectorAll('[data-hero-stage]')];
 const label=document.getElementById('hero-stage-label');
 const status=document.getElementById('hero-stage-status');
 const replay=document.getElementById('hero-replay');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const meta=[['01 / OUTLINE','MASTER RASTER / CONSTRUCTION'],['02 / BLUEPRINT','SOURCE LETTERS / FILLED'],['03 / MEASURED','SOURCE UNTOUCHED / MEASURED'],['04 / FINAL','WHITE MARK / NIGHT FIELD']];
 let active=0,timer=null,autoplay=true;
 const setStage=(n,{manual=false}={})=>{active=Math.max(0,Math.min(frames.length-1,n));frames.forEach((f,i)=>f.classList.toggle('is-active',i===active));controls.forEach((b,i)=>{b.classList.toggle('is-active',i===active);b.setAttribute('aria-pressed',String(i===active))});heroSequence.dataset.stage=String(active);if(label)label.textContent=meta[active][0];if(status)status.textContent=meta[active][1];if(manual)autoplay=false};
 const stop=()=>{if(timer){clearTimeout(timer);timer=null}};
 const run=()=>{stop();autoplay=true;setStage(reduced?frames.length-1:0);if(reduced)return;const next=()=>{if(!autoplay)return;if(active>=frames.length-1){stop();return}timer=setTimeout(()=>{setStage(active+1);next()},1500)};next()};
 controls.forEach((b,i)=>b.addEventListener('click',()=>{stop();setStage(i,{manual:true})}));
 replay?.addEventListener('click',run);
 heroSequence.addEventListener('pointermove',e=>{if(reduced||e.pointerType==='touch')return;const r=heroSequence.getBoundingClientRect();const x=((e.clientX-r.left)/r.width-.5)*6;const y=((e.clientY-r.top)/r.height-.5)*4;frames[active]?.style.setProperty('transform',`translate3d(${x}px,${y}px,0) scale(1.003)`)});
 heroSequence.addEventListener('pointerleave',()=>frames.forEach(f=>f.style.removeProperty('transform')));
 run();
}

const registryFilters=[...document.querySelectorAll('.registry-filter')];
const registryRows=[...document.querySelectorAll('.registry-row')];
if(registryFilters.length&&registryRows.length){registryFilters.forEach(btn=>btn.addEventListener('click',()=>{const f=btn.dataset.filter||'all';registryFilters.forEach(b=>b.classList.toggle('is-active',b===btn));registryRows.forEach(row=>{row.hidden=f!=='all' && !row.dataset.category.toLowerCase().includes(f.toLowerCase())})}))}

})();
