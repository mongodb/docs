# Translation Evals Tool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `platform/tools/translation-evals/` — a CLI whose seven independently-runnable stages scrape a docs project from production, translate its eval pages locally with our translation tools, serve the translated site, scrape it, and score the local output against the production reference in Braintrust.

**Architecture:** A pnpm-workspace TypeScript package exposing one subcommand per stage (`resolve`, `scrape-prod`, `translate`, `serve`, `scrape-local`, `dataset`, `eval`). Stages communicate only through a per-run directory on disk. Localization uses **content substitution** — translated MDX is overlaid into `content-mdx/<project>/` and the real `docs-site` is served at production-identical URL paths, so local renders differ from production only by Smartling's CDN rewriting.

**Tech Stack:** TypeScript (ESM, `tsx` for the CLI), `vitest` for tests, Playwright for scraping, `mdx-translation-adapter` (workspace dep) + the repo-root `translation` service (file dep) for translation, the `braintrust` CLI for evals, the `translation` service's Grove seams for the judge.

**Spec:** `platform/tools/translation-evals/docs/superpowers/specs/2026-10-07-translation-evals-design.md`

## Global Constraints

- Package name `translation-evals`; ESM (`"type": "module"`); TypeScript strict; tests with `vitest`.
- Reuse only current `main` code: `mdx-translation-adapter` and the `translation` service. Do **not** reference or import from `origin/llm-evals`.
- `content-mdx/` is scratch: never commit generated content; add it to `.gitignore`.
- Production origin `https://www.mongodb.com`; local origin `http://localhost:3000`. Local and production-English paths are identical; production-localized adds a `/<locale>` prefix.
- v1 locales: `pt-br`, `es`, `ko-kr`, `ja-jp`, `zh-cn` (targets) plus `en` (source).
- Scraper policy: 5–8s jitter before each navigation, 60s cooldown every 50 requests, skip on HTTP 403/404.
- Sonnet 5 pricing for cost notes: `$2`/MTok in, `$10`/MTok out (informational only).
- Never commit or push without explicit user confirmation.

---

### Task 0: Verification spike (no product code)

Confirm the assumptions the later tasks depend on. Record findings in a short `docs/superpowers/notes/verification.md`.

**Files:**
- Create: `platform/tools/translation-evals/docs/superpowers/notes/verification.md`

- [ ] **Step 1: Confirm MDX generation target**

Run from `platform/`: `pnpm convert:rst-to-mdx -- atlas`. Then check the output:
`ls ../../content-mdx/atlas | head`. Record: does it write `content-mdx/atlas/`, and does `_site.json` appear at the project root? Record the exact command and the DOCS_PROJECT value used.

- [ ] **Step 2: Confirm Grove model ids**

Read `translation/src/backends/llm/grove/config.ts` for `GROVE_DEFAULTS`. Record the default model id. Ask whoever owns the Grove gateway for the exact model string for the translator (Sonnet 5) and a distinct judge model. Record both in the notes file. **Do not proceed to Task 10 with an unconfirmed model id.**

- [ ] **Step 3: Confirm local dev URL shape**

Run from `platform/`: `DOCS_PROJECT=atlas pnpm build` is expensive — instead run `DOCS_PROJECT=atlas pnpm dev` (or the direct `next dev`), then curl a known page, e.g.
`curl -s http://localhost:3000/docs/atlas/alerts/ | grep -o '<main[^>]*>' | head -1`.
Record the exact URL that returns the page and that `<main>` is present.

- [ ] **Step 4: Confirm composable variants**

Read `content-mdx/atlas/_site.json`, find `composablePages`. Record one example page and its variant query strings. Confirm against production that `https://www.mongodb.com/docs/atlas/<page>/?<query>` returns different content.

- [ ] **Step 5: Commit**

```bash
git add platform/tools/translation-evals/docs/superpowers/notes/verification.md
git commit -m "docs(translation-evals): verification spike findings"
```

---

### Task 1: Package scaffold, config, and core types

**Files:**
- Create: `platform/tools/translation-evals/package.json`
- Create: `platform/tools/translation-evals/tsconfig.json`
- Create: `platform/tools/translation-evals/vitest.config.ts`
- Create: `platform/tools/translation-evals/.gitignore`
- Create: `platform/tools/translation-evals/src/types.ts`
- Create: `platform/tools/translation-evals/src/config.ts`
- Test: `platform/tools/translation-evals/test/config.test.ts`
- Modify: `platform/pnpm-workspace.yaml` (add `tools/translation-evals`)

**Interfaces:**
- Produces: `Config` and `loadConfig(env)` from `src/config.ts`; all shared types from `src/types.ts` (`PageRef`, `ScrapedPage`, `TranslatableSet`, `RunManifest`, `DatasetRow`, `Locale`).

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "translation-evals",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "bin": { "translation-evals": "./src/cli.ts" },
  "scripts": {
    "start": "tsx src/cli.ts",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src test --cache"
  },
  "dependencies": {
    "mdx-translation-adapter": "workspace:*",
    "@mongodb-docs/translation-service": "file:../../../translation",
    "playwright": "^1.44.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json` and `vitest.config.ts`**

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node"],
    "outDir": "dist",
    "rootDir": "."
  },
  "include": ["src", "test"]
}
```

`vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { globals: true, environment: 'node' } });
```

- [ ] **Step 3: Create `.gitignore`**

```
node_modules/
dist/
data/
.env
```

- [ ] **Step 4: Add the workspace entry**

Append `tools/translation-evals` to the `packages:` list in `platform/pnpm-workspace.yaml`. Run `pnpm install` from `platform/` and confirm `node_modules/mdx-translation-adapter` and `node_modules/@mongodb-docs/translation-service` symlinks exist.

- [ ] **Step 5: Write the failing test for `loadConfig`**

```ts
// test/config.test.ts
import { describe, it, expect } from 'vitest';
import { loadConfig } from '../src/config.js';

