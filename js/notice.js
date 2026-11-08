/* =========================================================
   공지사항 — 제목 검색
   목록 마크업은 notice.html 에 있습니다. 새 공지는 .notice-item 을 복사해 추가하세요.
   ========================================================= */
(function () {
  'use strict';

  var input = document.getElementById('noticeSearch');
  var items = Array.prototype.slice.call(document.querySelectorAll('.notice-item'));
  var count = document.getElementById('noticeCount');
  var empty = document.getElementById('noticeEmpty');
  if (!input || !items.length) return;

  input.addEventListener('input', function () {
    var keyword = input.value.trim();
    var shown = 0;

    items.forEach(function (item) {
      var title = item.querySelector('.notice-item__title').textContent;
      var match = !keyword || title.indexOf(keyword) > -1;
      item.hidden = !match;
      if (match) shown += 1;
    });

    count.textContent = shown;
    empty.hidden = shown > 0;
    if (window.AOS) window.AOS.refresh();
  });
})();
