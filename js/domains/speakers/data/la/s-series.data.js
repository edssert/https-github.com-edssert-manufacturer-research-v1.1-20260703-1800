// L-Acoustics S Series 스피커 데이터 (4개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
export const LA_S_SERIES = [
  {
    "id": "spk-la-soka",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "Soka",
    "series": "S Series",
    "throwCat": "Medium Throw",
    "type": "Colinear",
    "throw": "Medium throw <45m",
    "lowInch": 3.5,
    "lowQty": 9,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 133,
    "cov": {
      "h": "140°",
      "v": "+5°/-21°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "100 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "70 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "60 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 9.4,
    "transducers": "LF: 9 × 3.5″ · HF: 3 × 1″",
    "connectors": "4-point screw terminal",
    "ip": "IP55",
    "dims": "99 x 1065 x 99 mm / 3.9 x 41.9 x 3.9 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 130
              },
              {
                "preset": "[SOKA_200]",
                "spl": 133
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
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 130
              },
              {
                "preset": "[SOKA_200]",
                "spl": 133
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
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 128
              },
              {
                "preset": "[SOKA_200]",
                "spl": 130
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
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 130
              },
              {
                "preset": "[SOKA_200]",
                "spl": 133
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
            "total": 16,
            "splByPreset": [
              {
                "preset": "[SOKA_60]",
                "spl": 124
              },
              {
                "preset": "[SOKA]",
                "spl": 130
              },
              {
                "preset": "[SOKA_200]",
                "spl": 133
              }
            ]
          }
        ]
      },
      {
        "model": "LA1.16i",
        "configs": [
          {
            "mode": "SE",
            "perCh": 2,
            "total": 26,
            "splByPreset": [
              {
                "preset": "[SOKA_60]",
                "spl": 114
              },
              {
                "preset": "[SOKA]",
                "spl": 119
              },
              {
                "preset": "[SOKA_200]",
                "spl": 120
              }
            ]
          },
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SOKA_60]",
                "spl": 122
              },
              {
                "preset": "[SOKA]",
                "spl": 127
              },
              {
                "preset": "[SOKA_200]",
                "spl": 130
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/16)",
    "img": "assets/img/speakers/la/s-series/spk-la-soka.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 133
  },
  {
    "id": "spk-la-syva",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "Syva",
    "series": "S Series",
    "throwCat": "Medium Throw",
    "type": "Colinear",
    "throw": "Medium throw <45m",
    "lowInch": 5,
    "lowQty": 6,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 137,
    "cov": {
      "h": "140°",
      "v": "+5°/-21°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "102 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "92 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "87 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 21,
    "transducers": "LF: 6 × 5″ · HF: 3 × 1.75″",
    "connectors": "2-point screw terminal, 4-point speakON, proprietary connector",
    "ip": "IP54",
    "dims": "144 x 1304 x 209 mm / 5.7 x 51.3 x 8.2 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[SYVA]",
                "spl": 137
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
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[SYVA]",
                "spl": 137
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
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SYVA]",
                "spl": 130
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
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SYVA]",
                "spl": 137
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
            "total": 10,
            "splByPreset": [
              {
                "preset": "[SYVA]",
                "spl": 137
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/10)",
    "img": "assets/img/speakers/la/s-series/spk-la-syva.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 454
  },
  {
    "id": "spk-la-syva-low",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "Syva Low",
    "series": "S Series",
    "throwCat": "Medium Throw",
    "type": "Subwoofer",
    "throw": "Low-end extension",
    "lowInch": 12,
    "lowQty": 2,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 137,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "47 Hz",
        "hi": "93 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "42 Hz",
        "hi": "110 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "40 Hz",
        "hi": "130 Hz"
      }
    ],
    "weight": 29,
    "transducers": "LF: 2 × 12″",
    "connectors": "4-point speakON, proprietary connector",
    "ip": "IP55",
    "dims": "334 x 549 x 350 mm / 13.1 x 21.6 x 13.8 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 6,
            "splByPreset": [
              {
                "preset": "[SYVA LOW_100]",
                "spl": 137
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
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SYVA LOW_100]",
                "spl": 131
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
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SYVA LOW_100]",
                "spl": 137
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
                "preset": "[SYVA LOW_100]",
                "spl": 137
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/6), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/8)",
    "img": "assets/img/speakers/la/s-series/spk-la-syva-low.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 894
  },
  {
    "id": "spk-la-syva-sub",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "Syva Sub",
    "series": "S Series",
    "throwCat": "Medium Throw",
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 12,
    "lowQty": 1,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 128,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "33 Hz",
        "hi": "80 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "29 Hz",
        "hi": "100 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "27 Hz",
        "hi": "120 Hz"
      }
    ],
    "weight": 27,
    "transducers": "LF: 1 × 12″",
    "connectors": "4-point speakON, proprietary connector",
    "ip": "IP55",
    "dims": "849 x 334 x 350 mm / 33.4 x 13.1 x 13.8 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 3,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[SYVA SUB_60]",
                "spl": 122
              },
              {
                "preset": "[SYVA SUB_100]",
                "spl": 128
              },
              {
                "preset": "[SYVA SUB_200]",
                "spl": 130
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
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[SYVA SUB_60]",
                "spl": null
              },
              {
                "preset": "[SYVA SUB_100]",
                "spl": 128
              },
              {
                "preset": "[SYVA SUB_200]",
                "spl": 130
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
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SYVA SUB_60]",
                "spl": 122
              },
              {
                "preset": "[SYVA SUB_100]",
                "spl": 123
              },
              {
                "preset": "[SYVA SUB_200]",
                "spl": 125
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
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SYVA SUB_60]",
                "spl": 122
              },
              {
                "preset": "[SYVA SUB_100]",
                "spl": 128
              },
              {
                "preset": "[SYVA SUB_200]",
                "spl": 130
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
            "total": 16,
            "splByPreset": [
              {
                "preset": "[SYVA SUB_60]",
                "spl": 122
              },
              {
                "preset": "[SYVA SUB_100]",
                "spl": 128
              },
              {
                "preset": "[SYVA SUB_200]",
                "spl": 130
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/16)",
    "img": "assets/img/speakers/la/s-series/spk-la-syva-sub.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 250
  }
];
