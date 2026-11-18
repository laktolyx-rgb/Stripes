// Copies generated data the site needs: ports index, VS Code themes (for Shiki), brand assets.
import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(site, '..');
const gen = path.join(site, 'src/generated');
rmSync(gen, { recursive: true, force: true });
mkdirSync(path.join(gen, 'themes'), { recursive: true });

if (!existsSync(path.join(root, 'ports/index.json'))) throw new Error('Run `npm run build` at the repo root first.');
cpSync(path.join(root, 'ports/index.json'), path.join(gen, 'ports.json'));
cpSync(path.join(root, 'ports/vscode/themes'), path.join(gen, 'themes'), { recursive: true });
cpSync(path.join(root, 'packages/palette/dist/palette.json'), path.join(gen, 'palette.json'));
mkdirSync(path.join(site, 'public/brand'), { recursive: true });
cpSync(path.join(root, 'assets/brand'), path.join(site, 'public/brand'), { recursive: true });
if (existsSync(path.join(root, 'assets/social-preview.png'))) cpSync(path.join(root, 'assets/social-preview.png'), path.join(site, 'public/social-preview.png'));
console.log('site: synced generated data');
