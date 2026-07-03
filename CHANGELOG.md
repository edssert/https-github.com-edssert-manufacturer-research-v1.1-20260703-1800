# CHANGELOG.md — 버전별 업데이트 기록

이 문서는 프로젝트의 버전별 변경사항을 기록한다. 최신 버전이 맨 위에 온다.

**새로운 개발 세션이나 버전업을 진행할 때는 이 파일 최상단에 새 버전 섹션을
추가해 무엇을 바꿨는지 반드시 기록할 것.** 형식은 아래 v1.1 항목을 참고.

---

## v1.1 (2026-07-03)

카드/모달 UI 다듬기, 필터 확장, 제품 이미지 정리·구조 개편, 다중 이미지 뷰
(Front/Rear/Array) 기능 추가, L-Acoustics 앰프 데이터를 상세 스펙 구조로 전면 개편.

### 추가
- **스피커 모달 Weight/Dimensions mm↔in 토글**: 두 값을 한 셀에 항상 병기하던
  Dimensions 텍스트가 길어 표가 흐트러지던 것을, mm/in 버튼으로 하나씩만
  보여주도록 개선(`dims-unit-switch`, `js/ui/modal.js`의
  `wireDimsUnitSwitch()`). Weight와 Dimensions는 항상 같은 행에 나란히
  붙는 고정 쌍(`data-pin="weightdims"`)으로 만들어 다른 셀이 사이에 끼어
  갈라놓지 않게 했고, Dimensions 라벨 옆에 "(W×H×D)" 축(순서) 힌트를 추가
  (`weightDimsRow()`, `speakers.view.js`).
- **RMS Power Handling(Max Watt) Active/Passive 표시 분리**: K1처럼
  LF/MF/HF 대역별 소비 전력(`wattByBand`)이 있는 Active 스피커는 Total과
  밴드별 값을 항상 같은 행에 나란히 붙는 고정 쌍으로, 밴드별 값이 없는
  Passive 스피커는 다른 항목과 우연히 병합되지 않도록 무조건 한 행 전체
  (`--full`)를 차지하도록 분리(`maxWattRow()`). By Band 안에는 라벨에 이미
  "RMS"가 들어가 있어 중복되는 "RMS" 단어를 생략.
- **2-way 이상 멀티밴드 스피커 Transducers 표시**: K1처럼 로우 대역 외에도
  MF/HF 등 대역이 2개 이상인 스피커는, 로우 드라이버 하나만 보여주는 기존
  Low Driver 행 대신 그 자리를 LF/MF/HF 배지+값 리스트(Frequency Response와
  동일한 `freq-list` 컴포넌트 재사용)로 전면 교체해 전체 대역 구성을 한눈에
  보여줌(`isMultiBand`/`transducerBandsHalfRow()`, `speakers.view.js`).
  로우 대역 하나뿐인 서브우퍼는 기존처럼 Low Driver만 표시(중복 없음).
- **라인어레이 Vertical 커버리지 숨김**: 라인어레이는 Inter-element
  Splay(선택 각도) 자체가 실질적 수직 커버리지이고, `cov.v`(예: "10°")는
  낱장 엘리먼트 하나의 고정 방사각이라 사실상 의미 없는 값(데이터상
  거의 항상 동일값)임을 확인 — splayList가 있으면 Vertical 행을 표시에서
  생략(`coverageRows()`). 필터 사이드바의 Vertical 슬라이더(`vRange`)는
  그대로 유지, 표시 로직만 조건부로 숨김.
- **d&b D40/D80/D90/40D 앰프 분리**: cl-series.data.js에서 "D40 / D80 /
  D90 / 40D"로 병합 표기되던 항목을 LA12X/LA4X 처럼 4개의 독립된 앰프
  항목으로 분리(configs는 동일하게 복제).
- **L-Acoustics 앰프 상세 스펙 표준화**: 기존 LA12X/LA4X/LA7.16/LA2Xi/LA1-16i
  (channels·powerClass·connectivity 정도의 단순 필드)를 전부 제거하고, 제조사
  스펙시트 수준의 상세 구조를 가진 LA1.16i 1개로 교체. `mains`(전원)·`io`(입출력)·
  `output`(출력)·`dsp`(신호처리)·`ecosystem`(연동 소프트웨어)·`features`(기능
  목록)·`note`(모델 타입/보호회로/인터페이스 설명) 등 중첩 필드를 신설했고,
  이 구조를 앞으로 추가되는 모든 L-Acoustics 앰프의 표준 스키마로 채택
  (`js/domains/amplifiers/data/la.data.js`). 모달에는 Mains/I·O/Output/DSP/
  Ecosystem/Features/Notes & Protection 섹션이 값이 있는 것만 자동으로
  나타나도록 구현해, 이 상세 필드가 없는 기존 d&b 앰프의 모달은 예전과 동일하게
  표시됨(`amplifiers.view.js`의 `detailSection()`이 빈 섹션을 자동 생략).
  필터에 Usage(Installation only 등) 칩도 추가.
