# Suite Logging Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the `translation-evals` suite orchestrator completion-first, machine-parseable progress logging so a human or an AI agent can tell what is running, what finished, and why a stage failed — without reading source or state files.

**Architecture:** One pure formatter (`src/suite/log.ts`) renders every line in a single grammar. The parent (`src/suite/run.ts`) emits scope banners, stage/iteration completions, and failures; the child stages (`scrape`, `translate`, `dataset`) emit integrity warnings and coarse heartbeats, learning their scope from a `SUITE_SCOPE` environment variable. Every line reports a completed action and its result — there are no forward-looking "starting" lines except the two scope banners.

**Tech Stack:** TypeScript (ESM), Node 24, vitest.

**Spec:** No separate spec doc — the design was derived in session. The grammar and the full line set are the contract and live in "Global Constraints" and the task table below. The target output is in "Reference output".

## Global Constraints

- **Grammar (every line):** `TIMESTAMP [SCOPE] EVENT SUBJECT? key=value …`
- **TIMESTAMP:** ISO-8601 UTC, second precision, no milliseconds (`2026-11-12T14:11:04Z`).
- **SCOPE:** `[suite]`, `[base]`, or `[n/total]` — always bracketed. Omitted only when a stage runs standalone (outside `suite`).
- **EVENT:** one of `begin | done | info | warn | fail`, left-padded to 5 characters.
- **SUBJECT:** a single token — `iteration`, `stage=<name>`, `scrape`, `translate`, `dataset`. Optional (the batch banner and the yield warning have none).
- **Completion-first:** every line reports an action that already happened and its result. The **only** exceptions are the two scope banners: `[suite] begin …` and `[n/total] begin iteration …`. There are no `begin stage=…` lines.
- **No per-item lines:** never one line per page, file, or row. All counts are aggregates.
- **Length:** keep lines ≤ ~100 characters.
- **Optional counters:** callers omit an optional counter by passing `undefined` (the formatter skips it); required counts (`completed`, `failed` on the batch line) always print.
- **Attribute values containing a space or `"` are double-quoted.**
- **Durations:** `dur=<seconds>s`, one decimal, never mixed units.
- **Failure reasons:** closed vocabulary `timeout | exit | spawn | exited`, plus `code=<n>` when known.
- **Test command:** `pnpm test <file>` (the package's `test` script is `vitest --run`) from the package root.
- **Commit after every task**; do not push.

## Review Focus

Five conditions the design implies. Each is pinned by a named test in the task that owns the code — verified against the task list below.

1. **A stage runs standalone (no `suite`).** `SUITE_SCOPE` is unset, so every line renders with no `[...]` scope and does not crash — a person running `pnpm translate --project …` still sees warnings. → Task 1 (scope-omitted test) + Task 5 (helper takes an optional scope).
2. **A failure with no exit code (spawn error).** `waitForExit` resolves `{code:null, timedOut:false}` when the child never starts; the line must render `reason=spawn` without `code=null`. → Task 3 (`failReason` unit test, all three shapes).
3. **A duration for a killed stage.** The stage ran the full budget; `dur=` reflects wall clock, not the last sub-step. → Task 3 (timed-out `dur` test).
4. **A scraped page whose `<main>` is missing.** `content` is `''` and the file is **not** written — a blank page would be scored as if it were real content; the `empty` warn must fire even though the scrape "succeeded". → Task 4 (`scrapeWarn` and `shouldWrite` unit tests).
5. **An attribute value containing a space** (the Braintrust experiment name). It must be quoted. → Task 1 (quoting test).

---

## File Structure

- **Create `src/suite/log.ts`** — the line formatter and `logLine`. Pure; the only I/O is `console.log` in the thin wrapper.
- **Create `src/suite/log.test.ts`** — formatter unit tests.
- **Modify `src/suite/run.ts`** — scope plumbing (`SUITE_SCOPE`), banners, stage/iteration completion lines, the yield warning, failure lines, batch end; preserve `StageResult` for failure reasons; remove `formatProgress` usage.
- **Modify `src/suite/progress.ts`, `src/suite/progress.test.ts`** — delete `formatProgress` (its only caller is replaced) and its test block.
- **Modify `src/scrape/browser.ts`** — `scrapeOne` returns a tagged `ScrapeOutcome` instead of losing the skip/empty fact.
- **Modify `src/scrape/prod.ts`, `src/scrape/local.ts`** — call a pure `scrapeWarn` helper and emit a heartbeat.
- **Modify `src/translate/run.ts`** — per-file failure warnings and a per-locale heartbeat.
- **Modify `src/dataset/rows.ts`** — emit per-locale `info` counts and a `warn` when a locale dropped rows. `buildDataset` keeps returning `DatasetRow[]` (callers unchanged).

---

## Task 1: The log-line formatter

**Files:**
- Create: `src/suite/log.ts`
- Test: `src/suite/log.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type LogEvent = 'begin' | 'done' | 'info' | 'warn' | 'fail'`
  - `interface LogLine { scope?: string; event: LogEvent; subject?: string; attrs?: Record<string, string | number | boolean | undefined> }`
  - `function formatLogLine(line: LogLine, now?: Date): string`
  - `function logLine(line: LogLine): void`

- [ ] **Step 1: Write the failing test**

```ts
// src/suite/log.test.ts
import { describe, expect, it } from 'vitest';
import { formatLogLine } from './log.js';

const at = new Date('2026-11-12T14:11:04.778Z');

describe('formatLogLine', () => {
  it('renders a stage completion with duration', () => {
    expect(
      formatLogLine({ scope: '1/2', event: 'done', subject: 'stage=translate', attrs: { dur: '132.7s' } }, at),
    ).toBe('2026-11-12T14:11:04Z [1/2] done  stage=translate dur=132.7s');
  });

  it('renders a batch banner with no subject', () => {
    expect(
      formatLogLine({ scope: 'suite', event: 'begin', attrs: { id: 'manual-sweep', iterations: 2 } }, at),
    ).toBe('2026-11-12T14:11:04Z [suite] begin id=manual-sweep iterations=2');
  });

  it('omits undefined attrs and quotes values containing spaces', () => {
    expect(
      formatLogLine(
        { scope: '1/2', event: 'info', subject: 'eval', attrs: { experiment: 'a b', rows: 140, x: undefined } },
        at,
      ),
    ).toBe('2026-11-12T14:11:04Z [1/2] info  eval experiment="a b" rows=140');
  });

  it('omits the scope when unset (standalone run)', () => {
    expect(formatLogLine({ event: 'warn', subject: 'scrape', attrs: { status: 404 } }, at)).toBe(
      '2026-11-12T14:11:04Z warn  scrape status=404',
    );
  });

  it('leaves a five-letter begin unpadded and pads a four-letter event', () => {
    expect(formatLogLine({ scope: 'base', event: 'begin', subject: 'stage=resolve' }, at)).toBe(
      '2026-11-12T14:11:04Z [base] begin stage=resolve',
    );
    expect(formatLogLine({ scope: 'base', event: 'done', subject: 'stage=resolve' }, at)).toBe(
      '2026-11-12T14:11:04Z [base] done  stage=resolve',
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/suite/log.test.ts`
Expected: FAIL — `Cannot find module './log.js'`.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/suite/log.ts
export type LogEvent = 'begin' | 'done' | 'info' | 'warn' | 'fail';

export interface LogLine {
  scope?: string;
  event: LogEvent;
  subject?: string;
  attrs?: Record<string, string | number | boolean | undefined>;
}

const EVENT_WIDTH = 5;

function isoSeconds(now: Date): string {
  return now.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function renderAttr(key: string, value: string | number | boolean): string {
  const s = String(value);
  return /[\s"]/.test(s) ? `${key}="${s.replace(/"/g, '\\"')}"` : `${key}=${s}`;
}

export function formatLogLine(line: LogLine, now: Date = new Date()): string {
  const tokens = [isoSeconds(now)];
  if (line.scope) tokens.push(`[${line.scope}]`);
  tokens.push(line.event.padEnd(EVENT_WIDTH));
  if (line.subject) tokens.push(line.subject);
  for (const [key, value] of Object.entries(line.attrs ?? {})) {
    if (value === undefined) continue;
    tokens.push(renderAttr(key, value));
  }
  return tokens.join(' ');
}

export function logLine(line: LogLine): void {
  console.log(formatLogLine(line));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/suite/log.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/suite/log.ts src/suite/log.test.ts
git commit -m "DOP-7507: add suite log-line formatter"
```

---

## Task 2: Scope plumbing, banners, and completion lines

**Files:**
- Modify: `src/suite/run.ts`
- Modify: `src/suite/progress.ts`, `src/suite/progress.test.ts` (remove `formatProgress`)
- Test: `src/suite/run.test.ts`

**Interfaces:**
- Consumes: `logLine` from Task 1.
- Produces: `SUITE_SCOPE` env var set on every spawned stage — `'base'` for base-run stages, `` `${index}/${total}` `` for iteration stages. `runIteration` and `runBase` take the scope so child stages inherit it.

- [ ] **Step 1: Write the failing test**

Add to `src/suite/run.test.ts` (it already has `fixture()`, `okDeps()`, `TEST_ENV`):

```ts
it('emits scope banners and stage/iteration completions', async () => {
  const { configFile, cfg } = fixture({ repeats: 1 });
  const lines: string[] = [];
  const spy = vi.spyOn(console, 'log').mockImplementation((l: string) => void lines.push(l));
  await runSuite({ configFile }, okDeps(), cfg, TEST_ENV);
  spy.mockRestore();
  expect(lines.some((l) => /^\[?\d{4}-.*\[suite\] begin id=b iterations=1/.test(l) || /\[suite\] begin id=b iterations=1/.test(l))).toBe(true);
  expect(lines.some((l) => /\[1\/1\] begin iteration id=anthropic:m#1 run=/.test(l))).toBe(true);
  expect(lines.some((l) => /\[1\/1\] done {2}stage=translate dur=\d/.test(l))).toBe(true);
  expect(lines.some((l) => /\[1\/1\] done {2}iteration status=completed dur=\d/.test(l))).toBe(true);
  expect(lines.some((l) => /\[suite\] done id=b completed=1 failed=0/.test(l))).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/suite/run.test.ts -t "scope banners"`
Expected: FAIL — no matching lines.

- [ ] **Step 3: Implement**

In `src/suite/run.ts`:

```ts
import { logLine } from './log.js';

function durationSeconds(startedAt: number): string {
  return `${((Date.now() - startedAt) / 1000).toFixed(1)}s`;
}
```

In `runSuite`, before the base run, emit the batch banner:

```ts
logLine({
  scope: 'suite',
  event: 'begin',
  attrs: { id: suite.name, iterations: iterations.length, locales: suite.locales.join(','), judge: suite.judge },
});
```

Change `runBase` to accept a scope and set it on the env, and wrap each stage with timing + a `done` line:

```ts
async function runBase(deps, cfg, suite, env, scope: string): Promise<void> {
  const baseEnv = { ...env, SUITE_SCOPE: scope };
  const resolveAt = Date.now();
  const resolved = await deps.runStage('resolve', [/* unchanged args */], baseEnv, STAGE_TIMEOUT_MS);
  if (stageFailed(resolved)) { /* Task 3 adds the fail line */ throw new Error('base run: resolve stage failed'); }
  logLine({ scope, event: 'done', subject: 'stage=resolve', attrs: { dur: durationSeconds(resolveAt) } });
  // …same shape for scrape-prod…
}
```

Call it with `runBase(deps, cfg, suite, env, 'base')`.

After the base run, extend the existing yield log (see `run.ts:473`) into a warning when the scrape is short — the shortfall is already computed by `countProdYield`:

```ts
const { present, expected } = state.prodYield;
logLine({ scope: 'base', event: 'warn', attrs: { yield: `${present}/${expected}`, missing: expected - present } });
```

Emit this **only when `present < expected`**; otherwise keep the existing `formatYield` line unchanged.

In the iteration loop, compute the scope and pass it into `runIteration`; emit the iteration banner (with a blank line before every iteration after the first):

```ts
if (index > 1) console.log('');
const scope = `${index}/${total}`;
logLine({ scope, event: 'begin', subject: 'iteration', attrs: { id: it.id, run: runId } });
```

Add `scope: string` to `IterationContext`. In `runIteration`, set the env without changing `iterationEnv`'s signature:

```ts
const env = { ...iterationEnv(ctx.env, suite, it), SUITE_SCOPE: ctx.scope };
```

Wrap each `deps.runStage(...)` call (translate, scrape-local, dataset, eval) with a `startedAt` and a `done` line:

```ts
const startedAt = Date.now();
const translate = await deps.runStage('translate', runArgs, env, STAGE_TIMEOUT_MS);
logLine({ scope, event: 'done', subject: 'stage=translate', attrs: { dur: durationSeconds(startedAt) } });
```

For the per-locale `serve` envelope, emit `done` **only on success** — after the `try` body, not in the `finally` (the `finally` runs on failure too):

```ts
const serveAt = Date.now();
const handle = deps.startServe([...runArgs, '--locale', locale], env);
try {
  await Promise.race([/* unchanged */]);
  const scraped = await deps.runStage('scrape-local', [...runArgs, '--locale', locale], env, STAGE_TIMEOUT_MS);
  if (stageFailed(scraped)) return 'failed'; // Task 3 adds the fail line
  logLine({ scope, event: 'done', subject: 'stage=serve', attrs: { locale, dur: durationSeconds(serveAt) } });
} finally {
  handle.kill();
  await deps.waitForPortFree(cfg.localOrigin, PORT_FREE_TIMEOUT_MS);
}
```

Replace the `console.log(formatProgress(...))` at `run.ts:518` with:

```ts
logLine({ scope, event: 'done', subject: 'iteration', attrs: { status, dur: durationSeconds(iterationAt) } });
```

After the loop, emit the batch end (with a blank line before the summary):

```ts
const done = iterations.filter((i) => ['completed', 'partial'].includes(state.iterations[i.id]?.status ?? '')).length;
const failed = iterations.filter((i) => state.iterations[i.id]?.status === 'failed').length;
console.log('');
logLine({ scope: 'suite', event: 'done', attrs: { id: suite.name, completed: done, failed } });
```

Finally, delete `formatProgress` from `src/suite/progress.ts` and its `describe('formatProgress', …)` block from `src/suite/progress.test.ts`, and drop it from the import at `run.ts:14`.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/suite/run.test.ts src/suite/progress.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/suite/run.ts src/suite/progress.ts src/suite/progress.test.ts src/suite/run.test.ts
git commit -m "DOP-7507: emit suite/iteration banners and stage completions"
```

---

## Task 3: Failure lines with a reason

**Files:**
- Modify: `src/suite/run.ts`
- Test: `src/suite/run.test.ts`

**Interfaces:**
- Consumes: `logLine`; `StageResult` (`{ code: number | null; timedOut: boolean }`).
- Produces: `function failReason(result: StageResult): { reason: string; code?: number }` (exported for testing).

- [ ] **Step 1: Write the failing tests**

```ts
// in src/suite/run.test.ts
import { runSuite, failReason /* …existing imports… */ } from './run.js';

describe('failReason', () => {
  it('names a timeout', () => {
    expect(failReason({ code: null, timedOut: true })).toEqual({ reason: 'timeout' });
  });
  it('names a spawn error with no code', () => {
    expect(failReason({ code: null, timedOut: false })).toEqual({ reason: 'spawn' });
  });
  it('names a non-zero exit with its code', () => {
    expect(failReason({ code: 1, timedOut: false })).toEqual({ reason: 'exit', code: 1 });
  });
});

it('emits a fail line naming the stage and reason on timeout', async () => {
  const { configFile, cfg } = fixture({ repeats: 1 });
  const lines: string[] = [];
  const spy = vi.spyOn(console, 'log').mockImplementation((l: string) => void lines.push(l));
  const deps = okDeps({
    runStage: async (stage, args) => {
      if (stage === 'resolve' || stage === 'scrape-prod') seedRunDir(args);
      if (stage === 'translate') return { code: null, timedOut: true };
      return { code: 0, timedOut: false };
    },
  });
  await runSuite({ configFile }, deps, cfg, TEST_ENV);
  spy.mockRestore();
  expect(lines.some((l) => /\[1\/1\] fail {2}stage=translate reason=timeout dur=\d/.test(l))).toBe(true);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test src/suite/run.test.ts -t "failReason"`
Expected: FAIL — `failReason` is not exported.

- [ ] **Step 3: Implement**

```ts
export function failReason(result: StageResult): { reason: string; code?: number } {
  if (result.timedOut) return { reason: 'timeout' };
  if (result.code === null) return { reason: 'spawn' };
  return { reason: 'exit', code: result.code };
}
```

Replace each bare `if (stageFailed(x)) return 'failed';` (translate, scrape-local, dataset, eval) with a `logLine` before returning:

```ts
if (stageFailed(translate)) {
  logLine({ scope, event: 'fail', subject: 'stage=translate', attrs: { ...failReason(translate), dur: durationSeconds(startedAt) } });
  return 'failed';
}
```

In the `catch` at `run.ts:511-514`, emit `logLine({ scope, event: 'fail', subject: 'iteration', attrs: { reason: 'exception', err: message(err) } })`.

In `runBase`, emit a `fail` line before each `throw`:

```ts
if (stageFailed(resolved)) {
  logLine({ scope, event: 'fail', subject: 'stage=resolve', attrs: { ...failReason(resolved), dur: durationSeconds(resolveAt) } });
  throw new Error('base run: resolve stage failed');
}
```

Fix the discarded serve exit code at `run.ts:304` so the failure is attributed: change the race handler to capture the code and rethrow it in the message.

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test src/suite/run.test.ts`
Expected: PASS (including the three `failReason` tests and the timeout test).

- [ ] **Step 5: Commit**

```bash
git add src/suite/run.ts src/suite/run.test.ts
git commit -m "DOP-7507: emit attributed failure lines"
```

---

## Task 4: Scrape integrity warnings and heartbeat

**Files:**
- Modify: `src/scrape/browser.ts`, `src/scrape/prod.ts`, `src/scrape/local.ts`
- Test: `src/scrape/prod.test.ts`

**Interfaces:**
- Consumes: `logLine`, `LogLine`; `process.env.SUITE_SCOPE`.
- Produces:
  - `type ScrapeOutcome = { kind: 'ok'; page: Page } | { kind: 'skipped'; status: number } | { kind: 'empty'; page: Page }` where `Page = { url: string; title: string; content: string }`.
  - `function scrapeWarn(scope: string | undefined, slug: string, locale: string, outcome: ScrapeOutcome): LogLine | null` (exported, pure).

- [ ] **Step 1: Write the failing test**

The existing `prod.test.ts` only tests URL builders and `scrapeProd` has no browser seam, so test the pure helper directly:

```ts
// in src/scrape/prod.test.ts
import { scrapeWarn } from './prod.js';

describe('scrapeWarn', () => {
  it('warns on a skipped page with its status', () => {
    expect(scrapeWarn('base', 'atlas__alerts', 'en', { kind: 'skipped', status: 404 })).toEqual({
      scope: 'base', event: 'warn', subject: 'scrape', attrs: { status: 404, slug: 'atlas__alerts', locale: 'en' },
    });
  });
  it('warns on an empty page', () => {
    expect(scrapeWarn('1/2', 'aggregation', 'pt-br', { kind: 'empty', page: { url: '', title: '', content: '' } })).toEqual({
      scope: '1/2', event: 'warn', subject: 'scrape', attrs: { empty: 1, slug: 'aggregation', locale: 'pt-br' },
    });
  });
  it('is silent on success', () => {
    expect(scrapeWarn('1/2', 's', 'es', { kind: 'ok', page: { url: '', title: '', content: 'x' } })).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/scrape/prod.test.ts -t "scrapeWarn"`
Expected: FAIL — `scrapeWarn` is not exported.

- [ ] **Step 3: Implement**

In `src/scrape/browser.ts`, change `scrapeOne` to return the tagged outcome (return `{ kind: 'skipped', status }` for `isSkippableStatus`, `{ kind: 'empty', page }` when `content.trim() === ''`, else `{ kind: 'ok', page }`). Its only callers are `prod.ts:30` and `local.ts:26`.

In `src/scrape/prod.ts`:

```ts
import { logLine, type LogLine } from '../suite/log.js';

export function scrapeWarn(
  scope: string | undefined,
  slug: string,
  locale: string,
  outcome: ScrapeOutcome,
): LogLine | null {
  if (outcome.kind === 'skipped') return { scope, event: 'warn', subject: 'scrape', attrs: { status: outcome.status, slug, locale } };
  if (outcome.kind === 'empty') return { scope, event: 'warn', subject: 'scrape', attrs: { empty: 1, slug, locale } };
  return null;
}
```

In both `prod.ts` and `local.ts`, inside the page loop:

```ts
const scope = process.env.SUITE_SCOPE;
const outcome = await scrapeOne(browser, url);
const warn = scrapeWarn(scope, page.slug, dirName /* prod */ /* locale in local.ts */, outcome);
if (warn) logLine(warn);
if (shouldWrite(outcome)) fs.writeFileSync(path.join(outDir, `${page.slug}.json`), JSON.stringify(outcome.page, null, 2));
```

Add a per-locale heartbeat at the existing cooldown tick. In each file, before the page loop define `const pageCount = m.pages.length;` and a per-locale counter `let pagesDone = 0;`:

```ts
if (++pagesDone % COOLDOWN_EVERY === 0) {
  logLine({ scope, event: 'info', subject: 'scrape', attrs: { locale: dirName /* or locale */, progress: `${pagesDone}/${pageCount}` } });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/scrape/prod.test.ts src/scrape/local.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/scrape/browser.ts src/scrape/prod.ts src/scrape/local.ts src/scrape/prod.test.ts
git commit -m "DOP-7507: warn on skipped/empty scrapes and add scrape heartbeat"
```

---

## Task 5: Translate failure warnings and heartbeat

**Files:**
- Modify: `src/translate/run.ts`
- Test: `src/translate/run.test.ts`

**Interfaces:**
- Consumes: `logLine`; `process.env.SUITE_SCOPE`; `translateRun`'s existing `translateFn` parameter (`translate/run.ts:33`) as the test seam.
- Produces: `function keyCount(message: string): string | undefined` (exported, pure) — extracts `"N of M failed"` from an adapter error.

- [ ] **Step 1: Write the failing tests**

```ts
// in src/translate/run.test.ts
import { keyCount, translateRun } from './run.js';

describe('keyCount', () => {
  it('extracts the failed-key fraction', () => {
    expect(keyCount('2 of 180 keys failed; first: "x" gateway 429')).toBe('2 of 180 failed');
  });
  it('returns undefined when the message has no key count', () => {
    expect(keyCount('network error')).toBeUndefined();
  });
});

it('warns per failed file and emits a per-locale heartbeat', async () => {
  const lines: string[] = [];
  const spy = vi.spyOn(console, 'log').mockImplementation((l: string) => void lines.push(l));
  // uses the existing translateRun fixture in this file; the fake translateFn throws for one file
  // … (see existing tests in this file for the cfg/manifest fixture) …
  spy.mockRestore();
  expect(lines.some((l) => /warn {2}translate file=/.test(l))).toBe(true);
  expect(lines.some((l) => /info {2}stage=translate locale=es files=\d+\/\d+/.test(l))).toBe(true);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test src/translate/run.test.ts -t "keyCount"`
Expected: FAIL — `keyCount` is not exported.

- [ ] **Step 3: Implement**

```ts
export function keyCount(message: string): string | undefined {
  const m = /(\d+) of (\d+) keys failed/.exec(message);
  return m ? `${m[1]} of ${m[2]} failed` : undefined;
}
```

In `translateRun`, in the **file-loop** catch (the one at `translate/run.ts:50`, where `rel` is in scope):

```ts
import { logLine } from '../suite/log.js';

const scope = process.env.SUITE_SCOPE;
// inside `catch (err)` for a file:
logLine({ scope, event: 'warn', subject: 'translate', attrs: { file: rel, keys: keyCount(describe(err)) } });
```

Do **not** add a warn at the references catch (`translate/run.ts:69`) — it has no `rel`; leave it as-is.

After the file loop for each locale, emit the heartbeat (`total` = `m.translatable.pages.length + m.translatable.includes.length`):

```ts
logLine({ scope, event: 'info', subject: 'stage=translate', attrs: { locale, files: `${files.length}/${total}` } });
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test src/translate/run.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/translate/run.ts src/translate/run.test.ts
git commit -m "DOP-7507: warn on translate file failures and add heartbeat"
```

---

## Task 6: Dataset per-locale counts and dropped warning

**Files:**
- Modify: `src/dataset/rows.ts`
- Test: `src/dataset/rows.test.ts`

**Interfaces:**
- Consumes: `logLine`; `process.env.SUITE_SCOPE`.
- Produces: no signature change — `buildDataset` keeps returning `DatasetRow[]`. It emits lines internally.

- [ ] **Step 1: Write the failing test**

`rows.test.ts` already builds a fixture and calls `buildDataset(cfg, 'atlas', 'r')` (see its existing tests). Add one that spies on `console.log`:

```ts
it('emits a per-locale info line and a dropped warn', () => {
  // reuse the existing fixture used by the other buildDataset tests in this file
  const lines: string[] = [];
  const spy = vi.spyOn(console, 'log').mockImplementation((l: string) => void lines.push(l));
  buildDataset(cfg, 'atlas', 'r');
  spy.mockRestore();
  expect(lines.some((l) => /info {2}stage=dataset locale=es rows=\d+\/\d+/.test(l))).toBe(true);
  expect(lines.some((l) => /warn {2}dataset locale=\w+ dropped=\d+/.test(l))).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/dataset/rows.test.ts -t "per-locale info"`
Expected: FAIL.

- [ ] **Step 3: Implement**

In `buildDataset`, replace the per-page `console.warn` at `rows.ts:114` with a per-locale counter, and emit one warn per locale that dropped anything plus one info line per locale:

```ts
import { logLine } from '../suite/log.js';

const scope = process.env.SUITE_SCOPE;
// inside the `for (const locale of m.locales)` loop:
let dropped = 0;
let built = 0;
// … increment `dropped` where the old warn fired, and `built` where a row is pushed …
if (dropped > 0) logLine({ scope, event: 'warn', subject: 'dataset', attrs: { locale, dropped } });
logLine({ scope, event: 'info', subject: 'stage=dataset', attrs: { locale, rows: `${built}/${m.pages.length + m.translatable.includes.length}` } });
```

Keep the existing `console.error('dataset: ${rows.length} rows')` at `rows.ts:127` untouched (it is the stage's own summary). Do not change the return type.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/dataset/rows.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/dataset/rows.ts src/dataset/rows.test.ts
git commit -m "DOP-7507: aggregate dataset drops per locale"
```

---

## Reference output

After all tasks, a 2-iteration / 2-locale run over `pages/manual.txt` should read. Blank lines separate the phases and each iteration; there are no `begin stage=` lines.

```text
2026-11-12T14:02:03Z [suite] begin id=manual-sweep iterations=2 locales=es,pt-br judge=claude-fable-5-1
2026-11-12T14:02:19Z [base] done  stage=resolve dur=16.3s
2026-11-12T14:03:12Z [base] warn  scrape status=404 slug=atlas__alerts locale=en
2026-11-12T14:08:51Z [base] done  stage=scrape-prod dur=392.5s
2026-11-12T14:08:51Z [base] warn  yield=23/24 missing=1

2026-11-12T14:08:52Z [1/2] begin iteration id=anthropic:claude-opus-5-5#1 run=2026-11-12-a1b2c3
2026-11-12T14:11:04Z [1/2] info  stage=translate locale=es files=70/70
2026-11-12T14:11:04Z [1/2] done  stage=translate dur=132.7s
2026-11-12T14:13:41Z [1/2] done  stage=serve locale=es dur=157.0s
2026-11-12T14:14:10Z [1/2] warn  scrape empty=1 slug=aggregation locale=pt-br
2026-11-12T14:16:20Z [1/2] done  stage=serve locale=pt-br dur=158.0s
2026-11-12T14:16:31Z [1/2] info  stage=dataset locale=es rows=70/70
2026-11-12T14:16:31Z [1/2] info  stage=dataset locale=pt-br rows=70/70
2026-11-12T14:16:31Z [1/2] done  stage=dataset dur=8.1s
2026-11-12T14:20:44Z [1/2] done  stage=eval dur=253.0s
2026-11-12T14:20:44Z [1/2] done  iteration status=completed dur=712.0s

2026-11-12T14:20:45Z [2/2] begin iteration id=anthropic:claude-sonnet-5-5#1 run=2026-11-12-d4e5f6
2026-11-12T14:22:51Z [2/2] warn  translate file=_includes/filters.mdx keys="2 of 180 failed"
2026-11-12T14:22:51Z [2/2] done  stage=translate dur=126.1s
2026-11-12T14:25:30Z [2/2] done  stage=serve locale=es dur=159.0s
2026-11-12T14:55:31Z [2/2] fail  stage=scrape-local locale=pt-br reason=timeout dur=1800.0s
2026-11-12T14:55:33Z [2/2] done  iteration status=failed dur=2088.0s

2026-11-12T14:55:33Z [suite] done id=manual-sweep completed=1 failed=1

2026-11-12T14:55:33Z production scrape yield: 23/24  DEGRADED (1 missing)
anthropic claude-opus-5-5  completed=1 partial=0 failed=0
  anthropic:claude-opus-5-5#1 completed  anthropic claude-opus-5-5--2026-11-12-a1b2c3
anthropic claude-sonnet-5-5  completed=0 partial=0 failed=1
  anthropic:claude-sonnet-5-5#1 failed
```

(The final `formatSummary` block is unchanged. The failing stage is `scrape-local` — wrapped in `STAGE_TIMEOUT_MS` (1800s) — not `serve`, whose ready-wait is only `READY_TIMEOUT_MS` (120s).)

## Self-review notes

- **Spec coverage:** every reference-output line maps to a task — banners and `done` lines (Task 2), `fail` lines (Task 3), `scrape` warns/heartbeat (Task 4), `translate` warn/heartbeat (Task 5), `dataset` info/warn (Task 6). The `yield` warn is emitted in Task 2 from the existing `state.prodYield`.
- **Cross-process:** the child stages emit their own lines using `SUITE_SCOPE`; no task assumes child→parent data flow. `buildDataset` keeps its `DatasetRow[]` return, so its callers (`commands/index.ts:106`, three test call sites) are untouched.
- **Type consistency:** `LogEvent`/`LogLine` (Task 1) are used unchanged throughout; `'done'` (not `'end'`) is the batch-completion event; `ScrapeOutcome`/`scrapeWarn` (Task 4) and `keyCount` (Task 5) are declared where produced.
- **Review Focus tests:** condition 1 → Task 1 (scope-omitted) + Task 4/5 (`scope?: string`); condition 2 → Task 3 (`failReason` spawn test); condition 3 → Task 3 (timeout `dur` test); condition 4 → Task 4 (`scrapeWarn` empty test); condition 5 → Task 1 (quoting test).
