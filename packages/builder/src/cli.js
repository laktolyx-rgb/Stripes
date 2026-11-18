#!/usr/bin/env node
// stripes <command>
//   validate [--verbose]   WCAG contrast check for every variant
import { validate, printReport } from './validate.js';

const [cmd, ...args] = process.argv.slice(2);

const commands = {
  validate() {
    const ok = printReport(validate(), { verbose: args.includes('--verbose') });
    process.exit(ok ? 0 : 1);
  },
};

if (!commands[cmd]) {
  console.log(`Usage: stripes <${Object.keys(commands).join('|')}>`);
  process.exit(cmd ? 1 : 0);
}
await commands[cmd]();
