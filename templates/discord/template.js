// Discord client theme for Vencord / BetterDiscord. One file per variant.
// Discord renames its CSS variables often; we set both the classic names and the 2025 "base/surface" names.
export const meta = {
  name: 'Discord',
  category: 'app',
  homepage: 'https://discord.com',
  install: 'Vencord: Themes → Online Themes → paste the raw URL of `stripes-night.theme.css`',
};

function css(v, h, palette, config) {
  const c = Object.fromEntries(Object.entries(v.colors).map(([k, x]) => [k, x.hex]));
  const a = h.withAlpha;
  return `/**
 * @name ${v.name}
 * @author Stripes contributors
 * @version ${palette.version}
 * @description ${v.description} Black and white, and one drop of blood.
 * @source ${config.repoUrl}
 * @website ${config.site}
 */

:root, .theme-dark, .theme-light, .theme-darker, .theme-midnight, .visual-refresh {
  /* classic */
  --background-primary: ${c.midnight};
  --background-secondary: ${c.crypt};
  --background-secondary-alt: ${c.grave};
  --background-tertiary: ${c.crypt};
  --background-floating: ${c.crypt};
  --background-nested-floating: ${c.crypt};
  --background-accent: ${c.tomb};
  --background-mobile-primary: ${c.midnight};
  --background-mobile-secondary: ${c.crypt};
  --background-modifier-hover: ${a(c.tomb, 0.5)};
  --background-modifier-active: ${a(c.tomb, 0.8)};
  --background-modifier-selected: ${c.tomb};
  --background-modifier-accent: ${c.grave};
  --background-message-hover: ${a(c.grave, 0.6)};
  --background-mentioned: ${a(c.blood, 0.1)};
  --background-mentioned-hover: ${a(c.blood, 0.15)};
  --channeltextarea-background: ${c.crypt};
  --modal-background: ${c.crypt};
  --modal-footer-background: ${c.midnight};
  --input-background: ${c.midnight};
  --deprecated-card-bg: ${c.crypt};
  --text-normal: ${c.bone};
  --text-muted: ${c.fog};
  --text-link: ${c.blood};
  --text-positive: ${c.bone};
  --text-warning: ${c.ivory};
  --text-danger: ${c.ember};
  --text-brand: ${c.blood};
  --header-primary: ${c.ivory};
  --header-secondary: ${c.smoke};
  --interactive-normal: ${c.smoke};
  --interactive-hover: ${c.bone};
  --interactive-active: ${c.ivory};
  --interactive-muted: ${c.ash};
  --channels-default: ${c.fog};
  --channel-icon: ${c.fog};
  --scrollbar-thin-thumb: ${c.ash};
  --scrollbar-auto-thumb: ${c.ash};
  --scrollbar-auto-track: ${c.crypt};
  --brand-experiment: ${c.blood};
  --brand-500: ${c.blood};
  --brand-560: ${c.ember};
  --mention-foreground: ${c.blood};
  --mention-background: ${a(c.blood, 0.15)};
  --info-danger-foreground: ${c.ember};
  --status-danger: ${c.ember};
  --button-danger-background: ${c.blood};
  --button-filled-brand-background: ${c.blood};
  --button-filled-brand-background-hover: ${c.ember};
  --button-filled-brand-text: ${c.midnight};
  --button-secondary-background: ${c.grave};
  --control-brand-foreground: ${c.blood};
  --focus-primary: ${c.blood};
  --border-subtle: ${c.grave};
  --border-faint: ${c.grave};
  --border-strong: ${c.ash};

  /* 2025 visual refresh */
  --background-base-lowest: ${c.midnight};
  --background-base-lower: ${c.crypt};
  --background-base-low: ${c.crypt};
  --background-surface-high: ${c.crypt};
  --background-surface-higher: ${c.grave};
  --background-surface-highest: ${c.tomb};
  --chat-background-default: ${c.midnight};
  --text-default: ${c.bone};
  --text-subtle: ${c.smoke};
  --text-strong: ${c.ivory};
  --icon-default: ${c.smoke};
  --icon-strong: ${c.ivory};
}

/* Monochrome role colors would break meaning; we only tint the user's own mentions in blood. */
::selection { background: ${a(c.blood, 0.35)}; color: ${c.ivory}; }
code, pre { font-family: 'JetBrains Mono', Consolas, monospace !important; }
.hljs-keyword, .hljs-built_in { color: ${c.ivory}; font-weight: 700; }
.hljs-string { color: ${c.blood}; }
.hljs-comment { color: ${c.fog}; font-style: italic; }
.hljs-title, .hljs-function { color: ${c.smoke}; }
.hljs-number, .hljs-literal { color: ${c.ivory}; }
`;
}

export function render({ variants, h, palette, config }) {
  return Object.fromEntries(variants.map((v) => [`stripes-${v.id}.theme.css`, css(v, h, palette, config)]));
}
