'use client';

import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import { css as LeafyCss, cx } from '@leafygreen-ui/emotion';
import Tooltip from '@leafygreen-ui/tooltip';
import { Link } from '@/mdx-components/Link';
import { formatText } from '@/utils/format-text';
import { theme } from '@/styles/theme';
import type { BreadcrumbType } from './breadcrumb-container';

const linkStyling = LeafyCss`
  font-size: ${theme.fontSize.small};
  vertical-align: middle;
  line-height: unset;
  // Important to overwrite GatsbyLink dark-theme font-weight
  font-weight: 400;

  :hover,
  :focus {
    text-decoration: underline;
  }
`;

const ellipsisStyling = LeafyCss`
  text-overflow: ellipsis;
`;

const linkWrapperLayoutStyling = LeafyCss`
  overflow: hidden;
  white-space: nowrap;

  :first-child {
    min-width: max-content;
  }

  @media ${theme.screenSize.smallAndUp} {
    :last-child {
      min-width: max-content;
    }
  }
`;

// Recheck truncation on window resize and whenever the element's box changes,
// so layout shifts after the initial measurement don't leave a stale value.
function subscribeToSizeChanges(node: HTMLDivElement | null, callback: () => void) {
  window.addEventListener('resize', callback);

  let observer: ResizeObserver | undefined;
  if (node && typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(callback);
    observer.observe(node);
  }

  return () => {
    window.removeEventListener('resize', callback);
    observer?.disconnect();
  };
}

// For server-side generation, assume no truncation
function getServerSnapshot() {
  return JSON.stringify({
    isTruncated: false,
    isExcessivelyTruncated: false,
  });
}

const TRUNCATION_THRESHOLD = 125; // px

const useIsTruncated = (node: HTMLDivElement | null) => {
  const subscribe = useMemo(() => (callback: () => void) => subscribeToSizeChanges(node, callback), [node]);

  const isTruncated = useSyncExternalStore(
    subscribe,
    () => {
      const isTruncated = (node?.scrollWidth ?? 0) > (node?.clientWidth ?? 0);
      const isExcessivelyTruncated = node ? isTruncated && node?.clientWidth <= TRUNCATION_THRESHOLD : false;

      // useSyncExternalStore requires types with value comparison semantics
      return JSON.stringify({ isTruncated, isExcessivelyTruncated });
    },
    getServerSnapshot,
  );

  return JSON.parse(isTruncated);
};

type IndividualBreadcrumbProps = {
  crumb: BreadcrumbType;
  onClick: () => void;
};

const IndividualBreadcrumb = ({ crumb, onClick }: IndividualBreadcrumbProps) => {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setNode(node);
    }
  }, []);

  const { isTruncated } = useIsTruncated(node);

  const result = (
    <div className={cx(linkWrapperLayoutStyling, crumb.title.length > 21 ? ellipsisStyling : '')} ref={measuredRef}>
      <Link className={cx(linkStyling)} to={crumb.path} onClick={onClick} hideExternalIcon={true}>
        {formatText(crumb.title)}
      </Link>
    </div>
  );

  return isTruncated ? (
    <Tooltip
      // To get the tooltip above the topnav we have to pop up the z-index
      popoverZIndex={9001}
      baseFontSize={13}
      triggerEvent="hover"
      align="top"
      justify="middle"
      trigger={result}
    >
      {formatText(crumb.title)}
    </Tooltip>
  ) : (
    <div className={cx(linkWrapperLayoutStyling, crumb.title.length > 21 ? ellipsisStyling : '')} ref={measuredRef}>
      <Link className={cx(linkStyling)} to={crumb.path} onClick={onClick} hideExternalIcon={true}>
        {formatText(crumb.title)}
      </Link>
    </div>
  );
};

export default IndividualBreadcrumb;
