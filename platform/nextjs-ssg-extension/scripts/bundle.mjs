// Bundles the pipeline CLI into dist/prepare.mjs. Bundling (rather than running
// the source with tsx) is required because snooty-ast-to-mdx has no
// "type": "module", so Node can't resolve its `export *` names from ESM.
import { build } from 'esbuild';

await build({
  entryPoints: ['src/cli/prepare.ts'],
  outfile: 'dist/prepare.mjs',
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'esm',
  logLevel: 'warning',
  // Optional mongodb driver dependencies that aren't installed.
  external: [
    'kerberos',
    'snappy',
    '@mongodb-js/zstd',
    'mongodb-client-encryption',
    'gcp-metadata',
    'socks',
    'aws4',
    '@aws-sdk/credential-providers',
  ],
  // Bundled CommonJS dependencies call require(), which ESM output lacks.
  banner: {
    js: "import { createRequire as __cr } from 'node:module'; const require = __cr(import.meta.url);",
  },
});
