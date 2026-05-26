/**
 * Nested components linter — pure rules (no I/O).
 *
 * Detects RST directives nested inside containers that prohibit them,
 * using an indentation-stack approach. Only list-table is treated as a
 * table container; grid tables are not detected.
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

const DIRECTIVE_RE = /^\s*\.\. ([\w][\w-]*)::.*$/;

export function lintNestedComponents(content: string, filename: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const lines = content.split('\n');
  const stack: DirectiveFrame[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    if (line.trim() === '') continue;

    const indent = line.length - line.trimStart().length;

    while (stack.length > 0 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const match = line.match(DIRECTIVE_RE);
    if (!match) continue;

    const directive = match[1].toLowerCase();

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

    stack.push({ directive, indent, isCodeBlock: CODE_BLOCKS.has(directive) });
  }

  return issues;
}
