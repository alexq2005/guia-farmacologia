// ============================================================
// Unit images — maps therapeutic unit IDs to real photos
// ============================================================

import { ImageSourcePropType } from 'react-native';

const UNIT_IMAGES: Record<string, ImageSourcePropType> = {
  'u01': require('../assets/images/units/brain.jpg'),        // Sistema Nervioso
  'u02': require('../assets/images/units/heart.jpg'),        // Cardiovascular
  'u03': require('../assets/images/units/virus.jpg'),        // Infecciones
  'u04': require('../assets/images/units/lungs.jpg'),        // Respiratorio
  'u05': require('../assets/images/units/stomach.jpg'),      // Digestivo
  'u06': require('../assets/images/units/lab.jpg'),          // Endocrino
  'u07': require('../assets/images/units/reproductive.jpg'), // Reproductor/Óseo
  'u08': require('../assets/images/units/bones.jpg'),        // Musculoesquelético
  'u09': require('../assets/images/units/skin.jpg'),         // Dermatología
  'u10': require('../assets/images/units/blood.jpg'),        // Hematología
  'u11': require('../assets/images/units/emergency.jpg'),    // Antídotos
  'u12': require('../assets/images/units/hospital.jpg'),     // Hospitalario
  'u13': require('../assets/images/units/mental.jpg'),       // Psicofármacos
  'u14': require('../assets/images/units/pharmacy.jpg'),     // Otros
};

export const HERO_IMAGE = require('../assets/images/units/hero_pharmacy.jpg');

export function getUnitImage(unitId: string): ImageSourcePropType | undefined {
  return UNIT_IMAGES[unitId];
}

export default UNIT_IMAGES;
