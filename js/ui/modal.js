/**
 * @module ui/modal
 * 카드형 상세 팝업(모달)의 열기/닫기 공통 프리미티브.
 * 모든 도메인이 공유하며, 모달 내부 마크업은 호출자(각 도메인의 view)가 공급한다.
 *
 * 관련 CSS: css/components/modal.css (.modal-overlay, .modal)
 * 닫기 경로: 배경 클릭 · ESC 키 · [data-modal-close] 버튼 클릭
 */
let modalBgEl, modalEl;

/**
 * 모달 시스템 초기화 — 앱 시작 시 1회 호출 (main.js).
 * @param {string} [bgId="modalbg"] 오버레이 요소 id
 * @param {string} [modalId="modal"] 모달 본체 요소 id
 * @returns {{modalBgEl: HTMLElement, modalEl: HTMLElement}}
 */
export function initModal(bgId = "modalbg", modalId = "modal") {
  modalBgEl = document.getElementById(bgId);
  modalEl = document.getElementById(modalId);
  modalBgEl.addEventListener("click", e => { if (e.target === modalBgEl) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  return { modalBgEl, modalEl };
}

/**
 * 모달을 지정한 내용으로 열기.
 * @param {string} color 제조사 색상 (CSS 변수 --mfr 로 주입, 예: "var(--la)")
 * @param {string} headHTML 헤더 영역 마크업 (.modal__head)
 * @param {string} bodyHTML 본문 영역 마크업 (.modal__body)
 * @param {string} [extraClass] 모달에 추가할 변경자 클래스 (선택)
 */
export function openModalWith(color, headHTML, bodyHTML, extraClass) {
  // [버그 방지] 이전에 Split View(.modal--split + .split-view 구조)가 열려
  // 있던 상태로 모달이 닫혔다가 다시 열리는 경우, className/innerHTML 을
  // 아래에서 전부 새로 쓰므로 잔재는 남지 않지만 혹시 모를 경합을 막기 위해
  // 명시적으로도 초기화한다.
  modalEl.className = "modal" + (extraClass ? " " + extraClass : "");
  modalEl.style.setProperty("--mfr", color);
  modalEl.innerHTML = headHTML + bodyHTML;
  modalBgEl.classList.add("modal-overlay--open");
  document.body.style.overflow = "hidden"; // 배경 스크롤 잠금
  const closeBtn = modalEl.querySelector("[data-modal-close]");
  if (closeBtn) closeBtn.onclick = closeModal;
  wireViewSwitch(modalEl);
  wireDimsUnitSwitch(modalEl);
  wireMediaZoom(modalEl);
}

/**
 * 모달 안의 이미지 뷰 전환 버튼([data-view-switch])을 활성화한다.
 * 뷰가 2개 이상인 스피커(Front/Rear, Front/Array 등)만 이 마크업이
 * 존재한다(speakers.view.js modalBodyHTML 의 getViews 참조) — 버튼이
 * 없는 모달(대부분의 다른 항목, 뷰 1개짜리 스피커)은 querySelectorAll 이
 * 빈 NodeList 를 반환해 아무 일도 하지 않는다. 버튼 개수·라벨과 무관하게
 * 동작하므로 향후 3번째, 4번째 뷰(I·O 등)가 추가돼도 이 함수는 그대로 쓴다.
 * @param {HTMLElement} root 버튼/이미지를 담고 있는 컨테이너 (모달 전체)
 */
function wireViewSwitch(root) {
  const btns = root.querySelectorAll("[data-view-switch]");
  if (!btns.length) return;
  const media = root.querySelector(".modal__media");
  if (!media) return;
  const imgs = media.querySelectorAll(".modal__img[data-view]");
  btns.forEach(btn => {
    btn.onclick = () => {
      const view = btn.dataset.viewSwitch;
      btns.forEach(b => b.classList.toggle("is-active", b === btn));
      imgs.forEach(img => { img.hidden = img.dataset.view !== view; });
    };
  });
}

/**
 * 모달 안의 Dimensions mm/in 단위 전환 버튼([data-dims-unit])을 활성화한다.
 * wireViewSwitch 와 동일한 토글 패턴 — 버튼이 없는 모달(Dimensions 데이터가
 * 없는 항목)은 querySelectorAll 이 빈 NodeList 를 반환해 아무 일도 하지
 * 않는다 (speakers.view.js weightDimsRow 참조).
 * @param {HTMLElement} root 버튼/값을 담고 있는 컨테이너 (모달 전체)
 */
function wireDimsUnitSwitch(root) {
  const btns = root.querySelectorAll("[data-dims-unit]");
  if (!btns.length) return;
  const mmEl = root.querySelector("[data-dims-mm]");
  const inEl = root.querySelector("[data-dims-in]");
  if (!mmEl || !inEl) return;
  btns.forEach(btn => {
    btn.onclick = () => {
      const unit = btn.dataset.dimsUnit;
      btns.forEach(b => b.classList.toggle("is-active", b === btn));
      mmEl.hidden = unit !== "mm";
      inEl.hidden = unit !== "in";
    };
  });
}

/**
 * 모달 이미지 영역(.modal__media)에 마우스 위치 기준 확대(zoom) 인터랙션을
 * 연결한다. mousemove 로 커서 위치를 읽어 CSS 변수 --zoom-x/--zoom-y (0~100%)
 * 로 넘기면, modal.css 의 img:hover 규칙이 transform-origin 을 이 변수로
 * 읽어 커서가 있는 지점을 중심으로 확대한다. 뷰가 없는 모달(.modal__media
 * 자체가 없는 항목)은 querySelector 가 null 을 반환해 아무 일도 하지 않는다.
 * @param {HTMLElement} root 모달 전체 컨테이너
 */
function wireMediaZoom(root) {
  const media = root.querySelector(".modal__media");
  if (!media) return;
  media.addEventListener("mousemove", e => {
    const rect = media.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    media.style.setProperty("--zoom-x", `${x}%`);
    media.style.setProperty("--zoom-y", `${y}%`);
  });
}

/**
 * 모달 닫기 (배경 스크롤 잠금 해제 포함).
 * Split View 가 열려 있었다면 함께 정리 — 닫혔다 다시 열릴 때 이전 pane 구조가
 * 남아 있다가 다음 모달과 뒤섞여 보이는 문제를 방지한다.
 */
export function closeModal() {
  modalBgEl.classList.remove("modal-overlay--open");
  document.body.style.overflow = "";
  if (modalEl) {
    modalEl.classList.remove("modal--split");
    const splitView = modalEl.querySelector(".split-view");
    if (splitView) {
      // pane1(head+body)만 다시 모달 최상위로 꺼내고 나머지(.split-view, pane2)는 제거.
      const pane1 = splitView.querySelector(".split-view__pane");
      if (pane1) {
        while (pane1.firstChild) modalEl.appendChild(pane1.firstChild);
      }
      splitView.remove();
    }
  }
}

/**
 * 현재 모달 본체 요소 반환 — split-view.js 가 pane 래핑에 사용.
 * @returns {HTMLElement}
 */
export function getModalEl() {
  return modalEl;
}

/**
 * 공용 닫기(X) 아이콘 SVG 문자열.
 * @returns {string}
 */
export function closeIconSVG() {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
}
