'use client';

import { useMemo } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import { Body } from '@leafygreen-ui/typography';
import { theme } from '@/styles/theme';
import type { AdmonitionNode, ASTNode } from '@/types/ast';
import { getPlaintext } from '@/utils/get-plaintext';
import ComponentFactory from '@/components/component-factory';

const indentedContainerStyle = css`
  padding-left: ${theme.size.medium};
`;

const labelStyle = css`
  font-size: ${theme.fontSize.default};
  font-weight: 600;
  margin-bottom: ${theme.size.tiny};
`;

// Checks if all child content are unordered list nodes (no extra padding required)
const hasOnlyUnorderedLists = (children: ASTNode[]): boolean => {
  const isListNode = (nodeData: ASTNode) =>
    nodeData.type === 'list' && 'enumtype' in nodeData && nodeData.enumtype === 'unordered';
  return children.every((child) => isListNode(child));
};

export type SeeAlsoProps = {
  nodeChildren: AdmonitionNode['children'];
  argument: AdmonitionNode['argument'];
};

const SeeAlso = ({ nodeChildren, argument, ...rest }: SeeAlsoProps) => {
  const title = getPlaintext(argument);
  const onlyUnorderedLists = useMemo(() => hasOnlyUnorderedLists(nodeChildren), [nodeChildren]);

  return (
    <section>
      <Body className={cx(labelStyle)}>{`See also: ${title}`}</Body>
      <div className={cx(!onlyUnorderedLists && indentedContainerStyle)}>
        {nodeChildren.map((child, i) => (
          <ComponentFactory key={i} nodeData={child} {...rest} />
        ))}
      </div>
    </section>
  );
};

export default SeeAlso;
