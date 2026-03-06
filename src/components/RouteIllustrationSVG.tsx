import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Line, Circle, Path, G, Defs, LinearGradient, Stop, Ellipse, Polygon } from 'react-native-svg';
import type { ThemeColors } from '../utils/colors';

const W = 300;
const H = 220;

// Shared skin layers component for injection routes
function SkinLayers({ layerColors }: { layerColors: { epidermis: string; dermis: string; subcutaneous: string; muscle: string } }) {
  return (
    <G>
      <Rect x={0} y={40} width={W} height={30} fill={layerColors.epidermis} />
      <Rect x={0} y={70} width={W} height={35} fill={layerColors.dermis} />
      <Rect x={0} y={105} width={W} height={40} fill={layerColors.subcutaneous} />
      <Rect x={0} y={145} width={W} height={55} fill={layerColors.muscle} />
    </G>
  );
}

function SkinLabels({ colors }: { colors: ThemeColors }) {
  return (
    <G>
      <SvgText x={8} y={60} fill="#FFF" size={10} bold>Epidermis</SvgText>
      <SvgText x={8} y={92} fill="#FFF" size={10} bold>Dermis</SvgText>
      <SvgText x={8} y={130} fill="#FFF" size={10} bold>Tejido SC</SvgText>
      <SvgText x={8} y={178} fill="#FFF" size={10} bold>Músculo</SvgText>
    </G>
  );
}

// Helper for SVG text (react-native-svg Text)
import { Text as SvgTextRN } from 'react-native-svg';
function SvgText({ x, y, fill, size, bold, children, anchor }: { x: number; y: number; fill: string; size: number; bold?: boolean; children: string; anchor?: string }) {
  return (
    <SvgTextRN x={x} y={y} fill={fill} fontSize={size} fontWeight={bold ? '700' : '400'} textAnchor={anchor || 'start'}>
      {children}
    </SvgTextRN>
  );
}

// ─────────────── INJECTION ROUTES ───────────────

function IVIllustration() {
  const layers = { epidermis: '#E8B4A0', dermis: '#D4956B', subcutaneous: '#F5D98E', muscle: '#C45C5C' };
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <Defs>
        <LinearGradient id="needle" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B0B0B0" />
          <Stop offset="1" stopColor="#808080" />
        </LinearGradient>
      </Defs>
      <SkinLayers layerColors={layers} />
      {/* Vein in muscle */}
      <Ellipse cx={180} cy={168} rx={35} ry={12} fill="#3B82F6" opacity={0.7} />
      <SvgText x={165} y={172} fill="#FFF" size={9} bold>VENA</SvgText>
      {/* Needle 90° */}
      <Line x1={180} y1={10} x2={180} y2={168} stroke="url(#needle)" strokeWidth={3} />
      <Polygon points="177,168 183,168 180,175" fill="#808080" />
      {/* Syringe body */}
      <Rect x={170} y={0} width={20} height={18} rx={3} fill="#A0C8E8" stroke="#6BA3D0" strokeWidth={1} />
      <Rect x={178} y={-8} width={4} height={10} fill="#6BA3D0" />
      {/* Angle label */}
      <SvgText x={195} y={28} fill="#3B82F6" size={11} bold>90°</SvgText>
      {/* Layer labels */}
      <SvgText x={8} y={60} fill="#FFF" size={10} bold>Epidermis</SvgText>
      <SvgText x={8} y={92} fill="#FFF" size={10} bold>Dermis</SvgText>
      <SvgText x={8} y={130} fill="#FFF" size={10} bold>Tejido SC</SvgText>
      <SvgText x={8} y={178} fill="#FFF" size={10} bold>Músculo</SvgText>
      {/* Info */}
      <SvgText x={W / 2} y={210} fill="#3B82F6" size={11} bold anchor="middle">Biodisponibilidad: 100% | Efecto inmediato</SvgText>
    </Svg>
  );
}

