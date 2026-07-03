# ARCHITECTURE.md — 프로젝트 구조 가이드

음향 장비(스피커·앰프·DSP·소프트웨어·브랜드) 리서치 대시보드.
순수 HTML + CSS + ES6 모듈로 구성되며 빌드 도구와 외부 의존성이 없다.
`index.html` 을 로컬 서버로 열면 바로 동작한다 (예: `python -m http.server`).

이 문서는 사람과 AI 모두를 위한 코드베이스 지도다. 수정 작업 전에 "어디를
고쳐야 하는가" 섹션부터 읽으면 가장 빠르다.

> **업데이트 기록은 `CHANGELOG.md` 에 남긴다.** 기능 추가·동작 변경·버그
> 수정 등 사용자가 체감할 수 있는 변경을 했다면, 작업을 마칠 때 반드시
> `CHANGELOG.md` 최상단에 새 버전 섹션(또는 "Unreleased" 섹션)을 추가해
> 무엇을 바꿨는지 기록할 것. 다음에 이어서 개발하는 사람(사람이든 AI든)이
> 이전 세션에서 뭐가 바뀌었는지 코드를 전부 다시 훑지 않고도 파악할 수 있어야
> 한다. 단순 오타 수정처럼 사용자가 체감하지 못하는 변경은 생략해도 된다.
>
> **AI 작업 규칙은 `CLAUDE.md` 를 먼저 읽는다.** 파일시스템 접근 시 주의점,
> 이 저장소 특유의 CSS 미세조정 함정과 해법, groupBy 패턴, 검증 순서 등
> "어떻게 작업할지"에 대한 규칙이 정리되어 있다.

---

## 1. 디렉터리 구조

```
manufacturer-research-main/
├── index.html                     # 앱 골격 (뷰 컨테이너 + CSS/JS 로드만)
├── ARCHITECTURE.md                # 이 문서
├── CHANGELOG.md                   # 버전별 업데이트 기록 (★수정 후 반드시 갱신)
├── assets/                        # 폰트(woff2)·제품 이미지(webp)
├── css/
│   ├── tokens.css                 # 디자인 토큰 (모든 색·서체 변수) ★색 바꾸려면 여기
│   ├── fonts.css                  # @font-face 정의
│   ├── base.css                   # 리셋 + 전역 규칙 (word-break 등)
│   ├── layout.css                 # 페이지 골격: .topbar .legend .content-wrap
│   ├── nav.css                    # 상단 탭: .topnav
│   └── components/
│       ├── controls.css           # .controls .search-box .select .btn .filter-panel .chip .range-slider
│       ├── card.css               # .card-grid .card-group .card .eyebrow .spl-meter .stat-grid .empty-state
│       ├── spec-table.css         # .spec-table .match-table .freq-* .section-label .footnote
│       ├── modal.css              # .modal-overlay .modal
│       ├── split-view.css         # .split-view (.modal--split)
│       └── brand.css              # .brand-page .timeline
├── js/
│   ├── main.js                    # 진입점: 도메인 등록 + 라우터/모달/내비 부팅
│   ├── core/                      # 도메인 지식이 없는 순수 엔진
│   │   ├── dom.js                 #   $ / $all / esc / uniq 헬퍼
│   │   ├── state.js               #   도메인별 상태 컨테이너 (검색어/칩/범위/정렬)
│   │   ├── filter-engine.js       #   schema 기반 범용 필터/정렬
│   │   └── router.js              #   해시 라우터 (탭 전환 + URL 동기화)
│   ├── ui/                        # 도메인 비의존 UI 위젯
│   │   ├── nav.js                 #   탭 바 렌더링
│   │   ├── filters.js             #   칩 + 범위 슬라이더 필터 패널
│   │   ├── card-grid.js           #   그리드/그룹/빈결과 렌더러
│   │   ├── modal.js               #   카드형 팝업 열기/닫기
│   │   └── split-view.js          #   나란히 비교 Split View
│   ├── relationships/
│   │   └── cross-ref.js           # 도메인 간 ID 해석 (스피커↔앰프, 순환 의존 방지)
│   └── domains/                   # ★도메인 1개 = 폴더 1개 (4파일 패턴)
│       ├── speakers/
│       │   ├── speakers.controller.js   # 수명주기 + 이벤트 연결
│       │   ├── speakers.schema.js       # 필터/정렬/파생 필드 규칙
│       │   ├── speakers.view.js         # 카드/모달 HTML 생성 (순수 함수)
│       │   ├── speakers.data.js         # 브랜드 배럴 (la + db 결합)
│       │   └── data/
│       │       ├── la.data.js           # L-Acoustics 배럴 (시리즈 결합)
│       │       ├── la/                  # ★시리즈별 데이터 파일
│       │       │   ├── k-series.data.js   (K1, K2, K3, KS28 ...)
│       │       │   ├── l-series.data.js / s-series.data.js / a-series.data.js
│       │       │   ├── x-series.data.js / subwoofers.data.js
│       │       ├── db.data.js           # d&b 배럴
│       │       └── db/
│       │           ├── sl-series.data.js  (GSL/KSL/XSL)
│       │           └── cl-series.data.js  (CCL)
│       ├── amplifiers/ …               # 같은 4파일 패턴 (data/: 브랜드별)
│       ├── dsps/ … · software/ … · brand/ …
└── tests/
    ├── amp.test.mjs               # 데이터 무결성/크로스레퍼런스 테스트 (12개)
    ├── class-audit.mjs            # CSS↔JS 클래스명 교차 검증
    └── smoke.test.mjs             # jsdom 통합 스모크 테스트 (22개)
```

