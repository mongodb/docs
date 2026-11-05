import type { Iteration } from './plan.js';
import type { BatchState, IterationStatus } from './state.js';

export function formatProgress(index: number, total: number, id: string, status: IterationStatus): string {
  return `[${index}/${total}] ${id} ${status}`;
}

export function formatYield(prodYield: BatchState['prodYield']): string {
  if (!prodYield) return 'production scrape yield: unknown';
  const { present, expected } = prodYield;
  const line = `production scrape yield: ${present}/${expected}`;
  return present < expected ? `${line}  DEGRADED (${expected - present} missing)` : line;
}

export function formatSummary(iterations: Iteration[], state: BatchState): string {
  const cells = new Map<
    string,
    { completed: number; partial: number; failed: number; lines: string[] }
  >();
  for (const it of iterations) {
    const key = `${it.backend}:${it.model ?? ''}`;
    const entry = cells.get(key) ?? { completed: 0, partial: 0, failed: 0, lines: [] };
    const record = state.iterations[it.id];
    const status = record?.status;
    if (status === 'completed' || status === 'partial' || status === 'failed') entry[status]++;
    if (record) {
      const experiment = record.experimentName ? `  ${record.experimentName}` : '';
      entry.lines.push(`  ${it.id} ${record.status}${experiment}`);
    }
    cells.set(key, entry);
  }
  const body = [...cells].map(([key, c]) =>
    [`${key}  completed=${c.completed} partial=${c.partial} failed=${c.failed}`, ...c.lines].join(
      '\n',
    ),
  );
  return [formatYield(state.prodYield), ...body].join('\n');
}