function IMIllustration() {
  const layers = { epidermis: '#E8B4A0', dermis: '#D4956B', subcutaneous: '#F5D98E', muscle: '#C45C5C' };
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <SkinLayers layerColors={layers} />
      {/* Target in muscle */}
      <Circle cx={180} cy={170} r={10} fill="#FF6B6B" opacity={0.5} />
      <Circle cx={180} cy={170} r={5} fill="#FF6B6B" opacity={0.8} />
      {/* Needle 90° */}
      <Line x1={180} y1={10} x2={180} y2={170} stroke="#808080" strokeWidth={3} />
      <Polygon points="177,170 183,170 180,177" fill="#808080" />
      {/* Syringe */}
      <Rect x={170} y={0} width={20} height={18} rx={3} fill="#A0C8E8" stroke="#6BA3D0" strokeWidth={1} />
      <Rect x={178} y={-8} width={4} height={10} fill="#6BA3D0" />
      <SvgText x={195} y={28} fill="#DC2626" size={11} bold>90°</SvgText>
      {/* Layer labels */}
      <SvgText x={8} y={60} fill="#FFF" size={10} bold>Epidermis</SvgText>
      <SvgText x={8} y={92} fill="#FFF" size={10} bold>Dermis</SvgText>
      <SvgText x={8} y={130} fill="#FFF" size={10} bold>Tejido SC</SvgText>
      <SvgText x={8} y={178} fill="#FFF" size={10} bold>Músculo</SvgText>
      {/* Injection sites */}
      <SvgText x={W / 2} y={210} fill="#DC2626" size={10} bold anchor="middle">Ventroglúteo (5mL) · Deltoides (2mL) · V. lateral (5mL)</SvgText>
    </Svg>
  );
}

function SCIllustration() {
  const layers = { epidermis: '#E8B4A0', dermis: '#D4956B', subcutaneous: '#F5D98E', muscle: '#C45C5C' };
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <SkinLayers layerColors={layers} />
      {/* Target in SC */}
      <Circle cx={195} cy={122} r={8} fill="#F59E0B" opacity={0.5} />
      <Circle cx={195} cy={122} r={4} fill="#F59E0B" opacity={0.8} />
      {/* Needle at 45° */}
      <Line x1={240} y1={10} x2={195} y2={122} stroke="#808080" strokeWidth={3} />
      <Polygon points="192,120 198,118 196,126" fill="#808080" />
      {/* Syringe */}
      <Rect x={233} y={0} width={18} height={16} rx={3} fill="#A0C8E8" stroke="#6BA3D0" strokeWidth={1} />
      {/* Skin pinch */}
      <Path d="M 155,40 Q 175,25 195,40" stroke="#C88060" strokeWidth={2} fill="none" strokeDasharray="4,3" />
      <SvgText x={150} y={22} fill="#D97706" size={9} bold>Pellizcar</SvgText>
      <SvgText x={255} y={20} fill="#D97706" size={11} bold>45°</SvgText>
      {/* Layer labels */}
      <SvgText x={8} y={60} fill="#FFF" size={10} bold>Epidermis</SvgText>
      <SvgText x={8} y={92} fill="#FFF" size={10} bold>Dermis</SvgText>
      <SvgText x={8} y={130} fill="#FFF" size={10} bold>Tejido SC</SvgText>
      <SvgText x={8} y={178} fill="#FFF" size={10} bold>Músculo</SvgText>
      <SvgText x={W / 2} y={210} fill="#D97706" size={10} bold anchor="middle">Volumen máx: 1-2 mL | NO aspirar</SvgText>
    </Svg>
  );
}

