'use client';

import { css, cx } from '@leafygreen-ui/emotion';
import { Body } from '@leafygreen-ui/typography';
import type { ASTNode } from '@/types/ast';
import { appendTrailingPunctuation } from '@/utils/append-trailing-punctuation';
import ComponentFactory from '../component-factory';

const SKIP_P_TAGS = new Set(['caption', 'footnote', 'field']);

const paragraphStyling = css`
  margin-bottom: 16px;
  color: var(--font-color-primary);
`;

export type ParagraphProps = {
  children?: React.ReactNode;
  nodeChildren?: ASTNode[];
  parentNode?: string;
  skipPTag?: boolean;
};

const Paragraph = ({ children, nodeChildren, parentNode, skipPTag = false, ...rest }: ParagraphProps) => {
  // TODO: is this removed when we use the new MDX components?
  const childrenWithPunctuation = appendTrailingPunctuation(nodeChildren || []);
  // For paragraph nodes that appear inside certain containers, skip <p> tags and just render their contents
  if (skipPTag || (parentNode && SKIP_P_TAGS.has(parentNode))) {
    return (
      children ??
      childrenWithPunctuation.map((element, index) => <ComponentFactory {...rest} nodeData={element} key={index} />)
    );
  }
  return (
    <Body className={cx(paragraphStyling)}>
      {children ??
        childrenWithPunctuation.map((element, index) => <ComponentFactory {...rest} nodeData={element} key={index} />)}
    </Body>
  );
};

export default Paragraph;
