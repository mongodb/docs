import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it, expect, vi } from 'vitest';
import { runSuite, preflight, PORT_CHECK_TIMEOUT_MS, type SuiteDeps } from './run.js';
import type { BatchState } from './state.js';
import type { Config } from '../config.js';

let dataDir = '';

interface FixtureOptions {
  locales?: string;
  repeats?: number;
  translators?: string;
  judge?: string;
}

function writeConfig(configFile: string, pages: string, opts: FixtureOptions = {}): void {
  const translators = opts.translators ?? '  - { backend: anthropic, model: m }\n';
  fs.writeFileSync(
    configFile,
    `name: b\nproject: atlas\npages: ${pages}\nlocales: ${opts.locales ?? '[es]'}\n` +
      `judge: ${opts.judge ?? 'j'}\nrepeats: ${opts.repeats ?? 2}\ntranslators:\n${translators}`,
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
        env,
        content: fs.readFileSync(path.join(projectDir, 'index.mdx'), 'utf8'),
      });
      return { code: 0, timedOut: false };
    },
    startServe: (args, env) => {
      const locale = argValue(args, '--locale');
      fs.writeFileSync(path.join(projectDir, 'index.mdx'), `translated-${locale}`);
      fs.writeFileSync(path.join(projectDir, 'overlay-only.mdx'), locale);
      calls.push({ stage: 'serve', runId: argValue(args, '--run'), env });
      return { exited: new Promise(() => {}), kill: () => {} };
    },
    ...overrides,
  });
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

  it('records the experiment name of each iteration', async () => {
    const { configFile, cfg } = fixture({ repeats: 1 });
    await runSuite({ configFile }, okDeps(), cfg, TEST_ENV);
    const [record] = Object.values(readBatchState(cfg).iterations);
    expect(record!.experimentName).toBe(`atlas es ${record!.runId} [m -> j]`);
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
      translators: [],
    };
    expect(() => preflight(cfg, suite, { JUDGE_MODEL: 'j', BRAINTRUST_API_KEY: 'k' })).toThrow(
      /AI_GATEWAY_API_KEY/,
    );
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
      translators: [],
    };
    expect(() => preflight(cfg, suite, TEST_ENV)).toThrow(/escapes content-mdx/);
  });
});
