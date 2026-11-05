import fs from 'node:fs';
import path from 'node:path';
import type { ChildProcess } from 'node:child_process';
import { BackendName } from '@mongodb-docs/translation-service';
import { loadConfig, type Config } from '../config.js';
import { buildExperimentName, localesFromRows } from '../eval/experiment-name.js';
import { newRunId, readManifest, runDir } from '../run/manifest.js';
import type { DatasetRow, RunManifest } from '../types.js';
import { judgeWarnings, loadSuiteConfig, type SuiteConfig } from './config.js';
import { expandPlan, type Iteration } from './plan.js';
import { hasPristine, restorePristine, snapshotPristine } from './isolation.js';
import { killTree, spawnStage, waitForExit, type StageResult } from './stage.js';
import { waitForHttp, waitForPortFree } from './server-lifecycle.js';
import { formatProgress, formatSummary, formatYield } from './progress.js';
import {
  baseFingerprint,
  planRuns,
  readState,
  sha256Hex,
  suiteDir,
  suiteFingerprint,
  writeState,
  type BatchState,
  type IterationRecord,
  type IterationStatus,
} from './state.js';

export type { StageResult } from './stage.js';

export const READY_TIMEOUT_MS = 120_000;
export const STAGE_TIMEOUT_MS = 30 * 60_000;
export const PORT_FREE_TIMEOUT_MS = 60_000;
export const PORT_CHECK_TIMEOUT_MS = 5_000;

const POLL_INTERVAL_MS = 1000;

export interface SuiteOptions {
  configFile: string;
  force?: boolean;
  dryRun?: boolean;
}

export interface ServeHandle {
  exited: Promise<number | null>;
  kill(): void;
}

export interface SuiteDeps {
  runStage(
    stage: string,
    args: string[],
    env: NodeJS.ProcessEnv,
    timeoutMs: number,
  ): Promise<StageResult>;
  startServe(args: string[], env: NodeJS.ProcessEnv): ServeHandle;
  waitForHttp(url: string, timeoutMs: number): Promise<void>;
  waitForPortFree(origin: string, timeoutMs: number): Promise<void>;
  killActive(): void;
  onSignal(handler: (signal: NodeJS.Signals) => void): () => void;
  exit(code: number): void;
}

export function defaultDeps(): SuiteDeps {
  const active = new Set<ChildProcess>();
  const track = (child: ChildProcess): ChildProcess => {
    active.add(child);
    const forget = (): void => {
      active.delete(child);
    };
    child.on('exit', forget);
    child.on('error', forget);
    return child;
  };

  return {
    runStage: (stage, args, env, timeoutMs) =>
      waitForExit(track(spawnStage(stage, args, env)), timeoutMs),
    startServe: (args, env) => {
      const child = track(spawnStage('serve', args, env));
      return {
        exited: new Promise((resolve) => {
          child.on('exit', (code) => resolve(code));
          child.on('error', () => resolve(null));
        }),
        kill: () => killTree(child),
      };
    },
    waitForHttp: (url, timeoutMs) => waitForHttp(url, timeoutMs, POLL_INTERVAL_MS),
    waitForPortFree: (origin, timeoutMs) => waitForPortFree(origin, timeoutMs, POLL_INTERVAL_MS),
    killActive: () => {
      for (const child of active) {
        try {
          killTree(child);
        } catch (err) {
          console.error(`failed to kill stage process ${child.pid}: ${message(err)}`);
        }
      }
    },
    onSignal: (handler) => {
      process.on('SIGINT', handler);
      process.on('SIGTERM', handler);
      return () => {
        process.off('SIGINT', handler);
        process.off('SIGTERM', handler);
      };
    },
    exit: (code) => process.exit(code),
  };
}

function requireEnv(env: NodeJS.ProcessEnv, key: string): void {
  if ((env[key] ?? '').trim() === '') {
    throw new Error(`missing required environment variable: ${key}`);
  }
}

