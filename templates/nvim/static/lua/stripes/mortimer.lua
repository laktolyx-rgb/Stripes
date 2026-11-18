-- Mortimer, the Stripes cat, for dashboards.
--   snacks.nvim: dashboard = { preset = { header = require("stripes.mortimer").header } }
--   alpha.nvim:  dashboard.section.header.val = require("stripes.mortimer").lines
local M = {}

M.lines = {
  [[    /\         /\                 ]],
  [[   /  \_______/  \                ]],
  [[  |   ___   ___   |               ]],
  [[  |  ( o ) ( o )  |       __      ]],
  [[  |    \_____/    |      /  \     ]],
  [[   \   |+|+|+|   /      |  /      ]],
  [[    \___________/       | |       ]],
  [[       |  ~  |          | |       ]],
  [[       | -+- |      ____/ /       ]],
  [[       |  +  |     (_____/        ]],
  [[      _|_____|_                   ]],
  [[                                  ]],
  [[  S T R I P E S                   ]],
  [[  black & white, one drop of blood]],
}

M.header = table.concat(M.lines, "\n")

return M
