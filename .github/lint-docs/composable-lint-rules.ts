/**
 * Composable tutorial linter — pure rules (no I/O).
 *
 * Validates MongoDB's composable-tutorial directives against the
 * "Composable Tutorials Guidance" document:
 *   https://docs.google.com/document/d/1rOJ5RF4xDdw4OBSej9m2nb_U5tIXOLz3sYCB6P4DpcI
 *
 * Detect-only; there is no autofix. Rules are grouped by the guidance they
 * enforce:
 *
 *   Appendix -> Syntax
 *     - orphan-selected-content
 *     - composable-empty
 *     - composable-missing-options
 *     - selected-content-missing-selections
 *     - defaults-exceed-options
 *     - selections-exceed-options
 *
 *   "Avoid duplicating ref definitions in a composable tutorial"
 *     - duplicate-ref-in-composable
 *
 *   "Create custom composable definitions sparingly"
 *     - duplicate-custom-composable-id   (snooty.toml level)
 *
 *   "Use default composable definitions" / "Avoid and remove nested tabs"
 *     - language-tabs-without-composable
 *     - nested-tabs-should-be-composable
 *
 *   "Keep composable tutorials simple to avoid complexity"
 *     - content-duplicated-across-selections   (Collapsibles guidance)
 *     - multiple-procedures-per-page
 *     - permutations-over-50
 *
 * Deliberate non-rules (documented in the README): "too complex -> split into
 * separate pages", "nested pages as an alternative", and
 * custom-id-collides-with-default.
 */

import type { LintIssue, Severity } from './seo-lint-rules.js';

export type { LintIssue };

// =============================================================================
// CONSTANTS
// =============================================================================

const CODE_BLOCKS = new Set(['code-block', 'code', 'sourcecode']);
const DIRECTIVE_RE = /^\s*\.\. ([\w][\w-]*)::\s*(.*)$/;
const OPTION_RE = /^\s*:([\w-]+):\s*(.*)$/;
const REF_RE = /^\s*\.\. _([\w][\w.-]*):/;

/** Doc: "Keep the number of permutations under 50". */
export const MAX_PERMUTATIONS = 50;

/**
 * Tab labels that indicate a page-wide selector which the doc says must be a
 * composable, not tabs. Labels are free-form, so these are display-name lists
 * matched case-insensitively against the text after ``.. tab::``. Heuristic:
 * expect to tune this list.
 */
const LANGUAGE_TAB_LABELS = new Set([
  'c', 'c#', 'c++', 'c# (.net)', '.net/c#', 'c# / .net',
  'go', 'java', 'java (sync)', 'java (async)', 'java sync', 'java async',
  'kotlin', 'kotlin (coroutine)', 'node', 'node.js', 'nodejs',
  'javascript', 'typescript', 'php', 'python', 'ruby', 'scala', 'rust',
  'swift', 'swift (sync)', 'swift (async)', 'motor', 'dart', 'perl',
  'graphql', 'objective-c', 'mql', 'mongosh', 'mongodb shell',
]);

const INTERFACE_TAB_LABELS = new Set([
  'atlas', 'atlas cli', 'atlas ui', 'atlas admin api', 'atlas operator',
  'compass', 'driver', 'terraform', 'cloud manager', 'ops manager',
  'self-managed', 'kubernetes operator',
]);

const VERSION_TAB_LABEL_RE = /^(v?\d+(\.\d+)*|current|latest|upcoming)$/i;

// =============================================================================
// TYPES
// =============================================================================

export interface SnootyComposables {
  /** composable id -> number of options in its definition (first def wins). */
  definitions: Map<string, number>;
  /** ids defined more than once, with the 1-based lines of each definition. */
  duplicates: { id: string; lines: number[] }[];
}

interface SelectedState {
  line: number;
  hasSelections: boolean;
  selectionsArity: number;
  /** Number of procedures directly inside this selected-content. */
  procedureCount: number;
  refLabels: { label: string; line: number }[];
  bodyLines: string[];
}

