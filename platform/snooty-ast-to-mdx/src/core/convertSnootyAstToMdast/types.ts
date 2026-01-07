import type { Node } from 'unist';
import type { Root } from 'mdast';

export type { Root };

export interface EmitMdxFileArgs {
  outfilePath: string;
  mdastRoot: MdastRoot;
}

export interface ConversionContext {
  emitMdxFile?: (args: EmitMdxFileArgs) => void;
  /** Relative path (POSIX) of the file currently being generated, e.g. '_includes/foo.mdx' */
  currentOutfilePath?: string;
  /** Collected references to emit into a _references.ts artifact */
  collectedSubstitutions: Map<string, string>;
  collectedRefs: Map<string, { title: string; url: string }>;
}

export interface MdastRoot extends Root, MdastNode {
  type: 'root';
}

export interface MdastNode extends Node {
  [key: string]: unknown;
}

// Flexible SnootyNode interface that matches what the parser actually produces
// The parser output doesn't strictly follow the types in ast.ts
export interface SnootyNode {
  type: string;
  children?: SnootyNode[];
  value?: string;
  // Snooty specific properties we care about
  ast?: SnootyNode;
  refuri?: string;
  language?: string;
  lang?: string;
  start?: number;
  startat?: number;
  depth?: number;
  title?: string;
  name?: string;
  argument?: SnootyNode[] | string;
  options?: Record<string, unknown>;
  enumtype?: 'ordered' | 'unordered';
  ordered?: boolean;
  label?: string;
  term?: SnootyNode[];
  html_id?: string;
  ids?: string[];
  refname?: string;
  target?: string;
  url?: string;
  domain?: string;
  admonition_type?: string;
  [key: string]: unknown;
}

export interface ValueNode extends SnootyNode {
  value: string;
}

export const isValueNode = (n?: SnootyNode): n is ValueNode => !!n && typeof n.value === 'string';

export interface TextNode extends SnootyNode {
  type: 'text';
  value: string;
}

export const isTextNode = (n?: SnootyNode): n is TextNode => !!n && n.type === 'text' && typeof n.value === 'string';

export interface LiteralNode extends SnootyNode {
  type: 'literal';
  value: string;
}

export const isLiteralNode = (n?: SnootyNode): n is LiteralNode =>
  !!n && n.type === 'literal' && typeof n.value === 'string';
