/* =========================================================
   해향 해금학원 — IA 데이터 + 공통 레이아웃
   메뉴 구조는 아래 IA 배열 하나만 수정하면 GNB/LNB/푸터/모바일메뉴에 모두 반영됩니다.
   ========================================================= */
const IA = [
  { id: 'about', title: '학원소개', url: 'about.html', desc: '해금의 소리를 바르게, 오래 즐길 수 있도록', children: [
    ['인사말', 'greeting'], ['강사진', 'teachers'], ['시설안내', 'facility'], ['주요활동', 'activity'] ] },
  { id: 'lesson', title: '레슨과정', url: 'lesson.html', desc: '형태와 대상에 맞춘 다섯 가지 과정', children: [
    ['1:1 레슨', 'private'], ['그룹레슨', 'group'], ['원데이클래스', 'oneday'], ['초등레슨', 'kids'], ['성인레슨', 'adult'] ] },
  { id: 'admission', title: '입시안내', url: 'admission.html', desc: '예중·예고·국악과 입시를 체계적으로', children: [
    ['입시레슨', 'lesson'], ['입시요강·일정', 'guide'], ['합격실적', 'result'] ] },
  { id: 'notice', title: '공지사항', url: 'notice.html', desc: '학원 소식과 일정을 알려드립니다', children: [] },
  { id: 'video', title: '수업영상', url: 'video.html', desc: '레슨과 공연 현장을 영상으로 만나보세요', children: [] },
  { id: 'location', title: '오시는길', url: 'location.html', desc: '해향 해금학원 찾아오시는 길', children: [] },
];

// GNB에는 노출되지 않는 페이지 (헤더 '상담신청' 버튼 / 플로팅 버튼으로 진입)
const EXTRA = {
  contact: { id: 'contact', title: '상담신청', url: 'contact.html', desc: '레슨·입시 상담부터 공연·특강 문의까지 편하게 남겨주세요', children: [] },
};

const SITE = { name: '해향', full: '해향 해금학원', tel: '02-000-0000', addr: '서울특별시 OO구 OO로 00, 3층', hours: '평일 10:00–21:00 · 토 10:00–17:00' };

(function () {
  const page = document.body.dataset.page || 'home';
  const cur = IA.find(m => m.id === page) || EXTRA[page];

  /* ---------- Header / GNB ---------- */
  const gnb = IA.map(m => `
    <li class="gnb-item${m.id === page ? ' is-active' : ''}">
      <a href="${m.url}">${m.title}</a>
      ${m.children.length ? `<ul class="gnb-sub">${m.children.map(c => `<li><a href="${m.url}#${c[1]}">${c[0]}</a></li>`).join('')}</ul>` : ''}
    </li>`).join('');

  const mnav = IA.map(m => `
    <li>
      ${m.children.length
        ? `<button class="m-1dep" aria-expanded="false">${m.title}<span aria-hidden="true">+</span></button>
           <ul class="m-2dep"><li><a href="${m.url}">${m.title} 전체</a></li>${m.children.map(c => `<li><a href="${m.url}#${c[1]}">${c[0]}</a></li>`).join('')}</ul>`
        : `<a class="m-1dep" href="${m.url}">${m.title}</a>`}
    </li>`).join('');

  document.getElementById('header').outerHTML = `
  <header class="header" id="siteHeader">
    <div class="wrap header-in">
      <a class="logo" href="index.html" aria-label="${SITE.full} 홈">
        <span class="logo-mark" aria-hidden="true"></span>
        <span class="logo-txt"><b>${SITE.name}</b><small>HAEGEUM ACADEMY</small></span>
      </a>
      <nav class="gnb" aria-label="주메뉴"><ul>${gnb}</ul></nav>
      <a class="btn btn-sm btn-ink header-cta${page === 'contact' ? ' is-current' : ''}" href="contact.html">상담신청</a>
      <button class="burger" id="burger" aria-label="메뉴 열기" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </header>
  <div class="m-nav" id="mNav" aria-hidden="true">
    <ul>${mnav}</ul>
    <div class="m-nav-foot"><a class="btn btn-ink" href="contact.html">상담신청</a><a class="btn btn-line" href="tel:${SITE.tel}">전화상담 ${SITE.tel}</a></div>
  </div>`;

  /* ---------- Sub top (sub hero + LNB) ---------- */
  const subtop = document.getElementById('subtop');
  if (subtop && cur) {
    subtop.outerHTML = `
    <section class="sub-hero">
      <div class="wrap">
        <p class="crumb"><a href="index.html">홈</a> <span>/</span> ${cur.title}</p>
        <h1>${cur.title}</h1>
        <p class="sub-desc">${cur.desc}</p>
      </div>
    </section>
    ${cur.children.length ? `
    <nav class="lnb" aria-label="${cur.title} 하위메뉴">
      <div class="wrap"><ul>${cur.children.map(c => `<li><a href="#${c[1]}" data-target="${c[1]}">${c[0]}</a></li>`).join('')}</ul></div>
    </nav>` : ''}`;
  }

  /* ---------- Footer ---------- */
  document.getElementById('footer').outerHTML = `
  <footer class="footer">
    <div class="wrap footer-in">
      <div class="footer-brand">
        <a class="logo logo-light" href="index.html"><span class="logo-mark" aria-hidden="true"></span><span class="logo-txt"><b>${SITE.name}</b><small>HAEGEUM ACADEMY</small></span></a>
        <p>${SITE.addr}<br>TEL ${SITE.tel} · ${SITE.hours}</p>
      </div>
      <nav class="footer-map" aria-label="사이트맵">
        ${IA.map(m => `<div><a href="${m.url}"><b>${m.title}</b></a>${m.children.map(c => `<a href="${m.url}#${c[1]}">${c[0]}</a>`).join('')}</div>`).join('')}
      </nav>
    </div>
    <div class="wrap copy">© ${new Date().getFullYear()} ${SITE.full}. All rights reserved.</div>
  </footer>
  ${page === 'contact' ? '' : '<a class="float-cta" href="contact.html" aria-label="상담신청">상담<br>신청</a>'}`;

  /* ---------- Behaviors ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // 드롭다운: 메뉴별 2Depth는 CSS(:hover / :focus-within)로 개별 노출

  // 모바일 메뉴
  const burger = document.getElementById('burger'), mNav = document.getElementById('mNav');
  const setMenu = open => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open); mNav.setAttribute('aria-hidden', !open);
  };
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  mNav.querySelectorAll('button.m-1dep').forEach(b => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', open); b.parentElement.classList.toggle('is-open', open);
  }));
  mNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  // LNB 스크롤 스파이
  const lnbLinks = [...document.querySelectorAll('.lnb a')];
  if (lnbLinks.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        lnbLinks.forEach(a => {
          const on = a.dataset.target === en.target.id;
          a.classList.toggle('is-active', on);
          if (on) { const ul = a.closest('ul'); ul.scrollLeft = a.offsetLeft - (ul.clientWidth - a.offsetWidth) / 2; }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    lnbLinks.forEach(a => { const s = document.getElementById(a.dataset.target); if (s) io.observe(s); });
  }

  // 등장 애니메이션
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); ro.unobserve(e.target); } }), { threshold: .12 });
    reveals.forEach(el => ro.observe(el));
  } else reveals.forEach(el => el.classList.add('is-in'));
})();