- 이 앰프 개편에 따라 L-Acoustics 스피커 데이터(K/L/X/S/A Series·Subwoofers,
  총 6개 시리즈 파일)에서 삭제된 앰프를 참조하던 `relations.ampIds`·`amps`·
  `ampRaw` 필드를 정리(빈 배열/`null`로 정규화). 스펙 수치·이미지 경로 등
  앰프와 무관한 필드는 그대로 유지.
- **앰프 매칭 표시 데이터 복구 + 클릭 가능 여부 시각 구분**: 위 정리에서
  같이 지워졌던 `amps`(모델별 configs·SPL 프리셋)·`ampRaw` 표시용 데이터를
  사용자 백업본에서 34개 스피커 전체(32개 매칭 보유, L1/L1D는 원본부터
  매칭 없음) 복구. 단 `relations.ampIds`(cross-ref 무결성 필드)는 LA12X 등
  현재 앰프 DB에 없는 구형 모델 참조를 걸러내고 실존 앰프(LA1.16i)만 남김 —
  `amps`(표시)와 `relations.ampIds`(무결성)의 책임을 분리. 앰프 매칭 표
  (match-table)에서 `resolveAmpId()`로 실제 등록된 모델만 클릭 가능하게
  구분: 클릭 가능 행은 화살표(›) 인디케이터 + hover 배경(`--clickable`),
  등록되지 않은 구형 모델 행은 모델명 색을 muted 로 낮춰 비활성처럼 보이게
  함(`--static`) — 행 자체는 지우지 않아 과거 매칭 정보는 그대로 열람 가능.
- **앰프 모달의 Matched Speakers 동적 계산**: LA1.16i는 정적 필드
  `relations.speakerIds`가 비어있어 앰프 모달에서 "매칭된 스피커가
  없습니다"로 표시되던 문제 수정. `cross-ref.js`에 `findSpeakersMatchingAmp()`
  를 신설해 스피커 쪽 `amps[].model`(이미 스피커 매칭 표가 쓰는 원본 데이터)을
  역으로 스캔, 실제 이 앰프를 매칭하는 스피커를 항상 최신 상태로 계산.
  앰프 탭 mount 시 전체 앰프의 `relations.speakerIds`를 이 값으로 동기화해
  카드의 Speakers 개수·정렬(매칭 스피커 많은순)·모달의 Matched Speakers 칩이
  모두 하나의 소스(스피커 데이터)에서 일관되게 나온다. LA1.16i는 현재
  Soka·SB10i·SB6i·X8·X6i·5XT·X4i 7개 스피커와 매칭됨.
- **Ecosystem 섹션 레이아웃**: Control Software 옆이 빈 셀로 남던 문제 수정 —
  Integrations 를 병합 셀(`--full`)에서 일반 셀로 바꿔 Control Software 와
  같은 행(2열 1행)에 나란히 배치.
- **General 섹션 Notes 행 제거**: 카드 요약에도 쓰이는 `a.notes` 문구가
  모달 General 섹션에도 중복 표시되던 것을 모달에서만 생략.
- **Matched Speakers/Configurations를 모달 상단으로 이동**: Split View 로
  스피커를 오갈 때 상세 스펙(Mains/I·O/Output/DSP/...)을 지나 스크롤해야
  하는 불편을 줄이기 위해, 두 섹션을 General 바로 아래로 재배치.
