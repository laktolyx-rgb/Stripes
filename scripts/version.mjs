// Bump the single Stripes version everywhere it lives, then rebuild.
//   npm run version:set -- 0.2.0
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const next = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(next ?? '')) { console.error('Usage: npm run version:set -- <x.y.z>'); process.exit(1); }

const edit = (file, fn) => writeFileSync(file, fn(readFileSync(file, 'utf8')));
edit('palette/palette.json', (s) => s.replace(/"version": "[^"]+"/, `"version": "${next}"`));
edit('packages/palette/package.json', (s) => s.replace(/"version": "[^"]+"/, `"version": "${next}"`));
edit('site/package.json', (s) => s.replace(/"@stripes-theme\/palette": "[^"]+"/, `"@stripes-theme/palette": "^${next}"`));
edit('templates/vscode/static/CHANGELOG.md', (s) => s.includes(`## ${next}`) ? s : s.replace('# Changelog\n', `# Changelog\n\n## ${next}\n\n- \n`));

execSync('npm install --package-lock-only --ignore-scripts', { stdio: 'inherit' });
execSync('npm run build', { stdio: 'inherit' });
console.log(`\nVersion ${next}. Next:\n  git commit -am "release: v${next}" && git tag v${next} && git push --follow-tags`);
