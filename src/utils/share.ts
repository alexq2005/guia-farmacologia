import { Share } from 'react-native';
import type { Drug, EmergencyProtocol, LabValue } from '../types';

const SEP = '───────────────────────────';

export async function shareDrug(drug: Drug) {
  const routes = drug.viaAdministracion.join(', ');
  const sections: string[] = [
    `💊 ${drug.nombre} (${drug.nombreGenerico})`,
    `Familia: ${drug.familia}`,
    `Clasificación: ${drug.clasificacion}`,
    `Vías: ${routes}`,
    `Embarazo: Categoría ${drug.embarazo}`,
    SEP,
  ];

  sections.push(`📋 DOSIS`);
  sections.push(`Adulto: ${drug.dosis.adulto}`);
  if (drug.dosis.pediatrico) sections.push(`Pediátrico: ${drug.dosis.pediatrico}`);
  if (drug.dosis.geriatrico) sections.push(`Geriátrico: ${drug.dosis.geriatrico}`);
  if (drug.dosis.ajusteRenal) sections.push(`Ajuste renal: ${drug.dosis.ajusteRenal}`);
  if (drug.dosis.ajusteHepatico) sections.push(`Ajuste hepático: ${drug.dosis.ajusteHepatico}`);

  if (drug.mecanismoAccion) {
    sections.push(SEP, `⚙️ MECANISMO DE ACCIÓN`, drug.mecanismoAccion);
  }

  if (drug.indicaciones.length > 0) {
    sections.push(SEP, `✅ INDICACIONES`);
    drug.indicaciones.forEach(i => sections.push(`• ${i}`));
  }

  if (drug.contraindicaciones.length > 0) {
    sections.push(SEP, `🚫 CONTRAINDICACIONES`);
    drug.contraindicaciones.forEach(c => sections.push(`• ${c}`));
  }

  if (drug.efectosAdversos.length > 0) {
    sections.push(SEP, `⚠️ EFECTOS ADVERSOS`);
    drug.efectosAdversos.forEach(e => sections.push(`• ${e}`));
  }

  if (drug.interacciones.length > 0) {
    sections.push(SEP, `🔄 INTERACCIONES`);
    drug.interacciones.forEach(i => sections.push(`• ${i}`));
  }

  if (drug.lactancia) {
    sections.push(SEP, `🤱 LACTANCIA`, drug.lactancia);
  }

  if (drug.cuidadosEnfermeria.length > 0) {
    sections.push(SEP, `👩‍⚕️ CUIDADOS DE ENFERMERÍA`);
    drug.cuidadosEnfermeria.forEach(c => sections.push(`• ${c}`));
  }

  sections.push(SEP, '— Guía Farmacológica de Enfermería');

  await Share.share({ message: sections.join('\n'), title: drug.nombre });
}

export async function shareProtocol(protocol: EmergencyProtocol) {
  const sections: string[] = [
    `🚨 ${protocol.nombre}${protocol.abreviatura ? ` (${protocol.abreviatura})` : ''}`,
    `Categoría: ${protocol.categoria} — Prioridad: ${protocol.prioridad.toUpperCase()}`,
    protocol.descripcion,
    SEP,
  ];

  if (protocol.banderasRojas.length > 0) {
    sections.push('🔴 BANDERAS ROJAS');
    protocol.banderasRojas.forEach(b => sections.push(`• ${b}`));
    sections.push(SEP);
  }

  sections.push('📋 PASOS');
  protocol.pasos.forEach(paso => {
    const time = paso.tiempo ? ` [${paso.tiempo}]` : '';
    const crit = paso.critico ? ' ⚠️' : '';
    sections.push(`${paso.orden}. ${paso.accion}${time}${crit}`);
    if (paso.detalles) sections.push(`   ${paso.detalles}`);
    if (paso.farmacos) {
      paso.farmacos.forEach(f => sections.push(`   💊 ${f.nombre}: ${f.dosis} (${f.via})`));
    }
  });

  if (protocol.resumenFarmacos.length > 0) {
    sections.push(SEP, '💊 RESUMEN DE FÁRMACOS');
    protocol.resumenFarmacos.forEach(f =>
      sections.push(`• ${f.nombre}: ${f.dosis} (${f.via}) — ${f.indicacion}`),
    );
  }

  if (protocol.notasEnfermeria.length > 0) {
    sections.push(SEP, '👩‍⚕️ NOTAS DE ENFERMERÍA');
    protocol.notasEnfermeria.forEach(n => sections.push(`• ${n}`));
  }

  sections.push(SEP, '— Guía Farmacológica de Enfermería');

  await Share.share({ message: sections.join('\n'), title: protocol.nombre });
}

export async function shareLabValue(value: LabValue) {
  const sections: string[] = [
    `🔬 ${value.nombre} (${value.abreviatura})`,
    `Categoría: ${value.categoria}`,
    SEP,
    '📊 RANGOS NORMALES',
  ];

  if (value.rangos.adulto) {
    sections.push(`Adulto: ${value.rangos.adulto.min}–${value.rangos.adulto.max} ${value.rangos.adulto.unidad}`);
  }
  if (value.rangos.adultoHombre) {
    sections.push(`♂ Hombre: ${value.rangos.adultoHombre.min}–${value.rangos.adultoHombre.max} ${value.rangos.adultoHombre.unidad}`);
  }
  if (value.rangos.adultoMujer) {
    sections.push(`♀ Mujer: ${value.rangos.adultoMujer.min}–${value.rangos.adultoMujer.max} ${value.rangos.adultoMujer.unidad}`);
  }
  if (value.rangos.pediatrico) {
    sections.push(`👶 Pediátrico: ${value.rangos.pediatrico.min}–${value.rangos.pediatrico.max} ${value.rangos.pediatrico.unidad}`);
  }

  sections.push(SEP, `↑ ELEVADO: ${value.significadoAlto}`);
  sections.push(`↓ DISMINUIDO: ${value.significadoBajo}`);

  if (value.farmacosAlteran.length > 0) {
    sections.push(SEP, '💊 FÁRMACOS QUE ALTERAN');
    sections.push(value.farmacosAlteran.join(', '));
  }

  if (value.implicacionesEnfermeria.length > 0) {
    sections.push(SEP, '👩‍⚕️ IMPLICACIONES DE ENFERMERÍA');
    value.implicacionesEnfermeria.forEach(i => sections.push(`• ${i}`));
  }

  sections.push(SEP, '— Guía Farmacológica de Enfermería');

  await Share.share({ message: sections.join('\n'), title: value.nombre });
}
