# Stripes for Windows Terminal

## Option A: fragment (automatic)

```powershell
$dir = "$env:LOCALAPPDATA\Microsoft\Windows Terminal\Fragments\Stripes"
New-Item -ItemType Directory -Force $dir
Copy-Item stripes.json $dir
```

Restart Windows Terminal, then pick **Stripes Night** under *Profile → Appearance → Color scheme*, and the matching *theme* under *Appearance*.

## Option B: manual

Paste one of `schemes/*.json` into the `"schemes"` array of `settings.json`.
