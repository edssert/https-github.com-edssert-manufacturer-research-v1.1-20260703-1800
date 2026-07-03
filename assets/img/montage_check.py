#!/usr/bin/env python3
"""
이미지 폴더 전체를 흰 배경 위 썸네일 격자로 모아 한 장의 PNG로 저장한다.
정규화(normalize_images.py) 전/후 비교, 신규 이미지 일괄 점검(배경 미제거,
워터마크, 여백 불균형 등)에 사용.

사용법
------
    python3 montage_check.py [출력경로.png]

이미지는 assets/img/{도메인}/{mk}/{series-slug}/ 하위 폴더 구조로 저장되어
있으므로 재귀적으로 전부 탐색한다. 라벨은 "mk/series/파일명" 형태로 표시해
어느 브랜드·시리즈 이미지인지 한눈에 구분되게 한다.

출력 파일을 기본 이미지 뷰어/Read 도구로 열어 육안으로 훑어보고,
- 흰 배경과 구분 안 되는 흰 프레임/사각형이 보이면 → 매입형 등 예외 케이스
- 로고/텍스트/배지가 보이면 → remove_region() 으로 제거
- 다른 이미지 대비 유난히 작게/크게 보이면 → normalize_images.py 대상 확인
을 점검한다.
"""
from PIL import Image, ImageDraw
import glob, os, sys

SRC_DIR = os.path.dirname(os.path.abspath(__file__))


def build_montage(out_path, thumb=150, cols=6):
    files = sorted(glob.glob(os.path.join(SRC_DIR, "**", "*.webp"), recursive=True))
    rows = (len(files) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * thumb, rows * (thumb + 26)), (40, 40, 40))
    draw = ImageDraw.Draw(sheet)
    for i, p in enumerate(files):
        im = Image.open(p).convert("RGBA")
        bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
        bg.paste(im, (0, 0), im)
        bg = bg.convert("RGB")
        bg.thumbnail((thumb - 6, thumb - 6))
        x, y = (i % cols) * thumb, (i // cols) * (thumb + 26)
        ox, oy = x + (thumb - bg.width) // 2, y + (thumb - bg.height) // 2
        sheet.paste(bg, (ox, oy))
        # mk/series/파일명 형태 라벨 (예: la/k-series/spk-la-k1)
        rel = os.path.relpath(p, SRC_DIR).replace(".webp", "").replace(os.sep, "/")
        parts = rel.split("/")
        label = "/".join(parts[-2:]) if len(parts) >= 2 else rel
        draw.text((x + 2, y + thumb + 2), label[:22], fill=(255, 255, 0))
    sheet.save(out_path)
    print(f"saved {out_path} ({len(files)} images)")


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "montage_check_output.png"
    build_montage(out)
