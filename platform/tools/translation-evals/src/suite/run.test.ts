import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it, expect, vi } from 'vitest';
import {
  runSuite,
  preflight,
  failReason,
  seedRunDir as realSeedRunDir,
  PORT_CHECK_TIMEOUT_MS,
  type SuiteDeps,
} from './run.js';
import type { BatchState } from './state.js';
import type { Config } from '../config.js';

let dataDir = '';

interface FixtureOptions {
  name?: string;
  locales?: string;
  repeats?: number;
  translators?: string;
  judge?: string;
  productionBaseline?: boolean;
}

function writeConfig(configFile: string, pages: string, opts: FixtureOptions = {}): void {
  const translators = opts.translators ?? '  - { backend: anthropic, model: m }\n';
  const productionBaseline = opts.productionBaseline ? 'production_baseline: true\n' : '';
  fs.writeFileSync(
    configFile,
    `name: ${opts.name ?? 'b'}\nproject: atlas\npages: ${pages}\nlocales: ${opts.locales ?? '[es]'}\n` +
      `judge: ${opts.judge ?? 'j'}\nrepeats: ${opts.repeats ?? 2}\ntranslators:\n${translators}` +
      productionBaseline,
  );
}

function fixture(opts: FixtureOptions = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'suite-run-'));
  const contentMdxDir = path.join(root, 'content-mdx');
  fs.mkdirSync(path.join(contentMdxDir, 'atlas'), { recursive: true });
  fs.writeFileSync(path.join(contentMdxDir, 'atlas', 'index.mdx'), 'english');
  const pages = path.join(root, 'pages.txt');
  fs.writeFileSync(pages, '/docs/atlas\n');
  const configFile = path.join(root, 'suite.yaml');
  writeConfig(configFile, pages, opts);
  dataDir = path.join(root, 'data');
  const cfg = { contentMdxDir, dataDir, localOrigin: 'http://localhost:3000' } as Config;
  return { root, configFile, cfg, pages };
}

function seedRunDir(args: string[]): void {
  const runId = args[args.indexOf('--run') + 1]!;
  const dir = path.join(dataDir, 'atlas', runId);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'manifest.json'),
    JSON.stringify({
      project: 'atlas',
      runId,
      locales: ['es'],
      pages: [{ slug: 'index', urlPath: '/docs/atlas', mdxPath: 'atlas/index.mdx' }],
      translatable: { pages: [], includes: [], substitutions: [] },
      stages: {},
    }),
  );
  // scrape-prod creates the prod dirs; seedRunDir now requires the scrape.
  for (const locale of ['en', 'es']) fs.mkdirSync(path.join(dir, 'prod', locale), { recursive: true });
}

const TEST_ENV = { AI_GATEWAY_API_KEY: 'k', JUDGE_MODEL: 'j', BRAINTRUST_API_KEY: 'k' };

/** Every stage succeeds; translate leaves no failures. */
function okDeps(overrides: Partial<SuiteDeps> = {}): SuiteDeps {
  return {
    runStage: async (stage, args) => {
      if (stage === 'resolve' || stage === 'scrape-prod') seedRunDir(args);
      return { code: 0, timedOut: false };
    },
    startServe: () => ({ exited: new Promise(() => {}), kill: () => {} }),
    waitForHttp: async () => {},
    waitForPortFree: async () => {},
    killActive: () => {},
    onSignal: () => () => {},
    exit: () => {},
    ...overrides,
  };
}

