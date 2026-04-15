'use client';

import { useContext } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import type { ComposableNode } from '@/types/ast';
import { theme } from '@/styles/theme';
import { showComposable } from '@/mdx-components/ComposableTutorial';
import ComposableContext from '@/mdx-components/ComposableTutorial/composable-context';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

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

  // In offline builds, always render all content variants so they exist in the static HTML.
  // composable-tutorial.js then manages show/hide via the hidden attribute.
  if (showComposable([selections], currentSelections) || isOfflineBuild) {
    return (
      <div
        className={cx('composable-content', containerStyle)}
        data-selections={isOfflineBuild ? JSON.stringify(selections) : undefined}
      >
        {children}
      </div>
    );
  }
  return null;
};

export default ComposableContent;
