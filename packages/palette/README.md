# @stripes-theme/palette

The official **Stripes** palette: gothic black & white with a single drop of blood.
Four variants: **Night**, **Bone** (light), **Void** (OLED) and **Blood** (high contrast, AAA).

```sh
npm i @stripes-theme/palette
```

## JavaScript / TypeScript

```js
import { variants } from '@stripes-theme/palette';

variants.night.colors.blood.hex;  // "#d15858"
variants.night.roles.keyword;     // { color: "ivory", hex: "#ffffff", bold: true, italic: false }
variants.bone.ansi.normal.red;    // "#a32b2b"
```

## CSS

```css
@import '@stripes-theme/palette/css';          /* every variant, Night by default */
/* or a single one: @import '@stripes-theme/palette/css/void.css'; */

body { background: var(--stripes-background); color: var(--stripes-foreground); }
a    { color: var(--stripes-accent); }
```

Switch variants with `<html data-stripes="bone">`. If no `data-stripes` is set, it follows the OS light/dark preference.

## Tailwind

**v4**

```css
@import "tailwindcss";
@import "@stripes-theme/palette/tailwind.css";
```

**v3**

```js
// tailwind.config.js
import stripes from '@stripes-theme/palette/tailwind';
export default { presets: [stripes] };
```

Classes: `bg-stripes-midnight text-stripes-bone border-stripes-blood/50`, which follow the active variant, or fixed colors like `text-stripes-void-blood`.

## Colors

| Name | Role | Night | Bone | Void | Blood |
|---|---|---|---|---|---|
| midnight | Background | `#101010` | `#ece7dc` | `#000000` | `#000000` |
| crypt | Panels | `#161616` | `#e3ddd0` | `#080808` | `#0a0a0a` |
| grave | Line / borders | `#1f1f1f` | `#d6cfbf` | `#121212` | `#1a1a1a` |
| tomb | Selection | `#2a2a2a` | `#c9c0ad` | `#1f1f1f` | `#3a0d0d` |
| ash | Guides (decoration) | `#5c5c5c` | `#a39a88` | `#4d4d4d` | `#8a8a8a` |
| fog | Comments | `#7f7f7f` | `#626262` | `#787878` | `#b3b3b3` |
| smoke | Functions | `#bdbdbd` | `#3d3d3d` | `#bdbdbd` | `#e0e0e0` |
| bone | Text | `#ececec` | `#1a1a1a` | `#ececec` | `#ffffff` |
| ivory | Keywords | `#ffffff` | `#000000` | `#ffffff` | `#ffffff` |
| blood | Accent / strings | `#d15858` | `#a32b2b` | `#d15858` | `#ff6b6b` |
| ember | Errors | `#e57373` | `#8f1f1f` | `#e57373` | `#ff8a8a` |
| scar | Accent background | `#3d1a1a` | `#e6c9c4` | `#2e0f0f` | `#4d0f0f` |

MIT