interface ComposableState {
  line: number;
  hasOptions: boolean;
  optionsArity: number;
  optionIds: string[];
  hasDefaults: boolean;
  defaultsArity: number;
  /** True if an ``.. include::`` appears inside the tutorial body. */
  hasInclude: boolean;
  children: SelectedState[];
}

interface Frame {
  directive: string;
  indent: number;
  isCodeBlock: boolean;
  bodyStart: number;
  comp?: ComposableState;
  sel?: SelectedState;
}

type TabKind = 'language' | 'interface' | 'version' | 'other';

// =============================================================================
// HELPERS
// =============================================================================

function issue(
  file: string,
  line: number,
  rule: string,
  severity: Severity,
  message: string,
  suggestion: string,
): LintIssue {
  return { file, line, rule, severity, message, suggestion };
}

/** Splits a comma-separated option value into trimmed, non-empty entries. */
function splitList(value: string): string[] {
  return value.split(',').map(s => s.trim()).filter(s => s.length > 0);
}

/**
 * Reads the field-list options (``:name: value``) that immediately follow a
 * directive. Returns the fields and how many lines were consumed, so the
 * caller can start the directive body after them.
 */
function collectOptionFields(
  lines: string[],
  dirIndex: number,
  dirIndent: number,
): { fields: Map<string, string>; consumed: number } {
  const fields = new Map<string, string>();
  let consumed = 0;
  for (let j = dirIndex + 1; j < lines.length; j++) {
    const raw = lines[j];
    if (raw.trim() === '') break;
    const indent = raw.length - raw.trimStart().length;
    if (indent <= dirIndent) break;
    const m = raw.match(OPTION_RE);
    if (!m) break;
    fields.set(m[1].toLowerCase(), m[2].trim());
    consumed++;
  }
  return { fields, consumed };
}

function classifyTabLabel(label: string): TabKind {
  const l = label.trim().toLowerCase();
  if (VERSION_TAB_LABEL_RE.test(l)) return 'version';
  if (LANGUAGE_TAB_LABELS.has(l)) return 'language';
  if (INTERFACE_TAB_LABELS.has(l)) return 'interface';
  return 'other';
}

/** Whitespace-normalized body used to compare selected-content sections. */
function normalizeBody(lines: string[]): string {
  return lines.map(l => l.trim()).filter(l => l.length > 0).join('\n');
}

function findInnermostSelected(stack: Frame[]): SelectedState | null {
  for (let i = stack.length - 1; i >= 0; i--) {
    const frame = stack[i];
    if (frame.sel) return frame.sel;
  }
  return null;
}

// =============================================================================
// CONTENT RULES
// =============================================================================

