/**
 * @module domains/speakers/view
 * 스피커 카드 + 상세 모달 마크업 생성 (순수 함수 모음).
 * "스피커가 어떻게 보이는가"만 담당하며, 범용 그리드/모달 엔진(ui/)과 분리됨.
 *
 * 관련 CSS: css/components/card.css, css/components/spec-table.css
 */
import { esc } from "../../core/dom.js";
import { MFR, TYPE_BADGE_LABEL } from "./speakers.schema.js";

/* ── SPL 게이지 스케일 (전체 데이터의 min/max 로 컨트롤러가 설정) ── */
const SPL_RANGE = { lo: 0, hi: 0 };

/**
 * SPL 게이지의 표시 범위를 설정한다 — speakers.controller.js 가 빌드 시 호출.
 * @param {number} lo 데이터 최저 SPL
 * @param {number} hi 데이터 최고 SPL
 */
export function setSplRange(lo, hi) { SPL_RANGE.lo = lo; SPL_RANGE.hi = hi; }

/** SPL 값 → 게이지 채움 비율(%) (최소 4% 보장으로 항상 보이게) */
const splPct = v => Math.max(4, Math.min(100, ((v - (SPL_RANGE.lo - 2)) / ((SPL_RANGE.hi + 2) - (SPL_RANGE.lo - 2))) * 100));

/** 앰프 항목에서 total 이 가장 큰 설정 반환 (카드 요약용) */
function bestCfg(a) { const n = a.configs.filter(c => c.total != null); return n.length ? n.reduce((x, y) => y.total > x.total ? y : x) : null; }

/** 스피커의 대표(첫 유효) 앰프 매칭 요약 { model, perCh, total } 반환 */
function primaryOf(d) { if (!d.amps || !d.amps.length) return null; for (const a of d.amps) { const c = bestCfg(a); if (c) return { model: a.model, perCh: c.perCh, total: c.total }; } return null; }

/** 스피커가 가진 앰프·모드 옵션 총 개수 (카드의 "n개 옵션" 표기용) */
function ampOptionCount(d) { return !d.amps ? 0 : d.amps.reduce((n, a) => n + Math.max(1, a.configs.length), 0); }

/**
 * 검색어 매칭 규칙 (이름/시리즈/제조사명).
 * @param {Object} d 스피커 레코드
 * @param {string} q 소문자 검색어
 * @returns {boolean}
 */
export function speakerMatchesQuery(d, q) {
  const s = q.toLowerCase();
  return d.name.toLowerCase().includes(s) || d.series.toLowerCase().includes(s) || MFR[d.mk].name.toLowerCase().includes(s);
}

/**
 * 스피커의 제품 이미지 뷰 목록을 반환한다 — [{label, src}, ...].
 * 두 가지 데이터 형태를 지원한다:
 *   1) d.views 배열을 직접 선언 (임의 개수/라벨, 예: Front/Rear/Array/I·O)
 *   2) 레거시 img + imgBack 필드 (자동으로 [{Front, img}, {Rear, imgBack}] 로 변환)
 * views 가 없고 img 만 있으면 뷰 1개(Front)만 반환하고, img 도 없으면 빈 배열.
 * 카드 호버 크로스페이드·모달 Front/Rear 버튼 모두 이 함수 하나로 개수를
 * 신경 쓰지 않고 동작한다 — 새 스피커에 뷰를 추가할 때 이 함수를 건드릴
 * 필요 없이 데이터에 views 배열만 채우면 된다.
 * @param {Object} d 스피커 레코드
 * @returns {{label: string, src: string}[]}
 */
function getViews(d) {
  if (Array.isArray(d.views) && d.views.length) return d.views;
  if (!d.img) return [];
  const views = [{ label: "Front", src: d.img }];
  if (d.imgBack) views.push({ label: "Rear", src: d.imgBack });
  return views;
}

/**
 * transducers 원본 문자열에서 로우 드라이버 외 나머지 대역 수를 센다.
 * 카드는 폭이 좁아 "LC: 2 × 18″ · LF: 4 × 15″ · MF: 8 × 8″ · HF: 6 × …" 같은
 * 전체 텍스트를 다 담기 어려우므로, 카드에는 가장 중요한 로우 드라이버
 * (lowInch/lowQty)만 색상 강조 박스로 크게 보여주고, 나머지 대역은 "+N band"
 * 처럼 개수만 짧게 알려준다. 전체 상세는 모달의 Transducers 행(원본 그대로
 * 표시)에서 확인한다.
 * @param {string} raw 원본 transducers 문자열
 * @returns {number} 로우 1개를 제외한 나머지 대역(가운데점으로 구분된 항목) 개수
 */
function otherBandCount(raw) {
  if (!raw) return 0;
  const parts = raw.split("·").map(s => s.trim()).filter(Boolean);
  return Math.max(0, parts.length - 1);
}