function IntradermalIllustration() {
  const layers = { epidermis: '#E8B4A0', dermis: '#D4956B', subcutaneous: '#F5D98E', muscle: '#C45C5C' };
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <SkinLayers layerColors={layers} />
      {/* Habón (wheal) */}
      <Ellipse cx={180} cy={45} rx={18} ry={8} fill="#F0C8B0" stroke="#E8A080" strokeWidth={1} />
      <SvgText x={165} y={48} fill="#92400E" size={8} bold>Habón</SvgText>
      {/* Needle at 5-15° almost parallel */}
      <Line x1={260} y1={30} x2={180} y2={48} stroke="#808080" strokeWidth={2.5} />
      <Polygon points="178,46 183,44 180,51" fill="#808080" />
      {/* Bevel indicator */}
      <SvgText x={220} y={25} fill="#059669" size={9} bold>Bisel ↑</SvgText>
      <SvgText x={265} y={45} fill="#059669" size={11} bold>5-15°</SvgText>
      {/* Syringe */}
      <Rect x={255} y={18} width={16} height={14} rx={3} fill="#A0C8E8" stroke="#6BA3D0" strokeWidth={1} />
      {/* Layer labels */}
      <SvgText x={8} y={60} fill="#FFF" size={10} bold>Epidermis</SvgText>
      <SvgText x={8} y={92} fill="#FFF" size={10} bold>Dermis</SvgText>
      <SvgText x={8} y={130} fill="#FFF" size={10} bold>Tejido SC</SvgText>
      <SvgText x={8} y={178} fill="#FFF" size={10} bold>Músculo</SvgText>
      <SvgText x={W / 2} y={210} fill="#059669" size={10} bold anchor="middle">Vol: 0.1 mL | Formar habón visible | PPD 48-72h</SvgText>
    </Svg>
  );
}

// ─────────────── NON-INJECTION ROUTES ───────────────

function OralIllustration() {
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Digestive tract path */}
      <Path d="M 150,15 L 150,45 Q 150,55 155,60 L 175,75 Q 185,82 180,95 L 165,130 Q 158,145 165,155 L 200,180"
        stroke="#E8734A" strokeWidth={18} fill="none" strokeLinecap="round" opacity={0.3} />
      <Path d="M 150,15 L 150,45 Q 150,55 155,60 L 175,75 Q 185,82 180,95 L 165,130 Q 158,145 165,155 L 200,180"
        stroke="#E8734A" strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* Pill */}
      <Rect x={140} y={5} width={20} height={12} rx={6} fill="#3B82F6" />
      <SvgText x={145} y={14} fill="#FFF" size={7} bold>💊</SvgText>
      {/* Labels along the path */}
      <SvgText x={165} y={25} fill="#E8734A" size={10} bold>Boca</SvgText>
      <SvgText x={175} y={55} fill="#E8734A" size={10} bold>Esófago</SvgText>
      <SvgText x={195} y={90} fill="#E8734A" size={10} bold>Estómago</SvgText>
      <SvgText x={175} y={140} fill="#E8734A" size={10} bold>Intestino delgado</SvgText>
      {/* Arrow to liver */}
      <Line x1={200} y1={180} x2={240} y2={170} stroke="#8B5CF6" strokeWidth={2} strokeDasharray="4,3" />
      <Rect x={240} y={155} width={50} height={30} rx={8} fill="#8B5CF640" stroke="#8B5CF6" strokeWidth={1.5} />
      <SvgText x={250} y={174} fill="#8B5CF6" size={9} bold>Hígado</SvgText>
      {/* 1st pass note */}
      <SvgText x={W / 2} y={210} fill="#8B5CF6" size={10} bold anchor="middle">Efecto de primer paso hepático | Inicio: 30-60 min</SvgText>
      {/* Absorption arrows */}
      <Path d="M 165,150 Q 130,160 120,170" stroke="#059669" strokeWidth={1.5} fill="none" markerEnd="url(#arrow)" />
      <SvgText x={70} y={175} fill="#059669" size={9} bold>Absorción</SvgText>
    </Svg>
  );
}

function SublingualIllustration() {
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Tongue shape */}
      <Path d="M 80,60 Q 80,30 150,25 Q 220,30 220,60 Q 220,90 200,100 Q 150,115 100,100 Q 80,90 80,60"
        fill="#E88080" stroke="#C06060" strokeWidth={2} />
      <SvgText x={130} y={60} fill="#FFF" size={14} bold>LENGUA</SvgText>
      {/* Sublingual space */}
      <Path d="M 100,105 Q 150,120 200,105 Q 200,135 150,140 Q 100,135 100,105"
        fill="#FFB0B0" stroke="#D08080" strokeWidth={1.5} />
      {/* Pill under tongue */}
      <Circle cx={150} cy={118} r={8} fill="#3B82F6" />
      <SvgText x={143} y={122} fill="#FFF" size={8} bold>SL</SvgText>
      {/* Blood vessels */}
      <Path d="M 120,130 Q 100,150 90,175" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5,3" />
      <Path d="M 180,130 Q 200,150 210,175" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5,3" />
      <SvgText x={55} y={165} fill="#3B82F6" size={9} bold>Plexo venoso</SvgText>
      {/* Arrow to circulation */}
      <SvgText x={W / 2} y={195} fill="#7C3AED" size={10} bold anchor="middle">→ Circulación sistémica directa ←</SvgText>
      <SvgText x={W / 2} y={212} fill="#059669" size={10} bold anchor="middle">Evita 1er paso hepático | Inicio: 1-3 min</SvgText>
    </Svg>
  );
}

