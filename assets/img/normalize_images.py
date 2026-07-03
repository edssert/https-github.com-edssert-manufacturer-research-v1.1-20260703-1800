#!/usr/bin/env python3
"""
제품 이미지 여백 정규화 스크립트.

목적
----
이 프로젝트의 카드(.card__media)·모달(.modal__media)은 이미지를
object-fit: contain 으로 고정 높이 박스 안에 표시한다. 원본 제품 사진마다
누끼(투명 배경) 주변 여백 비율이 제각각이면(예: 어떤 이미지는 상하 25%
여백, 어떤 이미지는 0%) 같은 카드 높이 안에서 제품이 크게/작게 보이는
불균형이 생긴다. 이 스크립트는 각 이미지의 "제품이 차지하는 실제 영역"
(알파 채널 기준 bounding box)을 찾아 트리밍한 뒤, 지정한 비율의 여백만
새로 붙여 모든 이미지의 시각적 밀도(프레임 대비 제품 크기)를 통일한다.

폴더 구조
--------
이미지는 스펙 데이터 폴더(js/domains/{도메인}/data/{mk}/{series}.data.js)와
1:1 대응되는 assets/img/{도메인}/{mk}/{series-slug}/파일명.webp 구조로
정리되어 있다. 예: js/domains/speakers/data/la/k-series.data.js 의 항목들은
assets/img/speakers/la/k-series/ 아래에 이미지가 있다. 이 스크립트는
하위 폴더를 재귀적으로 탐색하므로 구조를 그대로 유지한 채 전체를 처리한다.

사용법
------
    cd assets/img
    pip install Pillow --break-system-packages   # 최초 1회
    python3 normalize_images.py dry              # 미리보기(실제 파일 변경 없음)
    python3 normalize_images.py apply             # 실제 적용 (파일 덮어씀)

적용 전 반드시 원본을 백업할 것:
    cp -r assets/img /path/to/backup/img_backup   (또는 별도 backup 폴더)

주의 — 자동 처리가 부적절한 이미지
----------------------------------
아래와 같은 경우 이 스크립트를 적용하면 오히려 왜곡되므로 제외하거나
수동으로 처리해야 한다:

1. 매입형(in-wall/in-ceiling) 스피커처럼 흰색 마운팅 프레임/벽 패널이
   불투명 픽셀로 사진에 포함된 경우 — 알파 bbox가 벽 패널까지 "제품"으로
   오인해 여백이 트리밍되지 않는다. (이 프로젝트의 spk-la-sb6r.webp,
   spk-la-sb10r.webp 가 이런 케이스라 정규화 대상에서 제외했다.)
2. 로고/수상 배지/워터마크가 박힌 이미지 — 정규화 전에 먼저 배지를
   지우는 별도 편집이 필요하다 (아래 remove_region() 참고).
3. 배경이 완전히 투명 처리되지 않은(누끼 미완성) 이미지 — 정규화 전에
   먼저 배경을 투명화해야 한다.

처리 후에는 반드시 assets/img/montage_check.py 로 전체 썸네일을 한 번에
점검해 이상 케이스를 걸러낼 것.
"""
from PIL import Image
import os, glob, sys, json

SRC_DIR = os.path.dirname(os.path.abspath(__file__))
MARGIN_PCT = 0.08  # 제품 bbox 기준 상하좌우 여백 비율 (프로젝트 표준값)

# 자동 정규화에서 제외할 파일 (매입형 등 흰 마운팅 프레임이 제품 사진에
# 포함되어 alpha bbox 가 왜곡되는 케이스). 새로 추가하는 이미지도 같은
# 문제가 있으면 여기 추가하고 수동으로 처리한다.
EXCLUDE = {
    "spk-la-sb6r.webp",
    "spk-la-sb10r.webp",
}


def normalize(path, margin_pct=MARGIN_PCT, dry_run=True):
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    alpha = im.split()[-1]
    bbox = alpha.getbbox()
    if not bbox:
        return None  # 완전 투명/불투명 이미지는 처리 불가
    l, t, r, b = bbox
    cw, ch = r - l, b - t
    margin_w = int(cw * margin_pct)
    margin_h = int(ch * margin_pct)
    new_w, new_h = cw + margin_w * 2, ch + margin_h * 2

    if dry_run:
        return {
            "file": os.path.relpath(path, SRC_DIR), "orig": f"{w}x{h}",
            "bbox": bbox, "content": f"{cw}x{ch}", "new_canvas": f"{new_w}x{new_h}",
        }

    cropped = im.crop(bbox)
    canvas = Image.new("RGBA", (new_w, new_h), (0, 0, 0, 0))
    canvas.paste(cropped, (margin_w, margin_h), cropped)
    return canvas


def remove_region(path, box, save=True):
    """
    이미지의 지정 영역(box=(x0,y0,x1,y1))을 완전 투명으로 지운다.
    배지/워터마크 제거용. box 좌표는 Read 도구로 이미지를 확대해 눈으로
    확인한 뒤 지정할 것 (제품 본체와 겹치지 않는 범위로 좁게 잡는다).
    """
    im = Image.open(path).convert("RGBA")
    px = im.load()
    x0, y0, x1, y1 = box
    for y in range(y0, y1):
        for x in range(x0, x1):
            r, g, b, a = px[x, y]
            if a > 0:
                px[x, y] = (r, g, b, 0)
    if save:
        im.save(path, "WEBP", quality=92)
    return im


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "dry"
    # ** 재귀 탐색 — assets/img/{도메인}/{mk}/{series}/*.webp 하위 폴더 구조를 전부 훑는다.
    files = sorted(glob.glob(os.path.join(SRC_DIR, "**", "*.webp"), recursive=True))
    files = [f for f in files if os.path.basename(f) not in EXCLUDE]

    if mode == "dry":
        for p in files:
            r = normalize(p, dry_run=True)
            if r:
                print(json.dumps(r, ensure_ascii=False))
        if EXCLUDE:
            print(f"# 제외됨(수동 처리 필요): {sorted(EXCLUDE)}")
    elif mode == "apply":
        n = 0
        for p in files:
            canvas = normalize(p, dry_run=False)
            if canvas:
                canvas.save(p, "WEBP", quality=92)
                n += 1
        print(f"processed {n} files (excluded {len(EXCLUDE)})")
    else:
        print("usage: python3 normalize_images.py [dry|apply]")
