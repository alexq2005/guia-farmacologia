#!/usr/bin/env python3
"""
Improve CIMA Farmacocinética Parsing — Phase A (automated, cima_* drugs only)
==============================================================================

Re-parses the cached CIMA section 5.2 ("Propiedades farmacocinéticas") for
existing `cima_*` drugs in `src/data/drugs.json`, extracting the 8 subfields
(absorcion, distribucion, metabolismo, excrecion, vidaMedia, inicioAccion,
picoAccion, duracionAccion) from the raw prose text.

Background
----------
`scripts/fetch_cima.py:794-798` originally put the entire CIMA 5.2 text into
`farmacocinetica.absorcion` (truncated to 400 chars). This made ~95% of the
1003 cima_* drugs have FC with only 1 subfield. This script fixes that by
classifying sentences into subfields using keyword heuristics.

Settings (locked in session 2026-05-21)
----------------------------------------
- Fuente: AEMPS-CIMA (existing cima_cache/clinical/{nregistro}.json files)
- Modo: Supervisado (dry-run by default, --apply required for writes)
- Matching: Phase A is automatic via make_drug_id() reproduction. Phase B
  (hand-curated drugs) requires manual mapping table — not implemented here.
- Override policy: Only fill empty subfields. Never overwrite existing data.

Usage
-----
  python scripts/improve_cima_fc.py                # dry-run, prints summary
  python scripts/improve_cima_fc.py --diff         # write diff doc for review
  python scripts/improve_cima_fc.py --apply        # write changes to drugs.json
  python scripts/improve_cima_fc.py --limit 10     # only first 10 drugs (for testing)

Output
------
- scripts/_output/fc_proposed_diffs.md   : human-readable diff per drug
- scripts/_output/fc_summary.json        : machine-readable summary stats
- src/data/drugs.json                    : updated when --apply used
- src/data/db.ts                         : DATASET_VERSION bumped when --apply
- src/data/_meta.json                    : drugs.lastEdited updated when --apply
"""

from __future__ import annotations
import json
import re
import argparse
import sys
from pathlib import Path
from typing import Optional

SCRIPT_DIR = Path(__file__).parent
ROOT_DIR = SCRIPT_DIR.parent
DATA_DIR = ROOT_DIR / "src" / "data"
CACHE_DIR = SCRIPT_DIR / "cima_cache"
CLINICAL_DIR = CACHE_DIR / "clinical"
UNIQUE_DRUGS_FILE = CACHE_DIR / "unique_drugs.json"
DRUGS_FILE = DATA_DIR / "drugs.json"
META_FILE = DATA_DIR / "_meta.json"
DB_FILE = DATA_DIR / "db.ts"
OUTPUT_DIR = SCRIPT_DIR / "_output"


# ─── ID slug reproduction (copied from fetch_cima.py to avoid coupling) ──────

def make_drug_id(name: str, nregistro: str) -> str:
    """Reproduce fetch_cima.py make_drug_id() exactly."""
    name = (name or "").lower().strip()
    name = re.sub(r"\d+\s*(mg|g|ml|mcg|ui|%|mg/ml).*", "", name).strip()
    name = name.replace("á", "a").replace("é", "e").replace("í", "i")
    name = name.replace("ó", "o").replace("ú", "u").replace("ñ", "n")
    name = re.sub(r"[^a-z0-9 +/]", "", name)
    name = name.strip()
    name = re.sub(r"\s+", "_", name)
    name = re.sub(r"[/+]", "_", name)
    if not name:
        name = f"cima_{nregistro}"
    return f"cima_{name}"


# ─── Farmacocinética subfield parser ─────────────────────────────────────────

