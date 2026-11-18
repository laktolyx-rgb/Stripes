# Releasing Stripes

## One-time setup

1. **GitHub repo:** create `laktolyx-rgb/Stripes` (public) and push `main`.
2. **Pages:** *Settings → Pages → Source: GitHub Actions*. The site deploys on every push to `main`.
3. **Discussions** (optional): *Settings → General → Features → Discussions*. The issue template links to them.
4. **Secrets** (*Settings → Secrets and variables → Actions*). Each one is optional: if a secret is missing, that store is skipped.

| Secret | Where to get it | Publishes |
|---|---|---|
| `VSCE_PAT` | Create the publisher **`stripes-theme`** at <https://marketplace.visualstudio.com/manage>, then an Azure DevOps PAT with scope *Marketplace → Manage* | VS Code Marketplace |
| `OVSX_PAT` | <https://open-vsx.org> → sign in with GitHub → *Access Tokens*. Then run `npx ovsx create-namespace stripes-theme -p <token>` once | Open VSX (VSCodium, Cursor, Windsurf) |
| `NPM_TOKEN` | Create the npm org **`stripes-theme`** (free), then an *Automation* or granular token with publish rights | `@stripes-theme/palette` |
| `JETBRAINS_TOKEN` | <https://plugins.jetbrains.com/author/me/tokens>. Upload the first version by hand once, then CI updates it | JetBrains Marketplace |

> Want a different publisher or npm scope? Edit `stripes.config.json` (and the package name in `packages/palette/package.json`), then run `npm run build`.

## Every release

```sh
npm run version:set -- 0.2.0       # bumps palette.json, the npm package and the VS Code changelog, then rebuilds
# write the changelog entry in templates/vscode/static/CHANGELOG.md, then run `npm run build`
git commit -am "release: v0.2.0"
git tag v0.2.0
git push --follow-tags
```

The `Release` workflow then:

1. checks that the tag matches `palette.json`, and runs validate, check and test;
2. publishes to the VS Code Marketplace, Open VSX, npm and JetBrains (each only if its secret exists);
3. renders the 16 wallpapers;
4. creates a GitHub Release with auto-generated notes and attaches the `.vsix`, the JetBrains `.zip`, the wallpapers and the terminal/app zips.

## Stores that need a pull request

These registries review each submission by hand and expect the theme at a repo root, so they use small mirror repos:

- **Zed:** PR to [zed-industries/extensions](https://github.com/zed-industries/extensions) adding this repo as a submodule with `path = "ports/zed"`.
- **Obsidian:** create `laktolyx-rgb/stripes-obsidian` with `theme.css`, `manifest.json` and a screenshot at its root (copy from `ports/obsidian`), then open a PR to [obsidianmd/obsidian-releases](https://github.com/obsidianmd/obsidian-releases) adding it to `community-css-themes.json`.
- **Neovim:** works straight from this repo (see `ports/nvim/README.md`). A `stripes.nvim` mirror with `lua/` and `colors/` at its root is optional and gives the shortest install line.
