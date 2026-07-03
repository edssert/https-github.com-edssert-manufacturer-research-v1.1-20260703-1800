// L-Acoustics L Series 스피커 데이터 (4개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
export const LA_L_SERIES = [
  {
    "id": "spk-la-l2",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "L2",
    "series": "L Series",
    "throwCat": "Long Throw",
    "type": "Progressive Ultra-Dense Line Source",
    "throw": "Long throw >35m",
    "lowInch": 10,
    "lowQty": 8,
    "crossover": "16-channel, active",
    "crossoverTags": [
      "16-channel",
      "active"
    ],
    "spl": 155,
    "cov": {
      "h": "110°,70°,55°/35°,35°/55°",
      "v": "10°"
    },
    "freqs": [
      {
        "db": "-10 dB",
        "lo": "45 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 158,
    "transducers": "LC: 4 × 12″ · LF: 8 × 10″ · HF: 8 × 3″",
    "connectors": "37-point male connector (32 points used)",
    "ip": "IP55",
    "dims": "850 x 1197 x 559 mm / 33.5 x 47.1 x 22 in",
    "amps": [
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 1,
            "splByPreset": [
              {
                "preset": "[L2 70]",
                "spl": 155
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA7.16(1/1)",
    "img": "assets/img/speakers/la/l-series/spk-la-l2.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 1586
  },
  {
    "id": "spk-la-l2d",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "L2D",
    "series": "L Series",
    "throwCat": "Long Throw",
    "type": "Progressive Ultra-Dense Line Source",
    "throw": "Long throw >35m",
    "lowInch": 10,
    "lowQty": 8,
    "crossover": "16-channel, active",
    "crossoverTags": [
      "16-channel",
      "active"
    ],
    "spl": 151,
    "cov": {
      "h": "100° to 140°",
      "v": "60°"
    },
    "freqs": [
      {
        "db": "-10 dB",
        "lo": "45 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 149,
    "transducers": "LC: 4 × 12″ · LF: 8 × 10″ · HF: 8 × 3″",
    "connectors": "37-point male connector (32 points used)",
    "ip": "IP55",
    "dims": "850 x 1252 x 559 mm / 33.5 x 49.3 x 22 in",
    "amps": [
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 1,
            "splByPreset": [
              {
                "preset": "[L2D 70]",
                "spl": 151
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA7.16(1/1)",
    "img": "assets/img/speakers/la/l-series/spk-la-l2d.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 1586
  },
  {
    "id": "spk-la-l1",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "L1",
    "series": "L Series",
    "throwCat": "Long Throw",
    "type": "Progressive Ultra-Dense Line Source",
    "throw": "Long throw >35m",
    "lowInch": 15,
    "lowQty": 4,
    "crossover": "16-channel, active",
    "crossoverTags": [
      "16-channel",
      "active"
    ],
    "spl": 160,
    "cov": {
      "h": "90°,70°,45°/35°,35°/45°"
    },
    "freqs": [
      {
        "db": "-10 dB",
        "lo": "35 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 256,
    "transducers": "LC: 2 × 18″ · LF: 4 × 15″ · MF: 8 × 8″ · HF: 6 × (4″ + 2.5″) Coaxial",
    "connectors": "37-point male connector (32 points used)",
    "ip": null,
    "dims": "1500 x 1005 x 750 mm / 59.1 x 39.6 x 29.5 in",
    "amps": [],
    "ampRaw": null,
    "img": "assets/img/speakers/la/l-series/spk-la-l1.webp",
    "relations": {
      "ampIds": []
    },
    "watt": null
  },
  {
    "id": "spk-la-l1d",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "L1D",
    "series": "L Series",
    "throwCat": "Long Throw",
    "type": "Progressive Ultra-Dense Line Source",
    "throw": "Long throw >35m",
    "lowInch": 15,
    "lowQty": 4,
    "crossover": "16-channel, active",
    "crossoverTags": [
      "16-channel",
      "active"
    ],
    "spl": 155,
    "cov": {
      "h": "70°,110°,55°/35°,35°/55°"
    },
    "freqs": [
      {
        "db": "-10 dB",
        "lo": "35 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 239,
    "transducers": "LC: 2 × 18″ · LF: 4 × 15″ · MF: 8 × 8″ · HF: 6 × (4″ + 2.5″) Coaxial",
    "connectors": "37-point male connector (32 points used)",
    "ip": null,
    "dims": "1500 x 1167 x 750 mm / 59.1 x 45.9 x 29.5 in",
    "amps": [],
    "ampRaw": null,
    "img": "assets/img/speakers/la/l-series/spk-la-l1d.webp",
    "imgBack": "assets/img/speakers/la/l-series/spk-la-l1d-rear.webp",
    "relations": {
      "ampIds": []
    },
    "watt": null
  }
];