describe('runSuite', () => {
  it('runs every iteration when all stages succeed', async () => {
    const { configFile, cfg } = fixture();
    const code = await runSuite({ configFile }, okDeps(), cfg, TEST_ENV);
    expect(code).toBe(0);
    const state = JSON.parse(
      fs.readFileSync(path.join(cfg.dataDir, 'atlas', 'b', 'suite', 'state.json'), 'utf8'),
    ) as BatchState;
    expect(Object.values(state.iterations).map((r) => r.status)).toEqual([
      'completed',
      'completed',
    ]);
    expect(Object.values(state.iterations).every((r) => r.stage === undefined)).toBe(true);
    expect(Object.values(state.iterations).every((r) => r.error === undefined)).toBe(true);
  });

  it('marks an iteration failed when a stage exits non-zero and continues', async () => {
    const { configFile, cfg } = fixture();
    let calls = 0;
    const deps = okDeps({
      runStage: async (stage, args) => {
        if (stage === 'resolve' || stage === 'scrape-prod') seedRunDir(args);
        if (stage === 'translate' && ++calls === 1) return { code: 1, timedOut: false };
        return { code: 0, timedOut: false };
      },
    });
    await runSuite({ configFile }, deps, cfg, TEST_ENV);
    const state = JSON.parse(
      fs.readFileSync(path.join(cfg.dataDir, 'atlas', 'b', 'suite', 'state.json'), 'utf8'),
    ) as BatchState;
    const statuses = Object.values(state.iterations).map((r) => r.status);
    expect(statuses).toEqual(['failed', 'completed']);
  });

  it('marks an iteration partial when translate leaves failures', async () => {
    const { configFile, cfg } = fixture();
    const deps = okDeps({
      runStage: async (stage, args) => {
        if (stage === 'resolve' || stage === 'scrape-prod') seedRunDir(args);
        if (stage === 'translate') {
          const runDir = args[args.indexOf('--run') + 1]!;
          fs.writeFileSync(
            path.join(cfg.dataDir, 'atlas', runDir, 'translate-failures.json'),
            JSON.stringify({ es: [{ file: 'a.mdx', error: 'boom' }] }),
          );
        }
        return { code: 0, timedOut: false };
      },
    });
    await runSuite({ configFile }, deps, cfg, TEST_ENV);
    const state = JSON.parse(
      fs.readFileSync(path.join(cfg.dataDir, 'atlas', 'b', 'suite', 'state.json'), 'utf8'),
    ) as BatchState;
    expect(Object.values(state.iterations).every((r) => r.status === 'partial')).toBe(true);
  });

  it('fails an iteration when the serve child exits before ready', async () => {
    const { configFile, cfg } = fixture();
    const deps = okDeps({
      startServe: () => ({ exited: Promise.resolve(1), kill: () => {} }),
      waitForHttp: () => new Promise(() => {}),
    });
    await runSuite({ configFile }, deps, cfg, TEST_ENV);
    const state = JSON.parse(
      fs.readFileSync(path.join(cfg.dataDir, 'atlas', 'b', 'suite', 'state.json'), 'utf8'),
    ) as BatchState;
    expect(Object.values(state.iterations).every((r) => r.status === 'failed')).toBe(true);
    expect(Object.values(state.iterations).every((r) => r.stage === 'serve')).toBe(true);
    expect(
      Object.values(state.iterations).every((r) =>
        r.error?.includes('serve exited before ready'),
      ),
    ).toBe(true);
  });

  it('attributes the serve exit code when serve exits before ready', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    const deps = okDeps({
      startServe: () => ({ exited: Promise.resolve(3), kill: () => {} }),
      waitForHttp: () => new Promise(() => {}),
    });
    await runSuite({ configFile }, deps, cfg, TEST_ENV);
    const [record] = Object.values(readBatchState(cfg).iterations);
    expect(record!.error).toMatch(/exit code 3/);
  });

  it('keeps an existing pristine snapshot instead of re-snapshotting content-mdx', async () => {
    const { configFile, cfg } = fixture();
    const pristine = path.join(cfg.dataDir, 'atlas', 'b', 'suite', 'pristine', 'atlas');
    fs.mkdirSync(pristine, { recursive: true });
    fs.writeFileSync(path.join(pristine, 'index.mdx'), 'pristine-base');

    await runSuite({ configFile }, okDeps(), cfg, TEST_ENV);

    expect(fs.readFileSync(path.join(pristine, 'index.mdx'), 'utf8')).toBe('pristine-base');
  });

  it('scores with the batch config judge, not the shell JUDGE_MODEL', async () => {
    const { configFile, cfg } = fixture();
    const judgeByStage = new Map<string, string | undefined>();
    const deps = okDeps({
      runStage: async (stage, args, env) => {
        if (stage === 'resolve' || stage === 'scrape-prod') seedRunDir(args);
        judgeByStage.set(stage, env.JUDGE_MODEL);
        return { code: 0, timedOut: false };
      },
    });
    await runSuite({ configFile }, deps, cfg, { ...TEST_ENV, JUDGE_MODEL: 'shell-judge' });
    expect(judgeByStage.get('eval')).toBe('j');
  });
});

function readBatchState(cfg: Config): BatchState {
  return JSON.parse(
    fs.readFileSync(path.join(cfg.dataDir, 'atlas', 'b', 'suite', 'state.json'), 'utf8'),
  ) as BatchState;
}

function argValue(args: string[], flag: string): string {
  return args[args.indexOf(flag) + 1]!;
}

interface StageCall {
  stage: string;
  runId: string;
  args: string[];
  env: NodeJS.ProcessEnv;
  content?: string;
}

/** Records every stage call; serve overwrites content-mdx the way materialize() does. */
function recordingDeps(cfg: Config, calls: StageCall[], overrides: Partial<SuiteDeps> = {}) {
  const projectDir = path.join(cfg.contentMdxDir, 'atlas');
  return okDeps({
    runStage: async (stage, args, env) => {
      if (stage === 'resolve' || stage === 'scrape-prod') seedRunDir(args);
      calls.push({
        stage,
        runId: argValue(args, '--run'),
        args,
        env,
        content: fs.readFileSync(path.join(projectDir, 'index.mdx'), 'utf8'),
      });
      return { code: 0, timedOut: false };
    },
    startServe: (args, env) => {
      const locale = argValue(args, '--locale');
      fs.writeFileSync(path.join(projectDir, 'index.mdx'), `translated-${locale}`);
      fs.writeFileSync(path.join(projectDir, 'overlay-only.mdx'), locale);
      calls.push({ stage: 'serve', runId: argValue(args, '--run'), args, env });
      return { exited: new Promise(() => {}), kill: () => {} };
    },
    ...overrides,
  });
}

function failStage(
  deps: SuiteDeps,
  shouldFail: (stage: string, runId: string) => boolean,
): void {
  const runStage = deps.runStage;
  deps.runStage = async (stage, args, env, timeoutMs) => {
    const result = await runStage(stage, args, env, timeoutMs);
    return shouldFail(stage, argValue(args, '--run'))
      ? { code: 1, timedOut: false }
      : result;
  };
}

