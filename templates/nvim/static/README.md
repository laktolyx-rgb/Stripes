# Stripes for Neovim

Requires Neovim 0.9+.

## lazy.nvim

```lua
{
  "{{slug}}",
  name = "stripes",
  lazy = false,
  priority = 1000,
  config = function(plugin)
    vim.opt.rtp:append(plugin.dir .. "/ports/nvim")
    require("stripes").setup({
      variant = "night",        -- night | bone | void | blood (nil = follow 'background')
      transparent = false,
      dim_inactive = false,
      styles = { comments = { italic = true }, keywords = { bold = true } },
      on_highlights = function(hl, c)
        -- hl.LineNr = { fg = c.fog }
      end,
    })
    vim.cmd.colorscheme("stripes")
  end,
}
```

Commands: `:colorscheme stripes-night`, `stripes-bone`, `stripes-void`, `stripes-blood`.

lualine: `options = { theme = "stripes" }`.

Dashboard art: `require("stripes.mortimer").header` (snacks) or `.lines` (alpha).

Supports Treesitter, LSP semantic tokens, diagnostics, gitsigns, telescope, nvim-tree, neo-tree, which-key, indent-blankline, nvim-cmp, blink.cmp, mini, notify, lazy and snacks.
