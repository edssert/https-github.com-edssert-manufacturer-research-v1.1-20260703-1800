/**
 * @module domains/amplifiers/schema
 * 범용 필터/그리드 엔진(core/filter-engine.js)이 이 도메인 레코드를 어떻게
 * 다룰지 선언하는 스키마. 검색 필드·칩 필터·범위 필터·정렬 규칙과
 * 제조사 표시 정보(MFR 맵: 이름/색상/축약형)가 모두 여기에 모여 있다.
 * UI 나 데이터 파일이 아닌 "규칙"을 바꿀 때 수정하는 파일.
 */
export const AMP_MFR = {
  la: { name: "L-Acoustics", color: "var(--la)", short: "L-ACOUSTICS" },
  db: { name: "d&b audiotechnik", color: "var(--db)", short: "d&b" },
  my: { name: "Meyer Sound", color: "var(--my)", short: "MEYER" },
};
export const AMP_MK_ORDER = ["la", "db", "my"];

export const amplifiersSchema = {
  unitLabel: "amplifiers",
  emptyTitle: "일치하는 앰프가 없습니다",
  emptyHint: "검색어나 필터 조건을 넓혀 보세요.",
  searchFields: ["model"],
  customSearchMatch: (item, q) => AMP_MFR[item.mfr].name.toLowerCase().includes(q),
  chipFields: [
    { key: "mfr", label: "Manufacturer", order: AMP_MK_ORDER, labelFor: (v) => AMP_MFR[v].name },
    { key: "channels", label: "Channels", labelFor: (v) => v + "ch" },
    // usage: "Installation only" / "Touring" 등 — LA1.16i 부터 도입된 필드(v1.1).
    // 값이 없는 앰프(기존 d&b 등 단순 스키마)는 filter-engine 이 null 값을
    // 옵션에서 자동으로 제외하므로 이 칩 자체가 나타나지 않는다.
    { key: "usage", label: "Usage" },
  ],
  rangeFields: [],
  defaultSort: "model",
  sorters: {
    model: (a, b) => a.model.localeCompare(b.model),
    channels: (a, b) => (b.channels || 0) - (a.channels || 0) || a.model.localeCompare(b.model),
    speakerCount: (a, b) => (b.relations.speakerIds.length - a.relations.speakerIds.length) || a.model.localeCompare(b.model),
  },
};
