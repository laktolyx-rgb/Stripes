export const meta = {
  name: 'Alacritty',
  category: 'terminal',
  homepage: 'https://alacritty.org',
  install: '`[general] import = ["~/.config/alacritty/stripes-night.toml"]`',
};

const ANSI = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

export function render({ variants }) {
  const files = {};
  for (const v of variants) {
    const r = v.roles;
    const block = (kind) => ANSI.map((n) => `${n} = "${v.ansi[kind][n]}"`).join('\n');
    files[`stripes-${v.id}.toml`] = `# ${v.name}. ${v.description}

[colors.primary]
background = "${r.background.hex}"
foreground = "${r.foreground.hex}"
dim_foreground = "${r.foregroundMuted.hex}"
bright_foreground = "${r.keyword.hex}"

[colors.cursor]
text = "${r.background.hex}"
cursor = "${r.cursor.hex}"

[colors.vi_mode_cursor]
text = "${r.background.hex}"
cursor = "${r.accent.hex}"

[colors.selection]
text = "${r.foreground.hex}"
background = "${r.selection.hex}"

[colors.search.matches]
foreground = "${r.foreground.hex}"
background = "${r.accentBackground.hex}"

[colors.search.focused_match]
foreground = "${r.background.hex}"
background = "${r.accent.hex}"

[colors.hints.start]
foreground = "${r.background.hex}"
background = "${r.accent.hex}"

[colors.hints.end]
foreground = "${r.background.hex}"
background = "${r.function.hex}"

[colors.footer_bar]
foreground = "${r.foreground.hex}"
background = "${r.backgroundAlt.hex}"

[colors.normal]
${block('normal')}

[colors.bright]
${block('bright')}
`;
  }
  return files;
}