function InhalatoryIllustration() {
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Trachea */}
      <Rect x={140} y={10} width={20} height={60} rx={5} fill="#F0A0A0" stroke="#D08080" strokeWidth={1.5} />
      <SvgText x={170} y={40} fill="#D97706" size={9} bold>Tráquea</SvgText>
      {/* Bronchi */}
      <Path d="M 150,70 Q 130,90 100,110" stroke="#D08080" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.4} />
      <Path d="M 150,70 Q 170,90 200,110" stroke="#D08080" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.4} />
      <Path d="M 150,70 Q 130,90 100,110" stroke="#D08080" strokeWidth={2} fill="none" strokeLinecap="round" />
      <Path d="M 150,70 Q 170,90 200,110" stroke="#D08080" strokeWidth={2} fill="none" strokeLinecap="round" />
      {/* Bronchioles */}
      <Path d="M 100,110 Q 80,130 70,150" stroke="#D08080" strokeWidth={1.5} fill="none" />
      <Path d="M 100,110 Q 110,130 120,150" stroke="#D08080" strokeWidth={1.5} fill="none" />
      <Path d="M 200,110 Q 180,130 180,150" stroke="#D08080" strokeWidth={1.5} fill="none" />
      <Path d="M 200,110 Q 220,130 230,150" stroke="#D08080" strokeWidth={1.5} fill="none" />
      {/* Alveoli clusters */}
      {[70, 120, 180, 230].map((x, i) => (
        <G key={i}>
          <Circle cx={x} cy={160} r={10} fill="#FFB0B040" stroke="#E88080" strokeWidth={1} />
          <Circle cx={x - 8} cy={172} r={8} fill="#FFB0B040" stroke="#E88080" strokeWidth={1} />
          <Circle cx={x + 8} cy={172} r={8} fill="#FFB0B040" stroke="#E88080" strokeWidth={1} />
        </G>
      ))}
      <SvgText x={30} y={195} fill="#E88080" size={9} bold>Alvéolos (intercambio gaseoso)</SvgText>
      {/* Inhaler at top */}
      <Rect x={125} y={0} width={15} height={15} rx={2} fill="#3B82F6" />
      <SvgText x={95} y={12} fill="#3B82F6" size={9} bold>IDM</SvgText>
      <SvgText x={W / 2} y={212} fill="#0891B2" size={10} bold anchor="middle">Inicio: 1-5 min | Efecto local en vías respiratorias</SvgText>
    </Svg>
  );
}

function TransdermalIllustration() {
  const layers = { epidermis: '#E8B4A0', dermis: '#D4956B', subcutaneous: '#F5D98E', muscle: '#C45C5C' };
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Patch on top */}
      <Rect x={80} y={10} width={140} height={25} rx={4} fill="#A0D0FF" stroke="#6BA3D0" strokeWidth={2} />
      <SvgText x={115} y={27} fill="#1E40AF" size={11} bold>PARCHE</SvgText>
      {/* Skin layers */}
      <Rect x={0} y={40} width={W} height={30} fill={layers.epidermis} />
      <Rect x={0} y={70} width={W} height={35} fill={layers.dermis} />
      <Rect x={0} y={105} width={W} height={40} fill={layers.subcutaneous} />
      <Rect x={0} y={145} width={W} height={55} fill={layers.muscle} />
      {/* Drug diffusion arrows */}
      {[110, 130, 150, 170, 190].map((x, i) => (
        <G key={i}>
          <Line x1={x} y1={35} x2={x} y2={100} stroke="#3B82F680" strokeWidth={1.5} strokeDasharray="3,3" />
          <Polygon points={`${x - 3},100 ${x + 3},100 ${x},106`} fill="#3B82F680" />
        </G>
      ))}
      {/* Capillaries */}
      <Path d="M 80,90 Q 100,85 120,90 Q 140,95 160,90 Q 180,85 200,90 Q 220,95 240,90"
        stroke="#DC2626" strokeWidth={2} fill="none" opacity={0.6} />
      <SvgText x={245} y={93} fill="#DC2626" size={8} bold>Capilares</SvgText>
      {/* Labels */}
      <SvgText x={8} y={60} fill="#FFF" size={10} bold>Epidermis</SvgText>
      <SvgText x={8} y={92} fill="#FFF" size={10} bold>Dermis</SvgText>
      <SvgText x={8} y={130} fill="#FFF" size={10} bold>Tejido SC</SvgText>
      <SvgText x={8} y={178} fill="#FFF" size={10} bold>Músculo</SvgText>
      <SvgText x={W / 2} y={212} fill="#6366F1" size={10} bold anchor="middle">Liberación lenta 24-72h | No cortar el parche</SvgText>
    </Svg>
  );
}

