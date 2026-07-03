/**
 * @module core/state
 * 도메인별 독립 상태 컨테이너.
 * 각 도메인(speakers/amplifiers/dsps/software/brand)이 자기만의 상태 객체를
 * 가지므로 탭을 오가도 검색어·필터·정렬이 서로 섞이지 않는다.
 */

/**
 * 새 도메인 상태 객체를 생성한다.
 * @returns {{q: string, chipFilters: Object.<string, Set<string>>, range: Object, sort: string|null}}
 *   q: 검색어 / chipFilters: 필드별 선택값 집합 /
 *   range: 필드별 { min, max, lo, hi } / sort: 현재 정렬 키
 */
export function createState() {
  return {
    q: "",
    chipFilters: {},   // { 필드키: Set(선택값) }
    range: {},         // { 필드키: { min, max, lo, hi } }
    sort: null,        // 도메인 schema 의 defaultSort 로 초기화됨
  };
}

/**
 * 상태를 초기값으로 되돌린다 (검색어 비움 · 칩 선택 해제 · 정렬 기본값).
 * range 는 buildFilters 가 재빌드하며 리셋하므로 여기서 건드리지 않는다.
 * @param {Object} state createState() 로 만든 상태 객체
 * @param {Object} schema 도메인 스키마 (defaultSort 참조)
 */
export function resetState(state, schema) {
  state.q = "";
  Object.keys(state.chipFilters).forEach(k => state.chipFilters[k].clear());
  state.sort = schema.defaultSort || null;
}
