'use client';

import { useState, useRef, forwardRef } from 'react';
import clsx from 'clsx';
import { Link as LinkIcon } from '@via-ds/icons';
import { Tooltip, TooltipRoot, TooltipTrigger } from '@via-ds/components/tooltip';
import { Text, TextStyle } from '@via-ds/components/typography';
import { Size } from '@via-ds/components/types';
import { isBrowser } from '@/utils/is-browser';
import useCopyClipboard from '@/utils/hooks/use-copy-clipboard';
import useHashAnchor from '@/utils/hooks/use-hash-anchor';
import { usePageContext } from '@/context/page-context';
import { useMergedRef } from '@/mdx-utils/use-merged-ref';
import styles from './permalink.module.scss';

export type PermalinkProps = {
  id: string;
  description: string;
};

export const Permalink = forwardRef<HTMLDivElement, PermalinkProps>(({ id, description }, ref) => {
  const { options } = usePageContext();
  const url = isBrowser ? window.location.href.split('#')[0] + '#' + id : '';

  const [copied, setCopied] = useState(false);

  const headingRef = useRef<HTMLAnchorElement>(null);
  useCopyClipboard(copied, setCopied, headingRef.current, url);

  const linkRef = useRef<HTMLDivElement>(null);
  useHashAnchor(id, linkRef.current);

  const mergedRef = useMergedRef(linkRef, ref);

  const handleClick = () => {
    setCopied(true);
  };

  return (
    <TooltipRoot isOpen={copied}>
      {/* TooltipTrigger clones its child and overwrites any ref set directly
          on it, so the anchor ref ClipboardJS needs must be forwarded here
          instead — a ref on the <a> itself would silently never attach. */}
      <TooltipTrigger ref={headingRef}>
        <a
          className={clsx('headerlink', styles.heading, copied && styles.copied)}
          href={`#${id}`}
          title={'Permalink to this ' + description}
          onClick={handleClick}
        >
          <LinkIcon className={styles.icon} size={12} />
          <div
            className={options?.has_composable_tutorial ? styles.headerBufferComposable : styles.headerBuffer}
            ref={mergedRef}
            id={id}
          />
        </a>
      </TooltipTrigger>
      <Tooltip className={styles.tooltip}>
        <Text textStyle={TextStyle.body} size={Size.Large} elementType="span" className={styles.tooltipText}>
          copied
        </Text>
      </Tooltip>
    </TooltipRoot>
  );
});
Permalink.displayName = 'Permalink';
