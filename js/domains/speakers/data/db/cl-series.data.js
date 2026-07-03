// d&b audiotechnik CL 스피커 데이터 (3개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
export const DB_CL_SERIES = [
{
  "id": "spk-db-ccl8",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "CCL8",
  "series": "CL",
  "throwCat": null,
  "type": "Line Array",
  "throw": null,
  "lowInch": 7,
  "lowQty": 2,
  "crossover": "2-way, passive",
  "crossoverTags": [
    "2-way",
    "passive"
  ],
  "spl": 137,
  "cov": {
    "h": "80°",
    "splayList": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "60 Hz",
      "hi": "18 kHz"
    },
    {
      "db": "-10 dB",
      "lo": "55 Hz",
      "hi": "20 kHz"
    }
  ],
  "weight": 17.6,
  "transducers": "LC: 2 × 5″ · LF: 2 × 7″ · HF: 2 × 1.75″",
  "connectors": "NLT4 F/M (NL4)",
  "ip": null,
  "dims": "209 × 593 × 355 mm / 8.2 × 23.4 × 14 in",
  "amps": [
    {
      "model": "D40",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "40D",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    }
  ],
  "ampRaw": null,
  "img": "assets/img/speakers/db/cl/spk-db-ccl8.webp",
  "relations": {
    "ampIds": [
      "amp-db-40d",
      "amp-db-d40",
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 400
},
{
  "id": "spk-db-ccl12",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "CCL12",
  "series": "CL",
  "throwCat": null,
  "type": "Line Array",
  "throw": null,
  "lowInch": 7,
  "lowQty": 2,
  "crossover": "2-way, passive",
  "crossoverTags": [
    "2-way",
    "passive"
  ],
  "spl": 136,
  "cov": {
    "h": "120°",
    "splayList": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "60 Hz",
      "hi": "18 kHz"
    },
    {
      "db": "-10 dB",
      "lo": "55 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 17.6,
  "transducers": "LC: 2 × 5″ · LF: 2 × 7″ · HF: 2 × 1.75″",
  "connectors": "NLT4 F/M (NL4)",
  "ip": null,
  "dims": "209 × 593 × 355 mm / 8.2 × 23.4 × 14 in",
  "amps": [
    {
      "model": "D40",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "40D",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    }
  ],
  "ampRaw": null,
  "img": "assets/img/speakers/db/cl/spk-db-ccl12.webp",
  "relations": {
    "ampIds": [
      "amp-db-40d",
      "amp-db-d40",
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 400
},
{
  "id": "spk-db-ccl-sub",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "CCL-SUB",
  "series": "CL",
  "throwCat": null,
  "type": "Subwoofer",
  "throw": null,
  "lowInch": 15,
  "lowQty": 1,
  "crossover": null,
  "crossoverTags": [
    "1ch",
    "passive (front+rear cardioid)"
  ],
  "spl": 132,
  "cov": null,
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "39 Hz",
      "hi": "150 Hz"
    },
    {
      "db": "-10 dB",
      "lo": "35 Hz",
      "hi": "180 Hz"
    }
  ],
  "weight": 44.5,
  "transducers": "LF front: 1 × 15″ · LF rear: 1 × 10″ (cardioid pair)",
  "connectors": "NLT4 F/M (NL4)",
  "ip": null,
  "dims": "457 × 590 × 710 mm / 18.0 × 23.3 × 28.0 in",
  "amps": [
    {
      "model": "D40",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    },
    {
      "model": "40D",
      "configs": [
        {
          "mode": "ArrayProcessing",
          "perCh": 1,
          "total": 4
        },
        {
          "mode": "Line/Arc",
          "perCh": 2,
          "total": 8
        }
      ]
    }
  ],
  "ampRaw": null,
  "img": "assets/img/speakers/db/cl/spk-db-ccl-sub.webp",
  "relations": {
    "ampIds": [
      "amp-db-40d",
      "amp-db-d40",
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 500
}
];
