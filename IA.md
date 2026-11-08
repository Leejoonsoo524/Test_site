# 해향 해금학원 — IA (v0.2)

## 사이트맵

| 1Depth | 2Depth | URL | 비고 |
|---|---|---|---|
| 0. 메인 | — | index.html | 레슨과정 / 입시 배너 / 공지·영상 / 주요활동 / 오시는길 |
| 1. 학원소개 | 인사말 | about.html#greeting | |
| | 강사진 | about.html#teachers | |
| | 시설안내 | about.html#facility | |
| | 주요활동 | about.html#activity | 공연 · 축하연주 · 특강·출강 · 악기대여 (원장 활동 소개) |
| 2. 레슨과정 | 1:1 레슨 | lesson.html#private | 형태별 |
| | 그룹레슨 | lesson.html#group | 형태별 |
| | 원데이클래스 | lesson.html#oneday | 형태별 |
| | 초등레슨 | lesson.html#kids | 대상별 |
| | 성인레슨 | lesson.html#adult | 대상별 |
| 3. 입시안내 | 입시레슨 | admission.html#lesson | |
| | 입시요강·일정 | admission.html#guide | |
| | 합격실적 | admission.html#result | |
| 4. 공지사항 | — | notice.html | |
| 5. 수업영상 | — | video.html | 페이지 내 필터(레슨/공연/입시) |
| 6. 오시는길 | — | location.html | |
| (유틸) 상담신청 | — | contact.html | GNB 미노출 · 헤더 버튼 / 플로팅 버튼 / 모바일 메뉴 하단으로 진입 |

## 변경 이력

### v0.2
- 1Depth **문의 삭제** → 헤더 **상담신청** 버튼으로 상담폼 페이지에 바로 연결
- 기존 문의 2Depth(공연·축하연주·악기대여·특강)는 **학원소개 > 주요활동**으로 이동
  - 문의 창구가 아니라 원장의 활동을 소개하는 콘텐츠로 성격 변경
  - 하단 한 줄로 "관련 문의는 상담신청으로" 안내
- 상담신청 폼의 상담 분야: 레슨 / 입시 / 원데이클래스 / 공연·축하연주 / 특강·출강 / 악기대여 / 기타

### v0.1
- 입시레슨 → 입시안내로 이동 (레슨과정과 중복 방지)
- 레슨과정 형태별 / 대상별 묶음 표기

## 파일 구조 (v0.3)

| 구분 | 파일 | 역할 |
|---|---|---|
| 공통 CSS | css/common.css | 변수·리셋·버튼·헤더/GNB·서브비주얼·LNB·푸터 |
| 페이지 CSS | css/[페이지명].css | index · about · lesson · admission · notice · video · location · contact · credits |
| 공통 JS | js/common.js | 헤더 스크롤, 모바일 메뉴, LNB 현재 위치 |
| 페이지 JS | js/main.js · js/notice.js · js/video.js · js/contact.js | 메인 레슨 이미지 전환 · 공지 검색 · 영상 필터 · 폼 확인 |

- 모든 마크업(헤더·GNB·푸터 포함)은 각 HTML에 정적으로 작성되어 있으며, 인라인 style/script는 사용하지 않습니다.
- 메뉴를 바꿀 때는 모든 HTML의 `<header>`와 `<footer>`를 함께 수정해야 합니다.
- 반응형 기준: 1400 / 1200 / 1024 / 768 (각 CSS 파일 하단 `@media (max-width: …)`)
- 클래스 이름: BEM 방식 (`블록__요소--변형`)
- 호버 규칙: 버튼은 마우스를 올리면 빨간색(`.btn--outline`), 카드·목록은 `.hover-card` 클래스를 붙이면 배경 전체 빨간색 + 흰 글자로 바뀝니다. 검은색은 글자색으로만 씁니다.
- 스크롤 등장 효과: AOS 2.3.4 (cdnjs). 요소에 `data-aos="fade-up"` 등을 붙이고 `data-aos-delay`로 순서를 줍니다. 초기화는 js/common.js, JS가 꺼진 환경은 css/noscript.css 로 보이게 처리합니다.
- index-video.html: index.html 복사본에서 메인 비주얼을 한 화면 가득 동영상(문구 없음)으로 바꾼 버전 (css/index-video.css · js/index-video.js 추가 연결). 학원 영상은 assets/video/hero.mp4 로 넣고 source 를 교체합니다.