function TopicalIllustration() {
  const layers = { epidermis: '#E8B4A0', dermis: '#D4956B', subcutaneous: '#F5D98E', muscle: '#C45C5C' };
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Cream layer */}
      <Path d="M 60,38 Q 150,28 240,38" stroke="#A0D8A0" strokeWidth={8} fill="none" strokeLinecap="round" />
      <SvgText x={120} y={28} fill="#059669" size={10} bold>Crema/Gel</SvgText>
      {/* Skin layers */}
      <Rect x={0} y={42} width={W} height={30} fill={layers.epidermis} />
      <Rect x={0} y={72} width={W} height={40} fill={layers.dermis} />
      <Rect x={0} y={112} width={W} height={40} fill={layers.subcutaneous} />
      <Rect x={0} y={152} width={W} height={48} fill={layers.muscle} />
      {/* Local effect zone */}
      <Rect x={80} y={45} width={140} height={60} rx={8} fill="#059669" opacity={0.15} stroke="#059669" strokeWidth={1.5} strokeDasharray="5,3" />
      <SvgText x={110} y={80} fill="#059669" size={11} bold>Efecto LOCAL</SvgText>
      {/* Labels */}
      <SvgText x={8} y={62} fill="#FFF" size={10} bold>Epidermis</SvgText>
      <SvgText x={8} y={97} fill="#FFF" size={10} bold>Dermis</SvgText>
      <SvgText x={8} y={137} fill="#FFF" size={10} bold>Tejido SC</SvgText>
      <SvgText x={8} y={180} fill="#FFF" size={10} bold>Músculo</SvgText>
      <SvgText x={W / 2} y={212} fill="#059669" size={10} bold anchor="middle">Absorción sistémica mínima | Usar guantes</SvgText>
    </Svg>
  );
}

function RectalIllustration() {
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Rectal canal */}
      <Path d="M 150,20 Q 150,40 145,60 Q 140,80 145,100 Q 150,120 150,140 Q 150,160 155,175"
        stroke="#E88080" strokeWidth={30} fill="none" strokeLinecap="round" opacity={0.3} />
      <Path d="M 150,20 Q 150,40 145,60 Q 140,80 145,100 Q 150,120 150,140 Q 150,160 155,175"
        stroke="#E88080" strokeWidth={2} fill="none" strokeLinecap="round" />
      {/* Sphincters */}
      <Rect x={120} y={165} width={70} height={10} rx={5} fill="#C06060" opacity={0.6} />
      <SvgText x={200} y={174} fill="#C06060" size={8} bold>Esfínter</SvgText>
      {/* Suppository */}
      <Path d="M 145,100 Q 150,85 155,100 Q 155,110 150,115 Q 145,110 145,100" fill="#3B82F6" />
      <SvgText x={165} y={107} fill="#3B82F6" size={9} bold>Supositorio</SvgText>
      {/* Hemorrhoidal veins */}
      <Path d="M 130,90 Q 100,80 80,60" stroke="#3B82F6" strokeWidth={1.5} strokeDasharray="4,3" />
      <SvgText x={30} y={55} fill="#3B82F6" size={9} bold>V. hemorroidales</SvgText>
      <SvgText x={30} y={68} fill="#3B82F6" size={8}>→ Circulación</SvgText>
      {/* Depth indicator */}
      <Line x1={195} y1={115} x2={195} y2={170} stroke="#D97706" strokeWidth={1} strokeDasharray="3,2" />
      <SvgText x={200} y={145} fill="#D97706" size={9} bold>2-3 cm</SvgText>
      <SvgText x={W / 2} y={200} fill="#8B5CF6" size={10} bold anchor="middle">Evita parcialmente 1er paso hepático</SvgText>
      <SvgText x={W / 2} y={215} fill="#D97706" size={9} anchor="middle">Punta roma primero | DLI 15-20 min</SvgText>
    </Svg>
  );
}

