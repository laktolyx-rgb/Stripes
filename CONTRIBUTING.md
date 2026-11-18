<p align="center"><img src="assets/brand/mascot-1024.png" width="120" alt="Mortimer"></p>

<h1 align="center">Contributing to Stripes</h1>

<p align="center"><a href="#english">English</a> · <a href="#español">Español</a></p>

---

## English

Thanks for wanting to haunt one more window. Most contributions are **new ports** (a theme for an app we don't support yet), and the repo is built so that adding one takes minutes, not days.

### How Stripes works (60 seconds)

```
palette/palette.json      ← the only source of colors (12 colors × 4 variants + ANSI + roles)
templates/<app>/          ← one folder per app: template.js + static/ files
ports/<app>/              ← GENERATED. Never edit by hand; CI rejects drift.
```

A template never hard-codes hex values. It asks for **roles** (`r.keyword`, `r.string`, `r.comment`…) and the builder fills them in for each variant. That is what keeps 10+ apps visually identical. Read [`palette/spec.md`](palette/spec.md) to see which role goes where.

### Add a new app in 5 steps

```sh
git clone https://github.com/laktolyx-rgb/Stripes && cd Stripes
npm install

npm run new -- my-app          # 1. scaffold templates/my-app/
#                                2. edit templates/my-app/template.js
npm run build -- my-app        # 3. generate ports/my-app/
#                                4. try it in the real app and take screenshots
npm test                       # 5. format checks + sync check
```

The scaffold gives you this, ready to edit:

```js
export const meta = {
  name: 'My App',
  category: 'terminal',          // editor | terminal | app
  homepage: 'https://example.com',
  install: 'Copy `stripes-night.conf` to `~/.config/my-app/`',
};

export function render({ variants, h, config }) {
  const files = {};
  for (const v of variants) {      // night, bone, void, blood
    const r = v.roles;
    files[`stripes-${v.id}.conf`] = `background ${r.background.hex}
foreground ${r.foreground.hex}
accent     ${r.accent.hex}`;
  }
  return files;                    // { 'path/in/ports/my-app': 'contents' }
}
```

**What you get in `render(ctx)`**

| | |
|---|---|
| `variants` | the 4 resolved variants. Each has `id`, `name`, `dark`, `colors.<name>.hex/rgb/hsl`, `roles.<role>.hex/bold/italic` and `ansi.normal/bright` |
| `variant('bone')` | a single variant |
| `h` | helpers: `noHash`, `rgbList`, `hex0x`, `withAlpha(hex, a)`, `mix(a, b, t)`, `contrast(a, b)`, `fontStyle(role)`, `json(obj)` |
| `config` | repo identity from `stripes.config.json` (`repoUrl`, `rawUrl`…) |

Handwritten files (Lua modules, images, a README) go in `templates/my-app/static/`. They are copied as-is, and text files can use `{{repoUrl}}`, `{{rawUrl}}` and `{{vscodeId}}` placeholders.

### Port checklist

- [ ] All 4 variants are generated (or, if the app takes one file, all 4 inside it)
- [ ] Only roles/palette colors are used: no new hues. Red is used **only** for strings, the accent and errors
- [ ] Keywords are bold, comments are italic (if the app supports it)
- [ ] `ports/my-app/README.md` explains how to install it
- [ ] Screenshots of Night and Bone are in the PR
- [ ] `npm test` passes

### Changing colors

Edit `palette/palette.json`, then run `npm run build`. The build **fails** if any text color drops below WCAG AA (AAA for Blood). That check is intentional, so don't work around it. Open an issue if you think a color should change.

### Other contributions

- **Bugs in an existing port:** fix `templates/<app>/`, not `ports/`.
- **Site:** `npm run site:dev` (in `site/`, built with Astro).
- **Assets:** `npm run assets` re-renders the icons, previews, social image, wallpapers and GIF with headless Chrome.

### Commits

Short and imperative: `feat(kitty): add tab bar colors`, `fix(vscode): diff colors in Bone`.

---

## Español

Gracias por querer embrujar una ventana más. La mayoría de las contribuciones son **ports nuevos** (el tema para una app que todavía no soportamos), y el repo está hecho para que agregar uno tome minutos, no días.

### Cómo funciona Stripes (60 segundos)

```
palette/palette.json      ← la única fuente de colores (12 colores × 4 variantes + ANSI + roles)
templates/<app>/          ← una carpeta por app: template.js + archivos static/
ports/<app>/              ← GENERADO. Nunca lo edites a mano; el CI rechaza diferencias.
```

Una plantilla nunca escribe colores fijos. Pide **roles** (`r.keyword`, `r.string`, `r.comment`…) y el builder los rellena para cada variante. Así las más de 10 apps se ven idénticas. Lee [`palette/spec.md`](palette/spec.md) para saber qué rol va en cada lugar.

### Agrega una app en 5 pasos

```sh
git clone https://github.com/laktolyx-rgb/Stripes && cd Stripes
npm install

npm run new -- mi-app          # 1. crea templates/mi-app/
#                                2. edita templates/mi-app/template.js
npm run build -- mi-app        # 3. genera ports/mi-app/
#                                4. pruébalo en la app real y toma capturas
npm test                       # 5. revisa formatos y sincronización
```

`render(ctx)` recibe `variants` (las 4 variantes con `colors`, `roles` y `ansi`), `variant('bone')`, los helpers `h` y `config`. La tabla de arriba, en inglés, tiene el detalle.

Los archivos escritos a mano (módulos Lua, imágenes, un README) van en `templates/mi-app/static/`. Se copian tal cual, y en los de texto puedes usar `{{repoUrl}}`, `{{rawUrl}}` y `{{vscodeId}}`.

### Checklist del port

- [ ] Se generan las 4 variantes (o, si la app usa un solo archivo, las 4 dentro de él)
- [ ] Solo se usan roles o colores de la paleta: nada de tonos nuevos. El rojo es **solo** para strings, el acento y los errores
- [ ] Keywords en negrita y comentarios en cursiva (si la app lo permite)
- [ ] `ports/mi-app/README.md` explica cómo instalarlo
- [ ] El PR incluye capturas de Night y Bone
- [ ] `npm test` pasa

### Cambiar colores

Edita `palette/palette.json` y corre `npm run build`. El build **falla** si un color de texto baja de WCAG AA (AAA en Blood). Ese control es intencional, así que no lo evites. Abre un issue si crees que un color debería cambiar.

### Otras contribuciones

- **Errores en un port existente:** corrige `templates/<app>/`, no `ports/`.
- **Sitio:** `npm run site:dev` (en `site/`, hecho con Astro).
- **Assets:** `npm run assets` vuelve a generar íconos, vistas previas, imagen para redes, wallpapers y el GIF con Chrome headless.
