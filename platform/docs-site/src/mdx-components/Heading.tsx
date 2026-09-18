'use client';

import { useContext, useRef, forwardRef } from 'react';
import { onlyText } from 'react-children-utilities';
import clsx from 'clsx';
import { Text, TextStyle } from '@via-ds/components/typography';
import { Button } from '@via-ds/components/button';
import CodeIcon from '@via-ds/icons/Code';
import { ContentsContext, extractPlainText } from '@/context/contents-context';
import { ComposableSelectionsContext } from '@/mdx-components/ComposableTutorial/composable-context';
import { TabContext } from '@/context/tabs-context';
import useScreenSize from '@/hooks/use-screen-size';
import { usePageContext } from '@/context/page-context';
import { ConditionalWrapper } from '@/mdx-components/ConditionalWrapper';
import { useInstruqt } from '@/context/instruqt-context';
import { Permalink } from '@/mdx-components/Permalink';
import { Contents } from '@/mdx-components/Contents';
import { CopyPageMarkdownButton } from '@/mdx-components/CopyPageMarkdownButton';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import { reportAnalytics } from '@/utils/report-analytics';
import { TabsSelector } from '@/mdx-components/TabsSelector';
import styles from './heading.module.scss';

type ViaHeadingStyle =
  | typeof TextStyle.heading2
  | typeof TextStyle.heading3
  | typeof TextStyle.heading4
  | typeof TextStyle.heading5;

const getHeadingTextStyle = (headingLevel: number): ViaHeadingStyle => {
  switch (headingLevel) {
    case 1:
      return TextStyle.heading2;
    case 2:
      return TextStyle.heading3;
    case 3:
      return TextStyle.heading4;
    default:
      return TextStyle.heading5;
  }
};

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const getHeadingTag = (n: number) => {
  if (n >= 1 && n <= 6) return `h${n}` as HeadingTag;
  return 'h6';
};

export type HeadingProps = {
  children: React.ReactNode;
  headingLevel?: number;
  slug?: string;
  className?: string;
};

export const Heading = forwardRef<HTMLDivElement, HeadingProps>(
  ({ children, headingLevel = 1, slug = '', className }, ref) => {
    const templatesWithNoMarkdown = [
      'blank',
      'drivers-index',
      'errorpage',
      'feature-not-avail',
      'instruqt',
      'landing',
      'openapi',
      'changelog',
      'product-landing',
      'search',
    ];

    const { slugger, headingNodes } = useContext(ContentsContext);
    const composableSelections = useContext(ComposableSelectionsContext);

    // When inside a composable variant, the shared slugger counter diverges
    // from the TOC because non-selected variants don't mount. Look up the
    // pre-computed stable ID from the heading metadata instead.
    const headingText = onlyText(children);
    const composableId =
      composableSelections !== null
        ? headingNodes.find((node) => {
            const nodeSelections = node.selector_ids?.['selected-content'];
            return (
              nodeSelections &&
              Object.keys(nodeSelections).length > 0 &&
              extractPlainText(node.title) === headingText &&
              Object.keys(nodeSelections).every((k) => nodeSelections[k] === composableSelections[k])
            );
          })?.id ?? null
        : null;

    const id = useRef(composableId ?? slugger.slug(headingText));

    const asHeading = getHeadingTag(headingLevel);
    const isPageTitle = headingLevel === 1;

    const { isTabletOrMobile } = useScreenSize();
    const { selectors } = useContext(TabContext);
    const hasSelectors = selectors && Object.keys(selectors).length > 0;

    const { hasDrawer, isOpen, setIsOpen } = useInstruqt();
    const shouldShowLabButton = isPageTitle && hasDrawer;

    const { options, template, tabsMainColumn } = usePageContext();
    const hasMethodSelector = options?.['has_method_selector'];

    const shouldShowMobileHeader = !!(isPageTitle && isTabletOrMobile && hasSelectors && !hasMethodSelector);
    const showRating = !(template === 'product-landing');
    const showCopyMarkdown = !templatesWithNoMarkdown.includes(template ?? '') && isPageTitle;

    const OpenInteractiveTutorialLabel = 'Open Interactive Tutorial';

    const interactiveOnClick = () => {
      reportAnalytics('Click', {
        position: 'body',
        label: OpenInteractiveTutorialLabel,
        scroll_position: currentScrollPosition(),
        tagbook: 'true',
      });
      setIsOpen(true);
    };

    const headingClassName = clsx(
      'contains-headerlink',
      !shouldShowLabButton && styles.sectionMargin,
      isPageTitle && !hasDrawer && styles.titleMargin,
      className,
    );

    return (
      <>
        <ConditionalWrapper
          condition={shouldShowMobileHeader}
          wrapper={(children) => (
            <div className={styles.headingContainer}>
              {children}
              <div className={styles.childContainer}>{hasSelectors && !tabsMainColumn && <TabsSelector />}</div>
            </div>
          )}
        >
          {/* Wrapper for Instruqt drawer button */}
          <ConditionalWrapper
            condition={shouldShowLabButton}
            wrapper={(children) => (
              <div className={styles.labWrapper}>
                {children}
                <Button className={styles.labButton} isDisabled={isOpen} onPress={interactiveOnClick}>
                  <CodeIcon slot="icon" />
                  {OpenInteractiveTutorialLabel}
                </Button>
              </div>
            )}
          >
            <ConditionalWrapper
              condition={showCopyMarkdown}
              wrapper={(children) => (
                <div className={styles.copyMarkdownRow}>
                  {children}
                  {/* using showRating since it has similar logic for showing the copy markdown button only for non-landing pages */}
                  <CopyPageMarkdownButton slug={slug} className={styles.copyMarkdownButton} />
                </div>
              )}
            >
              <Text
                textStyle={getHeadingTextStyle(headingLevel)}
                elementType={asHeading}
                className={headingClassName}
              >
                {children}
                <Permalink ref={ref} id={id.current} description="heading" />
              </Text>
            </ConditionalWrapper>
          </ConditionalWrapper>
        </ConditionalWrapper>
        {isPageTitle && isTabletOrMobile && showRating && <Contents className={styles.contents} />}
      </>
    );
  },
);
Heading.displayName = 'Heading';
