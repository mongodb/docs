'use client';

import React from 'react';
import { Badge, BadgeVariant } from '@via-ds/components/badge';
import { Link } from '@/mdx-components/Link';
import styles from './community-pill-link.module.scss';

export type CommunityPillLinkProps = {
  children: React.ReactNode;
  url?: string;
  variant?: BadgeVariant;
  text?: string;
};

export const CommunityPillLink = ({
  children,
  url,
  variant = BadgeVariant.Status,
  text = 'Community built',
}: CommunityPillLinkProps) => {
  return (
    <div className={styles.pillLink}>
      {!!url && !!children && <Link to={url}>{children}</Link>} <Badge variant={variant}>{text}</Badge>
    </div>
  );
};