describe('runSuite content isolation (C1)', () => {
  it('translates every iteration from pristine content and leaves content-mdx pristine', async () => {
    const { configFile, cfg } = fixture({ locales: '[es, ja-jp]' });
    const calls: StageCall[] = [];
    const code = await runSuite({ configFile }, recordingDeps(cfg, calls), cfg, TEST_ENV);
    expect(code).toBe(0);

    const translates = calls.filter((c) => c.stage === 'translate');
    expect(translates).toHaveLength(2);
    expect(translates.map((c) => c.content)).toEqual(['english', 'english']);

    const projectDir = path.join(cfg.contentMdxDir, 'atlas');
    expect(fs.readFileSync(path.join(projectDir, 'index.mdx'), 'utf8')).toBe('english');
    expect(fs.existsSync(path.join(projectDir, 'overlay-only.mdx'))).toBe(false);
  });

  it('restores content-mdx when a stage throws mid-iteration', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    const calls: StageCall[] = [];
    const deps = recordingDeps(cfg, calls, {
      waitForHttp: () => Promise.reject(new Error('never ready')),
    });
    const code = await runSuite({ configFile }, deps, cfg, TEST_ENV);
    expect(code).toBe(1);
    expect(fs.readFileSync(path.join(cfg.contentMdxDir, 'atlas', 'index.mdx'), 'utf8')).toBe(
      'english',
    );
  });

  it('restores pristine content before the dataset stage', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    const calls: StageCall[] = [];
    await runSuite({ configFile }, recordingDeps(cfg, calls), cfg, TEST_ENV);

    const dataset = calls.find((c) => c.stage === 'dataset');
    expect(dataset?.content).toBe('english');
  });
});

describe('runSuite seeded run dir (C4)', () => {
  it('rewrites the seeded manifest runId and clears a stale target', () => {
    const { cfg } = fixture();
    const baseRunId = 'base-run';
    const runId = '2026-01-01-abc123';
    const baseDir = path.join(cfg.dataDir, 'atlas', baseRunId);
    fs.mkdirSync(path.join(baseDir, 'prod', 'en'), { recursive: true });
    fs.writeFileSync(
      path.join(baseDir, 'manifest.json'),
      JSON.stringify({
        project: 'atlas',
        runId: baseRunId,
        locales: ['es'],
        pages: [],
        translatable: { pages: [], includes: [], substitutions: [] },
        stages: {},
      }),
    );
    const stale = path.join(cfg.dataDir, 'atlas', runId, 'dataset', 'rows.json');
    fs.mkdirSync(path.dirname(stale), { recursive: true });
    fs.writeFileSync(stale, '[]');

    realSeedRunDir(cfg, 'atlas', baseRunId, runId);

    const seeded = JSON.parse(
      fs.readFileSync(path.join(cfg.dataDir, 'atlas', runId, 'manifest.json'), 'utf8'),
    ) as { runId: string };
    expect(seeded.runId).toBe(runId);
    expect(fs.existsSync(stale)).toBe(false);
  });

  it('rejects a base run with no production scrape', () => {
    const { cfg } = fixture();
    const baseDir = path.join(cfg.dataDir, 'atlas', 'base-run');
    fs.mkdirSync(baseDir, { recursive: true });
    fs.writeFileSync(path.join(baseDir, 'manifest.json'), '{}');

    expect(() => realSeedRunDir(cfg, 'atlas', 'base-run', 'target')).toThrow(/no prod\/ scrape/);
  });

  it('rejects a base run that does not exist', () => {
    const { cfg } = fixture();

    expect(() => realSeedRunDir(cfg, 'atlas', 'missing', 'target')).toThrow(/not found/);
  });

  it.each([
    ['../escape', 'base-run', 'target'],
    ['atlas', '../escape', 'target'],
    ['atlas', 'base-run', '../../outside'],
  ])('rejects unsafe seed paths before any filesystem write', (project, baseRunId, runId) => {
    const { cfg } = fixture();
    expect(() => realSeedRunDir(cfg, project, baseRunId, runId)).toThrow(/unsafe/);
  });

  it('does not delete a canary outside the data directory when the target escapes', () => {
    const { cfg, root } = fixture();
    const escaped = path.join(root, 'outside');
    const canary = path.join(escaped, 'canary.txt');
    fs.mkdirSync(escaped, { recursive: true });
    fs.writeFileSync(canary, 'keep');
    const baseDir = path.join(cfg.dataDir, 'atlas', 'base-run');
    fs.mkdirSync(path.join(baseDir, 'prod'), { recursive: true });
    fs.writeFileSync(
      path.join(baseDir, 'manifest.json'),
      JSON.stringify({ project: 'atlas', runId: 'base-run', locales: ['es'], pages: [], translatable: {}, stages: {} }),
    );

    expect(() => realSeedRunDir(cfg, 'atlas', 'base-run', '../../outside')).toThrow(/unsafe/);
    expect(fs.readFileSync(canary, 'utf8')).toBe('keep');
  });
});

