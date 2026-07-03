// L-Acoustics 앰프 데이터.
// 필드 스키마 설명은 amplifiers.schema.js 참조.
//
// v1.1 부터 L-Acoustics 앰프는 제조사 공식 스펙시트 수준의 상세 구조를
// 표준으로 쓴다 (mains/io/output/dsp/ecosystem/features/note 등 중첩 필드).
// 기존 channels/powerClass/connectivity/configs/notes(문자열)/relations 는
// 그대로 유지 — configs 는 스피커 매칭 표(Amp Matching)에 필요하고,
// relations.speakerIds 는 cross-ref 대칭성 테스트가 요구하는 필드다.
// 새 스피커 매칭 정보가 확정되면 relations.speakerIds 와 configs 를 채운다.
export const LA_AMPLIFIERS = [
  {
    "id": "amp-la-la1dot16i",
    "mfr": "la",
    "model": "LA1.16i",
    "views": [
      { "label": "Front", "src": "assets/img/amplifiers/la/amp-la-la1dot16i-front.webp" },
      { "label": "Rear", "src": "assets/img/amplifiers/la/amp-la-la1dot16i-rear.webp" },
      { "label": "Isometric", "src": "assets/img/amplifiers/la/amp-la-la1dot16i-isometric.webp" }
    ],
    "channels": 16,
    "powerClass": "Class D",
    "connectivity": [
      "AES3",
      "Milan-AVB",
      "AES67",
      "analog"
    ],
    "notes": "설치용(install-only) 16채널 앰프 컨트롤러. Array Morphing·L-SMART 등 L-Acoustics 생태계 기능 내장.",
    "type": "Amplified Controller",
    "usage": "Installation only",
    "ipRating": "IP20",
    "rackUnit": 1,
    "weight": 5.6,
    "cooling": "Front-to-rear airflow",
    "operatingTemp": "-5 °C to 50 °C",
    "ampClass": "Class D",
    "mains": {
      "rating": "100 V - 240 V ± 10%, 50 Hz - 60 Hz",
      "connector": "IEC V-Lock compatible",
      "powerRequirements": "100 V (20 A), 120 V (15 A), 220-240 V (10 A)"
    },
    "powerSupply": "Universal SMPS with Active PFC",
    "externalDspBackup": "24 V DC",
    "io": {
      "analogIn": "1 channel",
      "aesIn": "2 channels (1 x AES3 with SRC)",
      "networkAudio": "Milan-AVB (16 ch), AES67 (16 ch, 48 kHz only)",
      "networkRedundancy": "Dual (Seamless)",
      "connections": "2 x etherCON 1 Gb/s, 1 x 12-point terminal block (I/O + GPIO)"
    },
    "output": {
      "channels": 16,
      "connectors": "8 x 4-point terminal blocks",
      "minImpedance": "4 ohms",
      "powerTotal": "1200 W",
      "power8ohms": "16 x 80 W",
      "power4ohms": "16 x 160 W",
      "powerBtl8ohms": "8 x 300 W"
    },
    "dsp": {
      "engine": "Gen.5 Dual SHARC",
      "sampleRateInternal": "96 kHz",
      "sampleRateAesIn": "44.1 kHz to 192 kHz (via Built-in SRC)",
      "sampleRateNetworkIn": "96 kHz (Milan-AVB) / 48 kHz (AES67 only)",
      "bitDepth": "32-bit floating point",
      "routing": "16 x 16 matrix",
      "eqSpecs": "8 IIR, 4 FIR linear phase EQ filters per channel",
      "presetLibrary": "Integrated",
      "latencyStandard": "3.84 ms",
      "latencyLow": "1.18 ms"
    },
    "ecosystem": {
      "controlSoft": "LA Network Manager",
      "integrations": [
        "Q-SYS",
        "Crestron",
        "HTTP",
        "WebUI"
      ]
    },
    "features": [
      "Array Morphing",
      "L-SMART",
      "L-DRIVE",
      "Air absorption compensation"
    ],
    "note": {
      "modelType": "Fixed installation model only. (No touring equivalent with 'i' suffix)",
      "channelProcessing": "Built-in EQ station with 8 IIR and 4 FIR linear phase EQ filters per channel for speaker phase linearization, Array morphing, Air absorption compensation.",
      "protection": "L-DRIVE advanced system protection (over/under voltage, over temperature, overcurrent, DC, short circuit).",
      "interface": "LED indicators only."
    },
    "configs": [],
    "relations": {
      "speakerIds": []
    }
  }
];
