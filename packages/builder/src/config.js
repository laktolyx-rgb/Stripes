// Project identity (owner, repo, publisher ids) from stripes.config.json, plus derived URLs.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './palette.js';

export function loadConfig(file = path.join(ROOT, 'stripes.config.json')) {
  const c = JSON.parse(readFileSync(file, 'utf8'));
  const slug = `${c.owner}/${c.repo}`;
  return {
    ...c,
    slug,
    repoUrl: `https://github.com/${slug}`,
    rawUrl: `https://raw.githubusercontent.com/${slug}/${c.branch}`,
    treeUrl: `https://github.com/${slug}/tree/${c.branch}`,
    blobUrl: `https://github.com/${slug}/blob/${c.branch}`,
    vscodeId: `${c.vscode.publisher}.${c.vscode.name}`,
  };
}

/** Replace {{key}} / {{a.b}} placeholders in text with config values. Unknown keys are left as-is. */
export function fill(text, config) {
  return text.replace(/\{\{([\w.]+)\}\}/g, (m, key) => {
    const v = key.split('.').reduce((o, k) => (o == null ? o : o[k]), config);
    return v == null ? m : String(v);
  });
}
