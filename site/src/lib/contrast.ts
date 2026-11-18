// Worst WCAG contrast per variant, from the same validator CI uses.
import { validate } from '../../../packages/builder/src/validate.js';
import rawPalette from '../../../palette/palette.json';

const rows = validate(rawPalette as any);

export function worstContrast(variant: string) {
  const mine = rows.filter((r: any) => r.variant === variant && r.severity === 'error');
  const worst = Math.min(...mine.map((r: any) => r.ratio));
  return { ratio: worst.toFixed(2), level: worst >= 7 ? 'AAA' : 'AA', pairs: mine.length };
}
