/**
 * @module domains/brand/view
 * 브랜드 페이지 마크업 생성 (순수 함수 모음).
 * 브랜드는 카드/모달이 아닌, 브랜드당 하나의 와이드 섹션(연혁 타임라인 +
 * 개요)으로 렌더링되는 콘텐츠형 도메인이다.
 *
 * 관련 CSS: css/components/brand.css (.brand-page, .timeline)
 */
import { esc } from "../../core/dom.js";
import { BRAND_MFR } from "./brand.schema.js";

/**
 * 연혁 타임라인 HTML (연도 오름차순 정렬).
 * @param {Array<{year: number, event: string}>} timeline
 * @returns {string}
 */
function timelineHTML(timeline) {
  if (!timeline || !timeline.length) return '<span class="hint-text">등록된 연혁이 없습니다.</span>';
  const sorted = [...timeline].sort((a, b) => a.year - b.year);
  return `<div class="timeline">${sorted.map(t => `
    <div class="timeline__item">
      <div class="timeline__year">${esc(t.year)}</div>
      <div class="timeline__event">${esc(t.event)}</div>
    </div>`).join("")}</div>`;
}

/**
 * 브랜드 1개의 전체 페이지 섹션 HTML 을 생성한다.
 * brand.controller.js 가 필터링된 브랜드마다 하나씩 이어붙인다.
 * @param {Object} b 브랜드 레코드
 * @returns {string} .brand-page 마크업
 */
export function pageHTML(b) {
  const M = BRAND_MFR[b.mfr], color = M.color;
  const notableList = (b.notable || []).map(n => `<div class="brand-page__notable-item">${esc(n)}</div>`).join("");

  return `<section class="brand-page" style="--mfr:${color}" data-id="${b.id}">
    <div class="brand-page__head">
      <div class="brand-page__title">
        <div class="brand-page__eyebrow"><span class="brand-page__dot"></span>${esc(b.country || "")} · ${esc(b.founded)}</div>
        <h2 class="brand-page__name">${esc(b.name)}</h2>
        <div class="brand-page__meta">
          <span>본사 <b>${esc(b.hq || "—")}</b></span>
          <span>창업자 <b>${esc(b.founder || "—")}</b></span>
        </div>
      </div>
    </div>
    <div class="brand-page__body">
      <div>
        <p class="section-label">History</p>
        ${timelineHTML(b.timeline)}
      </div>
      <div>
        <p class="section-label">Overview</p>
        <div class="brand-page__notes">${esc(b.notes || "")}</div>
        <div class="brand-page__notable">${notableList}</div>
      </div>
    </div>
  </section>`;
}
