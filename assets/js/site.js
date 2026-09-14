(()=>{
const body=document.body;
const menuBtn=document.getElementById('menu-toggle');
const menu=document.getElementById('mobile-nav');
let menuReturnFocus=null;
const menuFocusable=()=>menu?[...menu.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')]:[];
function openMenu(){if(!menu||!menuBtn)return;menuReturnFocus=document.activeElement;menu.classList.add('open');menu.removeAttribute('aria-hidden');menuBtn.setAttribute('aria-expanded','true');body.classList.add('menu-open');requestAnimationFrame(()=>menuFocusable()[0]?.focus())}
function closeMenu({restore=true}={}){if(!menu||!menuBtn)return;menu.classList.remove('open');menu.setAttribute('aria-hidden','true');menuBtn.setAttribute('aria-expanded','false');body.classList.remove('menu-open');if(restore&&menuReturnFocus instanceof HTMLElement)menuReturnFocus.focus()}
menuBtn?.addEventListener('click',()=>menuBtn.getAttribute('aria-expanded')==='true'?closeMenu():openMenu());
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu({restore:false})));
addEventListener('keydown',e=>{if(menuBtn?.getAttribute('aria-expanded')!=='true')return;if(e.key==='Escape'){e.preventDefault();closeMenu();return}if(e.key==='Tab'){const f=menuFocusable();if(!f.length){e.preventDefault();return}const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});

if('IntersectionObserver' in window){
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.classList.contains('copper-draw'))io.unobserve(e.target)}}),{threshold:.14});
 document.querySelectorAll('.reveal,.copper-draw').forEach(el=>io.observe(el));
 const scenes=[...document.querySelectorAll('.scene')];
 if(scenes.length){const sio=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const n=e.target.dataset.scene;document.querySelectorAll('.scene-nav span').forEach((s,i)=>s.classList.toggle('active',String(i+1).padStart(2,'0')===n))}}),{threshold:.55});scenes.forEach(s=>sio.observe(s));}
}else{document.querySelectorAll('.reveal,.copper-draw').forEach(el=>el.classList.add('in'));}

const form=document.getElementById('brief-form');
if(form){
 const locale=form.dataset.locale||'en';
 const status=document.getElementById('message-status');
 const sendBtn=document.getElementById('message-send');
 const saveBtn=document.getElementById('message-save');
 const fileInput=document.getElementById('sender-attachment');
 const started=document.getElementById('form-started-at');
 const success=document.getElementById('send-success');
 const maxFileBytes=2*1024*1024;
 const messages=locale==='ar'?{
  sending:'جارٍ الإرسال…',sent:'تم الإرسال.',missing:'أكمل الحقول المطلوبة.',file:'المرفق أكبر من 2 MB.',network:'تعذر الإرسال الآن. استخدم الاتصال أو واتساب، أو حاول مرة أخرى.',config:'بوابة الإرسال غير مهيأة بعد.',saved:'تم حفظ نسخة محلية.'
 }:{
  sending:'Sending…',sent:'Sent.',missing:'Complete the required fields.',file:'The attachment is larger than 2 MB.',network:'Unable to send right now. Use Call or WhatsApp, or try again.',config:'The message gateway is not configured yet.',saved:'Local copy saved.'
 };
 if(started)started.value=String(Date.now());
 const setStatus=(text,type='')=>{if(status){status.textContent=text;status.dataset.state=type}};
 const fileAsPayload=file=>new Promise((resolve,reject)=>{if(!file){resolve(null);return}if(file.size>maxFileBytes){reject(new Error('file_too_large'));return}const r=new FileReader();r.onload=()=>{const value=String(r.result||'');const comma=value.indexOf(',');resolve({name:file.name,type:file.type||'application/octet-stream',size:file.size,data:comma>=0?value.slice(comma+1):''})};r.onerror=()=>reject(new Error('file_read'));r.readAsDataURL(file)});
 const makeLocalCopy=()=>{if(!form.reportValidity()){setStatus(messages.missing,'error');return}const d=new FormData(form);const text=[locale==='ar'?'MILLENNIUM — نسخة رسالة محلية':'MILLENNIUM — Local message copy','',`${locale==='ar'?'الاسم':'Name'}: ${d.get('name')||''}`,`${locale==='ar'?'البريد':'Email'}: ${d.get('email')||''}`,'',`${locale==='ar'?'الرسالة':'Message'}:` ,String(d.get('message')||''),'',`${locale==='ar'?'المرفق':'Attachment'}: ${fileInput?.files?.[0]?.name||'—'}`].join('\n');const blob=new Blob([text],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='MILLENNIUM-message-copy.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);setStatus(messages.saved,'ok')};
 saveBtn?.addEventListener('click',makeLocalCopy);
 fileInput?.addEventListener('change',()=>{const f=fileInput.files?.[0];if(f&&f.size>maxFileBytes){fileInput.value='';setStatus(messages.file,'error')}});
 form.addEventListener('submit',async e=>{
  e.preventDefault();
  if(!form.reportValidity()){setStatus(messages.missing,'error');return}
  const endpoint=String(window.MILLENNIUM_CONTACT_ENDPOINT||'');
  if(!endpoint||endpoint.includes('__CONTACT_ENDPOINT__')){setStatus(messages.config,'error');return}
  const data=new FormData(form);
  const file=fileInput?.files?.[0]||null;
  if(file&&file.size>maxFileBytes){setStatus(messages.file,'error');return}
  sendBtn?.setAttribute('disabled','');form.setAttribute('aria-busy','true');setStatus(messages.sending,'sending');
  try{
   const attachment=await fileAsPayload(file);
   const payload={name:String(data.get('name')||'').trim(),email:String(data.get('email')||'').trim(),message:String(data.get('message')||'').trim(),companyWebsite:String(data.get('companyWebsite')||''),startedAt:Number(data.get('startedAt')||0),locale,sourceUrl:location.href,attachment};
   const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),credentials:'omit',referrerPolicy:'strict-origin-when-cross-origin'});
   const result=await response.json().catch(()=>({}));
   if(!response.ok||!result.ok)throw new Error(result.error||`http_${response.status}`);
   setStatus(messages.sent,'ok');form.reset();
   if(success){success.setAttribute('aria-hidden','false');success.classList.add('is-visible');document.body.classList.add('message-confirmed')}
   setTimeout(()=>{location.assign(locale==='ar'?'../':'../../en/')},1800);
  }catch(err){console.warn('Message send failed:',err?.message||err);setStatus(err?.message==='file_too_large'?messages.file:messages.network,'error');sendBtn?.removeAttribute('disabled');form.removeAttribute('aria-busy')}
 });
}


