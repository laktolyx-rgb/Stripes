// Generates dist/ for @stripes-theme/palette from palette/palette.json:
//   index.js (ESM), index.cjs, index.d.ts, palette.json
//   css/<variant>.css, css/stripes.css (all variants, switched via [data-stripes])
//   tailwind.js / tailwind.cjs (v3 preset + plugin), tailwind.css (v4 @theme)
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadPalette, resolveAll } from '../builder/src/palette.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(here, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(path.join(dist, 'css'), { recursive: true });

const palette = loadPalette();
const variants = resolveAll(palette);
const write = (f, s) => writeFileSync(path.join(dist, f), s.trimStart());
const header = `/* Stripes v${palette.version}. Generated from palette.json, do not edit. */\n`;

// ---------- JS data ----------
const data = {
  version: palette.version,
  colorOrder: palette.colorOrder,
  variants: Object.fromEntries(variants.map((v) => [v.id, v])),
};
const json = JSON.stringify(data, null, 2);
write('palette.json', json);
write('index.js', `${header}export const palette = ${json};\nexport const { version, variants, colorOrder } = palette;\nexport const variantIds = Object.keys(variants);\nexport default palette;\n`);
write('index.cjs', `${header}const palette = ${json};\nmodule.exports = palette;\nmodule.exports.palette = palette;\nmodule.exports.version = palette.version;\nmodule.exports.variants = palette.variants;\nmodule.exports.colorOrder = palette.colorOrder;\nmodule.exports.variantIds = Object.keys(palette.variants);\nmodule.exports.default = palette;\n`);

const colorUnion = palette.colorOrder.map((c) => `'${c}'`).join(' | ');
const roleUnion = Object.keys(palette.roles).map((r) => `'${r}'`).join(' | ');
const variantUnion = variants.map((v) => `'${v.id}'`).join(' | ');
write('index.d.ts', `${header}
export type VariantId = ${variantUnion};
export type ColorName = ${colorUnion};
export type RoleName = ${roleUnion};
export type AnsiName = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
export interface Color { name: ColorName; hex: string; rgb: { r: number; g: number; b: number }; hsl: { h: number; s: number; l: number }; order: number; doc: string }
export interface Role { color: ColorName; hex: string; bold: boolean; italic: boolean }
export interface Variant {
  id: VariantId; name: string; dark: boolean; description: string;
  colors: Record<ColorName, Color>;
  roles: Record<RoleName, Role>;
  ansi: { normal: Record<AnsiName, string>; bright: Record<AnsiName, string> };
}
export interface Palette { version: string; colorOrder: ColorName[]; variants: Record<VariantId, Variant> }
export declare const palette: Palette;
export declare const version: string;
export declare const variants: Record<VariantId, Variant>;
export declare const colorOrder: ColorName[];
export declare const variantIds: VariantId[];
export default palette;
`);

// ---------- CSS ----------
const kebab = (s) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
const cssVars = (v, indent = '  ') => [
  ...palette.colorOrder.map((c) => `${indent}--stripes-${c}: ${v.colors[c].hex};`),
  ...palette.colorOrder.map((c) => `${indent}--stripes-${c}-rgb: ${v.colors[c].rgb.r} ${v.colors[c].rgb.g} ${v.colors[c].rgb.b};`),
  ...Object.entries(v.roles).map(([r, def]) => `${indent}--stripes-${kebab(r)}: var(--stripes-${def.color});`),
  ...['normal', 'bright'].flatMap((k) => Object.entries(v.ansi[k]).map(([n, hex]) => `${indent}--stripes-ansi-${k === 'bright' ? 'bright-' : ''}${n}: ${hex};`)),
  `${indent}color-scheme: ${v.dark ? 'dark' : 'light'};`,
].join('\n');

for (const v of variants) write(`css/${v.id}.css`, `${header}:root {\n${cssVars(v)}\n}\n`);
const night = variants.find((v) => v.id === 'night');
const bone = variants.find((v) => v.id === 'bone');
write('css/stripes.css', `${header}
/* Default: Night, or Bone when the OS prefers light. Force one with <html data-stripes="void">. */
:root {\n${cssVars(night)}\n}
@media (prefers-color-scheme: light) {\n  :root:not([data-stripes]) {\n${cssVars(bone, '    ')}\n  }\n}
${variants.map((v) => `[data-stripes="${v.id}"] {\n${cssVars(v)}\n}`).join('\n')}
`);

// ---------- Tailwind ----------
// v3: preset. Colors use CSS vars (stripes-blood/50 works) plus static per-variant colors (stripes-night-blood).
const twColors = {
  stripes: {
    ...Object.fromEntries(palette.colorOrder.map((c) => [c, `rgb(var(--stripes-${c}-rgb) / <alpha-value>)`])),
    ...Object.fromEntries(variants.map((v) => [v.id, Object.fromEntries(palette.colorOrder.map((c) => [c, v.colors[c].hex]))])),
  },
};
const twPreset = `{ theme: { extend: { colors: ${JSON.stringify(twColors, null, 2)} } } }`;
write('tailwind.js', `${header}export const colors = ${JSON.stringify(twColors, null, 2)};\nexport default { theme: { extend: { colors } } };\n`);
write('tailwind.cjs', `${header}module.exports = ${twPreset};\n`);
// v4: CSS-first. Import after "tailwindcss" and the stripes vars.
write('tailwind.css', `${header}@import "./css/stripes.css";\n\n@theme inline {\n${palette.colorOrder.map((c) => `  --color-stripes-${c}: var(--stripes-${c});`).join('\n')}\n${variants.flatMap((v) => palette.colorOrder.map((c) => `  --color-stripes-${v.id}-${c}: ${v.colors[c].hex};`)).join('\n')}\n}\n`);

console.log(`@stripes-theme/palette: built ${variants.length} variants into dist/`);