---

## 2. 핵심 아키텍처 패턴

### 도메인 자기등록 (self-registration)
각 도메인 controller 는 `initXxxDomain()` 에서 `registerDomain(key, { label,
mount, unmount, count })` 로 라우터에 스스로 등록한다. 탭 바(ui/nav.js)는
등록 목록에서 자동 생성되므로 **탭 추가 시 nav 코드 수정이 필요 없다**.

### schema 주도 범용 엔진
`core/filter-engine.js` · `ui/filters.js` · `ui/card-grid.js` 는 "스피커"라는
개념을 모른다. 도메인의 `*.schema.js` 가 선언한 `searchFields / chipFields /
rangeFields / sorters` 만 읽는다. → **필터 하나 추가 = schema 에 항목 1개 추가**.

### view 는 순수 함수
`*.view.js` 의 `cardHTML(item)` / `modalBodyHTML(item)` 은 DOM 을 만지지 않고
HTML 문자열만 반환한다. 이벤트 연결은 controller 몫. 덕분에 A 도메인 모달
안에 B 도메인 상세를 띄우는 Split View 가 controller 간 결합 없이 가능하다.

### 제품 이미지 다중 뷰 (getViews 패턴)
스피커·앰프 두 도메인 모두 각자의 `*.view.js`에 동일한 `getViews(item)`
헬퍼를 갖는다: `item.views` 배열(`[{label, src}, ...]`)을 우선 쓰고, 없으면
레거시 `img`+`imgBack` 필드를 자동으로 같은 구조로 변환한다. 뷰가 2개 이상
이면 카드는 Front→(두 번째 뷰) 호버 크로스페이드(`card__img--front`/
`--back`), 모달은 뷰 개수만큼 전환 버튼이 자동 생성된다
(`js/ui/modal.js`의 `wireViewSwitch()`가 도메인 무관하게 동작). 모달 이미지는
추가로 마우스 커서 위치를 따라가는 확대(zoom) 인터랙션도 공통 지원한다
(`wireMediaZoom()` + `modal.css`의 `--zoom-x`/`--zoom-y` 변수).

