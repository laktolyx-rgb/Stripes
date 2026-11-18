export const meta = {
  name: 'Windows Terminal',
  category: 'terminal',
  homepage: 'https://github.com/microsoft/terminal',
  install: String.raw`Copy "stripes.json" to "%LOCALAPPDATA%\Microsoft\Windows Terminal\Fragments\Stripes\"`.replace(/"/g, '`'),
};

const WT = { black: 'black', red: 'red', green: 'green', yellow: 'yellow', blue: 'blue', magenta: 'purple', cyan: 'cyan', white: 'white' };

function scheme(v) {
  const r = v.roles;
  const s = {
    name: v.name,
    background: r.background.hex,
    foreground: r.foreground.hex,
    cursorColor: r.cursor.hex,
    selectionBackground: r.selection.hex,
  };
  for (const [ansi, wt] of Object.entries(WT)) {
    s[wt] = v.ansi.normal[ansi];
    s['bright' + wt[0].toUpperCase() + wt.slice(1)] = v.ansi.bright[ansi];
  }
  return s;
}

function theme(v) {
  const r = v.roles;
  return {
    name: v.name,
    window: { applicationTheme: v.dark ? 'dark' : 'light', useMica: false },
    tab: { background: r.background.hex + 'ff', unfocusedBackground: r.backgroundAlt.hex + 'ff', showCloseButton: 'hover' },
    tabRow: { background: r.backgroundAlt.hex + 'ff', unfocusedBackground: r.backgroundAlt.hex + 'ff' },
  };
}

export function render({ variants, h }) {
  const files = {
    // Fragment: Windows Terminal loads it automatically from the Fragments folder.
    'stripes.json': h.json({ schemes: variants.map(scheme), themes: variants.map(theme) }),
  };
  for (const v of variants) files[`schemes/stripes-${v.id}.json`] = h.json(scheme(v));
  return files;
}
