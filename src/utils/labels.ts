import type { PathologyCategory, LabCategory, ProtocolCategory } from '../types';

export const PATHOLOGY_CATEGORY_LABELS: Record<PathologyCategory, string> = {
  cardiovascular: 'Cardiovascular',
  respiratorio: 'Respiratorio',
  neurologico: 'Neurológico',
  gastrointestinal: 'Gastrointestinal',
  endocrino: 'Endocrino',
  infeccioso: 'Infeccioso',
  renal: 'Renal',
  hematologico: 'Hematológico',
  psiquiatrico: 'Psiquiátrico',
  obstetrico: 'Obstétrico',
  musculoesqueletico: 'Musculoesquelético',
  emergencia: 'Emergencias',
};

export const LAB_CATEGORY_LABELS: Record<LabCategory, string> = {
  hematologia: 'Hematología',
  bioquimica: 'Bioquímica',
  coagulacion: 'Coagulación',
  hepatico: 'Hepático',
  renal: 'Renal',
  cardiaco: 'Cardíaco',
  endocrino: 'Endocrino',
  orina: 'Orina',
  gasometria: 'Gasometría',
};

export const PROTOCOL_CATEGORY_LABELS: Record<ProtocolCategory, string> = {
  cardiaco: 'Cardíaco',
  respiratorio: 'Respiratorio',
  neurologico: 'Neurológico',
  metabolico: 'Metabólico',
  sepsis: 'Sepsis',
  trauma: 'Trauma',
  otro: 'Otros',
};

export const GLOSSARY_CATEGORY_LABELS: Record<string, string> = {
  farmacologia: 'Farmacología',
  anatomia: 'Anatomía',
  enfermeria: 'Enfermería',
  abreviatura: 'Abreviatura',
  general: 'General',
};

export const SCALE_CATEGORY_LABELS: Record<string, string> = {
  neurologia: 'Neurología',
  neonatologia: 'Neonatología',
  riesgo_ulceras: 'Riesgo de Úlceras',
  sepsis: 'Sepsis',
  via_aerea: 'Vía Aérea',
  sedacion: 'Sedación',
  dolor: 'Dolor',
  trombosis: 'Trombosis',
  postanestesia: 'Post-anestesia',
  asa: 'Estado Físico',
};
