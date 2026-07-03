/**
 * @module domains/amplifiers/view
 * 앰프 카드 + 상세 모달 마크업 생성 (순수 함수 모음).
 *
 * 관련 CSS: css/components/card.css, css/components/spec-table.css
 */
import { esc } from "../../core/dom.js";
import { AMP_MFR } from "./amplifiers.schema.js";

/**
 * 앰프의 제품 이미지 뷰 목록을 반환한다 — [{label, src}, ...].
 * speakers.view.js 의 getViews() 와 동일한 패턴: d.views 배열을 직접
 * 선언하거나(임의 개수/라벨), 레거시 img+imgBack 필드를 자동 변환한다.
 * views 도 img 도 없으면 빈 배열(카드에 ⚡ 아이콘 표시, 모달엔 미디어
 * 영역 자체가 생략됨).
 * @param {Object} a 앰프 레코드
 * @returns {{label: string, src: string}[]}
 */
function getViews(a) {
  if (Array.isArray(a.views) && a.views.length) return a.views;
  if (!a.img) return [];
  const views = [{ label: "Front", src: a.img }];
  if (a.imgBack) views.push({ label: "Rear", src: a.imgBack });
  return views;
}

/**
 * 앰프 카드 1장의 HTML 을 생성한다.
 * [정보 우선순위] speakers.view.js cardHTML 과 동일한 원칙 — "이 앰프로
 * 무엇을 할 수 있는가"(실사용 스펙)를 최우선으로 보여준다. "몇 개 스피커와
 * 호환되는가"(Speakers 개수)는 매칭 정보가 갱신될 때마다 바뀌는 부가 지표라
 * 카드 첫 화면보다는 모달 상세에 더 어울린다 — 대신 이 앰프 자체의 스펙인
 * 채널 수(Channels)를 카드에 노출한다.
 * configs(스피커 매칭 설정)가 비어 있는 앰프(예: 신규 등록되어 아직 매칭
 * 정보가 없는 LA1.16i)는 Max Total/Modes 대신 usage/type 같은 일반 스펙을
 * 보여줘 카드가 빈 값으로 허전해 보이지 않게 한다.
 * @param {Object} a 앰프 레코드
 * @returns {string} .card 마크업
 */
