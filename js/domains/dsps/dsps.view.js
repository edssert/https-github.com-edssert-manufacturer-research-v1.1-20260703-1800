/**
 * @module domains/dsps/view
 * DSP/프로세서 카드 + 상세 모달 마크업 생성 (순수 함수 모음).
 *
 * 관련 CSS: css/components/card.css, css/components/spec-table.css
 */
import { esc } from "../../core/dom.js";
import { DSP_MFR } from "./dsps.schema.js";

/**
 * DSP 카드 1장의 HTML 을 생성한다.
 * @param {Object} d DSP 레코드
 * @returns {string} .card 마크업
 */
export function cardHTML(d) {
  const M = DSP_MFR[d.mfr], color = M.color;
  const io = d.ioSummary;
  return `<article class="card" style="--mfr:${color}" tabindex="0" data-id="${d.id}" role="button" aria-label="${esc(d.model)} 상세">
    <div class="card__media"><div class="card__noimg">◧</div><span class="card__type-badge">${io ? io.total + " I/O" : "DSP"}</span></div>
    <div class="card__body">
      <div class="eyebrow"><span class="eyebrow__brand">${esc(M.short)}</span> · ${esc(d.category || "")}</div>
      <div class="card__name">${esc(d.model)}</div>
      <div class="card__config">${esc(d.network || "")}</div>
      <div class="card__stats">
        <div class="stat-grid">
          <div class="stat-grid__cell"><span class="stat-grid__key">Inputs</span><span class="stat-grid__value stat-grid__value--accent">${io ? io.inputs : "—"}</span></div>
          <div class="stat-grid__cell"><span class="stat-grid__key">Outputs</span><span class="stat-grid__value stat-grid__value--accent">${io ? io.outputs : "—"}</span></div>
          <div class="stat-grid__cell"><span class="stat-grid__key">Software</span><span class="stat-grid__value">${d.relations.softwareIds.length}</span></div>
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
 * DSP 상세 모달의 head/body 마크업을 생성한다.
 * 연동 소프트웨어 칩에는 data-software-id 가 붙는다 — 클릭 → Split View
 * 연결은 controller 가 담당.
 * @param {Object} d DSP 레코드
 * @param {Function|null} resolveSoftwareName (softwareId) => 표시 이름
 * @returns {{color: string, head: string, body: string}}
 */
export function modalBodyHTML(d, resolveSoftwareName) {
  const M = DSP_MFR[d.mfr], color = M.color;
  const io = d.ioSummary;
  const head = `<div class="modal__head">
      <div class="eyebrow"><span class="eyebrow__brand" style="color:${color}">${esc(M.name)}</span> · ${esc(d.category || "")}</div>
      <div class="modal__title">${esc(d.model)}</div>
      <button class="modal__close" data-modal-close aria-label="닫기"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>`;
  const softwareChips = d.relations.softwareIds.map(sid => {
    const name = resolveSoftwareName ? resolveSoftwareName(sid) : sid;
    return `<button class="chip" data-software-id="${sid}" type="button">${esc(name)}</button>`;
  }).join("");
  const body = `
    <div class="modal__body" id="modal-body-main">
      <div class="spec-table">
        ${specRow("I/O", io ? `${io.inputs} in / ${io.outputs} out` : null)}
        ${specRow("Category", d.category)}
        ${specRow("Network", d.network)}
        ${specRow("Notes", d.notes, true)}
      </div>
      <p class="section-label" style="margin-top:20px">Related Software (${d.relations.softwareIds.length})</p>
      <div class="chip-group">${softwareChips || '<span class="hint-text">연동 소프트웨어가 없습니다.</span>'}</div>
    </div>`;
  return { color, head, body };
}
