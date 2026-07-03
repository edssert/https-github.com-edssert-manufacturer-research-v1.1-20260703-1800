/**
 * @module domains/dsps/schema
 * 범용 필터/그리드 엔진(core/filter-engine.js)이 이 도메인 레코드를 어떻게
 * 다룰지 선언하는 스키마. 검색 필드·칩 필터·범위 필터·정렬 규칙과
 * 제조사 표시 정보(MFR 맵: 이름/색상/축약형)가 모두 여기에 모여 있다.
 * UI 나 데이터 파일이 아닌 "규칙"을 바꿀 때 수정하는 파일.
 */
export const DSP_MFR = {
  la: { name: "L-Acoustics", color: "var(--la)", short: "L-ACOUSTICS" },
  db: { name: "d&b audiotechnik", color: "var(--db)", short: "d&b" },
  my: { name: "Meyer Sound", color: "var(--my)", short: "MEYER" },
};
export const DSP_MK_ORDER = ["la", "db", "my"];

export const dspsSchema = {
  unitLabel: "processors",
  emptyTitle: "일치하는 프로세서가 없습니다",
  emptyHint: "검색어나 필터 조건을 넓혀 보세요.",
  searchFields: ["model"],
  customSearchMatch: (item, q) => DSP_MFR[item.mfr].name.toLowerCase().includes(q),
  chipFields: [
    { key: "mfr", label: "Manufacturer", order: DSP_MK_ORDER, labelFor: (v) => DSP_MFR[v].name },
    { key: "category", label: "Category", labelFor: (v) => v },
    { key: "network", label: "Network", labelFor: (v) => v },
  ],
  rangeFields: [],
  defaultSort: "model",
  sorters: {
    model: (a, b) => a.model.localeCompare(b.model),
    io: (a, b) => (b.ioSummary?.total || 0) - (a.ioSummary?.total || 0) || a.model.localeCompare(b.model),
    software: (a, b) => (b.relations.softwareIds.length - a.relations.softwareIds.length) || a.model.localeCompare(b.model),
  },
};
