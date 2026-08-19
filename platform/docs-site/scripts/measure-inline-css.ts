/**
 * Measures the inline `<style>` bytes docs-site ships in served HTML, and their
 * share of the document, across a fixed page sample
 * (scripts/inline-css-sample.json). Nearly all of it comes from
 * src/app/emotion.tsx, which serializes LeafyGreen's Emotion cache into
 * `<style data-emotion=...>` tags ahead of the page content.
 *
 * Committed so the end-of-migration number is produced the same way as the
 * baseline — a number measured differently is not a comparison.
 *
 * The sample has one group per project, since each is a separate build at its
 * own base URL. Measure a group per build and accumulate with `--merge`:
 *
 *   DOCS_PROJECT=manual pnpm build && DOCS_PROJECT=manual pnpm start
 *   pnpm measure:inline-css --group manual --merge report.json
 *
 * Run with --help for the flag list; see INLINE-CSS-BASELINE.md for the
 * recorded baseline and the full procedure.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import {
  formatBytes,
  formatShare,
  isHtmlDocument,
  measureHtml,
  pageUrl,
  parseArgs,
  selectGroup,
  totalMeasurements,
  type PageMeasurement,
} from './lib/inline-css';

interface SamplePage {
  slug: string;
  label: string;
  sourceBytes?: number;
}

interface SampleGroup {
  /** Project directory name under content-mdx, e.g. `manual`. */
  project: string;
  /** Version directory, e.g. `manual` or `current`. */
  version: string;
  /** Value to pass as DOCS_PROJECT when building this group. */
  docsProject: string;
  /** Default base URL for a local `pnpm start` of that build. */
  baseUrl: string;
  note?: string;
  pages: SamplePage[];
}

interface Sample {
  groups: SampleGroup[];
}

interface PageResult extends PageMeasurement {
  slug: string;
  label: string;
  url: string;
}

interface GroupReport {
  project: string;
  version: string;
  baseUrl: string;
  measuredAt: string;
  pages: PageResult[];
  total: PageMeasurement;
}

interface Report {
  label: string | null;
  sample: string;
  groups: GroupReport[];
  grandTotal: PageMeasurement;
}

// From cwd, like the sibling build scripts: all are run from the package root via pnpm.
const DEFAULT_SAMPLE = path.join(process.cwd(), 'scripts', 'inline-css-sample.json');

const KNOWN_FLAGS = ['group', 'base-url', 'sample', 'json', 'merge', 'label'] as const;

const USAGE = `
Measures inline <style> bytes in served docs-site HTML across a fixed page sample.

  pnpm measure:inline-css --group <project> [--base-url <url>] [--merge <path>]

  --group <project>  Sample group to measure (required when the sample has more
                     than one). Each group is a separate build; see the sample
                     file for the DOCS_PROJECT value to build it with.
  --base-url <url>   Override the group's default base URL.
  --sample <path>    Sample file to use (default scripts/inline-css-sample.json).
  --json <path>      Write this run's report as JSON, replacing the file.
  --merge <path>     Like --json, but merges this group into an existing report,
                     so several builds accumulate into one file.
  --label <text>     Free-text label recorded in the report, e.g. a commit SHA.

See INLINE-CSS-BASELINE.md for the recorded baseline and the full procedure.
`.trim();

async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }

  const html = await response.text();

  if (!isHtmlDocument(html)) {
    throw new Error(
      `${url} returned HTTP 200 with ${html.length} bytes and no <html> element. ` +
        `That route serves no page in this build; fix the sample rather than measuring it.`,
    );
  }

  return html;
}

function renderTable(rows: string[][], total: string[]): string {
  const header = ['Page', 'Inline CSS', 'Share', 'of which Emotion', 'Tags', 'Before <main>', 'Total HTML'];
  const all = [header, ...rows, total];
  const widths = header.map((_, column) => Math.max(...all.map((row) => row[column].length)));
  const line = (row: string[]): string => row.map((cell, i) => cell.padEnd(widths[i])).join('  ');

  return [line(header), widths.map((width) => '-'.repeat(width)).join('  '), ...rows.map(line), line(total)].join('\n');
}

