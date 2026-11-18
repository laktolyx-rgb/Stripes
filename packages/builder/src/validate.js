// WCAG contrast validation. Exits non-zero on failure so CI can block bad palettes.
import { contrast, wcagLevel } from './color.js';
import { loadPalette, resolveAll } from './palette.js';

export function validate(palette = loadPalette()) {
  const c = palette.contrast;
  const rows = [];
  for (const v of resolveAll(palette)) {
    const min = c.min[v.id] ?? c.min.default;
    const check = (fg, bg, need, label, severity = 'error') => {
      const ratio = contrast(fg, bg);
      rows.push({ variant: v.id, label, fg, bg, ratio, need, level: wcagLevel(ratio), ok: ratio >= need, severity });
    };
    for (const surface of c.surfaces) {
      for (const role of c.codeRoles) check(v.roles[role].hex, v.roles[surface].hex, min, `${role} / ${surface}`);
    }
    for (const role of c.selectionRoles) check(v.roles[role].hex, v.roles.selection.hex, min, `${role} / selection`);
    for (const kind of ['normal', 'bright']) {
      for (const [name, hex] of Object.entries(v.ansi[kind])) {
        if (name === 'black' || (!v.dark && name === 'white')) continue; // same tone as the background on purpose
        check(hex, v.roles.background.hex, c.ansiMin, `ansi.${kind}.${name} / background`, 'warn');
      }
    }
  }
  return rows;
}

export function printReport(rows, { verbose = false } = {}) {
  const pad = (s, n) => String(s).padEnd(n);
  let lastVariant = '';
  for (const r of rows) {
    if (!verbose && r.ok) continue;
    if (r.variant !== lastVariant) { console.log(`\n  ${r.variant.toUpperCase()}`); lastVariant = r.variant; }
    const mark = r.ok ? '✓' : r.severity === 'warn' ? '!' : '✗';
    console.log(`  ${mark} ${pad(r.label, 34)} ${r.fg} on ${r.bg}  ${r.ratio.toFixed(2).padStart(5)}:1  ${pad(r.level, 8)} (need ${r.need})`);
  }
  const errors = rows.filter((r) => !r.ok && r.severity === 'error');
  const warns = rows.filter((r) => !r.ok && r.severity === 'warn');
  const byVariant = {};
  for (const r of rows) {
    if (r.severity !== 'error') continue;
    const b = (byVariant[r.variant] ??= { min: Infinity, n: 0 });
    b.min = Math.min(b.min, r.ratio); b.n++;
  }
  console.log('\n  Summary');
  for (const [id, b] of Object.entries(byVariant)) {
    console.log(`  ${pad(id, 6)} ${b.n} pairs checked, worst ${b.min.toFixed(2)}:1 (${wcagLevel(b.min)})`);
  }
  console.log(`\n  ${errors.length} errors, ${warns.length} warnings\n`);
  return errors.length === 0;
}
