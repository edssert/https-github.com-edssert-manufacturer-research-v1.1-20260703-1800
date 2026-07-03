/**
 * @module domains/speakers/controller
 * Speakers 탭 컨트롤러 — mount/unmount/build/reset/render + 모달·Split View 연결.
 * 라우터에 스스로 등록하므로, 이 탭의 내부 동작을 밖에서 알 필요가 없다.
 *
 * 구성 요소:
 *   speakers.data.js   — 데이터 (시리즈별 파일의 배럴)
 *   speakers.schema.js — 필터/정렬/파생 필드 정의
 *   speakers.view.js   — 카드/모달 마크업 (순수 함수)
 */
import { createState, resetState } from "../../core/state.js";
import { $, esc } from "../../core/dom.js";
import { buildFilters, wireFilterToggle } from "../../ui/filters.js";
import { renderGrid } from "../../ui/card-grid.js";
import { openModalWith } from "../../ui/modal.js";
import { openSplitPane } from "../../ui/split-view.js";
import { registerDomain } from "../../core/router.js";
import { refreshNavCounts } from "../../ui/nav.js";
import { registerSpeakers, resolveAmpIdForModel, findAmplifierById, findSpeakerById } from "../../relationships/cross-ref.js";

import { SPEAKERS } from "./speakers.data.js";
import { speakersSchema, MFR, MK_ORDER, normalizeCrossover, normalizeLowUnitConfig, normalizeAngleRanges, THROWCAT_ORDER } from "./speakers.schema.js";
import { cardHTML as speakerCardHTML, modalBodyHTML as speakerModalBodyHTML, setSplRange } from "./speakers.view.js";

// 스피커 모달 안에서 앰프 행을 클릭하면 Split View pane 2 에 앰프 상세를 띄운다.
// 이때 앰프의 "순수 뷰 함수"만 import — 앰프 controller 를 import 하지 않아
// 컨트롤러 간 결합이 생기지 않는다.
import { AMP_MFR } from "../amplifiers/amplifiers.schema.js";
import { modalBodyHTML as ampModalBodyHTML } from "../amplifiers/amplifiers.view.js";

// 파생 필드(wayCount/network/lowUnitConfig/hRange/vRange/splayRange)를 UI 가
// 읽기 전에 생성하고, cross-ref 레지스트리에 스피커 데이터를 등록한다
// (모듈 로드 시 1회).
normalizeCrossover(SPEAKERS);
normalizeLowUnitConfig(SPEAKERS);
normalizeAngleRanges(SPEAKERS);
registerSpeakers(SPEAKERS);

const speakersState = createState();
speakersState.sort = "series";

/** 탭 활성화: 최초 1회 UI 빌드 후 렌더 (이후엔 hidden 만 해제) */
function mountSpeakers() {
  const wrap = $("#view-speakers");
  wrap.hidden = false;
  if (!wrap.dataset.built) {
    wrap.dataset.built = "1";
    buildSpeakersUI(wrap);
  }
  renderSpeakers();
}

/** 탭 비활성화: 뷰 숨김 (상태/DOM 유지) */
function unmountSpeakers() { $("#view-speakers").hidden = true; }

/**
 * 검색/정렬/필터 컨트롤 바 + 결과 영역의 골격을 1회 빌드하고 이벤트를 연결한다.
 * @param {HTMLElement} wrap #view-speakers 컨테이너
 */
function buildSpeakersUI(wrap) {
  const splVals = SPEAKERS.map(d => d.spl).filter(x => x != null);
  setSplRange(Math.floor(Math.min(...splVals)), Math.ceil(Math.max(...splVals)));

  wrap.innerHTML = `
    <div class="controls">
      <div class="controls__inner">
        <div class="controls__row">
          <label class="search-box">
            <svg class="search-box__icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            <input class="search-box__input" id="spk-q" type="search" placeholder="스피커 이름 검색  ·  e.g.  K2 / KS28 / GSL12 / Syva" autocomplete="off" spellcheck="false" />
          </label>
          <div class="controls__tools">
            <select class="select" id="spk-sort">
              <option value="series">정렬 · 시리즈</option>
              <option value="spl">정렬 · 음압 높은순</option>
              <option value="inch-desc">정렬 · 드라이버 큰순</option>
              <option value="inch-asc">정렬 · 드라이버 작은순</option>
              <option value="name">정렬 · 이름순</option>
            </select>
            <button class="btn" id="spk-reset">필터 초기화</button>
            <button class="btn btn--toggle" id="spk-filter-toggle" type="button" aria-expanded="false">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              필터
            </button>
          </div>
        </div>
        <div class="filter-panel" id="spk-filters"></div>
      </div>
    </div>
    <div class="content-wrap">
      <div id="spk-results"></div>
    </div>`;

  buildFilters($("#spk-filters"), SPEAKERS, speakersState, speakersSchema, renderSpeakers);
  wireFilterToggle($("#spk-filter-toggle"), $("#spk-filters"));

  $("#spk-q").addEventListener("input", e => { speakersState.q = e.target.value.trim(); renderSpeakers(); });
  $("#spk-sort").addEventListener("change", e => { speakersState.sort = e.target.value; renderSpeakers(); });
  $("#spk-reset").onclick = resetSpeakers;
}

/** 검색어/칩/정렬을 초기화하고 필터 패널을 재빌드한 뒤 다시 렌더링 */
function resetSpeakers() {
  resetState(speakersState, speakersSchema);
  $("#spk-q").value = "";
  $("#spk-sort").value = "series";
  document.querySelectorAll("#spk-filters .chip").forEach(c => c.setAttribute("aria-pressed", "false"));
  buildFilters($("#spk-filters"), SPEAKERS, speakersState, speakersSchema, renderSpeakers);
  renderSpeakers();
}

