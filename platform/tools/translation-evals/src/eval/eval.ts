import fs from 'node:fs';
import path from 'node:path';
import { Eval } from 'braintrust';
import { loadConfig } from '../config.js';
import { DEFAULT_GLOSSARY, glossaryIdentity } from '@mongodb-docs/translation-service';
import { readManifest, readManifestLatest, runDir } from '../run/manifest.js';
import { resolveBackendName } from '../translate/backend.js';
import type { DatasetRow } from '../types.js';
import { createJudgeOptions } from './judge/backend.js';
import { buildExperimentName, localesFromRows } from './experiment-name.js';
import { toEvalScorers } from './scorers/index.js';

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

const manifest = readManifest(cfg, project, runId);
const judgeOpts = createJudgeOptions(cfg);
const glossary = DEFAULT_GLOSSARY;

const provider = resolveBackendName(cfg.translatorModel, cfg.translatorBackend);
const rowsWithSegments = rows.filter((row) => (row.input.segments?.length ?? 0) > 0).length;

const experimentName = buildExperimentName({
  provider,
  translatorModel: cfg.translatorModel,
  runId,
  override: cfg.experimentName,
});

// The Braintrust CLI collects this call and awaits it; awaiting here would
// block the module before the CLI can report on it.
Eval(cfg.braintrustProject, {
  experimentName,
  data: rows,
  task: async (input) => input.local_text,
  scores: toEvalScorers(glossary, judgeOpts),
  metadata: {
    project,
    run: runId,
    locale: localesFromRows(rows).join(','),
    translator_provider: provider,
    translator_model: cfg.translatorModel ?? null,
    judge_model: judgeOpts.model,
    glossary: glossaryIdentity(glossary),
    pages: manifest.pages.length,
    rows: rows.length,
    rows_with_segments: rowsWithSegments,
  },
});
