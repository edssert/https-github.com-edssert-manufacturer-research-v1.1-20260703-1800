/**
 * @module relationships/cross-ref
 * 도메인 간 ID 해석 레지스트리.
 * 스피커 ↔ 앰프처럼 서로를 참조해야 하는 도메인들이 데이터 모듈을 직접
 * import 하지 않도록, 각 도메인이 로드 시 자기 데이터를 여기 등록하고
 * 상대 도메인은 find 함수로만 조회한다 (순환 의존 방지).
 */
let AMPLIFIERS = [];
let SPEAKERS = [];

/**
 * 앰프 데이터 등록 — amplifiers.controller.js 가 로드 시 1회 호출.
 * @param {Object[]} list 전체 앰프 배열
 */
export function registerAmplifiers(list) { AMPLIFIERS = list; }

/**
 * 스피커 데이터 등록 — speakers.controller.js 가 로드 시 1회 호출.
 * @param {Object[]} list 전체 스피커 배열
 */
export function registerSpeakers(list) { SPEAKERS = list; }

/**
 * ID 로 앰프 레코드 조회.
 * @param {string} id 앰프 id (예: "amp-la-la12x")
 * @returns {Object|null}
 */
export function findAmplifierById(id) {
  return AMPLIFIERS.find(a => a.id === id) || null;
}

/**
 * ID 로 스피커 레코드 조회.
 * @param {string} id 스피커 id (예: "spk-la-k2")
 * @returns {Object|null}
 */
export function findSpeakerById(id) {
  return SPEAKERS.find(s => s.id === id) || null;
}

/**
 * 스피커의 제조사 키 + 원본 앰프 모델 문자열로 실제 앰프 id 를 찾는다.
 * 원본 데이터의 병합 표기("D40 / D80 / D90 / 40D")는 첫 모델로 해석한다.
 * @param {string} mk 제조사 키 ("la" | "db" | "my")
 * @param {string} model 스피커 데이터에 저장된 앰프 모델 문자열
 * @returns {string|null} 앰프 id, 못 찾으면 null
 */
export function resolveAmpIdForModel(mk, model) {
  const hit = AMPLIFIERS.find(a => a.mfr === mk && a.model === model);
  if (hit) return hit.id;
  if (model && model.includes(" / ")) {
    const first = model.split(" / ")[0].trim();
    const hit2 = AMPLIFIERS.find(a => a.mfr === mk && a.model === first);
    if (hit2) return hit2.id;
  }
  return null;
}

/**
 * 특정 앰프를 실제로 매칭하는 스피커 id 목록을 동적으로 계산한다.
 * 앰프 레코드의 `relations.speakerIds`(정적 필드, 현재 미입력)에 의존하지
 * 않고, 스피커 쪽 `amps[].model`을 resolveAmpIdForModel() 로 역해석해
 * 매칭 여부를 판정한다 — 스피커 매칭 표(Amplifier Matching)에 이미 쓰이는
 * 것과 동일한 판정 로직이라 두 방향(스피커→앰프, 앰프→스피커)의 "클릭
 * 가능/매칭됨" 표시가 항상 일치한다. 스피커 데이터가 갱신돼도 별도 동기화
 * 없이 항상 최신 상태를 반영한다.
 * @param {string} ampId 앰프 id (예: "amp-la-la1dot16i")
 * @returns {string[]} 매칭되는 스피커 id 배열
 */
export function findSpeakersMatchingAmp(ampId) {
  const amp = findAmplifierById(ampId);
  if (!amp) return [];
  return SPEAKERS
    .filter(s => (s.amps || []).some(a => resolveAmpIdForModel(s.mk, a.model) === ampId))
    .map(s => s.id);
}

/**
 * 특정 앰프의 "Configurations" 표(모드별 Links/ch·Max/amp·Preset·Max SPL)를
 * 스피커 쪽 매칭 데이터에서 역으로 구성한다. 앰프 자체 필드(a.configs)는
 * L-Acoustics 신형 앰프(LA1.16i 등)에 아직 입력되지 않은 경우가 많은데,
 * 같은 정보가 스피커의 amps[].configs(스피커 매칭 표 · ampMatchingHTML 이
 * 쓰는 원본, splByPreset 의 프리셋별 SPL 포함)에 이미 존재하므로 중복 입력
 * 없이 그대로 재사용한다 — SPL 도 스피커 매칭 표와 동일하게 프리셋별로
 * 펼쳐서 포함(빠뜨리지 않음). 왼쪽 열이 앰프 모델명이 아니라 "이 앰프로
 * 어떤 스피커를 어떤 모드/프리셋으로 몇 대 구동해 몇 dB 를 내는지"를
 * 보여주도록 스피커 이름을 기준으로 행을 만든다.
 * @param {string} ampId 앰프 id
 * @returns {{speakerId:string, speakerName:string, mode:string, preset:string|null, perCh:number|null, total:number|null, spl:number|null}[]}
 */
export function findAmpConfigsBySpeaker(ampId) {
  const amp = findAmplifierById(ampId);
  if (!amp) return [];
  const rows = [];
  SPEAKERS.forEach(s => {
    (s.amps || []).forEach(a => {
      if (resolveAmpIdForModel(s.mk, a.model) !== ampId) return;
      (a.configs || []).forEach(c => {
        const byPreset = c.splByPreset ? c.splByPreset.filter(p => p.spl != null) : null;
        if (byPreset && byPreset.length) {
          byPreset.forEach(p => {
            rows.push({ speakerId: s.id, speakerName: s.name, mode: c.mode || "", preset: p.preset, perCh: c.perCh != null ? c.perCh : null, total: c.total != null ? c.total : null, spl: p.spl });
          });
        } else {
          rows.push({ speakerId: s.id, speakerName: s.name, mode: c.mode || "", preset: null, perCh: c.perCh != null ? c.perCh : null, total: c.total != null ? c.total : null, spl: c.spl != null ? c.spl : null });
        }
      });
    });
  });
  return rows;
}