export function lintComposableContent(
  content: string,
  filename: string,
  definitions?: Map<string, number>,
): LintIssue[] {
  // Agent tooling is not site content (mirrors the SEO/findability linters).
  if (filename.includes('/.claude/agents/')) return [];

  const issues: LintIssue[] = [];
  const lines = content.split('\n');
  const stack: Frame[] = [];

  let pageHasComposable = false;
  const tabs: { label: string; nested: boolean; line: number }[] = [];
  const procedureLines: number[] = [];
  // Procedures a user can see at once: any outside a selected-content are
  // always visible, plus the most procedures any single selection shows.
  let proceduresOutsideSelections = 0;
  let maxProceduresInSelection = 0;

  const finalize = (frame: Frame, ancestors: Frame[], endIndex: number): void => {
    if (frame.sel) {
      frame.sel.bodyLines = lines.slice(frame.bodyStart, endIndex);
      // selected-content is often nested inside procedures/steps, so attach it
      // to the nearest enclosing composable-tutorial, not just the immediate parent.
      for (let k = ancestors.length - 1; k >= 0; k--) {
        const enclosing = ancestors[k].comp;
        if (enclosing) {
          enclosing.children.push(frame.sel);
          break;
        }
      }
    }
    if (frame.comp) {
      finalizeComposable(frame.comp, filename, issues, definitions);
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    if (raw.trim() === '') continue;
    const indent = raw.length - raw.trimStart().length;

    while (stack.length > 0 && indent <= stack[stack.length - 1].indent) {
      const f = stack.pop() as Frame;
      finalize(f, stack, i);
    }

    // Ref definitions belong to the innermost enclosing selected-content.
    const refMatch = raw.match(REF_RE);
    if (refMatch) {
      const openSel = findInnermostSelected(stack);
      if (openSel) openSel.refLabels.push({ label: refMatch[1], line: i + 1 });
      continue;
    }

    const m = raw.match(DIRECTIVE_RE);
    if (!m) continue;
    const directive = m[1].toLowerCase();
    const argument = m[2].trim();

    if (directive === 'procedure') {
      procedureLines.push(i + 1);
      const enclosing = findInnermostSelected(stack);
      if (enclosing) {
        enclosing.procedureCount++;
        if (enclosing.procedureCount > maxProceduresInSelection) {
          maxProceduresInSelection = enclosing.procedureCount;
        }
      } else {
        proceduresOutsideSelections++;
      }
    }

    if (directive === 'tabs' || directive === 'tab') {
      // A ``tab`` is nested when it sits inside two or more ``tabs`` frames.
      const tabsDepth = stack.filter(f => f.directive === 'tabs').length;
      if (directive === 'tab' && argument) {
        tabs.push({ label: argument, nested: tabsDepth >= 2, line: i + 1 });
      }
    }

    if (directive === 'include') {
      // selected-content may live in the included file; mark the enclosing
      // tutorial so the empty check does not false-positive on it.
      for (let k = stack.length - 1; k >= 0; k--) {
        const enclosing = stack[k].comp;
        if (enclosing) {
          enclosing.hasInclude = true;
          break;
        }
      }
    }

    if (directive === 'composable-tutorial') {
      pageHasComposable = true;
      const { fields, consumed } = collectOptionFields(lines, i, indent);
      const optionsRaw = fields.get('options');
      const defaultsRaw = fields.get('defaults');
      const comp: ComposableState = {
        line: i + 1,
        hasOptions: optionsRaw !== undefined,
        optionsArity: optionsRaw ? splitList(optionsRaw).length : 0,
        optionIds: optionsRaw ? splitList(optionsRaw) : [],
        hasDefaults: defaultsRaw !== undefined,
        defaultsArity: defaultsRaw ? splitList(defaultsRaw).length : 0,
        hasInclude: false,
        children: [],
      };
      stack.push({ directive, indent, isCodeBlock: false, bodyStart: i + 1 + consumed, comp });
      continue;
    }

    if (directive === 'selected-content') {
      const { fields, consumed } = collectOptionFields(lines, i, indent);
      const selectionsRaw = fields.get('selections');
      const sel: SelectedState = {
        line: i + 1,
        hasSelections: selectionsRaw !== undefined,
        selectionsArity: selectionsRaw ? splitList(selectionsRaw).length : 0,
        procedureCount: 0,
        refLabels: [],
        bodyLines: [],
      };
      if (!stack.some(f => f.comp)) {
        issues.push(
          issue(
            filename,
            i + 1,
            'orphan-selected-content',
            'error',
            '"selected-content" directive is not inside a "composable-tutorial"',
            'Move this selected-content inside a ".. composable-tutorial::" directive, or remove it.',
          ),
        );
      }
      stack.push({ directive, indent, isCodeBlock: false, bodyStart: i + 1 + consumed, sel });
      continue;
    }

    stack.push({ directive, indent, isCodeBlock: CODE_BLOCKS.has(directive), bodyStart: i + 1 });
  }

  while (stack.length > 0) {
    const f = stack.pop() as Frame;
    finalize(f, stack, lines.length);
  }

  // ---- Page-level rules -----------------------------------------------------

  if (tabs.length > 0 && !pageHasComposable) {
    const kinds = tabs.map(t => classifyTabLabel(t.label));
    const anyNested = tabs.some(t => t.nested);
    const hasLanguage = kinds.includes('language');
    const hasInterfaceOrVersion = kinds.includes('interface') || kinds.includes('version');

    if (anyNested && (hasLanguage || hasInterfaceOrVersion)) {
      issues.push(
        issue(
          filename,
          tabs.find(t => t.nested)!.line,
          'nested-tabs-should-be-composable',
          'warning',
          'Nested tabs hold a language/interface/version selector and should be a composable tutorial',
          'Replace the nested tabs with a ".. composable-tutorial::" (the guidance says you must convert when a language, interface, or version selector is possible). The "language-tabs-to-composable-scripted" skill automates this conversion.',
        ),
      );
    } else if (hasLanguage) {
      issues.push(
        issue(
          filename,
          tabs.find(t => classifyTabLabel(t.label) === 'language')!.line,
          'language-tabs-without-composable',
          'warning',
          'Page presents language options as tabs but has no composable tutorial',
          'Convert the language tabs to a ".. composable-tutorial::" with a language selector. The "language-tabs-to-composable-scripted" skill automates this conversion.',
        ),
      );
    }
  }

  const proceduresAtOnce = proceduresOutsideSelections + maxProceduresInSelection;
  if (pageHasComposable && proceduresAtOnce > 1) {
    issues.push(
      issue(
        filename,
        procedureLines[1],
        'multiple-procedures-per-page',
        'warning',
        `Composable page presents ${proceduresAtOnce} procedures at once (guidance: at most 1 per page)`,
        'Split the page so a single selection shows one procedure, or move extra procedures to separate pages.',
      ),
    );
  }

  return issues;
}

function finalizeComposable(
  comp: ComposableState,
  filename: string,
  issues: LintIssue[],
  definitions: Map<string, number> | undefined,
): void {
  if (comp.children.length === 0 && !comp.hasInclude) {
    issues.push(
      issue(
        filename,
        comp.line,
        'composable-empty',
        'error',
        '"composable-tutorial" has no "selected-content" section',
        'Add at least one ".. selected-content::" section inside the composable tutorial.',
      ),
    );
  }

  if (!comp.hasOptions) {
    issues.push(
      issue(
        filename,
        comp.line,
        'composable-missing-options',
        'error',
        '"composable-tutorial" is missing the ":options:" field',
        'Add ":options:" listing the composable definition id(s) this tutorial selects on.',
      ),
    );
  } else if (comp.hasDefaults && comp.defaultsArity > comp.optionsArity) {
    issues.push(
      issue(
        filename,
        comp.line,
        'defaults-exceed-options',
        'error',
        `":defaults:" has ${comp.defaultsArity} value(s) but ":options:" names only ${comp.optionsArity} definition(s)`,
        'Provide at most one default per ":options:" entry, in order. Fewer values are allowed; more are not.',
      ),
    );
  }

  if (comp.hasOptions) {
    for (const child of comp.children) {
      if (child.hasSelections && child.selectionsArity > comp.optionsArity) {
        issues.push(
          issue(
            filename,
            child.line,
            'selections-exceed-options',
            'error',
            `":selections:" has ${child.selectionsArity} value(s) but the parent ":options:" names only ${comp.optionsArity} definition(s)`,
            'Provide at most one selection per ":options:" entry, in order. Fewer values are allowed; more are not.',
          ),
        );
      }
      if (!child.hasSelections) {
        issues.push(
          issue(
            filename,
            child.line,
            'selected-content-missing-selections',
            'error',
            '"selected-content" is missing the ":selections:" field',
            'Add ":selections:" naming the option(s) this section applies to.',
          ),
        );
      }
    }
  }

  // Duplicate ref definitions across selected-content sections of one tutorial.
  const seenIn = new Map<string, { section: number; reported: boolean }>();
  comp.children.forEach((child, section) => {
    for (const { label, line } of child.refLabels) {
      const prev = seenIn.get(label);
      if (!prev) {
        seenIn.set(label, { section, reported: false });
      } else if (prev.section !== section && !prev.reported) {
        prev.reported = true;
        issues.push(
          issue(
            filename,
            line,
            'duplicate-ref-in-composable',
            'error',
            `Ref definition "${label}" appears in more than one selected-content section of the same composable tutorial`,
            'Define the ref once — hoist it above the composable, or into the default selection — to avoid build errors.',
          ),
        );
      }
    }
  });

  // Page-wide content duplicated in every selection belongs outside the tutorial.
  if (comp.children.length >= 2) {
    const bodies = comp.children.map(c => normalizeBody(c.bodyLines));
    if (bodies[0].length >= 60 && bodies.every(b => b === bodies[0])) {
      issues.push(
        issue(
          filename,
          comp.line,
          'content-duplicated-across-selections',
          'warning',
          'Identical content appears in every selected-content section of this composable tutorial',
          'Move page-wide content out of the composable (for example, into a collapsible) so it is not duplicated per selection.',
        ),
      );
    }
  }

  // Permutation count (product of option counts across the :options: definitions).
  if (definitions && comp.hasOptions && comp.optionIds.length > 0) {
    let product = 1;
    let known = true;
    for (const id of comp.optionIds) {
      const count = definitions.get(id);
      if (count === undefined) {
        known = false;
        break;
      }
      product *= count;
    }
    if (known && product > MAX_PERMUTATIONS) {
      issues.push(
        issue(
          filename,
          comp.line,
          'permutations-over-50',
          'warning',
          `Composable tutorial has ${product} permutations (guidance: keep under ${MAX_PERMUTATIONS})`,
          'Reduce the number of selectable options, or split the tutorial into separate (nested) pages.',
        ),
      );
    }
  }
}

// =============================================================================
// SNOOTY.TOML RULES
// =============================================================================

/**
 * Parses the ``[[composables]]`` blocks of a docset snooty.toml, returning each
 * id's option count and any ids defined more than once.
 */
export function parseSnootyComposables(content: string): SnootyComposables {
  const lines = content.split('\n');
  const definitions = new Map<string, number>();
  const linesById = new Map<string, number[]>();

  let i = 0;
  while (i < lines.length) {
    if (!/^\s*\[\[composables\]\]\s*$/.test(lines[i])) {
      i++;
      continue;
    }

    let id: string | null = null;
    let idLine = 0;
    let optionCount = 0;
    let inOptions = false;

    let j = i + 1;
    for (; j < lines.length; j++) {
      const l = lines[j];
      if (/^\s*\[/.test(l)) break;

      const idMatch = l.match(/^\s*id\s*=\s*"([^"]*)"/);
      if (idMatch && id === null) {
        id = idMatch[1];
        idLine = j + 1;
      }

      if (/^\s*options\s*=\s*\[/.test(l)) inOptions = true;
      if (inOptions) {
        const entryMatches = l.match(/\{\s*id\s*=/g);
        if (entryMatches) optionCount += entryMatches.length;
        else if (l.includes(']')) inOptions = false;
      }
    }

    if (id !== null) {
      if (!definitions.has(id)) definitions.set(id, optionCount);
      if (!linesById.has(id)) linesById.set(id, []);
      (linesById.get(id) as number[]).push(idLine);
    }
    i = j;
  }

  const duplicates = [...linesById.entries()]
    .filter(([, ls]) => ls.length > 1)
    .map(([id, ls]) => ({ id, lines: ls }));

  return { definitions, duplicates };
}

export function lintSnootyToml(content: string, filename: string): LintIssue[] {
  const { duplicates } = parseSnootyComposables(content);
  return duplicates.map(({ id, lines }) =>
    issue(
      filename,
      lines[1],
      'duplicate-custom-composable-id',
      'error',
      `Composable id "${id}" is defined ${lines.length} times in this snooty.toml (lines ${lines.join(', ')})`,
      'Make each composable id unique within the docset, then remove the redundant definition.',
    ),
  );
}