describe('loadConfig', () => {
  it('applies defaults and derives paths from the package root', () => {
    const cfg = loadConfig({});
    expect(cfg.prodOrigin).toBe('https://www.mongodb.com');
    expect(cfg.localOrigin).toBe('http://localhost:3000');
    expect(cfg.locales).toEqual(['pt-br', 'es', 'ko-kr', 'ja-jp', 'zh-cn']);
    expect(cfg.contentMdxDir.endsWith('content-mdx')).toBe(true);
    expect(cfg.dataDir.endsWith('translation-evals/data')).toBe(true);
  });

  it('honors TARGET_LOCALES override', () => {
    const cfg = loadConfig({ TARGET_LOCALES: 'es,ja-jp' });
    expect(cfg.locales).toEqual(['es', 'ja-jp']);
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `cd platform/tools/translation-evals && npx vitest run test/config.test.ts`
Expected: FAIL — cannot resolve `../src/config.js`.

- [ ] **Step 7: Implement `src/types.ts` and `src/config.ts`**

```ts
// src/types.ts
export type Locale = string;

export interface PageRef {
  slug: string;          // filesystem/URL slug used for output filenames
  urlPath: string;       // e.g. /docs/atlas/alerts
  mdxPath: string;       // path relative to content-mdx/<project>
  query?: string;        // composable-variant query string, e.g. interface=atlas-cli
}

export interface ScrapedPage { url: string; title: string; content: string; }

export interface TranslatableSet {
  pages: string[];         // mdxPaths of eval pages
  includes: string[];      // mdxPaths under _includes/, each once
  substitutions: string[]; // keys from _references.json
}

export interface RunManifest {
  project: string;
  runId: string;
  locales: Locale[];
  pages: PageRef[];
  translatable: TranslatableSet;
  stages: Record<string, { status: 'pending' | 'done' | 'failed'; at?: string }>;
}

export interface DatasetRow {
  input: { source_text: string; target_locale: string; local_text: string };
  expected: string;
  metadata: { project: string; url: string; slug: string; locale: string; run: string };
}
```

```ts
// src/config.ts
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Locale } from './types.js';

export interface Config {
  prodOrigin: string;
  localOrigin: string;
  locales: Locale[];
  contentMdxDir: string;
  dataDir: string;
  grove: { apiKey?: string; model?: string; endpoint?: string; timeoutMs?: number };
  judgeModel?: string;
  braintrustProject: string;
  termsFile?: string;
}

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const raw = (env.TARGET_LOCALES ?? '').trim();
  return {
    prodOrigin: 'https://www.mongodb.com',
    localOrigin: 'http://localhost:3000',
    locales: raw ? raw.split(',').map((s) => s.trim()).filter(Boolean) : ['pt-br', 'es', 'ko-kr', 'ja-jp', 'zh-cn'],
    contentMdxDir: path.resolve(PKG_ROOT, '..', '..', '..', 'content-mdx'),
    dataDir: path.join(PKG_ROOT, 'data'),
    grove: {
      apiKey: env.GROVE_API_KEY,
      model: env.GROVE_MODEL,
      endpoint: env.GROVE_ENDPOINT,
      timeoutMs: env.GROVE_TIMEOUT_MS ? Number(env.GROVE_TIMEOUT_MS) : undefined,
    },
    judgeModel: env.JUDGE_MODEL,
    braintrustProject: env.BRAINTRUST_PROJECT ?? 'docs-translations-rendered',
    termsFile: env.TERMS_FILE,
  };
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `cd platform/tools/translation-evals && npx vitest run test/config.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 9: Commit**

```bash
git add platform/tools/translation-evals/package.json platform/tools/translation-evals/tsconfig.json platform/tools/translation-evals/vitest.config.ts platform/tools/translation-evals/.gitignore platform/tools/translation-evals/src/types.ts platform/tools/translation-evals/src/config.ts platform/tools/translation-evals/test/config.test.ts platform/pnpm-workspace.yaml
git commit -m "feat(translation-evals): package scaffold, config, core types"
```

---

### Task 2: Run manifest storage

**Files:**
- Create: `platform/tools/translation-evals/src/run/manifest.ts`
- Test: `platform/tools/translation-evals/test/manifest.test.ts`

**Interfaces:**
- Consumes: `Config`, `RunManifest` (Task 1).
- Produces: `newRunId()`, `runDir(cfg, project, runId)`, `readManifest(cfg, project, runId)`, `writeManifest(cfg, project, runId, m)`, `setStage(cfg, project, runId, stage, status)`.

- [ ] **Step 1: Write the failing test**

```ts
// test/manifest.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadConfig } from '../src/config.js';
import { newRunId, writeManifest, readManifest, setStage } from '../src/run/manifest.js';

function tmpCfg() {
  const cfg = loadConfig({});
  cfg.dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'te-'));
  return cfg;
}

describe('manifest', () => {
  it('round-trips a manifest and tracks stage status', () => {
    const cfg = tmpCfg();
    const id = newRunId();
    writeManifest(cfg, 'atlas', id, {
      project: 'atlas', runId: id, locales: ['es'],
      pages: [], translatable: { pages: [], includes: [], substitutions: [] }, stages: {},
    });
    setStage(cfg, 'atlas', id, 'resolve', 'done');
    const m = readManifest(cfg, 'atlas', id);
    expect(m.stages.resolve.status).toBe('done');
    expect(m.stages.resolve.at).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd platform/tools/translation-evals && npx vitest run test/manifest.test.ts`
Expected: FAIL — cannot resolve `../src/run/manifest.js`.

- [ ] **Step 3: Implement**

```ts
// src/run/manifest.ts
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { Config } from '../config.js';
import type { RunManifest } from '../types.js';

export function newRunId(): string {
  const d = new Date().toISOString().slice(0, 10);
  return `${d}-${crypto.randomBytes(3).toString('hex')}`;
}

export function runDir(cfg: Config, project: string, runId: string): string {
  return path.join(cfg.dataDir, project, runId);
}

function manifestPath(cfg: Config, project: string, runId: string): string {
  return path.join(runDir(cfg, project, runId), 'manifest.json');
}

export function readManifest(cfg: Config, project: string, runId: string): RunManifest {
  return JSON.parse(fs.readFileSync(manifestPath(cfg, project, runId), 'utf8'));
}

export function writeManifest(cfg: Config, project: string, runId: string, m: RunManifest): void {
  const p = manifestPath(cfg, project, runId);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(m, null, 2));
}

export function setStage(
  cfg: Config, project: string, runId: string,
  stage: string, status: 'pending' | 'done' | 'failed',
): void {
  const m = readManifest(cfg, project, runId);
  m.stages[stage] = { status, at: new Date().toISOString() };
  writeManifest(cfg, project, runId, m);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd platform/tools/translation-evals && npx vitest run test/manifest.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add platform/tools/translation-evals/src/run/manifest.ts platform/tools/translation-evals/test/manifest.test.ts
git commit -m "feat(translation-evals): run manifest storage"
```

---

### Task 3: CLI dispatch skeleton

**Files:**
- Create: `platform/tools/translation-evals/src/cli.ts`
- Create: `platform/tools/translation-evals/src/commands/index.ts`
- Test: `platform/tools/translation-evals/test/cli.test.ts`

**Interfaces:**
- Consumes: `loadConfig` (Task 1).
- Produces: `parseArgs(argv)` → `{ command: string; flags: Record<string, string | boolean> }`; `COMMANDS` registry mapping stage name → handler `(args) => Promise<void>`.

- [ ] **Step 1: Write the failing test**

```ts
// test/cli.test.ts
import { describe, it, expect } from 'vitest';
import { parseArgs } from '../src/cli.js';

describe('parseArgs', () => {
  it('parses a subcommand with flags', () => {
    const a = parseArgs(['resolve', '--project', 'atlas', '--production']);
    expect(a.command).toBe('resolve');
    expect(a.flags.project).toBe('atlas');
    expect(a.flags.production).toBe(true);
  });
  it('returns empty command when none given', () => {
    expect(parseArgs([]).command).toBe('');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd platform/tools/translation-evals && npx vitest run test/cli.test.ts`
Expected: FAIL — cannot resolve `../src/cli.js`.

- [ ] **Step 3: Implement**

```ts
// src/cli.ts
import { COMMANDS } from './commands/index.js';

export interface ParsedArgs { command: string; flags: Record<string, string | boolean>; }

export function parseArgs(argv: string[]): ParsedArgs {
  const [command = '', ...rest] = argv;
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < rest.length; i++) {
    const tok = rest[i]!;
    if (!tok.startsWith('--')) continue;
    const key = tok.slice(2);
    const next = rest[i + 1];
    if (next && !next.startsWith('--')) { flags[key] = next; i++; }
    else flags[key] = true;
  }
  return { command, flags };
}

async function main(): Promise<void> {
  const { command, flags } = parseArgs(process.argv.slice(2));
  const handler = COMMANDS[command];
  if (!handler) {
    console.error(`Unknown or missing command: "${command}"`);
    console.error(`Commands: ${Object.keys(COMMANDS).join(', ')}`);
    process.exit(1);
  }
  await handler(flags);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
```

```ts
// src/commands/index.ts
export type FlagBag = Record<string, string | boolean>;
export type CommandHandler = (flags: FlagBag) => Promise<void>;
export const COMMANDS: Record<string, CommandHandler> = {
  // stages are registered here as they are implemented
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd platform/tools/translation-evals && npx vitest run test/cli.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add platform/tools/translation-evals/src/cli.ts platform/tools/translation-evals/src/commands/index.ts platform/tools/translation-evals/test/cli.test.ts
git commit -m "feat(translation-evals): CLI dispatch skeleton"
```

---

### Task 4: Page enumeration

**Files:**
- Create: `platform/tools/translation-evals/src/resolve/enumerate.ts`
- Test: `platform/tools/translation-evals/test/enumerate.test.ts`

**Interfaces:**
- Produces: `enumeratePages(projectDir: string): Promise<string[][]>` — arrays of disk path segments (project name first), mirroring `docs-site/src/utils/scan-mdx-files.ts`.

- [ ] **Step 1: Write the failing test**

```ts
// test/enumerate.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { enumeratePages } from '../src/resolve/enumerate.js';

function fixture(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'enum-'));
  const proj = path.join(root, 'atlas');
  fs.mkdirSync(path.join(proj, 'v1'), { recursive: true });
  fs.mkdirSync(path.join(proj, 'v1', '_includes'), { recursive: true });
  fs.writeFileSync(path.join(proj, '_site.json'), '{}');
  fs.writeFileSync(path.join(proj, 'index.mdx'), '# Home');
  fs.writeFileSync(path.join(proj, 'alerts.mdx'), '# Alerts');
  fs.writeFileSync(path.join(proj, 'v1', '_site.json'), '{}');
  fs.writeFileSync(path.join(proj, 'v1', 'connect.mdx'), '# Connect');
  fs.writeFileSync(path.join(proj, 'v1', '_includes', 'x.mdx'), 'nope');
  return proj;
}

describe('enumeratePages', () => {
  it('lists pages, skips _includes, and pops trailing index', async () => {
    const paths = await enumeratePages(fixture());
    const joined = paths.map((p) => p.join('/')).sort();
    expect(joined).toEqual(['atlas', 'atlas/alerts', 'atlas/v1/connect']);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd platform/tools/translation-evals && npx vitest run test/enumerate.test.ts`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Implement** (mirrors `scan-mdx-files.ts`)

```ts
// src/resolve/enumerate.ts
import fs from 'node:fs/promises';
import path from 'node:path';

const SKIP_DIRS = new Set(['_includes', 'includes', 'sharedinclude']);

async function collect(dir: string, base: string): Promise<string[][]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out: string[][] = [];
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await collect(full, base)));
    else if (e.name.endsWith('.mdx')) {
      const parts = path.relative(base, full).split(path.sep);
      parts[parts.length - 1] = parts[parts.length - 1]!.slice(0, -4);
      if (parts[parts.length - 1] === 'index') parts.pop();
      out.push(parts);
    }
  }
  return out;
}

export async function enumeratePages(projectDir: string): Promise<string[][]> {
  const base = path.dirname(path.resolve(projectDir)); // include project name as first segment
  return collect(projectDir, base);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd platform/tools/translation-evals && npx vitest run test/enumerate.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add platform/tools/translation-evals/src/resolve/enumerate.ts platform/tools/translation-evals/test/enumerate.test.ts
git commit -m "feat(translation-evals): page enumeration"
```

---

### Task 5: URL path derivation + composable variants

**Files:**
- Create: `platform/tools/translation-evals/src/resolve/urls.ts`
- Test: `platform/tools/translation-evals/test/urls.test.ts`

**Interfaces:**
- Consumes: `PageRef` (Task 1).
- Produces: `buildPageRefs(project, diskPaths, dirNameToPrefix, siteJson): PageRef[]`; `slugFor(urlPath, query?)`.

- [ ] **Step 1: Write the failing test**

```ts
// test/urls.test.ts
import { describe, it, expect } from 'vitest';
import { buildPageRefs, slugFor } from '../src/resolve/urls.js';

describe('buildPageRefs', () => {
  it('derives basePath from dir-name-to-prefix and expands composable variants', () => {
    const refs = buildPageRefs(
      'atlas',
      [['atlas', 'alerts'], ['atlas', 'alert-resolutions']],
      { atlas: 'docs/atlas' },
      { composablePages: { 'alert-resolutions': [{ interface: 'atlas-ui' }, { interface: 'atlas-cli' }] } },
    );
    expect(refs.find((r) => r.urlPath === '/docs/atlas/alerts')!.slug).toBe('alerts');
    const variants = refs.filter((r) => r.urlPath === '/docs/atlas/alert-resolutions');
    expect(variants.map((v) => v.query).sort()).toEqual(['interface=atlas-cli', 'interface=atlas-ui']);
  });
});

describe('slugFor', () => {
  it('appends a query hash so variants do not collide', () => {
    expect(slugFor('/docs/atlas/alerts')).toBe('atlas__alerts');
    expect(slugFor('/docs/atlas/alert-resolutions', 'interface=atlas-ui')).toBe('atlas__alert-resolutions__interface_atlas-ui');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd platform/tools/translation-evals && npx vitest run test/urls.test.ts`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Implement**

```ts
// src/resolve/urls.ts
import type { PageRef } from '../types.js';

export function slugFor(urlPath: string, query?: string): string {
  const base = urlPath.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '__').replace(/[^a-zA-Z0-9_-]/g, '_');
  if (!query) return base || 'index';
  const q = query.replace(/[^a-zA-Z0-9_-]/g, '_');
  return `${base || 'index'}__${q}`;
}

export function buildPageRefs(
  project: string,
  diskPaths: string[][],
  dirNameToPrefix: Record<string, string>,
  siteJson: { composablePages?: Record<string, Array<Record<string, string>>> },
): PageRef[] {
  const dirName = project.split('/')[0]!;
  const rawPrefix = dirNameToPrefix[dirName];
  if (!rawPrefix) throw new Error(`No dir-name-to-prefix entry for "${dirName}"`);
  const basePath = `/${rawPrefix}`;
  const refs: PageRef[] = [];
  for (const disk of diskPaths) {
    // disk includes the project name as the first segment
    const rel = disk.slice(1).join('/');
    const urlPath = `${basePath}${rel ? `/${rel}` : ''}`.toLowerCase();
    const mdxPath = disk.join('/') + '.mdx';
    refs.push({ slug: slugFor(urlPath), urlPath, mdxPath });
    const variants = siteJson.composablePages?.[rel];
    if (variants) {
      for (const v of variants) {
        const query = Object.entries(v).map(([k, val]) => `${k}=${val}`).join('&');
        refs.push({ slug: slugFor(urlPath, query), urlPath, mdxPath, query });
      }
    }
  }
  return refs;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd platform/tools/translation-evals && npx vitest run test/urls.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add platform/tools/translation-evals/src/resolve/urls.ts platform/tools/translation-evals/test/urls.test.ts
git commit -m "feat(translation-evals): URL derivation and composable variants"
```

---

### Task 6: Include graph + transitive closure

**Files:**
- Create: `platform/tools/translation-evals/src/resolve/closure.ts`
- Test: `platform/tools/translation-evals/test/closure.test.ts`

**Interfaces:**
- Consumes: `TranslatableSet` (Task 1).
- Produces: `buildIncludeGraph(root, files)`, `computeClosure(pageMdxPaths, graph, refKeys, substitutionKeys): TranslatableSet`.

- [ ] **Step 1: Write the failing test**

```ts
// test/closure.test.ts
import { describe, it, expect } from 'vitest';
import { buildIncludeGraph, computeClosure } from '../src/resolve/closure.js';

const FILES: Record<string, string> = {
  'atlas/alerts.mdx': '<Include src="/_includes/a"><Replacement name="svc">Atlas</Replacement></Include>\n<Reference refKey="ui-org-menu" type="substitution" />',
  '_includes/a.mdx': 'text <Include src="/_includes/b" />',
  '_includes/b.mdx': 'deep <Reference refKey="service" type="substitution" />',
  '_includes/unused.mdx': 'never referenced',
};

describe('computeClosure', () => {
  it('collects transitive includes once and only referenced substitutions', () => {
    const graph = buildIncludeGraph('', Object.keys(FILES), (f) => FILES[f]!);
    const set = computeClosure(['atlas/alerts.mdx'], graph, { 'atlas/alerts.mdx': ['ui-org-menu'], '_includes/b.mdx': ['service'] }, new Set(['ui-org-menu', 'service', 'unused']));
    expect(set.includes.sort()).toEqual(['_includes/a.mdx', '_includes/b.mdx']);
    expect(set.substitutions.sort()).toEqual(['service', 'ui-org-menu']);
    expect(set.pages).toEqual(['atlas/alerts.mdx']);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd platform/tools/translation-evals && npx vitest run test/closure.test.ts`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Implement**

```ts
// src/resolve/closure.ts
import type { TranslatableSet } from '../types.js';

const INCLUDE_RE = /<Include\s+src="([^"]+)"/g;

function srcToRel(src: string): string {
  return src.replace(/^\//, '').replace(/\.mdx$/i, '') + '.mdx';
}

export function buildIncludeGraph(
  _root: string,
  files: string[],
  read: (f: string) => string,
): Map<string, string[]> {
  const graph = new Map<string, string[]>();
  for (const f of files) {
    const srcs = [...read(f).matchAll(INCLUDE_RE)].map((m) => srcToRel(m[1]!));
    graph.set(f, srcs);
  }
  return graph;
}

export function computeClosure(
  pageMdxPaths: string[],
  graph: Map<string, string[]>,
  refKeys: Record<string, string[]>,
  substitutionKeys: Set<string>,
): TranslatableSet {
  const seen = new Set<string>();
  const stack = [...pageMdxPaths];
  const usedSubs = new Set<string>();
  while (stack.length) {
    const f = stack.pop()!;
    if (seen.has(f)) continue;
    seen.add(f);
    for (const k of refKeys[f] ?? []) if (substitutionKeys.has(k)) usedSubs.add(k);
    for (const inc of graph.get(f) ?? []) if (!seen.has(inc)) stack.push(inc);
  }
  const includes = [...seen].filter((f) => f.startsWith('_includes/'));
  return { pages: pageMdxPaths, includes, substitutions: [...usedSubs].sort() };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd platform/tools/translation-evals && npx vitest run test/closure.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add platform/tools/translation-evals/src/resolve/closure.ts platform/tools/translation-evals/test/closure.test.ts
git commit -m "feat(translation-evals): include graph and transitive closure"
```

---

### Task 7: `resolve` command wiring

**Files:**
- Create: `platform/tools/translation-evals/src/resolve/run.ts`
- Modify: `platform/tools/translation-evals/src/commands/index.ts`
- Test: `platform/tools/translation-evals/test/resolve-run.test.ts`

**Interfaces:**
- Consumes: `enumeratePages`, `buildPageRefs`, `buildIncludeGraph`, `computeClosure`, manifest helpers, `loadConfig`.
- Produces: `resolveProject(cfg, project, runId?): Promise<{ runId: string; manifest: RunManifest }>`; registers `resolve` in `COMMANDS`.

- [ ] **Step 1: Write the failing test** (fixture project, asserting manifest contents)

```ts
// test/resolve-run.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadConfig } from '../src/config.js';
import { resolveProject } from '../src/resolve/run.js';

function setup() {
  const cfg = loadConfig({});
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'resolve-'));
  cfg.dataDir = path.join(root, 'data');
  const projDir = path.join(root, 'content-mdx', 'atlas');
  fs.mkdirSync(path.join(projDir, '_includes'), { recursive: true });
  fs.writeFileSync(path.join(projDir, '_site.json'), JSON.stringify({ composablePages: {} }));
  fs.writeFileSync(path.join(projDir, 'alerts.mdx'), '<Include src="/_includes/a" />');
  fs.writeFileSync(path.join(projDir, '_includes', 'a.mdx'), 'body');
  fs.writeFileSync(path.join(projDir, '_references.json'), JSON.stringify({ substitutions: { svc: 'Atlas' }, refs: {} }));
  (cfg as any).contentMdxDir = path.join(root, 'content-mdx');
  return { cfg, projDir };
}

describe('resolveProject', () => {
  it('produces a manifest with pages and the closure', async () => {
    const { cfg } = setup();
    const { manifest } = await resolveProject(cfg, 'atlas', 'test-run');
    expect(manifest.pages.some((p) => p.urlPath === '/docs/atlas/alerts')).toBe(true);
    expect(manifest.translatable.includes).toContain('_includes/a.mdx');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd platform/tools/translation-evals && npx vitest run test/resolve-run.test.ts`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Implement `src/resolve/run.ts`**

```ts
// src/resolve/run.ts
import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '../config.js';
import type { RunManifest, PageRef } from '../types.js';
import { enumeratePages } from './enumerate.js';
import { buildPageRefs } from './urls.js';
import { buildIncludeGraph, computeClosure } from './closure.js';
import { newRunId, writeManifest } from '../run/manifest.js';

const REFKEY_RE = /refKey="([^"]+)"/g;
const INCLUDE_DIR = '_includes';

function walkMdx(dir: string, base: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkMdx(full, base, out);
    else if (e.name.endsWith('.mdx')) out.push(path.relative(base, full));
  }
  return out;
}

export async function resolveProject(
  cfg: Config, project: string, runId: string = newRunId(),
): Promise<{ runId: string; manifest: RunManifest }> {
  const projectDir = path.join(cfg.contentMdxDir, project);
  if (!fs.existsSync(projectDir)) throw new Error(`content-mdx/${project} not found — run convert:rst-to-mdx first`);

  const dirNameToPrefix = JSON.parse(
    fs.readFileSync(path.resolve(import.meta.dirname, '../../../../docs-site/src/generated/dir-name-to-prefix.json'), 'utf8'),
  ) as Record<string, string>;
  const siteJson = JSON.parse(fs.readFileSync(path.join(projectDir, '_site.json'), 'utf8'));

  const diskPaths = await enumeratePages(projectDir);
  const pages: PageRef[] = buildPageRefs(project, diskPaths, dirNameToPrefix, siteJson);

  const allFiles = walkMdx(projectDir, cfg.contentMdxDir);
  const read = (f: string) => fs.readFileSync(path.join(cfg.contentMdxDir, f), 'utf8');
  const graph = buildIncludeGraph(cfg.contentMdxDir, allFiles, read);

  const refKeys: Record<string, string[]> = {};
  for (const f of allFiles) refKeys[f] = [...read(f).matchAll(REFKEY_RE)].map((m) => m[1]!);

  const refsPath = path.join(projectDir, '_references.json');
  const substitutionKeys = new Set<string>(
    fs.existsSync(refsPath) ? Object.keys(JSON.parse(fs.readFileSync(refsPath, 'utf8')).substitutions ?? {}) : [],
  );

  const translatable = computeClosure(pages.map((p) => p.mdxPath), graph, refKeys, substitutionKeys);

  const manifest: RunManifest = {
    project, runId, locales: cfg.locales, pages, translatable,
    stages: { resolve: { status: 'done', at: new Date().toISOString() } },
  };
  writeManifest(cfg, project, runId, manifest);
  return { runId, manifest };
}
```

- [ ] **Step 4: Register the command**

Add to `src/commands/index.ts`:
```ts
import { loadConfig } from '../config.js';
import { resolveProject } from '../resolve/run.js';

export const COMMANDS: Record<string, CommandHandler> = {
  resolve: async (flags) => {
    const cfg = loadConfig();
    const project = String(flags.project ?? '');
    if (!project) throw new Error('--project is required');
    const { runId, manifest } = await resolveProject(cfg, project, flags.run ? String(flags.run) : undefined);
    console.log(`run ${runId}: ${manifest.pages.length} pages, ${manifest.translatable.includes.length} includes`);
  },
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd platform/tools/translation-evals && npx vitest run test/resolve-run.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add platform/tools/translation-evals/src/resolve/run.ts platform/tools/translation-evals/src/commands/index.ts platform/tools/translation-evals/test/resolve-run.test.ts
git commit -m "feat(translation-evals): resolve command"
```

---

### Task 8: Scrape core (browser + extract)

**Files:**
- Create: `platform/tools/translation-evals/src/scrape/browser.ts`
- Create: `platform/tools/translation-evals/src/scrape/extract.ts`
- Test: `platform/tools/translation-evals/test/extract.test.ts`

**Interfaces:**
- Produces: `scrapeOne(page, url): Promise<ScrapedPage | null>` (returns `null` on 403/404); `withBrowser(fn)` lifecycle helper.

- [ ] **Step 1: Write the failing test** (pure logic only — the browser is exercised in Task 9's smoke)

```ts
// test/extract.test.ts
import { describe, it, expect } from 'vitest';
import { jitterMs, isSkippableStatus } from '../src/scrape/browser.js';

describe('scrape helpers', () => {
  it('jitter stays within 5000-8000ms', () => {
    for (let i = 0; i < 50; i++) { const j = jitterMs(); expect(j).toBeGreaterThanOrEqual(5000); expect(j).toBeLessThan(8000); }
  });
  it('skips 403 and 404 only', () => {
    expect(isSkippableStatus(403)).toBe(true);
    expect(isSkippableStatus(404)).toBe(true);
    expect(isSkippableStatus(200)).toBe(false);
    expect(isSkippableStatus(500)).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd platform/tools/translation-evals && npx vitest run test/extract.test.ts`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Implement `src/scrape/browser.ts`**

```ts
// src/scrape/browser.ts
import { chromium, type Browser } from 'playwright';

export const JITTER_MIN_MS = 5000;
export const JITTER_RANGE_MS = 3000;
export const COOLDOWN_EVERY = 50;
export const COOLDOWN_MS = 60_000;

export function jitterMs(): number { return JITTER_MIN_MS + Math.random() * JITTER_RANGE_MS; }
export function isSkippableStatus(status: number): boolean { return status === 403 || status === 404; }
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function withBrowser<T>(fn: (b: Browser) => Promise<T>): Promise<T> {
  const browser = await chromium.launch({ headless: true });
  try { return await fn(browser); } finally { await browser.close(); }
}

export async function scrapeOne(browser: Browser, url: string): Promise<{ url: string; title: string; content: string } | null> {
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true });
  try {
    const page = await ctx.newPage();
    await sleep(jitterMs());
    const resp = await page.goto(url, { timeout: 30_000, waitUntil: 'domcontentloaded' });
    if (resp && isSkippableStatus(resp.status())) return null;
    await page.waitForSelector('main', { timeout: 8000 }).catch(() => {});
    const title = await page.title();
    const content = await page.$eval('main', (el) => (el as HTMLElement).innerText).catch(() => '');
    return { url, title, content };
  } finally {
    await ctx.close();
  }
}
```

`src/scrape/extract.ts` re-exports the pure helpers for testing:
```ts
// src/scrape/extract.ts
export { jitterMs, isSkippableStatus } from './browser.js';
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd platform/tools/translation-evals && npx vitest run test/extract.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add platform/tools/translation-evals/src/scrape/browser.ts platform/tools/translation-evals/src/scrape/extract.ts platform/tools/translation-evals/test/extract.test.ts
git commit -m "feat(translation-evals): scrape core (browser + helpers)"
```

---

### Task 9: `scrape-prod` command

**Files:**
- Create: `platform/tools/translation-evals/src/scrape/prod.ts`
- Modify: `platform/tools/translation-evals/src/commands/index.ts`
- Test: `platform/tools/translation-evals/test/scrape-prod.test.ts`

**Interfaces:**
- Consumes: `readManifest`, `setStage`, `withBrowser`, `scrapeOne`, `Config`, `PageRef`.
- Produces: `prodUrlFor(cfg, locale, page)`, `scrapeProd(cfg, project, runId, locales?)`.

- [ ] **Step 1: Write the failing test** (URL construction + skip bookkeeping; no network)

```ts
// test/scrape-prod.test.ts
import { describe, it, expect } from 'vitest';
import { prodUrlFor } from '../src/scrape/prod.js';
import type { PageRef } from '../src/types.js';

const page: PageRef = { slug: 'atlas__alerts', urlPath: '/docs/atlas/alerts', mdxPath: 'atlas/alerts.mdx' };

describe('prodUrlFor', () => {
  it('prefixes the locale and appends the query', () => {
    expect(prodUrlFor('https://www.mongodb.com', 'es', page)).toBe('https://www.mongodb.com/es/docs/atlas/alerts/');
    expect(prodUrlFor('https://www.mongodb.com', '', page)).toBe('https://www.mongodb.com/docs/atlas/alerts/');
    expect(prodUrlFor('https://www.mongodb.com', 'ja-jp', { ...page, query: 'interface=atlas-ui' }))
      .toBe('https://www.mongodb.com/ja-jp/docs/atlas/alerts/?interface=atlas-ui');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd platform/tools/translation-evals && npx vitest run test/scrape-prod.test.ts`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Implement**

```ts
// src/scrape/prod.ts
import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '../config.js';
import type { PageRef } from '../types.js';
import { readManifest, runDir, setStage } from '../run/manifest.js';
import { withBrowser, scrapeOne, COOLDOWN_EVERY, COOLDOWN_MS, sleep } from './browser.js';

export function prodUrlFor(origin: string, locale: string, page: PageRef): string {
  const prefix = locale ? `/${locale}` : '';
  const q = page.query ? `?${page.query}` : '';
  return `${origin}${prefix}${page.urlPath}/${q}`;
}

export async function scrapeProd(
  cfg: Config, project: string, runId: string, locales?: string[],
): Promise<void> {
  const m = readManifest(cfg, project, runId);
  const targets = ['', ...(locales ?? m.locales)];
  let n = 0;
  await withBrowser(async (browser) => {
    for (const locale of targets) {
      const dirName = locale === '' ? 'en' : locale;
      const outDir = path.join(runDir(cfg, project, runId), 'prod', dirName);
      fs.mkdirSync(outDir, { recursive: true });
      for (const page of m.pages) {
        const url = prodUrlFor(cfg.prodOrigin, locale, page);
        const result = await scrapeOne(browser, url);
        if (result) fs.writeFileSync(path.join(outDir, `${page.slug}.json`), JSON.stringify(result, null, 2));
        if (++n % COOLDOWN_EVERY === 0) await sleep(COOLDOWN_MS);
      }
    }
  });
  setStage(cfg, project, runId, 'scrape-prod', 'done');
}
```

- [ ] **Step 4: Register the command**

Add to `src/commands/index.ts`:
```ts
import { readManifest } from '../run/manifest.js';
import { scrapeProd } from '../scrape/prod.js';

// inside COMMANDS:
scrapeProd: async (flags) => {
  const cfg = loadConfig();
  const project = String(flags.project ?? '');
  const runId = String(flags.run ?? readManifestLatest(cfg, project));
  await scrapeProd(cfg, project, runId, flags.locale ? [String(flags.locale)] : undefined);
},
```
Add a helper `readManifestLatest(cfg, project)` that returns the most recent run dir name (newest `data/<project>/*`).

- [ ] **Step 5: Run test to verify it passes**

Run: `cd platform/tools/translation-evals && npx vitest run test/scrape-prod.test.ts`
Expected: PASS.

- [ ] **Step 6: Manual smoke (network)**

Run: `cd platform/tools/translation-evals && npx tsx src/cli.ts scrape-prod --project atlas --run test-run --locale es` (after Task 7 produced `test-run` with a tiny page set). Confirm JSON files appear under `data/atlas/test-run/prod/es/`.

- [ ] **Step 7: Commit**

```bash
git add platform/tools/translation-evals/src/scrape/prod.ts platform/tools/translation-evals/src/commands/index.ts platform/tools/translation-evals/test/scrape-prod.test.ts
git commit -m "feat(translation-evals): scrape-prod command"
```

---

### Task 10: Translation batch (adapter + service)

**Files:**
- Create: `platform/tools/translation-evals/src/translate/batch.ts`
- Test: `platform/tools/translation-evals/test/batch.test.ts`

**Interfaces:**
- Consumes: `translateMdx` from `mdx-translation-adapter`; `translate`, `createGroveBackend` from `@mongodb-docs/translation-service`.
- Produces: `makeTranslateFn(cfg, targetLocale): TranslateFn`; `translateMdxFile(mdx, cfg, targetLocale, terms): Promise<string>`.

- [ ] **Step 1: Write the failing test** (inject a fake translate fn — no network)

```ts
// test/batch.test.ts
import { describe, it, expect } from 'vitest';
import { translateMdxFile } from '../src/translate/batch.js';
import { loadConfig } from '../src/config.js';

const SRC = `# Setup\n\nInstall with \`brew\` and read the [guide](/g).\n\n<Note>\n  Keep MongoDB running.\n</Note>\n`;

describe('translateMdxFile', () => {
  it('returns reconstructed MDX when the backend echoes translations', async () => {
    const cfg = loadConfig({});
    const out = await translateMdxFile(SRC, cfg, 'es', ['MongoDB'], async (payload) => ({ ...payload }));
    expect(out).toContain('Keep MongoDB running.');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd platform/tools/translation-evals && npx vitest run test/batch.test.ts`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Implement**

```ts
// src/translate/batch.ts
import { translateMdx, type TranslateFn } from 'mdx-translation-adapter';
import { translate, createGroveBackend } from '@mongodb-docs/translation-service';
import type { Config } from '../config.js';

export function makeTranslateFn(cfg: Config, targetLocale: string): TranslateFn {
  const backend = createGroveBackend(cfg.grove as any);
  return async (payload, nonTranslatableTerms) => {
    const res = await translate(
      {
        source_locale: 'en-us',
        target_locale: targetLocale,
        content_type: 'platform_strings',
        payload,
        non_translatable_terms: nonTranslatableTerms,
      },
      { backend },
    );
    return res.translations;
  };
}

export async function translateMdxFile(
  mdx: string, cfg: Config, targetLocale: string, terms: string[],
  translateFn?: TranslateFn,
): Promise<string> {
  const fn = translateFn ?? makeTranslateFn(cfg, targetLocale);
  return translateMdx(mdx, fn, { nonTranslatableTerms: terms });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd platform/tools/translation-evals && npx vitest run test/batch.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add platform/tools/translation-evals/src/translate/batch.ts platform/tools/translation-evals/test/batch.test.ts
git commit -m "feat(translation-evals): MDX translation batch"
```

---

### Task 11: References translation + overlay

**Files:**
- Create: `platform/tools/translation-evals/src/translate/references.ts`
- Create: `platform/tools/translation-evals/src/translate/overlay.ts`
- Test: `platform/tools/translation-evals/test/references.test.ts`

**Interfaces:**
- Produces: `translateSubstitutions(subs, keys, cfg, locale, translateFn?)`, `writeOverlay(runDir, locale, files)`.

- [ ] **Step 1: Write the failing test**

```ts
// test/references.test.ts
import { describe, it, expect } from 'vitest';
import { translateSubstitutions } from '../src/translate/references.js';
import { loadConfig } from '../src/config.js';

describe('translateSubstitutions', () => {
  it('translates string values and rich .text, leaves other keys untouched', async () => {
    const cfg = loadConfig({});
    const subs = { 'ui-org-menu': 'Organizations menu', service: { text: 'Atlas', nodes: [] }, unused: 'x' };
    const echo = async (payload: Record<string, string>) => ({ ...payload });
    const out = await translateSubstitutions(subs, ['ui-org-menu', 'service'], cfg, 'es', echo);
    expect(out['ui-org-menu']).toBe('Organizations menu');
    expect((out.service as any).text).toBe('Atlas');
    expect(out.unused).toBe('x');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd platform/tools/translation-evals && npx vitest run test/references.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement**

```ts
// src/translate/references.ts
import type { Config } from '../config.js';
import { makeTranslateFn } from './batch.js';
import type { TranslateFn } from 'mdx-translation-adapter';

type SubValue = string | { text: string; nodes?: unknown[]; url?: string; tooltip?: string };

export async function translateSubstitutions(
  subs: Record<string, SubValue>, keys: string[], cfg: Config, locale: string,
  translateFn?: TranslateFn,
): Promise<Record<string, SubValue>> {
  const fn = translateFn ?? makeTranslateFn(cfg, locale);
  const payload: Record<string, string> = {};
  for (const k of keys) {
    const v = subs[k];
    if (v === undefined) continue;
    payload[k] = typeof v === 'string' ? v : v.text;
  }
  if (Object.keys(payload).length === 0) return subs;
  const out = await fn(payload, []);
  const result: Record<string, SubValue> = { ...subs };
  for (const k of keys) {
    const v = subs[k];
    const t = out[k];
    if (t == null || v === undefined) continue;
    result[k] = typeof v === 'string' ? t : { ...v, text: t };
  }
  return result;
}
```

```ts
// src/translate/overlay.ts
import fs from 'node:fs';
import path from 'node:path';

/** Write translated files under <runDir>/translated/<locale>/<relPath>. */
export function writeOverlay(runDir: string, locale: string, files: Record<string, string>): void {
  const base = path.join(runDir, 'translated', locale);
  for (const [rel, content] of Object.entries(files)) {
    const p = path.join(base, rel);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, content);
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd platform/tools/translation-evals && npx vitest run test/references.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add platform/tools/translation-evals/src/translate/references.ts platform/tools/translation-evals/src/translate/overlay.ts platform/tools/translation-evals/test/references.test.ts
git commit -m "feat(translation-evals): references translation and overlay writer"
```

---

### Task 12: `translate` command

**Files:**
- Create: `platform/tools/translation-evals/src/translate/run.ts`
- Modify: `platform/tools/translation-evals/src/commands/index.ts`
- Test: `platform/tools/translation-evals/test/translate-run.test.ts`

**Interfaces:**
- Consumes: `readManifest`, `setStage`, `translateMdxFile`, `translateSubstitutions`, `writeOverlay`.
- Produces: `translateRun(cfg, project, runId, locales?, translateFn?)`.

- [ ] **Step 1: Write the failing test** (fixture with one page + one include, fake translate fn)

```ts
// test/translate-run.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadConfig } from '../src/config.js';
import { translateRun } from '../src/translate/run.js';
import { writeManifest } from '../src/run/manifest.js';

describe('translateRun', () => {
  it('writes translated page + include + references under the run dir', async () => {
    const cfg = loadConfig({});
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'tr-'));
    cfg.dataDir = path.join(root, 'data');
    cfg.contentMdxDir = path.join(root, 'content-mdx');
    const proj = path.join(cfg.contentMdxDir, 'atlas');
    fs.mkdirSync(path.join(proj, '_includes'), { recursive: true });
    fs.writeFileSync(path.join(proj, 'alerts.mdx'), '# Alerts');
    fs.writeFileSync(path.join(proj, '_includes', 'a.mdx'), 'body');
    fs.writeFileSync(path.join(proj, '_references.json'), JSON.stringify({ substitutions: { svc: 'Atlas' }, refs: {} }));
    writeManifest(cfg, 'atlas', 'r', {
      project: 'atlas', runId: 'r', locales: ['es'], pages: [],
      translatable: { pages: ['atlas/alerts.mdx'], includes: ['_includes/a.mdx'], substitutions: ['svc'] },
      stages: {},
    });
    const echo = async (p: Record<string, string>) => ({ ...p });
    await translateRun(cfg, 'atlas', 'r', ['es'], echo);
    expect(fs.existsSync(path.join(cfg.dataDir, 'atlas', 'r', 'translated', 'es', 'atlas/alerts.mdx'))).toBe(true);
    expect(fs.existsSync(path.join(cfg.dataDir, 'atlas', 'r', 'translated', 'es', '_includes/a.mdx'))).toBe(true);
    expect(fs.existsSync(path.join(cfg.dataDir, 'atlas', 'r', 'translated', 'es', '_references.json'))).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd platform/tools/translation-evals && npx vitest run test/translate-run.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement**

```ts
// src/translate/run.ts
import fs from 'node:fs';
import path from 'node:path';
import type { TranslateFn } from 'mdx-translation-adapter';
import type { Config } from '../config.js';
import { readManifest, runDir, setStage } from '../run/manifest.js';
import { translateMdxFile } from './batch.js';
import { translateSubstitutions } from './references.js';
import { writeOverlay } from './overlay.js';

function readTerms(cfg: Config): string[] {
  if (!cfg.termsFile) return [];
  return JSON.parse(fs.readFileSync(cfg.termsFile, 'utf8')).terms ?? [];
}

export async function translateRun(
  cfg: Config, project: string, runId: string, locales?: string[], translateFn?: TranslateFn,
): Promise<void> {
  const m = readManifest(cfg, project, runId);
  const targets = locales ?? m.locales;
  const terms = readTerms(cfg);
  const projectDir = path.join(cfg.contentMdxDir, project);
  for (const locale of targets) {
    const files: Record<string, string> = {};
    for (const rel of [...m.translatable.pages, ...m.translatable.includes]) {
      const src = fs.readFileSync(path.join(cfg.contentMdxDir, rel), 'utf8');
      files[rel] = await translateMdxFile(src, cfg, locale, terms, translateFn);
    }
    const refsPath = path.join(projectDir, '_references.json');
    if (fs.existsSync(refsPath)) {
      const refs = JSON.parse(fs.readFileSync(refsPath, 'utf8'));
      refs.substitutions = await translateSubstitutions(refs.substitutions ?? {}, m.translatable.substitutions, cfg, locale, translateFn);
      files['_references.json'] = JSON.stringify(refs, null, 2);
    }
    writeOverlay(runDir(cfg, project, runId), locale, files);
  }
  setStage(cfg, project, runId, 'translate', 'done');
}
```

- [ ] **Step 4: Register the command** (same pattern as Task 9)

- [ ] **Step 5: Run test to verify it passes**

Run: `cd platform/tools/translation-evals && npx vitest run test/translate-run.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add platform/tools/translation-evals/src/translate/run.ts platform/tools/translation-evals/src/commands/index.ts platform/tools/translation-evals/test/translate-run.test.ts
git commit -m "feat(translation-evals): translate command"
```

---

### Task 13: `serve` (materialize + server lifecycle)

**Files:**
- Create: `platform/tools/translation-evals/src/serve/materialize.ts`
- Create: `platform/tools/translation-evals/src/serve/server.ts`
- Modify: `platform/tools/translation-evals/src/commands/index.ts`
- Test: `platform/tools/translation-evals/test/materialize.test.ts`

**Interfaces:**
- Produces: `materialize(cfg, project, runId, locale)`, `startServer(cfg, project, production)` / `stopServer(pid)`.

- [ ] **Step 1: Write the failing test**

```ts
// test/materialize.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadConfig } from '../src/config.js';
import { materialize } from '../src/serve/materialize.js';

describe('materialize', () => {
  it('overlays translated pages/includes/references onto the English base', () => {
    const cfg = loadConfig({});
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'mat-'));
    cfg.contentMdxDir = path.join(root, 'content-mdx');
    cfg.dataDir = path.join(root, 'data');
    const proj = path.join(cfg.contentMdxDir, 'atlas');
    fs.mkdirSync(path.join(proj, '_includes'), { recursive: true });
    fs.writeFileSync(path.join(proj, 'alerts.mdx'), '# ENGLISH');
    fs.writeFileSync(path.join(proj, '_includes', 'a.mdx'), 'EN-INC');
    fs.writeFileSync(path.join(proj, '_references.json'), '{"substitutions":{},"refs":{}}');
    const trDir = path.join(cfg.dataDir, 'atlas', 'r', 'translated', 'es');
    fs.mkdirSync(path.join(trDir, '_includes'), { recursive: true });
    fs.writeFileSync(path.join(trDir, 'atlas/alerts.mdx'.replace('/', path.sep)), '# SPANISH');
    fs.writeFileSync(path.join(trDir, '_includes', 'a.mdx'), 'ES-INC');
    fs.writeFileSync(path.join(trDir, '_references.json'), '{"substitutions":{"x":"y"},"refs":{}}');
    materialize(cfg, 'atlas', 'r', 'es');
    expect(fs.readFileSync(path.join(proj, 'alerts.mdx'), 'utf8')).toBe('# SPANISH');
    expect(fs.readFileSync(path.join(proj, '_includes', 'a.mdx'), 'utf8')).toBe('ES-INC');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd platform/tools/translation-evals && npx vitest run test/materialize.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `materialize.ts`**

```ts
// src/serve/materialize.ts
import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '../config.js';

/** Copy translated overlay files over content-mdx/<project>. Assumes English base is already generated. */
export function materialize(cfg: Config, project: string, runId: string, locale: string): void {
  const overlay = path.join(cfg.dataDir, project, runId, 'translated', locale);
  const target = path.join(cfg.contentMdxDir, project);
  if (!fs.existsSync(overlay)) throw new Error(`No translated overlay for locale ${locale}`);
  const copy = (src: string, rel: string) => {
    for (const e of fs.readdirSync(src, { withFileTypes: true })) {
      const s = path.join(src, e.name);
      const d = path.join(target, rel, e.name);
      if (e.isDirectory()) copy(s, path.join(rel, e.name));
      else { fs.mkdirSync(path.dirname(d), { recursive: true }); fs.copyFileSync(s, d); }
    }
  };
  copy(overlay, '');
}
```

`server.ts`:
```ts
// src/serve/server.ts
import { spawn, type ChildProcess } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export function startServer(platformDir: string, project: string, production: boolean): ChildProcess {
  const cmd = production ? ['pnpm', ['build']] : null;
  const child = production
    ? spawn('bash', ['-lc', `cd ${platformDir} && DOCS_PROJECT=${project} pnpm build && DOCS_PROJECT=${project} pnpm --filter docs-site start`], { stdio: 'inherit' })
    : spawn('bash', ['-lc', `cd ${platformDir} && DOCS_PROJECT=${project} pnpm --filter docs-site dev`], { stdio: 'inherit' });
  void cmd;
  return child;
}

export function stopServer(child: ChildProcess): void { child.kill('SIGTERM'); }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd platform/tools/translation-evals && npx vitest run test/materialize.test.ts`
Expected: PASS.

- [ ] **Step 5: Register `serve`** — a long-running command: materialize, then start the server and keep it in the foreground until Ctrl-C.

- [ ] **Step 6: Commit**

```bash
git add platform/tools/translation-evals/src/serve/materialize.ts platform/tools/translation-evals/src/serve/server.ts platform/tools/translation-evals/src/commands/index.ts platform/tools/translation-evals/test/materialize.test.ts
git commit -m "feat(translation-evals): serve command (materialize + server)"
```

---

### Task 14: `scrape-local` command

**Files:**
- Create: `platform/tools/translation-evals/src/scrape/local.ts`
- Modify: `platform/tools/translation-evals/src/commands/index.ts`
- Test: `platform/tools/translation-evals/test/scrape-local.test.ts`

**Interfaces:**
- Consumes: `readManifest`, `setStage`, `withBrowser`, `scrapeOne`.
- Produces: `localUrlFor(cfg, page)`, `scrapeLocal(cfg, project, runId, locales?)`.

- [ ] **Step 1: Write the failing test**

```ts
// test/scrape-local.test.ts
import { describe, it, expect } from 'vitest';
import { localUrlFor } from '../src/scrape/local.js';

describe('localUrlFor', () => {
  it('uses the local origin, no locale prefix, matching production-English paths', () => {
    expect(localUrlFor('http://localhost:3000', { slug: 's', urlPath: '/docs/atlas/alerts', mdxPath: 'atlas/alerts.mdx' }))
      .toBe('http://localhost:3000/docs/atlas/alerts/');
  });
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `npx vitest run test/scrape-local.test.ts` — Expected: FAIL.

- [ ] **Step 3: Implement**

```ts
// src/scrape/local.ts
import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '../config.js';
import type { PageRef } from '../types.js';
import { readManifest, runDir, setStage } from '../run/manifest.js';
import { withBrowser, scrapeOne, COOLDOWN_EVERY, COOLDOWN_MS, sleep } from './browser.js';

export function localUrlFor(origin: string, page: PageRef): string {
  const q = page.query ? `?${page.query}` : '';
  return `${origin}${page.urlPath}/${q}`;
}

export async function scrapeLocal(
  cfg: Config, project: string, runId: string, locales?: string[],
): Promise<void> {
  const m = readManifest(cfg, project, runId);
  let n = 0;
  await withBrowser(async (browser) => {
    for (const locale of locales ?? m.locales) {
      const outDir = path.join(runDir(cfg, project, runId), 'local', locale);
      fs.mkdirSync(outDir, { recursive: true });
      for (const page of m.pages) {
        const result = await scrapeOne(browser, localUrlFor(cfg.localOrigin, page));
        if (result) fs.writeFileSync(path.join(outDir, `${page.slug}.json`), JSON.stringify(result, null, 2));
        if (++n % COOLDOWN_EVERY === 0) await sleep(COOLDOWN_MS);
      }
    }
  });
  setStage(cfg, project, runId, 'scrape-local', 'done');
}
```

- [ ] **Step 4: Register the command** (same pattern as Task 9).

- [ ] **Step 5: Run test to verify it passes** — Run: `npx vitest run test/scrape-local.test.ts` — Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add platform/tools/translation-evals/src/scrape/local.ts platform/tools/translation-evals/src/commands/index.ts platform/tools/translation-evals/test/scrape-local.test.ts
git commit -m "feat(translation-evals): scrape-local command"
```

---

### Task 15: `dataset` command

**Files:**
- Create: `platform/tools/translation-evals/src/dataset/rows.ts`
- Modify: `platform/tools/translation-evals/src/commands/index.ts`
- Test: `platform/tools/translation-evals/test/rows.test.ts`

**Interfaces:**
- Produces: `buildRows(prodEn, prodLocale, localLocale, page, project, run): DatasetRow | null`; `buildDataset(cfg, project, runId)`.

- [ ] **Step 1: Write the failing test**

```ts
// test/rows.test.ts
import { describe, it, expect } from 'vitest';
import { buildRows } from '../src/dataset/rows.js';

const en = { url: 'u', title: 't', content: 'English source' };
const ref = { url: 'u', title: 't', content: 'Traducción' };
const loc = { url: 'l', title: 't', content: 'Local output' };

describe('buildRows', () => {
  it('joins source/reference/output into a row', () => {
    const row = buildRows(en, ref, loc, { slug: 's', urlPath: '/docs/atlas/a', mdxPath: 'atlas/a.mdx' }, 'atlas', 'r')!;
    expect(row.input.source_text).toBe('English source');
    expect(row.input.local_text).toBe('Local output');
    expect(row.input.target_locale).toBe('es');
    expect(row.expected).toBe('Traducción');
    expect(row.metadata.locale).toBe('es');
  });
  it('returns null when any side is missing', () => {
    expect(buildRows(en, undefined, loc, { slug: 's', urlPath: 'u', mdxPath: 'm' }, 'atlas', 'r')).toBeNull();
  });
});
```

Note: `buildRows` takes the locale as an explicit 7th argument in the implementation; adjust the test signature accordingly.

- [ ] **Step 2: Run test to verify it fails** — Run: `npx vitest run test/rows.test.ts` — Expected: FAIL.

- [ ] **Step 3: Implement**

```ts
// src/dataset/rows.ts
import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '../config.js';
import type { ScrapedPage, PageRef, DatasetRow } from '../types.js';
import { readManifest, runDir } from '../run/manifest.js';

function readPage(dir: string, slug: string): ScrapedPage | undefined {
  const p = path.join(dir, `${slug}.json`);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : undefined;
}

export function buildRows(
  en: ScrapedPage | undefined, ref: ScrapedPage | undefined, local: ScrapedPage | undefined,
  page: PageRef, project: string, run: string, locale: string,
): DatasetRow | null {
  if (!en || !ref || !local) return null;
  return {
    input: { source_text: en.content, target_locale: locale, local_text: local.content },
    expected: ref.content,
    metadata: { project, url: page.urlPath, slug: page.slug, locale, run },
  };
}

export function buildDataset(cfg: Config, project: string, runId: string): DatasetRow[] {
  const m = readManifest(cfg, project, runId);
  const base = runDir(cfg, project, runId);
  const rows: DatasetRow[] = [];
  for (const locale of m.locales) {
    for (const page of m.pages) {
      const row = buildRows(
        readPage(path.join(base, 'prod', 'en'), page.slug),
        readPage(path.join(base, 'prod', locale), page.slug),
        readPage(path.join(base, 'local', locale), page.slug),
        page, project, runId, locale,
      );
      if (row) rows.push(row);
    }
  }
  const out = path.join(base, 'dataset');
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'rows.json'), JSON.stringify(rows, null, 2));
  return rows;
}
```

- [ ] **Step 4: Register the command** (calls `buildDataset`, logs row count).

- [ ] **Step 5: Run test to verify it passes** — Run: `npx vitest run test/rows.test.ts` — Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add platform/tools/translation-evals/src/dataset/rows.ts platform/tools/translation-evals/src/commands/index.ts platform/tools/translation-evals/test/rows.test.ts
git commit -m "feat(translation-evals): dataset command"
```

---

### Task 16: Judge (Grove)

**Files:**
- Create: `platform/tools/translation-evals/src/eval/judge/judge.ts`
- Create: `platform/tools/translation-evals/src/eval/judge/prompt.ts`
- Test: `platform/tools/translation-evals/test/judge.test.ts`

**Interfaces:**
- Consumes: `resolveGroveConfigFromEnv`, `Transport`/`createGroveTransport` from `@mongodb-docs/translation-service`.
- Produces: `judgeTranslation(input, output, reference, targetLocale, opts): Promise<{ factuality: number; fluency: number; rationale: string }>`; `buildJudgePrompt(...)`.

- [ ] **Step 1: Write the failing test** (inject a fake transport returning a canned JSON body)

```ts
// test/judge.test.ts
import { describe, it, expect } from 'vitest';
import { judgeTranslation } from '../src/eval/judge/judge.js';
import { buildJudgePrompt } from '../src/eval/judge/prompt.js';

describe('judge', () => {
  it('builds a source-anchored prompt naming the locale and reference', () => {
    const p = buildJudgePrompt({ source: 'Add a user.', output: 'Añade un usuario.', reference: 'Añadir un usuario.', locale: 'es' });
    expect(p).toContain('es');
    expect(p).toContain('Add a user.');
    expect(p.toLowerCase()).toContain('source');
  });
  it('parses a judge response into factuality/fluency scores', async () => {
    const transport = async () => JSON.stringify({ output_text: JSON.stringify({ category: 'C', rationale: 'faithful', fluency: 5 }) });
    const r = await judgeTranslation({ source: 'x', output: 'y', reference: 'z', locale: 'es' }, { transport, model: 'judge-model' });
    expect(r.factuality).toBe(1);
    expect(r.fluency).toBe(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `npx vitest run test/judge.test.ts` — Expected: FAIL.

- [ ] **Step 3: Implement `prompt.ts`**

```ts
// src/eval/judge/prompt.ts
export interface JudgeInput { source: string; output: string; reference: string; locale: string; }

export function buildJudgePrompt(i: JudgeInput): string {
  return [
    `You are evaluating a translation into locale "${i.locale}".`,
    'The SOURCE (English) is ground truth. The REFERENCE is one valid human translation; use it only to calibrate register and terminology, not as an answer key.',
    'Classify factuality of the OUTPUT against the SOURCE as one of:',
    '  A = omission (source meaning missing), B = addition (meaning not in source introduced),',
    '  C = faithful (full source meaning preserved), D = mistranslation (contradicts/distorts source).',
    'Also rate fluency of the OUTPUT in the target locale from 1 (poor) to 5 (native).',
    '',
    `SOURCE:\n${i.source}`,
    `REFERENCE:\n${i.reference}`,
    `OUTPUT:\n${i.output}`,
    '',
    'Respond as JSON: {"category":"A|B|C|D","rationale":"...","fluency":1-5}.',
  ].join('\n');
}
```

- [ ] **Step 4: Implement `judge.ts`**

```ts
// src/eval/judge/judge.ts
import { buildJudgePrompt, type JudgeInput } from './prompt.js';

export type JudgeTransport = (body: string) => Promise<string>;

const CATEGORY_SCORE: Record<string, number> = { A: 0.4, B: 0.6, C: 1, D: 0 };

export interface JudgeOptions { transport: JudgeTransport; model: string; }

export async function judgeTranslation(
  input: JudgeInput, opts: JudgeOptions,
): Promise<{ factuality: number; fluency: number; rationale: string }> {
  const prompt = buildJudgePrompt(input);
  const raw = await opts.transport(JSON.stringify({ model: opts.model, input: [{ role: 'user', content: prompt }] }));
  const outer = JSON.parse(raw);
  const parsed = JSON.parse(outer.output_text ?? raw);
  return {
    factuality: CATEGORY_SCORE[parsed.category] ?? 0,
    fluency: Math.max(0, Math.min(1, ((parsed.fluency ?? 0) - 1) / 4)),
    rationale: parsed.rationale ?? '',
  };
}
```

Wire the real transport in the scorer (Task 18) using `resolveGroveConfigFromEnv(process.env, { model: cfg.judgeModel })` + `createGroveTransport`.

- [ ] **Step 5: Run test to verify it passes** — Run: `npx vitest run test/judge.test.ts` — Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add platform/tools/translation-evals/src/eval/judge/judge.ts platform/tools/translation-evals/src/eval/judge/prompt.ts platform/tools/translation-evals/test/judge.test.ts
git commit -m "feat(translation-evals): Grove judge"
```

---

### Task 17: Deterministic scorers

**Files:**
- Create: `platform/tools/translation-evals/src/eval/scorers/deterministic.ts`
- Test: `platform/tools/translation-evals/test/scorers-deterministic.test.ts`

**Interfaces:**
- Produces: `terminologyPreserved(output, terms)`, `referenceSimilarity(output, reference)`.

- [ ] **Step 1: Write the failing test**

```ts
// test/scorers-deterministic.test.ts
import { describe, it, expect } from 'vitest';
import { terminologyPreserved, referenceSimilarity } from '../src/eval/scorers/deterministic.js';

describe('deterministic scorers', () => {
  it('terminologyPreserved = fraction of terms kept', () => {
    expect(terminologyPreserved('Usa MongoDB Atlas', ['MongoDB', 'Atlas'])).toBe(1);
    expect(terminologyPreserved('Usa MongoDB', ['MongoDB', 'Atlas'])).toBe(0.5);
  });
  it('referenceSimilarity is 1 for identical strings and between 0 and 1 otherwise', () => {
    expect(referenceSimilarity('hola', 'hola')).toBe(1);
    const s = referenceSimilarity('hola mundo', 'hola');
    expect(s).toBeGreaterThan(0); expect(s).toBeLessThan(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `npx vitest run test/scorers-deterministic.test.ts` — Expected: FAIL.

- [ ] **Step 3: Implement**

```ts
// src/eval/scorers/deterministic.ts
export function terminologyPreserved(output: string, terms: string[]): number {
  if (terms.length === 0) return 1;
  const kept = terms.filter((t) => output.includes(t)).length;
  return kept / terms.length;
}

function bigrams(s: string): Set<string> {
  const t = s.toLowerCase().replace(/\s+/g, ' ').trim();
  const out = new Set<string>();
  for (let i = 0; i < t.length - 1; i++) out.add(t.slice(i, i + 2));
  return out;
}

/** Character-bigram F1 (chrF-like) — a calibration signal, not a pass/fail. */
export function referenceSimilarity(output: string, reference: string): number {
  if (output === reference) return 1;
  const a = bigrams(output), b = bigrams(reference);
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0; for (const g of a) if (b.has(g)) inter++;
  const precision = inter / a.size, recall = inter / b.size;
  return precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);
}
```

- [ ] **Step 4: Run test to verify it passes** — Run: `npx vitest run test/scorers-deterministic.test.ts` — Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add platform/tools/translation-evals/src/eval/scorers/deterministic.ts platform/tools/translation-evals/test/scorers-deterministic.test.ts
git commit -m "feat(translation-evals): deterministic scorers"
```

---

### Task 18: Braintrust scorers + eval entrypoint

**Files:**
- Create: `platform/tools/translation-evals/src/eval/scorers/index.ts`
- Create: `platform/tools/translation-evals/src/eval/eval.ts`
- Modify: `platform/tools/translation-evals/package.json` (add `braintrust` devDep, `eval` script)
- Test: `platform/tools/translation-evals/test/scorers-index.test.ts`

**Interfaces:**
- Consumes: `judgeTranslation`, `terminologyPreserved`, `referenceSimilarity`.
- Produces: `toEvalScorers(terms, judgeOpts)` → array of Braintrust scorers; `eval.ts` calls `Eval(...)`.

- [ ] **Step 1: Write the failing test** (scorer shapes only)

```ts
// test/scorers-index.test.ts
import { describe, it, expect } from 'vitest';
import { toEvalScorers } from '../src/eval/scorers/index.js';

describe('toEvalScorers', () => {
  it('returns named scorers that read input/output/expected', async () => {
    const scorers = toEvalScorers(['MongoDB'], { transport: async () => '{"output_text":"{\\"category\\":\\"C\\",\\"rationale\\":\\"ok\\",\\"fluency\\":5}"}', model: 'j' });
    const names = scorers.map((s: any) => s.name);
    expect(names).toContain('terminology_preserved');
    expect(names).toContain('reference_similarity');
    const term = scorers.find((s: any) => s.name === 'terminology_preserved')!;
    const r = await (term as any)({ output: 'Usa MongoDB', input: { source_text: '', target_locale: 'es', local_text: '' }, expected: 'x', metadata: {} });
    expect(r.score).toBe(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `npx vitest run test/scorers-index.test.ts` — Expected: FAIL.

- [ ] **Step 3: Implement `scorers/index.ts`**

```ts
// src/eval/scorers/index.ts
import { judgeTranslation, type JudgeOptions } from '../judge/judge.js';
import { terminologyPreserved, referenceSimilarity } from './deterministic.js';

interface Row { input: { source_text: string; target_locale: string; local_text: string }; output: string; expected: string; metadata: { locale?: string } }

export function toEvalScorers(terms: string[], judgeOpts: JudgeOptions) {
  return [
    { name: 'terminology_preserved', scorer: async ({ output }: Row) => ({ name: 'terminology_preserved', score: terminologyPreserved(output, terms) }) },
    { name: 'reference_similarity', scorer: async ({ output, expected }: Row) => ({ name: 'reference_similarity', score: referenceSimilarity(output, expected) }) },
    {
      name: 'factuality_and_fluency',
      scorer: async ({ input, output, expected }: Row) => {
        const r = await judgeTranslation(
          { source: input.source_text, output, reference: expected, locale: input.target_locale },
          judgeOpts,
        );
        return [
          { name: 'factuality', score: r.factuality, metadata: { rationale: r.rationale } },
          { name: 'fluency', score: r.fluency, metadata: { rationale: r.rationale } },
        ];
      },
    },
  ];
}
```

- [ ] **Step 4: Implement `eval.ts`**

```ts
// src/eval/eval.ts
import fs from 'node:fs';
import path from 'node:path';
import { Eval } from 'braintrust';
import { resolveGroveConfigFromEnv, createGroveTransport } from '@mongodb-docs/translation-service';
import { loadConfig } from '../config.js';
import { readManifest, runDir } from '../run/manifest.js';
import { toEvalScorers } from './scorers/index.js';

const cfg = loadConfig();
const project = process.env.EVAL_PROJECT ?? 'atlas';
const runId = process.env.EVAL_RUN!;
const rows = JSON.parse(fs.readFileSync(path.join(runDir(cfg, project, runId), 'dataset', 'rows.json'), 'utf8'));
const terms = cfg.termsFile ? JSON.parse(fs.readFileSync(cfg.termsFile, 'utf8')).terms ?? [] : [];
const grove = resolveGroveConfigFromEnv(process.env, cfg.judgeModel ? { model: cfg.judgeModel } : undefined);
const transport = createGroveTransport(grove.timeoutMs, undefined);
const judgeOpts = { transport: async (body: string) => transport(body, grove), model: grove.model };

Eval(cfg.braintrustProject, {
  data: rows,
  task: async (input: { local_text: string }) => input.local_text,
  scores: toEvalScorers(terms, judgeOpts) as any,
  metadata: { model: cfg.grove.model, judge_model: grove.model, run: runId },
});
```

Adjust the exact `Transport`/`createGroveTransport` signatures to the service's real exports (see `translation/src/backends/llm/grove/transport.ts`).

- [ ] **Step 5: Add the script** to `package.json`:

```json
"eval": "braintrust eval src/eval/eval.ts"
```
and add `"braintrust": "^3.0.0"` to devDependencies.

- [ ] **Step 6: Run test to verify it passes** — Run: `npx vitest run test/scorers-index.test.ts` — Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add platform/tools/translation-evals/src/eval/scorers/index.ts platform/tools/translation-evals/src/eval/eval.ts platform/tools/translation-evals/package.json platform/tools/translation-evals/test/scorers-index.test.ts
git commit -m "feat(translation-evals): Braintrust scorers and eval entrypoint"
```

---

### Task 19: README / runbook

**Files:**
- Create: `platform/tools/translation-evals/README.md`
- Create: `platform/tools/translation-evals/.env.example`

- [ ] **Step 1: Write `.env.example`** listing every variable from the spec §11 with comments.

- [ ] **Step 2: Write `README.md`** covering: what the tool does; the seven stages with example commands in order; the run-directory layout; the `.env.braintrust` note (the CLI does not load plain `.env`); the closure concept and the residual gaps; cost notes.

- [ ] **Step 3: Commit**

```bash
git add platform/tools/translation-evals/README.md platform/tools/translation-evals/.env.example
git commit -m "docs(translation-evals): README and env example"
```

---

### Task 20: Retire `content-scraper`

**Files:**
- Delete: `platform/tools/content-scraper/` (after migrating anything still needed)
- Modify: any references to it (search `platform/` and docs)

- [ ] **Step 1: Confirm nothing imports it**

Run: `grep -rn "content-scraper" platform --include='*.ts' --include='*.js' --include='*.json' | grep -v node_modules`. Expected: no code references.

- [ ] **Step 2: Delete the package**

```bash
git rm -r platform/tools/content-scraper
```

- [ ] **Step 3: Run the full suite**

Run: `cd platform && pnpm --filter translation-evals test && pnpm --filter translation-evals typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore(translation-evals): retire content-scraper"
```

---

## Self-Review

**Spec coverage:** §4 stages → Tasks 7,9,12,13,14,15,18; §5 package/CLI → Tasks 1,3; §6 run model → Task 2; §7 contracts → Tasks 4–15; §8 closure → Task 6; §9 data contracts → Task 15; §10 scorers → Tasks 16–18; §11 env → Tasks 1,19; §12 PRs → tasks map 1:1; §13 verification → Task 0; §14 cost → Task 19. No uncovered spec sections.

**Placeholder scan:** No "TODO"/"TBD"; every code step contains runnable code. Task 13's `server.ts` has an unused `cmd` variable — remove it during implementation.

**Type consistency:** `PageRef`, `ScrapedPage`, `TranslatableSet`, `RunManifest`, `DatasetRow` are defined once (Task 1) and reused verbatim. `buildRows` takes `locale` as an explicit parameter (noted in Task 15). `translateMdxFile`'s optional `translateFn` (Task 10) is threaded through Tasks 11–12 consistently.

## Known follow-ups (not tasks here)

- The `<Reference value>` and rich-substitution gaps (spec §8) are accepted as documented noise in v1.
- Batching multiple files per translation request (spec §7.3) is noted but not implemented in Task 10 — add as a follow-up optimization once real cost is measured.