export function preflight(cfg: Config, suite: SuiteConfig, env: NodeJS.ProcessEnv): void {
  requireEnv(env, 'AI_GATEWAY_API_KEY');
  requireEnv(env, 'BRAINTRUST_API_KEY');

  if (suite.translators.some((t) => t.backend === BackendName.AwsTranslate)) {
    const hasProfile = (env.AWS_PROFILE ?? '').trim() !== '';
    const hasKeys =
      (env.AWS_ACCESS_KEY_ID ?? '').trim() !== '' && (env.AWS_SECRET_ACCESS_KEY ?? '').trim() !== '';
    if (!hasProfile && !hasKeys) {
      throw new Error(
        'missing AWS credentials: set AWS_PROFILE or both AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY',
      );
    }
  }

  const contentRoot = path.resolve(cfg.contentMdxDir);
  const siteDir = path.resolve(cfg.contentMdxDir, suite.project);
  if (siteDir !== contentRoot && !siteDir.startsWith(contentRoot + path.sep)) {
    throw new Error(`suite project "${suite.project}" escapes content-mdx/`);
  }
  if (!fs.existsSync(siteDir)) {
    throw new Error(`content-mdx/${suite.project} not found`);
  }
  if (!fs.existsSync(suite.pages)) {
    throw new Error(`pages file not found: ${suite.pages}`);
  }
}

async function ensurePortFree(deps: SuiteDeps, origin: string): Promise<void> {
  try {
    await deps.waitForPortFree(origin, PORT_CHECK_TIMEOUT_MS);
  } catch {
    throw new Error(`${origin} is already in use — stop whatever is listening there and re-run`);
  }
}

export function iterationOverrides(suite: SuiteConfig, it: Iteration): Record<string, string> {
  return {
    TRANSLATOR_BACKEND: it.backend,
    TRANSLATOR_MODEL: it.model ?? '',
    TARGET_LOCALES: suite.locales.join(','),
    JUDGE_MODEL: suite.judge,
  };
}

// A shell EVAL_EXPERIMENT_NAME would give every iteration the same Braintrust
// experiment name, so it is blanked (which the stage config treats as unset).
export function iterationEnv(
  env: NodeJS.ProcessEnv,
  suite: SuiteConfig,
  it: Iteration,
): NodeJS.ProcessEnv {
  return { ...env, ...iterationOverrides(suite, it), EVAL_EXPERIMENT_NAME: '' };
}

