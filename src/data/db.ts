import { open, DB } from '@op-engineering/op-sqlite';
import { Alert } from 'react-native';
import drugsData from './drugs.json';
import type { Drug } from '../types';

export const db: DB = open({
  name: 'guiafarmacologica.sqlite',
});

export function initDatabase() {
  db.executeSync(`
    CREATE TABLE IF NOT EXISTS drugs (
      id TEXT PRIMARY KEY,
      nombre TEXT,
      nombreGenerico TEXT,
      nombresComerciales TEXT,
      familia TEXT,
      clasificacion TEXT,
      mecanismoAccion TEXT,
      indicaciones TEXT,
      contraindicaciones TEXT,
      efectosAdversos TEXT,
      interacciones TEXT,
      viaAdministracion TEXT,
      dosis TEXT,
      presentaciones TEXT,
      embarazo TEXT,
      lactancia TEXT,
      cuidadosEnfermeria TEXT,
      farmacocinetica TEXT,
      almacenamiento TEXT,
      unidadId TEXT,
      capituloId TEXT,
      preparacionParenteral TEXT,
      riesgosSobremedicacion TEXT,
      grupoTerapeutico TEXT,
      grupoFarmacologico TEXT,
      preparacionDilucion TEXT,
      solucionesCompatibles TEXT,
      observaciones TEXT,
      reconstitucion TEXT,
      isPremium INTEGER
    );
  `);

  // Backward compatibility for legacy builds that still query per-unit tables (drugs_uN).
  for (let i = 0; i <= 13; i += 1) {
    const legacyUnitId = `u${i}`;
    const paddedUnitId = `u${String(i).padStart(2, '0')}`;
    const indexedUnitId = `u${String(i + 1).padStart(2, '0')}`;
    db.executeSync(`
      CREATE VIEW IF NOT EXISTS drugs_u${i} AS
      SELECT * FROM drugs
      WHERE unidadId IN ('${legacyUnitId}', '${paddedUnitId}', '${indexedUnitId}');
    `);
  }

  const result = db.executeSync('SELECT COUNT(*) as count FROM drugs');
  const count = result.rows?.[0].count as number;

  if (count === 0) {
    console.log('[SQLite] Populating Guia Farmacologica dataset...');
    db.executeSync('BEGIN TRANSACTION');
    try {
      for (const d of drugsData as any[]) {
        db.executeSync(`
          INSERT OR IGNORE INTO drugs (
            id, nombre, nombreGenerico, nombresComerciales, familia, clasificacion,
            mecanismoAccion, indicaciones, contraindicaciones, efectosAdversos,
            interacciones, viaAdministracion, dosis, presentaciones, embarazo,
            lactancia, cuidadosEnfermeria, farmacocinetica, almacenamiento,
            unidadId, capituloId, preparacionParenteral, riesgosSobremedicacion,
            grupoTerapeutico, grupoFarmacologico, preparacionDilucion,
            solucionesCompatibles, observaciones, reconstitucion, isPremium
          ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
          )
        `, [
          d.id, d.nombre, d.nombreGenerico || '',
          JSON.stringify(d.nombresComerciales || []), d.familia || '', d.clasificacion || '',
          d.mecanismoAccion || '', JSON.stringify(d.indicaciones || []),
          JSON.stringify(d.contraindicaciones || []), JSON.stringify(d.efectosAdversos || []),
          JSON.stringify(d.interacciones || []), JSON.stringify(d.viaAdministracion || []),
          JSON.stringify(d.dosis || {}), JSON.stringify(d.presentaciones || []),
          d.embarazo || '', d.lactancia || '', JSON.stringify(d.cuidadosEnfermeria || []),
          JSON.stringify(d.farmacocinetica || {}), d.almacenamiento || '',
          d.unidadId || '', d.capituloId || '', JSON.stringify(d.preparacionParenteral || null),
          JSON.stringify(d.riesgosSobremedicacion || null), d.grupoTerapeutico || '',
          d.grupoFarmacologico || '', d.preparacionDilucion || '',
          JSON.stringify(d.solucionesCompatibles || []), d.observaciones || '',
          d.reconstitucion || '', d.isPremium ? 1 : 0
        ]);
      }
      db.executeSync('COMMIT');
      console.log('[SQLite] Dataset populated successfully!');
    } catch (error) {
      db.executeSync('ROLLBACK');
      console.error('[SQLite] Failed to populate dataset', error);
      Alert.alert('Hydration Error', String(error));
    }
  }
}

export function rowToDrug(row: any): Drug {
  return {
    ...row,
    nombresComerciales: row.nombresComerciales ? JSON.parse(row.nombresComerciales) : [],
    indicaciones: row.indicaciones ? JSON.parse(row.indicaciones) : [],
    contraindicaciones: row.contraindicaciones ? JSON.parse(row.contraindicaciones) : [],
    efectosAdversos: row.efectosAdversos ? JSON.parse(row.efectosAdversos) : [],
    interacciones: row.interacciones ? JSON.parse(row.interacciones) : [],
    viaAdministracion: row.viaAdministracion ? JSON.parse(row.viaAdministracion) : [],
    dosis: row.dosis ? JSON.parse(row.dosis) : {},
    presentaciones: row.presentaciones ? JSON.parse(row.presentaciones) : [],
    cuidadosEnfermeria: row.cuidadosEnfermeria ? JSON.parse(row.cuidadosEnfermeria) : [],
    farmacocinetica: row.farmacocinetica ? JSON.parse(row.farmacocinetica) : {},
    preparacionParenteral: row.preparacionParenteral && row.preparacionParenteral !== 'null' ? JSON.parse(row.preparacionParenteral) : undefined,
    riesgosSobremedicacion: row.riesgosSobremedicacion && row.riesgosSobremedicacion !== 'null' ? JSON.parse(row.riesgosSobremedicacion) : undefined,
    solucionesCompatibles: row.solucionesCompatibles ? JSON.parse(row.solucionesCompatibles) : [],
    isPremium: row.isPremium === 1,
  };
}
