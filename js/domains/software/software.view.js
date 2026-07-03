/**
 * @module domains/software/view
 * 소프트웨어 카드 + 상세 모달 마크업 생성 (순수 함수 모음).
 *
 * 관련 CSS: css/components/card.css, css/components/spec-table.css
 */
import { esc } from "../../core/dom.js";
import { SW_MFR } from "./software.schema.js";

/**
 * 소프트웨어 카드 1장의 HTML 을 생성한다.
 * @param {Object} s 소프트웨어 레코드
 * @returns {string} .card 마크업
 */
export function cardHTML(s) {
  const M = SW_MFR[s.mfr], color = M.color;
  return `<article class="card" style="--mfr:${color}" tabindex="0" data-id="${s.id}" role="button" aria-label="${esc(s.name)} 상세">
    <div class="card__media"><div class="card__noimg">⌘</div><span class="card__type-badge">${esc(s.type || "SW")}</span></div>
    <div class="card__body">
      <div class="eyebrow"><span class="eyebrow__brand">${esc(M.short)}</span> · ${esc(s.platform || "")}</div>
      <div class="card__name">${esc(s.name)}</div>
      <div class="card__config">${esc(s.notes || "")}</div>
      <div class="card__stats">
        <div class="stat-grid">
          <div class="stat-grid__cell"><span class="stat-grid__key">Price</span><span class="stat-grid__value stat-grid__value--accent">${esc(s.price || "—")}</span></div>
          <div class="stat-grid__cell"><span class="stat-grid__key">Platform</span><span class="stat-grid__value">${esc(s.platform || "—")}</span></div>
          <div class="stat-grid__cell"><span class="stat-grid__key">DSPs</span><span class="stat-grid__value">${s.relations.dspIds.length}</span></div>
        </div>
      </div>
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
 * 소프트웨어 상세 모달의 head/body 마크업을 생성한다.
 * 연동 DSP 칩에는 data-dsp-id 가 붙는다 — 클릭 → Split View 연결은
 * controller 가 담당.
 * @param {Object} s 소프트웨어 레코드
 * @param {Function|null} resolveDspName (dspId) => 표시 이름
 * @returns {{color: string, head: string, body: string}}
 */
export function modalBodyHTML(s, resolveDspName) {
  const M = SW_MFR[s.mfr], color = M.color;
  const head = `<div class="modal__head">
      <div class="eyebrow"><span class="eyebrow__brand" style="color:${color}">${esc(M.name)}</span> · ${esc(s.type || "")}</div>
      <div class="modal__title">${esc(s.name)}</div>
      <button class="modal__close" data-modal-close aria-label="닫기"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>`;
  const dspChips = s.relations.dspIds.map(did => {
    const name = resolveDspName ? resolveDspName(did) : did;
    return `<button class="chip" data-dsp-id="${did}" type="button">${esc(name)}</button>`;
  }).join("");
  const body = `
    <div class="modal__body" id="modal-body-main">
      <div class="spec-table">
        ${specRow("Type", s.type)}
        ${specRow("Platform", s.platform)}
        ${specRow("Price", s.price)}
        ${specRow("Notes", s.notes, true)}
      </div>
      <p class="section-label" style="margin-top:20px">Related Processors (${s.relations.dspIds.length})</p>
      <div class="chip-group">${dspChips || '<span class="hint-text">연동 프로세서가 없습니다.</span>'}</div>
    </div>`;
  return { color, head, body };
}
