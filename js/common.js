/* =========================================================
   해향 해금학원 — common.js
   모든 페이지 공통 동작: 헤더 스크롤 상태 · 모바일 메뉴 · LNB 현재 위치 표시
   (마크업은 각 HTML 파일에 있습니다. 이 파일은 동작만 담당합니다.)
   ========================================================= */
(function () {
  'use strict';

  var MOBILE_MAX = 1024;
  var body = document.body;
  var header = document.getElementById('header');
  var menuBtn = document.querySelector('.menu-btn');
  var gnb = document.getElementById('gnb');

  /* ---------- 스크롤 등장 효과 (AOS) ---------- */
  // 각 요소의 data-aos 속성으로 동작합니다. 모션 최소화 설정을 켠 사용자에게는 적용하지 않습니다.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.AOS) {
    window.AOS.init({ duration: 900, easing: 'ease-out-cubic', offset: 80, once: true, disable: reduceMotion });
    window.addEventListener('load', function () { window.AOS.refresh(); });
  }

  /* ---------- 헤더: 스크롤 시 테두리 ---------- */
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 10); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 모바일 메뉴 ---------- */
  if (menuBtn && gnb) {
    var label = menuBtn.querySelector('.sr-only');

    var setMenu = function (open) {
      body.classList.toggle('is-menu-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? '전체 메뉴 닫기' : '전체 메뉴 열기';
    };

    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });

    gnb.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('is-menu-open')) {
        setMenu(false);
        menuBtn.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > MOBILE_MAX) setMenu(false);
    });
  }

  /* ---------- LNB: 가로로 넘치면 스크롤 막대 표시 ---------- */
  var lnb = document.querySelector('.lnb');
  var lnbList = lnb && lnb.querySelector('.lnb__list');
  if (lnbList) {
    var checkLnb = function () {
      var track = lnbList.clientWidth;
      var max = lnbList.scrollWidth - track;
      lnb.classList.toggle('is-scrollable', max > 2);
      lnb.classList.toggle('is-end', lnbList.scrollLeft >= max - 2);
      if (max > 2) {
        var bar = track * track / lnbList.scrollWidth;
        lnb.style.setProperty('--lnb-bar-w', bar + 'px');
        lnb.style.setProperty('--lnb-bar-x', ((track - bar) * lnbList.scrollLeft / max) + 'px');
      }
    };
    checkLnb();
    lnbList.addEventListener('scroll', checkLnb, { passive: true });
    window.addEventListener('resize', checkLnb);
  }

  /* ---------- LNB: 현재 보고 있는 섹션 표시 ---------- */
  var lnbLinks = Array.prototype.slice.call(document.querySelectorAll('.lnb__link'));
  if (lnbLinks.length && 'IntersectionObserver' in window) {
    var setActive = function (id) {
      lnbLinks.forEach(function (link) {
        var on = link.getAttribute('href') === '#' + id;
        link.classList.toggle('is-active', on);
        if (on) {
          link.setAttribute('aria-current', 'location');
          var list = link.closest('.lnb__list');
          list.scrollLeft = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    lnbLinks.forEach(function (link) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) observer.observe(target);
    });
  }
})();
