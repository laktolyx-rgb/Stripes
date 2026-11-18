// Neovim: palette.lua and colors/*.lua are generated. The highlight logic is handwritten in static/lua/stripes/groups.lua.
export const meta = {
  name: 'Neovim',
  category: 'editor',
  homepage: 'https://neovim.io',
  install: 'lazy.nvim: see ports/nvim/README.md',
};

export function render({ variants, palette }) {
  const lua = (v) => {
    const colors = palette.colorOrder.map((c) => `    ${c} = "${v.colors[c].hex}",`).join('\n');
    const ansi = (k) => Object.entries(v.ansi[k]).map(([n, hex]) => `${n} = "${hex}"`).join(', ');
    return `  ${v.id} = {
    name = "${v.name}",
    dark = ${v.dark},
${colors}
    ansi = {
      normal = { ${ansi('normal')} },
      bright = { ${ansi('bright')} },
    },
  },`;
  };
  const files = {
    'lua/stripes/palette.lua': `-- Generated from palette.json by the Stripes builder. Do not edit.
return {
${variants.map(lua).join('\n')}
}
`,
    'colors/stripes.lua': `require("stripes").load()\n`,
  };
  for (const v of variants) files[`colors/stripes-${v.id}.lua`] = `require("stripes").load("${v.id}")\n`;
  return files;
}
