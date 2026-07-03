// L-Acoustics 스피커 데이터 배럴(barrel) 파일 — 시리즈별 파일을 하나의 배열로 결합.
// 새 시리즈 추가 방법: la/<슬러그>.data.js 생성 후 아래에 import + spread 한 줄씩 추가.
import { LA_K_SERIES } from "./la/k-series.data.js";
import { LA_L_SERIES } from "./la/l-series.data.js";
import { LA_SUBWOOFERS } from "./la/subwoofers.data.js";
import { LA_S_SERIES } from "./la/s-series.data.js";
import { LA_A_SERIES } from "./la/a-series.data.js";
import { LA_X_SERIES } from "./la/x-series.data.js";

export const LA_SPEAKERS = [
  ...LA_K_SERIES,
  ...LA_L_SERIES,
  ...LA_SUBWOOFERS,
  ...LA_S_SERIES,
  ...LA_A_SERIES,
  ...LA_X_SERIES,
];
