import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadPalette, resolveAll } from '../packages/builder/src/palette.js';
import { validate } from '../packages/builder/src/validate.js';
import { contrast } from '../packages/builder/src/color.js';

test('palette loads and has 4 variants', () => {
  const p = loadPalette();
  assert.deepEqual(Object.keys(p.variants), ['night', 'bone', 'void', 'blood']);
});

test('every variant passes its WCAG target', () => {
  const failures = validate().filter((r) => !r.ok && r.severity === 'error');
  assert.equal(failures.length, 0, failures.map((f) => `${f.variant} ${f.label} ${f.ratio.toFixed(2)}`).join('\n'));
});

test('Night keeps the brand base colors', () => {
  const night = resolveAll(loadPalette()).find((v) => v.id === 'night');
  assert.equal(night.roles.background.hex, '#101010');
  assert.equal(night.roles.foreground.hex, '#ececec');
  assert.equal(night.roles.keyword.hex, '#ffffff');
  assert.equal(night.roles.keyword.bold, true);
  assert.equal(night.roles.function.hex, '#bdbdbd');
  assert.equal(night.roles.comment.italic, true);
});

test('contrast math matches WCAG reference values', () => {
  assert.equal(contrast('#000000', '#ffffff').toFixed(2), '21.00');
  assert.equal(contrast('#777777', '#ffffff').toFixed(2), '4.48');
});
