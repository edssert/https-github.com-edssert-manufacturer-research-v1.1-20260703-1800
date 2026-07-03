/**
 * @module domains/brand/controller
 * Brand 탭 컨트롤러 — 카드/모달 없이 브랜드별 와이드 섹션을 세로로 쌓는
 * 전체 페이지 레이아웃. 검색과 정렬만 지원 (칩/범위 필터 없음).
 *
 * 구성 요소:
 *   brand.data.js   — 데이터
 *   brand.schema.js — 검색/정렬 정의
 *   brand.view.js   — 페이지 섹션 마크업 (순수 함수)
 */
import { createState, resetState } from "../../core/state.js";
import { $ } from "../../core/dom.js";
import { registerDomain } from "../../core/router.js";
import { refreshNavCounts } from "../../ui/nav.js";

import { BRANDS } from "./brand.data.js";
import { brandSchema } from "./brand.schema.js";
import { pageHTML as brandPageHTML } from "./brand.view.js";

const brandState = createState();
brandState.sort = "founded";

/** 탭 활성화: 최초 1회 UI 빌드 후 렌더 */
function mountBrand() {
  const wrap = $("#view-brand");
  wrap.hidden = false;
  if (!wrap.dataset.built) {
    wrap.dataset.built = "1";
    buildBrandUI(wrap);
  }
  renderBrand();
}

/** 탭 비활성화: 뷰 숨김 */
function unmountBrand() { $("#view-brand").hidden = true; }

/**
 * 컨트롤 바(검색/정렬) + 결과 영역 골격을 1회 빌드하고 이벤트를 연결한다.
 * @param {HTMLElement} wrap #view-brand 컨테이너
 */
function buildBrandUI(wrap) {
  wrap.innerHTML = `
    <div class="controls">
      <div class="controls__inner">
        <div class="controls__row">
          <label class="search-box">
            <svg class="search-box__icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            <input class="search-box__input" id="brand-q" type="search" placeholder="브랜드 검색  ·  e.g.  L-Acoustics / d&b / Meyer" autocomplete="off" spellcheck="false" />
          </label>
          <div class="controls__tools">
            <select class="select" id="brand-sort">
              <option value="founded">정렬 · 설립연도순</option>
              <option value="name">정렬 · 이름순</option>
            </select>
            <button class="btn" id="brand-reset">필터 초기화</button>
          </div>
        </div>
      </div>
    </div>
    <div class="content-wrap">
      <div class="brand-list" id="brand-results"></div>
    </div>`;

  $("#brand-q").addEventListener("input", e => { brandState.q = e.target.value.trim(); renderBrand(); });
  $("#brand-sort").addEventListener("change", e => { brandState.sort = e.target.value; renderBrand(); });
  $("#brand-reset").onclick = resetBrand;
}

/** 검색어/정렬 초기화 후 재렌더링 */
function resetBrand() {
  resetState(brandState, brandSchema);
  $("#brand-q").value = "";
  $("#brand-sort").value = "founded";
  renderBrand();
}

/** 현재 상태(검색어/정렬)로 브랜드 섹션 목록을 렌더링 */
function renderBrand() {
  const resultsEl = $("#brand-results");
  let view = BRANDS.filter(b => {
    if (!brandState.q) return true;
    const q = brandState.q.toLowerCase();
    return brandSchema.searchFields.some(f => String(b[f] || "").toLowerCase().includes(q));
  });
  const sorter = brandSchema.sorters[brandState.sort];
  if (sorter) view = [...view].sort(sorter);

  $("#count").innerHTML = `<b>${view.length}</b> / ${BRANDS.length} ${brandSchema.unitLabel}`;

  if (!view.length) {
    resultsEl.innerHTML = `<div class="empty-state">
      <div class="empty-state__title">${brandSchema.emptyTitle}</div>
      <div class="empty-state__hint">${brandSchema.emptyHint}</div>
      <button class="btn btn--primary" id="brand-reset2">필터 초기화</button>
    </div>`;
    resultsEl.querySelector("#brand-reset2").onclick = resetBrand;
    refreshNavCounts();
    return;
  }

  resultsEl.innerHTML = view.map(b => brandPageHTML(b)).join("");
  refreshNavCounts();
}

/** Brand 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initBrandDomain() {
  registerDomain("brand", { label: "Brand", mount: mountBrand, unmount: unmountBrand, count: () => BRANDS.length });
}

/**
 * 데이터에 포함된 모든 브랜드 이름 — index.html 상단바 부제에 사용 (main.js).
 * @returns {string[]}
 */
export function getBrandNames() {
  return BRANDS.map(b => b.name);
}