- **Configurations 표를 스피커 기준 데이터로 대체(Preset·Max SPL 포함)**:
  LA1.16i처럼 앰프 자체 `configs` 필드가 비어있어 "설정 데이터가
  없습니다"만 뜨던 문제를, 스피커 매칭 표(Amplifier Matching)가 이미 갖고
  있는 `amps[].configs`(모드·Links/ch·Max/amp·`splByPreset`의 프리셋별 Max
  SPL)를 역으로 모아서 채우도록 수정. `cross-ref.js`에
  `findAmpConfigsBySpeaker()`를 신설 — 처음에는 mode/perCh/total만 옮겨
  Preset·SPL이 빠졌던 것을 스피커 매칭 표와 동일하게 프리셋별로 펼쳐
  Preset·Max SPL 열까지 포함하도록 보강(LA1.16i 기준 27행). 왼쪽 열이
  앰프 모델명이 아니라 "이 앰프로 어떤 스피커를 어떤 모드/프리셋으로 몇
  대까지 구동해 몇 dB를 내는지" 스피커 이름이 되는 6열 표(스피커 모달의
  Amplifier Matching과 동일한 기본 `.match-table` 구조 재사용,
  `configsBySpeakerTableHTML()`)를 새로 추가하고, 행 클릭 시 Split View 로
  해당 스피커 상세를 여는 것도 기존 Matched Speakers 칩과 동일하게 지원.
  d&b 등 앰프 자체 `configs`가 이미 입력된 앰프는 기존 3열 표(모델 고정,
  `--cols-3`)를 그대로 사용.
- **Configurations 표: 스피커별 대표 행 + 접기/펼치기**: 스피커 1개가
  모드×프리셋 조합만큼(예: Soka 는 SE/BTL × 3개 프리셋 = 6행) 반복 등장해
  표가 길고 스피커 이름이 계속 반복되어 복잡해 보이던 문제 수정. 스피커별로
  Max/amp 가 가장 큰 대표 설정 1행만 기본 노출하고, 나머지는 대표 행 옆
  `+N` 토글 버튼을 눌러야 펼쳐지는 하위 행(`match-table__row--sub`)으로
  숨김. 스피커 이름 클릭(Split View 이동)과 `+N` 버튼 클릭(펼치기)의 클릭
  영역을 분리해 서로 간섭하지 않게 하고(`wireAmpConfigsToggle()`,
  `amplifiers.controller.js`), 펼친 뒤엔 버튼이 "−"로 바뀌어 다시 누르면
  접힘. LA1.16i 기준 스피커 7개·27행이 대표 7행 + 펼치면 보이는 20행으로
  요약됨.
- **버그 수정: 접힌 하위 행이 실제로는 숨겨지지 않던 문제**: 위 접기/펼치기
  구현 직후, `hidden` 속성을 줬는데도 하위 행이 화면에 그대로 보이는 버그
  발견. 원인은 `.match-table__row { display: grid }` 규칙이 브라우저 기본
  `[hidden] { display: none }` 규칙보다 우선 적용되어 `hidden` 자체가
  무시된 것 — `.match-table__row[hidden] { display: none }`을 그 뒤에
  추가해 우선순위를 명시적으로 확보(`spec-table.css`).
- **버그 수정: Configurations 표의 +N 배지·› 화살표 세로 정렬 어긋남**:
  스피커 이름 길이(SB10i·Soka·X6i 등)가 제각각이라 이름 뒤에 바로 붙는 +N
  토글 배지와 › 화살표가 행마다 다른 x좌표에 위치해 세로선이 어긋나 보이던
  문제 수정. `.match-table__cell--model`을 flex 컨테이너로 바꾸고 이름을
  `<span class="match-table__model-name">`으로 감싸 `margin-right: auto`를
  줌 — 아이템이 2개(이름+화살표)든 3개(이름+토글배지+화살표)든 배지·화살표가
  항상 셀 오른쪽 끝에 나란히 모이고 중간에 벌어지지 않는다. 이름이 길면
  이름 쪽만 말줄임(ellipsis)되어 정렬은 그대로 유지됨.
- **버그 수정: +N 배지 크기 들쭉날쭉 + Links/ch·Max/amp 헤더 잘림**:
  토글 배지가 자릿수(+1 vs +5)에 따라 폭이 달라 보이던 것을 `min-width:
  26px` + `font-variant-numeric: tabular-nums`로 고정폭 처리. 동시에
  Links/ch·Max/amp·Max SPL 헤더 텍스트가 좁은 열 폭에서 "LINKS/..."/
  "MAX/A..."로 잘리던 문제를, `match-table__row`의 6열 grid 비율을
  `1.1fr .75fr 1fr .65fr .65fr .75fr`에서 `1.25fr .7fr .95fr .85fr .8fr
  .75fr`로 재조정(Links/ch·Max/amp 열에 더 여유를 주고 Mode 열은 줄임)하고
  헤더 letter-spacing 을 `.1em`→`.04em`으로 좁혀 해결.