/**
 * transducers 원본 문자열("LF: 2 × 15″ · MF: 4 × 6.5″ · HF: 3 × 3″")을
 * [{band, detail}, ...] 로 분리한다 — 모달의 Low Driver 자리에 밴드별
 * 배지+값 리스트(Frequency Response 와 동일한 freq-list 패턴)로 보여주기
 * 위함(modalBodyHTML 참고). 각 항목은 첫 ":" 를 기준으로 라벨/값을
 * 나눈다 — "LF front: 1 × 15″"처럼 라벨에 공백이 섞인 경우도 첫 콜론
 * 앞부분을 그대로 라벨로 쓰므로 문제없다.
 * @param {string} raw 원본 transducers 문자열
 * @returns {{band: string, detail: string}[]} 콜론이 없는 항목은 건너뜀
 */
function parseTransducerBands(raw) {
  if (!raw) return [];
  return raw.split("·").map(s => s.trim()).filter(Boolean).map(part => {
    const i = part.indexOf(":");
    if (i === -1) return null;
    return { band: part.slice(0, i).trim(), detail: part.slice(i + 1).trim() };
  }).filter(Boolean);
}

/**
 * 2-way 이상(멀티밴드) 스피커의 Low Driver 자리를 대체하는 half 셀.
 * K1 처럼 LF/MF/HF 등 여러 대역을 가진 스피커는 로우 대역 하나만 보여주는
 * "Low Driver" 보다 전체 대역 구성이 훨씬 유용한 정보이므로, 같은 자리
 * (Max SPL 과 짝을 이루는 첫 half 셀)에 Frequency Response 와 동일한
 * 배지+값 리스트(freq-list/freq-badge)로 밴드별 구성을 보여준다.
 * 파싱에 실패하면(parseTransducerBands 가 빈 배열 반환) 원본 문자열을
 * 그대로 값으로 표시해 정보 유실을 막는다.
 * @param {string} raw 원본 transducers 문자열
 * @returns {string} spec-table__cell (half) 마크업
 */
function transducerBandsHalfRow(raw) {
  const bands = parseTransducerBands(raw);
  if (!bands.length) return specRow("Transducers", raw);
  const lines = bands.map(b =>
    `<div class="freq-list__row"><span class="freq-badge freq-badge--auto">${esc(b.band)}</span><span class="freq-list__val">${esc(b.detail)}</span></div>`
  ).join("");
  return `<div class="spec-table__cell" data-half><div class="spec-table__key">Transducers</div><div class="spec-table__value freq-list">${lines}</div></div>`;
}

/**
 * 스피커 카드 1장의 HTML 을 생성한다.
 * @param {Object} d 스피커 레코드
 * @returns {string} .card 마크업
 */
export function cardHTML(d) {
  const M = MFR[d.mk], color = M.color;
  const p = primaryOf(d), opts = ampOptionCount(d);
  const ampBlock = p ? `
    <div class="stat-grid">
      <div class="stat-grid__cell"><span class="stat-grid__key">Amp</span><span class="stat-grid__value stat-grid__value--accent">${esc(p.model)}</span></div>
      <div class="stat-grid__cell"><span class="stat-grid__key">Max / amp</span><span class="stat-grid__value">${p.total}<small> ea</small></span></div>
      <div class="stat-grid__cell"><span class="stat-grid__key">Links / ch</span><span class="stat-grid__value">${p.perCh}</span></div>
    </div>
    ${opts > 1 ? `<div class="card__more"><span class="card__more-arrow">▸</span> ${opts}개 앰프·모드 옵션 · 탭하여 전체 보기</div>` : ""}`
    : `<div class="stat-grid"><div class="stat-grid__cell"><span class="stat-grid__key">Amp</span><span class="stat-grid__value stat-grid__value--na">— 미지정</span></div></div>`;
  // 뷰가 2개 이상(Front/Rear, Front/Array 등)인 모델만 호버 시 첫→두 번째
  // 뷰로 크로스페이드를 적용한다(카드는 좁아 세 번째 이상은 모달에서만 확인).
  // 두 이미지를 겹쳐 쌓고 CSS(:hover)로 opacity 를 전환하므로 JS 상태 없이
  // 동작하며, 뷰가 1개뿐인 모델은 기존과 동일하게 이미지 1장만 렌더링된다.
  const views = getViews(d);
  const media = views.length
    ? (views.length > 1
        ? `<img class="card__img card__img--front" loading="lazy" src="${views[0].src}" alt="${esc(d.name)}"><img class="card__img card__img--back" loading="lazy" src="${views[1].src}" alt="${esc(d.name)} ${esc(views[1].label)}">`
        : `<img class="card__img" loading="lazy" src="${views[0].src}" alt="${esc(d.name)}">`)
    : `<div class="card__noimg">◢</div>`;
  // 카드 배지는 공간이 좁아 "Progressive Ultra-Dense Line Source" 같은 긴 타입명은
  // 축약 표기(PULS)로 노출한다. 필터 칩·모달의 Type 행은 풀스펠링을 그대로 쓴다.
  const typeBadgeLabel = TYPE_BADGE_LABEL[d.type] || d.type;
  // 드라이버 구성: 텍스트 나열 대신 로우 드라이버(lowInch/lowQty)만 제조사
  // 색상 강조 박스로 표시하고, 나머지 대역은 개수만 짧게 덧붙인다. 텍스트
  // 축약으로 한 줄에 욱여넣던 이전 방식(잘림 문제)을 대체한다.
  const extra = otherBandCount(d.transducers);
  const lowBadge = d.lowInch != null
    ? `<span class="card__low-badge"><b>${d.lowQty ? esc(d.lowQty) + "×" : ""}${esc(d.lowInch)}″</b><small>LOW</small></span>`
    : "";
  const cfg = `${lowBadge}${extra > 0 ? `<span class="card__low-extra">+${extra}개 대역</span>` : ""}`;
  // 이름(card__name) 오른쪽에 Type·Crossover 요약 태그를 나란히 붙인다
  // (모달 head 의 titleTagsHTML 과 동일한 헬퍼 재사용, 카드에서는 더 작은
  // 크기로 렌더링 — card.css 의 .card__name-tags 참고). 공간이 부족하면
  // 자동으로 다음 줄로 줄바꿈된다.
  const nameTags = titleTagsHTML(d, "card__name-tags", "card__name-tag");
  return `<article class="card" style="--mfr:${color}" tabindex="0" data-id="${d.id}" role="button" aria-label="${esc(d.name)} 상세">
    <div class="card__media">${media}<span class="card__type-badge">${esc(typeBadgeLabel)}</span></div>
    <div class="card__body">
      <div class="eyebrow"><span class="eyebrow__brand">${esc(M.short)}</span> · ${d.throwCat ? esc(d.throwCat) + ' · ' : ''}${esc(d.series)}</div>
      <div class="card__name-row">
        <div class="card__name">${esc(d.name)}</div>
        ${nameTags}
      </div>
      <div class="card__config">${cfg}</div>
      <div class="spl-meter"><div class="spl-meter__track"><div class="spl-meter__fill" style="width:${d.spl != null ? splPct(d.spl) : 0}%"></div></div><div class="spl-meter__value">${d.spl != null ? d.spl : "—"}<small>dB SPL</small></div></div>
      <div class="card__stats">${ampBlock}</div>
    </div>
  </article>`;
}

