#!/usr/bin/env python3
"""Verify data integrity between drugs.json and categories.json."""
import json, os

BASE = os.path.join(os.path.dirname(__file__), '..', 'src', 'data')

with open(os.path.join(BASE, 'drugs.json'), 'r', encoding='utf-8') as f:
    drugs = json.load(f)
with open(os.path.join(BASE, 'categories.json'), 'r', encoding='utf-8') as f:
    cats = json.load(f)

drug_ids = {d['id'] for d in drugs}
cat_drug_ids = set()
for u in cats['unidades']:
    for ch in u['capitulos']:
        for did in ch['drugIds']:
            cat_drug_ids.add(did)

# Check duplicates
ids_seen = set()
dupes = []
for d in drugs:
    if d['id'] in ids_seen:
        dupes.append(d['id'])
    ids_seen.add(d['id'])

# Check orphans (in drugs.json but not in any chapter)
orphans = drug_ids - cat_drug_ids
# Check missing (in categories but not in drugs.json)
missing = cat_drug_ids - drug_ids
# Count parenteral data
has_pp = sum(1 for d in drugs if 'preparacionParenteral' in d)
has_parenteral_route = sum(1 for d in drugs if any(v in ('IV','IM','SC','intratecal','epidural') for v in d.get('viaAdministracion',[])))
no_search = sum(1 for d in drugs if not d.get('searchText'))

print(f"Total drugs: {len(drugs)}")
print(f"Duplicate IDs: {len(dupes)} {dupes if dupes else ''}")
print(f"Orphaned drugs (not in categories): {len(orphans)}")
if orphans:
    for o in sorted(orphans):
        print(f"  - {o}")
print(f"Missing drugs (in categories, not in drugs.json): {len(missing)}")
if missing:
    for m in sorted(missing):
        print(f"  - {m}")
print(f"Drugs with parenteral routes: {has_parenteral_route}")
print(f"Drugs with preparacionParenteral: {has_pp}")
print(f"Drugs missing searchText: {no_search}")
