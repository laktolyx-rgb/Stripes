# Stripes Specification

> Black and white, and one drop of blood. If everything is red, nothing is.

This document says how every Stripes port must use the palette. `palette.json` is the only source of truth: ports never hard-code hex values. They use **roles** (for example `keyword`), and each role resolves to a **color** (for example `ivory`) for each variant.

## Principles

1. **Monochrome first.** Structure comes from brightness and type style (bold, italic), not hue.
2. **One accent.** `blood` is the only saturated color. It marks strings, links, the active thing and the cursor line number. `ember` and `scar` are blood's tints, not new colors.
3. **Readable by law.** Every text role passes WCAG AA (4.5:1) against `background` and `backgroundAlt` in Night, Bone and Void, and AAA (7:1) in Blood. CI enforces this with `npm run validate`.
4. **Bold means language, italic means meta.** Keywords and tags are bold. Comments, types, parameters and attributes are italic.

## Variants

| Variant | Use | Target |
|---|---|---|
| Night | The original, charcoal `#101010` | AA |
| Bone | Light, old parchment | AA |
| Void | True black for OLED | AA |
| Blood | High contrast / low vision | AAA |

## Syntax mapping

| Token | Role | Color | Style |
|---|---|---|---|
| Keywords (`if`, `return`, `import`) | keyword | ivory | **bold** |
| Storage (`const`, `class`, `fn`) | storage | ivory | **bold** |
| Functions / methods | function | smoke | |
| Types / classes | type | bone | *italic* |
| Variables | variable | bone | |
| Parameters | parameter | bone | *italic* |
| Properties | property | smoke | |
| Constants / numbers / booleans | constant | ivory | |
| Strings | string | blood | |
| Regex / escapes | regex, escape | ember | escape **bold** |
| Operators | operator | smoke | |
| Punctuation | punctuation | fog | |
| Comments | comment | fog | *italic* |
| HTML/JSX tags | tag | ivory | **bold** |
| Attributes | attribute | smoke | *italic* |

## UI mapping

| Element | Color |
|---|---|
| Editor background | midnight |
| Sidebars, panels, statusline, terminal background | crypt |
| Current line, borders, inactive tabs | grave |
| Selection, hover | tomb |
| Indent guides, rulers, inactive line numbers | ash (decoration only, never text) |
| Active line number, cursor | ivory |
| Focus ring, active tab indicator, badges, links | blood |
| Search match, diff removed background | scar |
| Errors / diff removed | ember |
| Warnings | ivory (use an underline or an icon, never a new hue) |
| Diff added | bone on a lighter grave |

## Terminal (ANSI)

ANSI colors stay in greys, plus `red` and `magenta`, which use the blood family. `red` is always `blood`, so `git diff` and error output keep the brand. Each variant defines its 16 colors in `palette.json → variants.<id>.ansi`.

## Naming

Color names are the same in every variant, even when the value flips. In Bone, `midnight` is parchment and `bone` is ink. Names mean a **role in the scene**, not a literal color.
