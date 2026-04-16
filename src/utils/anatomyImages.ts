// ============================================================
// Anatomy images — 3D medical illustrations from Servier Medical Art
// Licensed under CC BY 4.0 — https://smart.servier.com
// ============================================================

import { ImageSourcePropType } from 'react-native';

const ANATOMY_IMAGES: Record<string, ImageSourcePropType> = {
  // Injection routes — skin cross section (shows needle depth)
  IM: require('../assets/images/anatomy/skin_layers.png'),
  SC: require('../assets/images/anatomy/skin_layers.png'),
  intradermica: require('../assets/images/anatomy/skin_layers.png'),
  transdermica: require('../assets/images/anatomy/skin_layers.png'),
  // IV — no skin layers (IV targets veins, not skin depth)
  // Sublingual — bypasses digestive tract (absorbed via sublingual veins)

  // Oral — digestive tract (drug travels through entire GI system)
  oral: require('../assets/images/anatomy/digestive_tract.png'),
  // Rectal — no anatomy (illustration shows upper GI, not rectum)

  // Eye
  oftalmica: require('../assets/images/anatomy/eye_structure.png'),

  // Ear
  otica: require('../assets/images/anatomy/ear_anatomy.png'),

  // Nose
  nasal: require('../assets/images/anatomy/nasal_cavity.png'),

  // Lungs
  inhalatoria: require('../assets/images/anatomy/lungs_bronchi.png'),

  // Spine
  epidural: require('../assets/images/anatomy/spinal_cord.png'),

  // Skin topical
  topica: require('../assets/images/anatomy/skin_layers.png'),

  // Vaginal — no anatomy image available (no Servier illustration for reproductive system)
};

export function getAnatomyImage(routeId: string): ImageSourcePropType | undefined {
  return ANATOMY_IMAGES[routeId];
}