### cross-ref 레지스트리
스피커 데이터는 앰프 모델명 문자열만 갖고 있다. `relationships/cross-ref.js`
에 각 도메인이 데이터를 등록하면 `resolveAmpIdForModel()` 등으로 상대 레코드를
찾는다. 데이터 모듈끼리 직접 import 하지 않아 순환 의존이 없다.
정적 필드(예: 앰프의 `relations.speakerIds`)가 비어있거나 오래된 경우를 대비해
`findSpeakersMatchingAmp(ampId)` / `findAmpConfigsBySpeaker(ampId)` 처럼 상대
도메인의 원본 데이터를 역스캔해 항상 최신 상태로 동적 계산하는 함수도 있다 —
정적 필드에 의존하지 말고 이 방식을 우선 고려할 것(예: 앰프 모달의 Matched
Speakers/Configurations는 스피커 쪽 `amps[]`를 역해석해서 채워진다).

### 모달 + Split View 흐름
1. 카드 클릭 → `openModalWith(color, head, body)` (ui/modal.js)
2. 모달 안의 연관 항목(앰프 행/스피커 칩) 클릭 → `openSplitPane({ headHTML,
   paneColor, bodyHTML, paneId })` (ui/split-view.js)
   → 기존 모달 내용이 pane 1 로 감싸지고 pane 2 가 옆에 추가됨 (`.modal--split`)
   → `headHTML` 은 각 도메인 `modalBodyHTML()` 이 반환하는 `head`(pane1과
   동일한 `.modal__head` 마크업)를 그대로 넘긴다 — pane1/pane2 가 항상 같은
   헤더 레이아웃(닫기 버튼 위치, 제목 표기 방식)을 갖도록 하기 위함
3. 다른 연관 항목 클릭 → pane 2 만 교체 · 같은 대상을 다시 클릭(`paneId` 일치)
   → pane 2 토글 닫기 · 좁은 화면 → CSS 가 세로 스택 전환
4. pane1 은 `--pane1-w`, pane2 는 `--pane2-w` CSS 변수로 폭이 고정되어(각 600px/
   560px) 전환 시 리플로우가 일어나지 않는다(split-view.css 참고)

---

## 3. CSS 규칙

### BEM 네이밍
`블록__요소--변경자` 표기를 따른다.
예: `.spec-table__cell--full`, `.topnav__tab--active`, `.match-table__row--clickable`
- 상태는 변경자 클래스(`.modal-overlay--open`) 또는 ARIA 속성(`[aria-pressed="true"]`)으로 표현
- 제조사 색은 `--mfr` CSS 변수를 카드/모달/pane 에 인라인 주입해 내려보낸다

### 레이아웃 안정성 (텍스트 길이 무관 구조 유지)
`[레이아웃 안정성]` 주석이 붙은 규칙들이 담당한다. 핵심 기법:
- `body { word-break: keep-all }` — 한국어 어절 중간 개행 방지 (+ `overflow-wrap: break-word`)
- 고정 비율 그리드 — `.stat-grid`(1.5fr 1fr 1fr), `.match-table__row`(6열 fr), `.spec-table`(1fr 1fr)
  → `table-layout: fixed` 와 동일 효과. 셀 내용이 길어도 컬럼 폭 불변.
  `.match-table__row`(6열)는 스피커 모달(Amplifier Matching)과 앰프 모달
  (Configurations)이 구조를 공유하지만, 왼쪽 열 콘텐츠 길이가 서로 반대라
  (앰프 쪽은 짧은 앰프 모델명, 스피커 쪽은 더 긴 스피커 모델명) 열 비율은
  `.match-table--amp-view` 변경자로 앰프 쪽만 따로 재정의한다(스피커 모달은
  기본 비율 그대로).
- `min-width: 0` — flex/grid 자식의 축소 허용 (말줄임이 동작하기 위한 전제)
- `white-space: nowrap + overflow: hidden + text-overflow: ellipsis`
  — 카드 제목·표 셀·칩·탭 등 한 줄 요소 전부
- `.card__config` 2줄 고정(`-webkit-line-clamp: 2` + `min-height`) — 카드 높이 균일
- `.card__media`(132px)·`.modal__media`(190px) 고정 높이 — 이미지 유무와 무관한 리듬

### 파일 로드 순서 (index.html)
`tokens → fonts → base → layout → nav → components/*` — 토큰이 항상 먼저.

