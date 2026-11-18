export const meta = {
  name: 'Kitty',
  category: 'terminal',
  homepage: 'https://sw.kovidgoyal.net/kitty/',
  install: '`include stripes-night.conf` in `kitty.conf`',
};

const ANSI = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

export function render({ variants }) {
  const files = {};
  for (const v of variants) {
    const r = v.roles;
    const colors = [...ANSI.map((n, i) => `color${i} ${v.ansi.normal[n]}`), ...ANSI.map((n, i) => `color${i + 8} ${v.ansi.bright[n]}`)];
    files[`stripes-${v.id}.conf`] = `## name: ${v.name}
## author: Stripes
## license: MIT
## blurb: ${v.description}

foreground ${r.foreground.hex}
background ${r.background.hex}
selection_foreground ${r.foreground.hex}
selection_background ${r.selection.hex}
cursor ${r.cursor.hex}
cursor_text_color ${r.background.hex}
url_color ${r.accent.hex}
url_style curly

active_border_color ${r.accent.hex}
inactive_border_color ${r.border.hex}
bell_border_color ${r.error.hex}

wayland_titlebar_color ${r.backgroundAlt.hex}
macos_titlebar_color ${r.backgroundAlt.hex}

active_tab_foreground ${r.background.hex}
active_tab_background ${r.foreground.hex}
active_tab_font_style bold
inactive_tab_foreground ${r.foregroundMuted.hex}
inactive_tab_background ${r.backgroundAlt.hex}
tab_bar_background ${r.backgroundAlt.hex}

mark1_foreground ${r.background.hex}
mark1_background ${r.accent.hex}
mark2_foreground ${r.background.hex}
mark2_background ${r.foreground.hex}
mark3_foreground ${r.background.hex}
mark3_background ${r.function.hex}

${colors.join('\n')}
`;
  }
  return files;
}