- **Split View pane 2 여닫이 토글**: 앰프 모달의 Matched Speakers 칩·
  Configurations 표 대표 행이나, 스피커 모달의 앰프 매칭 행을 클릭해 pane 2
  가 열린 상태에서 같은 대상(같은 스피커/앰프)을 다시 클릭하면, 오른쪽 위
  X 버튼까지 마우스를 옮기지 않아도 pane 2 가 곧바로 닫히도록 개선.
  `openSplitPane()`에 `paneId` 파라미터를 추가해 `.split-view` 컨테이너의
  `dataset.paneId`로 현재 열려있는 대상을 추적하고, 같은 id 로 다시 호출되면
  토글 닫기, 다른 id 면 기존처럼 교체하도록 분기(`ui/split-view.js`). X
  버튼 클릭과 토글 닫기가 동일한 `closeSplitPane2()` 헬퍼를 공유해 모달을
  닫았다 다시 열 때 `.split-view` 잔재 DOM이 남지 않도록 유지.
- **Split View 전환 모션 재설계(리플로우 어색함 해결)**: 기존에는 pane1·
  pane2 를 `flex: 1 1 50%`로 반씩 나누고 모달 `max-width`를 트랜지션시켰는데,
  그 결과 pane1(원래 모달 콘텐츠)의 폭이 갑자기 절반으로 줄면서 폰트·표
  열 폭이 순간 재배치(리플로우)돼 전환이 어색해 보이던 문제를 해결. pane1을
  원래 모달과 동일한 고정 폭(`--pane1-w: 600px`)으로 완전히 고정해 pane1
  내부는 전환 중 전혀 리사이즈되지 않고, pane2만 오른쪽에 별도 고정 폭
  (`--pane2-w: 560px`)으로 붙어 나타난다(`css/components/split-view.css`).
  pane2 진입 애니메이션도 좌우로 미끄러지는 `translateX`(패널이 밀고 들어오는
  듯한 인상) 대신 순수 페이드 + 살짝의 확대(`scale(.98)→1`)로 바꾸고, 모달
  폭 확장 트랜지션(modal.css, `.22s`)이 끝난 직후(`animation-delay: .2s`)
  시작하도록 타이밍을 맞춰 "먼저 폭이 넓어지고 그 다음 내용이 자연스럽게
  드러나는" 순서가 되게 함. pane2 폭이 넉넉해져(패딩 제외 약 510px) 기존에
  match-table을 억지로 축소하던 스타일도 대부분 제거하고 1080px 이하
  좁은 화면에서만 축소 적용. 세로 스택(860px 이하)에서는 두 pane 모두
  폭을 auto로 되돌려 가로 스크롤이 생기지 않게 처리.
- **Split View pane1/pane2 헤더 완전 통일(X 버튼 위치·제목 표기 불일치
  해결)**: pane2(Split View 로 새로 여는 상세)가 pane1(원래 모달)과 다른
  전용 헤더 마크업(`.split-view__pane-head`, 브랜드·모델명이 한 줄로 붙은
  작은 텍스트 + 별도 스타일의 닫기 버튼)을 써서, 좌우 X 버튼 위치와 제목
  표기 방식이 서로 어긋나 보이던 문제 수정. `openSplitPane()`이 `paneTitle`
  문자열 대신 각 도메인 `modalBodyHTML()`이 반환하는 `head`(= pane1과
  동일한 `.modal__head`: eyebrow + `.modal__title` + 우측 상단 고정
  `.modal__close`)를 그대로 받도록 시그니처를 변경(`headHTML` 파라미터,
  `ui/split-view.js`)하고, 이를 호출하는 4개 컨트롤러
  (`speakers.controller.js`/`amplifiers.controller.js`/
  `dsps.controller.js`/`software.controller.js`) 모두 `head`를 함께
  구조분해해 전달하도록 수정. `.split-view__pane`에 주던 자체 padding도
  제거해(내부 `.modal__head`/`.modal__body`가 이미 padding을 담당) pane1과
  pane2가 여백까지 픽셀 단위로 동일해짐. 이제 두 pane 모두 X 버튼이 항상
  각 pane 우측 상단 끝의 같은 오프셋(top:18px, right:18px)에 있고, 제목도
  "제조사·부가정보(eyebrow) 위에 큰 모델명" 2단 구조로 통일됨.
- **각도 범위 필터**: Max SPL·Max Watt처럼 Inter-element Splay(선택 각도)·수평
  커버리지·수직 커버리지도 범위 슬라이더로 필터링 가능. `cov.h`/`cov.v`/
  `cov.splayList` 원본 문자열을 `[min,max]` 구간으로 파싱하는
  `parseAngleRange()`를 신설하고, `core/filter-engine.js`가 배열형(`isRange`)
  필드와 스칼라 구간이 겹치는지(overlap) 판정하도록 확장.
