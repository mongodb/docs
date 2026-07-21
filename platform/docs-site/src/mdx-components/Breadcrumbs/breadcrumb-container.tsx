'use client';

import { useState, useMemo, useEffect, Fragment } from 'react';
import styled from '@emotion/styled';
import { reportAnalytics } from '@/utils/report-analytics';
import { theme } from '@/styles/theme';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import IndividualBreadcrumb from './individual-breadcrumb';
import CollapsedBreadcrumbs from './collapsed-breadcrumbs';
import { assertTrailingSlash } from '@/utils/assert-trailing-slash';

const StyledSlash = styled('span')`
  cursor: default;
  padding-left: ${theme.size.small};
  padding-right: ${theme.size.small};
`;

const Flexbox = styled('div')`
  display: flex;
  align-items: center;
`;

const MobileBreadcrumbs = styled(Flexbox)`
  @media ${theme.screenSize.upToSmall} {
    display: flex;
  }

  @media ${theme.screenSize.smallAndUp} {
    display: none;
  }
`;

const TabletBreadcrumbs = styled(Flexbox)`
  @media ${theme.screenSize.upToSmall} {
    display: none;
  }

  @media ${theme.screenSize.smallAndUp} {
    display: flex;
  }

  @media ${theme.screenSize.largeAndUp} {
    display: none;
  }
`;

const DesktopBreadcrumbs = styled(Flexbox)`
  @media ${theme.screenSize.upToLarge} {
    display: none;
  }

  @media ${theme.screenSize.largeAndUp} {
    display: flex;
  }
`;

// Collapses middle breadcrumbs into a  ellipsis
const createCollapsedBreadcrumbs = (
  breadcrumbs: Array<BreadcrumbType>,
  maxVisible: number,
): (BreadcrumbType | BreadcrumbType[])[] => {
  // Too few breadcrumbs, no need to collapse
  if (breadcrumbs.length <= maxVisible) {
    return breadcrumbs;
  }

  // Extract middle crumbs to collapse
  const collapsedCrumbs = Array.from(breadcrumbs).splice(1, breadcrumbs.length - maxVisible + 1);
  // Replace middle section with collapsed array that displays as an ellipsis
  const processedCrumbs: (BreadcrumbType | BreadcrumbType[])[] = Array.from(breadcrumbs);
  processedCrumbs.splice(1, breadcrumbs.length - maxVisible + 1, collapsedCrumbs);
  return processedCrumbs;
};

const initialMaxCrumbs = (breadcrumbs: Array<BreadcrumbType>) => breadcrumbs.length + 1;

export type BreadcrumbType = {
  title: string;
  path: string;
};

const BreadcrumbContainer = ({ breadcrumbs }: { breadcrumbs: Array<BreadcrumbType> }) => {
  const [maxCrumbs, setMaxCrumbs] = useState(initialMaxCrumbs(breadcrumbs));

  // Create different breadcrumb versions for different screen sizes
  const mobileBreadcrumbs = useMemo(() => createCollapsedBreadcrumbs(breadcrumbs, 3), [breadcrumbs]);
  const tabletBreadcrumbs = useMemo(() => createCollapsedBreadcrumbs(breadcrumbs, 4), [breadcrumbs]);

  // Render breadcrumbs for tablet and mobile screen
  const renderBreadcrumbs = (processedBreadcrumbs: (BreadcrumbType | BreadcrumbType[])[]) => {
    return processedBreadcrumbs.map((crumb, index) => {
      const isFirst = index === 0;
      return (
        <Fragment key={`${index}-${Array.isArray(crumb) ? 'collapsed' : crumb.title}`}>
          {!isFirst && <StyledSlash> / </StyledSlash>}
          {Array.isArray(crumb) ? (
            <CollapsedBreadcrumbs crumbs={crumb} />
          ) : (
            <IndividualBreadcrumb
              crumb={crumb}
              onClick={() =>
                reportAnalytics('Click', {
                  position: 'body',
                  position_context: 'breadcrumb',
                  label: assertTrailingSlash(crumb.path),
                  scroll_position: currentScrollPosition(),
                  tagbook: 'true',
                })
              }
            />
          )}
        </Fragment>
      );
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setMaxCrumbs(initialMaxCrumbs(breadcrumbs));
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [breadcrumbs]);

  // For desktop breadcrumbs
  const processedBreadcrumbs: (BreadcrumbType | BreadcrumbType[])[] = useMemo(() => {
    if (breadcrumbs.length >= maxCrumbs && breadcrumbs.length > 2) {
      // A maximum of maxCrumbs breadcrumbs may be shown, so we collapse the first run of internal
      // crumbs into a single "…" crumb
      const collapsedCrumbs = Array.from(breadcrumbs).splice(1, breadcrumbs.length - maxCrumbs + 1);
      const processedCrumbs: (BreadcrumbType | BreadcrumbType[])[] = Array.from(breadcrumbs);
      processedCrumbs.splice(1, breadcrumbs.length - maxCrumbs + 1, collapsedCrumbs);
      return processedCrumbs;
    } else {
      return breadcrumbs;
    }
  }, [maxCrumbs, breadcrumbs]);

  return (
    <>
      <MobileBreadcrumbs>{renderBreadcrumbs(mobileBreadcrumbs)}</MobileBreadcrumbs>

      <TabletBreadcrumbs>{renderBreadcrumbs(tabletBreadcrumbs)}</TabletBreadcrumbs>

      <DesktopBreadcrumbs>
        <Flexbox>
          {processedBreadcrumbs.map((crumb, index) => {
            const isFirst = index === 0;
            return (
              <Fragment key={index}>
                {!isFirst && <StyledSlash> / </StyledSlash>}
                {Array.isArray(crumb) ? (
                  <CollapsedBreadcrumbs crumbs={crumb}></CollapsedBreadcrumbs>
                ) : (
                  <IndividualBreadcrumb
                    key={crumb.title}
                    crumb={crumb}
                    onClick={() =>
                      reportAnalytics('Click', {
                        position: 'body',
                        position_context: 'breadcrumb',
                        label: assertTrailingSlash(crumb.path),
                        scroll_position: currentScrollPosition(),
                        tagbook: 'true',
                      })
                    }
                  ></IndividualBreadcrumb>
                )}
              </Fragment>
            );
          })}
        </Flexbox>
      </DesktopBreadcrumbs>
    </>
  );
};

export default BreadcrumbContainer;
