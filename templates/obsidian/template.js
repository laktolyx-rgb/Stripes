// Obsidian community theme. Night/Bone follow Obsidian's dark/light mode;
// Void and Blood can be picked with the Style Settings plugin.
export const meta = {
  name: 'Obsidian',
  category: 'app',
  homepage: 'https://obsidian.md',
  install: 'Settings → Appearance → Themes → Manage → "Stripes"',
};

function vars(v, h) {
  const c = Object.fromEntries(Object.entries(v.colors).map(([k, x]) => [k, x.hex]));
  const accent = v.colors.blood.hsl;
  return `  --accent-h: ${accent.h};
  --accent-s: ${accent.s}%;
  --accent-l: ${accent.l}%;
  --color-base-00: ${c.midnight};
  --color-base-05: ${c.midnight};
  --color-base-10: ${c.crypt};
  --color-base-20: ${c.crypt};
  --color-base-25: ${c.grave};
  --color-base-30: ${c.grave};
  --color-base-35: ${c.tomb};
  --color-base-40: ${c.ash};
  --color-base-50: ${c.fog};
  --color-base-60: ${c.fog};
  --color-base-70: ${c.smoke};
  --color-base-100: ${c.bone};
  --color-red: ${c.blood};
  --color-red-rgb: ${h.rgbList(c.blood)};
  --color-accent: ${c.blood};
  --background-primary: ${c.midnight};
  --background-primary-alt: ${c.crypt};
  --background-secondary: ${c.crypt};
  --background-secondary-alt: ${c.grave};
  --background-modifier-border: ${c.grave};
  --background-modifier-border-hover: ${c.ash};
  --background-modifier-border-focus: ${c.blood};
  --background-modifier-hover: ${h.withAlpha(c.tomb, 0.7)};
  --background-modifier-active-hover: ${c.tomb};
  --background-modifier-error: ${c.ember};
  --background-modifier-success: ${c.bone};
  --background-modifier-form-field: ${c.midnight};
  --text-normal: ${c.bone};
  --text-muted: ${c.smoke};
  --text-faint: ${c.fog};
  --text-on-accent: ${c.midnight};
  --text-accent: ${c.blood};
  --text-accent-hover: ${c.ember};
  --text-error: ${c.ember};
  --text-success: ${c.bone};
  --text-warning: ${c.ivory};
  --text-selection: ${h.withAlpha(c.blood, 0.3)};
  --text-highlight-bg: ${c.scar};
  --text-highlight-bg-active: ${h.withAlpha(c.blood, 0.4)};
  --interactive-normal: ${c.grave};
  --interactive-hover: ${c.tomb};
  --interactive-accent: ${c.blood};
  --interactive-accent-hover: ${c.ember};
  --caret-color: ${c.ivory};
  --h1-color: ${c.ivory};
  --h2-color: ${c.ivory};
  --h3-color: ${c.bone};
  --h4-color: ${c.bone};
  --h5-color: ${c.smoke};
  --h6-color: ${c.smoke};
  --bold-color: ${c.ivory};
  --italic-color: ${c.bone};
  --link-color: ${c.blood};
  --link-color-hover: ${c.ember};
  --link-external-color: ${c.blood};
  --link-unresolved-color: ${c.fog};
  --tag-color: ${c.blood};
  --tag-background: ${c.scar};
  --blockquote-border-color: ${c.blood};
  --hr-color: ${c.grave};
  --checkbox-color: ${c.blood};
  --checkbox-border-color: ${c.ash};
  --code-background: ${c.crypt};
  --code-normal: ${c.bone};
  --code-comment: ${c.fog};
  --code-keyword: ${c.ivory};
  --code-function: ${c.smoke};
  --code-string: ${c.blood};
  --code-value: ${c.ivory};
  --code-property: ${c.smoke};
  --code-tag: ${c.ivory};
  --code-operator: ${c.smoke};
  --code-punctuation: ${c.fog};
  --code-important: ${c.ember};
  --graph-node: ${c.smoke};
  --graph-node-focused: ${c.blood};
  --graph-node-tag: ${c.blood};
  --graph-line: ${c.ash};`;
}

export function render({ variants, variant, h, palette }) {
  const night = variant('night'), bone = variant('bone');
  const darkExtras = variants.filter((v) => v.dark && v.id !== 'night');
  const css = `/* @settings
name: Stripes
id: stripes
settings:
  -
    id: stripes-dark-variant
    title: Dark variant
    description: Night (default), Void (OLED black) or Blood (high contrast)
    type: class-select
    allowEmpty: false
    default: stripes-night
    options:
      - label: Night
        value: stripes-night
${darkExtras.map((v) => `      - label: ${h.title(v.id)}\n        value: stripes-${v.id}`).join('\n')}
  -
    id: stripes-stripes-header
    title: Striped headings
    description: Thin barber stripe under H1
    type: class-toggle
    default: true
*/

/* Stripes v${palette.version}. Generated from palette.json. */

.theme-dark {
${vars(night, h)}
}

.theme-light {
${vars(bone, h)}
}

${darkExtras.map((v) => `.theme-dark.stripes-${v.id} {\n${vars(v, h)}\n}`).join('\n\n')}

body {
  --font-text-theme: 'Iowan Old Style', 'Palatino Linotype', Georgia, serif;
  --font-monospace-theme: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
}

.markdown-rendered strong, .cm-strong { font-weight: 700; }
.markdown-rendered em, .cm-em { font-style: italic; }
.markdown-rendered code { color: var(--code-string); }

body.stripes-stripes-header .markdown-rendered h1::after,
body.stripes-stripes-header .HyperMD-header-1::after {
  content: '';
  display: block;
  height: 4px;
  margin-top: 6px;
  background: repeating-linear-gradient(90deg, var(--text-normal) 0 8px, transparent 8px 16px);
  opacity: 0.5;
}

.nav-file-title.is-active, .tree-item-self.is-active {
  box-shadow: inset 2px 0 0 var(--interactive-accent);
}
`;
  return {
    'theme.css': css,
    'manifest.json': h.json({
      name: 'Stripes',
      version: palette.version,
      minAppVersion: '1.0.0',
      author: 'Stripes contributors',
      authorUrl: 'https://github.com/stripes-theme/stripes',
    }),
  };
}
