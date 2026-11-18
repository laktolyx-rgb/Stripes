// Loads palette/palette.json and resolves each variant's roles to concrete values.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { hexToRgb, rgbToHsl } from './color.js';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
export const PALETTE_PATH = path.join(ROOT, 'palette', 'palette.json');

export function loadPalette(file = PALETTE_PATH) {
  const raw = JSON.parse(readFileSync(file, 'utf8'));
  const errors = [];
  const HEX = /^#[0-9a-f]{6}$/;
  for (const [id, v] of Object.entries(raw.variants)) {
    for (const name of raw.colorOrder) {
      if (!HEX.test(v.colors[name] ?? '')) errors.push(`${id}.colors.${name} is missing or not #rrggbb lowercase`);
    }
    for (const kind of ['normal', 'bright']) {
      for (const [n, hex] of Object.entries(v.ansi[kind])) if (!HEX.test(hex)) errors.push(`${id}.ansi.${kind}.${n} invalid`);
    }
  }
  for (const [role, def] of Object.entries(raw.roles)) {
    if (!raw.colorOrder.includes(def.color)) errors.push(`role ${role} points to unknown color "${def.color}"`);
  }
  if (errors.length) throw new Error('palette.json invalid:\n  ' + errors.join('\n  '));
  return raw;
}

/** Variant expanded with full color info and resolved roles. Templates consume this. */
export function resolveVariant(palette, id) {
  const v = palette.variants[id];
  const colors = {};
  palette.colorOrder.forEach((name, order) => {
    const hex = v.colors[name];
    colors[name] = { name, hex, rgb: hexToRgb(hex), hsl: rgbToHsl(hexToRgb(hex)), order, doc: palette.colorDocs[name] };
  });
  const roles = {};
  for (const [role, def] of Object.entries(palette.roles)) {
    roles[role] = { color: def.color, hex: v.colors[def.color], bold: !!def.bold, italic: !!def.italic };
  }
  return { id, name: v.name, dark: v.dark, description: v.description, colors, roles, ansi: v.ansi };
}

export function resolveAll(palette) {
  return Object.keys(palette.variants).map((id) => resolveVariant(palette, id));
}
