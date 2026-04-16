// ============================================================
// Tool images — maps tool targets to real photos
// ============================================================

import { ImageSourcePropType } from 'react-native';

const TOOL_IMAGES: Record<string, ImageSourcePropType> = {
  calculators: require('../assets/images/units/calculator.jpg'),
  scales: require('../assets/images/units/brain.jpg'),
  labValues: require('../assets/images/units/lab.jpg'),
  emergencyProtocols: require('../assets/images/units/emergency.jpg'),
  comparison: require('../assets/images/units/comparison.jpg'),
  interactions: require('../assets/images/units/interaction.jpg'),
  parenteralGuide: require('../assets/images/units/iv_bag.jpg'),
  glossary: require('../assets/images/units/glossary.jpg'),
  nursing: require('../assets/images/units/nursing.jpg'),
  pathologies: require('../assets/images/units/pathology.jpg'),
  quiz: require('../assets/images/units/quiz.jpg'),
  dashboard: require('../assets/images/units/quiz.jpg'),
  favorites: require('../assets/images/units/heart.jpg'),
  notes: require('../assets/images/units/glossary.jpg'),
};

export function getToolImage(target: string): ImageSourcePropType | undefined {
  return TOOL_IMAGES[target];
}

export default TOOL_IMAGES;
