export const DB_DSPS = [
  {
    "id": "dsp-db-ds100",
    "mfr": "db",
    "model": "DS100 Signal Engine",
    "category": "Signal Engine / Matrix DSP",
    "network": "Dante/AES67",
    "ioSummary": {
      "inputs": 64,
      "outputs": 64,
      "total": 128
    },
    "notes": "64×64 매트릭스 DSP 플랫폼. 모든 크로스포인트에 딜레이/레벨 제어, 입출력 전 채널 정밀 시그널 프로세싱. 48/96kHz 샘플레이트 지원, En-Scene/En-Space 옵션으로 d&b Soundscape 구성 가능.",
    "relations": {
      "softwareIds": [
        "sw-db-r1"
      ]
    }
  },
  {
    "id": "dsp-db-ds10",
    "mfr": "db",
    "model": "DS10 Audio Network Bridge",
    "category": "Network Bridge",
    "network": "Dante/AES67",
    "ioSummary": {
      "inputs": 2,
      "outputs": 2,
      "total": 4
    },
    "notes": "오디오 신호와 원격 제어 데이터를 단일 이더넷 케이블로 통합하는 네트워크 브릿지. 5포트 스위치 내장, Primary/Secondary 이중화, Multicast Filtering·VLAN 지원.",
    "relations": {
      "softwareIds": [
        "sw-db-r1"
      ]
    }
  }
];
