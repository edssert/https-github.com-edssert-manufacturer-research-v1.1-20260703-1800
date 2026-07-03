/**
 * @module ui/split-view
 * 나란히 비교(Side-by-Side) Split View.
 *
 * 동작 원리: 열려 있는 모달에 .modal--split 변경자를 토글하고, 기존
 * 모달 내용(.modal__head + #modal-body-main)을 pane 1 로 감싼 뒤 그 옆에
 * pane 2 를 추가한다. 기존 모달 DOM 은 파괴하지 않으므로 원본 카드의
 * 상태가 그대로 유지된다. 좁은 화면에서는 CSS 가 세로 스택으로 전환.
 *
 * 관련 CSS: css/components/split-view.css (.split-view, .modal--split)
 */
import { getModalEl } from "./modal.js";

/**
 * Split View pane 2 열기 (pane 2 가 이미 있으면 교체).
 *
 * pane1(기존 모달)과 pane2(Split View 로 새로 여는 상세)가 완전히 동일한
 * 헤더 구조(.modal__head: eyebrow + .modal__title + 우측 상단 고정
 * .modal__close)를 쓰도록, headHTML 을 각 도메인의 modalBodyHTML() 이
 * 만드는 head 마크업을 그대로 받는다 — 이전에는 pane2 만 별도의 축소된
 * 헤더(.split-view__pane-head, 한 줄짜리 작은 텍스트)를 썼는데, pane1 은
 * eyebrow(제조사·부가정보) 위에 큰 제목이 오는 2단 구조라 좌우 X 버튼
 * 위치와 제목 표기 방식이 서로 달라 보였다. 이제 두 pane 모두 같은
 * .modal__head 마크업을 쓰므로 X 버튼이 항상 각 pane 우측 상단 끝에
 * 동일한 오프셋으로 고정되고, 제목 표기 방식(eyebrow/큰 제목)도 통일된다.
 *
 * paneId 로 "같은 대상을 다시 클릭하면 닫기" 토글 동작을 지원한다 — 예를
 * 들어 앰프 모달에서 SB10i 칩을 클릭해 pane 2 에 SB10i 가 열린 상태에서
 * SB10i 를 다시 클릭하면(오른쪽 위 X 버튼까지 마우스를 옮기지 않아도)
 * pane 2 가 닫힌다. 이미 열려있는 pane 2 의 id 는 container 의
 * dataset.paneId 에 저장해 추적한다.
 * @param {Object} opts
 * @param {string} opts.headHTML pane 2 헤더 마크업 — 각 도메인
 *   modalBodyHTML() 이 반환하는 head 를 그대로 전달(.modal__head 구조,
 *   [data-modal-close] 버튼 포함).
 * @param {string} opts.paneColor pane 2 포인트 색 (CSS 변수 --mfr 로 주입)
 * @param {string} opts.bodyHTML pane 2 본문 마크업
 * @param {string} [opts.paneId] pane 2 로 여는 대상의 고유 id(스피커/앰프
 *   id 등). 이미 이 id 로 pane 2 가 열려 있으면 열지 않고 대신 닫는다.
 * @param {Function} [opts.onClose] pane 2 닫기 시 콜백 (선택)
 * @returns {boolean} pane 2 를 열었으면 true, (토글로) 닫았으면 false
 */
export function openSplitPane({ headHTML, paneColor, bodyHTML, paneId, onClose }) {
  const modalEl = getModalEl();
  let container = modalEl.querySelector(".split-view");

  // 이미 같은 대상으로 pane 2 가 열려 있으면 여닫이 토글 — 다시 열지 않고 닫는다.
  if (container && paneId && container.dataset.paneId === paneId) {
    closeSplitPane2(modalEl, container);
    if (onClose) onClose();
    return false;
  }

  if (!container) {
    // 첫 진입: 현재 모달의 head+body 를 pane 1 로 감싼다.
    const existingHead = modalEl.querySelector(".modal__head");
    const existingBodyMain = modalEl.querySelector("#modal-body-main");
    const pane1 = document.createElement("div");
    pane1.className = "split-view__pane";
    if (existingHead) pane1.appendChild(existingHead);
    if (existingBodyMain) pane1.appendChild(existingBodyMain);

    container = document.createElement("div");
    container.className = "split-view";
    container.appendChild(pane1);
    modalEl.innerHTML = "";
    modalEl.appendChild(container);
    modalEl.classList.add("modal--split");
  }

  // 기존 pane 2 제거 후 새로 추가 (다른 항목 클릭 시 교체 동작)
  const oldPane2 = container.querySelector(".split-view__pane:nth-child(2)");
  if (oldPane2) oldPane2.remove();

  if (paneId) container.dataset.paneId = paneId; else delete container.dataset.paneId;

  const pane2 = document.createElement("div");
  pane2.className = "split-view__pane split-view__pane--enter";
  pane2.style.setProperty("--mfr", paneColor);
  pane2.innerHTML = headHTML + bodyHTML;
  container.appendChild(pane2);
  const closeBtn = pane2.querySelector("[data-modal-close]");
  if (closeBtn) {
    closeBtn.onclick = () => {
      closeSplitPane2(modalEl, container);
      if (onClose) onClose();
    };
  }
  return true;
}

/**
 * pane 2 를 제거하고 pane1(head+body)을 .split-view 래핑에서 꺼내 모달
 * 최상위 자식으로 되돌린다 — X 버튼 클릭과 paneId 토글 닫기가 이 로직을
 * 공유해 두 경로 모두 동일하게 깨끗한 DOM 상태로 복귀한다(모달을 닫았다
 * 다시 열 때 .split-view 잔재가 남지 않도록).
 * @param {HTMLElement} modalEl
 * @param {HTMLElement} container .split-view 컨테이너
 */
function closeSplitPane2(modalEl, container) {
  const pane2 = container.querySelector(".split-view__pane:nth-child(2)");
  if (pane2) pane2.remove();
  modalEl.classList.remove("modal--split");
  const pane1 = container.querySelector(".split-view__pane");
  if (pane1) {
    while (pane1.firstChild) modalEl.insertBefore(pane1.firstChild, container);
  }
  container.remove();
}

/** Split View 해제 — pane 2 제거 + 모달 폭 원복. 외부(모달 전체 닫기 등)에서 호출. */
export function closeSplitView() {
  const modalEl = getModalEl();
  const container = modalEl.querySelector(".split-view");
  if (container) { closeSplitPane2(modalEl, container); return; }
  modalEl.classList.remove("modal--split");
  const pane2 = modalEl.querySelector(".split-view__pane:nth-child(2)");
  if (pane2) pane2.remove();
}
