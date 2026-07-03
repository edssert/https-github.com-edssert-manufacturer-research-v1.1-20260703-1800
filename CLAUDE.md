# CLAUDE.md — 이 프로젝트에서 작업할 때의 규칙

이 문서는 사람이 아니라 다음 세션의 AI(Claude)를 위한 것이다. 코드가 "무엇인지"는
`ARCHITECTURE.md`, "무엇이 바뀌었는지"는 `CHANGELOG.md`를 본다. 이 문서는
"어떻게 작업해야 하는지" — 이 저장소 특유의 함정과 이 세션에서 사용자와 합의된
작업 방식을 담는다.

---

## 1. 파일을 읽을 때 — Read 도구가 항상 진실

이 프로젝트는 Windows 파일시스템(`C:\Users\edssert\Desktop\manufacturer-research-main`)에
있고, bash 셸은 별도 Linux 마운트(`/sessions/.../mnt/manufacturer-research-main/`)를
통해 접근한다. **이 마운트는 스테일 캐시를 반환하는 경우가 반복적으로 발생했다**
(예: 실제 302줄짜리 파일이 bash `wc -l`에서는 202줄로 잘려 보임, `python3 -c`로 읽은
내용이 오래된 스냅샷인 경우).

- 파일 내용을 확인하거나 수정 전 최신 상태를 볼 때는 **항상 `Read` 도구**를 쓴다.
  `Read`는 Windows 파일시스템에 직접 접근하므로 항상 정확하다.
- bash(`mcp__workspace__bash`)는 `node --check`(문법 검증), 순수 로직을 발췌해
  독립적으로 테스트하는 스크립트 실행, `npm`/`node` 실행 등 **파일 내용 자체를
  신뢰하지 않아도 되는 작업**에만 보조적으로 쓴다.
- bash로 파일을 읽어서 뭔가 이상하면(줄 수가 안 맞음, 최근에 한 수정이 없음)
  먼저 캐시 문제를 의심하고 `Read`로 재확인할 것 — 실제로 코드가 잘못됐다고
  오판하지 않도록 주의.

## 2. 이 프로젝트의 핵심 설계 원칙 (수정 시 지킬 것)

- **레이아웃 안정성**: 텍스트 길이·데이터 유무와 무관하게 UI 크기가 흔들리지
  않아야 한다. 고정 grid 비율, `min-width: 0` + ellipsis, 고정 높이 등은
  `[레이아웃 안정성]` 주석과 함께 의도적으로 넣은 것 — 이유 없이 없애지 말 것.
  (자세한 기법 목록은 `ARCHITECTURE.md` §3 참고.)
- **view는 순수 함수**: `*.view.js`의 `cardHTML`/`modalBodyHTML`은 HTML 문자열만
  반환하고 DOM을 만지지 않는다. 이벤트 연결은 항상 controller가 담당.
- **정적 필드보다 동적 계산 우선**: 스피커↔앰프처럼 서로를 참조하는 데이터는
  한쪽에만 원본을 두고(예: 스피커의 `amps[]`), 반대 방향은 cross-ref의
  `find*By*()` 함수로 매번 다시 계산한다. 정적 필드(`relations.speakerIds` 등)를
  직접 채워 넣는 방식은 데이터가 바뀌면 어긋나므로 지양.
- **중복 정보 생략**: 같은 값을 두 군데(예: Low Driver와 Transducers)에 표시하게
  되면 하나를 조건부로 생략한다(`otherBandCount()` 같은 헬퍼 재사용). 새 필드를
  추가하기 전에 기존 필드와 의미가 겹치지 않는지 확인할 것.
- **재사용 가능한 헬퍼는 파라미터화**: 모달과 카드처럼 비슷한 마크업을 두 곳에
  쓸 때는 `titleTagsHTML(d, wrapClass, tagClass)`처럼 클래스명을 인자로 받게
  만든다 — `.replace()`로 클래스를 바꿔치기하는 방식은 쓰지 않는다.

## 3. CSS 작업 시 자주 나오는 요청 패턴과 해법

이 세션에서 반복됐던 미세조정 요청과 실제 원인:

- **"두 요소가 나란히 있는데 세로 정렬이 안 맞아 보인다"** → 대개
  `align-items: flex-start`(또는 `baseline`)가 원인. `center`로 바꾸면 대부분
  해결. `inline-block`으로 텍스트를 감싼 배지는 `inline-flex` + `align-items:
  center`로 바꾸면 내부 텍스트도 박스 정중앙에 온다.
- **"버튼 안 아이콘이 중앙이 아닌 것 같다"** → SVG는 기본 `display: inline`이라
  baseline 정렬의 영향을 받는다. `display: block`으로 바꾸고 부모를 flex
  중앙정렬하면 해결.
  즉 절대 `line-height: 0` 같은 걸 얹지 말고 svg를 block으로.
- **"두 요소의 곡률(모서리 둥글기)이 달라 어색하다"** → 인접한 두 UI 요소는
  `border-radius`를 통일해야 한다(완전 알약형 999px vs 각진 6~8px 등 섞지
  말 것).
