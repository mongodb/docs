/**
 * Updates the hand-maintained root llms.txt when the weekly drift check
 * finds it out of date, then leaves the result for a human to review as a
 * PR. Run by .github/workflows/root-llms-drift.yml.
 *
 * Detection is already deterministic (platform/tools/generate-llms'
 * check-root-llms), so the model is only asked for the part that needs
 * editorial judgement: which section a new project belongs in, what to
 * call it in the voice of the surrounding entries, and how to relabel
 * parts after a re-split. Everything it produces is then checked against
 * the same detector that found the problem — if the edit doesn't resolve
 * the drift, or touches anything it shouldn't, this exits non-zero and no
 * PR is opened.
 *
 * Routes through the Grove gateway exactly like
 * .github/ai-reviewer/scripts/sync-style-guide.ts, and reads that
 * script's config for the base URL and model so there's one source of
 * truth for how this repo reaches Claude.
 *
 * Usage:
 *   GROVE_API_KEY=... tsx src/update-root-llms-cli.ts <drift-report.json>
 */
import Anthropic from '@anthropic-ai/sdk';
import YAML from 'yaml';
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  formatDriftReport,
  validateRootLlmsUpdate,
  type DriftReport,
} from './rootLlmsDrift.js';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const ROOT_LLMS_PATH = join(REPO_ROOT, 'platform/tools/generate-llms/llms-output/llms.txt');
const MAX_TOKENS = 16_384;
const DEFAULT_ANTHROPIC_MODEL = 'claude-sonnet-5';

interface DriftFile {
  bucket: string;
  publishedKeys?: string[];
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

/**
 * Reports the outcome to the workflow, which uses it to decide whether the
 * PR is a normal update or a draft asking for a manual one.
 */
function reportStatus(status: 'updated' | 'manual-update-needed'): void {
  console.log(`status=${status}`);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `status=${status}\n`);
  }
}

/**
 * Marks the file as needing a human when the gateway is unreachable, so the
 * run still produces a reviewable PR instead of just a red build. Written
 * as an HTML comment: this file is served verbatim to agents, and a bare
 * "// TODO" would read as content.
 */
function markForManualUpdate(reason: string, outstanding: string): void {
  const marker = [
    '',
    '<!--',
    'TODO: this page needs manual updates.',
    `The weekly drift check could not reach the model API (${reason}).`,
    `Outstanding: ${outstanding}. See the PR description for the full report.`,
    '-->',
    '',
  ].join('\n');
  const current = readFileSync(ROOT_LLMS_PATH, 'utf-8');
  if (current.includes('TODO: this page needs manual updates.')) {
    console.log('Manual-update marker already present; leaving the file as is.');
    return;
  }
  writeFileSync(ROOT_LLMS_PATH, `${current.trimEnd()}\n${marker}`, 'utf-8');
}

const reportPath = process.argv[2];
if (!reportPath) {
  fail('Usage: tsx src/update-root-llms-cli.ts <drift-report.json>');
}


const drift = JSON.parse(readFileSync(reportPath, 'utf-8')) as DriftReport & DriftFile;
const currentRootLlms = readFileSync(ROOT_LLMS_PATH, 'utf-8');

// Landing candidates alone are proposals against a curated section, so
// they never justify a PR on their own.
if (!drift.hasDrift) {
  console.log('No drift to fix; leaving the root llms.txt untouched.');
  process.exit(0);
}

/**
 * Prefers the Grove gateway, the route this repo's other CI model callers
 * use (.github/ai-reviewer). Falls back to a direct Anthropic key so the
 * job can run before a Grove key is provisioned.
 */
function resolveClient(): { client: Anthropic; model: string; via: string } {
  if (process.env.GROVE_API_KEY) {
    const config = YAML.parse(
      readFileSync(join(REPO_ROOT, '.github/ai-reviewer/config.yml'), 'utf-8'),
    ) as { ai: { base_url: string; sync_model: string } };
    // The gateway authenticates with the `api-key` header (Azure APIM), not
    // the SDK's default `x-api-key`. The SDK still requires apiKey to be
    // set; the gateway ignores the resulting `x-api-key`.
    return {
      client: new Anthropic({
        apiKey: process.env.GROVE_API_KEY,
        baseURL: config.ai.base_url,
        defaultHeaders: { 'api-key': process.env.GROVE_API_KEY },
      }),
      model: config.ai.sync_model,
      via: 'the Grove gateway',
    };
  }

  if (process.env.ANTHROPIC_API_KEY) {
    return {
      client: new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }),
      model: process.env.ANTHROPIC_MODEL ?? DEFAULT_ANTHROPIC_MODEL,
      via: 'the Anthropic API directly',
    };
  }

  fail('Missing credentials: set GROVE_API_KEY (preferred) or ANTHROPIC_API_KEY.');
}

