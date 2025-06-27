import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    dts: true,
    splitting: false,
    clean: true,
    target: 'es2022',
    format: ['esm', 'cjs'],
  },
  {
    entry: ['src/cli.ts'],
    format: ['esm'],
    target: 'es2022',
    external: ['chalk', 'perf_hooks', 'node:fs', 'node:path'],
    dts: false,
    clean: false,
  },
]);