- **"글자 크기가 다른 곳과 안 맞는다"** → 부모에 `font-size`를 직접 고정하고
  자식 요소는 `em` 배수로만 지정하는 패턴을 쓴다. 이러면 어떤 컨텍스트에
  놓여도 항상 같은 실제 렌더 크기가 나온다(`.card__low-badge` 참고).
- **"두 컨테이너의 우측(혹은 좌측) 끝이 안 맞는다"** → 두 컨테이너의 실제
  padding 값을 먼저 정확히 계산해서 비교할 것. 어림짐작으로 padding을
  더하지 말고, 관련된 모든 CSS 규칙(부모 padding + 자식 padding + 절대위치
  오프셋)을 다 읽고 합산해야 한다 — 이 세션에서 X 버튼/태그 정렬을 여러 번
  반복 수정한 이유가 이 계산을 처음에 정확히 안 해서였다.
- **"탭을 옮기면 사이트 전체가 좌우로 흔들린다"** → 스크롤바 유무에 따른
  뷰포트 폭 변화가 원인. `html { scrollbar-gutter: stable; overflow-y: scroll; }`
  로 스크롤바 자리를 항상 고정 확보한다(`base.css`에 이미 적용됨).

## 4. groupBy(제조사별/시리즈별 그룹 헤더) 패턴

스피커 탭에서 시작된 "제조사 뱃지 + 분류명 + 개수" 그룹 헤더
(`.card-group__badge` + `.card-group__title` + `.card-group__count`)를
amplifiers/dsps/software 탭에도 동일하게 적용해뒀다. 새 도메인을 추가하거나
그룹핑 기준을 바꿀 때는 이 패턴을 따른다:

```js
groupBy: state.sort === "<그룹정렬키>" ? {
  order: MK_ORDER,                    // 제조사 표시 순서
  getKey: d => d.mfr,                 // 1차 그룹 키
  subGroupKey: d => <분류값 || 기본값>, // 2차 그룹 키 (필드 없으면 기본값 채우기)
  subGroupOrder: (a, b) => a.localeCompare(b),
  sortWithinGroup: (a, b) => a.name.localeCompare(b.name),
  headHTML: (mfr, sub, group) => `<span class="card-group__badge card-group__badge--name" ...>...</span><span class="card-group__title">${esc(sub)}</span><span class="card-group__count">${group.length} ea</span>`,
} : null
```

분류 필드가 일부 데이터에만 있을 때(예: 앰프의 `type`)는 `d.type || "Amplifier"`
처럼 의미 있는 기본값을 정해서 채운다 — 이유 없이 "Unknown"이나 빈 그룹으로
두지 않는다.

## 5. 검증 순서 (수정 후 매번)

1. `Read`로 수정한 파일이 의도대로 반영됐는지 재확인 (bash로 재확인하지 않기 —
   위 §1 참고. Edit/Write가 성공했다면 이미 반영된 것이므로 굳이 다시 읽지
   않아도 되지만, 여러 Edit이 겹친 복잡한 변경은 최종 상태를 한 번 봐도 좋다).
2. 순수 로직(HTML 문자열을 만드는 함수 등)은 필요시 bash에서 함수만 발췌해
   Node로 독립 실행해 출력을 확인한다(이 세션에서 `titleTagsHTML` 등에 사용한
   방식 — `/tmp` 등에 미니 스크립트를 만들어 `node`로 실행).
3. CSS/HTML 구조 변경은 `node --check`로 JS 문법만이라도 검증한다.
4. 데이터/크로스레퍼런스를 건드렸다면 `tests/amp.test.mjs`, CSS 클래스를
   추가/변경했다면 `tests/class-audit.mjs`, 동작 코드를 바꿨다면
   `tests/smoke.test.mjs`를 돌린다(ARCHITECTURE.md §5).
5. 작업이 사용자가 체감할 수 있는 변경이면 `CHANGELOG.md` 최상단 버전 섹션에
   무엇을·왜 바꿨는지 기록한다(이 세션 내내 유지해온 패턴 — 다음 세션이 코드를
   전부 다시 훑지 않고도 맥락을 알 수 있어야 한다).

## 6. 사용자와의 커뮤니케이션 스타일

- 사용자는 한국어로 짧고 구어체로 요청하며, 스크린샷을 자주 첨부해 "여기가
  이상하다"는 식으로 지적한다. 스크린샷의 시각적 디테일(정렬, 곡률, 크기 비교)을
  꼼꼼히 읽고 정확한 원인을 찾을 것 — 추측으로 여러 값을 한 번에 바꾸기보다
  원인 하나를 정확히 짚고 최소 수정으로 대응한다.
- 요청이 모호하면(예: "여기도 저기처럼 해줘") 실제 대상이 무엇인지
  AskUserQuestion으로 먼저 확인한다 — 이 세션에서 "사진 옆"이라는 표현을
  잘못 해석해 media 오버레이로 구현했다가 되돌린 사례가 있었다.
- 응답은 간결하게, 불필요한 설명 없이. 완료 후 무엇을 했는지 1~2문장으로만
  요약한다.