function measurementRow(label: string, measurement: PageMeasurement): string[] {
  return [
    label,
    formatBytes(measurement.inlineStyleBytes),
    formatShare(measurement.inlineStyleShare),
    formatBytes(measurement.emotionStyleBytes),
    String(measurement.styleTagCount),
    measurement.bytesBeforeMain === null ? '—' : formatBytes(measurement.bytesBeforeMain),
    formatBytes(measurement.totalBytes),
  ];
}

/**
 * Replaces this group's entry in an accumulated report, preserving the others.
 * Sorts by project so two reports diff cleanly whatever order the groups were
 * measured in.
 */
function mergeGroup(existing: Report | undefined, group: GroupReport, label: string | null, sample: string): Report {
  const others = (existing?.groups ?? []).filter((candidate) => candidate.project !== group.project);
  const groups = [...others, group].sort((a, b) => a.project.localeCompare(b.project));

  return {
    label: label ?? existing?.label ?? null,
    sample,
    groups,
    grandTotal: totalMeasurements(groups.map((candidate) => candidate.total)),
  };
}

async function readReport(reportPath: string): Promise<Report | undefined> {
  try {
    return JSON.parse(await fs.readFile(reportPath, 'utf8')) as Report;
  } catch (error) {
    // A missing file is the normal first-run case; anything else is a real problem.
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined;
    throw error;
  }
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);

  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(USAGE);
    return;
  }

  const args = parseArgs(argv, KNOWN_FLAGS);

  const samplePath = args.sample ? path.resolve(args.sample) : DEFAULT_SAMPLE;
  const sample: Sample = JSON.parse(await fs.readFile(samplePath, 'utf8'));
  const group = selectGroup(sample.groups, args.group);
  const baseUrl = args['base-url'] ?? group.baseUrl;

  // Measurable, but not comparable to the baseline. Say so rather than report it silently.
  if (args['base-url'] && !baseUrl.includes(group.project)) {
    console.warn(
      `Warning: --base-url "${baseUrl}" does not name group "${group.project}". ` +
        `Check you are measuring the build you think you are.`,
    );
  }

  const pages: PageResult[] = [];
  for (const page of group.pages) {
    const url = pageUrl(baseUrl, page.slug);
    const html = await fetchPage(url);
    pages.push({ slug: page.slug, label: page.label, url, ...measureHtml(html) });
  }

  const total = totalMeasurements(pages);

  console.log(`\nInline <style> byte report — ${group.project}/${group.version}`);
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Sample:   ${path.relative(process.cwd(), samplePath)} (${group.pages.length} pages)\n`);
  console.log(
    renderTable(
      pages.map((page) => measurementRow(page.label, page)),
      measurementRow('TOTAL', total),
    ),
  );
  console.log(
    `\nAcross this group, inline <style> markup is ${formatShare(total.inlineStyleShare)} of served HTML ` +
      `(${formatBytes(total.emotionStyleBytes)} of ${formatBytes(total.inlineStyleBytes)} from app/emotion.tsx).\n`,
  );

  const outPath = args.merge ?? args.json;
  if (!outPath) return;

  const resolved = path.resolve(outPath);
  const groupReport: GroupReport = {
    project: group.project,
    version: group.version,
    baseUrl,
    measuredAt: new Date().toISOString(),
    pages,
    total,
  };

  const existing = args.merge ? await readReport(resolved) : undefined;
  const report = mergeGroup(existing, groupReport, args.label ?? null, path.basename(samplePath));

  await fs.writeFile(resolved, `${JSON.stringify(report, null, 2)}\n`);

  if (report.groups.length > 1) {
    console.log(
      renderTable(
        report.groups.map((entry) => measurementRow(`${entry.project}/${entry.version}`, entry.total)),
        measurementRow('ALL GROUPS', report.grandTotal),
      ),
    );
    console.log('');
  }

  console.log(`Wrote ${path.relative(process.cwd(), resolved)} (${report.groups.length} group(s))`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