/**
 * 제목 옆에 나란히 보여줄 Type·Crossover 해시태그 배지 목록 HTML.
 * 예전에는 이 둘이 spec-table 안의 일반 행이었는데, 표에 넣기보다 제목과
 * 함께 한눈에 보이는 "요약 태그"로 더 잘 어울려서 head/카드 이름 옆으로
 * 옮겼다. Type 은 카드 배지와 같은 축약 라벨(TYPE_BADGE_LABEL, 예: PULS)을
 * 쓰고, Crossover 는 원본 태그(crossoverTags, 예: "3-way"/"active")를 쓰되
 * 데이터 원본 순서("3-way" 다음 "active")와 달리 "능동/수동" 여부(active/
 * passive)가 "N-way" 대역 수보다 먼저 오도록 정렬한다 — 예: "Line Array,
 * active, 3-way". 모달 head(.modal__title 옆)와 카드 이름(.card__name 옆)
 * 양쪽에서 같은 데이터로 재사용하되 감싸는/배지 클래스만 다르게 지정할 수
 * 있도록 파라미터로 받는다.
 * @param {Object} d 스피커 레코드
 * @param {string} wrapClass 목록 wrapper 에 붙일 클래스 (예: "modal__title-tags")
 * @param {string} tagClass 배지 각각에 붙일 클래스 (예: "modal__title-tag")
 * @returns {string} 배지들의 HTML (표시할 게 없으면 빈 문자열)
 */
function titleTagsHTML(d, wrapClass, tagClass) {
  const typeLabel = d.type ? (TYPE_BADGE_LABEL[d.type] || d.type) : null;
  // active/passive 태그를 N-way 태그보다 앞으로 — /active|passive/ 매칭되는
  // 태그는 정렬 키 0, 나머지("3-way" 등)는 1로 줘서 stable sort 로 순서만 바꾼다.
  const crossover = [...(d.crossoverTags || [])].sort((a, b) => {
    const rank = t => /active|passive/i.test(t) ? 0 : 1;
    return rank(a) - rank(b);
  });
  const tags = [
    ...(typeLabel ? [typeLabel] : []),
    ...crossover,
  ];
  if (!tags.length) return "";
  return `<div class="${wrapClass}">${tags.map(t => `<span class="${tagClass}">${esc(t)}</span>`).join("")}</div>`;
}