# Keyword sets per subfield. Order matters when sentences match multiple buckets:
# we assign to the FIRST matching bucket. Tuned for CIMA section 5.2 prose style.
SUBFIELD_KEYWORDS: list[tuple[str, list[str]]] = [
    ("vidaMedia", [
        r"\bsemivida\b", r"\bvida media\b", r"\bt[\s\-]?1/2\b",
        r"\bsemi-vida\b", r"\bsemivida de eliminación\b",
    ]),
    ("inicioAccion", [
        r"\binicio de acción\b", r"\binicio de efecto\b", r"\baparición del efecto\b",
        r"\bcomienzo de la acción\b",
    ]),
    ("picoAccion", [
        r"\bconcentración máxima\b", r"\bconcentración pico\b", r"\bcmax\b",
        r"\btmax\b", r"\bpico plasmático\b", r"\btiempo al pico\b",
    ]),
    ("duracionAccion", [
        r"\bduración de la acción\b", r"\bduración del efecto\b",
        r"\bduración terapéutica\b",
    ]),
    ("distribucion", [
        r"\bse distribuye\b", r"\bdistribución\b", r"\bvolumen de distribución\b",
        r"\bunión a proteínas\b", r"\bunión proteica\b", r"\bvd\b",
        r"\batraviesa\b", r"\bbarrera hematoencefálica\b", r"\bplacenta\b",
        r"\bleche materna\b",
    ]),
    ("metabolismo", [
        r"\bse metaboliza\b", r"\bmetabolismo\b", r"\bmetabolito\b",
        r"\bbiotransformación\b", r"\bcyp\d", r"\bcitocromo\b",
        r"\bglucuronidación\b", r"\bhepático\b",
    ]),
    ("excrecion", [
        r"\bse elimina\b", r"\beliminación\b", r"\bexcreción\b",
        r"\baclaramiento\b", r"\brenal\b", r"\bfecal\b", r"\borina\b",
        r"\bheces\b", r"\bbiliar\b",
    ]),
    ("absorcion", [
        r"\bse absorbe\b", r"\babsorción\b", r"\bbiodisponibilidad\b",
        r"\boral\b", r"\bsublingual\b", r"\babsorción sistémica\b",
        r"\bvía oftálmica\b",  # for topical drugs — context-dependent
    ]),
]


def _split_sentences(text: str) -> list[str]:
    """Split prose into sentences. Spanish-aware (handles ¿ ¡ . ?). Preserves order."""
    # Normalize whitespace, then split on sentence terminators.
    text = re.sub(r"\s+", " ", text).strip()
    if not text:
        return []
    # Split on . ? ! followed by space + uppercase or end-of-string.
    parts = re.split(r"(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡])", text)
    return [p.strip() for p in parts if p.strip()]


def _classify_sentence(sentence: str) -> Optional[str]:
    """Return the subfield name this sentence belongs to, or None if no match."""
    low = sentence.lower()
    for subfield, patterns in SUBFIELD_KEYWORDS:
        for pat in patterns:
            if re.search(pat, low):
                return subfield
    return None


def parse_farmacocinetica(raw: str) -> dict[str, str]:
    """Parse raw CIMA section 5.2 text into structured subfields.

    Two-pass strategy:
      1. Explicit header detection ("Absorción\\n[text]\\n\\nDistribución\\n..."):
         if at least 2 explicit headers found, use that structure verbatim.
      2. Fallback: classify each sentence by keyword presence (SUBFIELD_KEYWORDS).
         First-match wins to avoid double-counting.

    Returns dict with only the subfields that have detected content. Never
    fabricates content. Caps each subfield at 600 chars to keep mobile UI usable.
    """
    if not raw or not raw.strip():
        return {}

    # ── Strategy 1: explicit headers ────────────────────────────────────────
    header_patterns = {
        "absorcion": r"(?:^|\n)\s*Absorción\s*[:\.]?\s*\n",
        "distribucion": r"(?:^|\n)\s*Distribución\s*[:\.]?\s*\n",
        "metabolismo": r"(?:^|\n)\s*(?:Metabolismo|Biotransformación)\s*[:\.]?\s*\n",
        "excrecion": r"(?:^|\n)\s*(?:Eliminación|Excreción)\s*[:\.]?\s*\n",
    }
    header_hits = {}
    for subfield, pat in header_patterns.items():
        m = re.search(pat, raw, re.IGNORECASE)
        if m:
            header_hits[subfield] = m.start()

    if len(header_hits) >= 2:
        # Sort by position, slice text between consecutive headers.
        ordered = sorted(header_hits.items(), key=lambda kv: kv[1])
        out: dict[str, str] = {}
        for i, (subfield, start) in enumerate(ordered):
            end = ordered[i + 1][1] if i + 1 < len(ordered) else len(raw)
            chunk = raw[start:end]
            # Strip the header itself
            chunk = re.sub(header_patterns[subfield], "", chunk, count=1, flags=re.IGNORECASE)
            chunk = chunk.strip()
            if chunk:
                out[subfield] = chunk[:600]
        return out

    # ── Strategy 2: keyword classification of sentences ─────────────────────
    buckets: dict[str, list[str]] = {}
    for sent in _split_sentences(raw):
        sub = _classify_sentence(sent)
        if sub:
            buckets.setdefault(sub, []).append(sent)

    out = {}
    for sub, sents in buckets.items():
        joined = " ".join(sents).strip()
        if joined:
            out[sub] = joined[:600]
    return out


# ─── Mapping nregistro → cima_id (post-dedup) ─────────────────────────────────

