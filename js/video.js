/* =========================================================
   수업영상 — 분류 필터
   목록 마크업은 video.html 에 있습니다. data-category 값으로 분류합니다.
   ========================================================= */
(function () {
  'use strict';

  var buttons = Array.prototype.slice.call(document.querySelectorAll('.video-filter__btn'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.video-card'));
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      cards.forEach(function (card) {
        card.hidden = filter !== 'all' && card.getAttribute('data-category') !== filter;
      });
      if (window.AOS) window.AOS.refresh();
    });
  });
})();