export function cardHTML(a) {
  const M = AMP_MFR[a.mfr], color = M.color;
  const hasConfigs = a.configs && a.configs.length;
  const maxTotal = hasConfigs ? a.configs.reduce((m, c) => (c.total != null && c.total > m ? c.total : m), 0) : 0;
  const modes = hasConfigs ? [...new Set(a.configs.map(c => c.mode).filter(Boolean))] : [];
  // 카드 stat-grid 는 1.5fr 열이라도 폭이 넉넉하지 않아 "Installation only"
  // 처럼 긴 값은 말줄임(...)으로 잘린다. 원본 필드(a.usage)는 모달 General
  // 섹션에서 그대로 쓰이므로 데이터 자체를 바꾸지 않고, 카드 표시용으로만
  // "only"를 생략해 짧게 줄인다(의미 손실 없이 "Installation"만으로도 충분히
  // 전달됨 — 상세 문구는 모달에서 확인 가능).
  const usageShort = a.usage ? a.usage.replace(/\s*only$/i, "") : a.usage;
  const statsBlock = hasConfigs
    ? `<div class="stat-grid">
          <div class="stat-grid__cell"><span class="stat-grid__key">Max Total</span><span class="stat-grid__value stat-grid__value--accent">${maxTotal || "—"}</span></div>
          <div class="stat-grid__cell"><span class="stat-grid__key">Modes</span><span class="stat-grid__value">${modes.length ? modes.join(" · ") : "—"}</span></div>
          <div class="stat-grid__cell"><span class="stat-grid__key">Channels</span><span class="stat-grid__value">${a.channels || "—"}</span></div>
        </div>`
    : `<div class="stat-grid">
          <div class="stat-grid__cell"><span class="stat-grid__key">Usage</span><span class="stat-grid__value stat-grid__value--accent">${esc(usageShort || "—")}</span></div>
          <div class="stat-grid__cell"><span class="stat-grid__key">Output</span><span class="stat-grid__value">${esc((a.output && a.output.powerTotal) || "—")}</span></div>
          <div class="stat-grid__cell"><span class="stat-grid__key">Channels</span><span class="stat-grid__value">${a.channels || "—"}</span></div>
        </div>`;
  // 1U 랩마운트 앰프는 실물 비율이 매우 가로로 긴 편(예: LA1.16i 약
  // 10.6:1)이라 card__media 의 기본 max-width 80% 제약을 그대로 쓰면
  // max-height(106px)보다 max-width 쪽이 먼저 걸려 실제 렌더 높이가
  // 지나치게 얇아진다(세로 여백만 다른 카드와 맞으면 되고, 가로는 최대한
  // 채워도 된다는 요청 반영) — card__img--wide 변경자로 이 카드에서만
  // max-width 를 넓혀(94%) 세로 크기(다른 카드와 통일된 리듬)는 유지한
  // 채 가로로 최대한 크게 보이게 한다.
  // [Front/Rear 호버 전환] views 가 2개 이상이면 speakers.view.js 와 동일한
  // 패턴으로 Front/Rear 두 장을 함께 렌더링한다 — 평소엔 Front, 카드에
  // 마우스를 올리면 Rear 로 크로스페이드(card.css 의 --front/--back 규칙).
  const views = getViews(a);
  const media = views.length
    ? (views.length > 1
        ? `<img class="card__img card__img--front card__img--wide" loading="lazy" src="${views[0].src}" alt="${esc(a.model)}"><img class="card__img card__img--back card__img--wide" loading="lazy" src="${views[1].src}" alt="${esc(a.model)} ${esc(views[1].label)}">`
        : `<img class="card__img card__img--wide" loading="lazy" src="${views[0].src}" alt="${esc(a.model)}">`)
    : `<div class="card__noimg">⚡</div>`;
  return `<article class="card" style="--mfr:${color}" tabindex="0" data-id="${a.id}" role="button" aria-label="${esc(a.model)} 상세">
    <div class="card__media">${media}</div>
    <div class="card__body">
      <div class="eyebrow"><span class="eyebrow__brand">${esc(M.short)}</span> · ${esc(a.powerClass || "")}</div>
      <div class="card__name">${esc(a.model)}</div>
      <div class="card__stats">${statsBlock}</div>
    </div>
  </article>`;
}

/**
 * 사양 표 행 1개 HTML (값이 비어 있으면 행 자체를 생략).
 * @param {string} label 항목명
 * @param {*} val 값
 * @param {boolean} [full] true 면 2열 전체 폭 사용
 */
function specRow(label, val, full) {
  if (val == null || String(val).trim() === "") return "";
  return `<div class="spec-table__cell${full ? ' spec-table__cell--full' : ''}"><div class="spec-table__key">${esc(label)}</div><div class="spec-table__value">${esc(val)}</div></div>`;
}

/**
 * 앰프 설정(모드별 Links/Max) 3열 표 HTML. 앰프 자체 필드(a.configs)를 쓴다
 * — d&b 등 기존 앰프처럼 "모델 고정, 모드만 다른" 데이터에 적합.
 * @param {Object[]} configs 앰프의 configs 배열
 * @returns {string}
 */
function configsTableHTML(configs) {
  if (!configs || !configs.length) return `<div class="data-empty-note">설정 데이터가 없습니다.</div>`;
  const rows = configs.map(c => `<div class="match-table__row"><div class="match-table__cell match-table__cell--mode">${c.mode ? esc(c.mode) : "—"}</div><div class="match-table__cell">${c.perCh != null ? c.perCh : "—"}</div><div class="match-table__cell">${c.total != null ? c.total : "—"}</div></div>`).join("");
  return `<div class="match-table match-table--cols-3"><div class="match-table__row match-table__row--head"><div class="match-table__cell">Mode</div><div class="match-table__cell">Links/ch</div><div class="match-table__cell">Max/amp</div></div><div class="match-table__body">${rows}</div></div>`;
}

