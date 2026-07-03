# 제품 이미지 가이드

이 폴더의 이미지는 카드(`.card__media`)와 모달(`.modal__media`)에서
`object-fit: contain`으로 고정 높이 박스 안에 표시됩니다. 이미지마다
누끼(투명 배경) 여백 비율이 다르면 같은 박스 안에서 제품 크기가
들쭉날쭉해 보이므로, 새 이미지를 추가할 때는 아래 규칙을 따릅니다.

## 폴더 구조

스펙 데이터 폴더(`js/domains/{도메인}/data/{mk}/{series}.data.js`)와
1:1 대응되도록 `assets/img/{도메인}/{mk}/{series-slug}/파일명.webp`
구조로 정리합니다.

```
assets/img/
  speakers/                  ← js/domains/speakers/data/ 에 대응
    la/                      ← mk: L-Acoustics
      k-series/              ← series: "K Series" → slug "k-series"
        spk-la-k1.webp
        spk-la-k2.webp
        ...
      x-series/
      subwoofers/             ← series: "Subwoofers" → slug "subwoofers"
      ...
    db/                       ← mk: d&b audiotechnik
      sl/                     ← series: "SL" → slug "sl"
      cl/
  amplifiers/                 ← 앰프 이미지 추가 시 (js/domains/amplifiers/data/ 대응)
  dsps/                       ← DSP 이미지 추가 시
  software/                   ← 소프트웨어 이미지 추가 시
```

**slug 변환 규칙**: series 값을 소문자로 바꾸고 " Series" 접미사는
"-series"로, 공백은 "-"로 치환합니다. 예: `"K Series"` → `k-series`,
`"Subwoofers"` → `subwoofers`, `"SL"` → `sl`.

data.js 안의 `img` 필드는 이 경로를 루트 기준 상대경로로 그대로 담습니다.
예: `"img": "assets/img/speakers/la/k-series/spk-la-k1.webp"`.

## 새 이미지 추가 체크리스트

1. **대응하는 하위 폴더에 저장한다.** 새 스피커를 `js/domains/speakers/data/la/k-series.data.js`에
   추가한다면 이미지는 `assets/img/speakers/la/k-series/`에 넣고, data.js의
   `img` 필드도 같은 경로로 채웁니다. 새 시리즈/브랜드라면 규칙에 맞는
   새 폴더를 만듭니다.
2. **배경을 완전히 투명 처리(누끼)한다.** PNG/WebP + 알파 채널 필수.
   흰색/회색 배경이 남아있으면 카드에서 사각형 프레임처럼 도드라져 보입니다.
3. **워터마크·로고·수상 배지 등 제품 자체가 아닌 요소를 제거한다.**
   `normalize_images.py`의 `remove_region()` 함수로 특정 영역만 지울 수
   있습니다.
4. **여백을 정규화한다.** 아래 스크립트로 전체 이미지(하위 폴더 재귀 포함)의
   상하좌우 여백을 동일 비율(기본 8%)로 통일합니다.

   ```bash
   cd assets/img
   pip install Pillow --break-system-packages   # 최초 1회만
   cp -r . /path/to/backup/img_backup            # 적용 전 백업 권장
   python3 normalize_images.py dry               # 미리보기
   python3 normalize_images.py apply              # 실제 적용
   ```

5. **예외 케이스는 자동 처리에서 제외한다.** 매입형(in-wall/in-ceiling)
   스피커처럼 흰 마운팅 프레임이 제품 사진 자체에 포함된 경우, 알파
   bounding box가 프레임까지 "제품"으로 오인해 여백이 트리밍되지
   않습니다. 이런 파일명은 `normalize_images.py`의 `EXCLUDE` 집합에
   추가하고 필요시 수동으로 크롭합니다. (현재:
   `assets/img/speakers/la/subwoofers/spk-la-sb6r.webp`,
   `assets/img/speakers/la/subwoofers/spk-la-sb10r.webp`)
6. **전체 점검.** 아래로 하위 폴더 전체를 훑어 썸네일 격자 이미지를
   만듭니다. 라벨은 `mk/series/파일명` 형태로 표시됩니다.

   ```bash
   python3 montage_check.py check.png
   ```

   생성된 PNG를 열어 다른 이미지 대비 유난히 크거나 작은 것, 흰 배경과
   섞여 프레임처럼 보이는 것, 로고/텍스트가 남아있는 것이 없는지 확인합니다.

## 파일명 규칙

`{도메인접두어}-{제조사코드}-{모델슬러그}.webp` 형식을 따릅니다.
예: `spk-la-k1.webp` (스피커 · L-Acoustics · K1),
`spk-db-gsl12.webp` (스피커 · d&b · GSL12). 접두어는 도메인별로
`spk-`(speakers), `amp-`(amplifiers), `dsp-`(dsps), `sw-`(software)를
사용합니다.

## 새 도메인/브랜드/시리즈 추가 시

1. `js/domains/{도메인}/data/{mk}/{series}.data.js`에 데이터를 추가한다.
2. 동일한 경로 규칙으로 `assets/img/{도메인}/{mk}/{series-slug}/`
   폴더를 만들고 이미지를 넣는다.
3. data.js의 `img` 필드에 해당 경로를 적는다.
4. 이 폴더의 정규화·점검 체크리스트(위 1~6번)를 그대로 적용한다.

## 다른 프로젝트/코워크 세션에서 재사용하기

이 두 스크립트(`normalize_images.py`, `montage_check.py`)는 하위 폴더를
재귀적으로 탐색하도록 만들어져 있어 브랜드/시리즈 구조를 유지한 채 그대로
복사해 다른 프로젝트에도 쓸 수 있습니다. Pillow만 설치되어 있으면 되고,
대상 폴더의 확장자가 다르면(webp가 아닌 png 등) 스크립트의 `glob` 패턴만
바꾸면 됩니다. 폴더 구조 자체가 "스펙 데이터 폴더와 1:1 대응"이라는
규칙이므로, 다른 프로젝트에서도 데이터 폴더 구조를 먼저 확인하고 그에
맞춰 이미지 폴더를 설계하는 것을 권장합니다.
