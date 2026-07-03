// L-Acoustics K Series 스피커 데이터 (6개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
export const LA_K_SERIES = [
  {
    "id": "spk-la-k1",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "K1",
    "series": "K Series",
    "throwCat": "Long Throw",
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 15,
    "lowQty": 2,
    "crossover": "3-way, active",
    "crossoverTags": [
      "3-way",
      "active"
    ],
    "spl": 149,
    "cov": {
      "h": "90°",
      "splayList": [
        0.25,
        1,
        2,
        3,
        4,
        5
      ]
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "42 Hz",
        "hi": "19 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "38 Hz",
        "hi": "19 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "35 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 106,
    "transducers": "LF: 2 × 15″ · MF: 4 × 6.5″ · HF: 3 × 3″",
    "connectors": "8-point PA-COM",
    "ip": "IP43",
    "dims": "1342 x 438 x 520 mm / 52.8 x 17.2 x 20.5 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[K1]",
                "spl": 149
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/2)",
    "img": "assets/img/speakers/la/k-series/spk-la-k1.webp",
    "views": [
      {
        "label": "Front",
        "src": "assets/img/speakers/la/k-series/spk-la-k1.webp"
      },
      {
        "label": "Array",
        "src": "assets/img/speakers/la/k-series/spk-la-k1-array.webp"
      }
    ],
    "relations": {
      "ampIds": []
    },
    "watt": 1118,
    "wattByBand": [
      { "band": "LF", "watt": 422 },
      { "band": "MF", "watt": 497 },
      { "band": "HF", "watt": 199 }
    ]
  },
  {
    "id": "spk-la-k2",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "K2",
    "series": "K Series",
    "throwCat": "Long Throw",
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 12,
    "lowQty": 2,
    "crossover": "3-way, active",
    "crossoverTags": [
      "3-way",
      "active"
    ],
    "spl": 147,
    "cov": {
      "h": "110°,70°,55°/35°,35°/55°",
      "v": "10°",
      "splayList": [
        0.25,
        1,
        2,
        3,
        4,
        5,
        7.5,
        10
      ]
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "40 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "38 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "35 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 56,
    "transducers": "LF: 2 × 12″ · MF: 4 × 6.5″ · HF: 2 × 3″",
    "connectors": "8-point PA-COM",
    "ip": "IP55",
    "dims": "1338 x 354 x 400 mm / 52.7 x 13.9 x 15.7 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 3,
            "splByPreset": [
              {
                "preset": "[K2 70]",
                "spl": 147
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 1,
            "splByPreset": [
              {
                "preset": "[K2 70]",
                "spl": 147
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[K2 70]",
                "spl": 147
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/3), LA4X(1/1), LA7.16(1/4)",
    "img": "assets/img/speakers/la/k-series/spk-la-k2.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 752
  },
  {
    "id": "spk-la-k3",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "K3",
    "series": "K Series",
    "throwCat": "Long Throw",
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 12,
    "lowQty": 2,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 143,
    "cov": {
      "h": "110°,70°,55°/35°,35°/55°",
      "v": "10°",
      "splayList": [
        0.25,
        1,
        2,
        3,
        4,
        5,
        7.5,
        10
      ]
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "50 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "46 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "42 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 43,
    "transducers": "LF: 2 × 12″ · HF: 1 × 4″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "950 x 357 x 403 mm / 37.4 x 14.1 x 15.9 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 6,
            "splByPreset": [
              {
                "preset": "[K3 70]",
                "spl": 143
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[K3 70]",
                "spl": 143
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[K3 70]",
                "spl": 143
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/6), LA4X(1/2), LA7.16(1/8)",
    "img": "assets/img/speakers/la/k-series/spk-la-k3.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 830
  },
  {
    "id": "spk-la-kara-ii",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "Kara II",
    "series": "K Series",
    "throwCat": "Long Throw",
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 8,
    "lowQty": 2,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 142,
    "cov": {
      "h": "110°,70°,55°/35°,35°/55°",
      "v": "10°",
      "splayList": [
        0,
        1,
        2,
        3,
        4,
        5,
        7.5,
        10
      ]
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "80 Hz",
        "hi": "19 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "63 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "55 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 26,
    "transducers": "LF: 2 × 8″ · HF: 1 × 3″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "733 x 252 x 500 mm / 28.9 x 9.9 x 19.7 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 6,
            "splByPreset": [
              {
                "preset": "[KARA II 70]",
                "spl": 142
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 4
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[KARA II 70]",
                "spl": 142
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[KARA II 70]",
                "spl": 142
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/6), LA2Xi(2/4), LA4X(2/4), LA7.16(1/8)",
    "img": "assets/img/speakers/la/k-series/spk-la-kara-ii.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 355
  },
  {
    "id": "spk-la-kiva-ii",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "KIVA II",
    "series": "K Series",
    "throwCat": "Long Throw",
    "type": "Line Array",
    "throw": "Long throw >35m",
    "lowInch": 6.5,
    "lowQty": 2,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 138,
    "cov": {
      "h": "100°",
      "splayList": [
        0,
        1,
        2,
        3,
        4,
        5,
        7.5,
        10,
        12.5,
        15
      ]
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "84 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "75 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "70 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 14,
    "transducers": "LF: 2 × 6.5″ · HF: 1 × 1.75″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "525 x 202 x 357 mm / 20.7 x 8 x 14.1 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 6,
            "total": 24,
            "splByPreset": [
              {
                "preset": "[KIVA II]",
                "spl": 138
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "BTL",
            "perCh": 2,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[KIVA II]",
                "spl": 138
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "SE",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[KIVA II]",
                "spl": 133
              }
            ]
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[KIVA II]",
                "spl": 138
              }
            ]
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 32,
            "splByPreset": [
              {
                "preset": "[KIVA II]",
                "spl": 138
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(6/24), LA2Xi(BTL2/4), LA2Xi(SE2/8), LA4X(2/8), LA7.16(2/32)",
    "img": "assets/img/speakers/la/k-series/spk-la-kiva-ii.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 186
  },
  {
    "id": "spk-la-k1-sb",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "K1-SB",
    "series": "K Series",
    "throwCat": "Long Throw",
    "type": "Subwoofer",
    "throw": "Low-end extension",
    "lowInch": 15,
    "lowQty": 2,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 141,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "38 Hz",
        "hi": "61 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "35 Hz",
        "hi": "70 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "30 Hz",
        "hi": "80 Hz"
      }
    ],
    "weight": 83,
    "transducers": "LF: 2 × 15″",
    "connectors": "4-point speakON",
    "ip": "IP45",
    "dims": "1342 x 438 x 520 mm / 52.8 x 17.2 x 20.5 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[K1SB_60]",
                "spl": 141
              },
              {
                "preset": "[K1SB_100_NC]",
                "spl": 142
              },
              {
                "preset": "[K1SB_X]",
                "spl": 145
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(1/4)",
    "img": "assets/img/speakers/la/k-series/spk-la-k1-sb.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 930
  }
];
