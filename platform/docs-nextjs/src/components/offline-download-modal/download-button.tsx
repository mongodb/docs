'use client';

import Button, { Size } from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { reportAnalytics } from '../../utils/report-analytics';
import { displayNone } from '../../utils/display-none';
import { currentScrollPosition } from '../../utils/current-scroll-position';
import { useOfflineDownloadContext } from './download-context';

const downloadIconStyling = css`
  width: 32px;
  height: 22px;

  .dark-theme & {
    color: var(--white);
    background-color: var(--gray-dark2);
  }

  ${displayNone.onMobileAndTablet};
`;

const DownloadButton = () => {
  const { setModalOpen } = useOfflineDownloadContext();

  const openDownloadModal = () => {
    reportAnalytics('Click', {
      position: 'SideNav',
      label: 'Offline docs download button',
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
    setModalOpen(true);
  };

  return (
    <Button
      size={Size.Small}
      className={downloadIconStyling}
      aria-label="Download Offline Docs"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        // required to prevent being used within links
        e.stopPropagation();
        openDownloadModal();
      }}
    >
      <Icon size={14} glyph={'Download'} />
    </Button>
  );
};

export default DownloadButton;