/**
 * 앰프 설정 표를 스피커 기준으로 렌더링 — 왼쪽 열이 앰프 모델명이 아니라
 * "이 앰프로 어떤 스피커를 어떤 모드/프리셋으로 몇 대까지 구동해 몇 dB 를
 * 내는지"의 스피커 이름이 되는 버전. 스피커 모달의 Amplifier Matching 표
 * (ampMatchingHTML)와 동일한 6열(Speaker·Mode·Preset·Links/ch·Max/amp·
 * Max SPL) 구조를 그대로 재사용해 SPL 정보도 빠짐없이 보여준다. LA1.16i
 * 처럼 앰프 자체 configs 필드가 비어있어도 cross-ref.findAmpConfigsBySpeaker()
 * 가 스피커 쪽 매칭 데이터(splByPreset 포함)에서 역으로 구성해주므로 그대로
 * 쓴다.
 *
 * 스피커 1개당 모드×프리셋 조합이 여러 행 나올 수 있어(예: SE/BTL × 3개
 * 프리셋 = 6행) 스피커 이름이 여러 번 반복되어 표가 길고 복잡해 보이는
 * 문제를, 스피커별로 대표 행(Max/amp 가 가장 큰 설정) 1개만 기본 표시하고
 * 나머지 행은 별도의 펼치기 버튼(▸)으로 열리는 접기/펼치기 구조로
 * 해결한다(스피커 이름 반복 없이 요약 → 필요할 때만 모드/프리셋별 상세).
 * 클릭 영역을 명확히 분리: 스피커 이름(모델 셀)을 클릭하면 항상 Split
 * View 로 이동하고, 별도의 ▸ 토글 버튼을 클릭하면 나머지 설정 행이
 * 펼쳐진다 — 두 동작이 같은 셀에서 겹치지 않게 버튼을 분리된 요소로 둔다.
 * @param {{speakerId:string, speakerName:string, mode:string, preset:string|null, perCh:number|null, total:number|null, spl:number|null}[]} rows
 * @returns {string}
 */
function configsBySpeakerTableHTML(rows) {
  if (!rows || !rows.length) return `<div class="data-empty-note">설정 데이터가 없습니다.</div>`;

  // 스피커 id 순으로 등장 순서를 보존하며 그룹핑
  const groups = [];
  const bySid = new Map();
  rows.forEach(r => {
    if (!bySid.has(r.speakerId)) { const g = { speakerId: r.speakerId, speakerName: r.speakerName, rows: [] }; bySid.set(r.speakerId, g); groups.push(g); }
    bySid.get(r.speakerId).rows.push(r);
  });

  const subCell = r => `<div class="match-table__cell match-table__cell--model"></div><div class="match-table__cell match-table__cell--mode">${r.mode ? esc(r.mode) : "—"}</div><div class="match-table__cell match-table__cell--preset">${r.preset ? esc(r.preset) : "—"}</div><div class="match-table__cell">${r.perCh != null ? r.perCh : "—"}</div><div class="match-table__cell">${r.total != null ? r.total : "—"}</div><div class="match-table__cell">${r.spl != null ? r.spl + " dB" : "—"}</div>`;

  const body = groups.map((g, gi) => {
    const sorted = [...g.rows].sort((a, b) => (b.total || 0) - (a.total || 0));
    const rep = sorted[0];
    const rest = sorted.slice(1);
    const groupId = `amp-cfg-${gi}`;
    const toggleBtn = rest.length ? `<button type="button" class="match-table__toggle-btn" data-toggle-group="${groupId}" aria-expanded="false" aria-label="설정 ${rest.length}개 더 보기">+${rest.length}</button>` : "";
    const repRow = `<div class="match-table__row match-table__row--clickable" data-speaker-id="${g.speakerId}"><div class="match-table__cell match-table__cell--model"><span class="match-table__model-name">${esc(rep.speakerName)}</span>${toggleBtn}</div><div class="match-table__cell match-table__cell--mode">${rep.mode ? esc(rep.mode) : "—"}</div><div class="match-table__cell match-table__cell--preset">${rep.preset ? esc(rep.preset) : "—"}</div><div class="match-table__cell">${rep.perCh != null ? rep.perCh : "—"}</div><div class="match-table__cell">${rep.total != null ? rep.total : "—"}</div><div class="match-table__cell">${rep.spl != null ? rep.spl + " dB" : "—"}</div></div>`;
    if (!rest.length) return repRow;
    const restRows = rest.map(r => `<div class="match-table__row match-table__row--sub" data-toggle-member="${groupId}" hidden>${subCell(r)}</div>`).join("");
    return repRow + restRows;
  }).join("");

  // match-table--amp-view 변경자 — 이 표(앰프 모달의 Configurations, "이
  // 앰프로 어떤 스피커를 구동하는가")는 스피커 모달의 Amplifier Matching
  // 표("이 스피커를 어떤 앰프로 구동하는가")와 6열 구조·클래스를 공유하지만,
  // 왼쪽 열의 실제 콘텐츠가 반대다 — 여기서는 앰프 모델명(짧다, 예:
  // "LA1.16i")이 아니라 스피커 모델명(길다, 예: "SB10i", "Syva Low" 등)이
  // 들어간다. 공유 컬럼 비율(spec-table.css .match-table__row)은 앰프 모델
  // 폭 기준으로 좁게 잡혀 있어 스피커 이름이 "S...", "5..."처럼 잘리는
  // 문제가 있었다 — 이 변경자로 앰프 쪽만 열 너비를 독립적으로 재정의한다
  // (spec-table.css 의 .match-table--amp-view 규칙 참고).
  return `<div class="match-table match-table--toggleable match-table--amp-view"><div class="match-table__row match-table__row--head"><div class="match-table__cell">Speaker</div><div class="match-table__cell">Mode</div><div class="match-table__cell">Preset</div><div class="match-table__cell">Links/ch</div><div class="match-table__cell">Max/amp</div><div class="match-table__cell">Max SPL</div></div><div class="match-table__body">${body}</div></div>`;
}

