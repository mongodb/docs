'use client';

import { css, cx } from '@leafygreen-ui/emotion';
import Badge, { type Variant } from '@leafygreen-ui/badge';
import { getPlaintext } from '@/utils/get-plaintext';
import { theme } from '@/styles/theme';
import type { ASTNode, CommunityDriverPill } from '@/types/ast';
import Link from '../link';

const pillLinkStyle = css`
  :last-of-type {
    margin-bottom: ${theme.size.default};
  }
`;

export type CommunityPillLinkProps = {
  argument?: CommunityDriverPill['argument'];
  options?: CommunityDriverPill['options'];
  variant?: Variant;
  text?: string;
  // MDX props
  url?: string;
  children?: React.ReactNode;
};

const CommunityPillLink = ({
  argument,
  options,
  variant = 'lightgray',
  text = 'community built',
  url,
  children,
}: CommunityPillLinkProps) => {
  const toUrl = url ?? options?.url;
  const textContent = children ?? (argument ? getPlaintext(argument) : null);

  return (
    <div className={cx(pillLinkStyle)}>
      {!!toUrl && !!textContent && <Link to={toUrl}>{textContent}</Link>}
      <Badge variant={variant}>{text}</Badge>
    </div>
  );
};

export default CommunityPillLink;