describe('runSuite iteration environment (C2)', () => {
  it('passes the iteration translator, locales, and batch judge to every stage', async () => {
    const { configFile, cfg } = fixture({
      locales: '[es, ja-jp]',
      repeats: 1,
      translators: '  - { backend: anthropic, model: m1 }\n  - { backend: openai, model: m2 }\n',
    });
    const calls: StageCall[] = [];
    const shellEnv = {
      ...TEST_ENV,
      TRANSLATOR_MODEL: 'shell-model',
      TRANSLATOR_BACKEND: 'stub',
      TARGET_LOCALES: 'ko-kr',
      JUDGE_MODEL: 'shell-judge',
      EVAL_EXPERIMENT_NAME: 'shell-name',
    };
    await runSuite({ configFile }, recordingDeps(cfg, calls), cfg, shellEnv);

    const iterationCalls = calls.filter((c) => c.stage !== 'resolve' && c.stage !== 'scrape-prod');
    const runIds = [...new Set(iterationCalls.map((c) => c.runId))];
    expect(runIds).toHaveLength(2);
    const expected = [
      { backend: 'anthropic', model: 'm1' },
      { backend: 'openai', model: 'm2' },
    ];
    runIds.forEach((runId, i) => {
      const stages = iterationCalls.filter((c) => c.runId === runId);
      expect(stages.map((c) => c.stage)).toEqual([
        'translate',
        'serve',
        'scrape-local',
        'serve',
        'scrape-local',
        'dataset',
        'eval',
      ]);
      for (const call of stages) {
        expect(call.env.TRANSLATOR_BACKEND).toBe(expected[i]!.backend);
        expect(call.env.TRANSLATOR_MODEL).toBe(expected[i]!.model);
        expect(call.env.TARGET_LOCALES).toBe('es,ja-jp');
        expect(call.env.JUDGE_MODEL).toBe('j');
        expect(call.env.EVAL_EXPERIMENT_NAME).toBe('');
      }
    });
  });

  it('shares one suite invocation id across iterations and renews it on the next invocation', async () => {
    const { configFile, cfg } = fixture({
      repeats: 1,
      translators: '  - { backend: anthropic, model: m1 }\n  - { backend: openai, model: m2 }\n',
    });
    const calls: StageCall[] = [];
    const deps = recordingDeps(cfg, calls);
    await runSuite({ configFile }, deps, cfg, TEST_ENV);
    await runSuite({ configFile, force: true }, deps, cfg, TEST_ENV);

    const evalCalls = calls.filter((c) => c.stage === 'eval');
    expect(evalCalls).toHaveLength(4);
    const invocationIds = [evalCalls.slice(0, 2), evalCalls.slice(2)].map((invocation) => {
      expect(new Set(invocation.map((c) => c.env.EVAL_SUITE_RUN_ID)).size).toBe(1);
      return invocation[0]!.env.EVAL_SUITE_RUN_ID;
    });
    expect(invocationIds[0]).toBeTruthy();
    expect(invocationIds[1]).toBeTruthy();
    expect(invocationIds[0]).not.toBe(invocationIds[1]);
  });

  it('records the experiment name of each iteration', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    await runSuite({ configFile }, okDeps(), cfg, TEST_ENV);
    const [record] = Object.values(readBatchState(cfg).iterations);
    expect(record!.experimentName).toBe(`anthropic m--${record!.runId}`);
  });
});

describe('runSuite production baseline', () => {
  it('runs one production baseline after the translator iterations', async () => {
    const { configFile, cfg } = fixture({ repeats: 1, productionBaseline: true });
    const calls: StageCall[] = [];
    const code = await runSuite({ configFile }, recordingDeps(cfg, calls), cfg, TEST_ENV);

    expect(code).toBe(0);
    const baselineDataset = calls.find(
      (c) => c.stage === 'dataset' && c.runId.startsWith('prod-baseline-'),
    )!;
    expect(baselineDataset.args[baselineDataset.args.indexOf('--candidate') + 1]).toBe(
      'production',
    );
    const baselineEval = calls.find(
      (c) => c.stage === 'eval' && c.runId === baselineDataset.runId,
    )!;
    expect(baselineEval).toBeDefined();
    const lastIterationEval = calls
      .map((c) => c.stage === 'eval' && !c.runId.startsWith('prod-baseline-'))
      .lastIndexOf(true);
    expect(calls.indexOf(baselineDataset)).toBeGreaterThan(lastIterationEval);
    expect(calls.filter((c) => c.runId === baselineDataset.runId).map((c) => c.stage)).toEqual([
      'dataset',
      'eval',
    ]);
    expect(baselineDataset.runId).toMatch(/^prod-baseline-.+/);
    expect(
      calls.some(
        (c) =>
          c.runId === baselineDataset.runId &&
          ['translate', 'serve', 'scrape-local'].includes(c.stage),
      ),
    ).toBe(false);
    const manifest = JSON.parse(
      fs.readFileSync(
        path.join(cfg.dataDir, 'atlas', baselineDataset.runId, 'manifest.json'),
        'utf8',
      ),
    ) as { runId: string };
    expect(manifest.runId).toBe(baselineDataset.runId);
  });

  it('runs a fresh baseline on an identical second invocation', async () => {
    const { configFile, cfg } = fixture({ repeats: 1, productionBaseline: true });
    const calls: StageCall[] = [];
    const deps = recordingDeps(cfg, calls);

    await runSuite({ configFile }, deps, cfg, TEST_ENV);
    await runSuite({ configFile }, deps, cfg, TEST_ENV);

    const baselineRuns = calls.filter(
      (c) => c.stage === 'dataset' && c.runId.startsWith('prod-baseline-'),
    );
    expect(baselineRuns).toHaveLength(2);
    expect(baselineRuns[0]!.runId).not.toBe(baselineRuns[1]!.runId);
    expect(calls.filter((c) => c.stage === 'translate')).toHaveLength(1);
  });

  it('uses different baseline run IDs for suites sharing a project', async () => {
    const { configFile, cfg, pages } = fixture({ repeats: 1, productionBaseline: true });
    const calls: StageCall[] = [];
    const deps = recordingDeps(cfg, calls);

    await runSuite({ configFile }, deps, cfg, TEST_ENV);
    writeConfig(configFile, pages, { name: 'other', repeats: 1, productionBaseline: true });
    await runSuite({ configFile }, deps, cfg, TEST_ENV);

    const ids = calls
      .filter((c) => c.stage === 'dataset' && c.runId.startsWith('prod-baseline-'))
      .map((c) => c.runId);
    expect(new Set(ids).size).toBe(2);
  });

  it('isolates the baseline environment from shell overrides', async () => {
    const { configFile, cfg } = fixture({ repeats: 1, productionBaseline: true });
    const calls: StageCall[] = [];
    const shellEnv = {
      ...TEST_ENV,
      JUDGE_MODEL: 'shell-judge',
      TRANSLATOR_BACKEND: 'aws-translate',
      TRANSLATOR_MODEL: 'shell-model',
      EVAL_EXPERIMENT_NAME: 'shell-name',
    };

    await runSuite({ configFile }, recordingDeps(cfg, calls), cfg, shellEnv);

    const baselineCalls = calls.filter(
      (c) =>
        c.runId.startsWith('prod-baseline-') && (c.stage === 'dataset' || c.stage === 'eval'),
    );
    expect(baselineCalls).toHaveLength(2);
    for (const call of baselineCalls) {
      expect(call.env.JUDGE_MODEL).toBe('j');
      expect(call.env.TARGET_LOCALES).toBe('es');
      expect(call.env.TRANSLATOR_BACKEND).toBe('');
      expect(call.env.TRANSLATOR_MODEL).toBe('');
      expect(call.env.EVAL_EXPERIMENT_NAME).toBe('');
      expect(call.env.SUITE_SCOPE).toBe('baseline');
    }
  });
});

