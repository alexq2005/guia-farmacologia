#!/usr/bin/env node
/**
 * bump-version.js — Bump app version across all files in sync.
 *
 * Single source of truth: android/app/build.gradle (versionName + versionCode).
 * Play Store rejects APKs with duplicate versionCode, so versionCode always
 * increments by +1 regardless of semver bump type.
 *
 * Usage:
 *   node scripts/bump-version.js --patch              # 1.0.0 → 1.0.1
 *   node scripts/bump-version.js --minor              # 1.0.0 → 1.1.0
 *   node scripts/bump-version.js --major              # 1.0.0 → 2.0.0
 *   node scripts/bump-version.js --patch --dry-run    # show changes, write nothing
 *
 * Files updated:
 *   - android/app/build.gradle  (versionName + versionCode)
 *   - package.json              (version, mirror only)
 *   - CHANGELOG.md              ([Unreleased] → [vX.Y.Z] - YYYY-MM-DD)
 *
 * Does NOT commit, tag, or push — that's the developer's call. After running:
 *   1. git diff                 (review changes)
 *   2. Edit CHANGELOG.md        (add real release notes)
 *   3. git commit -am "chore(release): vX.Y.Z"
 *   4. git tag vX.Y.Z
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUILD_GRADLE = path.join(ROOT, 'android', 'app', 'build.gradle');
const PACKAGE_JSON = path.join(ROOT, 'package.json');
const CHANGELOG = path.join(ROOT, 'CHANGELOG.md');

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

const VALID_BUMPS = ['patch', 'minor', 'major'];
const args = process.argv.slice(2).map(a => a.replace(/^--/, ''));
const dryRun = args.includes('dry-run');
const bumpType = args.find(a => VALID_BUMPS.includes(a));

if (!bumpType) {
  console.error('Error: must specify --patch, --minor, or --major');
  console.error(
    'Usage: node scripts/bump-version.js --[patch|minor|major] [--dry-run]',
  );
  process.exit(1);
}

const writeFile = dryRun
  ? (file, content) =>
      console.log(
        `[dry-run] would write ${path.relative(ROOT, file)} (${
          content.length
        } bytes)`,
      )
  : fs.writeFileSync;

// ---------------------------------------------------------------------------
// Read current version (single source of truth: build.gradle)
// ---------------------------------------------------------------------------

if (!fs.existsSync(BUILD_GRADLE)) {
  console.error(`Error: ${BUILD_GRADLE} not found`);
  process.exit(1);
}

const gradleOriginal = fs.readFileSync(BUILD_GRADLE, 'utf8');

// Match versionName but not versionNameSuffix — `[\d.]+` excludes hyphens.
const versionNameMatch = gradleOriginal.match(
  /^(\s*)versionName\s+"([\d.]+)"/m,
);
const versionCodeMatch = gradleOriginal.match(/^(\s*)versionCode\s+(\d+)/m);

if (!versionNameMatch || !versionCodeMatch) {
  console.error(
    'Error: could not parse versionName or versionCode in build.gradle',
  );
  process.exit(1);
}

const currentVersionName = versionNameMatch[2];
const currentVersionCode = Number(versionCodeMatch[2]);

const parts = currentVersionName.split('.').map(Number);
if (parts.length !== 3 || parts.some(n => Number.isNaN(n))) {
  console.error(
    `Error: versionName "${currentVersionName}" is not valid semver`,
  );
  process.exit(1);
}
const [major, minor, patch] = parts;

let nextVersionName;
if (bumpType === 'major') nextVersionName = `${major + 1}.0.0`;
else if (bumpType === 'minor') nextVersionName = `${major}.${minor + 1}.0`;
else nextVersionName = `${major}.${minor}.${patch + 1}`;

const nextVersionCode = currentVersionCode + 1;

// ---------------------------------------------------------------------------
// Update build.gradle (atomic: build new content, write once)
// ---------------------------------------------------------------------------

const gradleUpdated = gradleOriginal
  .replace(
    /^(\s*)versionName\s+"[\d.]+"/m,
    `$1versionName "${nextVersionName}"`,
  )
  .replace(/^(\s*)versionCode\s+\d+/m, `$1versionCode ${nextVersionCode}`);

if (gradleUpdated === gradleOriginal) {
  console.error('Error: build.gradle replacement did not change anything');
  process.exit(1);
}

writeFile(BUILD_GRADLE, gradleUpdated);

// ---------------------------------------------------------------------------
// Update package.json (mirror only)
// ---------------------------------------------------------------------------

const pkgOriginal = fs.readFileSync(PACKAGE_JSON, 'utf8');
const pkg = JSON.parse(pkgOriginal);
pkg.version = nextVersionName;
// Preserve trailing newline if it existed
const trailingNewline = pkgOriginal.endsWith('\n') ? '\n' : '';
writeFile(PACKAGE_JSON, JSON.stringify(pkg, null, 2) + trailingNewline);

// ---------------------------------------------------------------------------
// Update CHANGELOG.md (move [Unreleased] block to [vX.Y.Z] - DATE)
// ---------------------------------------------------------------------------

let changelogStatus = 'skipped (file not found)';

if (fs.existsSync(CHANGELOG)) {
  const today = new Date().toISOString().slice(0, 10);
  const changelogOriginal = fs.readFileSync(CHANGELOG, 'utf8');

  const unreleasedHeading = /^## \[Unreleased\][^\n]*\n/m;

  if (!unreleasedHeading.test(changelogOriginal)) {
    changelogStatus =
      'skipped (no [Unreleased] heading found — add one and re-run)';
  } else {
    const newUnreleasedBlock =
      '## [Unreleased]\n\n' +
      '### Added\n\n' +
      '### Changed\n\n' +
      '### Fixed\n\n' +
      '### Removed\n\n' +
      `## [${nextVersionName}] - ${today}\n`;

    const changelogUpdated = changelogOriginal.replace(
      unreleasedHeading,
      newUnreleasedBlock,
    );
    writeFile(CHANGELOG, changelogUpdated);
    changelogStatus = `updated ([Unreleased] → [${nextVersionName}] - ${today})`;
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

console.log(
  `\n${dryRun ? '[DRY RUN] ' : ''}✓ Version bumped (${bumpType}):\n` +
    `  versionName: ${currentVersionName} → ${nextVersionName}\n` +
    `  versionCode: ${currentVersionCode} → ${nextVersionCode}\n\n` +
    `Files updated:\n` +
    `  - android/app/build.gradle\n` +
    `  - package.json\n` +
    `  - CHANGELOG.md: ${changelogStatus}\n\n` +
    `Next steps:\n` +
    `  1. git diff                                  # review changes\n` +
    `  2. Edit CHANGELOG.md                         # add release notes under [${nextVersionName}]\n` +
    `  3. git commit -am "chore(release): v${nextVersionName}"\n` +
    `  4. git tag v${nextVersionName}\n` +
    `  5. cd android && ./gradlew assembleFreeRelease assemblePremiumRelease\n`,
);
