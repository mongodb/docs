"use client";

// TODO: This file is a placeholder for the right column component.
// It should be replaced with the actual implementation when available.
import { ReactNode } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import Link from '@/components/link';


const RightColumn = ({
  hasDismissibleSkillsCard,
  children,
}: {
  hasDismissibleSkillsCard: boolean;
  children: ReactNode;
}): React.JSX.Element => {

  return (
    <div
      className={cx(css`
        margin: 70px ${theme.size.medium} 40px 5px;
        min-width: ${hasDismissibleSkillsCard ? '250px' : '180px'};
        max-width: 250px;
        z-index: ${theme.zIndexes.content + 2};
        `)}
    // TODO: for right column component
    >
      <div className={cx(css``)}
      >
        <Link to="/docs/atlas/getting-started">This is a link</Link>
        <br />
        <Link to="https://google.com">This is a external link</Link>

        {children}
      </div>
    </div>
  )
};

export default RightColumn;