describe('runSuite production baseline dry run and default-off behavior', () => {
  it('prints the baseline intent without running stages on an enabled dry run', async () => {
    const { configFile, cfg } = fixture({ repeats: 1, productionBaseline: true });
    const calls: StageCall[] = [];
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    let code = -1;
    let out = '';
    try {
      code = await runSuite(
        { configFile, dryRun: true },
        recordingDeps(cfg, calls),
        cfg,
        TEST_ENV,
      );
      out = log.mock.calls.map((c) => String(c[0])).join('\n');
    } finally {
      log.mockRestore();
    }

    expect(code).toBe(0);
    expect(out).toContain('baseline: will run once after iterations (fresh run id)');
    expect(calls).toHaveLength(0);
  });

  it('prints no baseline line on a disabled dry run', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    let out = '';
    try {
      await runSuite({ configFile, dryRun: true }, okDeps(), cfg, TEST_ENV);
      out = log.mock.calls.map((c) => String(c[0])).join('\n');
    } finally {
      log.mockRestore();
    }

    expect(out).not.toContain('baseline:');
  });

  it('keeps the exact default-off stage sequence', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    const calls: StageCall[] = [];

    expect(await runSuite({ configFile }, recordingDeps(cfg, calls), cfg, TEST_ENV)).toBe(0);
    expect(calls.map((c) => c.stage)).toEqual([
      'resolve',
      'scrape-prod',
      'translate',
      'serve',
      'scrape-local',
      'dataset',
      'eval',
    ]);
    expect(calls.some((c) => c.runId.startsWith('prod-baseline-'))).toBe(false);
  });
});

describe('runSuite production baseline failures', () => {
  it('fails the suite and skips baseline eval when baseline dataset fails', async () => {
    const { configFile, cfg } = fixture({ repeats: 1, productionBaseline: true });
    const calls: StageCall[] = [];
    const deps = recordingDeps(cfg, calls);
    failStage(
      deps,
      (stage, runId) => stage === 'dataset' && runId.startsWith('prod-baseline-'),
    );

    expect(await runSuite({ configFile }, deps, cfg, TEST_ENV)).toBe(1);

    const baselineDataset = calls.find(
      (c) => c.stage === 'dataset' && c.runId.startsWith('prod-baseline-'),
    )!;
    expect(
      calls.some((c) => c.stage === 'eval' && c.runId === baselineDataset.runId),
    ).toBe(false);
    expect(Object.values(readBatchState(cfg).iterations)[0]!.status).toBe('completed');
  });

  it('fails the suite when baseline eval fails', async () => {
    const { configFile, cfg } = fixture({ repeats: 1, productionBaseline: true });
    const calls: StageCall[] = [];
    const deps = recordingDeps(cfg, calls);
    failStage(deps, (stage, runId) => stage === 'eval' && runId.startsWith('prod-baseline-'));

    expect(await runSuite({ configFile }, deps, cfg, TEST_ENV)).toBe(1);
  });

  it('runs the baseline after an iteration eval failure', async () => {
    const { configFile, cfg } = fixture({ repeats: 1, productionBaseline: true });
    const calls: StageCall[] = [];
    const deps = recordingDeps(cfg, calls);
    failStage(deps, (stage, runId) => stage === 'eval' && !runId.startsWith('prod-baseline-'));

    expect(await runSuite({ configFile }, deps, cfg, TEST_ENV)).toBe(1);
    expect(
      calls
        .filter((c) => c.runId.startsWith('prod-baseline-'))
        .map((c) => c.stage),
    ).toEqual(['dataset', 'eval']);
  });

  it('contains a seed exception and exits non-zero', async () => {
    const { configFile, cfg, pages } = fixture({ repeats: 1 });
    const calls: StageCall[] = [];
    const deps = recordingDeps(cfg, calls);
    await runSuite({ configFile }, deps, cfg, TEST_ENV);
    calls.length = 0;
    fs.rmSync(path.join(cfg.dataDir, 'atlas', 'b', 'prod'), { recursive: true, force: true });
    writeConfig(configFile, pages, { repeats: 1, productionBaseline: true });

    expect(await runSuite({ configFile }, deps, cfg, TEST_ENV)).toBe(1);
    expect(calls.some((c) => c.runId.startsWith('prod-baseline-'))).toBe(false);
  });

  it('attempts another fresh baseline after a failed baseline without adding state', async () => {
    const { configFile, cfg } = fixture({ repeats: 1, productionBaseline: true });
    const calls: StageCall[] = [];
    const deps = recordingDeps(cfg, calls);
    failStage(
      deps,
      (stage, runId) => stage === 'dataset' && runId.startsWith('prod-baseline-'),
    );

    expect(await runSuite({ configFile }, deps, cfg, TEST_ENV)).toBe(1);
    expect(await runSuite({ configFile }, deps, cfg, TEST_ENV)).toBe(1);

    const ids = calls
      .filter((c) => c.stage === 'dataset' && c.runId.startsWith('prod-baseline-'))
      .map((c) => c.runId);
    expect(ids).toHaveLength(2);
    expect(ids[0]).not.toBe(ids[1]);
    expect(readBatchState(cfg)).not.toHaveProperty('baseline');
  });

  it('uses the existing signal cleanup during a baseline stage', async () => {
    const { configFile, cfg } = fixture({ repeats: 1, productionBaseline: true });
    let handler: ((signal: NodeJS.Signals) => void) | undefined;
    let killed = false;
    let exitCode: number | undefined;
    const exited = new Promise<void>((resolve) => {
      const deps = recordingDeps(cfg, [], {
        killActive: () => {
          killed = true;
        },
        onSignal: (h) => {
          handler = h;
          return () => {};
        },
        exit: (code) => {
          exitCode = code;
          resolve();
        },
      });
      const runStage = deps.runStage;
      deps.runStage = (stage, args, env, timeoutMs) => {
        if (stage === 'dataset' && argValue(args, '--run').startsWith('prod-baseline-')) {
          handler!('SIGINT');
          return new Promise(() => {});
        }
        return runStage(stage, args, env, timeoutMs);
      };
      void runSuite({ configFile }, deps, cfg, TEST_ENV);
    });
    await exited;

    expect(killed).toBe(true);
    expect(exitCode).toBe(130);
    expect(Object.values(readBatchState(cfg).iterations)[0]!.status).toBe('completed');
    expect(readBatchState(cfg)).not.toHaveProperty('baseline');
    expect(fs.readFileSync(path.join(cfg.contentMdxDir, 'atlas', 'index.mdx'), 'utf8')).toBe(
      'english',
    );
  });
});

