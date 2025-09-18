import MainColumn from './main-column';
import RightColumn from './right-column';
import documentStyling from './document.module.scss';
import { theme } from '@/styles/theme';

const MAX_ON_THIS_PAGE_WIDTH = '200px';
const MAX_CONTENT_WIDTH = '775px';
const MAX_CONTENT_WIDTH_LARGE_SCREEN = '884px';
// (max content width along with padding + max "On This Page" width along with padding)
export const DOCUMENT_TEMPLATE_MAX_WIDTH_VALUE = `(${MAX_CONTENT_WIDTH} + ${theme.size.xlarge} * 2) + (${MAX_ON_THIS_PAGE_WIDTH} + 5px + ${theme.size.medium})`;
export const DOCUMENT_TEMPLATE_MAX_WIDTH_VALUE_LARGE_SCREEN = `(${MAX_CONTENT_WIDTH_LARGE_SCREEN} + ${theme.size.xlarge} * 2) + (${MAX_ON_THIS_PAGE_WIDTH} + 5px + ${theme.size.medium})`;

export default function DocumentTemplate({ children }: { children?: React.ReactNode }) {
  return (
    <div className={documentStyling.document}>
      <MainColumn className={documentStyling['main-column']}>
        <div className="body">
          {/* TODO: breadcrumbs components */}
          {/* <Breadcrumbs siteTitle={title} slug={slug} /> */}
          {children}
          {/* TODO: prev next components */}
          {/* {showPrevNext && (
            <InternalPageNav slug={slug} slugTitleMapping={slugToBreadcrumbLabel ?? {}} toctreeOrder={toctreeOrder} />
          )} */}
        </div>
      </MainColumn>
      <RightColumn hasDismissibleSkillsCard={false}>
        <div>CONTENTS HERE</div>
      </RightColumn>
    </div>
  );
}
