// Renders brand assets from palette.json + assets/brand/*.svg using headless Chrome.
//   node scripts/render-assets.mjs [icons|social|wallpapers|gif|all]
// Outputs:
//   assets/brand/mark-{64,128,256,512,1024}.png, assets/brand/mascot-1024.png, assets/brand/logo.png
//   templates/vscode/static/icon.png, templates/jetbrains/static/src/main/resources/META-INF/pluginIcon.svg
//   assets/social-preview.png (1280x640), assets/banner.png (1600x500)
//   assets/wallpapers/<variant>/stripes-<variant>-<WxH>.png
//   assets/demo.gif (needs ffmpeg on PATH)
import { mkdirSync, readFileSync, writeFileSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { createHighlighter } from 'shiki';
import { launch } from './lib/browser.mjs';
import { loadPalette, resolveAll } from '../packages/builder/src/palette.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const A = (...p) => path.join(ROOT, 'assets', ...p);
const palette = loadPalette();
const variants = resolveAll(palette);
const V = Object.fromEntries(variants.map((v) => [v.id, v]));
const MARK = readFileSync(A('brand/mark.svg'), 'utf8');
const MASCOT = readFileSync(A('brand/mascot.svg'), 'utf8');
const FONTS = `<link href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=IM+Fell+English+SC&family=JetBrains+Mono:ital,wght@0,400;0,700;1,400&display=block" rel="stylesheet">`;

const vars = (v) => Object.entries(v.colors).map(([k, c]) => `--${k}:${c.hex};`).join('') + `--shadow:${v.dark ? '#0009' : '#3a2f2026'};--m-ink:${v.colors.midnight.hex};--m-line:${v.colors.bone.hex};--m-blood:${v.colors.blood.hex};`;
const page = (v, body, css = '') => `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>
  *{box-sizing:border-box} html,body{margin:0;width:100%;height:100%;overflow:hidden}
  body{${vars(v)}background:var(--midnight);color:var(--bone);font-family:'IM Fell English',Georgia,serif}
  .mono{font-family:'JetBrains Mono',monospace} .display{font-family:'IM Fell English SC',Georgia,serif}
  svg{display:block}
  ${css}</style></head><body>${body}</body></html>`;

/** Wavy vertical stripes as an SVG string. */
function curtain(w, h, { stripe = 60, color = 'var(--grave)', accentIndex = -1, accent = 'var(--blood)', amp = 14, seed = 0 } = {}) {
  const n = Math.ceil(w / stripe) + 2;
  let paths = '';
  for (let i = -1; i < n; i++) {
    const x0 = i * stripe;
    const pts = [];
    for (let k = 0; k <= 24; k++) {
      const y = (k / 24) * h;
      pts.push([x0 + Math.sin(seed + y * 0.0045 + i * 0.35) * amp + Math.sin(y * 0.012 + i) * amp * 0.25, y]);
    }
    const d = `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')} L${pts.reverse().map(([x, y]) => `${(x + stripe / 2).toFixed(1)} ${y.toFixed(1)}`).join(' L')} Z`;
    paths += `<path d="${d}" fill="${i === accentIndex ? accent : color}"${i === accentIndex ? ' opacity=".6"' : ''}/>`;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0">${paths}</svg>`;
}

const GRAIN = `<div style="position:absolute;inset:0;opacity:.10;mix-blend-mode:overlay;background-image:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;)"></div>`;
const VIGNETTE = `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 40%,color-mix(in srgb,var(--midnight) 90%,transparent) 100%)"></div>`;

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
  // horizontal lockup, transparent
  const lockup = (v) => page(v, `<div style="display:flex;align-items:center;gap:36px;height:100%;padding:0 40px">
      <div style="width:200px">${MARK.replace('<svg ', '<svg width="200" height="200" ')}</div>
      <div class="display" style="font-size:180px;line-height:1;color:var(--ivory);letter-spacing:.02em">Stripes</div></div>`, 'body{background:transparent}');
  await shoot(lockup(V.night), A('brand/logo.png'), 1100, 280, { transparent: true });
  await shoot(lockup(V.bone), A('brand/logo-light.png'), 1100, 280, { transparent: true });
}

// ---------------------------------------------------------------- code helper
let hl;
async function codeHtml(code, variantId, lang = 'typescript') {
  hl ??= await createHighlighter({
    themes: variants.map((v) => JSON.parse(readFileSync(path.join(ROOT, `ports/vscode/themes/stripes-${v.id}-color-theme.json`), 'utf8'))),
    langs: ['typescript'],
  });
  return hl.codeToHtml(code, { lang, theme: V[variantId].name });
}
const SNIPPET = `// The undertaker's ledger
import { readFile } from 'node:fs/promises';

interface Grave { id: number; name: string; risen?: boolean }

export async function exhume(path: string, hour = 13) {
  const graves: Grave[] = JSON.parse(await readFile(path, 'utf8'));
  if (!graves.length) throw new Error(\`No graves at \${hour}:00\`);
  return graves.filter((g) => !g.risen);
}`;
const editor = (v, html, title = 'ledger.ts') => `<div style="background:var(--midnight);border:1px solid var(--grave);box-shadow:0 30px 80px var(--shadow)">
  <div style="display:flex;align-items:center;gap:8px;height:36px;padding:0 14px;background:var(--crypt);border-bottom:1px solid var(--grave)">
    <i style="width:11px;height:11px;border-radius:50%;background:var(--blood)"></i><i style="width:11px;height:11px;border-radius:50%;background:var(--ash)"></i><i style="width:11px;height:11px;border-radius:50%;background:var(--ash)"></i>
    <span class="mono" style="margin-left:14px;font-size:12px;color:var(--smoke);border-top:2px solid var(--blood);padding:9px 12px;background:var(--midnight)">${title}</span>
    <span style="margin-left:auto;font-style:italic;font-size:13px;color:var(--fog)">${v.name}</span>
  </div>
  <div class="code mono">${html}</div></div>`;
const CODE_CSS = `.code pre{margin:0;padding:18px 22px;background:transparent!important;font:14px/1.6 'JetBrains Mono',monospace}`;

// ---------------------------------------------------------------- social preview & banner
async function social() {
  const v = V.night;
  const html = page(v, `${curtain(1280, 640, { stripe: 54, accentIndex: 17 })}${VIGNETTE}
    <div style="position:absolute;inset:0;display:grid;grid-template-columns:520px 1fr;gap:40px;align-items:center;padding:0 64px">
      <div>
        <div style="display:flex;align-items:center;gap:18px">${MARK.replace('<svg ', '<svg width="84" height="84" ')}
          <div class="display" style="font-size:96px;line-height:1;color:var(--ivory)">Stripes</div></div>
        <p style="font-style:italic;font-size:34px;line-height:1.25;margin:22px 0 18px">Black &amp; white,<br>and one drop of <span style="color:var(--blood)">blood</span>.</p>
        <p class="mono" style="font-size:15px;line-height:1.7;color:var(--smoke);margin:0">VS Code · Neovim · Zed · JetBrains<br>Ghostty · Kitty · Alacritty · Windows Terminal<br>Obsidian · Discord</p>
        <p class="mono" style="font-size:13px;color:var(--fog);margin-top:18px;letter-spacing:.15em">NIGHT · BONE · VOID · BLOOD</p>
      </div>
      <div style="position:relative">${editor(v, await codeHtml(SNIPPET, 'night'))}
        <div style="position:absolute;right:-30px;bottom:-60px;width:150px">${MASCOT}</div></div>
    </div>${GRAIN}`, CODE_CSS + '.code pre{font-size:12.5px;padding:14px 18px}');
  await shoot(html, A('social-preview.png'), 1280, 640);

  const banner = page(v, `${curtain(1600, 500, { stripe: 50, accentIndex: 21 })}${VIGNETTE}
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:48px">
      <div style="width:230px">${MASCOT}</div>
      <div style="background:color-mix(in srgb,var(--midnight) 88%,transparent);border:2px solid var(--bone);outline:1px solid var(--bone);outline-offset:6px;padding:28px 56px;text-align:center">
        <div class="display" style="font-size:132px;line-height:.95;color:var(--ivory)">Stripes</div>
        <div style="font-style:italic;font-size:30px;margin-top:8px">Black &amp; white, and one drop of <span style="color:var(--blood)">blood</span>.</div>
      </div></div>${GRAIN}`);
  await shoot(banner, A('banner.png'), 1600, 500);
}

// ---------------------------------------------------------------- wallpapers
const SIZES = [[1920, 1080], [2560, 1440], [3840, 2160], [1170, 2532]];
async function wallpapers() {
  for (const v of variants) {
    for (const [w, h] of SIZES) {
      // render at a base size and upscale with deviceScaleFactor so stripes stay crisp
      const scale = w >= 3840 ? 2 : 1;
      const bw = w / scale, bh = h / scale;
      const portrait = bh > bw;
      const stripe = Math.round(Math.min(bw, bh) / 14);
      const mascotW = Math.round(Math.min(bw, bh) * (portrait ? 0.42 : 0.26));
      const accentIndex = Math.round((bw / stripe) * (portrait ? 0.5 : 0.7));
      const html = page(v, `${curtain(bw, bh, { stripe, accentIndex, amp: stripe * 0.25, seed: 2 })}${VIGNETTE}
        <div style="position:absolute;${portrait ? `left:50%;transform:translateX(-50%);bottom:${bh * 0.16}px` : `right:${bw * 0.08}px;bottom:${bh * 0.1}px`};width:${mascotW}px">${MASCOT}</div>
        <div class="display" style="position:absolute;${portrait ? `left:0;right:0;text-align:center;bottom:${bh * 0.08}px` : `left:${bw * 0.05}px;bottom:${bh * 0.07}px`};font-size:${Math.round(Math.min(bw, bh) * 0.05)}px;color:var(--fog);letter-spacing:.08em">Stripes <span style="color:var(--blood)">·</span> ${v.name.replace('Stripes ', '')}</div>
        ${GRAIN}`);
      await shoot(html, A(`wallpapers/${v.id}/stripes-${v.id}-${w}x${h}.png`), bw, bh, { scale });
    }
  }
}

// ---------------------------------------------------------------- demo GIF
async function gif() {
  const W = 880, H = 500, FPS = 12;
  const tmp = path.join(tmpdir(), 'stripes-gif');
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  // pre-render the snippet once per variant; typing reveals it with a clip on characters
  const rendered = {};
  for (const v of variants) rendered[v.id] = await codeHtml(SNIPPET, v.id);
  const order = ['night', 'bone', 'void', 'blood', 'night'];
  const html = page(V.night, `<div id="stage" style="position:absolute;inset:0;padding:28px 34px">
      <div id="ed"></div>
      <div id="cap" class="display" style="position:absolute;left:0;right:0;bottom:16px;text-align:center;font-size:30px;color:var(--ivory)"></div>
      <div id="flash" style="position:absolute;inset:0;background:var(--ivory);opacity:0;pointer-events:none"></div></div>${GRAIN}`,
    CODE_CSS + `#ed{transition:none} .code{height:330px;overflow:hidden} .hide{visibility:hidden}`);
  const page_ = await browser.newPage();
  await page_.setViewport({ width: W, height: H });
  await page_.setContent(html, { waitUntil: 'networkidle0' });
  await page_.evaluate(() => document.fonts.ready);
  await page_.evaluate((data) => { window.__data = data; }, { rendered, vars: Object.fromEntries(variants.map((v) => [v.id, vars(v)])), names: Object.fromEntries(variants.map((v) => [v.id, v.name])), editorTpl: editor({ name: '%NAME%' }, '%CODE%') });
  // timeline: 0-3.2s typing in Night, then each variant holds 1.3s with a flicker cut
  const typing = 3.2, hold = 1.3;
  const total = typing + hold * (order.length - 1) + 0.6;
  const frames = Math.round(total * FPS);
  for (let f = 0; f < frames; f++) {
    const t = f / FPS;
    let vi = 0, reveal = 1, flash = 0;
    if (t < typing) reveal = Math.min(1, t / (typing - 0.4));
    else {
      const k = (t - typing) / hold;
      vi = Math.min(order.length - 1, Math.floor(k) + 1);
      const into = (k % 1) * hold;
      flash = into < 0.08 ? 0.85 : into < 0.17 ? 0.3 : 0;
    }
    await page_.evaluate(({ id, reveal, flash }) => {
      const d = window.__data;
      document.body.setAttribute('style', d.vars[id]);
      const ed = document.getElementById('ed');
      ed.innerHTML = d.editorTpl.replace('%NAME%', d.names[id]).replace('%CODE%', d.rendered[id]);
      // hide characters beyond the typing cursor
      const spans = [...ed.querySelectorAll('.code pre .line span')];
      const totalChars = spans.reduce((n, s) => n + s.textContent.length, 0);
      let budget = Math.floor(totalChars * reveal);
      for (const s of spans) {
        if (budget <= 0) { s.classList.add('hide'); continue; }
        if (s.textContent.length > budget) s.textContent = s.textContent.slice(0, budget);
        budget -= s.textContent.length;
      }
      document.getElementById('cap').textContent = reveal < 1 ? '' : d.names[id];
      document.getElementById('flash').style.opacity = String(flash);
    }, { id: order[vi], reveal, flash });
    await page_.screenshot({ path: path.join(tmp, `f${String(f).padStart(4, '0')}.png`) });
  }
  await page_.close();
  const out = A('demo.gif');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(tmp, 'f%04d.png'),
    '-vf', 'split[a][b];[a]palettegen=max_colors=64:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle',
    '-loop', '0', out]);
  rmSync(tmp, { recursive: true, force: true });
  console.log('  ✓', path.relative(ROOT, out), `(${frames} frames)`);
}

const jobs = { icons, social, wallpapers, gif };
const want = process.argv[2] ?? 'all';
browser = await launch();
try {
  for (const [name, fn] of Object.entries(jobs)) if (want === 'all' || want === name) { console.log(name); await fn(); }
} finally {
  await browser.close();
}