/**
 * 상세 스펙 섹션 1개 HTML — 제목(section-label) + spec-table.
 * rows 가 전부 빈 문자열(specRow 가 값 없어 생략한 경우)이면 섹션 자체를
 * 통째로 생략한다 — d&b 등 이 필드들이 없는 앰프에서 빈 제목만 남지 않게.
 * @param {string} title 섹션 제목
 * @param {string} rows specRow() 등으로 만든 spec-table__cell 마크업들의 연결
 * @returns {string}
 */
function detailSection(title, rows) {
  if (!rows || !rows.trim()) return "";
  return `<p class="section-label" style="margin-top:20px">${esc(title)}</p><div class="spec-table">${rows}</div>`;
}

/**
 * features(문자열 배열)를 칩 형태로 렌더링.
 * @param {string[]} list
 * @returns {string}
 */
function featureChips(list) {
  if (!list || !list.length) return "";
  return `<div class="chip-group">${list.map(f => `<span class="chip" style="cursor:default">${esc(f)}</span>`).join("")}</div>`;
}

/**
 * 배지(짧은 라벨) + 값 쌍의 목록을 스피커 모달의 Frequency Response와 같은
 * freq-list 그리드로 렌더링한다. Latency Standard/Low 처럼 같은 항목의
 * 서로 다른 모드를 한 셀 안에 나란히 묶어 보여줄 때 쓴다(각각 별도 행으로
 * 흩어놓지 않음). 값이 있는 항목만 표시하고, 전부 없으면 빈 문자열 반환.
 * @param {{label:string, value:*}[]} items
 * @returns {string} spec-table__value 안에 넣을 freq-list 마크업 (없으면 "")
 */
function badgeListHTML(items) {
  const rows = items.filter(it => it.value != null && String(it.value).trim() !== "")
    .map(it => `<div class="freq-list__row"><span class="freq-badge freq-badge--auto">${esc(it.label)}</span><span class="freq-list__val">${esc(it.value)}</span></div>`)
    .join("");
  return rows ? `<div class="freq-list">${rows}</div>` : "";
}