/**
 * 사양 표 행 1개 HTML (값이 비어 있으면 행 자체를 생략).
 * 반환 문자열에 data-half 속성을 표시해두면, spec-table 조립 마지막
 * 단계(fillOrphanHalfCells)에서 짝이 없는 셀을 찾아 --full 로 승격시킬 수
 * 있다(옆에 빈 회색 칸이 남는 문제 방지 — 아래 fillOrphanHalfCells 참고).
 * @param {string} label 항목명
 * @param {*} val 값
 * @param {boolean} [full] true 면 2열 전체 폭 사용
 * @param {string} [pinGroup] 지정하면 이 그룹의 첫 셀 앞에서 항상 강제로
 *   새 행을 시작한다 — 같은 그룹의 두 셀(반드시 정확히 2개)이 항상 같은
 *   행에 나란히 붙어 있도록 보장한다(예: Weight/Dimensions, Max Watt
 *   Total/By Band — 다른 half 항목이 사이에 끼어들어 둘을 갈라놓는 것을
 *   방지). data-pin 속성으로만 표시해두고 실제 강제 줄바꿈·완전한 짝
 *   보장은 fillOrphanHalfCells 가 처리한다.
 */
function specRow(label, val, full, pinGroup) {
  if (val == null || String(val).trim() === "" || String(val).trim() === "nan") return "";
  const pinAttr = pinGroup ? ` data-pin="${pinGroup}"` : "";
  return `<div class="spec-table__cell${full ? ' spec-table__cell--full' : ''}"${full ? "" : " data-half"}${pinAttr}><div class="spec-table__key">${esc(label)}</div><div class="spec-table__value">${esc(val)}</div></div>`;
}

/**
 * spec-table 안에서 data-half 로 표시된 1열짜리 셀 중, CSS grid 상에서
 * 실제로 오른쪽 짝이 비어(즉 gap 배경색이 그대로 노출되는) 상태가 되는
 * 셀을 찾아 --full 로 승격시킨다. 또한 data-pin 으로 표시된 "고정 쌍"
 * (예: Weight+Dimensions, Max Watt Total+By Band)은 항상 같은 행에
 * 나란히 붙어있도록, 그 앞에서 강제로 새 행을 시작시킨다.
 *
 * grid-column 을 지정하지 않은 half 셀은 순서대로 2열씩 자동 배치되고,
 * --full 셀(grid-column:1/-1)을 만나면 그 지점에서 강제로 새 행이
 * 시작된다 — 이 동작을 그대로 시뮬레이션하기 위해 "현재 열 위치(0|1)"를
 * 추적하면서 순회한다: half 를 지날 때마다 위치를 토글하고, full 을
 * 만나면(또는 새 pin 그룹을 만나면) 위치를 0 으로 리셋한다. 시퀀스가
 * 끝났을 때 위치가 1(다음 칸이 비어있음)이면 마지막으로 지난 half 셀을
 * --full 로 승격시킨다.
 * Max Watt(Total)처럼 데이터 유무에 따라 홀/짝이 매번 달라지는 필드들이
 * 있어 specRow 호출 시점에는 자신이 고아가 될지 알 수 없으므로, 모든
 * 행을 만든 뒤 이 함수로 한 번에 후처리한다.
 * @param {string} rowsHTML specRow/coverageRows 등을 이어붙인 문자열
 * @returns {string} 고아 half 셀이 --full 로 치환되고 data-half/data-pin 이 제거된 HTML
 */
