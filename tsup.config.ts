import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: [
    'src/index.ts',
    'src/hooks/index.ts',
  ],
  dts: true,
  sourcemap: true,
  clean: true,
  format: ["esm", "cjs"],
});
