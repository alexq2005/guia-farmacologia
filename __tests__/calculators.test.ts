/**
 * Unit tests for clinical calculator formulas.
 *
 * Each formula is verified against hand-calculated reference values from
 * canonical medical sources. Test cases use the same parameter names that
 * formulas.json defines, so this also acts as documentation of the expected
 * input shape for each calculator.
 *
 * Why this matters: a bug in any of these formulas may produce an incorrect
 * dose that a healthcare professional then administers. These tests are the
 * last automated guard before that happens.
 */

import { calculateResult } from '../src/utils/calculators';

describe('calculateResult — input handling', () => {
  it('returns null when any value is empty', () => {
    expect(calculateResult('f01', { peso: '70', dosisPorKg: '' })).toBeNull();
    expect(calculateResult('f01', { peso: '', dosisPorKg: '10' })).toBeNull();
    expect(
      calculateResult('f01', { peso: '   ', dosisPorKg: '10' }),
    ).toBeNull();
  });

  it('returns null when any value is non-numeric', () => {
    expect(
      calculateResult('f01', { peso: 'abc', dosisPorKg: '10' }),
    ).toBeNull();
    expect(
      calculateResult('f01', { peso: '70', dosisPorKg: 'NaN' }),
    ).toBeNull();
  });

  it('parses comma-decimal input (es-ES locale)', () => {
    expect(calculateResult('f01', { peso: '3,5', dosisPorKg: '10' })).toBe(
      '35.0 mg',
    );
  });

  it('returns null for unknown formula ID', () => {
    expect(calculateResult('f99', { foo: '1' })).toBeNull();
    expect(calculateResult('', { foo: '1' })).toBeNull();
  });
});

describe('f01 — Dosis por peso corporal', () => {
  // Dosis = Peso × Dosis prescrita
  it('70 kg × 10 mg/kg = 700 mg', () => {
    expect(calculateResult('f01', { peso: '70', dosisPorKg: '10' })).toBe(
      '700.0 mg',
    );
  });
  it('25 kg × 7.5 mg/kg = 187.5 mg', () => {
    expect(calculateResult('f01', { peso: '25', dosisPorKg: '7.5' })).toBe(
      '187.5 mg',
    );
  });
});

describe('f02 — Velocidad de goteo (gotas/min)', () => {
  // gotas/min = (Volumen mL × Factor goteo) / Tiempo min
  it('500 mL × 20 gotas/mL ÷ 120 min = 83.3 gotas/min', () => {
    expect(
      calculateResult('f02', {
        volumen: '500',
        factorGoteo: '20',
        tiempo: '120',
      }),
    ).toBe('83.3 gotas/min');
  });
});

describe('f03 — Velocidad de infusión (mL/h)', () => {
  it('1000 mL ÷ 8 h = 125 mL/h', () => {
    expect(calculateResult('f03', { volumen: '1000', tiempo: '8' })).toBe(
      '125.0 mL/h',
    );
  });
});

describe('f04 — Dosis de fármaco en infusión continua', () => {
  // mL/h = (Dosis × Peso × 60) / Concentración
  // 5 mcg/kg/min × 70 kg × 60 / 200 mcg/mL = 105 mL/h
  it('dopamina 5 mcg/kg/min en 70 kg, conc 200 mcg/mL = 105 mL/h', () => {
    expect(
      calculateResult('f04', {
        dosisDeseada: '5',
        peso: '70',
        concentracion: '200',
      }),
    ).toBe('105.0 mL/h');
  });
});

describe('f05 — Regla de tres simple', () => {
  // mL = (Dosis prescrita × Presentación) / Concentración
  // 500 mg prescritos × 10 mL/ampolla / 1000 mg = 5 mL
  it('500 mg prescritos, ampolla 1000 mg/10 mL = 5 mL', () => {
    expect(
      calculateResult('f05', {
        dosisPrescrita: '500',
        presentacion: '10',
        concentracion: '1000',
      }),
    ).toBe('5.0 mL');
  });
});

describe('f06 — Superficie corporal (Mosteller)', () => {
  // BSA = √((Peso × Talla) / 3600)
  // √((70 × 170) / 3600) = √3.3056 = 1.81797...
  it('70 kg × 170 cm = 1.818 m²', () => {
    expect(calculateResult('f06', { peso: '70', talla: '170' })).toBe(
      '1.818 m²',
    );
  });
  // (65 × 165) / 3600 = 2.97917 → √ = 1.72604 → 1.726
  it('65 kg × 165 cm ≈ 1.726 m²', () => {
    expect(calculateResult('f06', { peso: '65', talla: '165' })).toBe(
      '1.726 m²',
    );
  });
});

