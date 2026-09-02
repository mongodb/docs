'use client';

import { Tabs as LeafyTabs, Tab as LeafyTab } from '@leafygreen-ui/tabs';
import { Body } from '@leafygreen-ui/typography';
import { useRouter } from 'next/navigation';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import { isOfflineBuild } from '@/utils/isOfflineBuild';
import useScreenSize from '@/hooks/use-screen-size';
import Icon from '@leafygreen-ui/icon';
import { palette } from '@leafygreen-ui/palette';
import { navigateToDocsPath } from '@/utils/navigate-to-docs-path';

const NAV_TABS = [
  { label: 'Database', path: '/docs' },
  // { label: 'Agentic Platform', path: '/docs/agentic-platform' },
  { label: 'VoyageAI Models', path: '/docs/voyageai' },
] as const;

const containerStyling = css`
  display: flex;
  align-items: center;
  gap: ${theme.size.medium};
`;

const labelStyling = css`
  margin-left: 20px;
  padding-top: 5px;
`;

const productTabsStyling = css`
  flex-shrink: 0;
  align-self: flex-end;
  margin-bottom: 0;

  // Hide the empty tab panel area — tabs are navigation only
  > div:last-of-type {
    display: none;
  }

  // Remove the default bottom border on the tab list so it sits flush
  // with the action bar's own bottom border
  > div:first-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  button[role='tab'] {
    font-size: ${theme.fontSize.small};
    padding-bottom: ${theme.size.small};
  }
`;

const mobileListStyling = css`
  display: flex;
  margin-left: 15px;
  margin-top: 10px;
  flex-direction: column;
  padding: ${theme.size.small} 0;
`;

const mobileTitleStyling = css`
  margin-left: 5px;
`;

const mobileItemStyling = css`
  p {
    font-size: ${theme.fontSize.small};
  }
  display: flex;
  align-items: center;
  gap: ${theme.size.small};
  cursor: pointer;
  padding: 2px 0;
`;

const mobileDividerStyling = css`
  border: unset;
  border-bottom: 1px solid var(--sidenav-border-bottom-color);
  margin: 6px 5px;
  width: 90%;
`;

export const ProductTabs = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const { isTabletOrMobile } = useScreenSize();

  const activeIndex = (slug?.startsWith('docs/voyageai') || slug?.startsWith('/docs/voyageai')) ? 1 : 0;

  if (isOfflineBuild) return (
    <Body className={cx(mobileTitleStyling)}>Documentation</Body>
  );

  if (isTabletOrMobile) {
    return (
      <div className={cx(mobileListStyling)}>
        <Body className={cx(mobileTitleStyling)}>Documentation</Body>
        <hr className={cx(mobileDividerStyling)} />
        {NAV_TABS.map(({ label, path }, index) => {
          const isActive = index === activeIndex;
          return (
            <div key={label}>
              <div className={cx(mobileItemStyling)} onClick={() => navigateToDocsPath(router, path)}>
                {isActive ? (
                  <Icon glyph="Checkmark" color={palette.blue.base} />
                ) : (
                  <div style={{ width: 16 }} />
                )}
                <Body weight={isActive ? 'semiBold' : 'regular'}>
                  {label}
                </Body>
              </div>
              {index < NAV_TABS.length - 1 && <hr className={cx(mobileDividerStyling)} />}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cx(containerStyling)}>
      <Body className={cx(labelStyling)}>Documentation</Body>
      <LeafyTabs
        className={cx(productTabsStyling)}
        selected={activeIndex}
        setSelected={(index) => navigateToDocsPath(router, NAV_TABS[index].path)}
        aria-label="Product navigation"
      >
        {NAV_TABS.map(({ label }) => (
          <LeafyTab key={label} name={label} />
        ))}
      </LeafyTabs>
    </div>
  );
};
