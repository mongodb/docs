'use client';

import { Icon } from '@via-ds/icons';
import { Link } from '@/mdx-components/Link';
import type { RelatedLink } from '@/services/eai/related-links';
import styles from './not-found-ai.module.scss';

export const RelatedLinksList = ({ results }: { results: RelatedLink[] }) => (
  <div className={styles.box}>
    <div className={styles.header}>
      <Icon glyph="Sparkle" />
      <span className={styles.headerText}>The MongoDB Assistant suggests the following pages instead:</span>
    </div>
    <ul className={styles.linkList}>
      {results.map((result) => (
        <li key={result.url}>
          <span className={styles.linkTitle}>{result.title}</span>
          <div>
            <Link to={result.url} isStandalone={false}>
              {result.url}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
