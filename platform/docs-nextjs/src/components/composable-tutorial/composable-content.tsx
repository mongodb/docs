'use client';

import { useContext } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import type { ComposableNode } from '@/types/ast';
import ComponentFactory from '@/components/component-factory';
import { theme } from '@/styles/theme';
import { showComposable } from '@/components/composable-tutorial';
import ComposableContext from './composable-context';

export interface ComposableContentProps {
  nodeChildren: ComposableNode['children'];
  selections: ComposableNode['selections'];
}

const containerStyle = css`
  > *:first-child:not(script):not(style) {
    margin-top: ${theme.size.medium};
  }
`;

const ComposableContent = ({ nodeChildren, selections, ...rest }: ComposableContentProps) => {
  const { currentSelections } = useContext(ComposableContext);
  if (showComposable([selections], currentSelections)) {
    return (
      <div className={cx(containerStyle)}>
        {nodeChildren.map((c, i) => (
          <ComponentFactory nodeData={c} key={i} {...rest} />
        ))}
      </div>
    );
  }
  return null;
};

export default ComposableContent;
