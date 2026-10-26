import fs from 'node:fs';
import path from 'node:path';
import { Eval } from 'braintrust';
import { loadConfig } from '../config.js';
import { readManifestLatest, runDir } from '../run/manifest.js';
import { resolveBackendName } from '../translate/backend.js';
import type { DatasetRow } from '../types.js';
import { createJudgeOptions } from './judge/backend.js';
import { buildExperimentName, localesFromRows } from './experiment-name.js';
import { toEvalScorers } from './scorers/index.js';

function readTerms(termsFile: string | undefined): string[] {
  if (!termsFile) return [];
  return (JSON.parse(fs.readFileSync(termsFile, 'utf8')) as { terms?: string[] }).terms ?? [];
}

const cfg = loadConfig();
const project = process.env.EVAL_PROJECT ?? '';
if (!project) throw new Error('EVAL_PROJECT is required');
const runId = process.env.EVAL_RUN ?? readManifestLatest(cfg, project);

const rowsPath = path.join(runDir(cfg, project, runId), 'dataset', 'rows.json');
if (!fs.existsSync(rowsPath)) {
  throw new Error(
    `no dataset for run "${runId}" — run: pnpm dataset --project ${project} --run ${runId}`,
  );
}
const rows = JSON.parse(fs.readFileSync(rowsPath, 'utf8')) as DatasetRow[];

const judgeOpts = createJudgeOptions(cfg);

const experimentName = buildExperimentName({
  project,
  locales: localesFromRows(rows),
  runId,
  translatorModel: cfg.translatorModel,
  judgeModel: judgeOpts.model,
  override: cfg.experimentName,
});

// The Braintrust CLI collects this call and awaits it; awaiting here would
// block the module before the CLI can report on it.
Eval(cfg.braintrustProject, {
  experimentName,
  data: rows,
  task: async (input) => input.local_text,
  scores: toEvalScorers(readTerms(cfg.termsFile), judgeOpts),
  metadata: {
    project,
    run: runId,
    translator_provider: resolveBackendName(cfg.translatorModel, cfg.translatorBackend),
    translator_model: cfg.translatorModel ?? null,
    judge_model: judgeOpts.model,
  },
});
