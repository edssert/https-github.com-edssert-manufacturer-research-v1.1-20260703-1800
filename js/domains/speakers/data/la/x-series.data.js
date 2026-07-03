// L-Acoustics X Series 스피커 데이터 (7개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
export const LA_X_SERIES = [
  {
    "id": "spk-la-x15-hiq",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "X15 HiQ",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 15,
    "lowQty": 1,
    "crossover": "2-way, active",
    "crossoverTags": [
      "2-way",
      "active"
    ],
    "spl": 138,
    "cov": {
      "h": "40°",
      "v": "60°",
      "m": "35°/55°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "70 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "62 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "55 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 21,
    "transducers": "LF: 1 × 15″ · HF: 1 × 3″",
    "connectors": "4-point speakON",
    "ip": "IP43",
    "dims": "430 x 580 x 375 mm / 16.9 x 22.8 x 14.8 in",
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
                "preset": "[X15]",
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
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[X15]",
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
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[X15]",
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
            "perCh": 1,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[X15]",
                "spl": 138
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/6), LA2Xi(SE1/2), LA4X(1/2), LA7.16(1/8)",
    "img": "assets/img/speakers/la/x-series/spk-la-x15-hiq.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 384
  },
  {
    "id": "spk-la-x12",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "X12",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 12,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 136,
    "cov": {
      "h": "60°",
      "v": "90°",
      "m": "35°/55°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "70 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "63 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "59 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 20,
    "transducers": "LF: 1 × 12″ · HF: 1 × 3″",
    "connectors": "4-point speakON",
    "ip": "IP43",
    "dims": "430 x 496 x 375 mm / 16.9 x 19.5 x 14.8 in",
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
                "preset": "[X12]",
                "spl": 136
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
                "preset": "[X12]",
                "spl": 136
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
                "preset": "[X12]",
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
                "preset": "[X12]",
                "spl": 136
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
            "total": 14,
            "splByPreset": [
              {
                "preset": "[X12]",
                "spl": 136
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/14)",
    "img": "assets/img/speakers/la/x-series/spk-la-x12.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 331
  },
  {
    "id": "spk-la-x8",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "X8",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 8,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 129,
    "cov": {
      "h": "100°",
      "v": "100°",
      "m": "35°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "70 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "65 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "60 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 12,
    "transducers": "LF: 1 × 8″ · HF: 1 × 1.5″",
    "connectors": "4-point speakON",
    "ip": "IP43",
    "dims": "250 x 424 x 264 mm / 9.8 x 16.7 x 10.4 in",
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
                "preset": "[X8]",
                "spl": 129
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
                "preset": "[X8]",
                "spl": 129
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
                "preset": "[X8]",
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
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[X8]",
                "spl": 129
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
                "preset": "[X8]",
                "spl": 129
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
            "total": 32,
            "splByPreset": [
              {
                "preset": "[X8]",
                "spl": 117
              }
            ]
          },
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[X8]",
                "spl": 124
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE2/8), LA4X(2/8), LA7.16(1/16)",
    "img": "assets/img/speakers/la/x-series/spk-la-x8.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 211
  },
  {
    "id": "spk-la-x6i",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "X6i",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 6.5,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 123,
    "cov": {
      "h": "90°",
      "v": "90°",
      "m": "35°/55°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "84 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "76 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "69 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 6.3,
    "transducers": "LF: 1 × 6.5″ · HF: 1 × 1.5″",
    "connectors": "2-point terminal block",
    "ip": "IP55",
    "dims": "187 x 362 x 170 mm / 7.4 x 14.3 x 6.7 in",
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
                "preset": "[X6i_50]",
                "spl": 117
              },
              {
                "preset": "[X6i]",
                "spl": 123
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
                "preset": "[X6i_50]",
                "spl": null
              },
              {
                "preset": "[X6i]",
                "spl": 123
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
                "preset": "[X6i_50]",
                "spl": 117
              },
              {
                "preset": "[X6i]",
                "spl": 122
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
                "preset": "[X6i_50]",
                "spl": 117
              },
              {
                "preset": "[X6i]",
                "spl": 123
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
                "preset": "[X6i_50]",
                "spl": 117
              },
              {
                "preset": "[X6i]",
                "spl": 123
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
            "total": 20,
            "splByPreset": [
              {
                "preset": "[X6i_50]",
                "spl": 110
              },
              {
                "preset": "[X6i]",
                "spl": 115
              }
            ]
          },
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[X6i_50]",
                "spl": 117
              },
              {
                "preset": "[X6i]",
                "spl": 122
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE2/8), LA4X(2/8), LA7.16(1/16)",
    "img": "assets/img/speakers/la/x-series/spk-la-x6i.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 83
  },
  {
    "id": "spk-la-5xt",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "5XT",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 5,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 121,
    "cov": {
      "h": "110°",
      "v": "110°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "115 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "105 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "95 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 3.5,
    "transducers": "LF: 1 × 5″ · HF: 1 × 1″",
    "connectors": "4-point speakON",
    "ip": "IP30(IP54 Option)",
    "dims": "165 x 165 x 165 mm / 6.5 x 6.5 x 6.5 in",
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
                "preset": "[5XT]",
                "spl": 121
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
            "perCh": 4,
            "total": 16,
            "splByPreset": [
              {
                "preset": "[5XT]",
                "spl": 121
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
            "perCh": 4,
            "total": 16,
            "splByPreset": [
              {
                "preset": "[5XT]",
                "spl": 121
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
            "perCh": 3,
            "total": 48,
            "splByPreset": [
              {
                "preset": "[5XT]",
                "spl": 121
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
            "perCh": 3,
            "total": 48,
            "splByPreset": [
              {
                "preset": "[5XT]",
                "spl": 112
              }
            ]
          },
          {
            "mode": "BTL",
            "perCh": 2,
            "total": 14,
            "splByPreset": [
              {
                "preset": "[5XT]",
                "spl": 120
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(6/24), LA2Xi(SE4/16), LA4X(4/16), LA7.16(3/48)",
    "img": "assets/img/speakers/la/x-series/spk-la-5xt.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 66
  },
  {
    "id": "spk-la-x4i",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "X4i",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 4,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 116,
    "cov": {
      "h": "110°",
      "v": "110°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "105 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "77 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "65 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 1,
    "transducers": "LF: 1 × 4″ · HF: 1 × 1.4″",
    "connectors": "2-point screw terminal",
    "ip": "IP55",
    "dims": "116 x 116 x 99 mm / 4.6 x 4.6 x 3.9 in",
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
                "preset": "[X4]",
                "spl": 116
              },
              {
                "preset": "[X4_60]",
                "spl": 110
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
            "perCh": 4,
            "total": 16,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 116
              },
              {
                "preset": "[X4_60]",
                "spl": 110
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
            "perCh": 4,
            "total": 16,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 116
              },
              {
                "preset": "[X4_60]",
                "spl": 110
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
            "perCh": 4,
            "total": 64,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 116
              },
              {
                "preset": "[X4_60]",
                "spl": 110
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
            "perCh": 3,
            "total": 48,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 107
              },
              {
                "preset": "[X4_60]",
                "spl": 104
              }
            ]
          },
          {
            "mode": "BTL",
            "perCh": 2,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[X4]",
                "spl": 115
              },
              {
                "preset": "[X4_60]",
                "spl": 110
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(6/24), LA2Xi(SE4/16), LA4X(4/16), LA7.16(4/64)",
    "img": "assets/img/speakers/la/x-series/spk-la-x4i.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 42
  },
  {
    "id": "spk-la-x4r",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "X4r",
    "series": "X Series",
    "throwCat": "Short Throw",
    "type": "Point",
    "throw": "Short throw",
    "lowInch": 4,
    "lowQty": 1,
    "crossover": "2-way, passive",
    "crossoverTags": [
      "2-way",
      "passive"
    ],
    "spl": 116,
    "cov": {
      "h": "110°",
      "v": "110°"
    },
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "105 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-6 dB",
        "lo": "77 Hz",
        "hi": "20 kHz"
      },
      {
        "db": "-10 dB",
        "lo": "65 Hz",
        "hi": "20 kHz"
      }
    ],
    "weight": 1.6,
    "transducers": "LF: 1 × 4″ · HF: 1 × 1.4″",
    "connectors": "2-point screw terminal",
    "ip": "IP55",
    "dims": "116 x 116 x 109 mm / 4.6 x 4.6 x 4.3 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 6,
            "total": 24
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "SE",
            "perCh": 4,
            "total": 16
          }
        ]
      },
      {
        "model": "LA4X",
        "configs": [
          {
            "mode": "",
            "perCh": 4,
            "total": 16
          }
        ]
      },
      {
        "model": "LA7.16",
        "configs": [
          {
            "mode": "",
            "perCh": 4,
            "total": 64
          }
        ]
      }
    ],
    "ampRaw": "LA12X(6/24), LA2Xi(SE4/16), LA4X(4/16), LA7.16(4/64)",
    "img": "assets/img/speakers/la/x-series/spk-la-x4r.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 42
  }
];
