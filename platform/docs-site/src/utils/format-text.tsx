import clsx from 'clsx';
import { Text, TextStyle } from '@via-ds/components/typography';
import { Size } from '@via-ds/components/types';
import type { ASTNode, LiteralNode, TextNode } from '@/types/ast';
import styles from './format-text.module.scss';

type FormatTextOptions = {
  literalEnableInline: boolean;
};

const renderNodes = (nodes: ASTNode[], options?: FormatTextOptions): React.ReactNode[] =>
  nodes.flatMap((node, i) => {
    if (node.type === 'text') return (node as TextNode).value ?? '';
    if (node.type === 'literal') {
      const children = renderNodes((node as LiteralNode).children as ASTNode[], options);
      if (options?.literalEnableInline) {
        return (
          <code key={i} className={clsx(styles.navigationInlineCode, styles.wordWrap)}>
            {children}
          </code>
        );
      }
      return (
        <Text
          key={i}
          textStyle={TextStyle.inlineCode}
          size={Size.Large}
          elementType="code"
          className={clsx(styles.inlineCode, styles.wordWrap)}
        >
          {children}
        </Text>
      );
    }
    if ('children' in node && Array.isArray(node.children)) {
      return renderNodes(node.children as ASTNode[], options);
    }
    return [];
  });

/*
 * Given either a string or an array of heading title nodes, return the appropriate text output.
 */
export const formatText = (text?: string | ASTNode[], options?: FormatTextOptions) => {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return renderNodes(text, options);
};
