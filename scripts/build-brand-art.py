#!/usr/bin/env python3
"""Build the Little Snowy Owl Studio web art from the supplied originals.

Run from the repository root:

    pip install numpy scipy Pillow
    python3 scripts/build-brand-art.py            # writes public/brand/*
    python3 scripts/build-brand-art.py --qa DIR   # also writes light/dark contact sheets to DIR

Sources (kept untouched, not served) in design/source/:

* snowy-hero-canyon.png  → brand/hero-canyon-{1672,900}.webp   (opaque hero)
* snowy-promo-cards.png  → brand/snowy-promo.webp               (Snowy waving beside cards)
* snowy-poses.png (2×2)  → brand/snowy-{wave,star,nap,reading}.webp
* snowy-stickers-a.png (4×3) and snowy-stickers-b.png (3×2) → brand/sticker-*.webp
* Snowy head mark        → brand/snowy-mark.webp, favicons, apple-touch-icon
* penguin-poses.webp (2×2, Snowy's plush penguin friend) → only the top-left
  waving pose is exported: brand/penguin-wave.{webp,png}

Cut-outs: each sheet is split per grid cell; a piece that reaches into a
neighbouring cell stops the build (no neighbouring artwork can leak in).
Specks are dropped, and semi-transparent edge pixels are recoloured from the
nearest solid pixel so coloured glows in the source can't leave halos. Items
are trimmed, padded evenly and only ever downscaled.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "design/source"
OUT = ROOT / "public/brand"
PUBLIC = ROOT / "public"

SPECK_PIXELS = 40
PAD_FRACTION = 0.05

POSES = [["snowy-wave", "snowy-star"],
         ["snowy-nap", "snowy-reading"]]
PENGUIN_POSES = [["penguin-wave", "penguin-star"],
                 ["penguin-peek", "penguin-reading"]]
PENGUIN_EXPORT = ["penguin-wave"]
STICKERS_A = [["snowflake-a", "star-a", "moon-a", "cloud-a"],
              ["tree-a", "snow-arch-a", "heart-a", "snowballs-a"],
              ["rainbow-a", "leaf-a", "confetti-a", "feather-a"]]
STICKERS_B = [["star-b", "snowflake-b", "moon-b"],
              ["tree-b", "heart-b", "feather-b"]]


def rgba(path: Path) -> np.ndarray:
    image = Image.open(path)
    if "A" not in image.getbands():
        sys.exit(f"{path.name}: no alpha channel — a dark preview background is not transparency")
    arr = np.array(image.convert("RGBA"))
    if (arr[..., 3] < 10).mean() < 0.05:
        sys.exit(f"{path.name}: almost no transparent area — expected a cut-out")
    return arr


def drop_specks(arr: np.ndarray) -> np.ndarray:
    present = arr[..., 3] > 8
    labels, count = ndimage.label(ndimage.binary_dilation(present, iterations=2))
    labels = np.where(present, labels, 0)
    sizes = np.bincount(labels.ravel(), minlength=count + 1)
    keep = sizes >= SPECK_PIXELS
    keep[0] = False
    out = arr.copy()
    out[..., 3] = np.where(keep[labels], arr[..., 3], 0)
    return out


def decontaminate(arr: np.ndarray) -> np.ndarray:
    """Recolour soft edge pixels from the nearest solid interior pixel.

    Keeps the soft alpha edge but removes colour that bled in from glows or the
    original background (which shows as a halo on light or dark pages).
    """
    alpha = arr[..., 3]
    solid = ndimage.binary_erosion(alpha >= 250, iterations=2)
    if not solid.any():
        return arr
    _, (iy, ix) = ndimage.distance_transform_edt(~solid, return_indices=True)
    out = arr.copy()
    edge = (alpha > 0) & ~solid
    out[edge, :3] = arr[iy[edge], ix[edge], :3]
    out[alpha == 0, :3] = 0
    return out


def trimmed_padded(arr: np.ndarray) -> Image.Image:
    image = Image.fromarray(arr, "RGBA")
    box = image.getchannel("A").getbbox()
    if box is None:
        sys.exit("empty item after cleanup")
    item = image.crop(box)
    pad = round(max(item.size) * PAD_FRACTION)
    canvas = Image.new("RGBA", (item.width + 2 * pad, item.height + 2 * pad), (0, 0, 0, 0))
    canvas.paste(item, (pad, pad))
    return canvas


def fit(image: Image.Image, max_side: int) -> Image.Image:
    scale = min(1.0, max_side / max(image.size))  # never upscale
    if scale == 1.0:
        return image
    return image.resize((round(image.width * scale), round(image.height * scale)), Image.LANCZOS)


def split(arr: np.ndarray, grid: list[list[str]], name: str) -> dict[str, np.ndarray]:
    h, w = arr.shape[:2]
    rows, cols = len(grid), len(grid[0])
    cw, ch = w / cols, h / rows
    present = arr[..., 3] > 8
    labels, count = ndimage.label(ndimage.binary_dilation(present, iterations=2))
    labels = np.where(present, labels, 0)
    owner = np.full(count + 1, -1)
    for index, box in enumerate(ndimage.find_objects(labels), start=1):
        if box is None or int((labels[box] == index).sum()) < SPECK_PIXELS:
            continue
        cy, cx = (box[0].start + box[0].stop) / 2, (box[1].start + box[1].stop) / 2
        r, c = min(int(cy // ch), rows - 1), min(int(cx // cw), cols - 1)
        sx, sy = cw * 0.12, ch * 0.12
        if (box[1].start < c * cw - sx or box[1].stop > (c + 1) * cw + sx
                or box[0].start < r * ch - sy or box[0].stop > (r + 1) * ch + sy):
            sys.exit(f"{name}: piece x={box[1].start}-{box[1].stop} y={box[0].start}-{box[0].stop} "
                     f"crosses into a neighbouring cell")
        owner[index] = r * cols + c
    items = {}
    for r in range(rows):
        for c in range(cols):
            mine = owner[labels] == r * cols + c
            if not mine.any():
                sys.exit(f"{name}: cell {r},{c} ({grid[r][c]}) is empty")
            cell = arr.copy()
            cell[..., 3] = np.where(mine, cell[..., 3], 0)
            items[grid[r][c]] = cell
    return items


def clean(arr: np.ndarray) -> Image.Image:
    return trimmed_padded(decontaminate(drop_specks(arr)))


def save_webp(image: Image.Image, name: str, quality: int = 88) -> None:
    image.save(OUT / f"{name}.webp", "WEBP", quality=quality, method=6, alpha_quality=100)


def head_mark(star_pose: Image.Image) -> Image.Image:
    """Snowy's head (with the three-feather tuft) for the logo and favicons.

    Taken from the star-hug pose, which has no raised wing: everything above
    the yellow star is kept, and the bottom edge fades out softly so the mark
    never looks cut off.
    """
    arr = np.array(star_pose)
    alpha = arr[..., 3].astype(np.float32)
    yellow = (arr[..., 0] > 220) & (arr[..., 1] > 190) & (arr[..., 2] < 120) & (alpha > 128)
    # The star is the first row band with a broad run of yellow (the small
    # peach beak is excluded by requiring 12% of the pose width).
    wide = np.nonzero(yellow.sum(axis=1) > arr.shape[1] * 0.12)[0]
    star_top = int(wide.min())
    head = arr[: star_top + 6].copy()
    fade = max(8, int(head.shape[0] * 0.12))
    ramp = np.linspace(1.0, 0.0, fade, dtype=np.float32)
    head[-fade:, :, 3] = (head[-fade:, :, 3].astype(np.float32) * ramp[:, None]).astype(np.uint8)
    item = trimmed_padded(head)
    side = max(item.size)  # square canvas, head centred
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(item, ((side - item.width) // 2, (side - item.height) // 2))
    return canvas


def contact_sheet(images: dict[str, Image.Image], background: tuple[int, int, int], path: Path) -> None:
    cell = 260
    cols = 6
    rows = (len(images) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell, rows * (cell + 20)), background)
    draw = ImageDraw.Draw(sheet)
    text = (0, 0, 0) if sum(background) > 380 else (255, 255, 255)
    for i, (name, image) in enumerate(images.items()):
        thumb = image.copy()
        thumb.thumbnail((cell - 20, cell - 20), Image.LANCZOS)
        x = (i % cols) * cell + (cell - thumb.width) // 2
        y = (i // cols) * (cell + 20) + (cell - thumb.height) // 2
        sheet.paste(thumb, (x, y), thumb)
        draw.text(((i % cols) * cell + 6, (i // cols) * (cell + 20) + cell + 2), name, fill=text)
    sheet.save(path)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--qa", type=Path, help="write light/dark contact sheets to this folder")
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    built: dict[str, Image.Image] = {}

    # Hero (opaque): two widths for srcset, never upscaled.
    hero = Image.open(SRC / "snowy-hero-canyon.png").convert("RGB")
    for width in (1672, 900):
        scaled = hero if width >= hero.width else hero.resize((width, round(hero.height * width / hero.width)), Image.LANCZOS)
        scaled.save(OUT / f"hero-canyon-{width}.webp", "WEBP", quality=84, method=6)

    promo = fit(clean(rgba(SRC / "snowy-promo-cards.png")), 1400)
    save_webp(promo, "snowy-promo")
    built["snowy-promo"] = promo

    poses = split(rgba(SRC / "snowy-poses.png"), POSES, "snowy-poses.png")
    for name, arr in poses.items():
        image = fit(clean(arr), 800)
        save_webp(image, name)
        built[name] = image

    mark = fit(head_mark(built["snowy-star"]), 512)
    save_webp(mark, "snowy-mark")
    built["snowy-mark"] = mark

    penguins = split(rgba(SRC / "penguin-poses.webp"), PENGUIN_POSES, "penguin-poses.webp")
    for name in PENGUIN_EXPORT:
        image = fit(clean(penguins[name]), 800)
        save_webp(image, name)
        image.save(OUT / f"{name}.png", optimize=True)  # PNG copy for other uses (not used by the site)
        built[name] = image

    for sheet, grid in (("snowy-stickers-a.png", STICKERS_A), ("snowy-stickers-b.png", STICKERS_B)):
        for name, arr in split(rgba(SRC / sheet), grid, sheet).items():
            image = fit(clean(arr), 320)
            save_webp(image, f"sticker-{name}")
            built[f"sticker-{name}"] = image

    # Favicons and touch icon from the head mark, on a soft snow-white disc.
    for size, filename in ((32, "favicon-32.png"), (180, "apple-touch-icon.png"), (512, "icon-512.png")):
        canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        disc = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        ImageDraw.Draw(disc).ellipse((0, 0, size - 1, size - 1), fill=(236, 230, 250, 255))
        if filename == "apple-touch-icon.png":
            disc = Image.new("RGBA", (size, size), (236, 230, 250, 255))  # iOS rounds it itself
        canvas.alpha_composite(disc)
        face = mark.copy()
        face.thumbnail((round(size * 0.86), round(size * 0.86)), Image.LANCZOS)
        canvas.alpha_composite(face, ((size - face.width) // 2, (size - face.height) // 2))
        canvas.save(PUBLIC / filename, optimize=True)
    Image.open(PUBLIC / "icon-512.png").save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    # Manifest with exact pixel sizes, so pages can reserve space (no layout shift).
    manifest = {name: {"src": f"/brand/{name}.webp", "width": image.width, "height": image.height}
                for name, image in sorted(built.items())}
    for width in (1672, 900):
        with Image.open(OUT / f"hero-canyon-{width}.webp") as h:
            manifest[f"hero-canyon-{width}"] = {"src": f"/brand/hero-canyon-{width}.webp",
                                                "width": h.width, "height": h.height}
    (ROOT / "src/content/brand-assets.json").write_text(json.dumps(manifest, indent=2) + "\n")

    if args.qa:
        args.qa.mkdir(parents=True, exist_ok=True)
        contact_sheet(built, (251, 244, 232), args.qa / "brand-on-light.png")
        contact_sheet(built, (28, 35, 80), args.qa / "brand-on-dark.png")
        friends = {k: built[k] for k in ("snowy-wave", "penguin-wave")}
        contact_sheet(friends, (159, 224, 196), args.qa / "friends-on-mint.png")
    print(f"built {len(built)} cut-outs, hero x2, favicons → {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
