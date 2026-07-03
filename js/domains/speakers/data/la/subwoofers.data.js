// L-Acoustics Subwoofers 스피커 데이터 (9개 모델).
// 필드 스키마 설명은 speakers.schema.js 참조.
// 파생 필드(wayCount / network / lowUnitConfig)는 로드 시 normalize 함수가 생성하므로 저장하지 않는다.
export const LA_SUBWOOFERS = [
  {
    "id": "spk-la-cs1",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "CS1",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 21,
    "lowQty": 2,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 150,
    "cov": null,
    "freqs": [
      {
        "db": "-10 dB",
        "lo": "25 Hz",
        "hi": "?"
      }
    ],
    "weight": 180,
    "transducers": "LC: 2 × 21″ · LF: 2 × 21″",
    "connectors": "8-point CA-COM",
    "ip": "IP55",
    "dims": "1514 x 588 x 1117 mm / 59.6 x 23.1 x 44 in",
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
                "preset": "[CS1_60]",
                "spl": 147
              },
              {
                "preset": "[CS1_X]",
                "spl": null
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/2)",
    "img": "assets/img/speakers/la/subwoofers/spk-la-cs1.webp",
    "relations": {
      "ampIds": []
    },
    "watt": null
  },
  {
    "id": "spk-la-ks28",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "KS28",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 18,
    "lowQty": 2,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 142,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "32 Hz",
        "hi": "76 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "29 Hz",
        "hi": "96 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "25 Hz",
        "hi": "110 Hz"
      }
    ],
    "weight": 79,
    "transducers": "LF: 2 × 18″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "1340 x 550 x 719 mm / 52.8 x 21.7 x 28.3 in",
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
                "preset": "[KS28_100]",
                "spl": 143
              }
            ]
          }
        ]
      },
      {
        "model": "LA2Xi",
        "configs": [
          {
            "mode": "PBTL",
            "perCh": 1,
            "total": 1,
            "splByPreset": [
              {
                "preset": "[KS28_100]",
                "spl": 143
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
                "preset": "[KS28_100]",
                "spl": 136
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(1/4), LA2Xi(PBTL1/1), LA2Xi(SE1/4)",
    "img": "assets/img/speakers/la/subwoofers/spk-la-ks28.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 1181
  },
  {
    "id": "spk-la-ks21",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "KS21",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 21,
    "lowQty": 1,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 138,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "35 Hz",
        "hi": "60 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "32 Hz",
        "hi": "71 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "29 Hz",
        "hi": "83 Hz"
      }
    ],
    "weight": 49,
    "transducers": "LF: 1 × 21″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "764 x 571 x 601 mm / 30.1 x 22.5 x 23.7 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[KS21_100]",
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
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[KS21_100]",
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
            "total": 4,
            "splByPreset": [
              {
                "preset": "[KS21_100]",
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
                "preset": "[KS21_100]",
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
                "preset": "[KS21_100]",
                "spl": 138
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/8), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/8)",
    "img": "assets/img/speakers/la/subwoofers/spk-la-ks21.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 467
  },
  {
    "id": "spk-la-sb18",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "SB18",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 18,
    "lowQty": 1,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 138,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "37 Hz",
        "hi": "82 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "34 Hz",
        "hi": "100 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "32 Hz",
        "hi": "110 Hz"
      }
    ],
    "weight": 52,
    "transducers": "LF: 1 × 18″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "750 x 553 x 707 mm / 29.5 x 21.8 x 27.8 in",
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
                "preset": "[SB18_100]",
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
            "perCh": 1,
            "total": 2,
            "splByPreset": [
              {
                "preset": "[SB18_100]",
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
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SB18_100]",
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
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SB18_100]",
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
            "total": 6,
            "splByPreset": [
              {
                "preset": "[SB18_100]",
                "spl": 138
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/6)",
    "img": "assets/img/speakers/la/subwoofers/spk-la-sb18.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 387
  },
  {
    "id": "spk-la-sb15m",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "SB15m",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 15,
    "lowQty": 1,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 137,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "49 Hz",
        "hi": "85 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "46 Hz",
        "hi": "102 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "40 Hz",
        "hi": "120 Hz"
      }
    ],
    "weight": 36,
    "transducers": "LF: 1 × 15″",
    "connectors": "4-point speakON",
    "ip": "IP55",
    "dims": "579 x 439 x 520 mm / 22.8 x 17.3 x 20.5 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[SB15_100]",
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
                "preset": "[SB15_100]",
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
                "preset": "[SB15_100]",
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
                "preset": "[SB15_100]",
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
            "total": 16,
            "splByPreset": [
              {
                "preset": "[SB15_100]",
                "spl": 137
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/8), LA2Xi(BTL1/2), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/16)",
    "img": "assets/img/speakers/la/subwoofers/spk-la-sb15m.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 608
  },
  {
    "id": "spk-la-sb10r",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "SB10r",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 10,
    "lowQty": 1,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 124,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "30 Hz",
        "hi": "55 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "27 Hz",
        "hi": "64 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "25 Hz",
        "hi": "70 Hz"
      }
    ],
    "weight": 13,
    "transducers": "LF: 1 × 10″",
    "connectors": "4-point terminal block",
    "ip": "IP55",
    "dims": "547 x 539 x 169 mm / 21.5 x 21.2 x 6.7 in",
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
                "preset": "[SB10_60]",
                "spl": 119
              },
              {
                "preset": "[SB10_100]",
                "spl": 122
              },
              {
                "preset": "[SB10_200]",
                "spl": 125
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
                "preset": "[SB10_60]",
                "spl": null
              },
              {
                "preset": "[SB10_100]",
                "spl": 122
              },
              {
                "preset": "[SB10_200]",
                "spl": 125
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
                "preset": "[SB10_60]",
                "spl": 119
              },
              {
                "preset": "[SB10_100]",
                "spl": 120
              },
              {
                "preset": "[SB10_200]",
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
            "perCh": 2,
            "total": 32,
            "splByPreset": [
              {
                "preset": "[SB10_60]",
                "spl": 119
              },
              {
                "preset": "[SB10_100]",
                "spl": 122
              },
              {
                "preset": "[SB10_200]",
                "spl": 125
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE2/8), LA7.16(2/32)",
    "img": "assets/img/speakers/la/subwoofers/spk-la-sb10r.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 146
  },
  {
    "id": "spk-la-sb10i",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "SB10i",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 10,
    "lowQty": 1,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 124,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "30 Hz",
        "hi": "55 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "27 Hz",
        "hi": "64 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "25 Hz",
        "hi": "70 Hz"
      }
    ],
    "weight": 15,
    "transducers": "LF: 1 × 10″",
    "connectors": "4-point terminal block",
    "ip": "IP55",
    "dims": "540 x 540 x 170 mm / 21.3 x 21.3 x 6.7 in",
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
                "preset": "[SB10_60]",
                "spl": 119
              },
              {
                "preset": "[SB10_100]",
                "spl": 122
              },
              {
                "preset": "[SB10_200]",
                "spl": 125
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
                "preset": "[SB10_60]",
                "spl": null
              },
              {
                "preset": "[SB10_100]",
                "spl": 122
              },
              {
                "preset": "[SB10_200]",
                "spl": 125
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
                "preset": "[SB10_60]",
                "spl": 119
              },
              {
                "preset": "[SB10_100]",
                "spl": 120
              },
              {
                "preset": "[SB10_200]",
                "spl": 123
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
                "preset": "[SB10_60]",
                "spl": 119
              },
              {
                "preset": "[SB10_100]",
                "spl": 122
              },
              {
                "preset": "[SB10_200]",
                "spl": 125
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
                "preset": "[SB10_60]",
                "spl": 119
              },
              {
                "preset": "[SB10_100]",
                "spl": 122
              },
              {
                "preset": "[SB10_200]",
                "spl": 125
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
                "preset": "[SB10_60]",
                "spl": 111
              },
              {
                "preset": "[SB10_100]",
                "spl": 112
              },
              {
                "preset": "[SB10_200]",
                "spl": 114
              }
            ]
          },
          {
            "mode": "BTL",
            "perCh": 1,
            "total": 4,
            "splByPreset": [
              {
                "preset": "[SB10_60]",
                "spl": 118
              },
              {
                "preset": "[SB10_100]",
                "spl": 120
              },
              {
                "preset": "[SB10_200]",
                "spl": 123
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(3/12), LA2Xi(BTL1/2), LA2Xi(SE2/8), LA4X(2/8), LA7.16(2/32)",
    "img": "assets/img/speakers/la/subwoofers/spk-la-sb10i.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 146
  },
  {
    "id": "spk-la-sb6r",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "SB6r",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 6.5,
    "lowQty": 2,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 115,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "34 Hz",
        "hi": "75 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "32 Hz",
        "hi": "90 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "29 Hz",
        "hi": "107 Hz"
      }
    ],
    "weight": 10.6,
    "transducers": "LF: 2 × 6.5″",
    "connectors": "4-point terminal block",
    "ip": "IP55",
    "dims": "360 x 532 x 99 mm / 14.2 x 20.9 x 3.9 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
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
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
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
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
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
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/8), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/16)",
    "img": "assets/img/speakers/la/subwoofers/spk-la-sb6r.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 85
  },
  {
    "id": "spk-la-sb6i",
    "mfr": "L-Acoustics",
    "mk": "la",
    "name": "SB6i",
    "series": "Subwoofers",
    "throwCat": null,
    "type": "Subwoofer",
    "throw": "Subwoofers",
    "lowInch": 6.5,
    "lowQty": 2,
    "crossover": "passive",
    "crossoverTags": [
      "passive"
    ],
    "spl": 115,
    "cov": null,
    "freqs": [
      {
        "db": "-3 dB",
        "lo": "34 Hz",
        "hi": "75 Hz"
      },
      {
        "db": "-6 dB",
        "lo": "32 Hz",
        "hi": "90 Hz"
      },
      {
        "db": "-10 dB",
        "lo": "29 Hz",
        "hi": "107 Hz"
      }
    ],
    "weight": 9,
    "transducers": "LF: 2 × 6.5″",
    "connectors": "4-point terminal block",
    "ip": "IP55",
    "dims": "360 x 532 x 99 mm / 14.2 x 20.9 x 3.9 in",
    "amps": [
      {
        "model": "LA12X",
        "configs": [
          {
            "mode": "",
            "perCh": 2,
            "total": 8,
            "splByPreset": [
              {
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
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
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
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
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
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
                "preset": "[SB6_60]",
                "spl": 110
              },
              {
                "preset": "[SB6_100]",
                "spl": 111
              },
              {
                "preset": "[SB6_200]",
                "spl": 115
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
            "perCh": 1,
            "total": 12,
            "splByPreset": [
              {
                "preset": "[SB6_60]",
                "spl": 106
              },
              {
                "preset": "[SB6_100]",
                "spl": 106
              },
              {
                "preset": "[SB6_200]",
                "spl": 108
              }
            ]
          }
        ]
      }
    ],
    "ampRaw": "LA12X(2/8), LA2Xi(SE1/4), LA4X(1/4), LA7.16(1/16)",
    "img": "assets/img/speakers/la/subwoofers/spk-la-sb6i.webp",
    "relations": {
      "ampIds": []
    },
    "watt": 85
  }
];