function message(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

function stageFailed(result: StageResult): boolean {
  return result.timedOut || result.code !== 0;
}

function countProdYield(
  cfg: Config,
  project: string,
  runId: string,
  manifest: RunManifest,
): { present: number; expected: number } {
  const prodDir = path.join(runDir(cfg, project, runId), 'prod');
  let present = 0;
  for (const dirName of ['en', ...manifest.locales]) {
    for (const page of manifest.pages) {
      if (fs.existsSync(path.join(prodDir, dirName, `${page.slug}.json`))) present++;
    }
  }
  return { present, expected: manifest.pages.length * (1 + manifest.locales.length) };
}

function seedRunDir(cfg: Config, project: string, baseRunId: string, runId: string): void {
  const source = runDir(cfg, project, baseRunId);
  const target = runDir(cfg, project, runId);
  fs.mkdirSync(target, { recursive: true });
  fs.copyFileSync(path.join(source, 'manifest.json'), path.join(target, 'manifest.json'));
  const prod = path.join(source, 'prod');
  if (fs.existsSync(prod)) {
    fs.cpSync(prod, path.join(target, 'prod'), { recursive: true });
  }
}

function readFailures(cfg: Config, project: string, runId: string): Record<string, unknown> {
  const file = path.join(runDir(cfg, project, runId), 'translate-failures.json');
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, unknown>;
}

function hasFailures(failures: Record<string, unknown>): boolean {
  return Object.values(failures).some((entries) => Array.isArray(entries) && entries.length > 0);
}

function experimentNameFor(cfg: Config, suite: SuiteConfig, it: Iteration, runId: string): string {
  const rowsPath = path.join(runDir(cfg, suite.project, runId), 'dataset', 'rows.json');
  const locales = fs.existsSync(rowsPath)
    ? localesFromRows(JSON.parse(fs.readFileSync(rowsPath, 'utf8')) as DatasetRow[])
    : [...suite.locales].sort();
  return buildExperimentName({
    project: suite.project,
    locales,
    runId,
    translatorModel: it.model,
    judgeModel: suite.judge,
  });
}

async function runBase(
  deps: SuiteDeps,
  cfg: Config,
  suite: SuiteConfig,
  env: NodeJS.ProcessEnv,
): Promise<void> {
  const resolved = await deps.runStage(
    'resolve',
    [
      '--project',
      suite.project,
      '--pages',
      suite.pages,
      '--locales',
      suite.locales.join(','),
      '--run',
      suite.name,
    ],
    env,
    STAGE_TIMEOUT_MS,
  );
  if (stageFailed(resolved)) throw new Error('base run: resolve stage failed');

  fs.rmSync(path.join(runDir(cfg, suite.project, suite.name), 'prod'), {
    recursive: true,
    force: true,
  });
  const scraped = await deps.runStage(
    'scrape-prod',
    ['--project', suite.project, '--run', suite.name],
    env,
    STAGE_TIMEOUT_MS,
  );
  if (stageFailed(scraped)) throw new Error('base run: scrape-prod stage failed');
}

interface IterationContext {
  cfg: Config;
  suite: SuiteConfig;
  env: NodeJS.ProcessEnv;
  runId: string;
  manifest: RunManifest;
  record: IterationRecord;
}

async function runIteration(
  deps: SuiteDeps,
  ctx: IterationContext,
  it: Iteration,
): Promise<IterationStatus> {
  const { cfg, suite, runId, manifest, record } = ctx;
  const project = suite.project;
  const env = iterationEnv(ctx.env, suite, it);
  const runArgs = ['--project', project, '--run', runId];

  restorePristine(cfg, project, suite.name);
  await ensurePortFree(deps, cfg.localOrigin);

  const translate = await deps.runStage('translate', runArgs, env, STAGE_TIMEOUT_MS);
  if (stageFailed(translate)) return 'failed';

  const partial = hasFailures(readFailures(cfg, project, runId));

  const firstPage = manifest.pages[0];
  if (!firstPage) throw new Error(`manifest for run ${runId} has no pages`);
  const readyUrl = `${cfg.localOrigin}${firstPage.urlPath}`;

  for (const locale of suite.locales) {
    restorePristine(cfg, project, suite.name);
    await ensurePortFree(deps, cfg.localOrigin);
    const handle = deps.startServe([...runArgs, '--locale', locale], env);
    try {
      await Promise.race([
        deps.waitForHttp(readyUrl, READY_TIMEOUT_MS),
        handle.exited.then(() => {
          throw new Error('serve exited before ready');
        }),
      ]);
      const scraped = await deps.runStage(
        'scrape-local',
        [...runArgs, '--locale', locale],
        env,
        STAGE_TIMEOUT_MS,
      );
      if (stageFailed(scraped)) return 'failed';
    } finally {
      handle.kill();
      await deps.waitForPortFree(cfg.localOrigin, PORT_FREE_TIMEOUT_MS);
    }
  }

  const dataset = await deps.runStage('dataset', runArgs, env, STAGE_TIMEOUT_MS);
  if (stageFailed(dataset)) return 'failed';

  record.experimentName = experimentNameFor(cfg, suite, it, runId);
  const evaluated = await deps.runStage('eval', runArgs, env, STAGE_TIMEOUT_MS);
  if (stageFailed(evaluated)) return 'failed';

  return partial ? 'partial' : 'completed';
}

function printDryRun(
  suite: SuiteConfig,
  iterations: Iteration[],
  state: BatchState,
  pagesDigest: string,
  force: boolean,
  baseChanged: boolean,
): void {
  if (state.prodYield === undefined) {
    console.log('base run: resolve + scrape-prod will run');
  } else if (baseChanged) {
    console.log(
      force
        ? 'base run: inputs changed; resolve + scrape-prod will re-run'
        : 'base run: inputs changed; a real run fails without --force',
    );
  } else {
    console.log(`base run: reused (${formatYield(state.prodYield)})`);
  }

  const { skipped, stale } = planRuns(suite, iterations, state, pagesDigest, false);
  const skippedIds = new Set(skipped.map((i) => i.id));
  const staleIds = new Set(stale.map((i) => i.id));
  for (const it of iterations) {
    const overrides = JSON.stringify(iterationOverrides(suite, it));
    const status = state.iterations[it.id]?.status;
    if (staleIds.has(it.id)) {
      console.log(
        force
          ? `run   ${it.id} -> ${overrides} (stale, forced)`
          : `stale ${it.id} (inputs changed; pass --force to re-run)`,
      );
    } else if (skippedIds.has(it.id)) {
      console.log(
        force
          ? `run   ${it.id} -> ${overrides} (was ${status}, forced)`
          : `skip  ${it.id} (${status})`,
      );
    } else {
      console.log(`run   ${it.id} -> ${overrides}`);
    }
  }
  if (stale.length > 0 && !force) {
    console.log(`${stale.length} stale iteration(s): a real run fails without --force`);
  }
}

function batchExitCode(iterations: Iteration[], state: BatchState): number {
  const statuses = iterations.map((it) => state.iterations[it.id]?.status);
  if (statuses.some((s) => s === 'failed')) return 1;
  if (!statuses.some((s) => s === 'completed' || s === 'partial')) return 1;
  return 0;
}

export async function runSuite(
  opts: SuiteOptions,
  deps: SuiteDeps = defaultDeps(),
  cfg: Config = loadConfig(),
  env: NodeJS.ProcessEnv = process.env,
): Promise<number> {
  const suite = loadSuiteConfig(opts.configFile);
  const iterations = expandPlan(suite);
  const force = opts.force ?? false;
  for (const warning of judgeWarnings(suite)) console.warn(warning);

  if (!fs.existsSync(suite.pages)) {
    throw new Error(`pages file not found: ${suite.pages}`);
  }
  const pagesDigest = sha256Hex(fs.readFileSync(suite.pages, 'utf8'));
  const state: BatchState = readState(cfg, suite.project, suite.name);
  const baseFp = baseFingerprint(suite, pagesDigest);
  const baseChanged = state.prodYield !== undefined && state.baseFingerprint !== baseFp;

  if (opts.dryRun) {
    printDryRun(suite, iterations, state, pagesDigest, force, baseChanged);
    return 0;
  }

  preflight(cfg, suite, env);

  const { toRun, stale } = planRuns(suite, iterations, state, pagesDigest, force);
  if (stale.length > 0 && !force) {
    throw new Error(
      `stale iterations (project, pages, locales, or judge changed): ` +
        `${stale.map((i) => i.id).join(', ')} — pass --force to re-run them`,
    );
  }
  if (baseChanged && !force) {
    throw new Error(
      'base run inputs (project, pages, or locales) changed since the production scrape — ' +
        'pass --force to re-run resolve and scrape-prod',
    );
  }

  await ensurePortFree(deps, cfg.localOrigin);

  const dir = suiteDir(cfg, suite.project, suite.name);
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(opts.configFile, path.join(dir, 'config.yaml'));

  let current: IterationRecord | undefined;
  let interrupted = false;
  const uninstall = deps.onSignal((signal) => {
    if (interrupted) return;
    interrupted = true;
    try {
      deps.killActive();
      if (current && current.status === 'running') {
        current.status = 'failed';
        current.error = `interrupted by ${signal}`;
        current.finishedAt = new Date().toISOString();
      }
      writeState(cfg, suite.project, suite.name, state);
      if (hasPristine(cfg, suite.project, suite.name)) {
        restorePristine(cfg, suite.project, suite.name);
      }
    } catch (err) {
      console.error(`cleanup after ${signal} failed: ${message(err)}`);
    } finally {
      deps.exit(signal === 'SIGINT' ? 130 : 143);
    }
  });

  try {
    if (hasPristine(cfg, suite.project, suite.name)) {
      restorePristine(cfg, suite.project, suite.name);
    }

    if (state.prodYield === undefined || baseChanged) {
      await runBase(deps, cfg, suite, env);
      state.baseFingerprint = baseFp;
      state.prodYield = countProdYield(
        cfg,
        suite.project,
        suite.name,
        readManifest(cfg, suite.project, suite.name),
      );
      writeState(cfg, suite.project, suite.name, state);
    }
    console.log(formatYield(state.prodYield));

    if (!hasPristine(cfg, suite.project, suite.name)) {
      snapshotPristine(cfg, suite.project, suite.name);
    }

    const total = toRun.length;
    let index = 0;
    for (const it of toRun) {
      index++;
      const runId = newRunId();
      seedRunDir(cfg, suite.project, suite.name, runId);

      const record: IterationRecord = {
        id: it.id,
        status: 'running',
        fingerprint: suiteFingerprint(suite, it, pagesDigest),
        runId,
        startedAt: new Date().toISOString(),
      };
      state.iterations[it.id] = record;
      current = record;
      writeState(cfg, suite.project, suite.name, state);

      let status: IterationStatus;
      try {
        status = await runIteration(
          deps,
          {
            cfg,
            suite,
            env,
            runId,
            manifest: readManifest(cfg, suite.project, runId),
            record,
          },
          it,
        );
      } catch (err) {
        record.error = message(err);
        status = 'failed';
      }
      record.status = status;
      record.finishedAt = new Date().toISOString();
      writeState(cfg, suite.project, suite.name, state);
      console.log(formatProgress(index, total, it.id, status));
    }
    current = undefined;
  } finally {
    uninstall();
    if (!interrupted && hasPristine(cfg, suite.project, suite.name)) {
      restorePristine(cfg, suite.project, suite.name);
    }
  }

  console.log(formatSummary(iterations, state));
  return batchExitCode(iterations, state);
}
