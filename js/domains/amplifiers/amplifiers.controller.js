/**
 * @module domains/amplifiers/controller
 * Amplifiers 탭 컨트롤러 — mount/unmount/build/reset/render + 모달·Split View 연결.
 *
 * 구성 요소:
 *   amplifiers.data.js   — 데이터 (브랜드별 파일의 배럴)
 *   amplifiers.schema.js — 필터/정렬 정의
 *   amplifiers.view.js   — 카드/모달 마크업 (순수 함수)
 */
import { createState, resetState } from "../../core/state.js";
import { $, esc } from "../../core/dom.js";
import { buildFilters, wireFilterToggle } from "../../ui/filters.js";
import { renderGrid } from "../../ui/card-grid.js";
import { openModalWith } from "../../ui/modal.js";
import { openSplitPane } from "../../ui/split-view.js";
import { registerDomain } from "../../core/router.js";
import { refreshNavCounts } from "../../ui/nav.js";
import { registerAmplifiers, resolveAmpIdForModel, findSpeakerById, findSpeakersMatchingAmp, findAmpConfigsBySpeaker } from "../../relationships/cross-ref.js";

import { AMPLIFIERS } from "./amplifiers.data.js";
import { amplifiersSchema, AMP_MFR, AMP_MK_ORDER } from "./amplifiers.schema.js";
import { cardHTML as ampCardHTML, modalBodyHTML as ampModalBodyHTML } from "./amplifiers.view.js";

// 앰프 모달 안에서 스피커 칩을 클릭하면 Split View pane 2 에 스피커 상세를
// 띄운다. 스피커의 "순수 뷰 함수"와 색상 맵만 import (controller 미참조).
import { MFR } from "../speakers/speakers.schema.js";
import { modalBodyHTML as speakerModalBodyHTML } from "../speakers/speakers.view.js";

// cross-ref 레지스트리에 앰프 데이터 등록 (모듈 로드 시 1회)
registerAmplifiers(AMPLIFIERS);

// relations.speakerIds(정적 필드)는 현재 대부분 비어있으므로, 실제 매칭은
// 스피커 쪽 amps[].model 을 역해석해 동적으로 채운다(findSpeakersMatchingAmp).
// 카드의 "Speakers" 개수·정렬(speakerCount)·모달의 Matched Speakers 가 모두
// 이 필드를 읽으므로, 렌더링 전에 한 번 채워두면 기존 코드를 그대로 재사용할
// 수 있다. registerSpeakers() 가 이미 호출된 뒤(스피커 도메인이 먼저 import
// 되어 모듈 최상단에서 등록됨)라야 정확히 계산되므로 mount 시점에 수행한다.
function syncMatchedSpeakerIds() {
  AMPLIFIERS.forEach(a => { a.relations.speakerIds = findSpeakersMatchingAmp(a.id); });
}

const ampState = createState();
ampState.sort = "type";

/** 탭 활성화: 최초 1회 UI 빌드 후 렌더 */
function mountAmplifiers() {
  syncMatchedSpeakerIds();
  const wrap = $("#view-amplifiers");
  wrap.hidden = false;
  if (!wrap.dataset.built) {
    wrap.dataset.built = "1";
    buildAmplifiersUI(wrap);
  }
  renderAmplifiers();
}

/** 탭 비활성화: 뷰 숨김 */
function unmountAmplifiers() { $("#view-amplifiers").hidden = true; }

/**
 * 컨트롤 바 + 결과 영역 골격을 1회 빌드하고 이벤트를 연결한다.
 * @param {HTMLElement} wrap #view-amplifiers 컨테이너
 */
function buildAmplifiersUI(wrap) {
  wrap.innerHTML = `
    <div class="controls">
      <div class="controls__inner">
        <div class="controls__row">
          <label class="search-box">
            <svg class="search-box__icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            <input class="search-box__input" id="amp-q" type="search" placeholder="앰프 모델 검색  ·  e.g.  LA12X / D90" autocomplete="off" spellcheck="false" />
          </label>
          <div class="controls__tools">
            <select class="select" id="amp-sort">
              <option value="type">정렬 · 제조사/타입별</option>
              <option value="model">정렬 · 이름순</option>
              <option value="channels">정렬 · 채널 많은순</option>
              <option value="speakerCount">정렬 · 매칭 스피커 많은순</option>
            </select>
            <button class="btn" id="amp-reset">필터 초기화</button>
            <button class="btn btn--toggle" id="amp-filter-toggle" type="button" aria-expanded="false">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              필터
            </button>
          </div>
        </div>
        <div class="filter-panel" id="amp-filters"></div>
      </div>
    </div>
    <div class="content-wrap">
      <div id="amp-results"></div>
    </div>`;

  buildFilters($("#amp-filters"), AMPLIFIERS, ampState, amplifiersSchema, renderAmplifiers);
  wireFilterToggle($("#amp-filter-toggle"), $("#amp-filters"));

  $("#amp-q").addEventListener("input", e => { ampState.q = e.target.value.trim(); renderAmplifiers(); });
  $("#amp-sort").addEventListener("change", e => { ampState.sort = e.target.value; renderAmplifiers(); });
  $("#amp-reset").onclick = resetAmplifiers;
}