function fillOrphanHalfCells(rowsHTML) {
  // 각 spec-table__cell 블록을 토큰화 (블록 내부 중첩 </div> 와 무관하게
  // "다음 셀 시작 전까지"로 정확히 잘라낸다).
  // [버그 수정] .filter(Boolean) 은 빈 문자열("")만 걸러내는데, 템플릿
  // 리터럴 들여쓰기 때문에 맨 앞 조각이 "\n        " 같은 공백뿐인
  // 문자열이 되는 경우가 있다 — 이건 truthy 라 걸러지지 않고 blocks[0]
  // 으로 남아 이후 모든 셀의 인덱스를 하나씩 밀려버린다(그 결과 promote()
  // 가 엉뚱한 블록에 --full 을 붙이거나, class="spec-table__cell" 이 없는
  // 공백 블록에 replace 를 시도해 조용히 실패). trim 결과가 비어있는
  // 조각(셀 마크업이 아닌 공백/개행뿐인 조각)은 확실히 걸러낸다.
  const blocks = rowsHTML.split(/(?=<div class="spec-table__cell)/).filter(b => b.trim() !== "");
  const promote = idx => {
    blocks[idx] = blocks[idx].replace(
      'class="spec-table__cell"',
      'class="spec-table__cell spec-table__cell--full"'
    );
  };
  const pinGroupOf = block => {
    const m = block.match(/ data-pin="([^"]+)"/);
    return m ? m[1] : null;
  };
  let col = 0;          // 0: 다음 half 는 왼쪽 열, 1: 다음 half 는 오른쪽 열
  let pendingIdx = -1;  // 왼쪽 열에 배치되어 아직 짝을 못 받은 half 블록의 인덱스
  let curPinGroup = null; // 현재 왼쪽 열을 차지 중인 pin 그룹 (다음 셀이 같은 그룹인지 확인용)
  for (let i = 0; i < blocks.length; i++) {
    const isFull = blocks[i].includes("spec-table__cell--full");
    const pin = pinGroupOf(blocks[i]);
    // pin 그룹의 첫 셀(왼쪽 열에 이미 다른 그룹/일반 half 가 대기 중이면)을
    // 만나면 --full 과 동일하게 강제로 새 행을 시작해, pin 쌍이 항상
    // 온전한 한 행을 차지하도록 만든다.
    const startsNewPinPair = pin && pin !== curPinGroup && col === 1;
    if (isFull || startsNewPinPair) {
      if (pendingIdx !== -1) promote(pendingIdx);
      col = 0; pendingIdx = -1; curPinGroup = null;
      if (isFull) continue;
    }
    if (col === 0) { pendingIdx = i; col = 1; curPinGroup = pin; }
    else { pendingIdx = -1; col = 0; curPinGroup = null; } // 오른쪽 열까지 채워짐 — 짝 완성
  }
  if (pendingIdx !== -1) promote(pendingIdx); // 시퀀스 끝까지 짝을 못 받은 마지막 half
  return blocks.join("").replace(/ data-half/g, "").replace(/ data-pin="[^"]*"/g, "");
}

/**
 * dims 원본 문자열("1300 x 391 x 627 mm / 51.2 x 15.4 x 24.7 in")을
 * { mm, in } 으로 분리한다. "x"/"×" 구분자, 다양한 공백을 모두 허용한다.
 * @param {string} raw dims 원본 문자열
 * @returns {{mm: string, in: string}|null} 파싱 실패 시 null (원본을 그대로 보여주기 위함)
 */
function parseDims(raw) {
  if (!raw) return null;
  const parts = raw.split("/").map(s => s.trim());
  if (parts.length !== 2) return null;
  return { mm: parts[0], in: parts[1] };
}

/**
 * Weight + Dimensions 행 HTML — 항상 같은 행에 나란히 붙는 고정 쌍
 * (data-pin="weightdims", fillOrphanHalfCells 참고). 둘 다 진짜
 * spec-table__cell(half) 이라 Connectors/IP Rating 과 동일한 표 셀
 * 구분선(1px gap 배경)을 그대로 쓴다 — spec-table__split 처럼 셀 안에
 * 별도 border-left 를 그리는 방식은 "표 안에 또 표"처럼 보여 피했다.
 * mm/in 토글(.dims-unit-switch)은 유지한다 — dims 원본이 "1300 x 391 x
 * 627 mm / 51.2 x 15.4 x 24.7 in"처럼 mm·in 을 동시에 병기해 항상 길었는데,
 * 토글로 한 번에 하나만 보여주면 값 길이가 짧아진다(버튼 클릭 동작은
 * js/ui/modal.js 의 wireDimsUnitSwitch 가 연결 — 뷰 전환 버튼
 * wireViewSwitch 와 동일한 data-attribute 토글 패턴).
 * @param {Object} d 스피커 레코드
 * @returns {string} spec-table__cell 2개(둘 다 없으면 빈 문자열)
 */
function weightDimsRow(d) {
  const weightStr = d.weight != null ? d.weight + " kg" : null;
  const dims = parseDims(d.dims);
  if (weightStr == null && !dims && !d.dims) return "";
  const weightHTML = `<div class="spec-table__cell" data-half data-pin="weightdims"><div class="spec-table__key">Weight</div><div class="spec-table__value${weightStr == null ? ' spec-table__value--na' : ''}">${weightStr != null ? esc(weightStr) : "—"}</div></div>`;
  let dimsInner;
  if (dims) {
    dimsInner = `<div class="spec-table__key-row">
        <div class="spec-table__key">Dimensions <span class="spec-table__key-hint">(W×H×D)</span></div>
        <div class="dims-unit-switch" role="group" aria-label="치수 단위 선택">
          <button type="button" class="dims-unit-btn is-active" data-dims-unit="mm">mm</button>
          <button type="button" class="dims-unit-btn" data-dims-unit="in">in</button>
        </div>
      </div>
      <div class="spec-table__value" data-dims-mm>${esc(dims.mm)}</div>
      <div class="spec-table__value" data-dims-in hidden>${esc(dims.in)}</div>`;
  } else if (d.dims) {
    // parseDims 가 "/" 구분자를 못 찾은 비정형 데이터 — 원본을 그대로 표시.
    dimsInner = `<div class="spec-table__key">Dimensions <span class="spec-table__key-hint">(W×H×D)</span></div><div class="spec-table__value">${esc(d.dims)}</div>`;
  } else {
    dimsInner = `<div class="spec-table__key">Dimensions <span class="spec-table__key-hint">(W×H×D)</span></div><div class="spec-table__value spec-table__value--na">—</div>`;
  }
  const dimsHTML = `<div class="spec-table__cell" data-half data-pin="weightdims">${dimsInner}</div>`;
  return weightHTML + dimsHTML;
}

/**
 * RMS Power Handling(Max Watt) 행 HTML.
 * - Active(d.wattByBand 있음, 예: K1 의 LF/MF/HF RMS power handling):
 *   Total 과 밴드별 값을 항상 같은 행에 나란히 붙는 고정 쌍(data-pin=
 *   "maxwatt", weightDimsRow 와 동일한 패턴)으로 만든다. 밴드 쪽은
 *   Frequency Response 와 동일한 배지+값 리스트(freq-list/freq-badge
 *   재사용)로 표시.
 * - Passive(밴드별 데이터 없음): Total 값 하나만 있는 일반 half 셀 —
 *   다른 half 항목(Connectors 등)과 자연스럽게 짝을 이루면 되므로 고정
 *   쌍이 필요 없다.
 * @param {Object} d 스피커 레코드
 * @returns {string} spec-table__cell 마크업 (Total 도 밴드도 없으면 빈 문자열)
 */
function maxWattRow(d) {
  const hasBands = Array.isArray(d.wattByBand) && d.wattByBand.length > 0;
  const totalStr = d.watt != null ? d.watt + " W" + (d.wattVerified === false ? " (검증필요)" : "") : null;
  if (totalStr == null && !hasBands) return "";
  if (!hasBands) {
    // Passive — 밴드 데이터 없음. half 로 두면 KIVA II 처럼 우연히 다음
    // half(Horizontal 등)와 짝이 맞아 같은 행에 나란히 들어가버릴 수 있다
    // (fillOrphanHalfCells 는 "짝이 없을 때만" 승격시키므로, 짝이 우연히
    // 맞으면 병합되지 않음). Passive 는 밴드별 정보가 없어 항상 Total
    // 값 하나뿐이므로, 옆에 다른 항목이 딸려오지 않도록 --full 로 고정해
    // 무조건 혼자 한 행을 차지하게 한다.
    return specRow("RMS Power Handling (Total)", totalStr, true);
  }
  // Active — Total 과 밴드별(LF/MF/HF) 값을 항상 같은 행에 나란히 붙는
  // 고정 쌍(data-pin="maxwatt")으로 만든다. 밴드 쪽은 Frequency Response
  // 와 동일한 배지+값 리스트(freq-list/freq-badge 재사용)로 표시.
  const totalHTML = `<div class="spec-table__cell" data-half data-pin="maxwatt"><div class="spec-table__key">RMS Power Handling (Total)</div><div class="spec-table__value${totalStr == null ? ' spec-table__value--na' : ''}">${totalStr != null ? esc(totalStr) : "—"}</div></div>`;
  const bandLines = d.wattByBand.map(b =>
    `<div class="freq-list__row"><span class="freq-badge freq-badge--auto">${esc(b.band)}</span><span class="freq-list__val">${esc(b.watt)} W</span></div>`
  ).join("");
  const bandHTML = `<div class="spec-table__cell" data-half data-pin="maxwatt"><div class="spec-table__key">By Band</div><div class="spec-table__value freq-list">${bandLines}</div></div>`;
  return totalHTML + bandHTML;
}

/**
 * 커버리지(수평/수직/스플레이 각도) 행들 HTML.
 * 라인어레이는 엘리먼트를 여러 각도로 조합해 수직 커버리지를 만들기
 * 때문에, splayList(Inter-element Splay · 선택 각도)가 진짜 수직 커버리지
 * 정보이고 cov.v(예: "10°")는 낱장 엘리먼트 하나의 고정된 수직 방사각일
 * 뿐이라 사실상 의미가 없다(데이터상 라인어레이류는 거의 항상 "10°"로
 * 동일). splayList 가 있으면 Vertical 행을 생략해 중복/무의미한 정보
 * 노출을 없앤다 — 서브우퍼·포인트소스처럼 splayList 가 없는 스피커는
 * cov.v 가 유일한 수직 커버리지 정보이므로 그대로 표시한다.
 * 필터 사이드바의 Vertical 슬라이더(speakers.schema.js 의 vRange)는 이
 * 표시 로직과 무관하게 그대로 유지 — cov.v 원본 데이터/normalizeAngleRanges
 * 는 건드리지 않았다.
 */
function coverageRows(cov) {
  if (!cov) return "";
  const hasSplay = cov.splayList && cov.splayList.length > 0;
  let r = "";
  if (cov.h) r += specRow("Horizontal", cov.h);
  if (cov.v && !hasSplay) r += specRow("Vertical", cov.v);
  if (hasSplay) r += specRow("Inter-element Splay · 선택 각도", cov.splayList.map(a => a + "°").join("  ·  "), true);
  if (cov.m) r += specRow("Monitor Angle", cov.m);
  return r;
}

/** 주파수 응답(-3dB/-6dB/-10dB) 목록 셀 HTML */
function freqCell(freqs) {
  if (!freqs || !freqs.length) return "";
  // 배지(-3 dB/-6 dB/-10 dB)와 값(Hz 범위)을 각각 별도 grid 열에 배치해
  // 배지 폭·값 시작 위치가 항목마다 다르지 않고 세로로 정렬되게 한다.
  const lines = freqs.map(f => `<div class="freq-list__row"><span class="freq-badge">${esc(f.db)}</span><span class="freq-list__val">${esc(f.lo)} – ${esc(f.hi)}</span></div>`).join("");
  return `<div class="spec-table__cell spec-table__cell--full"><div class="spec-table__key">Frequency Response</div><div class="spec-table__value freq-list">${lines}</div></div>`;
}

/**
 * 앰프 매칭 표(.match-table) HTML 을 생성한다.
 * resolveAmpId 로 해석되는 행에는 data-amp-id 가 붙어 클릭 시 Split View 로
 * 앰프 상세를 열 수 있다 (클릭 연결은 controller 가 담당).
 * @param {Object} d 스피커 레코드
 * @param {Function|null} resolveAmpId (mk, model) => 앰프 id | null
 * @returns {string}
 */
export function ampMatchingHTML(d, resolveAmpId) {
  if (!d.amps || !d.amps.length) {
    return `<div class="data-empty-note">이 모델의 앰프 매칭 데이터가 아직 입력되지 않았습니다.</div>`;
  }
  let rows = "";
  d.amps.forEach(a => {
    const ampId = resolveAmpId ? resolveAmpId(d.mk, a.model) : null;
    const clickableAttr = ampId ? ` data-amp-id="${ampId}"` : "";
    // 현재 앰프 DB에 등록된 모델(ampId 해석 성공)만 클릭 가능하게 표시하고,
    // 매칭 정보는 있으나 등록되지 않은 구형/미등록 모델(LA12X 등)은
    // match-table__row--static 으로 비활성 느낌을 준다.
    const clickableClass = ampId ? " match-table__row--clickable" : " match-table__row--static";
    if (!a.configs.length) {
      rows += `<div class="match-table__row${clickableClass}"${clickableAttr}><div class="match-table__cell match-table__cell--model">${esc(a.model)}</div><div class="match-table__cell match-table__cell--mode">—</div><div class="match-table__cell"></div><div class="match-table__cell">—</div><div class="match-table__cell">—</div><div class="match-table__cell">—</div></div>`;
      return;
    }
    a.configs.forEach(c => {
      const byPreset = c.splByPreset ? c.splByPreset.filter(p => p.spl != null) : null;
      if (byPreset && byPreset.length) {
        // 프리셋별 SPL 이 있는 설정: 첫 행에만 모델/모드/수량 표기, 이후 행은 프리셋만
        byPreset.forEach((p, i) => {
          rows += `<div class="match-table__row${clickableClass}"${clickableAttr}><div class="match-table__cell match-table__cell--model" title="${i === 0 ? esc(a.model) : ""}">${i === 0 ? esc(a.model) : ""}</div><div class="match-table__cell match-table__cell--mode">${i === 0 ? (c.mode ? esc(c.mode) : "—") : ""}</div><div class="match-table__cell match-table__cell--preset" title="${esc(p.preset)}">${esc(p.preset)}</div><div class="match-table__cell">${i === 0 && c.perCh != null ? c.perCh : ""}</div><div class="match-table__cell">${i === 0 && c.total != null ? c.total : ""}</div><div class="match-table__cell">${p.spl + " dB"}</div></div>`;
        });
      } else if (!c.splByPreset && c.spl != null) {
        rows += `<div class="match-table__row${clickableClass}"${clickableAttr}><div class="match-table__cell match-table__cell--model">${esc(a.model)}</div><div class="match-table__cell match-table__cell--mode">${c.mode ? esc(c.mode) : "—"}</div><div class="match-table__cell match-table__cell--preset">—</div><div class="match-table__cell">${c.perCh != null ? c.perCh : "—"}</div><div class="match-table__cell">${c.total != null ? c.total : "—"}</div><div class="match-table__cell">${c.spl} dB</div></div>`;
      }
    });
  });
  return `<div class="match-table"><div class="match-table__row match-table__row--head"><div class="match-table__cell">Amplifier</div><div class="match-table__cell">Mode</div><div class="match-table__cell">Preset</div><div class="match-table__cell">Links/ch</div><div class="match-table__cell">Max/amp</div><div class="match-table__cell">Max SPL</div></div><div class="match-table__body">${rows}</div></div>
    <div class="footnote">Links/ch = 채널당 직렬 연결 수 · Max/amp = 앰프당 최대 운용 수 · Max SPL = 해당 앰프·프리셋 조합의 최대 음압(1m 피크). 프리셋별 수치가 다른 이유는 프리셋마다 대역폭(BW)/EQ 설정이 달라 음압이 달라지기 때문입니다. 표에는 L-Acoustics Amplification Reference 원본 자료에 수치가 게재된 앰프·프리셋 조합만 표시됩니다(미지원 조합은 제외). 앰프 행을 클릭하면 상세 사양을 나란히 비교할 수 있습니다. 출처: L-Acoustics Amplification Reference technical bulletin v.16.0.</div>`;
}

/**
 * 스피커 상세 모달의 head/body 마크업을 생성한다.
 * @param {Object} d 스피커 레코드
 * @param {Function|null} resolveAmpId cross-ref 의 resolveAmpIdForModel
 * @returns {{color: string, head: string, body: string}}
 */
export function modalBodyHTML(d, resolveAmpId) {
  const lowStr = d.lowInch != null ? `${d.lowQty || ""}${d.lowQty ? " × " : ""}${d.lowInch}″` : null;
  // K1-SB 같은 서브우퍼처럼 transducers 가 로우 대역 1개뿐이면("LF: 2 × 15″")
  // 이미 위의 Low Driver 행("2 × 15″")과 실질적으로 같은 정보를 중복
  // 표시하게 된다. otherBandCount()가 0이면 — 즉 대역이 로우 하나뿐이면 —
  // Transducers 를 생략하고 Low Driver 만 보여준다.
  // K1 처럼 LC/LF/MF/HF 등 대역이 2개 이상(멀티밴드)인 스피커는 Low
  // Driver(로우 대역 하나만) 보다 Transducers(전체 대역 구성)가 훨씬
  // 유용한 정보이므로, Low Driver 행 자체를 밴드별 배지+값 리스트로
  // 대체한다(중복 없이 한 자리만 사용) — 아래 spec-table 조립부의
  // multiBand 분기 참고. lowStr 이 없는(로우 드라이버 정보 자체가 없는)
  // 경우는 중복 판단 기준이 없으므로 안전하게 Transducers 를 --full 로
  // 그대로 표시한다.
  const isMultiBand = !!lowStr && otherBandCount(d.transducers) > 0;
  const showTransducersFull = !lowStr && !!d.transducers;
  // 뷰가 2개 이상(Front/Rear, Front/Array, 향후 I·O 등)인 모델만 전환 버튼을
  // 노출한다. 버튼은 같은 .modal__media 안에서 이미지의 표시 여부를 토글하는
  // data-view-switch 로 동작하며(연결은 modal.js), 뷰가 1개뿐이면 기존처럼
  // 이미지 1장만 표시한다. 버튼 개수는 views 배열 길이만큼 동적으로 생성되므로
  // 새 뷰(Array 등)를 데이터에 추가하기만 하면 버튼이 자동으로 늘어난다.
  // 사진을 가리지 않도록 버튼은 사진 아래 별도 바에 두고, .modal__media-wrap
  // 이 그라디언트 배경을 통째로 감싸 사진 영역과 버튼 바 사이에 경계선/색
  // 전환 없이 하나로 이어지게 한다.
  const views = getViews(d);
  const viewSlug = label => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const media = views.length
    ? (views.length > 1
        ? `<div class="modal__media-wrap">
            <div class="modal__media">
              ${views.map((v, i) => `<img class="modal__img" data-view="${viewSlug(v.label)}" src="${v.src}" alt="${esc(d.name)} ${esc(v.label)}"${i === 0 ? "" : " hidden"}>`).join("")}
            </div>
            <div class="modal__view-switch" role="group" aria-label="이미지 보기 선택">
              ${views.map((v, i) => `<button type="button" class="modal__view-btn${i === 0 ? " is-active" : ""}" data-view-switch="${viewSlug(v.label)}">${esc(v.label)}</button>`).join("")}
            </div>
          </div>`
        : `<div class="modal__media"><img src="${views[0].src}" alt="${esc(d.name)}"></div>`)
    : "";
  const M = MFR[d.mk], color = M.color;
  // Type(라인 어레이/서브우퍼 등)·Crossover(2-way/active 등) 배지는 표
  // 안에 넣기보다 제목과 함께 한눈에 보이는 "요약 태그"로 더 잘 어울려서
  // head 영역의 제목(modal__title) 오른쪽에 배치한다(titleTagsHTML).
  const head = `<div class="modal__head">
      <div class="eyebrow"><span class="eyebrow__brand" style="color:${color}">${esc(M.name)}</span> · ${d.throwCat ? esc(d.throwCat) + ' · ' : ''}${esc(d.series)}</div>
      <div class="modal__head-row">
        <div class="modal__title">${esc(d.name)}</div>
        ${titleTagsHTML(d, "modal__title-tags", "modal__title-tag")}
      </div>
      <button class="modal__close" data-modal-close aria-label="닫기"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>`;
  const body = `${media}
    <div class="modal__body" id="modal-body-main">
      <div class="spec-table">
        ${fillOrphanHalfCells(`
        ${isMultiBand ? transducerBandsHalfRow(d.transducers) : specRow("Low Driver", lowStr)}
        ${specRow("Max SPL", d.spl != null ? d.spl + " dB" : null)}
        ${maxWattRow(d)}
        ${showTransducersFull ? specRow("Transducers", d.transducers, true) : ""}
        ${coverageRows(d.cov)}
        ${freqCell(d.freqs)}
        ${specRow("Connectors", d.connectors)}
        ${specRow("IP Rating", d.ip)}
        ${weightDimsRow(d)}
        `)}
      </div>
      <p class="section-label">Amplifier Matching</p>
      ${ampMatchingHTML(d, resolveAmpId)}
    </div>`;
  return { color, head, body };
}
