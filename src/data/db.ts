import { open, DB } from '@op-engineering/op-sqlite';
import { Alert } from 'react-native';
import drugsData from './drugs.json';
import type { Drug } from '../types';

export const db: DB = open({
  name: 'guiafarmacologica.sqlite',
});

// =============================================================================
// VERSIONING
// =============================================================================
// Two independent version counters:
//   SCHEMA_VERSION  → incrementar cuando cambian columnas/tablas (requiere ALTER)
//   DATASET_VERSION → incrementar cuando cambia el contenido de drugs.json
//
// El usuario que actualiza la app desde Play Store conserva su BD persistida en
// /data/data/.../databases/. Sin esto, drugs.json embebido nuevo no llega nunca
// al usuario porque la BD ya estaba hidratada con la versión vieja.
//
// Reglas:
//   1. Cualquier cambio de contenido en drugs.json → bumpear DATASET_VERSION.
//   2. Cualquier ALTER TABLE / CREATE TABLE nueva → bumpear SCHEMA_VERSION
//      Y agregar la migración correspondiente en SCHEMA_MIGRATIONS abajo.
//   3. NUNCA reordenar ni eliminar migraciones existentes (BDs en producción
//      las están aplicando linealmente).
// =============================================================================

const SCHEMA_VERSION = 1;
const DATASET_VERSION = 3;

const META_KEY_DATASET = 'dataset_version';

type Migration = (db: DB) => void;

// Migraciones ordenadas: SCHEMA_MIGRATIONS[N] migra de versión N a N+1.
// Para la primera versión (v0 → v1), la migración es no-op porque
// ensureBaseSchema() crea todo desde cero con CREATE TABLE IF NOT EXISTS.
const SCHEMA_MIGRATIONS: Migration[] = [
  // v0 → v1: initial schema (no-op, ensureBaseSchema cubre el caso fresh-install)
  () => {},
  // Ejemplo futuro:
  // v1 → v2: agregar columna 'codigoNacional'
  // (_db) => { _db.executeSync('ALTER TABLE drugs ADD COLUMN codigoNacional TEXT'); },
];

// =============================================================================
// SCHEMA
// =============================================================================

