#!/usr/bin/env node
import { timerify } from './index.js';
import path from 'path';
import { program } from 'commander';
import { pathToFileURL } from 'url';

program
  .argument('<module>', 'Path to module')
  .argument('[exportName]', 'Exported function name', 'default')
  .option('-m, --min <ms>', 'Minimum runtime (ms) to log', v => parseFloat(v))
  .option('--json', ' Output JSON instead of human-readable log')
  .parse();

const opts = program.opts<{ min?: number; json?: boolean }>();
const [modulePathRaw, exportName] = program.args;

const modulePath = path.resolve(process.cwd(), modulePathRaw);
const mod = await import(pathToFileURL(modulePath).toString());
const fn = mod[exportName];

if (typeof fn !== 'function') {
  console.error('Specified export is not a function');
  process.exit(1);
}

const logger = opts.json
  ? (info: { name: string; ms: number }) => console.log(JSON.stringify(info))
  : undefined;

await timerify(fn, exportName, { min: opts.min, logger })();