describe('f07 — Dosis pediátrica por BSA', () => {
  // Dosis ped = (BSA niño / 1.73) × Dosis adulto
  it('BSA 0.8 m² / 1.73 × 500 mg = 231.2 mg', () => {
    expect(calculateResult('f07', { bsaNino: '0.8', dosisAdulto: '500' })).toBe(
      '231.2 mg',
    );
  });
});

describe('f08 — Regla de Young (pediátrica por edad)', () => {
  // Dosis ped = (Edad / (Edad + 12)) × Dosis adulto
  // 8 años: 8/20 = 0.4 → 200 mg
  it('8 años, 500 mg adulto = 200 mg', () => {
    expect(calculateResult('f08', { edad: '8', dosisAdulto: '500' })).toBe(
      '200.0 mg',
    );
  });
});

describe('f09 — Regla de Clark (pediátrica por peso)', () => {
  // Dosis ped = (Peso / 70) × Dosis adulto
  // 20 kg: 20/70 × 500 = 142.857...
  it('20 kg, 500 mg adulto ≈ 142.9 mg', () => {
    expect(calculateResult('f09', { peso: '20', dosisAdulto: '500' })).toBe(
      '142.9 mg',
    );
  });
});

describe('f10 — Aclaramiento de Creatinina (Cockcroft-Gault)', () => {
  // ClCr = ((140 - Edad) × Peso) / (72 × Cr)  [×0.85 si mujer]
  // Convención uniforme: sexo===0 → mujer, otro → hombre
  it('hombre 60 años, 70 kg, Cr 1 mg/dL = 77.8 mL/min', () => {
    expect(
      calculateResult('f10', {
        edad: '60',
        peso: '70',
        creatinina: '1',
        sexo: '1',
      }),
    ).toBe('77.8 mL/min');
  });
  it('mujer 60 años, 70 kg, Cr 1 mg/dL = 66.1 mL/min (×0.85)', () => {
    expect(
      calculateResult('f10', {
        edad: '60',
        peso: '70',
        creatinina: '1',
        sexo: '0',
      }),
    ).toBe('66.1 mL/min');
  });
});

describe('f11 — Conversión de unidades de insulina', () => {
  // mL = unidades / concentración
  // 20 U / 100 U/mL = 0.20 mL
  it('20 U insulina U-100 = 0.20 mL', () => {
    expect(
      calculateResult('f11', { unidades: '20', concentracion: '100' }),
    ).toBe('0.20 mL');
  });
});

describe('f13 — Dilución (C1V1 = C2V2)', () => {
  // V2 = (C1 × V1) / C2
  it('C1=10, V1=20, C2=5 → V2 = 40 mL', () => {
    expect(calculateResult('f13', { C1: '10', V1: '20', C2: '5' })).toBe(
      '40.0 mL total',
    );
  });
});

describe('f14 — Dosis de carga', () => {
  // Dosis carga = (Cp deseada × Vd × Peso) / F
  // 10 × 0.5 × 70 / 0.8 = 437.5
  it('Cp=10, Vd=0.5, peso=70, F=0.8 → 437.5 mg', () => {
    expect(
      calculateResult('f14', {
        CpDeseada: '10',
        Vd: '0.5',
        peso: '70',
        F: '0.8',
      }),
    ).toBe('437.5 mg');
  });
});

describe('f15 — IMC', () => {
  // IMC = Peso / Talla² (talla en metros)
  // 70 kg / 1.75² = 70 / 3.0625 = 22.857...
  it('70 kg, 1.75 m = 22.9 kg/m²', () => {
    expect(calculateResult('f15', { peso: '70', talla: '1.75' })).toBe(
      '22.9 kg/m²',
    );
  });
});

describe('f16 — Peso Corporal Ideal (Devine)', () => {
  // Hombres: 50 + 0.91 × (Talla cm - 152.4)
  // Mujeres: 45.5 + 0.91 × (Talla cm - 152.4)
  it('hombre 180 cm = 75.1 kg', () => {
    expect(calculateResult('f16', { sexo: '1', talla: '180' })).toBe('75.1 kg');
  });
  it('mujer 165 cm = 57.0 kg (sexo === 0)', () => {
    expect(calculateResult('f16', { sexo: '0', talla: '165' })).toBe('57.0 kg');
  });
});

describe('f17 — Peso Corporal Ajustado', () => {
  // PCA = PCI + 0.4 × (Peso real - PCI)
  // Obeso 100 kg con PCI 70 kg → 70 + 0.4×30 = 82 kg
  it('PCI 70, peso real 100 = 82 kg', () => {
    expect(calculateResult('f17', { pci: '70', pesoReal: '100' })).toBe(
      '82.0 kg',
    );
  });
});