---

## 4. 확장 방법 (자주 하는 작업)

### 새 스피커 모델 추가
해당 시리즈 파일에 객체 1개 추가: `js/domains/speakers/data/la/x-series.data.js` 등.
필드 구조는 같은 파일의 기존 항목을 복사해 수정하면 된다.

### 새 시리즈 추가
1. `js/domains/speakers/data/<브랜드>/<시리즈>.data.js` 생성 (`export const XX_YY_SERIES = [...]`)
2. 브랜드 배럴(`data/la.data.js` 등)에 import + spread 한 줄씩 추가

### 새 브랜드(제조사) 추가
1. `data/<브랜드키>/` 폴더 + 시리즈 파일 + 배럴 `data/<브랜드키>.data.js` 생성
2. `speakers.data.js` 에 spread 추가
3. `speakers.schema.js` 의 `MFR` 맵과 `MK_ORDER` 에 항목 추가
4. `css/tokens.css` 에 브랜드 색 변수 추가 (예: `--jbl: #...`)
5. 브랜드 탭에도 노출하려면 `brand.data.js` + `brand.schema.js` 의 `BRAND_MFR` 에 추가

### 새 도메인(탭) 추가
1. `js/domains/<이름>/` 에 controller / schema / view / data 4파일 생성
   (기존 dsps 폴더가 가장 단순한 템플릿)
2. `main.js` 에 import + `initXxxDomain()` 호출 추가
3. `index.html` 의 `<main>` 에 `<div id="view-<이름>" hidden></div>` 추가

### 필터 추가
`*.schema.js` 의 `chipFields`(선택형) 또는 `rangeFields`(범위형)에 항목 추가.
데이터에 없는 파생 값이 필요하면 `normalizeCrossover` 패턴처럼 로드 시
파생 필드를 만들어 붙인다.

---

## 5. 테스트 / 검증

```bash
node tests/amp.test.mjs      # 데이터 무결성 (ID 중복·크로스레퍼런스 대칭성 등)
node tests/class-audit.mjs   # CSS↔JS 클래스명 정합성 (오타·죽은 클래스 감지)
npm i jsdom && node tests/smoke.test.mjs   # 통합 스모크 (부팅·모달·Split View·탭 전환)
```

CSS 클래스를 추가/변경했다면 `class-audit`, 동작 코드를 바꿨다면 `smoke` 를
꼭 돌려볼 것. 셋 다 문제 시 종료 코드 1 을 반환한다.

---

## 6. 수정 위치 빠른 찾기 (AI 프롬프트용 치트시트)

| 하고 싶은 것 | 수정할 파일 |
|---|---|
| 색상·서체 변경 | `css/tokens.css` |
| 카드 모양 변경 | `css/components/card.css` + `domains/*/**.view.js` 의 `cardHTML` |
| 모달 내용 변경 | `domains/<도메인>/<도메인>.view.js` 의 `modalBodyHTML` |
| 모달 열림/닫힘 동작 | `js/ui/modal.js` |
| Split View 동작 | `js/ui/split-view.js` (+ `css/components/split-view.css`) |
| 필터 항목 추가/변경 | `domains/<도메인>/<도메인>.schema.js` |
| 정렬 옵션 추가 | schema 의 `sorters` + controller 의 `<select>` 옵션 |
| 검색 규칙 변경 | schema 의 `searchFields` / `customSearchMatch` |
| 제품 데이터 수정 | `domains/<도메인>/data/**` (시리즈별 파일) |
| 탭 순서 변경 | `main.js` 의 init 호출 순서 |
| 그룹핑(제조사/시리즈·타입 묶음) 로직 | 각 도메인 `*.controller.js` 의 `renderGrid` `groupBy` 옵션 (speakers=제조사>시리즈, amplifiers=제조사>type, dsps=제조사>category, software=제조사>type) |
| 텍스트 넘침/줄바꿈 문제 | 관련 컴포넌트 CSS 의 `[레이아웃 안정성]` 주석 지점 |