function ensureBaseSchema() {
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

  db.executeSync(`
    CREATE TABLE IF NOT EXISTS _meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
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
}

// =============================================================================
// SCHEMA MIGRATIONS (PRAGMA user_version)
// =============================================================================

function getSchemaVersion(): number {
  const result = db.executeSync('PRAGMA user_version');
  const v = result.rows?.[0]?.user_version;
  return typeof v === 'number' ? v : 0;
}

function setSchemaVersion(v: number) {
  db.executeSync(`PRAGMA user_version = ${v}`);
}

function runSchemaMigrations() {
  let current = getSchemaVersion();

  if (current > SCHEMA_VERSION) {
    // Downgrade detectado: la BD fue escrita por una versión más nueva de la app.
    // No hacemos nada — confiamos en que la versión nueva es backward-compatible
    // a nivel de lectura. Ocurre si el usuario instala una APK más vieja.
    console.warn(
      `[SQLite] DB schema v${current} is newer than app v${SCHEMA_VERSION}. ` +
        `Skipping migration (downgrade scenario).`,
    );
    return;
  }

  while (current < SCHEMA_VERSION) {
    const migration = SCHEMA_MIGRATIONS[current];
    if (!migration) {
      console.error(
        `[SQLite] Missing schema migration from v${current} to v${
          current + 1
        }. ` +
          `This is a bug — every step must be defined in SCHEMA_MIGRATIONS.`,
      );
      return;
    }
    console.log(`[SQLite] Migrating schema v${current} → v${current + 1}`);
    try {
      migration(db);
      current += 1;
      setSchemaVersion(current);
    } catch (error) {
      console.error(
        `[SQLite] Schema migration v${current} → v${current + 1} failed:`,
        error,
      );
      Alert.alert(
        'Error de migración',
        'No se pudo actualizar la base de datos. Si el problema persiste, ' +
          'desinstale y reinstale la aplicación.\n\n' +
          String(error),
      );
      return;
    }
  }
}

// =============================================================================
// DATASET MIGRATIONS (_meta table)
// =============================================================================

function getDatasetVersion(): number {
  try {
    const result = db.executeSync('SELECT value FROM _meta WHERE key = ?', [
      META_KEY_DATASET,
    ]);
    const v = result.rows?.[0]?.value;
    return v != null ? Number(v) : 0;
  } catch {
    return 0;
  }
}

function setDatasetVersion(v: number) {
  db.executeSync('INSERT OR REPLACE INTO _meta (key, value) VALUES (?, ?)', [
    META_KEY_DATASET,
    String(v),
  ]);
}

function populateDrugs() {
  db.executeSync('BEGIN TRANSACTION');
  try {
    // Truncar tabla antes de repoblar — la fuente de verdad es drugs.json.
    // Seguro: favoritos/notas del usuario están en AsyncStorage por drug ID,
    // no en esta tabla.
    db.executeSync('DELETE FROM drugs');

    for (const d of drugsData as any[]) {
      db.executeSync(
        `
        INSERT OR REPLACE INTO drugs (
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
      `,
        [
          d.id,
          d.nombre,
          d.nombreGenerico || '',
          JSON.stringify(d.nombresComerciales || []),
          d.familia || '',
          d.clasificacion || '',
          d.mecanismoAccion || '',
          JSON.stringify(d.indicaciones || []),
          JSON.stringify(d.contraindicaciones || []),
          JSON.stringify(d.efectosAdversos || []),
          JSON.stringify(d.interacciones || []),
          JSON.stringify(d.viaAdministracion || []),
          JSON.stringify(d.dosis || {}),
          JSON.stringify(d.presentaciones || []),
          d.embarazo || '',
          d.lactancia || '',
          JSON.stringify(d.cuidadosEnfermeria || []),
          JSON.stringify(d.farmacocinetica || {}),
          d.almacenamiento || '',
          d.unidadId || '',
          d.capituloId || '',
          JSON.stringify(d.preparacionParenteral || null),
          JSON.stringify(d.riesgosSobremedicacion || null),
          d.grupoTerapeutico || '',
          d.grupoFarmacologico || '',
          d.preparacionDilucion || '',
          JSON.stringify(d.solucionesCompatibles || []),
          d.observaciones || '',
          d.reconstitucion || '',
          d.isPremium ? 1 : 0,
        ],
      );
    }

    setDatasetVersion(DATASET_VERSION);
    db.executeSync('COMMIT');
    console.log(
      `[SQLite] Dataset populated successfully (v${DATASET_VERSION}, ${drugsData.length} rows).`,
    );
  } catch (error) {
    db.executeSync('ROLLBACK');
    console.error('[SQLite] Failed to populate dataset', error);
    Alert.alert(
      'Error de actualización de datos',
      'No se pudieron actualizar los datos farmacológicos. ' +
        'Reinicie la aplicación. Si el problema persiste, reinstálela.\n\n' +
        String(error),
    );
    throw error;
  }
}

// =============================================================================
// PUBLIC API
// =============================================================================

export function initDatabase() {
  ensureBaseSchema();
  runSchemaMigrations();

  const currentDataset = getDatasetVersion();
  if (currentDataset !== DATASET_VERSION) {
    console.log(
      `[SQLite] Dataset migration needed: v${currentDataset} → v${DATASET_VERSION}`,
    );
    populateDrugs();
  } else if (__DEV__) {
    const result = db.executeSync('SELECT COUNT(*) as count FROM drugs');
    const count = result.rows?.[0]?.count;
    console.log(
      `[SQLite] Dataset up-to-date (v${DATASET_VERSION}, ${count} rows).`,
    );
  }
}

export function rowToDrug(row: any): Drug {
  return {
    ...row,
    nombresComerciales: row.nombresComerciales
      ? JSON.parse(row.nombresComerciales)
      : [],
    indicaciones: row.indicaciones ? JSON.parse(row.indicaciones) : [],
    contraindicaciones: row.contraindicaciones
      ? JSON.parse(row.contraindicaciones)
      : [],
    efectosAdversos: row.efectosAdversos ? JSON.parse(row.efectosAdversos) : [],
    interacciones: row.interacciones ? JSON.parse(row.interacciones) : [],
    viaAdministracion: row.viaAdministracion
      ? JSON.parse(row.viaAdministracion)
      : [],
    dosis: row.dosis ? JSON.parse(row.dosis) : {},
    presentaciones: row.presentaciones ? JSON.parse(row.presentaciones) : [],
    cuidadosEnfermeria: row.cuidadosEnfermeria
      ? JSON.parse(row.cuidadosEnfermeria)
      : [],
    farmacocinetica: row.farmacocinetica ? JSON.parse(row.farmacocinetica) : {},
    preparacionParenteral:
      row.preparacionParenteral && row.preparacionParenteral !== 'null'
        ? JSON.parse(row.preparacionParenteral)
        : undefined,
    riesgosSobremedicacion:
      row.riesgosSobremedicacion && row.riesgosSobremedicacion !== 'null'
        ? JSON.parse(row.riesgosSobremedicacion)
        : undefined,
    solucionesCompatibles: row.solucionesCompatibles
      ? JSON.parse(row.solucionesCompatibles)
      : [],
    isPremium: row.isPremium === 1,
  };
}
