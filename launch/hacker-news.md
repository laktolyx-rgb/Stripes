# Show HN

> HN rewards substance and punishes marketing. Plain title, no emojis, no superlatives. The interesting part for this audience is the **system**: one palette, generated ports, contrast enforced in CI. Lead with that, not with the cat.
>
> Post **Tuesday–Thursday, 8–10 a.m. US Eastern**. Submit the **repo URL** (not the site), then immediately add the first comment below. Stay and reply for the first 2–3 hours.

## Title

```
Show HN: Stripes – a monochrome theme generated for 10 apps, contrast-checked in CI
```

(Alternative: `Show HN: Stripes – one palette.json, ten editor/terminal themes, WCAG enforced`)

## URL

```
https://github.com/laktolyx-rgb/Stripes
```

## First comment (post it yourself right after submitting)

```
Hi HN. Stripes is a theme I built around one constraint: everything is black and white except one accent color, and that color has to mean something (strings, links, errors).

The part I think is interesting is how it's put together:

- There is one palette.json: 12 named colors × 4 variants (dark, light, OLED black, high contrast), 16 ANSI colors per variant, and a table of semantic roles (keyword → ivory+bold, comment → fog+italic, …).

- Each app port is a small JS module that only sees roles, never hex values. A zero-dependency builder renders all of them into ports/, and `npm run check` fails CI if anyone edits generated files by hand or forgets to rebuild. Right now that covers VS Code, Neovim, Zed, JetBrains, Ghostty, Kitty, Alacritty, Windows Terminal, Obsidian and Discord.

- A validator computes WCAG contrast for every text role against every surface it can appear on. The build fails below 4.5:1 (7:1 for the high-contrast variant). The original accent I picked (#c94c4c) failed on panel backgrounds at 4.41:1, which is how it ended up as #d15858 (Night's later, lighter slate base pushed it to #f58080 for the same reason).

- The landing page's playground uses Shiki with the generated VS Code theme JSON, so the preview is the real thing.

Things I'd like feedback on: whether a nearly hue-free theme holds up for long sessions in your language of choice, and how people handle per-app quirks (JetBrains' scheme format was the most painful).

Site/playground: https://laktolyx-rgb.github.io/Stripes
```

## Prepared answers

- **"Monochrome themes are hard to read."** → Grant the trade-off honestly, then point to the playground and the Blood variant. "The bet is that weight and italics carry more structure than people expect. It doesn't work for everyone, which is why the playground exists."
- **"Why not just use X (base16, etc.)?"** → "Base16 maps 16 slots positionally. Here the templates ask for semantic roles, which let me enforce 'red only for strings/errors' across apps. A base16 export would be easy to add though."
- **"Did you use AI?"** → Answer honestly and specifically about what you did and what tools helped.
- **Bug reports in comments** → "Thanks, opened #N," with a link. It reads well and keeps the thread friendly.
