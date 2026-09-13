(() => {
  const dict = {
    en: {
      skip:"Skip to content",
      "nav.position":"Position","nav.instruments":"Instruments","nav.proof":"Proof","nav.field":"Field","nav.commission":"Commission",
      "hero.location":"Saudi-rooted / globally legible","hero.kicker":"A branch under one house.","hero.title":"Directed work<br>that remains.",
      "hero.lead":"A creative agency practice built around control, consequence and a readable law — not a menu of generic services.",
      "hero.cta1":"Read the instruments","hero.cta2":"Start a commission",
      "position.kicker":"POSITION","position.title":"Experience is treated as law, not as a service menu.",
      "position.lead":"The practice is built for institutions, private houses and decision-makers who already feel the cost of generic work.",
      "position.body":"The public category is Creative Agency. The operating position is narrower: fewer promises, stricter image, written licence, dated decisions and work designed to survive after the launch moment.",
      "position.trade1":"Reach → Control","position.trade2":"Speed theatre → Dated decisions","position.trade3":"Full service → Four instruments",
      "instruments.kicker":"INSTRUMENTS","instruments.title":"Four instruments.<br>No fifth.",
      "instruments.lead":"The engagement architecture replaces the usual “full-service” list. Each instrument has a defined depth, decision horizon and level of authorship.",
      "instrument.study.title":"Study","instrument.study.body":"A bounded investigation that defines the problem, the law and the decision before production begins.",
      "instrument.pilot.title":"Pilot","instrument.pilot.body":"A controlled proof built to survive silence, review and real use — not merely to look like a trailer.",
      "instrument.commission.title":"Commission","instrument.commission.body":"A directed body of work with explicit authorship, deliverables, licence and a standard that remains readable.",
      "instrument.mandate.title":"Mandate","instrument.mandate.body":"A deeper operating relationship in which the practice holds the image, decisions and system across a defined period.",
      "question.quote":"“A founder who needs architecture, not a moodboard.”",
      "question.yes":"YES — clients willing to accept written scope, licence, decisions and a stricter visual standard.",
      "question.no":"NO — pitch theatre, open calls, rate-card shopping or “just make a reel and see.”",
      "proof.kicker":"PROOF STANDARD","proof.title":"Proof is structural.","proof.lead":"Follower counts, award stickers and famous names without paper are not proof. The system asks for evidence that the work and the law agree.",
      "proof.a.title":"Readable law","proof.a.body":"The client can understand the standard before they pay.",
      "proof.b.title":"Pilots that hold","proof.b.body":"Work survives quiet review and use without relying on launch noise.",
      "proof.c.title":"Refusal on record","proof.c.body":"A boundary means something only when it has been used.",
      "proof.d.title":"Specimens match","proof.d.body":"Public use, lockups and delivery remain consistent with the system.",
      "field.kicker":"FIELD SYSTEM","field.title":"Night is the default.<br>Material opens the room.","field.lead":"The branch keeps a restrained night field, signal chalk and one copper nick. Agency material can open a door-blue field while the house lockup remains untouched.",
      "method.kicker":"OPERATING LAW","method.title":"Built to remain distinguishable in one still and one sentence.",
      "method.a":"One house. Endorsed room. No second-house behaviour.",
      "method.b":"One source mark. Never redrawn, stretched or recoloured.",
      "method.c":"One copper nick. Used as a signal, not decoration.",
      "method.d":"Arabic and English are equal operating languages, not translated afterthoughts.",
      "commission.kicker":"COMMISSION","commission.title":"Bring a consequential problem.","commission.lead":"The right starting point is not a list of deliverables. It is a decision that deserves a system.","commission.cta":"Open the house dossier",
      "footer.line":"A series under one house.","footer.privacy":"Privacy","footer.terms":"Terms","footer.top":"Back to top",
      "legal.back":"Back","legal.privacy.kicker":"LEGAL / 01","legal.privacy.title":"Privacy","legal.terms.kicker":"LEGAL / 02","legal.terms.title":"Terms"
    },
    ar: {
      skip:"تجاوز إلى المحتوى",
      "nav.position":"التموضع","nav.instruments":"الأدوات","nav.proof":"البرهان","nav.field":"الحقل","nav.commission":"التكليف",
      "hero.location":"سعودية الجذر / مقروءة عالميًا","hero.kicker":"فرع تحت دار واحدة.","hero.title":"عمل موجّه<br>يبقى.",
      "hero.lead":"ممارسة وكالة إبداع مبنية على الضبط والعاقبة وقانون مقروء — لا على قائمة خدمات عامة.",
      "hero.cta1":"اقرأ الأدوات","hero.cta2":"ابدأ تكليفًا",
      "position.kicker":"التموضع","position.title":"التجربة تُعامل كقانون، لا كقائمة خدمات.",
      "position.lead":"الممارسة لمن لمس كلفة العمل العام: مؤسسات ودور خاصة وصُنّاع قرار يريدون صورة أصرم.",
      "position.body":"الفئة العلنية وكالة إبداع، لكن موقع التشغيل أضيق: وعود أقل، صورة أصرم، ترخيص مكتوب، قرارات مؤرخة، وعمل مصمم ليبقى بعد لحظة الإطلاق.",
      "position.trade1":"الوصول ← الضبط","position.trade2":"مسرح السرعة ← قرارات مؤرخة","position.trade3":"الخدمة الشاملة ← أربع أدوات",
      "instruments.kicker":"الأدوات","instruments.title":"أربع أدوات.<br>لا خامسة.",
      "instruments.lead":"عمارة العلاقة تحل محل قائمة «الخدمة الشاملة». لكل أداة عمق محدد وأفق قرار ومستوى واضح من التأليف.",
      "instrument.study.title":"دراسة","instrument.study.body":"تحقيق محدود يعرّف المشكلة والقانون والقرار قبل بدء الإنتاج.",
      "instrument.pilot.title":"تجريب","instrument.pilot.body":"برهان مضبوط يصمد للصمت والمراجعة والاستعمال الفعلي، لا مجرد مقطع تشويقي.",
      "instrument.commission.title":"تكليف","instrument.commission.body":"جسم عمل موجّه بتأليف وتسليمات وترخيص ومعيار مقروء بوضوح.",
      "instrument.mandate.title":"ولاية","instrument.mandate.body":"علاقة تشغيل أعمق تمسك فيها الممارسة بالصورة والقرارات والنظام خلال مدة محددة.",
      "question.quote":"«مؤسس يحتاج عمارة، لا لوحة مزاج.»",
      "question.yes":"نعم — لعميل يقبل نطاقًا وترخيصًا وقرارات مكتوبة ومعيار صورة أصرم.",
      "question.no":"لا — لمسرح العروض والدعوات المفتوحة ومتسوّقي بطاقات الأسعار و«نعمل ريل ونشوف».",
      "proof.kicker":"معيار البرهان","proof.title":"البرهان بنيوي.","proof.lead":"عدد المتابعين وملصقات الجوائز والأسماء الشهيرة بلا ورق ليست برهانًا. المطلوب دليل أن العمل والقانون متطابقان.",
      "proof.a.title":"قانون مقروء","proof.a.body":"يستطيع العميل فهم المعيار قبل أن يدفع.",
      "proof.b.title":"تجريبات تصمد","proof.b.body":"العمل يصمد للمراجعة والاستعمال من دون ضجيج الإطلاق.",
      "proof.c.title":"رفض مسجّل","proof.c.body":"الحد لا يعني شيئًا إن لم يُستخدم.",
      "proof.d.title":"شواهد متطابقة","proof.d.body":"الاستخدام العام والتركيبات والتسليمات تبقى متسقة مع النظام.",
      "field.kicker":"نظام الحقل","field.title":"الليل هو الأصل.<br>والمادة تفتح الغرفة.","field.lead":"يحافظ الفرع على حقل ليلي مضبوط، وإشارة جيرية، وشق نحاسي واحد. مادة الوكالة يمكن أن تفتح بابًا أزرق فيما يبقى قفل الدار دون تغيير.",
      "method.kicker":"قانون التشغيل","method.title":"مبني ليبقى مميزًا في لقطة واحدة وجملة واحدة.",
      "method.a":"دار واحدة. غرفة مزكّاة. لا سلوك دار ثانية.",
      "method.b":"أصل واحد للشعار. لا يعاد رسمه أو مطّه أو تلوينه.",
      "method.c":"شق نحاسي واحد. إشارة لا زخرفة.",
      "method.d":"العربية والإنجليزية لغتا تشغيل متساويتان، لا ترجمة متأخرة.",
      "commission.kicker":"التكليف","commission.title":"هات مشكلة ذات عاقبة.","commission.lead":"البداية الصحيحة ليست قائمة تسليمات، بل قرار يستحق نظامًا.","commission.cta":"افتح ملف الدار",
      "footer.line":"سلسلة تحت دار واحدة.","footer.privacy":"الخصوصية","footer.terms":"الشروط","footer.top":"العودة للأعلى",
      "legal.back":"رجوع","legal.privacy.kicker":"قانوني / 01","legal.privacy.title":"الخصوصية","legal.terms.kicker":"قانوني / 02","legal.terms.title":"الشروط"
    }
  };

  const legal = {
    en: {
      privacy: [
        ["Data minimisation","This static site does not operate an account system, database or submission form. Standard hosting and browser infrastructure may still process technical request data."],
        ["External destinations","Links can open third-party destinations. Their privacy practices are governed by their own terms."],
        ["Local preferences","The selected language is stored locally in the browser so the site can reopen in the same language."],
        ["Contact","Any direct communication initiated through external channels is governed by that channel and the correspondence itself."]
      ],
      terms: [
        ["Site purpose","This site presents the creative-agency practice and its operating principles."],
        ["Intellectual property","Marks, systems, text and visual assets remain protected. No licence is granted by viewing the site."],
        ["No public rate card","Nothing on the site constitutes a standing offer, public fee card or automatic acceptance of work."],
        ["External links","Third-party destinations are provided for navigation and may change independently."]
      ]
    },
    ar: {
      privacy: [
        ["تقليل البيانات","هذا موقع ثابت لا يشغّل نظام حسابات أو قاعدة بيانات أو نموذج إرسال. قد تعالج بنية الاستضافة والمتصفح بيانات طلب تقنية معتادة."],
        ["الوجهات الخارجية","قد تفتح الروابط وجهات خارجية وتخضع ممارساتها لشروطها الخاصة."],
        ["التفضيلات المحلية","تُحفظ اللغة المختارة محليًا في المتصفح لإعادة فتح الموقع باللغة نفسها."],
        ["التواصل","أي تواصل مباشر يبدأ عبر قناة خارجية يخضع لتلك القناة ولمراسلاتها."]
      ],
      terms: [
        ["غرض الموقع","يعرض الموقع ممارسة الوكالة الإبداعية وقواعد تشغيلها."],
        ["الملكية الفكرية","تبقى العلامات والأنظمة والنصوص والأصول البصرية محمية، ولا يمنح تصفح الموقع أي ترخيص."],
        ["لا بطاقة أسعار عامة","لا يشكل ما في الموقع عرضًا دائمًا أو بطاقة أسعار عامة أو قبولًا تلقائيًا لأي عمل."],
        ["الروابط الخارجية","الوجهات الخارجية مخصصة للملاحة وقد تتغير بصورة مستقلة."]
      ]
    }
  };

  let lang = localStorage.getItem("millennium_lang") || "en";
  if (!dict[lang]) lang = "en";

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  function applyLanguage(next) {
    lang = next;
    localStorage.setItem("millennium_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    $$(".lang-code").forEach(el => el.textContent = lang === "ar" ? "EN" : "AR");
    $$("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (dict[lang][key] != null) el.innerHTML = dict[lang][key];
    });
    document.title = lang === "ar" ? "MILLENNIUM — وكالة إبداع" : "MILLENNIUM — Creative Agency";
    renderLegal();
  }

  function renderLegal() {
    const type = new URLSearchParams(location.search).get("legal");
    if (!["privacy","terms"].includes(type)) return;
    const tpl = $("#legal-template");
    const main = $("main#main");
    const footer = $(".footer");
    if (!tpl || !main) return;
    const node = tpl.content.cloneNode(true);
    main.replaceWith(node);
    if (footer) footer.remove();
    $("#legal-kicker").textContent = dict[lang][`legal.${type}.kicker`];
    $("#legal-title").textContent = dict[lang][`legal.${type}.title`];
    $("#legal-body").innerHTML = legal[lang][type].map(([h,p]) => `<section><h2>${h}</h2><p>${p}</p></section>`).join("");
    document.body.classList.add("legal-mode");
  }

  function revealInit(){
    const els = $$("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add("is-visible"); io.unobserve(e.target); }
    }), {threshold:.01, rootMargin:"0px 0px -4% 0px"});
    els.forEach(el => io.observe(el));
  }

  function headerToneInit(){
    const header = $(".site-header");
    if (!header) return;
    const sections = $$("[data-header-tone]");
    const io = new IntersectionObserver(entries => {
      const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top)-Math.abs(b.boundingClientRect.top));
      if(visible[0]) header.dataset.tone = visible[0].target.dataset.headerTone || "dark";
    }, {threshold:0, rootMargin:"-12% 0px -70% 0px"});
    sections.forEach(s=>io.observe(s));
  }

  function progressInit(){
    let raf = 0;
    const header = $(".site-header");
    const bar = $(".scroll-progress");
    const update = () => {
      raf = 0;
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      const pct = max > 0 ? (d.scrollTop / max) * 100 : 0;
      if(bar) bar.style.width = `${Math.min(100,Math.max(0,pct))}%`;
      if(header) header.classList.toggle("scrolled", d.scrollTop > 48);
    };
    const queue = () => { if(!raf) raf=requestAnimationFrame(update); };
    addEventListener("scroll",queue,{passive:true}); addEventListener("resize",queue); update();
  }

  function menuInit(){
    const btn=$(".menu-toggle"), menu=$(".mobile-menu");
    if(!btn||!menu) return;
    const close=()=>{btn.classList.remove("open");btn.setAttribute("aria-expanded","false");menu.classList.remove("open");menu.setAttribute("aria-hidden","true");document.body.style.overflow=""};
    btn.addEventListener("click",()=>{
      const open=!menu.classList.contains("open");
      btn.classList.toggle("open",open);btn.setAttribute("aria-expanded",String(open));
      menu.classList.toggle("open",open);menu.setAttribute("aria-hidden",String(!open));
      document.body.style.overflow=open?"hidden":"";
    });
    $$(".mobile-menu a").forEach(a=>a.addEventListener("click",close));
  }

  $(".lang-toggle")?.addEventListener("click",()=>applyLanguage(lang==="en"?"ar":"en"));
  applyLanguage(lang);
  if(!document.body.classList.contains("legal-mode")){
    revealInit(); headerToneInit(); progressInit(); menuInit();
  } else {
    progressInit();
  }
})();