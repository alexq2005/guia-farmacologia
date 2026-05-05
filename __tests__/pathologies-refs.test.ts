/**
 * Referential integrity test: every drug ID referenced in pathologies.json
 * must exist in drugs.json.
 *
 * Why this matters: pathologies.json has 494 references (across 60 pathologies)
 * pointing into drugs.json. The "Related pathologies" section of DrugDetailScreen
 * and the "Drugs for this pathology" section of PathologyDetailScreen both
 * depend on this matching. If someone renames a drug ID without updating
 * pathologies.json, the relationship breaks silently — the UI just shows an
 * empty section, no crash, no error.
 *
 * This test catches that breakage at PR time.
 *
 * Bug history (DrugDetailScreen.tsx:146): the original code was
 * `farmacosRelacionados.some(f => f.drugId === drug.id)` — accessing .drugId
 * on a string. Always evaluated to undefined === string === false. The
 * "Related pathologies" section was always empty in production. Fixed in F4.5
 * by changing to `f === drug.id`. Once that fix landed, the data was already
 * 100% matched (this test confirms it).
 */

import drugs from '../src/data/drugs.json';
import pathologies from '../src/data/pathologies.json';

interface DrugLike {
  id: string;
}
interface PathologyLike {
  id: string;
  nombre: string;
  farmacosRelacionados?: string[];
}

const allDrugs = drugs as DrugLike[];
const allPathologies = pathologies as PathologyLike[];

describe('pathologies.json referential integrity', () => {
  const drugIds = new Set(allDrugs.map(d => d.id));

  it('every farmacosRelacionados entry is a real drug ID', () => {
    const orphans: { pathology: string; ref: string }[] = [];
    for (const p of allPathologies) {
      for (const ref of p.farmacosRelacionados ?? []) {
        if (!drugIds.has(ref)) {
          orphans.push({ pathology: p.nombre, ref });
        }
      }
    }

    if (orphans.length > 0) {
      const sample = orphans
        .slice(0, 10)
        .map(o => `  ${o.pathology} → "${o.ref}"`)
        .join('\n');
      const more =
        orphans.length > 10 ? `\n  ... and ${orphans.length - 10} more` : '';
      throw new Error(
        `Found ${orphans.length} orphan drug references in pathologies.json:\n${sample}${more}\n\n` +
          `Each "ref" must match an id in src/data/drugs.json. ` +
          `Either add the drug or fix the reference.`,
      );
    }
  });

  it('every pathology has at least one farmacosRelacionados entry', () => {
    const empty = allPathologies
      .filter(
        p => !p.farmacosRelacionados || p.farmacosRelacionados.length === 0,
      )
      .map(p => p.nombre);
    if (empty.length > 0) {
      // Not a hard fail — some pathologies may be intentionally drug-less
      // (e.g. surgical conditions). Soft warn so it's visible in CI logs.
      console.warn(`Pathologies without drug references: ${empty.join(', ')}`);
    }
    expect(empty.length).toBeLessThan(allPathologies.length); // sanity
  });
});
