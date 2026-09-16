/* MILLENNIUM V6.0.0 — resolution-independent vector blueprint loader */
;(()=>{
  const shell=document.getElementById('brand-loader');
  if(!shell){document.body.classList.remove('intro-pending');return}
  const DURATION=15033;
  const QA_TIME=location.hostname==='127.0.0.1'?Math.max(0,Math.min(DURATION,Number(new URLSearchParams(location.search).get('loaderTime')||0))):0;
  const LOGO={w:1475,h:300,bx:31,by:117,bw:1412,bh:158};
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const f=n=>Number(n.toFixed(2));
  let startAt=0,raf=0,done=false,lastShape='',resizeTimer=0;

  function buildScene(W,H){
    const landscape=W/H>=1.18;
    const S=landscape?clamp(Math.min(W/1458,H/510),.82,6):clamp(Math.min(W/390,H/844),.82,6);
    const cx=W/2,cy=H*.51;
    const markW=landscape?Math.min(W*.58,H*1.80):Math.min(W*.78,H*.48);
    const markH=markW/(LOGO.bw/LOGO.bh);
    const xL=cx-markW/2,xR=cx+markW/2,yT=cy-markH/2,yB=cy+markH/2;
    const fs=(kind='normal')=>({normal:landscape?11:9.5,dim:landscape?13:11,tiny:landscape?9:7.2,micro:landscape?8:5.2}[kind]||10)*S;
    const line=(x1,y1,x2,y2,cls='bl-stroke bl-draw',delay=1.5)=>`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="${cls}" pathLength="1" style="--d:${delay}s"/>`;
    const rect=(x,y,w,h,cls='bl-stroke bl-draw',delay=1.5)=>`<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" class="${cls}" pathLength="1" style="--d:${delay}s"/>`;
    const text=(x,y,val,kind='normal',anchor='start',extra='')=>`<text x="${f(x)}" y="${f(y)}" class="bl-tech ${kind==='normal'?'':kind}" text-anchor="${anchor}" style="font-size:${f(fs(kind))}px" ${extra}>${val}</text>`;
    const tick=(x,y,s=6*S,d=1.8)=>line(x,y-s,x,y+s,'bl-stroke dim bl-draw',d);
    const dimension=(x1,y,x2,label,d=1.7)=>line(x1,y,x2,y,'bl-stroke bl-draw',d)+tick(x1,y,6*S,d+.03)+tick(x2,y,6*S,d+.06)+text((x1+x2)/2,y-8*S,label,'dim','middle');
    const vdimension=(x,y1,y2,label,d=1.9)=>line(x,y1,x,y2,'bl-stroke bl-draw',d)+line(x-6*S,y1,x+6*S,y1,'bl-stroke bl-draw',d+.03)+line(x-6*S,y2,x+6*S,y2,'bl-stroke bl-draw',d+.06)+`<text x="${f(x-12*S)}" y="${f((y1+y2)/2)}" class="bl-tech dim" text-anchor="middle" style="font-size:${f(fs('dim'))}px" transform="rotate(-90 ${f(x-12*S)} ${f((y1+y2)/2)})">${label}</text>`;
    const specBox=(x,y,w,h,rows,d=1.5)=>{let out=rect(x,y,w,h,'bl-stroke dim bl-draw',d),ty=y+18*S;for(const row of rows){out+=text(x+12*S,ty,row,landscape?'tiny':'micro');ty+=(landscape?15:13)*S}return out};
    const fine=14*S,major=fine*5;
    const boxW=landscape?Math.min(290*S,W*.24):W*.40,boxH=(landscape?88:92)*S,boxY=landscape?34*S:H*.07;
    const leftX=landscape?38*S:W*.05,rightX=W-(landscape?38*S:W*.05)-boxW;
    let g='',d=1.25;
    const leftRows=landscape?['EX | EXPERIENCE / BRANCH','MARK: MILLENNIUM','DWG  EX-ML-BP-02','SOURCE LETTERS — OUTLINE ONLY']:['EX / EXPERIENCE','MARK: MILLENNIUM','DWG EX-ML-BP-02','OUTLINE ONLY'];
    const rightRows=landscape?['CAP HEIGHT   151 px','MARK WIDTH   1364 px','MODULE       15.1 px','NO REDRAW']:['CAP 151','WIDTH 1364','MOD 15.1','NO REDRAW'];
    g+=specBox(leftX,boxY,boxW,boxH,leftRows,d);d+=.16;
    g+=specBox(rightX,boxY,boxW,boxH,rightRows,d);d+=.16;
    const topY=yT-(landscape?78:116)*S;
    g+=dimension(xL,topY,xR,'198',d);d+=.12;
    if(landscape){
      g+=text(xL,yT-30*S,'CAP HEIGHT  151 px','dim');
      g+=line(xL,yT-23*S,xL+markW*.23,yT-23*S,'bl-stroke bl-draw',d);d+=.07;
      g+=text(xL+markW*.30,yT-30*S,'MARK WIDTH  1364 px','dim');
      g+=line(xL+markW*.30,yT-23*S,xL+markW*.56,yT-23*S,'bl-stroke bl-draw',d);d+=.07;
      g+=vdimension(xL+markW*.06,yT-36*S,yB+105*S,'c/s 1211',d);d+=.12;
    }else{
      g+=text(xL,yT-72*S,'CAP HEIGHT','dim');g+=text(xL,yT-56*S,'151 px','tiny');
      g+=line(xL,yT-49*S,xL+markW*.28,yT-49*S,'bl-stroke bl-draw',d);d+=.07;
      g+=text(xL+markW*.62,yT-72*S,'MARK WIDTH','dim','middle');g+=text(xL+markW*.62,yT-56*S,'1364 px','tiny','middle');
      g+=line(xL+markW*.48,yT-49*S,xL+markW*.77,yT-49*S,'bl-stroke bl-draw',d);d+=.07;
      g+=vdimension(xL+markW*.06,yT-31*S,yB+158*S,'c/s 1211',d);d+=.12;
    }
    g+=dimension(xL,yB+(landscape?38:52)*S,xR,'1364 px × 9.03 CAP',d);d+=.12;
    g+=dimension(xL,yB+(landscape?92:116)*S,xR,'104',d);d+=.12;
    g+=text(cx,yB+(landscape?108:132)*S,'MARK  1364px','dim','middle');
    g+=vdimension(xL+markW*.15,yB+(landscape?55:76)*S,Math.min(H-100*S,yB+(landscape?190:214)*S),'c/s 204',d);d+=.12;
    g+=rect(xL,yT,markW,markH,'bl-stroke cyan bl-draw',d);d+=.05;
    const letters='MILLENNIUM'.split(''),step=markW/letters.length,nums=['53','14','14','13','15','14','163','202','1','16'];
    letters.forEach((ch,i)=>{const x=xL+step*(i+.5);g+=text(x,yT-7*S,ch,'tiny','middle');g+=line(xL+step*i,yT-5*S,xL+step*i,yB+6*S,'bl-stroke dim bl-draw',d+i*.025);if(i<nums.length)g+=text(x,yB+18*S,nums[i],'tiny','middle')});
    g+=line(xR,yT-10*S,xR,yB+10*S,'bl-stroke bl-draw',d+.28);
    if(landscape){g+=text(xR+10*S,cy-10*S,'CAP','tiny');g+=text(xR+10*S,cy+4*S,'151 px','tiny');g+=text(xR+10*S,cy+18*S,'10 MOD','tiny')}
    const rasterW=landscape?Math.min(340*S,W*.28):W*.58,rasterX=landscape?38*S:W*.05,rasterY=H-(landscape?92:170)*S;
    g+=rect(rasterX,rasterY,rasterW,32*S,'bl-stroke dim bl-draw',2.25);g+=text(rasterX+12*S,rasterY+20*S,'CONSTRUCTION ON MASTER RASTER','tiny');
    g+=text(rasterX,H-(landscape?34:85)*S,'CONSTRUCTION ON SOURCE','tiny');g+=text(W-(landscape?38*S:W*.05),H-(landscape?34:85)*S,'04','tiny','end');

    const sx=markW/LOGO.bw,sy=markH/LOGO.bh;
    const logoX=xL-LOGO.bx*sx,logoY=yT-LOGO.by*sy,logoW=LOGO.w*sx,logoH=LOGO.h*sy;
    const outline=`<image class="bl-logo-outline" href="/millennium/assets/images/marks/millennium-vector-outline.svg?v=6.0.0" x="${f(logoX)}" y="${f(logoY)}" width="${f(logoW)}" height="${f(logoH)}" preserveAspectRatio="none"/>`;
    const solid=`<image class="bl-logo-solid" href="/millennium/assets/images/marks/millennium-vector.svg?v=6.0.0" x="${f(logoX)}" y="${f(logoY)}" width="${f(logoW)}" height="${f(logoH)}" preserveAspectRatio="none"/>`;
    const trademark=`<text class="bl-final-tm" x="${f(xR+8*S)}" y="${f(yT-3*S)}" style="font-size:${f((landscape?8:7)*S)}px">™</text>`;
    let finalMeta='';
    if(landscape){const metaY=H-34*S,metaX=38*S,gap=150*S;finalMeta=`<g class="bl-final-meta">${text(metaX,metaY,'MASTER','tiny')}${text(metaX,metaY+12*S,'01','tiny')}${text(metaX+gap,metaY,'UNTOUCHED','tiny')}${text(metaX+gap,metaY+12*S,'ON SOURCE','tiny')}${text(metaX+gap*2,metaY+7*S,'13','tiny')}${text(metaX+gap*2.7,metaY,'02','tiny')}${text(metaX+gap*2.7,metaY+12*S,'04','tiny')}${text(W-38*S,metaY,'CONSTRUCTION ONLY. LETTERS','tiny','end')}${text(W-38*S,metaY+12*S,'FROM MASTER RASTER.','tiny','end')}</g>`}
    else{const y=H-64*S;finalMeta=`<g class="bl-final-meta">${text(W*.06,y,'MASTER 01','micro')}${text(W*.94,y,'CONSTRUCTION ONLY','micro','end')}${text(W*.94,y+11*S,'FROM MASTER RASTER','micro','end')}</g>`}
    const defs=`<defs><pattern id="blFine" width="${f(fine)}" height="${f(fine)}" patternUnits="userSpaceOnUse"><path d="M ${f(fine)} 0 L 0 0 0 ${f(fine)}" fill="none" stroke="#7db6ce" stroke-opacity=".13" stroke-width=".55" vector-effect="non-scaling-stroke"/></pattern><pattern id="blMajor" width="${f(major)}" height="${f(major)}" patternUnits="userSpaceOnUse"><rect width="${f(major)}" height="${f(major)}" fill="url(#blFine)"/><path d="M ${f(major)} 0 L 0 0 0 ${f(major)}" fill="none" stroke="#7db6ce" stroke-opacity=".24" stroke-width=".8" vector-effect="non-scaling-stroke"/></pattern><radialGradient id="blVignette"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".7" stop-color="#000" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></radialGradient></defs>`;
    return `<svg class="bl-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">${defs}<rect width="${W}" height="${H}" fill="#000"/><rect class="bl-blue" width="${W}" height="${H}"/><rect class="bl-grid" width="${W}" height="${H}" fill="url(#blMajor)"/><g class="bl-blueprint">${g}${outline}</g>${solid}${trademark}${finalMeta}<rect width="${W}" height="${H}" fill="url(#blVignette)" pointer-events="none"/></svg>`;
  }

  function render(elapsed=0){
    const W=Math.max(320,Math.round(innerWidth)),H=Math.max(420,Math.round(innerHeight));
    shell.style.setProperty('--bl-offset',`${-Math.max(0,elapsed)}ms`);
    shell.innerHTML=buildScene(W,H);
    lastShape=`${W}x${H}`;
  }
  const finish=()=>{if(done)return;done=true;cancelAnimationFrame(raf);shell.classList.add('is-exiting');document.body.classList.remove('intro-pending');setTimeout(()=>shell.remove(),820)};
  const frame=now=>{if(done)return;const elapsed=now-startAt;if(elapsed>=DURATION){finish();return}raf=requestAnimationFrame(frame)};
  const start=()=>{if(done||startAt)return;render(QA_TIME);startAt=performance.now()-QA_TIME;raf=requestAnimationFrame(frame)};
  const rebuild=()=>{if(done||!startAt)return;clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{const key=`${Math.round(innerWidth)}x${Math.round(innerHeight)}`;if(key!==lastShape)render(performance.now()-startAt)},120)};
  addEventListener('resize',rebuild,{passive:true});addEventListener('orientationchange',rebuild,{passive:true});
  const preload=Promise.allSettled(['/millennium/assets/images/marks/millennium-vector.svg?v=6.0.0','/millennium/assets/images/marks/millennium-vector-outline.svg?v=6.0.0'].map(src=>new Promise(resolve=>{const im=new Image();im.onload=im.onerror=resolve;im.src=src})));
  const fonts=document.fonts?.load?Promise.allSettled([document.fonts.load('800 96px SyneLocal'),document.fonts.load('500 11px PlexMonoLocal')]):Promise.resolve();
  Promise.race([Promise.allSettled([preload,fonts]),new Promise(r=>setTimeout(r,650))]).then(start);
  setTimeout(()=>{if(!startAt&&!done)start()},900);
})();