function OphthalmicIllustration() {
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Eye outline */}
      <Path d="M 50,100 Q 150,30 250,100 Q 150,170 50,100" fill="#FFF" stroke="#64748B" strokeWidth={2} />
      {/* Iris */}
      <Circle cx={150} cy={100} r={35} fill="#8B6914" />
      {/* Pupil */}
      <Circle cx={150} cy={100} r={15} fill="#1A1A1A" />
      {/* Light reflection */}
      <Circle cx={142} cy={92} r={5} fill="#FFF" opacity={0.6} />
      {/* Upper eyelid */}
      <Path d="M 50,100 Q 150,30 250,100" fill="none" stroke="#D4956B" strokeWidth={6} />
      <SvgText x={160} y={50} fill="#64748B" size={9} bold>Párpado sup.</SvgText>
      {/* Lower eyelid - conjunctival sac */}
      <Path d="M 70,115 Q 150,155 230,115" fill="#FFB0B020" stroke="#E88080" strokeWidth={2} />
      <SvgText x={155} y={150} fill="#E88080" size={9} bold>Saco conjuntival ←</SvgText>
      {/* Drop */}
      <Path d="M 230,60 Q 233,70 230,75 Q 227,70 230,60" fill="#3B82F6" />
      <Line x1={230} y1={75} x2={215} y2={120} stroke="#3B82F6" strokeWidth={1} strokeDasharray="3,3" />
      <SvgText x={238} y={55} fill="#3B82F6" size={9} bold>Gota</SvgText>
      {/* Lacrimal pressure point */}
      <Circle cx={78} cy={100} r={6} fill="#DC262640" stroke="#DC2626" strokeWidth={1} />
      <SvgText x={20} y={85} fill="#DC2626" size={8} bold>Presionar</SvgText>
      <SvgText x={20} y={95} fill="#DC2626" size={8}>canto</SvgText>
      <SvgText x={20} y={105} fill="#DC2626" size={8}>interno</SvgText>
      <SvgText x={W / 2} y={195} fill="#0891B2" size={10} bold anchor="middle">No tocar ojo con gotero | Esperar 5 min entre colirios</SvgText>
      <SvgText x={W / 2} y={212} fill="#64748B" size={9} anchor="middle">Desechar 28 días después de abrir</SvgText>
    </Svg>
  );
}

function OticIllustration() {
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Outer ear (pinna) */}
      <Path d="M 60,40 Q 40,80 50,130 Q 60,160 80,170 Q 100,175 110,160"
        stroke="#D4956B" strokeWidth={8} fill="none" strokeLinecap="round" />
      {/* Ear canal */}
      <Path d="M 110,100 L 200,100" stroke="#E8B4A0" strokeWidth={20} fill="none" strokeLinecap="round" opacity={0.5} />
      <Path d="M 110,100 L 200,100" stroke="#D4956B" strokeWidth={2} fill="none" />
      <SvgText x={120} y={85} fill="#92400E" size={9} bold>Conducto auditivo ext.</SvgText>
      {/* Tympanic membrane */}
      <Ellipse cx={210} cy={100} rx={5} ry={20} fill="#E8B4A060" stroke="#C06060" strokeWidth={2} />
      <SvgText x={220} y={90} fill="#C06060" size={9} bold>Tímpano</SvgText>
      {/* Drops */}
      <Path d="M 130,55 Q 133,65 130,70 Q 127,65 130,55" fill="#3B82F6" />
      <Path d="M 145,50 Q 148,60 145,65 Q 142,60 145,50" fill="#3B82F6" />
      {/* Pull direction */}
      <Path d="M 60,80 Q 40,50 50,30" stroke="#059669" strokeWidth={2} fill="none" />
      <Polygon points="48,32 52,28 55,35" fill="#059669" />
      <SvgText x={10} y={25} fill="#059669" size={9} bold>Adulto: ↑ atrás</SvgText>
      {/* Child direction */}
      <SvgText x={10} y={190} fill="#D97706" size={9} bold>Niño {'<'}3a: ↓ atrás</SvgText>
      <SvgText x={W / 2} y={212} fill="#0891B2" size={10} bold anchor="middle">Templar gotas | Mantener posición 5 min</SvgText>
    </Svg>
  );
}

