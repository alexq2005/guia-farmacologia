#!/usr/bin/env python3
"""
Genera los íconos PNG de la app (cruz médica + libro) para todas las densidades Android.
Requiere: pip install Pillow
Uso: python scripts/generate_icons.py
"""

import os
from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("Error: Pillow no está instalado.")
    print("Instálalo con: pip install Pillow")
    exit(1)

# Tamaños por densidad Android
DENSITIES = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}

# Colores
BG_COLOR = (30, 64, 175)      # #1E40AF
WHITE = (255, 255, 255)
LIGHT_GRAY = (232, 232, 232)  # #E8E8E8
LINE_COLOR = (192, 200, 224)  # #C0C8E0

# Base del proyecto
SCRIPT_DIR = Path(__file__).parent
RES_DIR = SCRIPT_DIR.parent / "android" / "app" / "src" / "main" / "res"


def draw_icon(size: int) -> Image.Image:
    """Dibuja el ícono (cruz médica + libro abierto) al tamaño dado."""
    img = Image.new("RGBA", (size, size), BG_COLOR + (255,))
    draw = ImageDraw.Draw(img)
    s = size  # shorthand

    # --- Proporciones relativas al tamaño ---
    # Libro abierto (parte inferior)
    book_top = int(s * 0.40)
    book_bottom = int(s * 0.72)
    book_wing_top = int(s * 0.36)  # punto más alto de las "tapas"
    center_x = s // 2
    margin = int(s * 0.17)

    # Página izquierda
    left_page = [
        (center_x, book_bottom),       # centro abajo
        (center_x, book_top),          # centro arriba
        (margin, book_wing_top),       # izq arriba
        (margin, book_bottom - int(s * 0.04)),  # izq abajo
    ]
    draw.polygon(left_page, fill=WHITE)

    # Página derecha
    right_page = [
        (center_x, book_bottom),
        (center_x, book_top),
        (s - margin, book_wing_top),
        (s - margin, book_bottom - int(s * 0.04)),
    ]
    draw.polygon(right_page, fill=LIGHT_GRAY)

    # Lomo del libro
    line_w = max(1, int(s * 0.01))
    draw.line([(center_x, book_top), (center_x, book_bottom)], fill=BG_COLOR, width=line_w)

    # Líneas de texto en las páginas
    text_line_w = max(1, int(s * 0.008))
    for i, frac in enumerate([0.46, 0.52, 0.58]):
        y = int(s * frac)
        # Izquierda
        lx1 = margin + int(s * 0.04)
        lx2 = center_x - int(s * 0.04)
        ly_offset = int((center_x - lx1) * 0.08)  # ligera inclinación
        draw.line([(lx1, y + ly_offset), (lx2, y)], fill=LINE_COLOR, width=text_line_w)
        # Derecha
        rx1 = center_x + int(s * 0.04)
        rx2 = s - margin - int(s * 0.04)
        draw.line([(rx1, y), (rx2, y + ly_offset)], fill=LINE_COLOR, width=text_line_w)

    # --- Cruz médica (parte superior) ---
    cross_size = int(s * 0.22)
    cross_arm = int(cross_size * 0.35)
    cross_cx = center_x
    cross_cy = int(s * 0.24)

    # Brazos de la cruz
    # Vertical
    draw.rectangle(
        [
            cross_cx - cross_arm // 2,
            cross_cy - cross_size // 2,
            cross_cx + cross_arm // 2,
            cross_cy + cross_size // 2,
        ],
        fill=WHITE,
    )
    # Horizontal
    draw.rectangle(
        [
            cross_cx - cross_size // 2,
            cross_cy - cross_arm // 2,
            cross_cx + cross_size // 2,
            cross_cy + cross_arm // 2,
        ],
        fill=WHITE,
    )

    # Contorno de la cruz
    outline_w = max(1, int(s * 0.012))
    cross_points = [
        (cross_cx - cross_arm // 2, cross_cy - cross_size // 2),
        (cross_cx + cross_arm // 2, cross_cy - cross_size // 2),
        (cross_cx + cross_arm // 2, cross_cy - cross_arm // 2),
        (cross_cx + cross_size // 2, cross_cy - cross_arm // 2),
        (cross_cx + cross_size // 2, cross_cy + cross_arm // 2),
        (cross_cx + cross_arm // 2, cross_cy + cross_arm // 2),
        (cross_cx + cross_arm // 2, cross_cy + cross_size // 2),
        (cross_cx - cross_arm // 2, cross_cy + cross_size // 2),
        (cross_cx - cross_arm // 2, cross_cy + cross_arm // 2),
        (cross_cx - cross_size // 2, cross_cy + cross_arm // 2),
        (cross_cx - cross_size // 2, cross_cy - cross_arm // 2),
        (cross_cx - cross_arm // 2, cross_cy - cross_arm // 2),
    ]
    draw.polygon(cross_points, outline=BG_COLOR)

    return img


def generate_round(img: Image.Image) -> Image.Image:
    """Genera versión circular del ícono."""
    size = img.size[0]
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse([0, 0, size - 1, size - 1], fill=255)
    result = img.copy()
    result.putalpha(mask)
    return result


def main():
    print("Generando iconos de la Guia Farmacologica...")
    print(f"   Directorio de recursos: {RES_DIR}")
    print()

    # Generar a maxima resolucion y escalar hacia abajo
    master = draw_icon(512)

    for density, size in DENSITIES.items():
        out_dir = RES_DIR / density
        out_dir.mkdir(parents=True, exist_ok=True)

        # Icono estandar
        icon = master.resize((size, size), Image.LANCZOS)
        icon_path = out_dir / "ic_launcher.png"
        icon.save(str(icon_path), "PNG")

        # Icono redondo
        round_icon = generate_round(icon)
        round_path = out_dir / "ic_launcher_round.png"
        round_icon.save(str(round_path), "PNG")

        print(f"   OK {density}: {size}x{size}px -> {icon_path.name}, {round_path.name}")

    print()
    print("Iconos generados exitosamente!")


if __name__ == "__main__":
    main()