describe('runSuite base run fingerprint (C3)', () => {
  it('re-runs resolve and scrape-prod under --force when the pages file changed', async () => {
    const { configFile, cfg, pages } = fixture({ repeats: 1 });
    const calls: StageCall[] = [];
    const deps = recordingDeps(cfg, calls);
    await runSuite({ configFile }, deps, cfg, TEST_ENV);
    const firstFingerprint = readBatchState(cfg).baseFingerprint;
    expect(firstFingerprint).toBeDefined();

    fs.writeFileSync(pages, '/docs/atlas\n/docs/atlas/other\n');
    await expect(runSuite({ configFile }, deps, cfg, TEST_ENV)).rejects.toThrow(/--force/);

    await runSuite({ configFile, force: true }, deps, cfg, TEST_ENV);
    expect(calls.filter((c) => c.stage === 'resolve')).toHaveLength(2);
    expect(calls.filter((c) => c.stage === 'scrape-prod')).toHaveLength(2);
    expect(readBatchState(cfg).baseFingerprint).not.toBe(firstFingerprint);
  });

  it('re-runs the base when locales changed', async () => {
    const { configFile, cfg, pages } = fixture({ repeats: 1 });
    const calls: StageCall[] = [];
    const deps = recordingDeps(cfg, calls);
    await runSuite({ configFile }, deps, cfg, TEST_ENV);
    writeConfig(configFile, pages, { repeats: 1, locales: '[es, ja-jp]' });
    await runSuite({ configFile, force: true }, deps, cfg, TEST_ENV);
    expect(calls.filter((c) => c.stage === 'resolve')).toHaveLength(2);
  });

  it('reuses the base under --force when its inputs are unchanged', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    const calls: StageCall[] = [];
    const deps = recordingDeps(cfg, calls);
    await runSuite({ configFile }, deps, cfg, TEST_ENV);
    await runSuite({ configFile, force: true }, deps, cfg, TEST_ENV);
    expect(calls.filter((c) => c.stage === 'resolve')).toHaveLength(1);
    expect(calls.filter((c) => c.stage === 'translate')).toHaveLength(2);
  });

  it('refuses a changed base without --force even when no iteration is recorded', async () => {
    const { configFile, cfg, pages } = fixture({ repeats: 1 });
    const failTranslate = okDeps({
      runStage: async (stage, args) => {
        if (stage === 'resolve' || stage === 'scrape-prod') seedRunDir(args);
        return { code: 0, timedOut: false };
      },
    });
    await runSuite({ configFile }, failTranslate, cfg, TEST_ENV);
    const state = readBatchState(cfg);
    state.iterations = {};
    fs.writeFileSync(
      path.join(cfg.dataDir, 'atlas', 'b', 'suite', 'state.json'),
      JSON.stringify(state),
    );
    fs.writeFileSync(pages, '/docs/atlas/other\n');
    await expect(runSuite({ configFile }, failTranslate, cfg, TEST_ENV)).rejects.toThrow(
      /base run inputs/,
    );
  });
});

describe('runSuite port checks (I1)', () => {
  it('refuses to start when the local origin is already in use', async () => {
    const { configFile, cfg } = fixture();
    const stages: string[] = [];
    const deps = okDeps({
      runStage: async (stage) => {
        stages.push(stage);
        return { code: 0, timedOut: false };
      },
      waitForPortFree: () => Promise.reject(new Error('busy')),
    });
    await expect(runSuite({ configFile }, deps, cfg, TEST_ENV)).rejects.toThrow(/already in use/);
    expect(stages).toEqual([]);
  });

  it('fails the iteration without translating when the port is busy at iteration start', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    const calls: StageCall[] = [];
    let checks = 0;
    const deps = recordingDeps(cfg, calls, {
      waitForPortFree: async (_origin, timeoutMs) => {
        if (timeoutMs === PORT_CHECK_TIMEOUT_MS && ++checks > 1) throw new Error('busy');
      },
    });
    const code = await runSuite({ configFile }, deps, cfg, TEST_ENV);
    expect(code).toBe(1);
    expect(calls.some((c) => c.stage === 'translate')).toBe(false);
    const [record] = Object.values(readBatchState(cfg).iterations);
    expect(record!.status).toBe('failed');
    expect(record!.error).toMatch(/already in use/);
  });
});

