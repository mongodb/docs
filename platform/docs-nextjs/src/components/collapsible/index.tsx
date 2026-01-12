'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Box from '@leafygreen-ui/box';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { cx } from '@leafygreen-ui/emotion';
import { Body } from '@leafygreen-ui/typography';
import { HeadingContextProvider, useHeadingContext } from '@/context/heading-context';
import { useHash } from '@/hooks/use-hash';
import { isBrowser } from '@/utils/is-browser';
import { reportAnalytics } from '@/utils/report-analytics';
import ComponentFactory from '@/components/component-factory';
import Heading from '@/components/heading';
import type { ASTNode, CollapsibleOptions, TextNode } from '@/types/ast';
import { findAllNestedAttribute } from '@/utils/find-all-nested-attribute';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import { collapsibleStyle, headerContainerStyle, headerStyle, iconStyle, innerContentStyle } from './styles';

export interface CollapsibleProps {
  nodeChildren: ASTNode[];
  options?: CollapsibleOptions;
}

const Collapsible = ({ options = {}, nodeChildren, ...rest }: CollapsibleProps) => {
  // Get depth from context (automatically incremented by parent sections)
  const { sectionDepth } = useHeadingContext();
  const { id, heading, expanded, sub_heading: subHeading } = options;
  const hash = useHash();

  // get a list of all ids in collapsible content
  // in order to set collapsible open, if any are found in url hash
  const childrenHashIds = useMemo(() => {
    return findAllNestedAttribute(nodeChildren, 'id');
  }, [nodeChildren]);

  const [open, setOpen] = useState(() => {
    return expanded ?? true;
  });

  const headingNodeData: TextNode = {
    type: 'text',
    value: heading ?? '',
    position: { start: { line: 0 } },
  };

  const onIconClick = useCallback(() => {
    reportAnalytics('Click', {
      position: 'body',
      position_context: `collapsible ${open ? 'opened' : 'closed'}`,
      label: heading,
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
    setOpen(!open);
  }, [heading, open]);

  // open the collapsible if the hash in URL is equal to collapsible heading id,
  // or if the collapsible's children has the id
  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    const hashId = hash?.slice(1) ?? '';
    if (id === hashId || childrenHashIds.includes(hashId)) {
      return setOpen(true);
    }
  }, [childrenHashIds, hash, id]);

  const rendered = useRef(false);

  // on first open, scroll the child with the URL hash id into view
  useEffect(() => {
    if (!open) return;
    if (rendered.current) return;
    rendered.current = true;
    const hashId = hash?.slice(1) ?? '';
    if (childrenHashIds.includes(hashId)) {
      const child = document?.querySelector(`#${hashId}`);
      if (child) child.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
    }
  }, [childrenHashIds, hash, open]);

  return (
    <HeadingContextProvider ignoreNextHeading={true} heading={heading} sectionDepth={sectionDepth}>
      <Box aria-expanded={open} className={cx('collapsible', collapsibleStyle)}>
        <Box className={cx(headerContainerStyle)}>
          <Box>
            {/* Heading uses context depth, wrapped in provider to increment for the heading itself */}
            <HeadingContextProvider sectionDepth={sectionDepth + 1}>
              <Heading className={cx(headerStyle)} id={id ?? ''} nodeChildren={[headingNodeData]} />
            </HeadingContextProvider>
            <Body baseFontSize={13}>{subHeading}</Body>
          </Box>
          <IconButton
            className={iconStyle}
            aria-labelledby={'Expand the collapsed content'}
            aria-expanded={open}
            onClick={onIconClick}
          >
            <Icon glyph={open ? 'ChevronDown' : 'ChevronRight'} />
          </IconButton>
        </Box>
        <Box className={cx(innerContentStyle)}>
          {nodeChildren.map((c, i) => (
            <ComponentFactory nodeData={c} key={i} {...rest}></ComponentFactory>
          ))}
        </Box>
      </Box>
    </HeadingContextProvider>
  );
};
export default Collapsible;
