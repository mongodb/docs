'use client';

import { theme } from '@/styles/theme';
import type { DefinitionListItemNode, InlineTargetNode } from '@/types/ast';
import { findKeyValuePair } from '@/utils/find-key-value-pair';
import styled from '@emotion/styled';
import { css } from '@leafygreen-ui/emotion';
import ComponentFactory from '@/components/component-factory';

const HeaderBuffer = styled.div`
  display: inline;
  margin-top: -${theme.header.navbarScrollOffset};
  position: absolute;
  // Add a bit of padding to help headings be more accurately set as "active" on FF and Safari
  padding-bottom: 2px;
`;

export type DefinitionListItemProps = {
  nodeChildren: DefinitionListItemNode['children'];
  term: DefinitionListItemNode['term'];
};

const DefinitionListItem = ({ nodeChildren, term, ...rest }: DefinitionListItemProps) => {
  const targetIdentifier = findKeyValuePair(term, 'type', 'inline_target') as InlineTargetNode | undefined;

  return (
    <>
      {targetIdentifier && <HeaderBuffer id={targetIdentifier.html_id} />}
      <dt>
        {term.map((child, index) => (
          <ComponentFactory nodeData={child} key={`dt-${index}`} />
        ))}
      </dt>
      <dd
        className={css`
          p:first-of-type {
            margin-top: 0 !important;
          }
        `}
      >
        {nodeChildren.map((child, index) => (
          <ComponentFactory {...rest} nodeData={child} key={`dd-${index}`} skipPTag={nodeChildren.length === 1} />
        ))}
      </dd>
    </>
  );
};

export default DefinitionListItem;
