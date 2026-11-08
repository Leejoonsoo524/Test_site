/* =========================================================
   index-video.html — 메인 비주얼 배경 영상
   자동재생 · 일시정지/재생 버튼 · 모션 최소화 설정 시 자동재생 안 함
   ========================================================= */
(function () {
  'use strict';

  var video = document.getElementById('heroVideo');
  var btn = document.getElementById('heroVideoBtn');
  if (!video || !btn) return;

  var label = btn.querySelector('.sr-only');

  var setPaused = function (paused) {
    btn.setAttribute('aria-pressed', String(paused));
    label.textContent = paused ? '배경 영상 재생' : '배경 영상 일시정지';
  };

  // 자동재생: 소리 없는 배경 영상이라 바로 재생합니다. (모션 최소화 설정이면 정지 상태로 둠)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setPaused(true);
  } else {
    var playing = video.play();
    if (playing && playing.catch) playing.catch(function () { setPaused(true); });
  }

  btn.addEventListener('click', function () {
    if (video.paused) {
      video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  });
})();