function NasalIllustration() {
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Nasal cavity outline */}
      <Path d="M 130,20 L 130,180" stroke="#D4956B" strokeWidth={2} />
      <Path d="M 170,20 L 170,180" stroke="#D4956B" strokeWidth={2} />
      {/* Septum */}
      <Line x1={150} y1={20} x2={150} y2={180} stroke="#C06060" strokeWidth={3} />
      <SvgText x={155} y={100} fill="#C06060" size={8} bold>Tabique</SvgText>
      {/* Cornetes */}
      <Path d="M 132,50 Q 140,55 135,65" stroke="#E88080" strokeWidth={6} fill="none" strokeLinecap="round" />
      <SvgText x={70} y={58} fill="#E88080" size={8} bold>C. Superior</SvgText>
      <Path d="M 132,80 Q 142,88 135,100" stroke="#E88080" strokeWidth={8} fill="none" strokeLinecap="round" />
      <SvgText x={70} y={93} fill="#E88080" size={8} bold>C. Medio</SvgText>
      <Path d="M 132,115 Q 145,125 135,140" stroke="#E88080" strokeWidth={10} fill="none" strokeLinecap="round" />
      <SvgText x={70} y={130} fill="#E88080" size={8} bold>C. Inferior</SvgText>
      {/* Spray */}
      <Path d="M 100,175 Q 115,160 125,135" stroke="#3B82F6" strokeWidth={2} fill="none" />
      <Polygon points="123,137 127,133 128,140" fill="#3B82F6" />
      <Rect x={85} y={175} width={30} height={18} rx={4} fill="#3B82F6" />
      <SvgText x={90} y={188} fill="#FFF" size={8} bold>Spray</SvgText>
      {/* Direction indicator */}
      <SvgText x={175} y={150} fill="#059669" size={9} bold>→ Pared lateral</SvgText>
      <SvgText x={175} y={165} fill="#DC2626" size={9} bold>✗ NO al tabique</SvgText>
      <SvgText x={W / 2} y={212} fill="#D97706" size={10} bold anchor="middle">Vasoconstrictores: máx 3-5 días</SvgText>
    </Svg>
  );
}

function VaginalIllustration() {
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Vaginal canal */}
      <Path d="M 120,170 Q 115,130 120,90 Q 125,60 150,45 Q 175,60 180,90 Q 185,130 180,170"
        fill="#FFB0B020" stroke="#E88080" strokeWidth={2} />
      {/* Fornix */}
      <Path d="M 120,50 Q 150,35 180,50" fill="none" stroke="#C06060" strokeWidth={2} strokeDasharray="4,3" />
      <SvgText x={120} y={32} fill="#C06060" size={9} bold>Fondos de saco</SvgText>
      {/* Ovule */}
      <Ellipse cx={150} cy={80} rx={12} ry={8} fill="#3B82F6" />
      <SvgText x={185} y={83} fill="#3B82F6" size={9} bold>Óvulo</SvgText>
      {/* Introitus */}
      <Line x1={115} y1={170} x2={185} y2={170} stroke="#D4956B" strokeWidth={3} />
      <SvgText x={120} y={188} fill="#92400E" size={9} bold>Introito vaginal</SvgText>
      {/* Arrow showing insertion */}
      <Line x1={150} y1={165} x2={150} y2={90} stroke="#3B82F680" strokeWidth={1.5} strokeDasharray="4,3" />
      <Polygon points="147,92 153,92 150,85" fill="#3B82F680" />
      <SvgText x={190} y={130} fill="#D97706" size={9} bold>Insertar</SvgText>
      <SvgText x={190} y={143} fill="#D97706" size={9}>profundo</SvgText>
      <SvgText x={W / 2} y={210} fill="#8B5CF6" size={10} bold anchor="middle">Preferir al acostarse | Retener 15-30 min</SvgText>
    </Svg>
  );
}

