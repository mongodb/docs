import type { ReactNode } from 'react';
import { useState } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
// import Box from '@leafygreen-ui/box';
import Icon from '@leafygreen-ui/icon';

import { theme } from '@/styles/theme';
import { displayNone } from '@/utils/display-none';
// import { isOfflineDocsBuild } from '@/utils/is-offline-docs-build';

const hideOnMobile = css`
  ${displayNone.onMobileAndTablet};
`;

const hideOnDesktop = css`
  ${displayNone.onLargerThanTablet}
`;

const collapsibleStyles = css`
  border-top: 1px solid ${palette.gray.light2};
  border-bottom: 1px solid ${palette.gray.light2};
  padding: 5px 0;
  margin-bottom: 24px;
`;

const headerStyles = css`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 32px;
`;

const labelStyles = css`
  font-size: ${theme.fontSize.small};

  --label-color: ${palette.gray.dark2};
  .dark-theme & {
    --label-color: ${palette.gray.light1};
  }
`;

const iconStyles = css`
  margin-left: -4px;

  color: ${palette.gray.dark1};

  .dark-theme & {
    color: ${palette.gray.light2};
  }
`;

const mobileLabelStyles = css`
  font-weight: 400;
  margin: 0;
  width: ${palette.gray.dark2};
`;

const desktopLabelStyles = css`
  line-height: ${theme.fontSize.default};
  font-weight: bolder;
  letter-spacing: 0;
  /* TODO: Remove !important when mongodb-docs.css is removed */
  margin: 0 0 12px !important;
`;

const listContainerStyles = css`
  overflow: hidden;
  height: 0;
  color: --font-color-primary;

  [aria-expanded='true'] & {
    height: auto;
  }
`;

const listStyles = css`
  list-style-type: none;
  padding: 0;
`;

const mobileListStyles = css`
  margin: 0;
  --label-color: ${palette.gray.dark2};
  .dark-theme & {
    --label-color: ${palette.gray.light1};
  }

  > li {
    margin: 6px 0 6px 13px;
  }
`;

const ContentsList = ({ children, label }: { children: ReactNode; label: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {/* Mobile (except in Offline Mode) */}
      <div aria-expanded={open} className={cx(collapsibleStyles, hideOnDesktop)}>
        <div className={cx(headerStyles)} onClick={() => setOpen(!open)}>
          <Icon className={cx(iconStyles)} glyph={open ? 'CaretDown' : 'CaretRight'} />
          <p className={cx(labelStyles, mobileLabelStyles)}>{label}</p>
        </div>
        <div className={cx(listContainerStyles)}>
          <ul className={cx(listStyles, mobileListStyles)}>{children}</ul>
        </div>
      </div>
      {/* Desktop */}
      <div className={cx(hideOnMobile)}>
        <p className={cx(labelStyles, desktopLabelStyles)}>{label}</p>
        <ul className={cx(listStyles)}>{children}</ul>
      </div>
    </>
  );
};

export default ContentsList;
