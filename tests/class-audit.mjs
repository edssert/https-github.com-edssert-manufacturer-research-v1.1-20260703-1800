/**
 * class-audit.mjs — CSS ↔ JS/HTML 클래스명 교차 검증 도구.
 *
 * 목적: BEM 리네이밍 이후 JS 템플릿/HTML 이 참조하는 클래스가 CSS 에 실제로
 * 정의되어 있는지(오타·누락 감지), 반대로 CSS 에만 있고 아무 데서도 쓰지
 * 않는 죽은 클래스가 있는지 검사한다.
 *
 * 실행: node tests/class-audit.mjs   (프로젝트 루트에서)
 * 종료 코드: 문제 발견 시 1, 이상 없으면 0
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** 디렉터리를 재귀 순회하며 확장자가 일치하는 파일 경로를 모은다. */
function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p, exts, out); continue; }
    if (exts.some(e => name.endsWith(e))) out.push(p);
  }
  return out;
}

/* ── 1) CSS 에 정의된 클래스 수집 ── */
const cssClasses = new Set();
for (const file of walk(join(ROOT, "css"), [".css"])) {
  const src = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  // "}" 로 쪼갠 뒤 각 조각에서 "{" 이전(=셀렉터 부분)만 검사 → 선언 값의
  // 소수점(.5)이나 data-URI 의 점은 자연스럽게 제외된다.
  for (const chunk of src.split("}")) {
    const selector = chunk.split("{")[0];
    for (const m of selector.matchAll(/\.([a-zA-Z][\w-]*)/g)) cssClasses.add(m[1]);
  }
}

/* ── 2) JS/HTML 이 사용하는 클래스 수집 ── */
const usedClasses = new Set();
const addTokens = (str) => {
  // 템플릿 보간(${...})은 토큰이 아니므로 공백으로 치환 후 분리
  str.replace(/\$\{[^}]*\}/g, " ").split(/\s+/).forEach(t => {
    if (/^[a-zA-Z][\w-]*$/.test(t)) usedClasses.add(t);
  });
};
const files = [...walk(join(ROOT, "js"), [".js"]), join(ROOT, "index.html")];
for (const file of files) {
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/class="([^"]*)"/g)) addTokens(m[1]);                       // HTML class 속성
  for (const m of src.matchAll(/className\s*=\s*["'`]([^"'`]*)["'`]/g)) addTokens(m[1]);   // el.className = "..."
  for (const m of src.matchAll(/classList\.(?:add|remove|toggle)\(\s*["']([\w-]+)["']/g)) usedClasses.add(m[1]); // classList 조작
  for (const m of src.matchAll(/(?:querySelector(?:All)?)\(\s*[`"']([^`"']+)[`"']/g)) {    // 셀렉터 문자열
    // 템플릿 보간(${cf.key} 등) 내부의 점 표기가 클래스로 오인되지 않게 먼저 제거
    const sel = m[1].replace(/\$\{[^}]*\}/g, " ");
    for (const c of sel.matchAll(/\.([a-zA-Z][\w-]*)/g)) usedClasses.add(c[1]);
  }
  // 문자열 리터럴 안의 BEM 형태 토큰 (예: clickableClass 변수에 담긴 " match-table__row--clickable")
  for (const m of src.matchAll(/["'` ]([a-zA-Z][\w-]*(?:__|--)[\w-]+)["'` ]/g)) usedClasses.add(m[1]);
}

/* ── 3) 비교 리포트 ── */
// className = "modal" + extraClass 처럼 문자열 연결로만 쓰이는 기본 블록,
// JS 파일명/식별자가 우연히 잡히는 토큰 등은 여기서 걸러낸다.
const IGNORE_USED = new Set(["js", "html", "svg", "search", "range", "modal-body-main"]);
const missingInCss = [...usedClasses].filter(c => !cssClasses.has(c) && !IGNORE_USED.has(c) && !c.startsWith("rf-") && !c.startsWith("f-") && !c.startsWith("view-") && !c.startsWith("navcount-"));
const deadInCss = [...cssClasses].filter(c => !usedClasses.has(c));

let fail = false;
if (missingInCss.length) {
  fail = true;
  console.log("✗ JS/HTML 에서 사용되지만 CSS 에 정의가 없는 클래스:");
  missingInCss.sort().forEach(c => console.log("   -", c));
} else {
  console.log("✓ JS/HTML 이 참조하는 모든 클래스가 CSS 에 정의되어 있음");
}
if (deadInCss.length) {
  console.log("! CSS 에 정의됐지만 JS/HTML 에서 발견되지 않은 클래스 (죽은 코드 후보):");
  deadInCss.sort().forEach(c => console.log("   -", c));
} else {
  console.log("✓ CSS 죽은 클래스 없음");
}
console.log(`(CSS 정의 ${cssClasses.size}개 · 사용 토큰 ${usedClasses.size}개 검사)`);
process.exit(fail ? 1 : 0);