describe('runSuite interrupts (I2)', () => {
  it('kills children, marks the record failed, restores content-mdx and exits non-zero', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    let handler: ((signal: NodeJS.Signals) => void) | undefined;
    let killed = false;
    let exitCode: number | undefined;
    const exited = new Promise<void>((resolve) => {
      const deps = okDeps({
        runStage: (stage, args) => {
          if (stage === 'resolve' || stage === 'scrape-prod') seedRunDir(args);
          if (stage === 'translate') {
            fs.writeFileSync(path.join(cfg.contentMdxDir, 'atlas', 'index.mdx'), 'dirty');
            handler!('SIGINT');
            return new Promise(() => {});
          }
          return Promise.resolve({ code: 0, timedOut: false });
        },
        killActive: () => {
          killed = true;
        },
        onSignal: (h) => {
          handler = h;
          return () => {};
        },
        exit: (code) => {
          exitCode = code;
          resolve();
        },
      });
      void runSuite({ configFile }, deps, cfg, TEST_ENV);
    });
    await exited;

    expect(killed).toBe(true);
    expect(exitCode).toBe(130);
    const [record] = Object.values(readBatchState(cfg).iterations);
    expect(record!.status).toBe('failed');
    expect(record!.error).toMatch(/SIGINT/);
    expect(fs.readFileSync(path.join(cfg.contentMdxDir, 'atlas', 'index.mdx'), 'utf8')).toBe(
      'english',
    );
  });
});

