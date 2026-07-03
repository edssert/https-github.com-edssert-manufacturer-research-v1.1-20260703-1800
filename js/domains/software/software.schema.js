/**
 * @module domains/software/schema
 * 범용 필터/그리드 엔진(core/filter-engine.js)이 이 도메인 레코드를 어떻게
 * 다룰지 선언하는 스키마. 검색 필드·칩 필터·범위 필터·정렬 규칙과
 * 제조사 표시 정보(MFR 맵: 이름/색상/축약형)가 모두 여기에 모여 있다.
 * UI 나 데이터 파일이 아닌 "규칙"을 바꿀 때 수정하는 파일.
 */
export const SW_MFR = {
  la: { name: "L-Acoustics", color: "var(--la)", short: "L-ACOUSTICS" },
  db: { name: "d&b audiotechnik", color: "var(--db)", short: "d&b" },
  my: { name: "Meyer Sound", color: "var(--my)", short: "MEYER" },
};
export const SW_MK_ORDER = ["la", "db", "my"];

export const softwareSchema = {
  unitLabel: "software",
  emptyTitle: "일치하는 소프트웨어가 없습니다",
  emptyHint: "검색어나 필터 조건을 넓혀 보세요.",
  searchFields: ["name"],
  customSearchMatch: (item, q) => SW_MFR[item.mfr].name.toLowerCase().includes(q),
  chipFields: [
    { key: "mfr", label: "Manufacturer", order: SW_MK_ORDER, labelFor: (v) => SW_MFR[v].name },
    { key: "type", label: "Type", labelFor: (v) => v },
    { key: "platform", label: "Platform", labelFor: (v) => v },
  ],
  rangeFields: [],
  defaultSort: "name",
  sorters: {
    name: (a, b) => a.name.localeCompare(b.name),
    type: (a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name),
  },
};