/** 검색어/칩/정렬 초기화 후 재렌더링 */
function resetAmplifiers() {
  resetState(ampState, amplifiersSchema);
  $("#amp-q").value = "";
  $("#amp-sort").value = "type";
  document.querySelectorAll("#amp-filters .chip").forEach(c => c.setAttribute("aria-pressed", "false"));
  buildFilters($("#amp-filters"), AMPLIFIERS, ampState, amplifiersSchema, renderAmplifiers);
  renderAmplifiers();
}

/** 앰프에 시리즈 개념이 없어 스피커의 series 필드를 대신할 분류 필드가
 * 없다 — 대신 `type`(예: "Amplified Controller")을 쓰되, 이 필드가 없는
 * 앰프(d&b D80/D90 등 기존 단순 스키마)는 랙형 투어링 앰프이므로 기본값
 * "Amplifier"로 묶는다("Rack"은 파워/네트워크까지 통합된 별도 장비 분류라
 * 이 데이터에는 아직 해당 사항 없음). */
const ampTypeOf = a => a.type || "Amplifier";

/** 현재 상태로 결과 그리드 렌더링 (제조사/타입 정렬 시 제조사>타입 그룹핑) */
function renderAmplifiers() {
  renderGrid({
    resultsEl: $("#amp-results"),
    countEl: $("#count"),
    filterPanelEl: $("#amp-filters"),
    data: AMPLIFIERS,
    state: ampState,
    schema: amplifiersSchema,
    cardHTML: ampCardHTML,
    onOpen: openAmpModal,
    groupBy: ampState.sort === "type" ? {
      order: AMP_MK_ORDER,
      getKey: d => d.mfr,
      subGroupKey: d => ampTypeOf(d),
      subGroupOrder: (sgA, sgB) => sgA.localeCompare(sgB),
      sortWithinGroup: (a, b) => a.model.localeCompare(b.model),
      headHTML: (mfr, type, group) => {
        return `<span class="card-group__badge card-group__badge--name" style="border-color:${AMP_MFR[mfr].color}55;color:${AMP_MFR[mfr].color}">${esc(AMP_MFR[mfr].name)}</span><span class="card-group__title">${esc(type)}</span><span class="card-group__count">${group.length} ea</span>`;
      }
    } : null,
  });
  refreshNavCounts();
}

/**
 * 앰프 상세 모달을 연다.
 * @param {string} id 앰프 id
 */
function openAmpModal(id) {
  const a = AMPLIFIERS.find(x => x.id === id);
  if (!a) return;
  const { color, head, body } = ampModalBodyHTML(a, (sid) => { const s = findSpeakerById(sid); return s ? s.name : sid; }, findSpeakersMatchingAmp(a.id), findAmpConfigsBySpeaker(a.id));
  openModalWith(color, head, body);
  wireAmpModalSpeakerClicks(a);
  wireAmpConfigsToggle();
}

/**
 * 앰프 모달 안의 스피커 칩(Matched Speakers) 또는 Configurations 표 대표
 * 행 클릭 → Split View pane 2 에 스피커 상세.
 * (앰프 → 스피커 방향 — 스피커 → 앰프 흐름의 미러)
 * pane 2 안에서 또 다른 스피커를 클릭하면 pane 2 가 교체되고, 이미 pane 2
 * 에 열려있는 것과 같은 스피커를 다시 클릭하면(paneId 일치) 대신 닫힌다 —
 * X 버튼까지 마우스를 옮기지 않아도 됨.
 * @param {Object} amp 현재 모달의 앰프 레코드
 */
function wireAmpModalSpeakerClicks(amp) {
  document.querySelectorAll("#modal [data-speaker-id]").forEach(chip => {
    chip.addEventListener("click", () => {
      const sid = chip.dataset.speakerId;
      const s = findSpeakerById(sid);
      if (!s) return;
      const M = MFR[s.mk];
      const { head, body } = speakerModalBodyHTML(s, resolveAmpIdForModel);
      openSplitPane({
        headHTML: head,
        paneColor: M.color,
        bodyHTML: body,
        paneId: sid,
      });
    });
  });
}

/**
 * Configurations 표(스피커 기준, configsBySpeakerTableHTML)의 +N 토글
 * 버튼을 연결한다 — 클릭 시 같은 data-toggle-group 을 가진 하위 행(--sub)
 * 을 펼치거나 접는다. 버튼이 대표 행(match-table__row--clickable) 안에
 * 중첩돼 있으므로, 버튼 클릭이 행의 Split View 이동 클릭으로 버블링되지
 * 않도록 stopPropagation 한다(스피커 이름 클릭과 +N 토글 클릭을 서로
 * 독립된 동작으로 유지).
 */
function wireAmpConfigsToggle() {
  document.querySelectorAll("#modal .match-table__toggle-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const groupId = btn.dataset.toggleGroup;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const members = document.querySelectorAll(`#modal [data-toggle-member="${groupId}"]`);
      members.forEach(row => { row.hidden = expanded; });
      btn.setAttribute("aria-expanded", String(!expanded));
      btn.textContent = expanded ? `+${members.length}` : "−";
    });
  });
}

/** Amplifiers 도메인을 라우터에 등록 — main.js 가 호출하는 유일한 공개 API */
export function initAmplifiersDomain() {
  registerDomain("amplifiers", { label: "Amplifier", mount: mountAmplifiers, unmount: unmountAmplifiers, count: () => AMPLIFIERS.length });
}
