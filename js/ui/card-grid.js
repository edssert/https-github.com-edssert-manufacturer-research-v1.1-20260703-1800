/**
 * @module ui/card-grid
 * 범용 카드 그리드/그룹 렌더러 — 도메인 비의존.
 * 카드 마크업 자체는 각 도메인의 cardHTML(item) 함수가 만들고,
 * 이 모듈은 필터링·정렬·그룹핑·빈 결과 화면·클릭/키보드 연결만 담당한다.
 *
 * 관련 CSS: css/components/card.css (.card-grid, .card-group, .empty-state)
 */
import { $, esc, uniq } from "../core/dom.js";
import { passes, sortItems } from "../core/filter-engine.js";
import { updateChipDisabledStates } from "./filters.js";

/**
 * 결과 그리드를 렌더링한다. 각 도메인의 render 함수가 매 변경마다 호출.
 * @param {Object} opts
 * @param {HTMLElement} opts.resultsEl 결과를 그릴 컨테이너
 * @param {HTMLElement} opts.countEl 상단 카운트 표시 요소 (#count)
 * @param {HTMLElement|null} opts.filterPanelEl 필터 패널 (칩 비활성화 갱신용, 없으면 null)
 * @param {Object[]} opts.data 전체 데이터 배열
 * @param {Object} opts.state 도메인 상태 (검색어/칩/범위/정렬)
 * @param {Object} opts.schema 도메인 스키마
 * @param {Function} opts.cardHTML (item) => 카드 HTML 문자열
 * @param {Function} opts.onOpen (id) => void — 카드 클릭 시 모달 열기
 * @param {Object|null} opts.groupBy 그룹핑 설정 (null 이면 평면 그리드)
 * @param {string[]} [opts.groupBy.order] 그룹 키 표시 순서
 * @param {Function} opts.groupBy.getKey (item) => 그룹 키
 * @param {Function} [opts.groupBy.subGroupKey] (item) => 서브그룹 키 (예: 시리즈)
 * @param {Function} [opts.groupBy.subGroupOrder] 서브그룹 정렬 비교 함수
 * @param {Function} [opts.groupBy.sortWithinGroup] 서브그룹 내 카드 정렬 비교 함수
 * @param {Function} opts.groupBy.headHTML (그룹키, 서브그룹키, 항목들) => 그룹 헤더 HTML
 */
export function renderGrid({ resultsEl, countEl, filterPanelEl, data, state, schema, cardHTML, onOpen, groupBy }) {
  let view = data.filter(d => passes(d, state, schema));
  view = sortItems(view, state.sort, schema);

  countEl.innerHTML = `<b>${view.length}</b> / ${data.length} ${schema.unitLabel || "items"}`;

  // ── 빈 결과 화면 ──
  if (!view.length) {
    resultsEl.innerHTML = `<div class="empty-state">
      <div class="empty-state__title">${esc(schema.emptyTitle || "일치하는 항목이 없습니다")}</div>
      <div class="empty-state__hint">${esc(schema.emptyHint || "검색어나 필터 조건을 넓혀 보세요.")}</div>
      <button class="btn btn--primary" id="reset2">필터 초기화</button>
    </div>`;
    resultsEl.querySelector("#reset2").onclick = schema.onReset;
    return;
  }

  // ── 그룹형(제조사 > 시리즈) 또는 평면 그리드 렌더링 ──
  if (groupBy) {
    let html = "";
    const groupOrder = groupBy.order ? groupBy.order.filter(k => view.some(d => groupBy.getKey(d) === k)) : uniq(view.map(groupBy.getKey));
    groupOrder.forEach(gk => {
      const items = view.filter(d => groupBy.getKey(d) === gk);
      if (!items.length) return;
      let sub = groupBy.subGroupKey
        ? uniq(items.map(groupBy.subGroupKey))
        : [null];
      // 서브그룹(시리즈) 자체의 표시 순서 제어 — 예: Long/Medium/Short Throw
      // 를 먼저, 독립 Subwoofers 시리즈를 마지막에.
      if (groupBy.subGroupOrder) sub = [...sub].sort(groupBy.subGroupOrder);
      sub.forEach(sg => {
        let g = sg == null ? items : items.filter(d => groupBy.subGroupKey(d) === sg);
        if (!g.length) return;
        // 서브그룹 내부 카드 순서 제어 — 예: Subwoofer 타입(K1-SB 등)을 뒤로.
        if (groupBy.sortWithinGroup) g = [...g].sort(groupBy.sortWithinGroup);
        const headHTML = groupBy.headHTML(gk, sg, g);
        html += `<section class="card-group"><div class="card-group__head">${headHTML}</div><div class="card-grid">${g.map(d => cardHTML(d)).join("")}</div></section>`;
      });
    });
    resultsEl.innerHTML = html;
  } else {
    resultsEl.innerHTML = `<div class="card-grid">${view.map(d => cardHTML(d)).join("")}</div>`;
  }

  // ── 카드 클릭/키보드(Enter·Space) → 상세 모달 ──
  resultsEl.querySelectorAll(".card[data-id]").forEach(c => {
    c.addEventListener("click", () => onOpen(c.dataset.id));
    c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(c.dataset.id); } });
  });

  // ── 결과 0이 되는 칩 비활성화 갱신 ──
  if (filterPanelEl) {
    updateChipDisabledStates(filterPanelEl, data, state, schema, (d, except) => passes(d, state, schema, except));
  }
}
