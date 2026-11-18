#!/usr/bin/env node
// stripes <command>
//   validate [--verbose]   WCAG contrast check for every variant
//   build [app...]         render templates/ into ports/
//   check [app...]         fail if ports/ is out of date with palette + templates
//   new <app>              scaffold templates/<app>/ for a new port
//   list                   list available templates
import { validate, printReport } from './validate.js';
import { build, check, listApps, scaffold } from './build.js';

const [cmd, ...args] = process.argv.slice(2);
const apps = () => {
  const names = args.filter((a) => !a.startsWith('--'));
  const unknown = names.filter((n) => !listApps().includes(n));
  if (unknown.length) { console.error(`Unknown app(s): ${unknown.join(', ')}`); process.exit(1); }
  return names.length ? names : listApps();
};

const commands = {
  validate() {
    const ok = printReport(validate(), { verbose: args.includes('--verbose') });
    process.exit(ok ? 0 : 1);
  },
  async build() {
    const ok = printReport(validate());
    if (!ok) process.exit(1);
    const done = await build(apps());
    console.log(`\n  Built ${done.length} ports into ports/\n`);
  },
  async check() {
    const problems = await check(apps());
    if (problems.length) {
      console.error('ports/ is out of date. Run `npm run build` and commit:\n  ' + problems.join('\n  '));
      process.exit(1);
    }
    console.log('  ports/ is up to date');
  },
  new() {
    const [app] = args;
    if (!app || !/^[a-z0-9-]+$/.test(app)) { console.error('Usage: stripes new <app-id>  (lowercase, dashes)'); process.exit(1); }
    console.log(`  Created ${scaffold(app)}\n  Next: edit template.js, then run \`npm run build -- ${app}\``);
  },
  list() { console.log(listApps().join('\n')); },
};

if (!commands[cmd]) {
  console.log(`Usage: stripes <${Object.keys(commands).join('|')}>`);
  process.exit(cmd ? 1 : 0);
}
await commands[cmd]();