def build_cima_id_mapping(unique_drugs: list[dict]) -> dict[str, str]:
    """Build cima_id → nregistro mapping by replicating make_drug_id logic."""
    mapping: dict[str, str] = {}
    for d in unique_drugs:
        nreg = d.get("nregistro", "")
        vtm = d.get("_vtm_name") or d.get("vtm", {}).get("nombre") or d.get("nombre", "").split(" ")[0]
        cima_id = make_drug_id(vtm, nreg)
        # On collision, keep first (matches fetch_cima.py behavior of skipping duplicates)
        mapping.setdefault(cima_id, nreg)
    return mapping


# ─── Diff + apply ─────────────────────────────────────────────────────────────

def diff_fc(current: dict, proposed: dict) -> dict:
    """Apply override policy 4a: only fill empty subfields. Return merged dict
    plus a list of newly-added subfields for reporting."""
    merged = dict(current) if current else {}
    added = []
    for subfield, value in proposed.items():
        cur = merged.get(subfield, "")
        if not cur or not cur.strip():
            merged[subfield] = value
            added.append(subfield)
    return {"merged": merged, "added": added}


def run(args: argparse.Namespace) -> int:
    OUTPUT_DIR.mkdir(exist_ok=True)

    print(f"[1/5] Loading drugs.json ...", file=sys.stderr)
    drugs = json.loads(DRUGS_FILE.read_text(encoding="utf-8"))
    print(f"      → {len(drugs)} drugs total", file=sys.stderr)

    print(f"[2/5] Loading CIMA unique_drugs.json ...", file=sys.stderr)
    unique = json.loads(UNIQUE_DRUGS_FILE.read_text(encoding="utf-8"))
    cima_id_to_nreg = build_cima_id_mapping(unique)
    print(f"      → {len(cima_id_to_nreg)} unique cima_id ↔ nregistro mappings", file=sys.stderr)

    print(f"[3/5] Processing cima_* drugs ...", file=sys.stderr)
    cima_drugs = [d for d in drugs if d["id"].startswith("cima_")]
    if args.limit:
        cima_drugs = cima_drugs[: args.limit]
        print(f"      → limited to first {len(cima_drugs)} drugs (--limit)", file=sys.stderr)

    diffs: list[dict] = []
    no_mapping = 0
    no_clinical = 0
    no_fc_section = 0
    no_improvement = 0
    improved = 0
    for d in cima_drugs:
        nreg = cima_id_to_nreg.get(d["id"])
        if not nreg:
            no_mapping += 1
            continue
        clinical_file = CLINICAL_DIR / f"{nreg}.json"
        if not clinical_file.exists():
            no_clinical += 1
            continue
        clinical = json.loads(clinical_file.read_text(encoding="utf-8"))
        raw_fc = clinical.get("farmacocinetica", "")
        if not raw_fc or not raw_fc.strip():
            no_fc_section += 1
            continue
        proposed = parse_farmacocinetica(raw_fc)
        result = diff_fc(d.get("farmacocinetica") or {}, proposed)
        if not result["added"]:
            no_improvement += 1
            continue
        improved += 1
        diffs.append({
            "id": d["id"],
            "nombre": d["nombre"],
            "nregistro": nreg,
            "added_subfields": result["added"],
            "current": d.get("farmacocinetica") or {},
            "proposed": result["merged"],
        })

    print(f"      → improved:           {improved}", file=sys.stderr)
    print(f"      → no improvement:     {no_improvement}", file=sys.stderr)
    print(f"      → no FC in cache:     {no_fc_section}", file=sys.stderr)
    print(f"      → no clinical file:   {no_clinical}", file=sys.stderr)
    print(f"      → no id mapping:      {no_mapping}", file=sys.stderr)

    if args.diff or args.apply:
        write_diff_doc(diffs, args)

    if args.apply:
        if not diffs:
            print("[4/5] Nothing to apply.", file=sys.stderr)
            return 0
        print(f"[4/5] Applying {len(diffs)} drug updates to drugs.json ...", file=sys.stderr)
        diff_by_id = {d["id"]: d for d in diffs}
        for drug in drugs:
            if drug["id"] in diff_by_id:
                drug["farmacocinetica"] = diff_by_id[drug["id"]]["proposed"]
        DRUGS_FILE.write_text(json.dumps(drugs, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

        print(f"[5/5] Bumping DATASET_VERSION and updating _meta ...", file=sys.stderr)
        bump_dataset_version()
        update_meta_last_edited()
        print(f"      → done. Run `npx jest` to validate before commit.", file=sys.stderr)
    else:
        print(f"[4/5] Dry-run only — no files written. Use --apply to write.", file=sys.stderr)

    # Summary JSON for CI / scripting
    summary = {
        "total_cima_drugs": len(cima_drugs),
        "improved": improved,
        "no_improvement": no_improvement,
        "no_fc_section": no_fc_section,
        "no_clinical": no_clinical,
        "no_mapping": no_mapping,
        "applied": bool(args.apply),
    }
    (OUTPUT_DIR / "fc_summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    return 0


def write_diff_doc(diffs: list[dict], args: argparse.Namespace) -> None:
    """Write human-readable diff per drug to scripts/_output/fc_proposed_diffs.md."""
    out_path = OUTPUT_DIR / "fc_proposed_diffs.md"
    lines = []
    lines.append("# Farmacocinética — Diffs propuestos (Phase A: cima_* drugs)")
    lines.append("")
    lines.append("Generado por `scripts/improve_cima_fc.py`. Cada entrada muestra los")
    lines.append("subcampos que se agregarían al campo `farmacocinetica` de un drug")
    lines.append("`cima_*` específico, re-parseando el texto cacheado de CIMA sección 5.2.")
    lines.append("")
    lines.append(f"Override policy: **solo se llenan subcampos vacíos**. Datos existentes")
    lines.append(f"no se sobreescriben.")
    lines.append("")
    lines.append(f"## Resumen")
    lines.append("")
    lines.append(f"- Drugs con mejora propuesta: **{len(diffs)}**")
    lines.append("")
    if not diffs:
        out_path.write_text("\n".join(lines), encoding="utf-8")
        return
    # Stats sobre qué subcampos se llenan más
    counter: dict[str, int] = {}
    for d in diffs:
        for sub in d["added_subfields"]:
            counter[sub] = counter.get(sub, 0) + 1
    lines.append(f"### Distribución de subcampos agregados")
    lines.append("")
    lines.append("| Subcampo | Drugs que lo reciben |")
    lines.append("|---|---|")
    for sub, n in sorted(counter.items(), key=lambda kv: -kv[1]):
        lines.append(f"| `{sub}` | {n} |")
    lines.append("")
    lines.append("## Diffs (primeros 50)")
    lines.append("")
    for d in diffs[:50]:
        lines.append(f"### `{d['id']}` — {d['nombre']}  (nregistro {d['nregistro']})")
        lines.append("")
        lines.append(f"**Subcampos agregados**: {', '.join(d['added_subfields'])}")
        lines.append("")
        for sub in d["added_subfields"]:
            val = d["proposed"][sub]
            lines.append(f"- **{sub}** ({len(val)} chars): {val[:200]}{'…' if len(val) > 200 else ''}")
        lines.append("")
    if len(diffs) > 50:
        lines.append(f"_({len(diffs) - 50} drugs adicionales con cambios; ver `fc_summary.json` para totales.)_")
    out_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"      → diff doc: {out_path.relative_to(ROOT_DIR)}", file=sys.stderr)


def bump_dataset_version() -> None:
    """Read db.ts, find DATASET_VERSION, increment +1."""
    text = DB_FILE.read_text(encoding="utf-8")
    m = re.search(r"const DATASET_VERSION = (\d+);", text)
    if not m:
        print("WARNING: could not find DATASET_VERSION in db.ts", file=sys.stderr)
        return
    current = int(m.group(1))
    new = current + 1
    text = text.replace(f"const DATASET_VERSION = {current};", f"const DATASET_VERSION = {new};", 1)
    DB_FILE.write_text(text, encoding="utf-8")
    print(f"      → DATASET_VERSION {current} → {new}", file=sys.stderr)


def update_meta_last_edited() -> None:
    """Update _meta.json drugs.lastEdited to today."""
    import datetime
    meta = json.loads(META_FILE.read_text(encoding="utf-8"))
    today = datetime.date.today().isoformat()
    meta["datasets"]["drugs"]["lastEdited"] = today
    META_FILE.write_text(json.dumps(meta, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"      → _meta.json drugs.lastEdited → {today}", file=sys.stderr)


# ─── CLI ──────────────────────────────────────────────────────────────────────

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--apply", action="store_true",
                        help="Write changes to drugs.json + bump DATASET_VERSION + update _meta")
    parser.add_argument("--diff", action="store_true",
                        help="Write diff doc even in dry-run mode (default behavior with --apply)")
    parser.add_argument("--limit", type=int, default=None,
                        help="Limit to first N cima_* drugs (for testing)")
    args = parser.parse_args()
    return run(args)


if __name__ == "__main__":
    sys.exit(main())