describe('f18 — Calcio corregido por albúmina', () => {
  // Ca corregido = Ca medido + 0.8 × (4.0 - Albúmina)
  it('Ca 8.0, albúmina 2.0 = 9.6 mg/dL', () => {
    expect(calculateResult('f18', { calcioMedido: '8', albumina: '2' })).toBe(
      '9.6 mg/dL',
    );
  });
  it('Ca 9.0, albúmina 4.0 = 9.0 mg/dL (sin corrección)', () => {
    expect(calculateResult('f18', { calcioMedido: '9', albumina: '4' })).toBe(
      '9.0 mg/dL',
    );
  });
});

describe('f19 — Déficit de Sodio', () => {
  // Déficit Na = ACT × (Na deseado - Na actual)
  // ACT = Peso × 0.6 (hombres) o 0.5 (mujeres)
  // Convención uniforme: sexo===0 → mujer, otro → hombre
  it('hombre 70 kg, Na deseado 140, Na actual 125 = 630 mEq', () => {
    expect(
      calculateResult('f19', {
        peso: '70',
        sexo: '1',
        naDeseado: '140',
        naActual: '125',
      }),
    ).toBe('630 mEq');
  });
  it('mujer 70 kg, Na deseado 140, Na actual 125 = 525 mEq', () => {
    expect(
      calculateResult('f19', {
        peso: '70',
        sexo: '0',
        naDeseado: '140',
        naActual: '125',
      }),
    ).toBe('525 mEq');
  });
});

describe('f20 — Anion Gap', () => {
  // AG = Na - (Cl + HCO3)
  it('Na 140, Cl 100, HCO3 24 = 16 mEq/L (normal)', () => {
    expect(
      calculateResult('f20', { sodio: '140', cloro: '100', bicarbonato: '24' }),
    ).toBe('16.0 mEq/L');
  });
});

describe('f21 — Osmolaridad sérica calculada', () => {
  // Osm = 2×Na + Glucosa/18 + BUN/2.8
  // 2×140 + 90/18 + 14/2.8 = 280 + 5 + 5 = 290
  it('Na 140, glucosa 90, BUN 14 = 290 mOsm/L (normal)', () => {
    expect(
      calculateResult('f21', { sodio: '140', glucosa: '90', bun: '14' }),
    ).toBe('290 mOsm/L');
  });
});

describe('f22 — Concentración de infusión', () => {
  // mcg/mL = (mg × 1000) / Volumen
  // 200 mg en 250 mL = 800 mcg/mL
  it('200 mg en 250 mL = 800 mcg/mL', () => {
    expect(calculateResult('f22', { mgFarmaco: '200', volumen: '250' })).toBe(
      '800 mcg/mL',
    );
  });
});

describe('Convención uniforme de "sexo" en f10/f16/f19', () => {
  // Las tres fórmulas que toman `sexo` ahora usan la misma convención:
  //   sexo === 0 → mujer
  //   sexo !== 0 → hombre
  // Estos tests bloquean cualquier regresión que reintroduzca codificaciones
  // divergentes (el bug histórico que motivó la unificación).

  it('f10: sexo=0 → factor 0.85 (mujer), cualquier otro → factor 1 (hombre)', () => {
    const woman = calculateResult('f10', {
      edad: '60',
      peso: '70',
      creatinina: '1',
      sexo: '0',
    });
    const man = calculateResult('f10', {
      edad: '60',
      peso: '70',
      creatinina: '1',
      sexo: '1',
    });
    expect(woman).toBe('66.1 mL/min'); // 77.77 × 0.85
    expect(man).toBe('77.8 mL/min');
  });

  it('f16: sexo=0 → mujer (base 45.5), cualquier otro → hombre (base 50)', () => {
    expect(calculateResult('f16', { sexo: '0', talla: '170' })).toBe('61.5 kg');
    expect(calculateResult('f16', { sexo: '1', talla: '170' })).toBe('66.0 kg');
  });

  it('f19: sexo=0 → ACT 0.5×peso (mujer), cualquier otro → ACT 0.6×peso (hombre)', () => {
    expect(
      calculateResult('f19', {
        peso: '60',
        sexo: '0',
        naDeseado: '140',
        naActual: '130',
      }),
    ).toBe('300 mEq'); // 60 × 0.5 × 10
    expect(
      calculateResult('f19', {
        peso: '60',
        sexo: '1',
        naDeseado: '140',
        naActual: '130',
      }),
    ).toBe('360 mEq'); // 60 × 0.6 × 10
  });

  it('regresión: sexo=0.85 ya NO es mujer en f10 (ahora se trata como hombre)', () => {
    // Antes este input devolvía resultado de mujer (66.1). Ahora devuelve hombre.
    // Si alguien tenía la convención vieja en mente, esto detecta el bug.
    expect(
      calculateResult('f10', {
        edad: '60',
        peso: '70',
        creatinina: '1',
        sexo: '0.85',
      }),
    ).toBe('77.8 mL/min'); // hombre, NO 66.1
  });
});