function EpiduralIllustration() {
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Vertebrae */}
      <Rect x={100} y={10} width={100} height={190} rx={4} fill="#F5E6D3" stroke="#C8A882" strokeWidth={2} />
      {/* Layers from outside in */}
      <Rect x={105} y={15} width={90} height={20} rx={2} fill="#E8B4A0" />
      <SvgText x={115} y={29} fill="#FFF" size={9} bold>Piel</SvgText>
      <Rect x={105} y={40} width={90} height={18} rx={2} fill="#C8A882" />
      <SvgText x={108} y={53} fill="#FFF" size={8} bold>Lig. supraespinoso</SvgText>
      <Rect x={105} y={63} width={90} height={18} rx={2} fill="#B89870" />
      <SvgText x={108} y={76} fill="#FFF" size={8} bold>Lig. interespinoso</SvgText>
      <Rect x={105} y={86} width={90} height={18} rx={2} fill="#D4A050" />
      <SvgText x={112} y={99} fill="#FFF" size={8} bold>Lig. amarillo</SvgText>
      {/* Epidural space - highlighted */}
      <Rect x={105} y={109} width={90} height={22} rx={2} fill="#3B82F640" stroke="#3B82F6" strokeWidth={2} />
      <SvgText x={108} y={124} fill="#1E40AF" size={9} bold>ESP. EPIDURAL</SvgText>
      {/* Dura mater */}
      <Rect x={105} y={136} width={90} height={14} rx={2} fill="#8B5CF6" opacity={0.5} />
      <SvgText x={115} y={147} fill="#FFF" size={8} bold>Duramadre</SvgText>
      {/* Spinal cord */}
      <Rect x={125} y={155} width={50} height={35} rx={8} fill="#F0F0F0" stroke="#A0A0A0" strokeWidth={1.5} />
      <SvgText x={127} y={173} fill="#64748B" size={8} bold>Médula</SvgText>
      <SvgText x={127} y={184} fill="#64748B" size={8} bold>espinal</SvgText>
      {/* Catheter/needle */}
      <Line x1={250} y1={30} x2={195} y2={120} stroke="#808080" strokeWidth={3} />
      <Polygon points="193,118 197,114 199,122" fill="#808080" />
      <SvgText x={220} y={25} fill="#3B82F6" size={9} bold>Catéter</SvgText>
      {/* Level */}
      <SvgText x={W / 2} y={212} fill="#3B82F6" size={10} bold anchor="middle">L2-L4 más frecuente | Vigilar FR y TA</SvgText>
    </Svg>
  );
}

// ─────────────── MAIN COMPONENT ───────────────

const illustrations: Record<string, React.FC> = {
  oral: OralIllustration,
  IV: IVIllustration,
  IM: IMIllustration,
  SC: SCIllustration,
  sublingual: SublingualIllustration,
  topica: TopicalIllustration,
  inhalatoria: InhalatoryIllustration,
  rectal: RectalIllustration,
  transdermica: TransdermalIllustration,
  intradermica: IntradermalIllustration,
  oftalmica: OphthalmicIllustration,
  otica: OticIllustration,
  nasal: NasalIllustration,
  vaginal: VaginalIllustration,
  epidural: EpiduralIllustration,
};

export function RouteIllustrationSVG({ routeId, accentColor, colors }: { routeId: string; accentColor: string; colors: ThemeColors }) {
  const Illustration = illustrations[routeId];

  if (!Illustration) {
    return null;
  }

  return (
    <View style={[localStyles.container, { borderColor: accentColor + '40', backgroundColor: colors.surfaceElevated }]}>
      <Text style={[localStyles.title, { color: colors.textSecondary }]}>📐 Diagrama anatómico</Text>
      <View style={localStyles.svgWrapper}>
        <Illustration />
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  svgWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
