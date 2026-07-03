export const DB_AMPLIFIERS = [
  {
    "id": "amp-db-d80",
    "mfr": "db",
    "model": "D80",
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "AES3",
      "Dante (옵션)"
    ],
    "notes": "d&b 투어링 앰프. Array Processing 지원.",
    "configs": [
      {
        "mode": "",
        "perCh": 1,
        "total": 2
      },
      {
        "mode": "AP",
        "perCh": 1,
        "total": 2
      },
      {
        "mode": "Line",
        "perCh": 2,
        "total": 4
      },
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
    ],
    "relations": {
      "speakerIds": [
        "spk-db-ccl-sub",
        "spk-db-ccl12",
        "spk-db-ccl8",
        "spk-db-gsl12",
        "spk-db-gsl8",
        "spk-db-ksl12",
        "spk-db-ksl8",
        "spk-db-xsl12",
        "spk-db-xsl8"
      ]
    }
  },
  {
    "id": "amp-db-d90",
    "mfr": "db",
    "model": "D90",
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "AES3",
      "Dante (옵션)"
    ],
    "notes": "d&b 최상위 투어링 앰프. 대형 라인어레이 구동용.",
    "configs": [
      {
        "mode": "",
        "perCh": 1,
        "total": 2
      },
      {
        "mode": "AP",
        "perCh": 1,
        "total": 2
      },
      {
        "mode": "Line",
        "perCh": 2,
        "total": 4
      },
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
    ],
    "relations": {
      "speakerIds": [
        "spk-db-ccl-sub",
        "spk-db-ccl12",
        "spk-db-ccl8",
        "spk-db-gsl12",
        "spk-db-gsl8",
        "spk-db-ksl12",
        "spk-db-ksl8",
        "spk-db-xsl12",
        "spk-db-xsl8"
      ]
    }
  },
  {
    "id": "amp-db-d40",
    "mfr": "db",
    "model": "D40",
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "AES3",
      "Dante (옵션)"
    ],
    "notes": "d&b 중소형 투어링 앰프.",
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
      },
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
    ],
    "relations": {
      "speakerIds": [
        "spk-db-ccl-sub",
        "spk-db-ccl12",
        "spk-db-ccl8",
        "spk-db-ksl12",
        "spk-db-ksl8",
        "spk-db-xsl12",
        "spk-db-xsl8"
      ]
    }
  },
  {
    "id": "amp-db-40d",
    "mfr": "db",
    "model": "40D",
    "channels": 4,
    "powerClass": "Class D",
    "connectivity": [
      "AES3",
      "Dante (옵션)"
    ],
    "notes": "d&b 앰프. Array Processing/Line-Arc 모드 지원.",
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
    ],
    "relations": {
      "speakerIds": [
        "spk-db-ccl-sub",
        "spk-db-ccl12",
        "spk-db-ccl8"
      ]
    }
  }
];
