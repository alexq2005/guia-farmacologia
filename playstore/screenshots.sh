#!/bin/bash
# ============================================================
# Script para tomar capturas de pantalla del emulador
# Ejecutar con la app abierta en el emulador
# ============================================================

ADB="$LOCALAPPDATA/Android/Sdk/platform-tools/adb.exe"
OUT_DIR="$(dirname "$0")/screenshots"
mkdir -p "$OUT_DIR"

echo "Tomando capturas de pantalla..."
echo "Navega a cada pantalla en el emulador y presiona ENTER para capturar."
echo ""

screens=(
  "01_home"
  "02_drug_detail"
  "03_search"
  "04_categories"
  "05_quiz"
  "06_scales"
  "07_lab_values"
  "08_emergency_protocols"
)

descriptions=(
  "Pantalla principal (HomeScreen)"
  "Detalle de un farmaco (ej: Paracetamol)"
  "Pantalla de busqueda con resultados"
  "Categorias por sistema"
  "Test farmacologico"
  "Escalas clinicas (Glasgow)"
  "Valores de laboratorio"
  "Protocolos de emergencia"
)

for i in "${!screens[@]}"; do
  echo "[$((i+1))/${#screens[@]}] ${descriptions[$i]}"
  echo "  -> Navega a esa pantalla y presiona ENTER..."
  read -r
  "$ADB" exec-out screencap -p > "$OUT_DIR/${screens[$i]}.png"
  echo "  Guardado: $OUT_DIR/${screens[$i]}.png"
  echo ""
done

echo "Listo! ${#screens[@]} capturas guardadas en: $OUT_DIR/"
echo ""
echo "Tamano requerido por Play Store: 1080x1920 (portrait)"
echo "Si tu emulador es diferente, redimensiona con:"
echo "  magick mogrify -resize 1080x1920 $OUT_DIR/*.png"
