// d&b audiotechnik SL 스피커 데이터 (6개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
export const DB_SL_SERIES = [
{
  "id": "spk-db-gsl8",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "GSL8",
  "series": "SL",
  "throwCat": null,
  "type": "Line Array",
  "throw": "Long throw >35m",
  "lowInch": 14,
  "lowQty": 2,
  "crossover": "3-way, active, passive",
  "crossoverTags": [
    "2ch active split",
    "passive (side LF+MF+HF)"
  ],
  "spl": 150,
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
      7
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "45 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 80,
  "transducers": "LC: 2 × 10″ · LF: 2 × 14″ · MF: 1 × 10″ · HF: 3 × 1.4″",
  "connectors": "4-point speakON",
  "ip": "IP55",
  "dims": "1300 x 391 x 627 mm / 51.2 x 15.4 x 24.7 in",
  "amps": [
    {
      "model": "D80",
      "configs": [
        {
          "mode": "",
          "perCh": 1,
          "total": 2
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "",
          "perCh": 1,
          "total": 2
        }
      ]
    }
  ],
  "ampRaw": "D80(1/2), D90(1/2)",
  "img": "assets/img/speakers/db/sl/spk-db-gsl8.webp",
  "relations": {
    "ampIds": [
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 1600
},
{
  "id": "spk-db-gsl12",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "GSL12",
  "series": "SL",
  "throwCat": null,
  "type": "Line Array",
  "throw": "Long throw >35m",
  "lowInch": 14,
  "lowQty": 2,
  "crossover": "3-way, active, passive",
  "crossoverTags": [
    "2ch active split",
    "passive (side LF+MF+HF)"
  ],
  "spl": 149,
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
      7
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "45 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 80,
  "transducers": "LC: 2 × 10″ · LF: 2 × 14″ · MF: 1 × 10″ · HF: 3 × 1.4″",
  "connectors": "4-point speakON",
  "ip": "IP55",
  "dims": "1300 x 391 x 627 mm / 51.2 x 15.4 x 24.7 in",
  "amps": [
    {
      "model": "D80",
      "configs": [
        {
          "mode": "",
          "perCh": 1,
          "total": 2
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "",
          "perCh": 1,
          "total": 2
        }
      ]
    }
  ],
  "ampRaw": "D80(1/2), D90(1/2)",
  "img": "assets/img/speakers/db/sl/spk-db-gsl12.webp",
  "relations": {
    "ampIds": [
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 1600
},
{
  "id": "spk-db-ksl8",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "KSL8",
  "series": "SL",
  "throwCat": null,
  "type": "Line Array",
  "throw": "Long throw >35m",
  "lowInch": 10,
  "lowQty": 2,
  "crossover": "3-way, active, passive",
  "crossoverTags": [
    "2ch active split",
    "passive (side LF+MF+HF)"
  ],
  "spl": 145,
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
      10
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "54 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 58,
  "transducers": "LC: 2 × 8″ · LF: 2 × 10″ · MF: 1 × 8″ · HF: 2 × 1.4″",
  "connectors": "4-point speakON",
  "ip": "IP55",
  "dims": "1000 x 330 x 597 mm / 39.4 x 13 x 23.5 in",
  "amps": [
    {
      "model": "D40",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    }
  ],
  "ampRaw": "D40(AP1/2-Line2/4), D80(AP1/2-Line2/4), D90(AP1/2-Line2/4)",
  "img": "assets/img/speakers/db/sl/spk-db-ksl8.webp",
  "relations": {
    "ampIds": [
      "amp-db-d40",
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 700
},
{
  "id": "spk-db-ksl12",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "KSL12",
  "series": "SL",
  "throwCat": null,
  "type": "Line Array",
  "throw": "Long throw >35m",
  "lowInch": 10,
  "lowQty": 2,
  "crossover": "3-way, active, passive",
  "crossoverTags": [
    "2ch active split",
    "passive (side LF+MF+HF)"
  ],
  "spl": 144,
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
      10
    ]
  },
  "freqs": [
    {
      "db": "-5 dB",
      "lo": "54 Hz",
      "hi": "18 kHz"
    }
  ],
  "weight": 58,
  "transducers": "LC: 2 × 8″ · LF: 2 × 10″ · MF: 1 × 8″ · HF: 2 × 1.4″",
  "connectors": "4-point speakON",
  "ip": "IP55",
  "dims": "1000 x 330 x 597 mm / 39.4 x 13 x 23.5 in",
  "amps": [
    {
      "model": "D40",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    }
  ],
  "ampRaw": "D40(AP1/2-Line2/4), D80(AP1/2-Line2/4), D90(AP1/2-Line2/4)",
  "img": "assets/img/speakers/db/sl/spk-db-ksl12.webp",
  "relations": {
    "ampIds": [
      "amp-db-d40",
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 700
},
{
  "id": "spk-db-xsl8",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "XSL8",
  "series": "SL",
  "throwCat": null,
  "type": "Line Array",
  "throw": "Long throw >35m",
  "lowInch": 8,
  "lowQty": 2,
  "crossover": "3-way, active, passive",
  "crossoverTags": [
    "2ch active split",
    "passive (side LF+MF+HF)"
  ],
  "spl": 141,
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
    }
  ],
  "weight": 39,
  "transducers": "LC: 2 × 6.5″ · LF: 2 × 8″ · MF: 1 × 6.5″ · HF: 2 × 1″",
  "connectors": "4-point speakON",
  "ip": "IP55",
  "dims": "700 x 283 x 507 mm / 27.6 x 11.1 x 20 in",
  "amps": [
    {
      "model": "D40",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    }
  ],
  "ampRaw": "D40(AP1/2-Line2/4), D80(AP1/2-Line2/4), D90(AP1/2-Line2/4)",
  "img": "assets/img/speakers/db/sl/spk-db-xsl8.webp",
  "relations": {
    "ampIds": [
      "amp-db-d40",
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 700
},
{
  "id": "spk-db-xsl12",
  "mfr": "d&b audiotechnik",
  "mk": "db",
  "name": "XSL12",
  "series": "SL",
  "throwCat": null,
  "type": "Line Array",
  "throw": "Long throw >35m",
  "lowInch": 8,
  "lowQty": 2,
  "crossover": "3-way, active, passive",
  "crossoverTags": [
    "2ch active split",
    "passive (side LF+MF+HF)"
  ],
  "spl": 140,
  "cov": {
    "h": "80°,120°",
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
    }
  ],
  "weight": 39,
  "transducers": "LC: 2 × 6.5″ · LF: 2 × 8″ · MF: 1 × 6.5″ · HF: 2 × 1″",
  "connectors": "4-point speakON",
  "ip": "IP55",
  "dims": "700 x 283 x 507 mm / 27.6 x 11.1 x 20 in",
  "amps": [
    {
      "model": "D40",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D80",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    },
    {
      "model": "D90",
      "configs": [
        {
          "mode": "AP",
          "perCh": 1,
          "total": 2
        },
        {
          "mode": "Line",
          "perCh": 2,
          "total": 4
        }
      ]
    }
  ],
  "ampRaw": "D40(AP1/2-Line2/4), D80(AP1/2-Line2/4), D90(AP1/2-Line2/4)",
  "img": "assets/img/speakers/db/sl/spk-db-xsl12.webp",
  "relations": {
    "ampIds": [
      "amp-db-d40",
      "amp-db-d80",
      "amp-db-d90"
    ]
  },
  "watt": 700
}
];
