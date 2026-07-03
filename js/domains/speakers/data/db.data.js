// d&b audiotechnik 스피커 데이터 배럴(barrel) 파일 — 시리즈별 파일을 하나의 배열로 결합.
// 새 시리즈 추가 방법: db/<슬러그>.data.js 생성 후 아래에 import + spread 한 줄씩 추가.
import { DB_SL_SERIES } from "./db/sl-series.data.js";
import { DB_CL_SERIES } from "./db/cl-series.data.js";

export const DB_SPEAKERS = [
  ...DB_SL_SERIES,
  ...DB_CL_SERIES,
];
