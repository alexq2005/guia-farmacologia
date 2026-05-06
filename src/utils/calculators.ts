/**
 * Pure calculator functions for clinical formulas.
 *
 * Each formula has a stable ID (f01..f22) used by FormulaDetailScreen and the
 * underlying formulas.json. The runtime contract:
 *
 *   calculateResult(formulaId, values) → string with formatted result | null
 *
 * Returns null when:
 *   - any input value is empty/whitespace
 *   - any input value cannot be parsed as a number
 *   - the formula ID is unknown
 *   - the underlying math throws (division by zero, sqrt of negative, etc.)
 *
 * Inputs are passed as a record of strings (raw form input). Comma decimals
 * are tolerated ("3,5" → 3.5) — common in es-ES locale.
 *
 * ⚠️ SAFETY: these functions return clinical values that may inform dosing
 * decisions. Any change MUST be backed by a test case in
 * `__tests__/calculators.test.ts`. Do not "simplify" the formulas — they
 * encode published medical references (Mosteller, Cockcroft-Gault, Devine,
 * Young, Clark, etc.) and must match the canonical math exactly.
 */

export function calculateResult(
  formulaId: string,
  values: Record<string, string>,
): string | null {
  const nums: Record<string, number> = {};
  for (const [key, val] of Object.entries(values)) {
    if (!val || val.trim() === '') return null;
    const n = parseFloat(val.replace(',', '.'));
    if (isNaN(n)) return null;
    nums[key] = n;
  }

  try {
    switch (formulaId) {
      case 'f01':
        return `${(nums.peso * nums.dosisPorKg).toFixed(1)} mg`;
      case 'f02':
        return `${((nums.volumen * nums.factorGoteo) / nums.tiempo).toFixed(
          1,
        )} gotas/min`;
      case 'f03':
        return `${(nums.volumen / nums.tiempo).toFixed(1)} mL/h`;
      case 'f04':
        return `${(
          (nums.dosisDeseada * nums.peso * 60) /
          nums.concentracion
        ).toFixed(1)} mL/h`;
      case 'f05':
        return `${(
          (nums.dosisPrescrita * nums.presentacion) /
          nums.concentracion
        ).toFixed(1)} mL`;
      case 'f06':
        return `${Math.sqrt((nums.peso * nums.talla) / 3600).toFixed(3)} m²`;
      case 'f07':
        return `${((nums.bsaNino / 1.73) * nums.dosisAdulto).toFixed(1)} mg`;
      case 'f08':
        return `${((nums.edad / (nums.edad + 12)) * nums.dosisAdulto).toFixed(
          1,
        )} mg`;
      case 'f09':
        return `${((nums.peso / 70) * nums.dosisAdulto).toFixed(1)} mg`;
      case 'f10': {
        const base = ((140 - nums.edad) * nums.peso) / (72 * nums.creatinina);
        const factor = nums.sexo === 0.85 ? 0.85 : 1;
        return `${(base * factor).toFixed(1)} mL/min`;
      }
      case 'f11':
        return `${(nums.unidades / nums.concentracion).toFixed(2)} mL`;
      case 'f13':
        return `${((nums.C1 * nums.V1) / nums.C2).toFixed(1)} mL total`;
      case 'f14':
        return `${((nums.CpDeseada * nums.Vd * nums.peso) / nums.F).toFixed(
          1,
        )} mg`;
      case 'f15':
        return `${(nums.peso / (nums.talla * nums.talla)).toFixed(1)} kg/m²`;
      case 'f16': {
        const isMale = nums.sexo !== 0;
        const base2 = isMale ? 50 : 45.5;
        return `${(base2 + 0.91 * (nums.talla - 152.4)).toFixed(1)} kg`;
      }
      case 'f17':
        return `${(nums.pci + 0.4 * (nums.pesoReal - nums.pci)).toFixed(1)} kg`;
      case 'f18':
        return `${(nums.calcioMedido + 0.8 * (4.0 - nums.albumina)).toFixed(
          1,
        )} mg/dL`;
      case 'f19': {
        const act = nums.peso * (nums.sexo === 0.5 ? 0.5 : 0.6);
        return `${(act * (nums.naDeseado - nums.naActual)).toFixed(0)} mEq`;
      }
      case 'f20':
        return `${(nums.sodio - (nums.cloro + nums.bicarbonato)).toFixed(
          1,
        )} mEq/L`;
      case 'f21':
        return `${(2 * nums.sodio + nums.glucosa / 18 + nums.bun / 2.8).toFixed(
          0,
        )} mOsm/L`;
      case 'f22':
        return `${((nums.mgFarmaco * 1000) / nums.volumen).toFixed(0)} mcg/mL`;
      default:
        return null;
    }
  } catch {
    return null;
  }
}