const { client, model, via } = resolveClient();

const prompt = `You maintain the root llms.txt for MongoDB's documentation: the file served at https://www.mongodb.com/docs/llms.txt that AI agents read first to discover every other llms.txt file.

Here is the file as it stands:
<current_file>
${currentRootLlms}
</current_file>

An automated check compared it against what is actually published and found this drift:
<drift_report>
${formatDriftReport(drift)}
</drift_report>

Update the file to resolve that drift. Rules:

1. Every URL listed under "Published but not linked" MUST appear as a link in your output. Place each one in the section that best matches what it documents, matching the surrounding entries' style.
2. Every URL listed under "Linked but not published" MUST be removed. Those files no longer exist and the links 404.
3. Every URL listed under "Landing pages linked but no longer present" MUST be removed.
4. Where part counts disagree, relabel that project's links so "(Part N of M)" matches the number of published parts, and make each part's description reflect the sections it actually covers. If parts were added or removed, add or remove the corresponding links.
5. Do NOT add anything from "Landing pages not linked". That section is a deliberately curated subset. Leave it alone.
6. Do NOT reorganize, reword, or reorder anything the drift report did not mention. Preserve the existing headings, the intro, the "How agents should use this file" section, and every unaffected link exactly as they are.
7. Do NOT add entries to "## Start here by task". That section is editorial and changes there are a human decision.

Return ONLY the complete updated contents of the file, with no commentary and no code fences.`;

console.log(`Calling ${model} via ${via} to update the root llms.txt...`);

let response;
try {
  response = await client.messages.create({
    model,
    max_tokens: MAX_TOKENS,
    messages: [{ role: 'user', content: prompt }],
  });
} catch (error) {
  // An unreachable API shouldn't mean the drift goes unnoticed for a
  // week: flag the file and let the workflow raise a draft PR so someone
  // updates it by hand.
  const reason = error instanceof Error ? error.message : String(error);
  console.error(`Could not reach ${via}: ${reason}`);
  const outstanding = [
    `${drift.unlinkedFiles.length} file(s) published but not linked`,
    `${drift.deadLinks.length} dead link(s)`,
    `${drift.deadLandingLinks.length} dead landing link(s)`,
    `${drift.partCountMismatches.length} part-count mismatch(es)`,
  ].join(', ');
  markForManualUpdate(reason, outstanding);
  reportStatus('manual-update-needed');
  process.exit(0);
}

// Find the text block rather than assuming it's first — on models that
// think by default, content[0] is a thinking block.
const textBlock = response.content.find((block) => block.type === 'text');
const updated = textBlock?.type === 'text' ? textBlock.text.trim() : null;
if (!updated) {
  const types = response.content.map((block) => block.type).join(', ') || 'empty';
  fail(`No text block in response from Claude. Content types: ${types}`);
}

if (response.stop_reason === 'max_tokens') {
  fail(`Response hit the ${MAX_TOKENS}-token limit and is truncated; refusing to write a partial file.`);
}

// Everything below is the deterministic check on the model's output: the
// same detector that found the drift has to agree it's gone, and no
// unrelated link may have been dropped. Tested in generate-llms'
// rootLlmsDrift.test.ts.
const problems = validateRootLlmsUpdate({
  before: currentRootLlms,
  after: updated,
  drift,
  publishedKeys: drift.publishedKeys ?? [],
});
if (problems.length > 0) {
  fail(`The proposed update was rejected, so no PR will be opened:\n  - ${problems.join('\n  - ')}`);
}

writeFileSync(ROOT_LLMS_PATH, `${updated}\n`, 'utf-8');
reportStatus('updated');
console.log('Updated llms-output/llms.txt');
console.log(`  + ${drift.unlinkedFiles.length} link(s) added`);
console.log(`  - ${drift.deadLinks.length} dead link(s) removed`);
console.log(`  - ${drift.deadLandingLinks.length} dead landing link(s) removed`);
console.log(`  ~ ${drift.partCountMismatches.length} part count(s) corrected`);
