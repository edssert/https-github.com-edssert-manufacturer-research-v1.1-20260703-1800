/**
 * smoke.test.mjs — jsdom 기반 통합 스모크 테스트.
 *
 * 실제 브라우저 없이 index.html + main.js 전체 부팅을 재현해서
 * 탭 전환 · 카드 렌더링 · 모달 열기 · Split View 열기/닫기가
 * 런타임 에러 없이 동작하는지 검증한다.
 *
 * 준비: npm i jsdom (tests/ 또는 루트 어디든)
 * 실행: node tests/smoke.test.mjs   (프로젝트 루트에서)
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
let pass = 0, failCount = 0;
const check = (name, cond) => { cond ? pass++ : failCount++; console.log(`${cond ? "PASS" : "FAIL"} — ${name}`); };

// ── jsdom 부팅: index.html 로드 + 전역 노출 ──
const html = readFileSync(join(ROOT, "index.html"), "utf8");
const dom = new JSDOM(html, { url: "http://localhost/" });
global.window = dom.window;
global.document = dom.window.document;
global.location = dom.window.location;
global.HTMLElement = dom.window.HTMLElement;

// main.js import → 모든 도메인 등록 + 기본 탭(speakers) 마운트까지 실행됨
await import(join(ROOT, "js/main.js"));
const { navigateTo } = await import(join(ROOT, "js/core/router.js"));

// ── 부팅 상태 검증 ──
check("Speakers 탭이 기본으로 마운트됨", document.querySelector("#view-speakers").hidden === false);
check("탭 5개 렌더링", document.querySelectorAll(".topnav__tab").length === 5);
check("활성 탭 변경자 적용", document.querySelector(".topnav__tab--active") !== null);
check("스피커 카드 렌더링(> 40장)", document.querySelectorAll("#spk-results .card").length > 40);
check("카드 그룹(시리즈) 헤더 존재", document.querySelectorAll("#spk-results .card-group__head").length > 5);
check("필터 칩 렌더링", document.querySelectorAll("#spk-filters .chip").length > 10);
check("상단바 부제(브랜드 목록) 주입", document.querySelector("#brand-subtitle").textContent.includes("L-Acoustics"));

// ── 모달 열기 (카드 클릭) ──
const firstCard = document.querySelector("#spk-results .card[data-id]");
firstCard.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
check("카드 클릭 → 모달 열림", document.querySelector("#modalbg").classList.contains("modal-overlay--open"));
check("모달 제목 존재", document.querySelector("#modal .modal__title") !== null);
check("모달 사양 표 렌더링", document.querySelectorAll("#modal .spec-table__cell").length > 3);

// ── Split View (모달 안 앰프 행 클릭) ──
const ampRow = document.querySelector("#modal .match-table__row[data-amp-id]");
check("클릭 가능한 앰프 행 존재", ampRow !== null);
if (ampRow) {
  ampRow.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  check("Split View 확장 변경자 적용", document.querySelector("#modal").classList.contains("modal--split"));
  check("pane 2 렌더링", document.querySelectorAll("#modal .split-view__pane").length === 2);
  const closeBtn = document.querySelector("#modal .split-view__pane-close");
  closeBtn.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  check("pane 2 닫기 → 단일 pane 복귀", document.querySelectorAll("#modal .split-view__pane").length === 1);
}

// ── 나머지 탭 전환 ──
for (const key of ["amplifiers", "dsps", "software", "brand", "speakers"]) {
  let ok = true;
  try { navigateTo(key); } catch (e) { ok = false; console.log("   에러:", e.message); }
  check(`탭 전환: ${key}`, ok && document.querySelector(`#view-${key === "speakers" ? "speakers" : key}`).hidden === false);
}
check("앰프 카드 렌더링", document.querySelectorAll("#amp-results .card").length >= 9);
check("브랜드 페이지 렌더링", document.querySelectorAll("#brand-results .brand-page").length >= 3);
check("타임라인 렌더링", document.querySelectorAll("#brand-results .timeline__item").length > 5);

console.log(`\n결과: ${pass} PASS / ${failCount} FAIL`);
process.exit(failCount ? 1 : 0);
