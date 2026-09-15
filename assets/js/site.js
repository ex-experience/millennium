(()=>{
const body=document.body;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const menu=document.getElementById('mobile-nav'),btn=document.getElementById('menu-toggle');let returnFocus=null;
const focusable=()=>menu?[...menu.querySelectorAll('a[href],button:not([disabled])')]:[];
function open(){if(!menu||!btn)return;returnFocus=document.activeElement;menu.classList.add('open');menu.removeAttribute('aria-hidden');btn.setAttribute('aria-expanded','true');focusable()[0]?.focus()}
function close(restore=true){if(!menu||!btn)return;menu.classList.remove('open');menu.setAttribute('aria-hidden','true');btn.setAttribute('aria-expanded','false');if(restore&&returnFocus instanceof HTMLElement)returnFocus.focus()}
btn?.addEventListener('click',()=>btn.getAttribute('aria-expanded')==='true'?close():open());menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>close(false)));
addEventListener('keydown',e=>{if(btn?.getAttribute('aria-expanded')!=='true')return;if(e.key==='Escape'){e.preventDefault();close();return}if(e.key==='Tab'){const f=focusable();if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
if('IntersectionObserver' in window&&!reduced){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
if(fine&&!reduced){const dot=document.createElement('div');dot.className='cursor-dot';dot.setAttribute('aria-hidden','true');const read=document.createElement('div');read.className='cursor-readout';read.setAttribute('aria-hidden','true');read.textContent='X 0000 / Y 0000';document.body.append(dot,read);body.classList.add('cursor-enabled');addEventListener('pointermove',e=>{dot.style.transform=`translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;read.textContent=`X ${String(Math.round(e.clientX)).padStart(4,'0')} / Y ${String(Math.round(e.clientY)).padStart(4,'0')}`},{passive:true})}
if(!reduced){document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.target==='_blank'||a.hasAttribute('download')||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;const u=new URL(a.href,location.href);if(u.origin!==location.origin||u.hash&&u.pathname===location.pathname)return;e.preventDefault();body.classList.add('blackout');setTimeout(()=>location.href=u.href,78)})}
const form=document.getElementById('brief-form');if(form){const locale=form.dataset.locale||'en',status=document.getElementById('message-status'),send=document.getElementById('message-send'),save=document.getElementById('message-save'),file=document.getElementById('sender-attachment'),started=document.getElementById('form-started-at'),success=document.getElementById('send-success');const max=2*1024*1024;const m=locale==='ar'?{sending:'جارٍ الإرسال…',sent:'تم الإرسال.',missing:'أكمل الحقول المطلوبة.',file:'المرفق أكبر من 2 MB.',network:'تعذر الإرسال الآن. استخدم الاتصال أو واتساب، أو حاول مرة أخرى.',config:'بوابة الإرسال غير مهيأة.',saved:'تم حفظ نسخة محلية.'}:{sending:'Transmitting…',sent:'Transmitted.',missing:'Complete the required fields.',file:'Attachment exceeds 2 MB.',network:'Transmission failed. Use Call or WhatsApp, or retry.',config:'Message gateway is not configured.',saved:'Local copy extracted.'};if(started)started.value=String(Date.now());const set=(t,s='')=>{if(status){status.textContent=t;status.dataset.state=s}};const filePayload=f=>new Promise((resolve,reject)=>{if(!f){resolve(null);return}if(f.size>max){reject(new Error('file_too_large'));return}const r=new FileReader();r.onload=()=>{const v=String(r.result||''),i=v.indexOf(',');resolve({name:f.name,type:f.type||'application/octet-stream',size:f.size,data:i>=0?v.slice(i+1):''})};r.onerror=()=>reject(new Error('file_read'));r.readAsDataURL(f)});const compose=()=>{const d=new FormData(form),purpose=String(d.get('purpose')||''),role=String(d.get('role')||''),msg=String(d.get('message')||'').trim();return `[PURPOSE] ${purpose||'—'}\n[ROLE] ${role||'—'}\n\n${msg}`};save?.addEventListener('click',()=>{if(!form.reportValidity()){set(m.missing,'error');return}const d=new FormData(form),txt=[locale==='ar'?'MILLENNIUM — نسخة محلية':'MILLENNIUM — Local Extract','',`Name: ${d.get('name')||''}`,`Email: ${d.get('email')||''}`,`Purpose: ${d.get('purpose')||''}`,`Role: ${d.get('role')||''}`,'',String(d.get('message')||'')].join('\n');const b=new Blob([txt],{type:'text/plain;charset=utf-8'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download='MILLENNIUM-initiate.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),500);set(m.saved,'ok')});form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity()){set(m.missing,'error');return}const endpoint=String(window.MILLENNIUM_CONTACT_ENDPOINT||'');if(!endpoint){set(m.config,'error');return}const d=new FormData(form),f=file?.files?.[0]||null;if(f&&f.size>max){set(m.file,'error');return}send?.setAttribute('disabled','');form.setAttribute('aria-busy','true');set(m.sending,'sending');try{const attachment=await filePayload(f);const payload={name:String(d.get('name')||'').trim(),email:String(d.get('email')||'').trim(),message:compose(),companyWebsite:String(d.get('companyWebsite')||''),startedAt:Number(d.get('startedAt')||0),locale,sourceUrl:location.href,attachment};const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),credentials:'omit',referrerPolicy:'strict-origin-when-cross-origin'});const j=await r.json().catch(()=>({}));if(!r.ok||!j.ok)throw new Error(j.error||`http_${r.status}`);set(m.sent,'ok');form.reset();success?.classList.add('is-visible');success?.setAttribute('aria-hidden','false');setTimeout(()=>location.assign(locale==='ar'?'../':'../../en/'),1500)}catch(err){set(err?.message==='file_too_large'?m.file:m.network,'error');send?.removeAttribute('disabled');form.removeAttribute('aria-busy')}})}
})();
/* MILLENNIUM V4.1 HERO AUTOPLAY START */
;(()=>{
  const video=document.querySelector('.hero-video');
  if(!video)return;
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  video.muted=true;
  video.defaultMuted=true;
  video.setAttribute('muted','');
  video.playsInline=true;
  if(reduce){try{video.pause()}catch(_){};return}
  const play=()=>{
    try{
      const p=video.play();
      if(p&&typeof p.catch==='function')p.catch(()=>{});
    }catch(_){}
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',play,{once:true});
  else play();
  window.addEventListener('pageshow',play);
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')play()});
  window.addEventListener('touchstart',play,{once:true,passive:true});
  window.addEventListener('pointerdown',play,{once:true,passive:true});
})();
/* MILLENNIUM V4.1 HERO AUTOPLAY END */

/* MILLENNIUM V5.1.0 — language route switch */
;(()=>{
  document.querySelectorAll('[data-lang-switch]').forEach(a=>{
    a.addEventListener('click',()=>{
      const base=a.dataset.base||a.getAttribute('href')||'/millennium/';
      a.setAttribute('href',base+(location.hash||''));
    });
  });
})();

/* MILLENNIUM V5.2.0 — cinematic loading film */
;(()=>{
  const shell=document.getElementById('brand-loader'),video=document.getElementById('brand-loader-video'),bar=document.getElementById('brand-loader-bar'),pct=document.getElementById('brand-loader-progress');
  if(!shell||!video){document.body.classList.remove('intro-pending');return}
  let done=false;
  const finish=()=>{if(done)return;done=true;if(bar)bar.style.width='100%';if(pct)pct.textContent='100%';shell.classList.add('is-exiting');document.body.classList.remove('intro-pending');setTimeout(()=>shell.remove(),850)};
  const update=()=>{const d=Number(video.duration)||0,t=Number(video.currentTime)||0,p=d?Math.max(0,Math.min(100,(t/d)*100)):0;if(bar)bar.style.width=`${p}%`;if(pct)pct.textContent=`${Math.floor(p)}%`};
  video.muted=true;video.defaultMuted=true;video.playsInline=true;video.setAttribute('muted','');video.setAttribute('playsinline','');
  video.addEventListener('timeupdate',update,{passive:true});video.addEventListener('ended',finish,{once:true});video.addEventListener('error',finish,{once:true});
  const play=()=>{if(done)return;try{const p=video.play();if(p&&typeof p.catch==='function')p.catch(()=>{})}catch(_){}};
  video.addEventListener('canplay',play,{once:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',play,{once:true});else play();
  addEventListener('pageshow',play,{once:true});addEventListener('touchstart',play,{once:true,passive:true});addEventListener('pointerdown',play,{once:true,passive:true});
  setTimeout(()=>{if(!done&&video.readyState===0)finish()},5000);setTimeout(finish,22000);
})();

/* MILLENNIUM V5.3.0 — adaptive loader sync */
;(()=>{
 const fg=document.getElementById('brand-loader-video'),bg=document.getElementById('brand-loader-video-bg');
 if(!fg||!bg)return;
 const mq=matchMedia('(min-width:900px) and (min-aspect-ratio:4/3)');
 let loaded=false;
 const ensure=()=>{if(!mq.matches){try{bg.pause()}catch(_){ }return}if(!loaded){const src=bg.dataset.src;if(src){bg.src=src;bg.load();loaded=true}}sync()};
 const sync=()=>{if(!mq.matches||!loaded)return;try{if(Math.abs((bg.currentTime||0)-(fg.currentTime||0))>.16)bg.currentTime=fg.currentTime||0;bg.playbackRate=fg.playbackRate||1;const pr=bg.play();if(pr&&typeof pr.catch==='function')pr.catch(()=>{})}catch(_){}};
 bg.muted=true;bg.defaultMuted=true;bg.playsInline=true;
 fg.addEventListener('play',ensure);fg.addEventListener('seeked',sync);fg.addEventListener('ratechange',sync);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!fg.paused)ensure()});
 mq.addEventListener?.('change',ensure);ensure();
})();
