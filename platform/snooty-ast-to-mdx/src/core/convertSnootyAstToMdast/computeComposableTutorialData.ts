import { findAllDirectivesByName, findAllNestedAttribute } from './convertSnootyAstToMdast';
import type { SnootyNode } from './types';

const DELIMITER_KEY = '**';

export interface ComposableTutorialComputedData {
  validSelections: string[];
  refToSelection: Record<string, Record<string, string>>;
}

/** Build selection permutation strings (mirrors `getSelectionPermutation` from Snooty ComposableTutorial component) */
export function getSelectionPermutation(selections: Record<string, string>): Set<string> {
  const res = new Set<string>();
  const partialRes: string[] = [];
  for (const [key, value] of Object.entries(selections)) {
    if (!value || value.toLowerCase() === 'none') continue;
    partialRes.push(`${key}=${value}`);
    res.add([...partialRes].sort().join(DELIMITER_KEY));
  }
  return res;
}

/** Get the top-level content nodes from the root (unwrap document > root if present, as in Snooty BSON) */
function getContentChildren(root: SnootyNode): SnootyNode[] {
  let children = root.children ?? [];
  while (children.length === 1) {
    const only = children[0];
    if (only?.type === 'root' && Array.isArray(only.children)) return only.children;
    if (only?.type === 'document' && Array.isArray(only.children)) {
      children = only.children;
      continue;
    }
    break;
  }
  return children;
}

/** Return true if any directive with a composable-tutorial name exists anywhere under the given nodes. */
function treeHasComposableTutorial(nodes: SnootyNode[]): boolean {
  for (const node of nodes) {
    if (node.type === 'directive' && (node.name ?? '')?.toLowerCase() === 'composable-tutorial') {
      return true;
    }
    if (node.children?.length) {
      if (treeHasComposableTutorial(node.children)) return true;
    }
  }
  return false;
}

/** Compute composable-tutorial `validSelections` and `refToSelection` from Snooty AST */
export function computeComposableTutorialData(root: SnootyNode): ComposableTutorialComputedData | null {
  const rootChildren = getContentChildren(root);
  if (!treeHasComposableTutorial(rootChildren)) return null;

  const validSelectionsSet = new Set<string>();
  const refToSelection: Record<string, Record<string, string>> = {};

  const composableContents = findAllDirectivesByName(rootChildren, 'selected-content');
  for (const node of composableContents) {
    const selections =
      node.selections && typeof node.selections === 'object' ? (node.selections as Record<string, string>) : {};
    for (const selection of getSelectionPermutation(selections)) {
      validSelectionsSet.add(selection);
    }
    const ids = findAllNestedAttribute(node.children ?? [], 'id');
    const htmlIds = findAllNestedAttribute(node.children ?? [], 'html_id');
    for (const id of [...ids, ...htmlIds]) {
      if (refToSelection[id]) continue;
      refToSelection[id] = selections;
    }
  }

  return {
    validSelections: Array.from(validSelectionsSet),
    refToSelection,
  };
}

/** Shape expected by frontend ComposableTutorial (ComposableTutorialOption[]) */
export interface ComposableOption {
  default: string;
  dependencies: Record<string, string>[];
  selections: { value: string; text: string }[];
  text: string;
  value: string;
}

function isComposableOption(opt: unknown): opt is ComposableOption {
  if (!opt || typeof opt !== 'object') return false;
  const o = opt as Record<string, unknown>;
  if (typeof o.value !== 'string' || typeof o.text !== 'string' || typeof o.default !== 'string') return false;
  if (!Array.isArray(o.dependencies)) return false;
  if (!Array.isArray(o.selections)) return false;
  for (const s of o.selections) {
    if (
      !s ||
      typeof s !== 'object' ||
      typeof (s as Record<string, unknown>).value !== 'string' ||
      typeof (s as Record<string, unknown>).text !== 'string'
    )
      return false;
  }
  return true;
}

/**
 * Build composable_options array from a composable-tutorial directive node so it can be passed as a prop.
 * The AST provides node.composable_options; we pass them through and throw if the shape is wrong.
 */
export function buildComposableOptionsFromNode(node: SnootyNode): ComposableOption[] {
  const rawOptions = node.composable_options;
  if (!Array.isArray(rawOptions)) return [];
  for (let i = 0; i < rawOptions.length; i++) {
    if (!isComposableOption(rawOptions[i])) {
      throw new Error(
        `composable_options[${i}] has invalid shape: expected { value, text, default, dependencies, selections }`,
      );
    }
  }
  return rawOptions as ComposableOption[];
}