const heroSequence=document.querySelector('[data-hero-sequence]');
if(heroSequence){
 const frames=[...heroSequence.querySelectorAll('.hero-seq-frame')];
 const controls=[...heroSequence.querySelectorAll('[data-hero-stage]')];
 const label=document.getElementById('hero-stage-label');
 const status=document.getElementById('hero-stage-status');
 const replay=document.getElementById('hero-replay');
 const canvas=heroSequence.querySelector('.hero-seq-canvas');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const meta=[['01 / OUTLINE','MASTER RASTER / CONSTRUCTION'],['02 / BLUEPRINT','SOURCE LETTERS / FILLED'],['03 / MEASURED','SOURCE UNTOUCHED / MEASURED'],['04 / FINAL','WHITE MARK / NIGHT FIELD']];
 let active=0,timer=null,autoplay=true;
 const setStage=(n,{manual=false}={})=>{active=Math.max(0,Math.min(frames.length-1,n));frames.forEach((f,i)=>f.classList.toggle('is-active',i===active));controls.forEach((b,i)=>{b.classList.toggle('is-active',i===active);b.setAttribute('aria-pressed',String(i===active))});heroSequence.dataset.stage=String(active);if(label)label.textContent=meta[active][0];if(status)status.textContent=meta[active][1];if(manual)autoplay=false};
 const stop=()=>{if(timer){clearTimeout(timer);timer=null}};
 const run=()=>{stop();autoplay=true;setStage(reduced?frames.length-1:0);if(reduced)return;const next=()=>{if(!autoplay||active>=frames.length-1){stop();return}timer=setTimeout(()=>{setStage(active+1);next()},1500)};next()};
 controls.forEach((b,i)=>b.addEventListener('click',()=>{stop();setStage(i,{manual:true})}));
 replay?.addEventListener('click',run);
 heroSequence.addEventListener('pointermove',e=>{if(reduced||e.pointerType==='touch'||!canvas)return;const r=heroSequence.getBoundingClientRect();const x=((e.clientX-r.left)/r.width-.5)*4;const y=((e.clientY-r.top)/r.height-.5)*3;canvas.style.transform=`translate3d(${x}px,${y}px,0)`});
 heroSequence.addEventListener('pointerleave',()=>canvas?.style.removeProperty('transform'));
 run();
}
})();
