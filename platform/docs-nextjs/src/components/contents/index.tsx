'use client';

import { useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import { css, cx } from '@leafygreen-ui/emotion';
import { isEmpty } from 'lodash';
import { ContentsContext, type ActiveSelectorIds } from '@/context/contents-context';
import { formatText } from '@/utils/format-text';
import type { HeadingNodeSelectorIds } from '@/types/ast';
import ContentsList from './contents-list';
import ContentsListItem from './contents-list-item';
// TODO: DOP-5978 feedback rating component
// import { usePageContext } from '@/context/page-context';
// import FeedbackRating from '@/components/feedback-rating';
// import { DEPRECATED_PROJECTS } from '@/constants/projects';
// import { theme } from '@/styles/theme';

const formatTextOptions = {
  literalEnableInline: true,
};

// TODO: DOP-5978 feedback rating component
// const formContainer = css`
//   @media ${theme.screenSize.tablet} {
//     z-index: 1;
//   }
// `;

// const formStyle = css`
//   position: absolute;
//   right: 0;
//   margin-top: ${theme.size.tiny};

//   @media ${theme.screenSize.upToLarge} {
//     position: fixed;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     overflow-y: auto;
//   }
// `;

const styledContentList = css`
  overflow: auto;
  height: 80%;
`;

const isHeadingVisible = (
  headingSelectorIds: HeadingNodeSelectorIds,
  activeSelectorIds: ActiveSelectorIds,
  searchParams: URLSearchParams,
): boolean => {
  if (!headingSelectorIds || isEmpty(headingSelectorIds)) return true;
  const headingsMethodParent = headingSelectorIds['method-option'];
  const headingsTabParent = headingSelectorIds['tab'];
  const headingsComposableParent = headingSelectorIds['selected-content'] ?? {};
  const composableHeadingVisible = Object.keys(headingsComposableParent).reduce((res, key) => {
    if (!res) return res;
    const value = searchParams.get(key);
    return (value && value === headingsComposableParent[key]) || (!value && headingsComposableParent[key] === 'None');
  }, true);
  if (
    (headingsMethodParent && headingsMethodParent !== activeSelectorIds.methodSelector) ||
    (headingsTabParent && !activeSelectorIds.tab?.includes(headingsTabParent)) ||
    (headingsComposableParent && !composableHeadingVisible)
  ) {
    return false;
  }
  return isHeadingVisible(headingSelectorIds.children ?? {}, activeSelectorIds, searchParams);
};

const Contents = ({ className }: { className?: string; slug?: string }) => {
  const { activeHeadingId, headingNodes, showContentsComponent, activeSelectorIds } = useContext(ContentsContext);
  // TODO: DOP-6242: replacement for useSnootyMetadata
  // const metadata = useSnootyMetadata();
  const searchDict: URLSearchParams = useSearchParams() ?? new URLSearchParams();
  // const { options } = usePageContext();

  const filteredNodes = headingNodes.filter((headingNode) => {
    return isHeadingVisible(headingNode.selector_ids, activeSelectorIds, searchDict);
  });

  if (filteredNodes.length === 0 || !showContentsComponent) {
    // TODO: DOP-5978 feedback rating component
    return <div className={className}>{/* <FeedbackRating slug={slug} className={formStyle} /> */}</div>;
  }

  const label = 'On this page';
  // const shouldProjShowFW = !DEPRECATED_PROJECTS.includes(metadata.project);
  // const hideFWOnMobile = options?.hidefeedback === 'header';

  return (
    <>
      {/* {!isTabletOrMobile && shouldProjShowFW && (
        <FeedbackRating slug={slug} className={formStyle} classNameContainer={formContainer} />
      )} */}
      <div className={cx(className, styledContentList)}>
        <ContentsList label={label}>
          {filteredNodes.map(({ depth, id, title }) => {
            // Depth of heading nodes refers to their depth in the AST
            const listItemDepth = Math.max(depth - 2, 0);
            return (
              <ContentsListItem depth={listItemDepth} key={id} id={id} isActive={activeHeadingId === id}>
                {formatText(title, formatTextOptions)}
              </ContentsListItem>
            );
          })}
        </ContentsList>
      </div>
      {/* {isTabletOrMobile && shouldProjShowFW && !hideFWOnMobile && (
        <FeedbackRating slug={slug} className={formStyle} classNameContainer={formContainer} />
      )} */}
    </>
  );
};

export default Contents;
