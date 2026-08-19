/**
 * Per-project split overrides, applied automatically on every run (unlike
 * the `--parts`/`--oversized-section-parts` CLI flags, which only apply to
 * whichever single project a one-off invocation targets via
 * `--for-project`). An explicit CLI flag still wins over an override here
 * for whichever project `--for-project` targets.
 *
 * `parts` forces the initial (L3-level) split; `oversizedSectionParts`
 * forces the *first* recursive split of any section still oversized on its
 * own afterward. Neither is a guarantee of the final part count — they're
 * just levers into the same boundary-snapping split algorithm (see
 * split.ts) — so any retuning here should be re-verified against the
 * generated output (part count, no file over the limit, no stray
 * single-page fragments) rather than assumed to hold as content grows.
 *
 * "manual": at today's content size, the fully automatic split fragments
 * badly — small single-page sections like "replication" and "security"
 * end up isolated in their own tiny files, while the oversized "reference"
 * section over-recurses into 8 files on its own, for 17 files total.
 * Forcing a coarse 2-way initial split, then forcing *that* first
 * recursive step to 2 sub-parts as well, produces a much better-packed
 * 9 files (all comfortably under the limit, no stray single-page files) —
 * close to the ~8-file theoretical minimum (total content / 50,000). If
 * manual's content grows/shrinks enough to change this, re-tune both
 * values (and llms-descriptions.json's per-part entries) against a fresh
 * `--for-project manual --parts <n> --oversized-section-parts <n>` sweep.
 */
export const FORCED_SPLIT_BY_PROJECT: Record<string, { parts?: number; oversizedSectionParts?: number }> = {
  manual: { parts: 2, oversizedSectionParts: 2 },
};
