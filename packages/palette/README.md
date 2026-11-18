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
| midnight | Background | `#2b323c` | `#ece7dc` | `#000000` | `#2a0a0d` |
| crypt | Panels | `#323a45` | `#e3ddd0` | `#080808` | `#320c10` |
| grave | Line / borders | `#3d4652` | `#d6cfbf` | `#121212` | `#46131a` |
| tomb | Selection | `#4a5463` | `#c9c0ad` | `#1f1f1f` | `#5e1a22` |
| ash | Guides (decoration) | `#6f7a89` | `#a39a88` | `#4d4d4d` | `#8a8a8a` |
| fog | Comments | `#a3acb8` | `#626262` | `#787878` | `#b3b3b3` |
| smoke | Functions | `#d0d5dc` | `#3d3d3d` | `#bdbdbd` | `#e0e0e0` |
| bone | Text | `#eef0f3` | `#1a1a1a` | `#ececec` | `#ffffff` |
| ivory | Keywords | `#ffffff` | `#000000` | `#ffffff` | `#ffffff` |
| blood | Accent / strings | `#f58080` | `#a32b2b` | `#d15858` | `#ff8080` |
| ember | Errors | `#ff9c9c` | `#8f1f1f` | `#e57373` | `#ff9e9e` |
| scar | Accent background | `#5a2c33` | `#e6c9c4` | `#2e0f0f` | `#701d26` |

MIT
