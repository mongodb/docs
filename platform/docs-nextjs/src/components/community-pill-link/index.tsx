'use client';

import { css, cx } from '@leafygreen-ui/emotion';
import Badge, { type Variant } from '@leafygreen-ui/badge';
import { getPlaintext } from '@/utils/get-plaintext';
import { theme } from '@/styles/theme';
import type { CommunityDriverPill } from '@/types/ast';
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
};

const CommunityPillLink = ({
  argument,
  options,
  variant = 'lightgray',
  text = 'community built',
}: CommunityPillLinkProps) => {
  return (
    <div className={cx(pillLinkStyle)}>
      {argument && options?.url && <Link to={options.url}>{getPlaintext(argument)}</Link>}
      <Badge variant={variant}>{text}</Badge>
    </div>
  );
};

export default CommunityPillLink;
