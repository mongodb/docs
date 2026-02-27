import type { ConversionContext, SnootyNode, MdastNode, ConvertChildrenFn } from './types';
import { extractInlineDisplayText } from './extractInlineDisplayText';
import { findDirectiveByName } from './findDirectiveByName';

// ---------------------------------------------------------------------------
// Step / structured-data helpers
// ---------------------------------------------------------------------------

/** Collect all step directive nodes from procedure children, traversing into include wrappers. */
const collectStepNodes = (children: SnootyNode[]): SnootyNode[] => {
  const steps: SnootyNode[] = [];
  for (const child of children) {
    if (child.type !== 'directive') continue;
    if (child.name === 'step') {
      steps.push(child);
    } else if (child.name === 'include') {
      // Included content is inlined as children in the Snooty AST
      const [includeRoot] = child.children ?? [];
      if (includeRoot?.children) {
        steps.push(...collectStepNodes(includeRoot.children));
      }
    }
  }
  return steps;
};

/** Recursively validate that every leaf value in a structured-data object is non-empty. */
const isStructuredDataValid = (obj: unknown): boolean => {
  if (Array.isArray(obj)) return obj.every(isStructuredDataValid);
  if (obj && typeof obj === 'object') return Object.values(obj).every(isStructuredDataValid);
  return String(obj).length > 0;
};

/** Extract the plain-text argument (heading) from a step directive node. */
const extractStepArgText = (step: SnootyNode): string => {
  if (Array.isArray(step.argument)) return extractInlineDisplayText(step.argument);
  if (typeof step.argument === 'string') return step.argument;
  return '';
};

/** Build a HowToSection structured-data entry for a nested procedure. */
const buildHowToSection = (procedureNode: SnootyNode, name: string): Record<string, unknown> => {
  const sectionSteps = collectStepNodes(procedureNode.children ?? []);
  const items: Record<string, string>[] = [];
  for (const s of sectionSteps) {
    const argText = extractStepArgText(s);
    const bodyText = extractInlineDisplayText(s.children ?? []).replace(argText, '');
    const item: Record<string, string> = { '@type': 'HowToStep', text: bodyText || argText };
    if (bodyText && argText) item.name = argText;
    items.push(item);
  }
  return { '@type': 'HowToSection', name, itemListElement: items };
};

/**
 * Compute HowTo structured-data JSON for a procedure directive.
 * Mirrors the runtime logic in `constructHowToSd` / `how-to-sd.ts`.
 */
const computeHowToStructuredData = (steps: SnootyNode[], parentHeading?: string): string | null => {
  const howToSteps: unknown[] = [];

  for (const step of steps) {
    if (step.name !== 'step') continue;
    const argText = extractStepArgText(step);
    const bodyText = extractInlineDisplayText(step.children ?? []).replace(argText, '');

    const nestedProcedure = findDirectiveByName(step.children ?? [], 'procedure');
    if (nestedProcedure) {
      howToSteps.push(buildHowToSection(nestedProcedure, argText || bodyText));
    } else {
      const item: Record<string, string> = { '@type': 'HowToStep', text: bodyText || argText };
      if (bodyText && argText) item.name = argText;
      howToSteps.push(item);
    }
  }

  if (!howToSteps.length) return null;

  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: parentHeading,
    image:
      'https://webimages.mongodb.com/_com_assets/cms/kuyj2focmkbxv7gh3-stacked_default_slate_blue.svg?auto=format%252Ccompress',
    steps: howToSteps,
  };

  if (!isStructuredDataValid(howTo)) return null;
  return JSON.stringify(howTo).replace(/</g, '\\u003c');
};

// ---------------------------------------------------------------------------
// Main conversion
// ---------------------------------------------------------------------------

interface ConvertDirectiveProcedureArgs {
  node: SnootyNode;
  ctx: ConversionContext;
  depth: number;
  /** Injected from the main converter to avoid circular imports. */
  convertChildren: ConvertChildrenFn;
}

/**
 * Convert a `procedure` directive into `<Procedure>` with numbered `<Step>` children.
 * Pre-computes HowTo structured data and step numbering so the React components
 * don't need access to the raw AST.
 */
export const convertDirectiveProcedure = ({
  node,
  ctx,
  depth,
  convertChildren,
}: ConvertDirectiveProcedureArgs): MdastNode => {
  const style = (node.options?.style as string) ?? 'connected';

  const attributes: MdastNode[] = [{ type: 'mdxJsxAttribute', name: 'style', value: style }];

  // Compute HowTo structured data for top-level procedures only
  if (!ctx.insideProcedure) {
    const allSteps = collectStepNodes(node.children ?? []);
    const parentHeading = (node.options?.title as string) ?? ctx.lastHeadingText;
    const sdJson = computeHowToStructuredData(allSteps, parentHeading);
    if (sdJson) {
      attributes.push({ type: 'mdxJsxAttribute', name: 'structuredData', value: sdJson });
    }
  }

  // Convert children, numbering step directives sequentially
  const prevInsideProcedure = ctx.insideProcedure;
  ctx.insideProcedure = true;

  const children: MdastNode[] = [];
  let stepCounter = 0;

  for (const child of node.children ?? []) {
    if (child.type === 'directive' && child.name === 'step') {
      stepCounter++;
      // Only convert step.children (body content, which includes the heading node).
      // This matches the current React component behaviour where Step receives nodeChildren.
      const stepChildren = convertChildren({ nodes: child.children, depth: depth + 1, ctx });

      children.push({
        type: 'mdxJsxFlowElement',
        name: 'Step',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'stepNumber',
            value: { type: 'mdxJsxAttributeValueExpression', value: String(stepCounter) },
          },
          { type: 'mdxJsxAttribute', name: 'stepStyle', value: style },
        ],
        children: stepChildren,
      });
    } else {
      // Non-step children (e.g. include directives) are converted normally
      children.push(...convertChildren({ nodes: [child], depth: depth + 1, ctx }));
    }
  }

  ctx.insideProcedure = prevInsideProcedure;

  return {
    type: 'mdxJsxFlowElement',
    name: 'Procedure',
    attributes,
    children,
  };
};
