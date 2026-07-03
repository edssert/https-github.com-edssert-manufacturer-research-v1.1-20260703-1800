/**
 * @module domains/dsps/controller
 * DSPs 탭 컨트롤러 — mount/unmount/build/reset/render + 모달·Split View 연결.
 *
 * 구성 요소:
 *   dsps.data.js   — 데이터 (브랜드별 파일의 배럴)
 *   dsps.schema.js — 필터/정렬 정의
 *   dsps.view.js   — 카드/모달 마크업 (순수 함수)
 */
import { createState, resetState } from "../../core/state.js";
import { $, esc } from "../../core/dom.js";
import { buildFilters, wireFilterToggle } from "../../ui/filters.js";
import { renderGrid } from "../../ui/card-grid.js";
import { openModalWith } from "../../ui/modal.js";
import { openSplitPane } from "../../ui/split-view.js";
import { registerDomain } from "../../core/router.js";
import { refreshNavCounts } from "../../ui/nav.js";

import { DSPS } from "./dsps.data.js";
import { dspsSchema, DSP_MFR, DSP_MK_ORDER } from "./dsps.schema.js";
import { cardHTML as dspCardHTML, modalBodyHTML as dspModalBodyHTML } from "./dsps.view.js";

// DSP 모달 안의 소프트웨어 칩 클릭 → Split View pane 2 에 소프트웨어 상세.
// 소프트웨어의 "순수 뷰 함수"와 색상 맵만 import (controller 미참조).
import { SOFTWARE } from "../software/software.data.js";
import { SW_MFR } from "../software/software.schema.js";
import { modalBodyHTML as swModalBodyHTML } from "../software/software.view.js";

const dspState = createState();
dspState.sort = "category";

/** 탭 활성화: 최초 1회 UI 빌드 후 렌더 */
function mountDsps() {
  const wrap = $("#view-dsps");
  wrap.hidden = false;
  if (!wrap.dataset.built) {
    wrap.dataset.built = "1";
    buildDspsUI(wrap);
  }
  renderDsps();
}

/** 탭 비활성화: 뷰 숨김 */
function unmountDsps() { $("#view-dsps").hidden = true; }

/**
 * 컨트롤 바 + 결과 영역 골격을 1회 빌드하고 이벤트를 연결한다.
 * @param {HTMLElement} wrap #view-dsps 컨테이너
 */
function buildDspsUI(wrap) {
  wrap.innerHTML = `
    <div class="controls">
      <div class="controls__inner">
        <div class="controls__row">
          <label class="search-box">
            <svg class="search-box__icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            <input class="search-box__input" id="dsp-q" type="search" placeholder="프로세서 검색  ·  e.g.  P1 / DS100 / Galileo" autocomplete="off" spellcheck="false" />
          </label>
          <div class="controls__tools">
            <select class="select" id="dsp-sort">
              <option value="category">정렬 · 제조사별</option>
              <option value="model">정렬 · 이름순</option>
              <option value="io">정렬 · I/O 많은순</option>
              <option value="software">정렬 · 연동 소프트웨어 많은순</option>
            </select>
            <button class="btn" id="dsp-reset">필터 초기화</button>
            <button class="btn btn--toggle" id="dsp-filter-toggle" type="button" aria-expanded="false">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              필터
            </button>
          </div>
        </div>
        <div class="filter-panel" id="dsp-filters"></div>
      </div>
    </div>
    <div class="content-wrap">
      <div id="dsp-results"></div>
    </div>`;

  buildFilters($("#dsp-filters"), DSPS, dspState, dspsSchema, renderDsps);
  wireFilterToggle($("#dsp-filter-toggle"), $("#dsp-filters"));

  $("#dsp-q").addEventListener("input", e => { dspState.q = e.target.value.trim(); renderDsps(); });
  $("#dsp-sort").addEventListener("change", e => { dspState.sort = e.target.value; renderDsps(); });
  $("#dsp-reset").onclick = resetDsps;
}

/** 검색어/칩/정렬 초기화 후 재렌더링 */
function resetDsps() {
  resetState(dspState, dspsSchema);
  $("#dsp-q").value = "";
  $("#dsp-sort").value = "category";
  document.querySelectorAll("#dsp-filters .chip").forEach(c => c.setAttribute("aria-pressed", "false"));
  buildFilters($("#dsp-filters"), DSPS, dspState, dspsSchema, renderDsps);
  renderDsps();
}

// category 필드가 없는 DSP(현재 데이터에는 없지만 향후 대비)는 "DSP"로 묶는다.
const dspCategoryOf = d => d.category || "DSP";

/** 현재 상태로 결과 그리드 렌더링 (제조사별 정렬 시 제조사>카테고리 그룹핑) */
function renderDsps() {
  renderGrid({
    resultsEl: $("#dsp-results"),
    countEl: $("#count"),
    filterPanelEl: $("#dsp-filters"),
    data: DSPS,
    state: dspState,
    schema: dspsSchema,
    cardHTML: dspCardHTML,
    onOpen: openDspModal,
    groupBy: dspState.sort === "category" ? {
      order: DSP_MK_ORDER,
      getKey: d => d.mfr,
      subGroupKey: d => dspCategoryOf(d),
      subGroupOrder: (sgA, sgB) => sgA.localeCompare(sgB),
      sortWithinGroup: (a, b) => a.model.localeCompare(b.model),
      headHTML: (mfr, category, group) => {
        return `<span class="card-group__badge card-group__badge--name" style="border-color:${DSP_MFR[mfr].color}55;color:${DSP_MFR[mfr].color}">${esc(DSP_MFR[mfr].name)}</span><span class="card-group__title">${esc(category)}</span><span class="card-group__count">${group.length} ea</span>`;
      }
    } : null,
  });
  refreshNavCounts();
}

/**
 * DSP 상세 모달을 연다.
 * @param {string} id DSP id
 */
function openDspModal(id) {
  const d = DSPS.find(x => x.id === id);
  if (!d) return;
  const { color, head, body } = dspModalBodyHTML(d, (sid) => { const s = SOFTWARE.find(x => x.id === sid); return s ? s.name : sid; });
  openModalWith(color, head, body);
  wireDspModalSoftwareClicks();
}

/** DSP 모달 안의 소프트웨어 칩 클릭 → Split View pane 2 에 소프트웨어 상세 */
function wireDspModalSoftwareClicks() {
  document.querySelectorAll("#modal [data-software-id]").forEach(chip => {
    chip.addEventListener("click", () => {
      const sid = chip.dataset.softwareId;
      const s = SOFTWARE.find(x => x.id === sid);
      if (!s) return;
      const M = SW_MFR[s.mfr];
      const { head, body } = swModalBodyHTML(s, (did) => { const d = DSPS.find(x => x.id === did); return d ? d.model : did; });
      openSplitPane({ headHTML: head, paneColor: M.color, bodyHTML: body });
    });
  });
}

/** DSPs 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initDspsDomain() {
  registerDomain("dsps", { label: "DSP", mount: mountDsps, unmount: unmountDsps, count: () => DSPS.length });
}
