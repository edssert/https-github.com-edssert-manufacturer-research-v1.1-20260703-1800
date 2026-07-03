/**
 * @module ui/nav
 * 상단 탭 내비게이션 렌더링 + 라우터 연결.
 * 탭 목록은 라우터에 등록된 도메인(registerDomain)에서 자동 생성되므로
 * 새 도메인을 추가해도 이 파일은 수정할 필요가 없다.
 *
 * 관련 CSS: css/nav.css (.topnav)
 */
import { getDomains, navigateTo, getActiveKey, onRouteChange } from "../core/router.js";
import { esc } from "../core/dom.js";

/**
 * 탭 바를 렌더링하고 클릭 → 라우터 이동을 연결한다. 앱 시작 시 1회 호출.
 * @param {HTMLElement} mountEl 탭 바를 그릴 컨테이너 (#topnav)
 */
export function renderNav(mountEl) {
  const domains = getDomains();
  mountEl.innerHTML = `<div class="topnav__inner">${domains.map(([key, cfg]) => `
    <button class="topnav__tab" data-key="${key}" role="tab" aria-selected="false">
      ${esc(cfg.label)}<span class="topnav__tab-count" id="navcount-${key}">${cfg.count ? cfg.count() : ""}</span>
    </button>`).join("")}</div>`;

  mountEl.querySelectorAll(".topnav__tab").forEach(btn => {
    btn.addEventListener("click", () => navigateTo(btn.dataset.key));
  });

  /** 활성 탭 표시(변경자 클래스 + aria-selected)를 현재 라우트와 동기화 */
  const syncActive = (key) => {
    mountEl.querySelectorAll(".topnav__tab").forEach(btn => {
      const active = btn.dataset.key === key;
      btn.classList.toggle("topnav__tab--active", active);
      btn.setAttribute("aria-selected", String(active));
    });
  };

  onRouteChange((key) => syncActive(key));
  syncActive(getActiveKey());
}

/**
 * 각 탭의 항목 수 배지를 갱신한다.
 * 도메인 render 함수들이 렌더링 직후 호출.
 */
export function refreshNavCounts() {
  getDomains().forEach(([key, cfg]) => {
    const el = document.getElementById(`navcount-${key}`);
    if (el && cfg.count) el.textContent = cfg.count();
  });
}