/**
 * 앰프 상세 모달의 head/body 마크업을 생성한다.
 * 매칭 스피커 칩에는 data-speaker-id 가 붙는다 — 클릭 → Split View 연결은
 * controller 가 담당 (앰프 → 스피커 방향).
 * @param {Object} a 앰프 레코드
 * @param {Function|null} resolveSpeakerName (speakerId) => 표시 이름
 * @param {string[]} [speakerIds] 이 앰프를 매칭하는 스피커 id 목록. 미지정 시
 *   a.relations.speakerIds 로 폴백(레거시 정적 필드 — 현재는 비어있는 경우가
 *   많으므로 controller 가 cross-ref.findSpeakersMatchingAmp() 로 동적 계산해
 *   넘겨주는 것을 권장).
 * @param {Object[]} [configsBySpeaker] cross-ref.findAmpConfigsBySpeaker() 로
 *   구한 스피커 기준 설정 행. a.configs(앰프 자체 필드)가 비어있을 때
 *   Configurations 표를 이걸로 대체 렌더링한다(LA1.16i 등).
 * @returns {{color: string, head: string, body: string}}
 */
export function modalBodyHTML(a, resolveSpeakerName, speakerIds, configsBySpeaker) {
  const M = AMP_MFR[a.mfr], color = M.color;
  // 뷰가 2개 이상(Front/Rear/Isometric 등)인 앰프만 전환 버튼을 노출한다
  // — speakers.view.js modalBodyHTML 의 동일 로직 재사용(getViews, 버튼
  // 클릭 연결은 js/ui/modal.js 의 wireViewSwitch 가 도메인 무관하게 처리).
  const views = getViews(a);
  const viewSlug = label => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  // 1U 랩마운트 앰프(LA1.16i 등)는 실물 비율이 매우 가로로 길어 기본
  // max-width 74% 를 쓰면 세로 크기가 지나치게 얇아진다 — card__img--wide
  // 와 동일한 이유로 modal__img--wide 변경자를 둬서 max-width 만 넓힌다.
  const media = views.length
    ? (views.length > 1
        ? `<div class="modal__media-wrap">
            <div class="modal__media">
              ${views.map((v, i) => `<img class="modal__img modal__img--wide" data-view="${viewSlug(v.label)}" src="${v.src}" alt="${esc(a.model)} ${esc(v.label)}"${i === 0 ? "" : " hidden"}>`).join("")}
            </div>
            <div class="modal__view-switch" role="group" aria-label="이미지 보기 선택">
              ${views.map((v, i) => `<button type="button" class="modal__view-btn${i === 0 ? " is-active" : ""}" data-view-switch="${viewSlug(v.label)}">${esc(v.label)}</button>`).join("")}
            </div>
          </div>`
        : `<div class="modal__media"><img class="modal__img--wide" src="${views[0].src}" alt="${esc(a.model)}"></div>`)
    : "";
  const head = `<div class="modal__head">
      <div class="eyebrow"><span class="eyebrow__brand" style="color:${color}">${esc(M.name)}</span> · ${esc(a.powerClass || "")}</div>
      <div class="modal__title">${esc(a.model)}</div>
      <button class="modal__close" data-modal-close aria-label="닫기"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>`;
  const matchedSpeakerIds = speakerIds || a.relations.speakerIds;
  const speakerChips = matchedSpeakerIds.map(sid => {
    const name = resolveSpeakerName ? resolveSpeakerName(sid) : sid;
    return `<button class="chip" data-speaker-id="${sid}" type="button">${esc(name)}</button>`;
  }).join("");
  // 상세 스펙 섹션들 — mains/io/output/dsp/ecosystem 등은 L-Acoustics
  // LA1.16i 부터 도입된 신규 필드(v1.1)라 d&b 등 기존 앰프에는 없을 수
  // 있다. detailSection()이 빈 rows 는 섹션째로 생략하므로, 필드가 없는
  // 앰프의 모달에는 자연스럽게 General/Configurations/Matched Speakers만
  // 남고 나머지 섹션은 나타나지 않는다.
  const mains = a.mains || {};
  const io = a.io || {};
  const output = a.output || {};
  const dsp = a.dsp || {};
  const eco = a.ecosystem || {};
  const note = a.note || {};

  // [정보 재구성] speakers.view.js modalBodyHTML 과 동일한 원칙 — 실사용에
  // 필요한 핵심 스펙을 최상단 spec-table 하나에 압축하고, 섹션을 잘게
  // 쪼개 스크롤을 늘리지 않는다. 기존에는 General/Mains/I·O/Output/DSP/
  // Ecosystem 이 6개 섹션으로 나뉘어 있었는데:
  //   - output.channels 는 General 의 Channels 와 항상 같은 값이라 중복
  //     이었으므로 제거(CLAUDE.md "중복 정보 생략" 원칙).
  //   - Connectivity(대역폭 연결 방식)는 I·O 스펙과 성격이 같아 General
  //     에서 빼내 I/O 섹션으로 합쳤다.
  //   - Power Supply/External DSP Backup 은 전원 관련 스펙이라 Mains
  //     섹션으로 합쳤다.
  //   - I/O 와 Output 은 "입력 쪽/출력 쪽"으로 나뉘어 있었지만 실사용
  //     관점에서는 "이 앰프의 연결·출력 스펙"으로 함께 보는 게 자연스러워
  //     하나의 Connections & Output 섹션으로 합쳤다.
  //   - IP 등급/랙유닛/무게/냉각/동작온도는 "이 앰프가 무엇인가"보다는
  //     설치 시에나 참고하는 물리적 스펙이라 General 에서 빼내 맨 아래
  //     Physical 섹션으로 내렸다.
  // 그 결과 General(개요) → Matched Speakers/Configurations(가장 자주
  // 쓰는 정보) → Mains → Connections & Output → DSP → Ecosystem → Features
  // → Notes & Protection → Physical(부가 정보) 순으로, 중요도 높은 정보가
  // 위로, 설치용 참고 스펙은 맨 아래로 정리됐다.
  // General 은 "이 앰프가 무엇인가"(채널·파워클래스·타입·용도)만 남기고,
  // 설치/물리 스펙(IP 등급·랙유닛·무게·냉각·동작온도)은 실사용 의사결정
  // (구동 가능한 스피커/모드 확인)에는 덜 중요한 부가 정보라 Physical
  // 섹션으로 분리해 아래쪽으로 뺀다.
  const generalRows = [
    specRow("Channels", a.channels != null ? a.channels + "ch" : null),
    specRow("Power Class", a.powerClass),
    specRow("Type", a.type),
    specRow("Usage", a.usage),
  ].join("");

  const physicalRows = [
    specRow("IP Rating", a.ipRating),
    specRow("Rack Unit", a.rackUnit != null ? a.rackUnit + "U" : null),
    specRow("Weight", a.weight != null ? a.weight + " kg" : null),
    specRow("Cooling", a.cooling),
    specRow("Operating Temp", a.operatingTemp),
  ].join("");

  const mainsRows = [
    specRow("Rating", mains.rating),
    specRow("Connector", mains.connector),
    specRow("Power Supply", a.powerSupply),
    specRow("External DSP Backup", a.externalDspBackup),
    specRow("Power Requirements", mains.powerRequirements, true),
  ].join("");

  // Connections & Output — 입력 연결(Connectivity/Analog/AES/Network)과
  // 출력 스펙(Connectors/Impedance/Power)을 한 섹션에 모은다. output.channels
  // 는 General 의 Channels 와 값이 항상 같아 제거했다(중복 정보 생략).
  const ioRows = [
    specRow("Connectivity", (a.connectivity || []).join(" · "), true),
    specRow("Analog In", io.analogIn),
    specRow("AES In", io.aesIn),
    specRow("Network Audio", io.networkAudio),
    specRow("Network Redundancy", io.networkRedundancy),
    specRow("Connections", io.connections, true),
    specRow("Output Connectors", output.connectors),
    specRow("Min Impedance", output.minImpedance),
    specRow("Total Power", output.powerTotal),
    specRow("Power @8Ω", output.power8ohms),
    specRow("Power @4Ω", output.power4ohms),
    specRow("Power BTL @8Ω", output.powerBtl8ohms),
  ].join("");

  // Latency Standard/Low 와 Sample Rate Internal/AES In/Network In 모두
  // Frequency Response(-3dB/-6dB/-10dB)와 같은 방식으로 "모드 배지 + 값"을
  // 한 셀에 나란히 묶는다(badgeListHTML). Sample Rate 는 값이 길어 배지
  // 폭이 자동(freq-badge--auto)이라도 한 줄에 다 안 들어갈 수 있으므로
  // 병합 셀(--full)에 넣어 폭을 넉넉히 확보한다.
  const latencyList = badgeListHTML([
    { label: "Standard", value: dsp.latencyStandard },
    { label: "Low", value: dsp.latencyLow },
  ]);
  const sampleRateList = badgeListHTML([
    { label: "Internal", value: dsp.sampleRateInternal },
    { label: "AES In", value: dsp.sampleRateAesIn },
    { label: "Network In", value: dsp.sampleRateNetworkIn },
  ]);
  const dspRows = [
    specRow("Engine", dsp.engine),
    sampleRateList ? `<div class="spec-table__cell spec-table__cell--full"><div class="spec-table__key">Sample Rate</div><div class="spec-table__value">${sampleRateList}</div></div>` : "",
    specRow("Bit Depth", dsp.bitDepth),
    specRow("Routing", dsp.routing),
    specRow("EQ Specs", dsp.eqSpecs, true),
    specRow("Preset Library", dsp.presetLibrary),
    latencyList ? `<div class="spec-table__cell"><div class="spec-table__key">Latency</div><div class="spec-table__value">${latencyList}</div></div>` : "",
  ].join("");

  const ecoRows = [
    specRow("Control Software", eco.controlSoft),
    specRow("Integrations", (eco.integrations || []).join(" · ")),
  ].join("");

  const noteRows = [
    specRow("Model Type", note.modelType, true),
    specRow("Channel Processing", note.channelProcessing, true),
    specRow("Protection", note.protection, true),
    specRow("Interface", note.interface, true),
  ].join("");

  // Matched Speakers/Configurations 는 Split View 로 스피커 상세를 오가며
  // 가장 자주 쓰이는 핵심 정보라, 상세 스펙(Mains/I·O/Output/DSP/...)보다
  // 먼저 General 섹션 바로 아래에 배치한다 — 모달을 열자마자 스크롤 없이
  // 바로 매칭 스피커 칩을 보고 클릭할 수 있게.
  // a.notes(자유 서술문, 예: "설치용(install-only) 16채널 앰프 컨트롤러...")는
  // 카드에서는 뺐다(스피커 카드의 card__config 처럼 짧은 스펙 요약이 아니라
  // 문장형이라 카드 첫 화면에는 어울리지 않음) — 정보 자체는 유실하지 않고
  // 모달 상세 첫 줄(General 표 바로 위)에 노출한다.
  const body = `${media}
    <div class="modal__body" id="modal-body-main">
      ${a.notes ? `<p class="modal__notes">${esc(a.notes)}</p>` : ""}
      <div class="spec-table">
        ${generalRows}
      </div>
      <p class="section-label" style="margin-top:20px">Matched Speakers (${matchedSpeakerIds.length})</p>
      <div class="chip-group">${speakerChips || '<span class="hint-text">매칭된 스피커가 없습니다.</span>'}</div>
      <p class="section-label" style="margin-top:20px">Configurations</p>
      ${a.configs && a.configs.length ? configsTableHTML(a.configs) : configsBySpeakerTableHTML(configsBySpeaker || [])}
      ${detailSection("Mains", mainsRows)}
      ${detailSection("Connections & Output", ioRows)}
      ${detailSection("DSP", dspRows)}
      ${detailSection("Ecosystem", ecoRows)}
      ${a.features && a.features.length ? `<p class="section-label" style="margin-top:20px">Features</p>${featureChips(a.features)}` : ""}
      ${detailSection("Notes & Protection", noteRows)}
      ${detailSection("Physical", physicalRows)}
    </div>`;
  return { color, head, body };
}
