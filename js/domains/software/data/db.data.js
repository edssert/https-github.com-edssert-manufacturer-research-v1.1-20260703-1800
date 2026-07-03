export const DB_SOFTWARE = [
  {
    "id": "sw-db-r1",
    "mfr": "db",
    "name": "R1 Remote Control",
    "type": "Control & Tuning",
    "platform": "Windows/macOS",
    "price": "Free",
    "notes": "d&b 앰프를 OCA/AES70(Open Control Architecture) 프로토콜로 제어하는 원격 제어 소프트웨어. DS100 Signal Engine과 통합된 운영 개념으로 파라미터 그룹핑(리모트뷰)과 스냅샷 저장을 지원. 매트릭스 전 기능은 OSC로도 제어 가능.",
    "relations": {
      "dspIds": [
        "dsp-db-ds100",
        "dsp-db-ds10"
      ]
    }
  },
  {
    "id": "sw-db-artshow",
    "mfr": "db",
    "name": "ArrayCalc",
    "type": "Design & Simulation",
    "platform": "Windows",
    "price": "Free",
    "notes": "d&b 라인어레이·포인트소스 시스템 설계 소프트웨어. 리깅 계산, SPL 예측, 프리셋 생성을 지원하며 설계 결과를 R1으로 전달해 현장 튜닝 워크플로를 연결.",
    "relations": {
      "dspIds": [
        "dsp-db-ds100"
      ]
    }
  }
];
