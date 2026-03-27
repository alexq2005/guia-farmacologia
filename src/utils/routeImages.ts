// ============================================================
// Route images — maps route IDs to real clinical photos
// ============================================================

import { ImageSourcePropType } from 'react-native';

const ROUTE_IMAGES: Record<string, ImageSourcePropType> = {
  oral: require('../assets/images/routes/oral.jpg'),
  IV: require('../assets/images/routes/intravenous.jpg'),
  IM: require('../assets/images/routes/intramuscular.jpg'),
  SC: require('../assets/images/routes/subcutaneous.jpg'),
  sublingual: require('../assets/images/routes/sublingual.jpg'),
  inhalatoria: require('../assets/images/routes/inhaler.jpg'),
  topica: require('../assets/images/routes/topical.jpg'),
  transdermica: require('../assets/images/routes/transdermal.jpg'),
  rectal: require('../assets/images/routes/rectal.jpg'),
  oftalmica: require('../assets/images/routes/ophthalmic.jpg'),
  otica: require('../assets/images/routes/otic.jpg'),
  nasal: require('../assets/images/routes/nasal.jpg'),
  vaginal: require('../assets/images/routes/vaginal.jpg'),
  intradermica: require('../assets/images/routes/intradermal.jpg'),
  epidural: require('../assets/images/routes/epidural.jpg'),
};

const FALLBACK = require('../assets/images/units/pills.jpg');

export function getRouteImage(routeId: string): ImageSourcePropType {
  return ROUTE_IMAGES[routeId] || FALLBACK;
}
