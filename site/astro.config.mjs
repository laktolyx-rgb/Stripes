import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';

// Site URL and base path come from stripes.config.json (e.g. https://<owner>.github.io/<repo>).
const cfg = JSON.parse(readFileSync(new URL('../stripes.config.json', import.meta.url), 'utf8'));
const url = new URL(process.env.SITE_URL ?? cfg.site);

export default defineConfig({
  site: url.origin,
  base: process.env.SITE_BASE ?? (url.pathname.replace(/\/$/, '') || '/'),
  trailingSlash: 'ignore',
});
