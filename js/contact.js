/* =========================================================
   상담신청 — 필수 항목 확인
   실제 전송(이메일 / 폼 서비스 / 백엔드)은 아직 연결되지 않았습니다. TODO 위치에 연결하세요.
   ========================================================= */
(function () {
  'use strict';

  var form = document.getElementById('consultForm');
  var msg = document.getElementById('formMsg');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var fields = Array.prototype.slice.call(form.querySelectorAll('[required]'));
    var invalid = null;

    fields.forEach(function (field) {
      var empty = field.type === 'checkbox' ? !field.checked : !field.value.trim();
      field.setAttribute('aria-invalid', String(empty));
      if (empty && !invalid) invalid = field;
    });

    if (invalid) {
      msg.className = 'consult-form__msg is-error';
      msg.textContent = '필수 항목을 확인해 주세요.';
      invalid.focus();
      return;
    }

    // TODO: 실제 전송 연결
    msg.className = 'consult-form__msg is-success';
    msg.textContent = '상담 신청이 접수되었습니다. (데모: 전송 기능 미연결)';
    form.reset();
    fields.forEach(function (field) { field.removeAttribute('aria-invalid'); });
  });
})();
