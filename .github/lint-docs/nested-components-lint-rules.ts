/**
 * Nested components linter — pure rules (no I/O).
 *
 * Detects RST directives nested inside containers that prohibit them,
 * using an indentation-stack approach. Only list-table is treated as a
 * table container; grid tables are not detected.
 *
 * When a container that forbids nesting (callout, list-table, procedure,
 * tabs) holds an ``.. include::`` directive, the included content is
 * resolved and scanned too, so that a callout or example hidden inside a
 * shared include is still detected as a nested component.
 *
 * Forbidden patterns (per MongoDB style guide):
 *   1. Callout inside callout
 *   2. Callout inside list-table
 *   3. Example inside callout
 *   4. Example inside list-table
 *   5. Procedure inside procedure
 *   6. Tabs inside tabs
 */

import type { LintIssue } from './seo-lint-rules.js';

export type { LintIssue };

const CALLOUTS = new Set(['note', 'tip', 'important', 'warning', 'seealso', 'admonition']);
const CODE_BLOCKS = new Set(['code-block', 'code', 'sourcecode']);

// Containers whose contents can form a forbidden nesting pair. When an
// include sits inside one of these, its resolved content is worth scanning.
const NESTING_CONTAINERS = new Set([
  ...CALLOUTS,
  'list-table',
  'procedure',
  'tabs',
  'tab',
]);

/**
 * Resolves an ``.. include::`` target to its underlying content so the
 * linter can scan across include boundaries. Returns null when the target
 * cannot be resolved (the caller then skips it silently).
 *
 * ``lineOffset`` is the 0-based line number in ``file`` at which the
 * returned ``content`` begins, so reported line numbers point at the real
 * source location (relevant for YAML extract content blocks).
 */
export interface ResolvedInclude {
  content: string;
  file: string;
  lineOffset: number;
}

export type IncludeResolver = (
  includeTarget: string,
  fromFile: string,
) => ResolvedInclude | null;

interface DirectiveFrame {
  directive: string;
  indent: number;
  isCodeBlock: boolean;
}

interface Violation {
  rule: string;
  message: string;
  suggestion: string;
}

function getViolation(ancestor: string, child: string): Violation | null {
  if (CALLOUTS.has(ancestor) && CALLOUTS.has(child)) {
    return {
      rule: 'callout-in-callout',
      message: `"${child}" callout nested inside "${ancestor}" callout`,
      suggestion:
        'Remove the nested callout and incorporate its content into the parent callout.',
    };
  }
  if (ancestor === 'list-table' && CALLOUTS.has(child)) {
    return {
      rule: 'callout-in-table',
      message: `"${child}" callout nested inside a list-table`,
      suggestion:
        child === 'note'
          ? 'Remove the note directive and make its content plain text.'
          : 'Remove the directive. Use :gold:`IMPORTANT:` or :red:`WARNING:` inline text instead.',
    };
  }
  if (CALLOUTS.has(ancestor) && child === 'example') {
    return {
      rule: 'example-in-callout',
      message: `"example" directive nested inside "${ancestor}" callout`,
      suggestion:
        'Remove the example directive. Introduce the content with "For example," instead.',
    };
  }
  if (ancestor === 'list-table' && child === 'example') {
    return {
      rule: 'example-in-table',
      message: `"example" directive nested inside a list-table`,
      suggestion:
        'Remove the example directive. Introduce the content with "For example," instead.',
    };
  }
  if (ancestor === 'procedure' && child === 'procedure') {
    return {
      rule: 'procedure-in-procedure',
      message: '"procedure" nested inside another "procedure"',
      suggestion:
        'Remove the nested procedure. Convert its steps to an ordered list (a., b., c.).',
    };
  }
  if ((ancestor === 'tabs' || ancestor === 'tab') && child === 'tabs') {
    return {
      rule: 'tabs-in-tabs',
      message: '"tabs" directive nested inside another tabs component',
      suggestion: 'Remove the nested tabs. Restructure the content into separate sections.',
    };
  }
  return null;
}

const DIRECTIVE_RE = /^\s*\.\. ([\w][\w-]*)::\s*(.*)$/;

export function lintNestedComponents(
  content: string,
  filename: string,
  resolveInclude?: IncludeResolver,
): LintIssue[] {
  const issues: LintIssue[] = [];
  scanContent(content, filename, [], issues, resolveInclude, new Set([filename]), 0);
  return issues;
}

/**
 * Scans one body of content for nested-component violations.
 *
 * ``initialStack`` seeds the ancestor context. When scanning content pulled
 * in through an include, the caller passes the enclosing directives (with
 * their indents flattened to -1 so they persist for the whole include and
 * never pop against the include's own indentation).
 *
 * ``lineOffset`` is added to reported line numbers so they map back to the
 * real source line in ``filename``.
 */
function scanContent(
  content: string,
  filename: string,
  initialStack: DirectiveFrame[],
  issues: LintIssue[],
  resolveInclude: IncludeResolver | undefined,
  visited: Set<string>,
  lineOffset: number,
): void {
  const lines = content.split('\n');
  const stack: DirectiveFrame[] = [...initialStack];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1 + lineOffset;

    if (line.trim() === '') continue;

    const indent = line.length - line.trimStart().length;

    while (stack.length > 0 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const match = line.match(DIRECTIVE_RE);
    if (!match) continue;

    const directive = match[1].toLowerCase();
    const argument = match[2].trim();

    // Inside a code block: skip violation checks but still track the frame
    // so the stack stays consistent for scope-end detection.
    if (stack.some(f => f.isCodeBlock)) {
      stack.push({ directive, indent, isCodeBlock: false });
      continue;
    }

    // Check ancestors from most immediate to outermost; report the first violation.
    for (let j = stack.length - 1; j >= 0; j--) {
      const violation = getViolation(stack[j].directive, directive);
      if (violation) {
        issues.push({
          file: filename,
          line: lineNum,
          rule: violation.rule,
          severity: 'error',
          message: violation.message,
          suggestion: violation.suggestion,
        });
        break;
      }
    }

    // Follow an include when it sits inside a container that forbids
    // nesting, so a callout or example hidden in the include is caught.
    if (
      directive === 'include' &&
      argument &&
      resolveInclude &&
      stack.some(f => NESTING_CONTAINERS.has(f.directive))
    ) {
      const resolved = resolveInclude(argument, filename);
      if (resolved && !visited.has(resolved.file)) {
        visited.add(resolved.file);
        // Flatten the current ancestors so the include's content is treated
        // as nested inside them regardless of its own indentation.
        const seededStack: DirectiveFrame[] = stack.map(f => ({
          directive: f.directive,
          indent: -1,
          isCodeBlock: false,
        }));
        scanContent(
          resolved.content,
          resolved.file,
          seededStack,
          issues,
          resolveInclude,
          visited,
          resolved.lineOffset,
        );
        visited.delete(resolved.file);
      }
    }

    stack.push({ directive, indent, isCodeBlock: CODE_BLOCKS.has(directive) });
  }
}
