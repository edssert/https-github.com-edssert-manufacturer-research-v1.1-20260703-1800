/**
 * @module core/filter-engine
 * 도메인 비의존 필터링/정렬 로직.
 * "schema" 가 어떤 필드를 검색/칩 필터/범위 필터할지 선언하므로
 * 이 모듈은 "스피커"와 "앰프"의 차이를 전혀 몰라도 된다.
 *
 * schema 형태 (도메인별 정의: domains/<이름>/<이름>.schema.js):
 * {
 *   searchFields: ["name","series"],            // 검색어(state.q) 대조 필드
 *   customSearchMatch: (item, q) => boolean,    // 추가 검색 규칙 (선택)
 *   chipFields: [{ key:"mk", label:"Manufacturer", order:[], labelFor:(v)=>... }],
 *   rangeFields: [{ key:"spl", label:"Max SPL", unit:"dB SPL", step:1 }],
 *   defaultSort: "series",
 *   sorters: { series: (a,b)=>..., spl: (a,b)=>... }
 * }
 */

/**
 * 항목 1개가 현재 상태의 모든 필터를 통과하는지 검사한다.
 * @param {Object} item 검사할 데이터 항목
 * @param {Object} state 도메인 상태 (q/chipFilters/range)
 * @param {Object} schema 도메인 스키마
 * @param {string} [except] 이 칩 필드는 건너뜀 — 칩 비활성화 계산용
 *   ("이 칩을 켰다면 결과가 있을까?"를 판단할 때 자기 필드는 제외해야 함)
 * @returns {boolean}
 */
export function passes(item, state, schema, except) {
  // 1) 검색어
  if (state.q) {
    const q = state.q.toLowerCase();
    let hit = schema.searchFields.some(f => {
      const v = resolvePath(item, f);
      return v != null && String(v).toLowerCase().includes(q);
    });
    if (!hit && schema.customSearchMatch) hit = schema.customSearchMatch(item, q);
    if (!hit) return false;
  }
  // 2) 칩 필터 (필드별 OR, 필드 간 AND)
  for (const cf of schema.chipFields) {
    if (except === cf.key) continue;
    const set = state.chipFilters[cf.key];
    if (set && set.size) {
      const v = resolvePath(item, cf.key);
      if (!set.has(String(v))) return false;
    }
  }
  // 3) 범위 필터 (값이 null 인 항목은 통과 — 데이터 미입력을 배제하지 않음)
  for (const rf of schema.rangeFields) {
    const r = state.range[rf.key];
    if (r) {
      const v = resolvePath(item, rf.key);
      if (v == null) continue;
      if (rf.isRange) {
        // 값이 스칼라가 아니라 [min,max] 구간(예: 각도 커버리지 범위)인 필드.
        // 필터 슬라이더 구간 [r.lo,r.hi] 과 항목 구간이 "하나라도 겹치면" 통과
        // — 스피커가 지원하는 각도/스펙 범위 중 일부라도 필터 조건 안에
        // 들어오면 결과에 남긴다(완전 포함을 요구하면 결과가 과도하게
        // 좁아지므로, 겹침 판정이 실사용에 더 적합하다).
        const [vMin, vMax] = v;
        if (vMax < r.lo || vMin > r.hi) return false;
      } else if (v < r.lo || v > r.hi) {
        return false;
      }
    }
  }
  return true;
}

/**
 * "a.b.c" 점 표기 경로로 중첩 객체 값을 읽는다.
 * @param {Object} obj 대상 객체
 * @param {string} path 경로 문자열
 * @returns {*}
 */
export function resolvePath(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}

/**
 * 스키마에 정의된 정렬 함수로 새 배열을 만들어 반환한다 (원본 불변).
 * @param {Object[]} items 정렬할 배열
 * @param {string} sortKey 정렬 키 (schema.sorters 의 키)
 * @param {Object} schema 도메인 스키마
 * @returns {Object[]}
 */
export function sortItems(items, sortKey, schema) {
  const sorter = schema.sorters && schema.sorters[sortKey];
  return sorter ? [...items].sort(sorter) : items;
}
