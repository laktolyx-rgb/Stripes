# r/vscode

> r/vscode allows theme posts with an image or GIF. Upload `assets/demo.gif` directly (don't link it). It autoplays in the feed and does most of the work.

## Title (pick one)

```
I made a black & white VS Code theme where red only means something (4 variants, WCAG-checked)
```
```
Stripes: a stop-motion inspired gothic theme. Night, Bone (light), Void (OLED) and Blood (AAA contrast)
```

## Body

```markdown
I wanted a theme where color carries meaning instead of decoration, so Stripes is almost entirely black and white:

- **keywords** → bold white
- **functions** → light gray
- **types & params** → italic
- **comments** → dim gray italic
- **strings** → the only red on screen

It comes in four variants:

| | |
|---|---|
| **Night** | the original, light industrial slate `#2b323c` |
| **Bone** | light: warm parchment + dried ink |
| **Void** | true `#000000` black for OLED |
| **Blood** | deep oxblood, high contrast, every token passes WCAG AAA |

A few details I cared about:

- CI checks every text color for contrast (AA, or AAA for Blood). A color change that hurts legibility can't be merged.
- The whole workbench is themed, not just the syntax: diff editor, merge conflicts, terminal ANSI, git decorations, semantic tokens.
- The same palette generates ports for Neovim, Zed, JetBrains, Ghostty, Kitty, Alacritty, Windows Terminal, Obsidian and Discord.

**Install:** search "Stripes" in Extensions (also on Open VSX for VSCodium/Cursor).
**Try it with your own code first:** https://laktolyx-rgb.github.io/Stripes#playground
**Source (MIT):** https://github.com/laktolyx-rgb/Stripes

Feedback on specific languages is very welcome. If something looks off in your stack, a screenshot in an issue helps a ton.
```

## Cross-post variants

**r/neovim**: title `stripes.nvim: a gothic black & white colorscheme with Treesitter/LSP groups and a dashboard cat`. Lead the body with the lazy.nvim snippet and `setup()` options (`transparent`, `dim_inactive`, `styles`, `on_highlights`), and list the 15 supported plugins.

**r/ObsidianMD**: title `Stripes: a gothic black & white theme with striped headings (Night/Bone + Void/Blood via Style Settings)`. Attach a screenshot of a note with headings, a callout and the graph view.
