'use client';

import { theme } from '@/styles/theme';
import type { RefRoleNode } from '@/types/ast';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import LinkComponent from '@/components/link';
import ComponentFactory from '@/components/component-factory';
import { isRelativeUrl } from '@/utils/is-relative-url';
import { useVersionContext } from '@/context/version-context';
import { scrollActiveSidenavIntoView } from '@/utils/scroll-active-sidenav-into-view';

const cardRefStyling = css`
  background: ${palette.gray.light3};
  border-radius: ${theme.size.tiny};
  border: 1px solid ${palette.gray.light1};
  box-sizing: border-box;
  display: inline-block;
  font-size: ${theme.fontSize.small} !important;
  font-weight: 600;
  margin-bottom: ${theme.size.tiny};
  margin-right: ${theme.size.tiny};
  padding: ${theme.size.tiny};

  &:after {
    content: ' ➔';
  }
`;

export type RefRoleProps = {
  nodeChildren: RefRoleNode['children'];
  fileid: RefRoleNode['fileid'];
  url: RefRoleNode['url'];
  cardRef?: boolean;
  showLinkArrow?: boolean;
};

const RefRole = ({ nodeChildren, fileid, url, cardRef = false, showLinkArrow = false }: RefRoleProps) => {
  const { siteBasePrefixWithVersion } = useVersionContext();
  // Render intersphinx target links
  const stylingClass = cardRef ? cardRefStyling : '';
  if (url) {
    return (
      <LinkComponent className={cx(stylingClass)} to={url} showLinkArrow={showLinkArrow}>
        {nodeChildren.map((node, i) => (
          <ComponentFactory key={i} nodeData={node} />
        ))}
      </LinkComponent>
    );
  }

  // Render internal target and page links
  let link = '';
  if (fileid) {
    let [filename] = fileid;
    const html_id = fileid[1];
    if (filename === 'index') filename = '/';

    if (html_id === '') {
      // :doc: link
      link = filename;
    } else {
      link = `${filename}/#${html_id}`;
    }
  }

  if (isRelativeUrl(link) && siteBasePrefixWithVersion) {
    link = `${siteBasePrefixWithVersion}/${link}`;
  }

  return (
    <LinkComponent
      className={cx(stylingClass)}
      to={link}
      showLinkArrow={showLinkArrow}
      onClick={() => {
        setTimeout(() => {
          scrollActiveSidenavIntoView();
        }, 1000); // TODO: DOP-6454: set this delay to 100 once loading with mdx
      }}
    >
      {nodeChildren.map((node, i) => (
        <ComponentFactory key={i} nodeData={node} />
      ))}
    </LinkComponent>
  );
};

export default RefRole;
