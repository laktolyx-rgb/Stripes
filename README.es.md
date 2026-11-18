<p align="center">
  <img src="assets/banner.png" alt="Stripes: un tema en cuatro actos. Blanco y negro, y una gota de sangre." width="100%">
</p>

<p align="center">
  <a href="README.md">English</a> · <b>Español</b>
</p>

<p align="center">
  <a href="https://github.com/laktolyx-rgb/Stripes/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/laktolyx-rgb/Stripes/ci.yml?style=flat-square&label=build&labelColor=101010&color=d15858" alt="Build"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=stripes-theme.stripes"><img src="https://img.shields.io/badge/VS%20Code-Marketplace-ececec?style=flat-square&labelColor=101010&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PHBhdGggZD0iTTUgMSBDNSAxIDIgNSAyIDYuNSBhMyAzIDAgMCAwIDYgMCBDOCA1IDUgMSA1IDFaIiBmaWxsPSIjZDE1ODU4Ii8+PC9zdmc+" alt="VS Code Marketplace"></a>
  <a href="https://open-vsx.org/extension/stripes-theme/stripes"><img src="https://img.shields.io/open-vsx/v/stripes-theme/stripes?style=flat-square&label=Open%20VSX&labelColor=101010&color=ececec" alt="Open VSX"></a>
  <a href="https://www.npmjs.com/package/@stripes-theme/palette"><img src="https://img.shields.io/npm/v/@stripes-theme/palette?style=flat-square&label=npm&labelColor=101010&color=ececec" alt="npm"></a>
  <img src="https://img.shields.io/badge/WCAG-AA%20%E2%80%A2%20AAA-101010?style=flat-square&labelColor=101010&color=d15858" alt="WCAG AA / AAA">
  <a href="LICENSE"><img src="https://img.shields.io/badge/licencia-MIT-101010?style=flat-square&labelColor=101010&color=7f7f7f" alt="MIT"></a>
</p>

<p align="center"><i>Un tema gótico entintado a mano, como un stop-motion. Diez apps, cuatro variantes, una paleta.<br>Todo es blanco y negro, menos lo único que importa.</i></p>

<p align="center">
  <a href="https://laktolyx-rgb.github.io/Stripes"><b>Sitio y playground</b></a> ·
  <a href="#instalación">Instalación</a> ·
  <a href="#la-paleta">Paleta</a> ·
  <a href="CONTRIBUTING.md#español">Agrega una app</a>
</p>

<p align="center"><img src="assets/demo.gif" alt="Demo de Stripes: código escrito en Night, luego Bone, Void y Blood" width="720"></p>

## La película, en cuatro actos

| | |
|:---:|:---:|
| **Acto I: Night**<br><sub>El original. Carbón, hueso y sangre.</sub><br><img src="assets/previews/night.png" width="420"> | **Acto II: Bone**<br><sub>Pergamino viejo y tinta seca. La variante clara.</sub><br><img src="assets/previews/bone.png" width="420"> |
| **Acto III: Void**<br><sub>Negro `#000` real para OLED. Los píxeles duermen en sus ataúdes.</sub><br><img src="assets/previews/void.png" width="420"> | **Acto IV: Blood**<br><sub>Alto contraste. Cada token pasa WCAG AAA.</sub><br><img src="assets/previews/blood.png" width="420"> |

## Por qué Stripes

- **Un solo acento, usado a propósito.** La estructura sale del brillo y la tipografía: keywords en negrita, comentarios en cursiva, constantes en blanco. El rojo se guarda para strings, links y errores, así que cuando aparece significa algo.
- **Legible por ley.** El CI revisa cada color de texto contra WCAG en cada commit: AA en Night, Bone y Void, y AAA en Blood. Un cambio de paleta que empeore la legibilidad no entra.
- **Una paleta para todas las apps.** [`palette.json`](palette/palette.json) es la única fuente de colores. Los ports se generan, nunca se ajustan a mano, así que VS Code y tu terminal no se desincronizan.
- **Una marca, no una lista de hex.** Wallpapers, una mascota (hola, Mortimer), un [playground](https://laktolyx-rgb.github.io/Stripes#playground) y una [especificación](palette/spec.md) que dice qué va en cada lugar.

## Instalación

| App | Cómo |
|---|---|
| **VS Code** · Cursor · VSCodium | Marketplace / Open VSX: busca **Stripes**, luego `Ctrl+K Ctrl+T` → *Stripes Night*. ([detalles](ports/vscode)) |
| **Neovim** | lazy.nvim: `{ "laktolyx-rgb/Stripes", config = … }`, con Treesitter, LSP y 15 plugins. ([detalles](ports/nvim)) |
| **Zed** | Extensions → **Stripes** ([detalles](ports/zed)) |
| IDEs de **JetBrains** | Plugins → Marketplace → **Stripes** ([detalles](ports/jetbrains)) |
| **Ghostty** | `theme = dark:stripes-night,light:stripes-bone` ([detalles](ports/ghostty)) |
| **Kitty** | `include stripes-night.conf` ([detalles](ports/kitty)) |
| **Alacritty** | `import = ["stripes-night.toml"]` ([detalles](ports/alacritty)) |
| **Windows Terminal** | Copia `stripes.json` a la carpeta Fragments ([detalles](ports/windows-terminal)) |
| **Obsidian** | Temas de la comunidad → **Stripes**, con Style Settings para Void y Blood ([detalles](ports/obsidian)) |
| **Discord** | CSS para Vencord / BetterDiscord ([detalles](ports/discord)) |

Cada release incluye zips para terminales y apps, y **16 wallpapers** (4 variantes × 1080p, 1440p, 4K y móvil) en la [página de Releases](https://github.com/laktolyx-rgb/Stripes/releases).

> ¿No está tu app? Un port nuevo es un solo archivo. Mira [**Agrega una app**](CONTRIBUTING.md#español).

## La paleta

<img src="assets/previews/palette-night.png" alt="Paleta Night">
<img src="assets/previews/palette-bone.png" alt="Paleta Bone">

La tabla completa de hex de las 4 variantes está en el [README en inglés](README.md#the-palette) y en [`palette/palette.json`](palette/palette.json).

### Úsala en tu proyecto

```sh
npm i @stripes-theme/palette
```

```js
import { variants } from '@stripes-theme/palette';
variants.night.roles.keyword; // { color: 'ivory', hex: '#ffffff', bold: true, italic: false }
```

```css
@import '@stripes-theme/palette/css';            /* variables CSS, cambia con <html data-stripes="bone"> */
@import '@stripes-theme/palette/tailwind.css';   /* Tailwind v4: bg-stripes-midnight text-stripes-blood */
```

## Cómo está hecho

```
palette/palette.json ──► builder (valida WCAG) ──► templates/<app> ──► ports/<app>
                                                                   └─► sitio, wallpapers, GIF
```

```sh
npm install
npm run validate     # tabla de contraste por variante
npm run build        # paquete de paleta + todos los ports
npm run check        # CI: falla si ports/ no coincide con las plantillas
npm test
npm run site:dev     # la landing
npm run assets       # íconos, vistas previas, imagen social, wallpapers, GIF
```

## Créditos

Hecho por [@laktolyx-rgb](https://github.com/laktolyx-rgb) y la comunidad. Mortimer se interpreta a sí mismo.
Inspirado en el oficio del stop-motion hecho a mano y en las comunidades de temas open source que vinieron antes ([Catppuccin](https://github.com/catppuccin), [Dracula](https://github.com/dracula)).

MIT © Stripes contributors

<p align="center"><img src="assets/brand/mascot-1024.png" width="90" alt=""></p>