- **서브우퍼 모달의 Low Driver/Transducers 중복 표시 제거**: K1-SB처럼
  로우 대역 1개짜리 서브우퍼는 `transducers`("LF: 2 × 15″")가 바로 위의
  `Low Driver`("2 × 15″") 행과 실질적으로 같은 값이라 두 행이 같은 정보를
  반복해서 보여주고 있었음. 카드에서 이미 쓰던 `otherBandCount()`(로우
  드라이버를 제외한 나머지 대역 수를 세는 헬퍼)를 모달에도 재사용해, 이
  값이 0(대역이 로우 하나뿐)이면 Transducers 행 자체를 생략하도록
  `modalBodyHTML()`을 수정(`speakers.view.js`). LC/LF/MF/HF 등 대역이
  2개 이상인 스피커(K1, K2 등)는 Transducers 가 Low Driver 에 없는 정보를
  담고 있으므로 그대로 유지. 전체 데이터 감사 결과 L-Acoustics 서브우퍼
  11개(K1-SB·Syva Low·Syva Sub·KS28·KS21·SB18·SB15m·SB10r·SB10i·SB6r·SB6i)
  가 이 조건에 해당해 중복이 사라짐.
- **Type/Crossover 요약 태그를 head 영역으로 이동**: `Type`(Line Array 등)·
  `Crossover`(3-way/active 등) 항목을 spec-table 안의 일반 행 대신, 모달
  제목(`.modal__title`) 오른쪽과 카드 이름(`.card__name`) 오른쪽에 작은
  해시태그형 배지로 나란히 노출하도록 변경. `speakers.view.js`에
  `titleTagsHTML(d, wrapClass, tagClass)` 헬퍼를 신설해 Type은 카드 배지와
  같은 축약 라벨(`TYPE_BADGE_LABEL`)로, Crossover는 `crossoverTags` 원본
  그대로 배지화하며, wrapper/배지 클래스를 인자로 받아 모달
  (`modal__title-tags`/`modal__title-tag`)과 카드
  (`card__name-tags`/`card__name-tag`) 양쪽에서 같은 로직을 재사용한다.
  모달은 `.modal__head-row`(flex, `align-items: center`)로 제목과 태그를
  세로 중앙 정렬해 한 행에 배치하고, 태그가 많으면 제목보다 먼저
  줄바꿈되어 다음 줄로 내려간다. 카드는 `.card__name-row`로 감싸 이름은
  줄어들지 않게 고정하고, 태그 그룹에 `margin-left: auto`를 줘 카드
  우측 끝에 정렬되도록 처리(`card.css`). Split View pane2(폭이 약간
  좁음)에서는 배지를 살짝 축소(`split-view.css`). 표에만 있던 정보를
  시각적 "요약 라벨"로도 함께 보여줘 표를 안 봐도 제품 유형을 한눈에
  파악할 수 있게 됨.
- **Crossover 태그 정렬 순서**: `crossoverTags` 데이터 원본 순서("3-way",
  "active")와 달리, 표시 시에는 능동/수동 여부(active/passive)가 대역 수
  (N-way)보다 앞에 오도록 정렬(예: "Line Array, active, 3-way"). 데이터
  자체는 건드리지 않고 `titleTagsHTML()` 내부에서 `/active|passive/`
  매칭 여부로 정렬 키를 부여하는 stable sort 로 표시 순서만 조정.
- **모달 헤더 태그·닫기 버튼 정렬 미세 조정**: 태그 배지들을 제목과 세로
  중앙 정렬(`align-items: center`, 기존 `flex-start`)로 변경. 닫기 버튼을
  32px→20px로 축소하고 제목 줄이 아닌 eyebrow(제조사·시리즈) 줄 높이로
  옮겨, 태그 그룹이 닫기 버튼을 피해 안쪽 여백을 두지 않고도 아래
  spec-table/match-table 의 실제 우측 끝(`.modal__body`와 동일한 24px
  padding 기준선)까지 그대로 닿을 수 있게 함 — 닫기 버튼의 `right`도
  24px로 맞춰 두 기준선이 일치하도록 정리. 이어서 카드 태그는
  `margin-left: auto`로 카드 우측 끝 정렬로 변경(`.card__name-tags`).
  닫기 버튼 아이콘이 살짝 아래로 치우쳐 보이던 것은 svg 를
  `display: block` + flex 중앙정렬로 바꿔 해결. 태그(`border-radius:
  999px`, 완전 알약형)와 닫기 버튼(각진 사각형)의 곡률이 서로 달라
  나란히 있을 때 이질감을 주던 것을 두 요소 모두 `border-radius: 8px`로
  통일했고, 태그를 `inline-block`→`inline-flex` 중앙정렬로 바꿔 텍스트가
  박스 안에서 살짝 치우쳐 보이던 것도 정리(`modal.css`).
