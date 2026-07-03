/**
 * @module core/router
 * 해시(#speakers, #amplifiers, ...) 기반 미니 라우터 — 활성 도메인 탭 전환 담당.
 * 각 도메인이 registerDomain() 으로 스스로 등록하면, 라우터는 어느 탭이
 * 활성인지와 URL 해시 동기화(링크 공유/뒤로가기)만 책임진다.
 */

/** @type {Map<string, {label: string, mount: Function, unmount: Function, count?: Function}>} */
const registry = new Map();
let activeKey = null;
let onChangeCb = null;

/**
 * 도메인을 라우터에 등록한다. 각 도메인 controller 의 init 함수가 호출.
 * @param {string} key 라우트 키 (URL 해시로 사용, 예: "speakers")
 * @param {Object} config
 * @param {string} config.label 탭에 표시할 이름
 * @param {Function} config.mount 탭 활성화 시 호출 (뷰 표시/빌드)
 * @param {Function} config.unmount 탭 비활성화 시 호출 (뷰 숨김)
 * @param {Function} [config.count] 탭 배지에 표시할 항목 수 반환
 */
export function registerDomain(key, config) {
  registry.set(key, config);
}

/**
 * 등록된 모든 도메인 [key, config] 쌍 목록 (등록 순서 = 탭 순서).
 * @returns {Array<[string, Object]>}
 */
export function getDomains() {
  return [...registry.entries()];
}

/**
 * 라우트 변경 콜백 등록 (nav 의 활성 탭 표시 동기화용).
 * @param {Function} cb (newKey, prevKey) => void
 */
export function onRouteChange(cb) {
  onChangeCb = cb;
}

/**
 * 지정한 도메인으로 전환한다 (이전 도메인 unmount → 새 도메인 mount).
 * @param {string} key 이동할 라우트 키
 */
export function navigateTo(key) {
  if (!registry.has(key)) return;
  if (activeKey === key) return;
  const prev = activeKey;
  activeKey = key;
  if (location.hash.slice(1) !== key) location.hash = key;
  if (prev && registry.get(prev).unmount) registry.get(prev).unmount();
  registry.get(key).mount();
  if (onChangeCb) onChangeCb(key, prev);
}

/**
 * 현재 활성 라우트 키.
 * @returns {string|null}
 */
export function getActiveKey() {
  return activeKey;
}

/**
 * 라우터 시작 — URL 해시가 유효하면 그 탭으로, 아니면 기본 탭으로 진입.
 * @param {string} defaultKey 기본 라우트 키
 */
export function initRouter(defaultKey) {
  const fromHash = location.hash.slice(1);
  const start = registry.has(fromHash) ? fromHash : defaultKey;
  window.addEventListener("hashchange", () => {
    const k = location.hash.slice(1);
    if (registry.has(k)) navigateTo(k);
  });
  navigateTo(start);
}
