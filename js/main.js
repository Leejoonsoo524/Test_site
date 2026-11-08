/* =========================================================
   index.html — 메인 비주얼 슬라이드
   5초마다 다음 사진으로 바뀝니다. 마우스를 올리거나 키보드 포커스가 있으면 멈춥니다.
   모션 최소화 설정을 켠 사용자에게는 자동으로 넘기지 않습니다.
   ========================================================= */
(function () {
  'use strict';

  var media = document.querySelector('.main-visual__media');
  if (!media) return;
  var slides = Array.prototype.slice.call(media.querySelectorAll('.main-visual__slide'));
  var dots = Array.prototype.slice.call(media.querySelectorAll('.main-visual__dot'));
  if (slides.length < 2) return;

  var DELAY = 5000;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = 0;
  var timer = null;

  var show = function (index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      var on = i === current;
      slide.classList.toggle('is-active', on);
      slide.setAttribute('aria-hidden', String(!on));
    });
    dots.forEach(function (dot, i) {
      var on = i === current;
      dot.classList.toggle('is-active', on);
      if (on) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current');
    });
  };

  var stop = function () { clearInterval(timer); timer = null; };
  var play = function () {
    if (reduceMotion || timer) return;
    timer = setInterval(function () { show(current + 1); }, DELAY);
  };

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { show(i); });
  });

  media.addEventListener('mouseenter', stop);
  media.addEventListener('mouseleave', play);
  media.addEventListener('focusin', stop);
  media.addEventListener('focusout', play);
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else play(); });

  show(0);
  play();
})();

/* =========================================================
   index.html — 레슨과정 이미지 전환
   목록 항목에 마우스를 올리거나 키보드로 포커스하면 오른쪽 사진이 바뀝니다.
   (1024px 이하에서는 각 항목 안의 작은 사진이 대신 보입니다.)
   ========================================================= */
(function () {
  'use strict';

  var links = Array.prototype.slice.call(document.querySelectorAll('.lesson-explorer__link'));
  var images = Array.prototype.slice.call(document.querySelectorAll('.lesson-explorer__image'));
  if (!links.length || !images.length) return;

  var desktop = window.matchMedia('(min-width: 1025px)');

  var activate = function (index) {
    links.forEach(function (link, i) { link.classList.toggle('is-active', desktop.matches && i === index); });
    images.forEach(function (image, i) { image.classList.toggle('is-active', i === index); });
  };

  links.forEach(function (link, i) {
    link.addEventListener('mouseenter', function () { activate(i); });
    link.addEventListener('focus', function () { activate(i); });
  });

  var current = function () {
    var active = 0;
    images.forEach(function (image, i) { if (image.classList.contains('is-active')) active = i; });
    return active;
  };

  activate(0);
  desktop.addEventListener('change', function () { activate(current()); });
})();
