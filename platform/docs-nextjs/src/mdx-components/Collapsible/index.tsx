'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@leafygreen-ui/box';
import { Icon } from '@leafygreen-ui/icon';
import { IconButton } from '@leafygreen-ui/icon-button';
import { cx } from '@leafygreen-ui/emotion';
import { Body } from '@leafygreen-ui/typography';
import { Heading } from '@/mdx-components/Heading';
import { useHash } from '@/hooks/use-hash';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import { collapsibleStyle, headerContainerStyle, headerStyle, iconStyle, innerContentStyle } from './styles';

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
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(expanded);

  useEffect(() => {
    /** the hash id (without the # prefix) */
    const hashId = hash?.slice(1);
    if (!hashId) return;
    if (headingRef.current?.id === hashId || contentRef.current?.querySelector(`#${CSS.escape(hashId)}`)) {
      setOpen(true);
    }
  }, [hash]);

  const onIconClick = () => {
    setOpen((prev) => !prev);

    reportAnalytics('Click', {
      position: 'body',
      position_context: `collapsible ${!open ? 'opened' : 'closed'}`,
      label: heading,
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
  };

  return (
    <Box as="details" open={open} className={cx('collapsible', collapsibleStyle)}>
      <Box as="summary" className={cx(headerContainerStyle)} onClick={(e) => e.preventDefault()}>
        <Box>
          <Heading ref={headingRef} className={cx(headerStyle)} headingLevel={headingLevel}>
            {heading}
          </Heading>
          <Body baseFontSize={13}>{subHeading}</Body>
        </Box>
        <IconButton className={iconStyle} aria-label="expand" onClick={onIconClick}>
          <Icon glyph={open ? 'ChevronDown' : 'ChevronRight'} />
        </IconButton>
      </Box>
      <Box ref={contentRef} className={cx(innerContentStyle)}>
        {children}
      </Box>
    </Box>
  );
};
