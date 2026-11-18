# TikTok: 3 ideas

Todas en formato vertical 1080×1920 y en menos de 35 segundos, con el gancho en los primeros 2 segundos y subtítulos quemados (en tu estilo: Montserrat y la palabra activa resaltada, pero aquí en **rojo sangre `#d15858`** en vez de amarillo). Los clips del sitio se graban con OBS a 60 fps en la página real.

---

## 1. "Mi editor es una película muda" (el más viral)

**Gancho (0–2 s):** pantalla negra con un intertítulo de cine mudo que dice *"Act I"*, ruido de proyector y luego un corte seco al código.

| Tiempo | Toma | Texto en pantalla |
|---|---|---|
| 0–2 s | Intertítulo "Act I · Night" (sale tal cual del sitio) | **"le puse a mi editor un tema de película muda"** |
| 2–7 s | Código escribiéndose en Night (`assets/demo.gif` reencuadrado en vertical) | "todo blanco y negro…" |
| 7–9 s | Zoom al primer string rojo | **"…excepto los strings 🩸"** |
| 9–20 s | Cada **beat** de la canción cambia de variante con su intertítulo: Bone, Void, Blood | "Bone" · "Void" · "Blood" |
| 20–28 s | Scroll por el sitio: Mortimer parpadeando, el pueblo, la luna | "y sí, tiene un gato" |
| 28–32 s | Pantalla final con el logo | "link en mi perfil · es gratis" |

- **Audio:** algo oscuro y rítmico con drops marcados (tipo phonk lento o un remix gótico en tendencia). Corta en cada golpe, igual que en tu edit de anime.
- **Caption:** `mi código ahora es una película de terror en blanco y negro 🩸 tema gratis para VS Code, Neovim y 8 apps más #programacion #vscode #setup #darkmode #coding`
- **Producción:** puedes reutilizar tu pipeline de `edit_anime.py` para el zoom punch y el flash en cada beat.

---

## 2. "POV: son las 3 a.m. y tu código te observa" (sketch)

**Gancho:** tu cara iluminada solo por el monitor, en la oscuridad. Lo que se ve en el monitor es Stripes Void.

| Tiempo | Toma | Texto |
|---|---|---|
| 0–3 s | Tú programando a oscuras, cámara lenta | **"POV: 3:00 a.m."** |
| 3–6 s | Plano del monitor: un error aparece en rojo | "algo rojo apareció en mi código" |
| 6–10 s | Zoom lento al error mientras la música se detiene | (silencio) |
| 10–13 s | Corte a Mortimer (del sitio) mirando a cámara y parpadeando | **"no estaba solo"** |
| 13–20 s | Revelación: "es mi tema, el rojo solo sale en errores y strings" y recorrido rápido por las 4 variantes | "el rojo solo aparece cuando importa" |
| 20–25 s | Logo y CTA | "se llama Stripes · link en bio" |

- **Audio:** sonido ambiente de suspenso y un *jump-scare* suave en el corte al gato. Después, música en tendencia.
- **Caption:** `nunca programes a las 3am con este tema 😶 #programador #codinglife #humorprogramador #vscode #terror`
- Funciona como serie: "POV: 3 a.m. parte 2" con otra variante.

---

## 3. "Hice un tema para 10 apps en una semana" (proceso, para crecer seguidores dev)

**Gancho:** pantalla dividida con el antes (un tema genérico) y el después (Stripes Night), y el texto **"de esto… a esto"**.

| Tiempo | Toma | Texto |
|---|---|---|
| 0–2 s | Antes/después dividido | **"de esto a esto en una semana"** |
| 2–6 s | El `palette.json` con los 12 colores | "empecé con solo 12 colores" |
| 6–10 s | Terminal corriendo `npm run validate` y la tabla en verde | "un test revisa que todo se pueda leer" |
| 10–13 s | Corte con el error real del rojo #c94c4c reprobando | "mi rojo favorito reprobó 😭" |
| 13–20 s | `npm run build` y aparecen las 10 apps (montaje rápido: VS Code, Neovim, Zed, Ghostty, Obsidian, Discord) | "un comando = 10 apps" |
| 20–27 s | El sitio: el pueblo, Mortimer, los boletos "ADMIT ONE" | "y le hice una web de película" |
| 27–30 s | Cierre | "¿qué app le falta? 👇" |

- **Audio:** lo-fi o una canción motivacional en tendencia; la voz en off es opcional (con tu voz, o ElevenLabs con una voz premade si prefieres no hablar).
- **Caption:** `construí mi propio tema de colores y ahora funciona en 10 apps 🖤🩸 ¿cuál agrego? #programacion #desarrolloweb #opensource #vscode #neovim`
- **El CTA de comentarios genera ideas de ports** y cada port nuevo es material para otro video ("me pidieron X, aquí está").

---

## Assets que ya tienes

| Asset | Ruta |
|---|---|
| GIF de las 4 variantes con intertítulos | `assets/demo.gif` |
| Escena del pueblo (vectorial, se escala a vertical sin perder calidad) | `assets/brand/scene.svg` |
| Mortimer en PNG transparente | `assets/brand/mascot-1024.png` |
| Wallpapers verticales (perfectos de fondo) | `assets/wallpapers/*/stripes-*-1170x2532.png` |
| Vistas previas del código | `assets/previews/*.png` |

> Si quieres, puedo armar el video #1 automáticamente con tu pipeline: capturo el sitio con Chrome headless en 1080×1920 y lo sincronizo a la canción que elijas.
