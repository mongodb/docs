'use client';

import { useContext } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import type { ComposableNode } from '@/types/ast';
import { theme } from '@/styles/theme';
import { showComposable } from '@/mdx-components/ComposableTutorial';
import ComposableContext from '@/mdx-components/ComposableTutorial/composable-context';

const containerStyle = css`
  > *:first-child:not(script):not(style) {
    margin-top: ${theme.size.medium};
  }
`;

export interface ComposableContentProps {
  selections?: ComposableNode['selections'];
  children: React.ReactNode;
}

const ComposableContent = ({ children, selections = {} }: ComposableContentProps) => {
  const { currentSelections } = useContext(ComposableContext);

  if (showComposable([selections], currentSelections)) {
    return <div className={cx('composable-content', containerStyle)}>{children}</div>;
  }
  return null;
};

export default ComposableContent;