describe('runSuite reporting and exit code', () => {
  it('exits non-zero when an iteration failed', async () => {
    const { configFile, cfg } = fixture();
    const deps = okDeps({
      runStage: async (stage, args) => {
        if (stage === 'resolve' || stage === 'scrape-prod') seedRunDir(args);
        return { code: stage === 'eval' ? 1 : 0, timedOut: false };
      },
    });
    expect(await runSuite({ configFile }, deps, cfg, TEST_ENV)).toBe(1);
  });

  it('copies the batch config into the suite directory', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    await runSuite({ configFile }, okDeps(), cfg, TEST_ENV);
    expect(
      fs.readFileSync(path.join(cfg.dataDir, 'atlas', 'b', 'suite', 'config.yaml'), 'utf8'),
    ).toBe(fs.readFileSync(configFile, 'utf8'));
  });

  it('prints the production-scrape yield and marks a short yield degraded', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    try {
      await runSuite({ configFile }, okDeps(), cfg, TEST_ENV);
      const out = log.mock.calls.map((c) => String(c[0])).join('\n');
      expect(out).toContain('production scrape yield: 0/2  DEGRADED');
    } finally {
      log.mockRestore();
    }
  });

  it('emits scope banners and stage/iteration completions', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    const lines: string[] = [];
    const spy = vi.spyOn(console, 'log').mockImplementation((l: string) => void lines.push(l));
    try {
      await runSuite({ configFile }, okDeps(), cfg, TEST_ENV);
    } finally {
      spy.mockRestore();
    }
    expect(lines.some((l) => /\[suite\] begin id=b suite_run=\S+ iterations=1/.test(l))).toBe(true);
    expect(lines.some((l) => /\[1\/1\] begin iteration id=anthropic:m#1 run=/.test(l))).toBe(true);
    expect(lines.some((l) => /\[1\/1\] done {2}stage=translate dur=\d/.test(l))).toBe(true);
    expect(lines.some((l) => /\[1\/1\] done {2}iteration status=completed dur=\d/.test(l))).toBe(
      true,
    );
    expect(lines.some((l) => /\[suite\] done {2}id=b completed=1 failed=0/.test(l))).toBe(true);
  });

  it('warns with yield and missing counts when the prod scrape is degraded', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    const lines: string[] = [];
    const spy = vi.spyOn(console, 'log').mockImplementation((l: string) => void lines.push(l));
    try {
      await runSuite({ configFile }, okDeps(), cfg, TEST_ENV);
    } finally {
      spy.mockRestore();
    }
    expect(lines.some((l) => /\[base\] warn {2}yield=0\/2 missing=2/.test(l))).toBe(true);
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
    try {
      await runSuite({ configFile }, deps, cfg, TEST_ENV);
    } finally {
      spy.mockRestore();
    }
    expect(
      lines.some((l) => /\[1\/1\] fail {2}stage=translate reason=timeout dur=\d/.test(l)),
    ).toBe(true);
    expect(lines.some((l) => /\[1\/1\] done {2}stage=translate/.test(l))).toBe(false);
    expect(
      lines.some((l) => /\[1\/1\] done {2}iteration status=failed dur=\S+ stage=translate/.test(l)),
    ).toBe(true);
    const state = readBatchState(cfg);
    expect(state.iterations['anthropic:m#1']).toMatchObject({
      status: 'failed',
      stage: 'translate',
      error: 'timeout',
    });
  });

  it('points dataset failures to prior translation failures when they exist', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    const lines: string[] = [];
    const spy = vi.spyOn(console, 'log').mockImplementation((l: string) => void lines.push(l));
    const deps = okDeps({
      runStage: async (stage, args) => {
        if (stage === 'resolve' || stage === 'scrape-prod') seedRunDir(args);
        if (stage === 'translate') {
          const runId = args[args.indexOf('--run') + 1]!;
          fs.writeFileSync(
            path.join(cfg.dataDir, 'atlas', runId, 'translate-failures.json'),
            JSON.stringify({ es: [{ file: 'a.mdx', error: 'boom' }] }),
          );
        }
        if (stage === 'dataset') return { code: 1, timedOut: false };
        return { code: 0, timedOut: false };
      },
    });
    try {
      await runSuite({ configFile }, deps, cfg, TEST_ENV);
    } finally {
      spy.mockRestore();
    }
    expect(
      lines.some((l) =>
        /fail {2}stage=dataset .*hint="check data\/atlas\/[^"]+\/translate-failures\.json"/.test(l),
      ),
    ).toBe(true);
    expect(
      lines.some((l) => /done {2}iteration status=failed dur=\S+ stage=dataset/.test(l)),
    ).toBe(true);
    const state = readBatchState(cfg);
    expect(state.iterations['anthropic:m#1']).toMatchObject({
      status: 'failed',
      stage: 'dataset',
      error: 'exit code=1',
    });
  });

  it('omits the translation evidence hint when no translation failures exist', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    const lines: string[] = [];
    const spy = vi.spyOn(console, 'log').mockImplementation((l: string) => void lines.push(l));
    const deps = okDeps({
      runStage: async (stage, args) => {
        if (stage === 'resolve' || stage === 'scrape-prod') seedRunDir(args);
        if (stage === 'dataset') return { code: 1, timedOut: false };
        return { code: 0, timedOut: false };
      },
    });
    try {
      await runSuite({ configFile }, deps, cfg, TEST_ENV);
    } finally {
      spy.mockRestore();
    }
    expect(
      lines.some((l) => /fail {2}stage=dataset/.test(l) && l.includes('hint=')),
    ).toBe(false);
  });

  it('emits a fail line when the resolve stage fails', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    const lines: string[] = [];
    const spy = vi.spyOn(console, 'log').mockImplementation((l: string) => void lines.push(l));
    const deps = okDeps({ runStage: async () => ({ code: 1, timedOut: false }) });
    try {
      await expect(runSuite({ configFile }, deps, cfg, TEST_ENV)).rejects.toThrow(
        /resolve stage failed/,
      );
    } finally {
      spy.mockRestore();
    }
    expect(
      lines.some((l) => /\[base\] fail {2}stage=resolve reason=exit code=1 dur=\d/.test(l)),
    ).toBe(true);
  });

  it('emits an iteration fail line when a stage throws', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    const lines: string[] = [];
    const spy = vi.spyOn(console, 'log').mockImplementation((l: string) => void lines.push(l));
    const deps = okDeps({
      waitForHttp: () => Promise.reject(new Error('never ready')),
    });
    try {
      await runSuite({ configFile }, deps, cfg, TEST_ENV);
    } finally {
      spy.mockRestore();
    }
    expect(lines.some((l) => /\[1\/1\] fail {2}iteration reason=exception err=/.test(l))).toBe(
      true,
    );
  });

  it('warns when a translator model equals the judge', async () => {
    const { configFile, cfg } = fixture({ repeats: 1, judge: 'm' });
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      await runSuite({ configFile, dryRun: true }, okDeps(), cfg, TEST_ENV);
      expect(warn.mock.calls.map((c) => String(c[0])).join('\n')).toMatch(/judge model "m"/);
    } finally {
      warn.mockRestore();
    }
  });

  it('dry run lists skipped and stale iterations', async () => {
    const { configFile, cfg, pages } = fixture({ repeats: 1 });
    await runSuite({ configFile }, okDeps(), cfg, TEST_ENV);
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    try {
      await runSuite({ configFile, dryRun: true }, okDeps(), cfg, TEST_ENV);
      fs.writeFileSync(pages, '/docs/atlas/other\n');
      await runSuite({ configFile, dryRun: true }, okDeps(), cfg, TEST_ENV);
      const out = log.mock.calls.map((c) => String(c[0]));
      expect(out).toContain('skip  anthropic:m#1 (completed)');
      expect(out).toContain('stale anthropic:m#1 (inputs changed; pass --force to re-run)');
    } finally {
      log.mockRestore();
    }
  });
});

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

describe('preflight', () => {
  it('throws when a required key is blank', () => {
    const { cfg } = fixture();
    const suite = {
      name: 'b',
      project: 'atlas',
      pages: 'p',
      locales: ['es'],
      judge: 'j',
      repeats: 1,
      productionBaseline: false,
      translators: [],
    };
    expect(() => preflight(cfg, suite, { JUDGE_MODEL: 'j', BRAINTRUST_API_KEY: 'k' })).toThrow(
      /AI_GATEWAY_API_KEY/,
    );
    expect(() => preflight(cfg, suite, { JUDGE_MODEL: 'j', BRAINTRUST_API_KEY: 'k' })).toThrow(
      /GROVE_API_KEY/,
    );
  });

  it('accepts GROVE_API_KEY alone as the gateway key', () => {
    const { cfg, pages } = fixture();
    const suite = {
      name: 'b',
      project: 'atlas',
      pages,
      locales: ['es'],
      judge: 'j',
      repeats: 1,
      productionBaseline: false,
      translators: [],
    };
    expect(() =>
      preflight(cfg, suite, { GROVE_API_KEY: 'legacy', BRAINTRUST_API_KEY: 'k' }),
    ).not.toThrow();
  });

  it('rejects a project that escapes content-mdx', () => {
    const { cfg } = fixture();
    const suite = {
      name: 'b',
      project: '../escape',
      pages: 'p',
      locales: ['es'],
      judge: 'j',
      repeats: 1,
      productionBaseline: false,
      translators: [],
    };
    expect(() => preflight(cfg, suite, TEST_ENV)).toThrow(/escapes content-mdx/);
  });
});
