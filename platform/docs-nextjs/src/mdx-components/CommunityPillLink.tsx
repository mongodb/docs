'use client';

import { css, cx } from '@leafygreen-ui/emotion';
import Badge, { type Variant } from '@leafygreen-ui/badge';
import { theme } from '@/styles/theme';
import Link from '@/components/link';

const pillLinkStyle = css`
  :last-of-type {
    margin-bottom: ${theme.size.default};
  }
`;

export type CommunityPillLinkProps = {
  children: React.ReactNode;
  url?: string;
  variant?: Variant;
  text?: string;
};

export const CommunityPillLink = ({
  children,
  url,
  variant = 'lightgray',
  text = 'community built',
}: CommunityPillLinkProps) => {
  return (
    <div className={cx(pillLinkStyle)}>
      {!!url && !!children && <Link to={url}>{children}</Link>}
      <Badge variant={variant}>{text}</Badge>
    </div>
  );
};
