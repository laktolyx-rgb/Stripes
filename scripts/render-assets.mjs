// Renders brand assets from palette.json + assets/brand/*.svg using headless Chrome.
//   node scripts/render-assets.mjs [icons|social|readme|wallpapers|gif|all]
// Outputs:
//   assets/brand/mark-{64,128,256,512,1024}.png, mascot-1024.png, logo.png, logo-light.png
//   templates/vscode/static/icon.png, templates/jetbrains/static/.../META-INF/pluginIcon.svg
//   assets/social-preview.png (1280x640), assets/banner.png (1600x500), assets/previews/*.png
//   assets/wallpapers/<variant>/stripes-<variant>-<WxH>.png
//   assets/demo.gif (needs ffmpeg on PATH)
import { mkdirSync, readFileSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { createHighlighter } from 'shiki';
import { launch } from './lib/browser.mjs';
import { loadPalette, resolveAll } from '../packages/builder/src/palette.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const A = (...p) => path.join(ROOT, 'assets', ...p);
const variants = resolveAll(loadPalette());
const V = Object.fromEntries(variants.map((v) => [v.id, v]));
const MARK = readFileSync(A('brand/mark.svg'), 'utf8');
const MASCOT = readFileSync(A('brand/mascot.svg'), 'utf8');
const SCENE = readFileSync(A('brand/scene.svg'), 'utf8');
const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@400;700&family=Special+Elite&family=JetBrains+Mono:ital,wght@0,400;0,700;1,400&display=block" rel="stylesheet">`;

const vars = (v) => Object.entries(v.colors).map(([k, c]) => `--${k}:${c.hex};--stripes-${k}:${c.hex};`).join('')
  + `--shadow:${v.dark ? '#0009' : '#3a2f2026'};`;
const INK = `<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="ink" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence class="seed" type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/></filter>
  <filter id="ink-strong" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence class="seed" type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/></filter>
</defs></svg>`;
const page = (v, body, css = '') => `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>
  *{box-sizing:border-box} html,body{margin:0;width:100%;height:100%;overflow:hidden}
  body{${vars(v)}background:var(--midnight);color:var(--bone);font-family:'Special Elite','Courier New',monospace}
  .mono{font-family:'JetBrains Mono',monospace}
  .gothic{font-family:'Grenze Gotisch',serif;font-weight:700;color:var(--ivory);filter:url(#ink)}
  .scene{position:absolute;inset:0} .scene svg{width:100%;height:100%;display:block}
  .scene *{animation:none!important}
  svg{display:block}
  ${css}</style></head><body>${INK}${body}</body></html>`;
const scene = (viewBox) => `<div class="scene">${viewBox ? SCENE.replace('viewBox="0 0 1600 900"', `viewBox="${viewBox}"`) : SCENE}</div>`;
const GRAIN = `<div style="position:absolute;inset:0;opacity:.10;mix-blend-mode:overlay;background-image:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;)"></div>`;

let browser;
async function shoot(html, file, w, h, { transparent = false, scale = 1 } = {}) {
  const p = await browser.newPage();
  await p.setViewport({ width: w, height: h, deviceScaleFactor: scale });
  await p.setContent(html, { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts.ready);
  mkdirSync(path.dirname(file), { recursive: true });
  await p.screenshot({ path: file, omitBackground: transparent });
  await p.close();
  console.log('  ✓', path.relative(ROOT, file));
}

// ---------------------------------------------------------------- icons & logo
async function icons() {
  const bare = (svg, size) => page(V.night, `<div style="width:${size}px;height:${size}px">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</div>`, 'body{background:transparent}');
  for (const s of [64, 128, 256, 512, 1024]) await shoot(bare(MARK, s), A(`brand/mark-${s}.png`), s, s, { transparent: true });
  await shoot(bare(MASCOT, 1024), A('brand/mascot-1024.png'), 1024, 1024, { transparent: true });
  copyFileSync(A('brand/mark-256.png'), path.join(ROOT, 'templates/vscode/static/icon.png'));
  const pluginIcon = path.join(ROOT, 'templates/jetbrains/static/src/main/resources/META-INF/pluginIcon.svg');
  mkdirSync(path.dirname(pluginIcon), { recursive: true });
  writeFileSync(pluginIcon, MARK.replace(/viewBox="0 0 256 256"/, 'viewBox="0 0 256 256" width="40" height="40"'));
  const lockup = (v) => page(v, `<div style="display:flex;align-items:center;gap:34px;height:100%;padding:0 40px">
      <div style="width:200px">${MARK.replace('<svg ', '<svg width="200" height="200" ')}</div>
      <div class="gothic" style="font-size:210px;line-height:1">Stripes</div></div>`, 'body{background:transparent}');
  await shoot(lockup(V.night), A('brand/logo.png'), 1060, 280, { transparent: true });
  await shoot(lockup(V.bone), A('brand/logo-light.png'), 1060, 280, { transparent: true });
}

// ---------------------------------------------------------------- code helper
let hl;
async function codeHtml(code, variantId) {
  hl ??= await createHighlighter({
    themes: variants.map((v) => JSON.parse(readFileSync(path.join(ROOT, `ports/vscode/themes/stripes-${v.id}-color-theme.json`), 'utf8'))),
    langs: ['typescript'],
  });
  return hl.codeToHtml(code, { lang: 'typescript', theme: V[variantId].name });
}
const SNIPPET = `// The undertaker's ledger
import { readFile } from 'node:fs/promises';

interface Grave { id: number; name: string; risen?: boolean }

export async function exhume(path: string, hour = 13) {
  const graves: Grave[] = JSON.parse(await readFile(path, 'utf8'));
  if (!graves.length) throw new Error(\`No graves at \${hour}:00\`);
  return graves.filter((g) => !g.risen);
}`;
const sheet = (v, html, file = 'ledger.ts') => `<div class="sheet"><div class="bar"><i class="pin"></i>${file}<span>${v.name}</span></div><div class="code">${html}</div></div>`;
const SHEET_CSS = `
  .sheet{position:relative;background:var(--midnight);transform:rotate(-1deg)}
  .sheet::before{content:'';position:absolute;inset:-6px;border:3px solid var(--bone);filter:url(#ink-strong)}
  .bar{display:flex;align-items:center;gap:12px;padding:11px 16px;background:var(--crypt);border-bottom:2px dashed var(--ash);font-size:14px}
  .bar span{margin-left:auto;color:var(--fog);font-size:12px}
  .pin{width:11px;height:11px;border-radius:50%;background:var(--blood);box-shadow:0 0 0 3px var(--midnight),0 0 0 5px var(--bone)}
  .code pre{margin:0;padding:18px 22px;background:transparent!important;font:14px/1.6 'JetBrains Mono',monospace}`;

// ---------------------------------------------------------------- social preview & banner
const titleBlock = (size) => `
  <p style="letter-spacing:.35em;text-transform:uppercase;font-size:${size * 0.12}px;color:var(--fog);margin:0">a theme in four acts</p>
  <div class="gothic" style="font-size:${size}px;line-height:.85;text-shadow:4px 4px 0 var(--midnight)">Stripes</div>
  <p style="font-size:${size * 0.2}px;margin:${size * 0.18}px 0 0">Black &amp; white, and one drop of <span style="color:var(--blood)">blood</span>.</p>`;

async function social() {
  await shoot(page(V.night, `${scene('-380 0 1800 900')}<div style="position:absolute;left:64px;top:70px">${titleBlock(150)}
      <p style="font-size:15px;color:var(--smoke);margin-top:22px;line-height:1.7">VS Code · Neovim · Zed · JetBrains<br>Ghostty · Kitty · Alacritty · Windows Terminal · Obsidian · Discord</p></div>${GRAIN}`),
    A('social-preview.png'), 1280, 640);
  await shoot(page(V.night, `${scene('-820 120 2480 775')}<div style="position:absolute;left:70px;top:56px">${titleBlock(160)}</div>${GRAIN}`),
    A('banner.png'), 1600, 500);
}

// ---------------------------------------------------------------- wallpapers
const SIZES = [[1920, 1080], [2560, 1440], [3840, 2160], [1170, 2532]];
async function wallpapers() {
  for (const v of variants) {
    for (const [w, h] of SIZES) {
      const scale = w >= 2560 ? 2 : 1;
      const bw = w / scale, bh = h / scale;
      const portrait = bh > bw;
      const sig = Math.round(Math.min(bw, bh) * 0.045);
      const html = page(v, `${scene(portrait ? '900 -660 700 1560' : undefined)}
        <div class="gothic" style="position:absolute;${portrait ? `left:0;right:0;text-align:center;top:${bh * 0.3}px;font-size:${sig * 1.6}px` : `left:${bw * 0.04}px;top:${bh * 0.06}px;font-size:${sig}px`};opacity:.85">Stripes <span style="color:var(--blood)">·</span> ${v.name.replace('Stripes ', '')}</div>
        ${GRAIN}`);
      await shoot(html, A(`wallpapers/${v.id}/stripes-${v.id}-${w}x${h}.png`), bw, bh, { scale });
    }
  }
}

// ---------------------------------------------------------------- README images
async function readme() {
  for (const v of variants) {
    await shoot(page(v, `<div style="padding:34px 40px">${sheet(v, await codeHtml(SNIPPET, v.id))}</div>`, SHEET_CSS),
      A(`previews/${v.id}.png`), 900, 400);
    const order = Object.keys(v.colors);
    await shoot(page(v, `<div style="display:flex;gap:10px;padding:22px 20px;align-items:flex-start">
      ${order.map((c) => `<div style="flex:1;text-align:center">
        <div style="height:56px;background:${v.colors[c].hex};border:2px solid var(--bone);filter:url(#ink)"></div>
        <div style="font:700 17px 'Grenze Gotisch',serif;color:var(--ivory);margin-top:8px">${c}</div>
        <div class="mono" style="font-size:11px;color:var(--fog)">${v.colors[c].hex}</div></div>`).join('')}
      </div>`), A(`previews/palette-${v.id}.png`), 1100, 150);
  }
}

// ---------------------------------------------------------------- demo GIF
async function gif() {
  const W = 880, H = 520, FPS = 12;
  const tmp = path.join(tmpdir(), 'stripes-gif');
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  const rendered = {};
  for (const v of variants) rendered[v.id] = await codeHtml(SNIPPET, v.id);
  const html = page(V.night, `
      <div id="ed" style="position:absolute;left:44px;right:44px;top:44px"></div>
      <div id="card" style="position:absolute;inset:0;display:none;place-content:center;text-align:center;background:var(--midnight)">
        <svg viewBox="0 0 800 300" preserveAspectRatio="none" style="position:absolute;left:110px;right:110px;top:130px;width:660px;height:260px">
          <g filter="url(#ink)" fill="none" stroke="var(--bone)" stroke-width="3"><rect x="12" y="12" width="776" height="276"/><rect x="24" y="24" width="752" height="252" stroke-width="1.5"/>
          <path d="M24 60 Q60 60 60 24 M776 60 Q740 60 740 24 M24 240 Q60 240 60 276 M776 240 Q740 240 740 276"/><path d="M330 262 L470 262" stroke="var(--blood)"/></g></svg>
        <p id="act" style="letter-spacing:.4em;text-transform:uppercase;color:var(--fog);margin:0;position:relative"></p>
        <div id="name" class="gothic" style="font-size:96px;line-height:1;position:relative"></div>
        <p id="cap" style="margin:6px 0 0;position:relative"></p>
      </div>${GRAIN}`, SHEET_CSS + '.hide{visibility:hidden}');
  const p = await browser.newPage();
  await p.setViewport({ width: W, height: H });
  await p.setContent(html, { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate((data) => { window.__d = data; }, {
    rendered, vars: Object.fromEntries(variants.map((v) => [v.id, vars(v)])),
    sheets: Object.fromEntries(variants.map((v) => [v.id, sheet(v, '%CODE%')])),
    names: Object.fromEntries(variants.map((v) => [v.id, v.name.replace('Stripes ', '')])),
  });
  // timeline (seconds): type in Night, hold, then [intertitle, editor] for each other variant
  const caps = { bone: 'In which the ink dries on old parchment.', void: 'In which the pixels sleep in their coffins.', blood: 'In which every word can be read, even by the dead.' };
  const seq = [{ id: 'night', kind: 'type', d: 3.0 }, { id: 'night', kind: 'hold', d: 0.9 }];
  ['bone', 'void', 'blood'].forEach((id, i) => seq.push({ id, kind: 'card', d: 0.8, act: ['II', 'III', 'IV'][i], cap: caps[id] }, { id, kind: 'hold', d: 1.2 }));
  const total = seq.reduce((n, s) => n + s.d, 0);
  const frames = Math.round(total * FPS);
  for (let f = 0; f < frames; f++) {
    let t = f / FPS, s = seq[0];
    for (const step of seq) { if (t < step.d) { s = step; break; } t -= step.d; }
    const reveal = s.kind === 'type' ? Math.min(1, t / (s.d - 0.3)) : 1;
    await p.evaluate(({ s, reveal, f }) => {
      const d = window.__d;
      document.body.setAttribute('style', d.vars[s.id]);
      document.querySelectorAll('.seed').forEach((n, i) => n.setAttribute('seed', String((f % 4) + 1 + i * 7)));
      const card = document.getElementById('card');
      card.style.display = s.kind === 'card' ? 'grid' : 'none';
      if (s.kind === 'card') {
        document.getElementById('act').textContent = 'Act ' + s.act;
        document.getElementById('name').textContent = d.names[s.id];
        document.getElementById('cap').textContent = s.cap;
        return;
      }
      const ed = document.getElementById('ed');
      ed.innerHTML = d.sheets[s.id].replace('%CODE%', d.rendered[s.id]);
      const spans = [...ed.querySelectorAll('.code pre .line span')];
      let budget = Math.floor(spans.reduce((n, x) => n + x.textContent.length, 0) * reveal);
      for (const x of spans) {
        if (budget <= 0) { x.classList.add('hide'); continue; }
        if (x.textContent.length > budget) x.textContent = x.textContent.slice(0, budget);
        budget -= x.textContent.length;
      }
    }, { s, reveal, f });
    await p.screenshot({ path: path.join(tmp, `f${String(f).padStart(4, '0')}.png`) });
  }
  await p.close();
  const out = A('demo.gif');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(tmp, 'f%04d.png'),
    '-vf', 'split[a][b];[a]palettegen=max_colors=64:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle',
    '-loop', '0', out]);
  rmSync(tmp, { recursive: true, force: true });
  console.log('  ✓', path.relative(ROOT, out), `(${frames} frames)`);
}

const jobs = { icons, social, readme, wallpapers, gif };
const want = process.argv[2] ?? 'all';
browser = await launch();
try {
  for (const [name, fn] of Object.entries(jobs)) if (want === 'all' || want === name) { console.log(name); await fn(); }
} finally {
  await browser.close();
}
