import { Share } from 'react-native';
import type { Drug } from '../types';

export async function shareDrug(drug: Drug) {
  const routes = drug.viaAdministracion.join(', ');
  const message = [
    `💊 ${drug.nombre} (${drug.nombreGenerico})`,
    `Familia: ${drug.familia}`,
    `Clasificación: ${drug.clasificacion}`,
    `Vías: ${routes}`,
    `Embarazo: Categoría ${drug.embarazo}`,
    '',
    `Dosis adulto: ${drug.dosis.adulto}`,
    '',
    `Indicaciones: ${drug.indicaciones.slice(0, 3).join('; ')}`,
    '',
    '— Guía Farmacológica de Enfermería',
  ].join('\n');

  await Share.share({ message, title: drug.nombre });
}
