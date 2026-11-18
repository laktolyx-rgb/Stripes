# r/unixporn

> **Important:** r/unixporn is for Linux/BSD/macOS desktops, so Windows screenshots get removed. The title must start with the WM/DE in brackets and the post must be a **screenshot of a real setup**. Options: a Linux VM (Fedora + Hyprland or GNOME), a friend's laptop, or a contributor's rice. Post the details as a **comment** within 20 minutes or the mods remove it.

## Title (pick one)

```
[Hyprland] Stripes: black & white, and one drop of blood
```
```
[GNOME] I made a stop-motion inspired gothic theme: everything is grayscale except the strings
```
```
[Hyprland] A theme in four acts: Night, Bone, Void, Blood (Ghostty + Neovim + Zed)
```

## Image

- A **full-screen screenshot** with the Stripes Night wallpaper (`stripes-night-2560x1440.png`), Ghostty with `fastfetch`, Neovim with code, and Zed or Obsidian in a corner.
- A second image showing all 4 variants (`assets/previews/*.png` in a grid) works well as a gallery.

## Details comment (paste right after posting)

```markdown
**Stripes**: a gothic theme where structure comes from brightness and type instead of hue. Everything is black & white; red only appears on strings, links and errors, so when you see it, it means something.

- **Theme:** Stripes Night (also Bone = light, Void = OLED black, Blood = high contrast/AAA)
- **WM:** Hyprland · **Bar:** Waybar · **Launcher:** fuzzel
- **Terminal:** Ghostty · **Shell:** fish · **Fetch:** fastfetch
- **Editor:** Neovim (Treesitter + LSP groups, lualine theme, Mortimer the cat on the dashboard) / Zed
- **Font:** JetBrains Mono
- **Wallpaper:** from the release, 16 of them (4 variants × 1080p/1440p/4K/phone)

Every port is generated from one `palette.json`, and CI fails the build if any text color drops below WCAG AA (AAA for the Blood variant), so the terminal and the editor can't drift apart.

Ports: VS Code, Neovim, Zed, JetBrains, Ghostty, Kitty, Alacritty, Windows Terminal, Obsidian, Discord. Adding a new app is one template file: `npm run new -- your-app`.

Repo: https://github.com/laktolyx-rgb/Stripes
Site + playground (paste your code, see it in all 4 variants): https://laktolyx-rgb.github.io/Stripes

Happy to take requests for ports. Waybar, rofi and Hyprland borders are next on my list.
```

## Likely questions → answers

- **"Isn't this just grayscale?"** → "Mostly, on purpose. Keywords are bold, comments are italic, constants are pure white, functions are mid-gray, and red is kept for strings. It reads surprisingly fast once your eyes adjust. The playground on the site lets you try it with your own code."
- **"Diffs must be unreadable."** → "Added lines are brighter and removed lines are red, so you still get the signal. Git decorations work the same way."
- **"Port for X?"** → "Not yet! It's one file. Here's the guide: `CONTRIBUTING.md`. Happy to review a PR or build it myself if you open an issue."