- **카드의 로우 드라이버 배지 폰트 크기 통일**: `.card__low-badge` 안의
  `<b>`(예: "2×8″")가 부모 컨텍스트에 따라 옆의 "+N개 대역"
  (`.card__low-extra`, 11px)보다 커 보이는 경우가 있던 것을, 배지
  부모(`.card__low-badge`)에 `font-size: 11px`를 직접 고정하고 자식
  (`b`/`small`)은 `em` 배수(1em/.68em)로만 지정해 항상 옆 텍스트와
  동일한 실제 렌더 크기를 갖도록 수정. 배지 padding 도 살짝 줄여 박스
  크기 축소(`card.css`).
- **앰프/DSP/Software 탭에 제조사별 그룹 헤더 추가**: 스피커 탭처럼
  "L-Acoustics · Amplified Controller" 형태의 그룹 헤더(제조사 뱃지 +
  분류명 + 개수)를 카드 그리드 상단에 표시. 앰프는 `type` 필드
  (예: "Amplified Controller")를, 값이 없으면(d&b D80/D90 등 기존
  단순 스키마 — 실제로는 랙형 투어링 앰프) 기본값 "Amplifier"로 묶는다
  (`ampTypeOf()`). DSP는 이미 있던 `category` 필드(예: "AVB Processor &
  Measurement")를, Software 는 이미 있던 `type` 필드를 그대로 재사용해
  그룹핑. 세 탭 모두 정렬 셀렉트에 "정렬 · 제조사/타입별"(DSP/Software는
  "정렬 · 제조사별") 옵션을 추가하고 기본 정렬로 승격 — 스피커 탭의
  "정렬 · 시리즈별" 그룹핑 UX(제조사 순서 고정 `*_MK_ORDER`, 서브그룹
  알파벳순, 그룹 내 이름순)를 그대로 재사용(`amplifiers.controller.js`,
  `dsps.controller.js`, `software.controller.js`의 `renderGrid`
  `groupBy` 옵션).
- **탭 전환 시 스크롤바 유무로 인한 페이지 좌우 흔들림 수정**: 탭마다
  콘텐츠 높이가 달라 세로 스크롤바가 생겼다 사라졌다 했는데, 스크롤바는
  뷰포트의 실사용 폭에 영향을 줘 중앙 정렬된 `max-width` 컨테이너
  (`.app-footer` 등)가 탭을 옮길 때마다 몇 px씩 좌우로 밀리는 것처럼
  보였음. `html { scrollbar-gutter: stable; overflow-y: scroll; }`을
  추가해 스크롤바가 필요 없을 때도 그 자리를 항상 빈 여백으로 확보,
  콘텐츠 높이와 무관하게 사용 가능한 폭이 항상 동일하도록 고정
  (`base.css`).
- **L-Acoustics LA1.16i 제품 이미지(Front/Rear/Isometric) 추가**: 배경이 이미
  투명 처리된 원본 3장을 여백만 최소화(0.3%, `assets/img/normalize_images.py`)
  정규화해 `assets/img/amplifiers/la/`에 배치. 앰프 도메인에도 스피커와 동일한
  `getViews()`/다중 뷰 패턴을 도입해 카드는 Front→Rear 호버 크로스페이드,
  모달은 Front/Rear/Isometric 전환 버튼을 지원(`amplifiers.view.js`).
- **앰프 카드/모달 이미지 폭 최적화**: 1U 랙마운트 앰프(약 10.6:1 종횡비)는
  기본 max-width(카드 80%/모달 74%)를 그대로 쓰면 극단적으로 얇게 렌더링되던
  문제를, `card__img--wide`/`modal__img--wide` 변경자로 폭을 100%(모달은 96%)
  까지 채우도록 수정. 이 과정에서 발견한 CSS 특이도 버그도 함께 수정 —
  `.card__media img`/`.modal__media img`(태그+클래스, 특이도 0,0,2)가 단일
  클래스 변경자(0,0,1)보다 항상 이겨서 max-width 오버라이드가 무시되던 것을
  `img.card__img--wide`처럼 태그+클래스로 특이도를 맞춰 해결(`card.css`,
  `modal.css`).
- **모달 이미지 커서 추적 확대(zoom)**: 모달 사진에 마우스를 올리면 커서가
  위치한 지점을 중심으로 확대되는 인터랙션 추가. `js/ui/modal.js`의
  `wireMediaZoom()`이 mousemove로 `--zoom-x`/`--zoom-y` CSS 변수를 갱신하고
  `transform-origin`이 이를 참조(`modal.css`). 일반 이미지(스피커 등)는 1.4배,
  1U 랙마운트처럼 가로로 긴 이미지(`modal__img--wide`)는 프레임 안에서 작아
  보이는 특성을 고려해 2.8배로 배율을 분리.
- **제품 이미지 다중 뷰(Front/Rear/Array 등)**: 스피커 카드에 마우스를 올리면
  두 번째 뷰(뒷모습/배열 사진 등)로 크로스페이드되고, 모달에서는 뷰 개수만큼
  버튼이 자동 생성되어 전환할 수 있음(`getViews()` 헬퍼, `js/domains/speakers/
  speakers.view.js`). 데이터에는 `views: [{label, src}, ...]` 배열을 선언하며,
  레거시 `img`+`imgBack` 필드도 자동으로 같은 구조로 변환되어 하위호환됨.
  - L-Acoustics L1D: Front/Rear 적용
  - L-Acoustics K1: Front/Array 적용
- **L-Acoustics L Series 재분류**: L1/L1D/L2/L2D의 `type`을 "Line Array"에서
  "Progressive Ultra-Dense Line Source"(PULS)로 변경. 카드 배지는 공간 제약상
  "PULS"로 축약 표시하고, 필터 칩·모달의 Type 행은 풀스펠링 유지
  (`TYPE_BADGE_LABEL` 매핑, `speakers.schema.js`).
- **이미지 자산 폴더 구조 개편**: `assets/img/{도메인}/{제조사}/{시리즈}/파일명.webp`
  형태로 스펙 데이터 폴더 구조(`js/domains/speakers/data/{mk}/{series}.data.js`)와
  1:1 대응되게 재편. 향후 이미지 추가 시 같은 규칙을 따르면 됨.
- **이미지 정규화 스크립트**: `assets/img/normalize_images.py`(여백 비율 통일),
  `assets/img/montage_check.py`(전체 썸네일 일괄 점검) 추가 — 재귀 탐색 지원.

- **앰프 카드/모달 정보 구조 재정리**: speakers.view.js의 "실사용에 필요한
  정보 우선" 원칙을 앰프에도 적용.
  - 카드 stat-grid에서 매칭 정보가 바뀔 때마다 값이 흔들리는 부가 지표인
    Speakers(개수) 대신 앰프 자체 스펙인 Channels를 노출.
  - 카드의 자유 서술문(`a.notes`)을 제거 — 스피커 카드의 `card__config`는
    스펙 요약(로우드라이버 배지 등)인데 반해 앰프는 문장형이라 카드 첫
    화면에 어울리지 않음. 정보 자체는 유실하지 않고 모달 상세 첫 줄
    (General 표 바로 위, `.modal__notes`)로 이동.
  - 카드 이미지 위 채널 배지("16ch")를 제거 — stat-grid의 Channels와 중복.
  - 카드 stat-grid 라벨/값 말줄임 수정: "Output Power"→"Output"으로 축약해
    라벨 잘림 해결, `a.usage`("Installation only")는 모달 표시용 원본은
    그대로 두고 카드에서만 "only"를 생략해 값 잘림 해결.
  - 모달 섹션을 General(개요만: Channels·Power Class·Type·Usage) →
    Matched Speakers/Configurations → Mains(Power Supply·External DSP
    Backup 통합) → Connections & Output(I/O+Output 통합, 중복이던
    `output.channels` 제거) → DSP → Ecosystem → Features → Notes &
    Protection → Physical(IP Rating·Rack Unit·Weight·Cooling·Operating
    Temp — 설치 시에나 참고하는 부가 스펙이라 맨 아래로 이동) 순으로
    재구성. 섹션 수 6개→5개(주요 스펙)+Physical 로 정리, 중복 정보 제거.
  - Configurations 표(앰프 모달의 `configsBySpeakerTableHTML`)가 스피커
    모달의 Amplifier Matching 표와 6열 컬럼 비율을 공유하던 것을 분리
    (`match-table--amp-view`). 두 표는 왼쪽 열 콘텐츠가 반대라(하나는
    짧은 앰프 모델명, 하나는 스피커 모델명 — 최장 "A15 Focus" 9자) 공유
    비율로는 스피커 이름이 "S...", "5..."처럼 잘렸음.

### 변경
- 필터 패널 토글이 사이트 진입 시 기본적으로 접힌 상태로 시작.
- 표(spec-table·match-table·freq-list) 셀 크기를 고정 그리드 비율로 통일해
  브라우저/글자수에 따라 셀 폭이 흔들리던 문제 해결.
- 데스크탑 카드 그리드 3열 → 4열 확보, 모바일 반응형 밀도 최적화(1열 유지).
- 범위 슬라이더(Max SPL/Watt/각도 등) 트랙 폭을 고정 픽셀로 통일해 슬라이더
  길이가 항목마다 들쭉날쭉하던 문제 해결.
- Frequency Response의 -3dB/-6dB/-10dB 배지 크기를 고정폭으로 통일하고 옆
  Hz 텍스트 시작 위치를 정렬.
- 카드 배지의 드라이버 구성 표기 방식을 전면 개편: 텍스트 나열(LC/LF/MF/HF ×
  치수) 방식이 1줄에 들어가지 않던 문제를, 로우 드라이버(lowInch/lowQty)만
  제조사 색상 강조 박스로 표시하고 나머지는 "+N개 대역"으로 축약하는 방식으로
  교체(`card__low-badge`/`card__low-extra`, `card.css`). 강조 박스 폰트 크기를
  옆의 "+N개 대역" 텍스트와 시각적 무게감이 비슷하도록 축소.
- 43개 스피커 제품 이미지의 상하 여백 비율을 알파 채널 bounding box 기준으로
  통일(CCL12/CCL8이 다른 스피커보다 작아 보이던 문제 해결 포함).
- L1D, L2D 이미지의 바닥 그림자(반투명 회색 잔여물)를 제거 — 어두운 카드
  배경에서 흰 얼룩처럼 도드라지던 문제 해결.

### 수정 (버그)
- **fillOrphanHalfCells 셀 인덱스 밀림**: K1-SB(Passive)에서 RMS Power
  Handling 옆에 빈 회색 칸이 남던 버그. 원인은 `.filter(Boolean)`이 템플릿
  리터럴 들여쓰기로 생긴 공백뿐인 조각("\n        ")을 걸러내지 못해
  `blocks[0]`으로 남고 이후 모든 셀 인덱스가 하나씩 밀리는 것 —
  `.filter(b => b.trim() !== "")`로 수정(`speakers.view.js`).
- 스플릿뷰(카드 나란히 비교) 닫았다 다시 열 때 이전 스플릿 상태 DOM이
  잔재로 남아 있던 문제 수정 (`js/ui/modal.js`의 `closeModal()`,
  `js/ui/split-view.js`의 pane2 닫기 로직).
- 스플릿뷰 상태에서 표 셀 폭이 줄어들며 글자가 잘리던 문제 수정.
- 모달의 Front/Rear 전환 버튼이 사진 위에 겹쳐 사진을 가리던 문제 수정 —
  버튼을 사진 영역 바깥 별도 바로 이동. 사진 영역과 버튼 바를 같은 그라디언트
  wrapper(`.modal__media-wrap`)로 감싸 배경색이 중간에 끊기지 않고 자연스럽게
  이어지도록 마무리.

### 정리
- LA1.16i 이미지 작업 중 생긴 원본 PNG·디버그 스크립트·중간 산출물이 남아있던
  `upload/` 임시 작업 폴더를 v1.1 배포 전 전체 삭제(최종 결과물은 이미
  `assets/img/amplifiers/la/`에 반영되어 있어 유실되는 정보 없음).

---

## v1.0

최초 버전. 음향 장비(스피커·앰프·DSP·소프트웨어·브랜드) 리서치 대시보드
기본 구조 구축.

- 도메인 자기등록 아키텍처(controller/schema/view/data 4파일 패턴)
- schema 주도 범용 필터/정렬 엔진(`core/filter-engine.js`)
- 카드 그리드 + 모달 상세 뷰 + Split View(나란히 비교) 기본 기능
- L-Acoustics·d&b audiotechnik 스피커/앰프 데이터 및 크로스레퍼런스(cross-ref)
- 상세 구조는 `ARCHITECTURE.md` 참고
