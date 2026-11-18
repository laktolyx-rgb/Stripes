-- Stripes for Neovim
local M = {}

M.config = {
  variant = nil,            -- "night" | "bone" | "void" | "blood"; nil follows vim.o.background
  light_variant = "bone",
  dark_variant = "night",
  transparent = false,      -- don't paint the editor background
  dim_inactive = false,     -- inactive windows use crypt
  styles = {
    keywords = { bold = true },
    comments = { italic = true },
    types = { italic = true },
    parameters = { italic = true },
  },
  terminal_colors = true,
  on_highlights = nil,      -- function(hl, c) hl.Normal = { ... } end
}

function M.setup(opts)
  M.config = vim.tbl_deep_extend("force", M.config, opts or {})
end

function M.palette(variant)
  return require("stripes.palette")[variant]
end

function M.load(variant)
  variant = variant or M.config.variant
    or (vim.o.background == "light" and M.config.light_variant or M.config.dark_variant)
  local c = M.palette(variant)
  if not c then
    vim.notify("stripes: unknown variant " .. tostring(variant), vim.log.levels.ERROR)
    return
  end
  if vim.g.colors_name then vim.cmd("hi clear") end
  vim.o.termguicolors = true
  vim.o.background = c.dark and "dark" or "light"
  vim.g.colors_name = "stripes-" .. variant

  local hl = require("stripes.groups").get(c, M.config)
  if M.config.on_highlights then M.config.on_highlights(hl, c) end
  for group, spec in pairs(hl) do
    vim.api.nvim_set_hl(0, group, spec)
  end

  if M.config.terminal_colors then
    local order = { "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white" }
    for i, name in ipairs(order) do
      vim.g["terminal_color_" .. (i - 1)] = c.ansi.normal[name]
      vim.g["terminal_color_" .. (i + 7)] = c.ansi.bright[name]
    end
  end
end

return M