/** 현재 상태로 결과 그리드를 렌더링 (시리즈 정렬 시 제조사>시리즈 그룹핑) */
function renderSpeakers() {
  renderGrid({
    resultsEl: $("#spk-results"),
    countEl: $("#count"),
    filterPanelEl: $("#spk-filters"),
    data: SPEAKERS,
    state: speakersState,
    schema: speakersSchema,
    cardHTML: speakerCardHTML,
    onOpen: openSpeakerModal,
    groupBy: speakersState.sort === "series" ? {
      order: MK_ORDER,
      getKey: d => d.mk,
      subGroupKey: d => d.series,
      // 시리즈는 throw 등급(Long → Medium → Short) 순으로 배치. throwCat 이
      // 없는 독립 서브우퍼 시리즈(예: L-Acoustics "Subwoofers")는 맨 뒤로.
      subGroupOrder: (sgA, sgB) => {
        const itemA = SPEAKERS.find(d => d.series === sgA);
        const itemB = SPEAKERS.find(d => d.series === sgB);
        const ia = itemA && itemA.throwCat ? THROWCAT_ORDER.indexOf(itemA.throwCat) : -1;
        const ib = itemB && itemB.throwCat ? THROWCAT_ORDER.indexOf(itemB.throwCat) : -1;
        const ra = ia === -1 ? THROWCAT_ORDER.length : ia;
        const rb = ib === -1 ? THROWCAT_ORDER.length : ib;
        if (ra !== rb) return ra - rb;
        return String(sgA).localeCompare(String(sgB));
      },
      // 시리즈 내부: Subwoofer 타입(K1-SB, CCL-SUB 등)은 항상 뒤로,
      // 나머지는 저역 드라이버 크기 큰 순 (동률이면 이름순).
      sortWithinGroup: (a, b) => {
        const subA = a.type === "Subwoofer" ? 1 : 0;
        const subB = b.type === "Subwoofer" ? 1 : 0;
        if (subA !== subB) return subA - subB;
        const diA = a.lowInch || 0, diB = b.lowInch || 0;
        if (diA !== diB) return diB - diA;
        return a.name.localeCompare(b.name);
      },
      headHTML: (mk, series, group) => {
        const gt = group[0].throwCat ? esc(group[0].throwCat) + ' · ' + esc(series) : esc(series);
        return `<span class="card-group__badge card-group__badge--name" style="border-color:${MFR[mk].color}55;color:${MFR[mk].color}">${esc(MFR[mk].name)}</span><span class="card-group__title">${gt}</span><span class="card-group__count">${group.length} ea</span>`;
      }
    } : null,
  });
  renderLegend();
  refreshNavCounts();
}

/** 상단바 범례(제조사 색상)를 현재 데이터 기준으로 렌더링 */
function renderLegend() {
  const lg = $("#legend");
  lg.innerHTML = "";
  MK_ORDER.filter(k => SPEAKERS.some(d => d.mk === k)).forEach(k => {
    const e = document.createElement("div");
    e.className = "legend__item";
    e.innerHTML = `<span class="legend__dot" style="background:${MFR[k].color}"></span>${esc(MFR[k].name)}`;
    lg.appendChild(e);
  });
}

/**
 * 스피커 상세 모달을 연다.
 * @param {string} id 스피커 id
 */
function openSpeakerModal(id) {
  const d = SPEAKERS.find(s => s.id === id);
  if (!d) return;
  const { color, head, body } = speakerModalBodyHTML(d, resolveAmpIdForModel);
  openModalWith(color, head, body);
  wireSpeakerModalAmpClicks();
}

/**
 * 방금 렌더된 스피커 모달 안의 앰프 행 클릭 → Split View pane 2 에 앰프 상세.
 * (스피커 → 앰프 방향)
 */
function wireSpeakerModalAmpClicks() {
  document.querySelectorAll("#modal .match-table__row[data-amp-id]").forEach(row => {
    row.addEventListener("click", () => {
      const ampId = row.dataset.ampId;
      const amp = findAmplifierById(ampId);
      if (!amp) return;
      const M = AMP_MFR[amp.mfr];
      const { head, body } = ampModalBodyHTML(amp, (sid) => { const s = findSpeakerById(sid); return s ? s.name : sid; });
      // 같은 앰프 행을 다시 클릭하면(paneId 일치) pane 2 가 열려있지 않고
      // 토글로 닫힌다 — X 버튼까지 마우스를 옮기지 않아도 됨. head 는
      // pane1(스피커 모달)과 동일한 .modal__head 구조라 X 버튼 위치·제목
      // 표기 방식이 좌우 pane 모두 통일된다.
      const opened = openSplitPane({
        headHTML: head,
        paneColor: M.color,
        bodyHTML: body,
        paneId: ampId,
      });
      if (opened) wireSplitPaneSpeakerChips();
    });
  });
}

/** Split View pane 2(앰프 상세) 안의 스피커 칩 클릭 → 그 스피커의 모달로 점프 */
function wireSplitPaneSpeakerChips() {
  document.querySelectorAll("#modal .split-view__pane:nth-child(2) [data-speaker-id]").forEach(chip => {
    chip.addEventListener("click", () => {
      const sid = chip.dataset.speakerId;
      const s = findSpeakerById(sid);
      if (!s) return;
      openSpeakerModal(sid);
    });
  });
}

/** Speakers 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initSpeakersDomain() {
  registerDomain("speakers", { label: "Speaker", mount: mountSpeakers, unmount: unmountSpeakers, count: () => SPEAKERS.length });
}
