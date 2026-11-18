import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import luaparse from 'luaparse';
import { parse as parseToml } from 'smol-toml';
import { XMLValidator } from 'fast-xml-parser';
import { ROOT } from '../packages/builder/src/palette.js';
import { check, listApps } from '../packages/builder/src/build.js';

const PORTS = path.join(ROOT, 'ports');
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(path.join(d, f)).isDirectory() ? walk(path.join(d, f)) : [path.join(d, f)]));
const files = walk(PORTS);
const byExt = (ext) => files.filter((f) => f.endsWith(ext));
const rel = (f) => path.relative(ROOT, f);
const HEX = /^#[0-9a-f]{6}([0-9a-f]{2})?$/i;

test('every template produced a port', () => {
  for (const app of listApps()) assert.ok(existsSync(path.join(PORTS, app)), app);
  assert.ok(listApps().length >= 10);
});

test('ports/ is in sync with palette + templates', async () => {
  assert.deepEqual(await check(), []);
});

test('JSON files parse', () => {
  for (const f of byExt('.json')) assert.doesNotThrow(() => JSON.parse(readFileSync(f, 'utf8')), rel(f));
});

test('TOML files parse', () => {
  for (const f of byExt('.toml')) assert.doesNotThrow(() => parseToml(readFileSync(f, 'utf8')), rel(f));
});

test('Lua files parse', () => {
  for (const f of byExt('.lua')) assert.doesNotThrow(() => luaparse.parse(readFileSync(f, 'utf8'), { luaVersion: '5.3' }), rel(f));
});

test('XML files are well-formed', () => {
  for (const f of byExt('.xml')) {
    const res = XMLValidator.validate(readFileSync(f, 'utf8'));
    assert.equal(res, true, `${rel(f)}: ${JSON.stringify(res.err ?? res)}`);
  }
});

test('CSS braces are balanced', () => {
  for (const f of byExt('.css')) {
    const src = readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    assert.equal((src.match(/\{/g) ?? []).length, (src.match(/\}/g) ?? []).length, rel(f));
  }
});

test('VS Code themes: valid colors and fontStyles', () => {
  for (const f of byExt('-color-theme.json')) {
    const t = JSON.parse(readFileSync(f, 'utf8'));
    for (const [k, v] of Object.entries(t.colors)) assert.match(v, HEX, `${rel(f)} colors.${k}`);
    for (const rule of t.tokenColors) {
      if (rule.settings.foreground) assert.match(rule.settings.foreground, HEX, `${rel(f)} ${rule.name}`);
      if (rule.settings.fontStyle) assert.match(rule.settings.fontStyle, /^(bold|italic|underline|strikethrough| )*$/, rule.name);
    }
  }
  const pkg = JSON.parse(readFileSync(path.join(PORTS, 'vscode/package.json'), 'utf8'));
  for (const th of pkg.contributes.themes) assert.ok(existsSync(path.join(PORTS, 'vscode', th.path)), th.path);
});

test('Ghostty / Kitty: every line is a comment or "key value" with valid colors', () => {
  for (const f of [...walk(path.join(PORTS, 'ghostty/themes')), ...byExt('.conf')]) {
    for (const line of readFileSync(f, 'utf8').split('\n')) {
      if (!line.trim() || line.startsWith('#')) continue;
      assert.match(line, /^[a-z0-9_-]+\s*(=\s*)?\S/, `${rel(f)}: ${line}`);
      const colors = line.match(/#[0-9a-fA-F]+/g) ?? [];
      for (const c of colors) assert.match(c, HEX, `${rel(f)}: ${line}`);
    }
  }
});

test('Zed theme family has all variants and valid colors', () => {
  const fam = JSON.parse(readFileSync(path.join(PORTS, 'zed/themes/stripes.json'), 'utf8'));
  assert.equal(fam.themes.length, 4);
  for (const t of fam.themes) {
    for (const [k, v] of Object.entries(t.style)) if (typeof v === 'string' && v.startsWith('#')) assert.match(v, HEX, `${t.name} ${k}`);
  }
});

test('JetBrains plugin.xml references existing themes', () => {
  const xml = readFileSync(path.join(PORTS, 'jetbrains/src/main/resources/META-INF/plugin.xml'), 'utf8');
  for (const [, p] of xml.matchAll(/path="([^"]+)"/g)) {
    assert.ok(existsSync(path.join(PORTS, 'jetbrains/src/main/resources', p)), p);
    const theme = JSON.parse(readFileSync(path.join(PORTS, 'jetbrains/src/main/resources', p), 'utf8'));
    assert.ok(existsSync(path.join(PORTS, 'jetbrains/src/main/resources', theme.editorScheme)), theme.editorScheme);
  }
});
