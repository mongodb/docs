import styled from '@emotion/styled';
import { css } from '@leafygreen-ui/emotion';
import { cx } from '@leafygreen-ui/emotion';
import { InlineCode } from '@leafygreen-ui/typography';
import type { ASTNode, LiteralNode, TextNode } from '@/types/ast';

type FormatTextOptions = {
  literalEnableInline: boolean;
};

const StyledNavigationInlineCode = styled('code')`
  font-family: 'Source Code Pro';
  color: unset;
`;

const inlineCodeStyling = css`
  font-size: unset;
  display: inline;
  color: var(--font-color-primary);
  background: var(--background-color-secondary);

  a & {
    color: inherit;
  }
`;

const wordWrapStyle = css`
  word-wrap: break-word;
  white-space: unset;
`;

const renderNodes = (nodes: ASTNode[], options?: FormatTextOptions): React.ReactNode[] =>
  nodes.flatMap((node, i) => {
    if (node.type === 'text') return (node as TextNode).value ?? '';
    if (node.type === 'literal') {
      const children = renderNodes((node as LiteralNode).children as ASTNode[], options);
      if (options?.literalEnableInline) {
        return (
          <StyledNavigationInlineCode key={i} className={wordWrapStyle}>
            {children}
          </StyledNavigationInlineCode>
        );
      }
      return (
        <InlineCode key={i} className={cx(inlineCodeStyling, wordWrapStyle)}>
          {children}
        </InlineCode>
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
