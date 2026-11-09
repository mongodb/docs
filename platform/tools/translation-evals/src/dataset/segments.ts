import fs from 'node:fs';
import path from 'node:path';
import { extract } from 'translation-mdx-adapter';
import type { Config } from '../config.js';
import { runDir } from '../run/manifest.js';
import { projectRelativeMdx } from '../resolve/run.js';
import type { RunManifest, SegmentPair, SegmentStatus, SegmentTarget } from '../types.js';

export interface SegmentBuild {
  pairs: SegmentPair[];
  /** Keys the English side has that the Spanish side does not. */
  enOnly: string[];
  /** Keys the Spanish side has that the English side does not. */
  esOnly: string[];
}

export interface SegmentResult extends SegmentBuild {
  status: SegmentStatus;
}

/**
 * Every file the dataset stage reads segments from, each exactly once.
 *
 * A composable page emits one PageRef per variant, all sharing one `mdxPath`
 * and differing only by `slug`/`query`. The overlay has one file per `mdxPath`,
 * so variants share their segments — dedupe by `rel`, or the same file is read
 * once per variant and its counts multiply.
 */
export function segmentTargets(m: RunManifest): SegmentTarget[] {
  const seen = new Set<string>();
  const pages: SegmentTarget[] = [];
  for (const page of m.pages) {
    const rel = projectRelativeMdx(m.project, page.mdxPath);
    if (seen.has(rel)) continue;
    seen.add(rel);
    pages.push({ kind: 'page', rel, mdxPath: page.mdxPath });
  }
  const includes = m.translatable.includes
    .filter((rel) => !seen.has(rel))
    .map((rel) => ({ kind: 'include' as const, rel, mdxPath: rel }));
  return [...pages, ...includes];
}

/**
 * Pair the English and translated payloads of one MDX file by adapter key.
 * `extract()` derives keys from the document structure, and the translated
 * overlay is reconstructed into that same structure, so the key sets match.
 * One-sided keys are reported rather than dropped, so a pairing regression
 * stays visible.
 */
export function buildSegmentPairs(enSource: string, esSource: string): SegmentBuild {
  const en = extract(enSource).payload;
  const es = extract(esSource).payload;
  const pairs: SegmentPair[] = [];
  const enOnly: string[] = [];
  const esOnly: string[] = [];
  for (const [key, text] of Object.entries(en)) {
    const translated = es[key];
    if (translated === undefined) enOnly.push(key);
    else pairs.push({ key, en: text, es: translated });
  }
  for (const key of Object.keys(es)) if (en[key] === undefined) esOnly.push(key);
  return { pairs, enOnly, esOnly };
}

/**
 * Segments for one target.
 *
 * A missing English MDX OR a missing translated overlay stops the build and
 * names the file. There is no override: a partial population silently
 * understates every number, and a missing translation means the model failed
 * on that file — re-run the translate stage rather than scoring around it.
 */
export function readFileSegmentResult(
  cfg: Config,
  m: RunManifest,
  locale: string,
  target: SegmentTarget,
): SegmentResult {
  const enPath = path.join(cfg.contentMdxDir, m.project, target.rel);
  const esPath = path.join(runDir(cfg, m.project, m.runId), 'translated', locale, target.rel);

  for (const [label, file] of [
    ['English MDX', enPath],
    ['translated overlay', esPath],
  ] as const) {
    if (fs.existsSync(file)) continue;
    throw new Error(
      `missing ${label} for ${target.mdxPath} [${locale}] (looked in ${file}) — ` +
        `regenerate content-mdx, or re-run the translate stage`,
    );
  }

  const build = buildSegmentPairs(fs.readFileSync(enPath, 'utf8'), fs.readFileSync(esPath, 'utf8'));
  if (build.pairs.length === 0 && build.enOnly.length === 0 && build.esOnly.length === 0) {
    return { ...build, status: 'no-translatable-content' };
  }
  if (build.pairs.length === 0) return { ...build, status: 'no-shared-keys' };
  return { ...build, status: 'ok' };
}
