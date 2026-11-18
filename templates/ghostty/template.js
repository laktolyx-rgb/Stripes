export const meta = {
  name: 'Ghostty',
  category: 'terminal',
  homepage: 'https://ghostty.org',
  install: 'Copy `themes/*` to `~/.config/ghostty/themes/`, then `theme = stripes-night`',
};

const ANSI = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

export function render({ variants }) {
  const files = {};
  for (const v of variants) {
    const r = v.roles;
    const pal = [...ANSI.map((n, i) => `palette = ${i}=${v.ansi.normal[n]}`), ...ANSI.map((n, i) => `palette = ${i + 8}=${v.ansi.bright[n]}`)];
    files[`themes/stripes-${v.id}`] = `# ${v.name}. ${v.description}
background = ${r.background.hex}
foreground = ${r.foreground.hex}
cursor-color = ${r.cursor.hex}
cursor-text = ${r.background.hex}
selection-background = ${r.selection.hex}
selection-foreground = ${r.foreground.hex}
${pal.join('\n')}
`;
  }
  return files;
}
