import { defineConfig } from 'astro/config';

// GitHub Pages serves the project at /<repo>/. Override with SITE_BASE=/ for a custom domain.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://stripes-theme.github.io',
  base: process.env.SITE_BASE ?? '/stripes',
  trailingSlash: 'ignore',
});
