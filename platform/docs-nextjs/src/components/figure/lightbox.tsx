'use client';

import Image from '@/components/image';
import styled from '@emotion/styled';
import Modal, { type ModalProps, ModalSize } from '@leafygreen-ui/modal';
import { palette } from '@leafygreen-ui/palette';
import { useState, useCallback, type ComponentType } from 'react';
import { theme } from '@/styles/theme';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import { reportAnalytics } from '@/utils/report-analytics';

import CaptionLegend from './caption-legend';
import type { FigureProps } from '.';

const CAPTION_TEXT = 'click to enlarge';

const MODAL_PADDING = '64px';
const MODAL_DIALOG_PADDING = '40px';

const StyledModal = styled(Modal as ComponentType<ModalProps>)`
  // Set z-index to appear above side nav and top navbar
  z-index: 10;

  div[role='dialog'] {
    width: 80%;
    max-width: 80%;
    max-height: calc(100vh - ${theme.header.navbarHeight} - ${MODAL_DIALOG_PADDING});
    transition: none;
  }

  img {
    max-height: calc(
      100vh - ${theme.header.navbarHeight} - ${MODAL_DIALOG_PADDING} - ${MODAL_PADDING} - ${MODAL_PADDING} -
        ${MODAL_DIALOG_PADDING}
    );
    width: auto;
  }

  @media ${theme.screenSize.largeAndUp} {
  }

  @media ${theme.screenSize.upToLarge} {
    div[role='dialog'] {
      max-width: 100%;
    }
    img {
      max-height: 300px;
    }
  }
`;

const LightboxCaption = styled('div')`
  color: #444;
  font-size: 80%;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  text-align: center;

  .dark-theme & {
    color: ${palette.gray.light2};
  }
`;

const LightboxWrapper = styled('div')<{ figwidth: string }>`
  width: ${({ figwidth }) => figwidth};
  cursor: pointer;
  margin-top: ${theme.size.medium};
  margin-bottom: ${theme.size.medium};
  display: block;
  max-width: 100%;
`;

const Lightbox = ({ argument, name, nodeChildren, options, ...rest }: FigureProps) => {
  const [open, setOpen] = useState(false);
  const figureWidth = options?.figwidth || 'auto';
  const openModal = useCallback(() => {
    reportAnalytics('Click', {
      position: 'body',
      position_context: 'image enlarged',
      label: name,
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
    setOpen((prevOpen) => !prevOpen);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <LightboxWrapper figwidth={figureWidth}>
        <div onClick={openModal} role="button" tabIndex={-1}>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is handled via options.alt */}
          <Image argument={argument} options={options} {...rest} />
          <LightboxCaption>{CAPTION_TEXT}</LightboxCaption>
        </div>
        <CaptionLegend {...rest} nodeChildren={nodeChildren} />
      </LightboxWrapper>
      <StyledModal size={ModalSize.Large} open={open} setOpen={setOpen}>
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is handled via options.alt */}
        <Image argument={argument} options={options} />
      </StyledModal>
    </>
  );
};

export default Lightbox;
