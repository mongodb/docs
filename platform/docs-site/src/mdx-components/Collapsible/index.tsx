'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Disclosure, DisclosureHeader, DisclosurePanel, DisclosureTrigger } from '@via-ds/components/disclosure';
import { Text } from '@via-ds/components/typography';
import { getHeadingTag, getHeadingTextStyle, useHeadingId } from '@/mdx-components/Heading';
import { Permalink } from '@/mdx-components/Permalink';
import { useHash } from '@/hooks/use-hash';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import { isOfflineBuild } from '@/utils/isOfflineBuild';
import styles from './collapsible.module.scss';

const OFFLINE_COLLAPSIBLE_CLASSNAME = 'offline-collapsible';

type CollapsibleProps = {
  children: React.ReactNode;
  heading: string;
  headingLevel?: number;
  subHeading: string;
  expanded?: boolean;
};

export const Collapsible = ({
  children,
  heading,
  headingLevel = 2,
  subHeading,
  expanded = false,
}: CollapsibleProps) => {
  const hash = useHash();
  const id = useHeadingId(heading);
  const contentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(expanded);

  useEffect(() => {
    /** the hash id (without the # prefix) */
    const hashId = hash?.slice(1);
    if (!hashId) return;
    if (hashId === id || contentRef.current?.querySelector(`#${CSS.escape(hashId)}`)) {
      setOpen(true);
    }
  }, [hash, id]);

  const onExpandedChange = (isExpanded: boolean) => {
    setOpen(isExpanded);

    reportAnalytics('Click', {
      position: 'body',
      position_context: `collapsible ${isExpanded ? 'opened' : 'closed'}`,
      label: heading,
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
  };

  return (
    <Disclosure
      isExpanded={open}
      onExpandedChange={onExpandedChange}
      className={clsx('collapsible', styles.collapsible, isOfflineBuild && OFFLINE_COLLAPSIBLE_CLASSNAME)}
    >
      <div className={styles.header}>
        <DisclosureHeader
          elementType={getHeadingTag(headingLevel)}
          textStyle={getHeadingTextStyle(headingLevel)}
          className={styles.heading}
        >
          <DisclosureTrigger>
            {heading}
            <Text slot="description">{subHeading}</Text>
          </DisclosureTrigger>
        </DisclosureHeader>
        <Permalink id={id} description="heading" />
      </div>
      <DisclosurePanel ref={contentRef}>{children}</DisclosurePanel>
    </Disclosure>
  );
};
