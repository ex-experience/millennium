(() => {
  'use strict';

  const root = document.documentElement;
  const header = document.getElementById('site-header');
  const progress = document.getElementById('progress-bar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const langToggle = document.getElementById('lang-toggle');
  const legalDialog = document.getElementById('legal-dialog');
  const legalClose = document.getElementById('legal-close');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const translations = {
    en: {
      'nav.work':'Work','nav.instruments':'Instruments','nav.proof':'Proof','nav.contact':'Contact',
      'gateway.meta1':'Creative Agency','gateway.meta2':'Jeddah · KSA','gateway.scroll':'Enter / Scroll',
      'manifesto.kicker':'Position / 01','manifesto.line1':'Engineered experience.','manifesto.line2':'Cinematic narrative.','manifesto.line3':'Executive intelligence.','manifesto.note':'We do not build campaigns around decoration. We build systems, worlds and images that can survive scrutiny after the launch noise disappears.',
      'work.kicker':'Selected fields / 02','work.title':'The work is the argument.','work.intro':'No logo wall. No trophy shelf. Each frame must show an operating idea: an identity, a world, a moving image or a system.',
      'work.items.0.title':'Agency Field','work.items.0.copy':'Colour becomes architecture: one door, one material logic, one controlled signal.',
      'work.items.1.title':'Taken, not invented','work.items.1.copy':'Material is evidence. The visual system starts from observed surfaces, not a decorative moodboard.',
      'work.items.2.title':'The mark stays sovereign','work.items.2.copy':'The branch can move. The source mark does not. The system protects recognition before expression.',
      'work.items.3.title':'A system that moves','work.items.3.copy':'Editorial rhythm, responsive direction, motion restraint and performance live inside the same operating law.',
      'instruments.kicker':'Engagement model / 03','instruments.title':'Four instruments.<br>No service menu.','instruments.note':'The discipline changes. The engagement law does not.',
      'instruments.items.0.title':'Study','instruments.items.0.copy':'A diagnostic field: observe the system, locate the friction, define the law before making the object.',
      'instruments.items.1.title':'Pilot','instruments.items.1.copy':'A controlled prototype that proves direction in public or private before scale corrupts the idea.',
      'instruments.items.2.title':'Commission','instruments.items.2.copy':'One consequential piece of work with a defined authorial standard, approval line and usage boundary.',
      'instruments.items.3.title':'Mandate','instruments.items.3.copy':'A wider operating authority: strategy, system and execution held together across disciplines without becoming generic full-service noise.',
      'practice.kicker':'Practice index / 04','practice.title':'One machine.<br>Multiple disciplines.',
      'practice.items.0':'Creative engineering & human-centred innovation','practice.items.1':'Cinema, moving image & world-building','practice.items.2':'Behavioural intelligence & brand direction','practice.items.3':'Digital systems, platforms & AI','practice.items.4':'Interactive worlds, games & spatial experience','practice.items.5':'Product worlds, R&D & scarcity systems',
      'proof.kicker':'Evidence wall / 05','proof.title':'Proof is<br>a condition.','proof.items.0':'The system can be recognised in one still and one sentence.','proof.items.1':'A source asset survives every application without being redrawn for convenience.','proof.items.2':'A pilot can survive silence, scrutiny and a boardroom without trailer language.','proof.items.3':'A refusal is as strategic as an approval when the work becomes generic.','proof.items.4':'The output remains legible without a trend, award sticker or borrowed symbol.',
      'constitution.kicker':'Constitution / 06','constitution.line1':'Not a content studio.','constitution.line2':'Not a full-service agency.','constitution.line3':'A directed creative practice.','constitution.copy':'The work moves across strategy, cinema, systems and objects. What holds it together is not a menu of capabilities. It is one operating law: direction before volume, source before decoration, proof before performance.',
      'contact.kicker':'Private commissions / 07','contact.pre':'If the next move needs a world, not a deliverable—','contact.cta':'Enter the house',
      'footer.branch':'A creative agency practice','footer.privacy':'Privacy','footer.terms':'Terms','footer.top':'Top ↑'
    },
    ar: {
      'nav.work':'الأعمال','nav.instruments':'الأدوات','nav.proof':'البرهان','nav.contact':'التواصل',
      'gateway.meta1':'وكالة إبداعية','gateway.meta2':'جدة · السعودية','gateway.scroll':'ادخل / مرّر',
      'manifesto.kicker':'التموضع / 01','manifesto.line1':'هندسة التجربة.','manifesto.line2':'السرد السينمائي.','manifesto.line3':'الذكاء التنفيذي.','manifesto.note':'لا نبني حملات حول الزخرفة. نبني أنظمة وعوالم وصورًا تصمد أمام الفحص بعد أن يختفي ضجيج الإطلاق.',
      'work.kicker':'حقول مختارة / 02','work.title':'العمل هو الحُجّة.','work.intro':'لا جدار شعارات. لا رف جوائز. كل إطار يجب أن يثبت فكرة تشغيلية: هوية، عالم، صورة متحركة، أو نظام.',
      'work.items.0.title':'حقل الوكالة','work.items.0.copy':'اللون يتحول إلى عمارة: باب واحد، منطق مادي واحد، وإشارة مضبوطة.',
      'work.items.1.title':'مأخوذ لا مخترع','work.items.1.copy':'المادة دليل. يبدأ النظام البصري من أسطح حقيقية مرصودة، لا من لوحة مزاج زخرفية.',
      'work.items.2.title':'الأصل يبقى سياديًا','work.items.2.copy':'يمكن للفرع أن يتحرك. الأصل لا يتحرك. يحمي النظام التعرّف قبل التعبير.',
      'work.items.3.title':'نظام يتحرك','work.items.3.copy':'الإيقاع التحريري، الاستجابة، ضبط الحركة، والأداء؛ كلها تعمل داخل قانون تشغيل واحد.',
      'instruments.kicker':'نموذج الارتباط / 03','instruments.title':'أربع أدوات.<br>لا قائمة خدمات.','instruments.note':'يتغير التخصص. لا يتغير قانون الارتباط.',
      'instruments.items.0.title':'دراسة','instruments.items.0.copy':'حقل تشخيصي: نراقب النظام، نحدد الاحتكاك، ونكتب القانون قبل صناعة الشيء.',
      'instruments.items.1.title':'تجريب','instruments.items.1.copy':'نموذج أولي مضبوط يثبت الاتجاه علنًا أو خاصًا قبل أن يفسد التوسع الفكرة.',
      'instruments.items.2.title':'تكليف','instruments.items.2.copy':'قطعة عمل ذات أثر، بمعيار تأليفي واضح وخط اعتماد وحدود استخدام مكتوبة.',
      'instruments.items.3.title':'ولاية','instruments.items.3.copy':'صلاحية تشغيل أوسع تمسك الاستراتيجية والنظام والتنفيذ عبر التخصصات دون السقوط في ضجيج «الخدمة الشاملة».',
      'practice.kicker':'فهرس الممارسة / 04','practice.title':'آلة واحدة.<br>تخصصات متعددة.',
      'practice.items.0':'الهندسة الإبداعية والابتكار المتمحور حول الإنسان','practice.items.1':'السينما والصورة المتحركة وبناء العوالم','practice.items.2':'الذكاء السلوكي والتوجيه الاستراتيجي للعلامة','practice.items.3':'الأنظمة الرقمية والمنصات والذكاء الاصطناعي','practice.items.4':'العوالم التفاعلية والألعاب والتجربة المكانية','practice.items.5':'عوالم المنتجات والبحث والتطوير وأنظمة الندرة',
      'proof.kicker':'جدار البرهان / 05','proof.title':'البرهان<br>شرط.','proof.items.0':'يمكن تمييز النظام في لقطة واحدة وجملة واحدة.','proof.items.1':'الأصل المصدر يصمد في كل تطبيق دون إعادة رسمه للسهولة.','proof.items.2':'التجريب يصمد للصمت والفحص وغرفة المجلس دون لغة إعلانية متضخمة.','proof.items.3':'الرفض قرار استراتيجي بقدر الموافقة عندما يصبح العمل عامًا.','proof.items.4':'يبقى الناتج مقروءًا بلا ترند أو ملصق جائزة أو رمز مستعار.',
      'constitution.kicker':'الدستور / 06','constitution.line1':'لسنا استوديو محتوى.','constitution.line2':'لسنا وكالة خدمة شاملة.','constitution.line3':'ممارسة إبداعية موجّهة.','constitution.copy':'يتحرك العمل بين الاستراتيجية والسينما والأنظمة والأشياء. ما يجمعه ليس قائمة قدرات، بل قانون تشغيل واحد: التوجيه قبل الكثرة، المصدر قبل الزخرفة، والبرهان قبل الاستعراض.',
      'contact.kicker':'تكليفات خاصة / 07','contact.pre':'إذا كانت الخطوة القادمة تحتاج عالمًا لا مجرد مخرج—','contact.cta':'ادخل الدار',
      'footer.branch':'ممارسة وكالة إبداعية','footer.privacy':'الخصوصية','footer.terms':'الشروط','footer.top':'الأعلى ↑'
    }
  };

  let lang = localStorage.getItem('millennium-lang') || 'en';
  if (!translations[lang]) lang = 'en';

  function setLanguage(next) {
    lang = next;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('millennium-lang', lang);
    langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = translations[lang][key];
      if (value) el.innerHTML = value;
    });
    document.title = lang === 'ar' ? 'MILLENNIUM — وكالة إبداعية' : 'MILLENNIUM — Creative Agency';
  }

  setLanguage(lang);
  langToggle.addEventListener('click', () => setLanguage(lang === 'en' ? 'ar' : 'en'));

  function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  document.querySelectorAll('[data-menu-link]').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  let raf = 0;
  function updateProgress() {
    raf = 0;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const value = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = `${Math.max(0, Math.min(100, value))}%`;
  }
  function queueProgress() {
    if (!raf) raf = requestAnimationFrame(updateProgress);
  }
  window.addEventListener('scroll', queueProgress, { passive:true });
  window.addEventListener('resize', queueProgress);
  updateProgress();

  const revealNodes = [...document.querySelectorAll('.reveal')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealNodes.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold:0.05, rootMargin:'0px 0px -4% 0px' });
    revealNodes.forEach((el) => revealObserver.observe(el));
  }

  const manifesto = document.querySelector('.manifesto');
  if (manifesto && 'IntersectionObserver' in window) {
    const mo = new IntersectionObserver(([entry]) => manifesto.classList.toggle('in-view', entry.isIntersecting), { threshold:.2 });
    mo.observe(manifesto);
  }

  const toneSections = [...document.querySelectorAll('[data-tone]')];
  if ('IntersectionObserver' in window) {
    const visible = new Map();
    const toneObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visible.set(entry.target, entry.isIntersecting));
      const candidates = toneSections.filter((section) => visible.get(section));
      if (!candidates.length) return;
      candidates.sort((a,b) => Math.abs(a.getBoundingClientRect().top) - Math.abs(b.getBoundingClientRect().top));
      header.classList.toggle('is-light', candidates[0].dataset.tone === 'light');
    }, { threshold:0, rootMargin:'-12% 0px -72% 0px' });
    toneSections.forEach((section) => toneObserver.observe(section));
  }

  const params = new URLSearchParams(location.search);
  const legal = params.get('legal');
  const legalContent = {
    privacy: {
      en:{title:'Privacy',body:[['Data minimisation','This static site does not run a contact form, advertising pixel, account system or behavioural profiling layer. Browser-level hosting logs may still be processed by the hosting provider.'],['Local preference','Language preference is stored only in your browser using localStorage.'],['External links','Links leaving this site are governed by the destination service’s own privacy terms.']]},
      ar:{title:'الخصوصية',body:[['تقليل البيانات','هذا الموقع الثابت لا يشغّل نموذج تواصل أو بكسلًا إعلانيًا أو نظام حسابات أو طبقة تتبع سلوكي. وقد تعالج منصة الاستضافة سجلات تقنية على مستوى الخادم.'],['تفضيل محلي','يُحفظ اختيار اللغة في متصفحك فقط عبر التخزين المحلي.'],['روابط خارجية','أي رابط يغادر الموقع يخضع لشروط الخصوصية الخاصة بالوجهة.']]}
    },
    terms: {
      en:{title:'Terms',body:[['Source assets','Identity assets shown here are controlled source material. No permission is granted to redraw, recolour, extract or republish them.'],['Site content','All editorial and visual material is presented for portfolio and informational purposes.'],['Availability','The site may change, move or be withdrawn as the branch system evolves.']]},
      ar:{title:'الشروط',body:[['الأصول المصدرية','أصول الهوية المعروضة هنا مواد مصدرية مضبوطة. لا يمنح عرضها إذنًا بإعادة الرسم أو التلوين أو الاستخراج أو النشر.'],['محتوى الموقع','تعرض المواد التحريرية والبصرية لأغراض التعريف وعرض الممارسة.'],['الإتاحة','قد يتغير الموقع أو ينتقل أو يتوقف مع تطور نظام الفرع.']]}
    }
  };

  function openLegal(type) {
    const pack = legalContent[type]?.[lang] || legalContent[type]?.en;
    if (!pack || !legalDialog) return;
    document.getElementById('legal-title').textContent = pack.title;
    document.getElementById('legal-body').innerHTML = pack.body.map(([h,p]) => `<section><h3>${h}</h3><p>${p}</p></section>`).join('');
    if (typeof legalDialog.showModal === 'function') legalDialog.showModal();
  }
  if (legal) openLegal(legal);
  document.querySelectorAll('a[href^="?legal="]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const type = new URL(link.href).searchParams.get('legal');
      history.replaceState({},'',`?legal=${type}`);
      openLegal(type);
    });
  });
  legalClose?.addEventListener('click', () => {
    legalDialog.close();
    history.replaceState({},'',location.pathname + location.hash);
  });
  legalDialog?.addEventListener('click', (event) => {
    const rect = legalDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) legalClose.click();
  });
})();
