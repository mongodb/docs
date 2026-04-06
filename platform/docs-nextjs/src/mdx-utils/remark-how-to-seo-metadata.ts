import type { MdxJsxFlowElement, MdxJsxAttribute } from 'mdast-util-mdx-jsx';
import type { Root, Heading } from 'mdast';
import type { Node, Parent } from 'unist';
import { visit, SKIP } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

const MONGODB_IMAGE =
  'https://webimages.mongodb.com/_com_assets/cms/kuyj2focmkbxv7gh3-stacked_default_slate_blue.svg?auto=format%252Ccompress';

/**
 * Remark plugin that computes HowTo SEO Metadata for top-level Procedure elements
 *
 * Mirrors the original logic from `constructHowToSd()` / `how-to-sd.ts`:
 * - Extracts step heading (name) and body text from Step children
 * - Only processes top-level Procedures (nested ones become HowToSections)
 * - Uses the Procedure's `title` attribute or the preceding heading as the HowTo name
 * - Validates that all structured data values are non-empty
 */
export const remarkHowToSeoMetadata = () => {
  return (tree: Root) => {
    let lastHeadingText: string | undefined;

    visit(tree, (node: Node) => {
      if (node.type === 'heading') {
        lastHeadingText = toString(node);
        return;
      }

      if (!isJsxElementNamed(node, 'Procedure')) return;

      const title = getJsxAttribute(node, 'title') ?? lastHeadingText;
      const items = buildHowToItems(node);

      if (!items.length || !title) return SKIP;

      const howTo = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: title,
        image: MONGODB_IMAGE,
        step: items,
      };

      if (!isStructuredDataValid(howTo)) return SKIP;

      setJsxAttribute(node, 'structuredData', JSON.stringify(howTo).replace(/</g, '\\u003c'));

      return SKIP;
    });
  };
};

// =========================
// HowTo metadata helpers
// =========================

interface HowToStep {
  '@type': 'HowToStep';
  text: string;
  name?: string;
}

interface HowToSection {
  '@type': 'HowToSection';
  name: string;
  itemListElement: HowToStep[];
}

type HowToItem = HowToStep | HowToSection;

const extractStepTexts = (children: Node[]): { headingText: string; bodyText: string } => {
  const stepHeading = children.find((c) => isJsxElementNamed(c, 'StepHeading'));
  const heading = stepHeading ?? children.find((c): c is Heading => c.type === 'heading');
  const headingText = heading ? toString(heading) : '';
  const bodyText = children
    .filter((c) => c !== heading)
    .map((c) => toString(c))
    .join(' ')
    .trim();
  return { headingText, bodyText };
};

const findNestedProcedure = (children: Node[]): MdxJsxFlowElement | undefined => {
  for (const child of children) {
    if (isJsxElementNamed(child, 'Procedure')) return child;
    if ('children' in child) {
      const found = findNestedProcedure((child as Parent).children);
      if (found) return found;
    }
  }
  return undefined;
};

const buildSection = (procedure: MdxJsxFlowElement, name: string): HowToSection => {
  const items: HowToStep[] = [];
  for (const child of procedure.children) {
    if (!isJsxElementNamed(child, 'Step')) continue;
    const { headingText, bodyText } = extractStepTexts(child.children);
    const step: HowToStep = { '@type': 'HowToStep', text: bodyText || headingText };
    if (bodyText && headingText) step.name = headingText;
    items.push(step);
  }
  return { '@type': 'HowToSection', name, itemListElement: items };
};

const buildHowToItems = (procedure: MdxJsxFlowElement): HowToItem[] => {
  const items: HowToItem[] = [];
  for (const child of procedure.children) {
    if (!isJsxElementNamed(child, 'Step')) continue;
    const { headingText, bodyText } = extractStepTexts(child.children);

    const nested = findNestedProcedure(child.children);
    if (nested) {
      items.push(buildSection(nested, headingText || bodyText));
    } else {
      const step: HowToStep = { '@type': 'HowToStep', text: bodyText || headingText };
      if (bodyText && headingText) step.name = headingText;
      items.push(step);
    }
  }
  return items;
};

// =========================
// mdast utility functions
// =========================

const isJsxElementNamed = (node: Node, name: string): node is MdxJsxFlowElement => {
  return node.type === 'mdxJsxFlowElement' && (node as MdxJsxFlowElement).name === name;
};

const getJsxAttribute = (node: MdxJsxFlowElement, name: string): string | undefined => {
  const attr = node.attributes?.find((a) => (a as MdxJsxAttribute).name === name);
  if (!attr?.value) return undefined;

  return typeof attr.value === 'string' ? attr.value : attr.value.value;
};

const setJsxAttribute = (node: MdxJsxFlowElement, name: string, value: string): void => {
  if (!node.attributes) node.attributes = [];

  const existing = node.attributes.find((a) => (a as MdxJsxAttribute).name === name);
  if (existing) {
    existing.value = value;
  } else {
    node.attributes.push({ type: 'mdxJsxAttribute', name, value });
  }
};

const isStructuredDataValid = (obj: unknown): boolean => {
  if (Array.isArray(obj)) {
    return obj.every(isStructuredDataValid);
  }
  if (obj && typeof obj === 'object') {
    return Object.values(obj).every(isStructuredDataValid);
  }
  return String(obj).length > 0;
};
