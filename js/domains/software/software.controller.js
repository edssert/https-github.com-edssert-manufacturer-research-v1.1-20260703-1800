/**
 * @module domains/software/controller
 * Software 탭 컨트롤러 — mount/unmount/build/reset/render + 모달·Split View 연결.
 *
 * 구성 요소:
 *   software.data.js   — 데이터 (브랜드별 파일의 배럴)
 *   software.schema.js — 필터/정렬 정의
 *   software.view.js   — 카드/모달 마크업 (순수 함수)
 */
import { createState, resetState } from "../../core/state.js";
import { $, esc } from "../../core/dom.js";
import { buildFilters, wireFilterToggle } from "../../ui/filters.js";
import { renderGrid } from "../../ui/card-grid.js";
import { openModalWith } from "../../ui/modal.js";
import { openSplitPane } from "../../ui/split-view.js";
import { registerDomain } from "../../core/router.js";
import { refreshNavCounts } from "../../ui/nav.js";

import { SOFTWARE } from "./software.data.js";
import { softwareSchema, SW_MFR, SW_MK_ORDER } from "./software.schema.js";
import { cardHTML as swCardHTML, modalBodyHTML as swModalBodyHTML } from "./software.view.js";

// 소프트웨어 모달 안의 DSP 칩 클릭 → Split View pane 2 에 DSP 상세.
// DSP 의 "순수 뷰 함수"와 색상 맵만 import (controller 미참조).
import { DSPS } from "../dsps/dsps.data.js";
import { DSP_MFR } from "../dsps/dsps.schema.js";
import { modalBodyHTML as dspModalBodyHTML } from "../dsps/dsps.view.js";

const swState = createState();
swState.sort = "type";

/** 탭 활성화: 최초 1회 UI 빌드 후 렌더 */
function mountSoftware() {
  const wrap = $("#view-software");
  wrap.hidden = false;
  if (!wrap.dataset.built) {
    wrap.dataset.built = "1";
    buildSoftwareUI(wrap);
  }
  renderSoftware();
}

/** 탭 비활성화: 뷰 숨김 */
function unmountSoftware() { $("#view-software").hidden = true; }

/**
 * 컨트롤 바 + 결과 영역 골격을 1회 빌드하고 이벤트를 연결한다.
 * @param {HTMLElement} wrap #view-software 컨테이너
 */
function buildSoftwareUI(wrap) {
  wrap.innerHTML = `
    <div class="controls">
      <div class="controls__inner">
        <div class="controls__row">
          <label class="search-box">
            <svg class="search-box__icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            <input class="search-box__input" id="sw-q" type="search" placeholder="소프트웨어 검색  ·  e.g.  Soundvision / R1 / Compass" autocomplete="off" spellcheck="false" />
          </label>
          <div class="controls__tools">
            <select class="select" id="sw-sort">
              <option value="type">정렬 · 제조사별</option>
              <option value="name">정렬 · 이름순</option>
            </select>
            <button class="btn" id="sw-reset">필터 초기화</button>
            <button class="btn btn--toggle" id="sw-filter-toggle" type="button" aria-expanded="false">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              필터
            </button>
          </div>
        </div>
        <div class="filter-panel" id="sw-filters"></div>
      </div>
    </div>
    <div class="content-wrap">
      <div id="sw-results"></div>
    </div>`;

  buildFilters($("#sw-filters"), SOFTWARE, swState, softwareSchema, renderSoftware);
  wireFilterToggle($("#sw-filter-toggle"), $("#sw-filters"));

  $("#sw-q").addEventListener("input", e => { swState.q = e.target.value.trim(); renderSoftware(); });
  $("#sw-sort").addEventListener("change", e => { swState.sort = e.target.value; renderSoftware(); });
  $("#sw-reset").onclick = resetSoftware;
}

/** 검색어/칩/정렬 초기화 후 재렌더링 */
function resetSoftware() {
  resetState(swState, softwareSchema);
  $("#sw-q").value = "";
  $("#sw-sort").value = "type";
  document.querySelectorAll("#sw-filters .chip").forEach(c => c.setAttribute("aria-pressed", "false"));
  buildFilters($("#sw-filters"), SOFTWARE, swState, softwareSchema, renderSoftware);
  renderSoftware();
}

// type 필드가 없는 소프트웨어(현재 데이터에는 없지만 향후 대비)는 "Software"로 묶는다.
const swTypeOf = s => s.type || "Software";

/** 현재 상태로 결과 그리드 렌더링 (제조사별 정렬 시 제조사>유형 그룹핑) */
function renderSoftware() {
  renderGrid({
    resultsEl: $("#sw-results"),
    countEl: $("#count"),
    filterPanelEl: $("#sw-filters"),
    data: SOFTWARE,
    state: swState,
    schema: softwareSchema,
    cardHTML: swCardHTML,
    onOpen: openSoftwareModal,
    groupBy: swState.sort === "type" ? {
      order: SW_MK_ORDER,
      getKey: d => d.mfr,
      subGroupKey: d => swTypeOf(d),
      subGroupOrder: (sgA, sgB) => sgA.localeCompare(sgB),
      sortWithinGroup: (a, b) => a.name.localeCompare(b.name),
      headHTML: (mfr, type, group) => {
        return `<span class="card-group__badge card-group__badge--name" style="border-color:${SW_MFR[mfr].color}55;color:${SW_MFR[mfr].color}">${esc(SW_MFR[mfr].name)}</span><span class="card-group__title">${esc(type)}</span><span class="card-group__count">${group.length} ea</span>`;
      }
    } : null,
  });
  refreshNavCounts();
}

/**
 * 소프트웨어 상세 모달을 연다.
 * @param {string} id 소프트웨어 id
 */
function openSoftwareModal(id) {
  const s = SOFTWARE.find(x => x.id === id);
  if (!s) return;
  const { color, head, body } = swModalBodyHTML(s, (did) => { const d = DSPS.find(x => x.id === did); return d ? d.model : did; });
  openModalWith(color, head, body);
  wireSoftwareModalDspClicks();
}

/** 소프트웨어 모달 안의 DSP 칩 클릭 → Split View pane 2 에 DSP 상세 */
function wireSoftwareModalDspClicks() {
  document.querySelectorAll("#modal [data-dsp-id]").forEach(chip => {
    chip.addEventListener("click", () => {
      const did = chip.dataset.dspId;
      const d = DSPS.find(x => x.id === did);
      if (!d) return;
      const M = DSP_MFR[d.mfr];
      const { head, body } = dspModalBodyHTML(d, (sid) => { const s = SOFTWARE.find(x => x.id === sid); return s ? s.name : sid; });
      openSplitPane({ headHTML: head, paneColor: M.color, bodyHTML: body });
    });
  });
}

/** Software 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initSoftwareDomain() {
  registerDomain("software", { label: "Software", mount: mountSoftware, unmount: unmountSoftware, count: () => SOFTWARE.length });
}
