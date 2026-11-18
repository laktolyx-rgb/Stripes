-- lualine theme: require("lualine").setup({ options = { theme = "stripes" } })
local variant = (vim.g.colors_name or "stripes-night"):gsub("^stripes%-", "")
local palettes = require("stripes.palette")
local c = palettes[variant] or palettes.night

local function mode(bgc)
  return {
    a = { fg = c.midnight, bg = bgc, gui = "bold" },
    b = { fg = c.bone, bg = c.tomb },
    c = { fg = c.smoke, bg = c.crypt },
  }
end

return {
  normal = mode(c.ivory),
  insert = mode(c.blood),
  visual = mode(c.smoke),
  replace = mode(c.ember),
  command = mode(c.fog),
  terminal = mode(c.blood),
  inactive = {
    a = { fg = c.fog, bg = c.crypt },
    b = { fg = c.fog, bg = c.crypt },
    c = { fg = c.fog, bg = c.crypt },
  },
}
