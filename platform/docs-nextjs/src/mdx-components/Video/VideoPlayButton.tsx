'use client';

import styled from '@emotion/styled';
import { palette } from '@leafygreen-ui/palette';
import LeafyButton from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon, { glyphs } from '@leafygreen-ui/icon';

const StyledButton = styled(LeafyButton)`
  color: ${palette.white};
  background-color: #0c1c27;
  border: 1px solid ${palette.gray.light3};
  border-radius: 50% !important;
  height: 80px;
  width: 80px;
  &:hover,
  &:active {
    border: none !important;
    box-shadow: none !important;
    color: ${palette.gray.dark2};
  }
`;

// Handles concentric circles on hover
const playButtonBorderStyling = css`
  border: 8px solid transparent;
  border-radius: 50% !important;
  box-shadow: 0px 0px 0px 8px transparent;
  :hover {
    background-color: ${palette.gray.light1 + 'AA'};
    box-shadow: 0px 0px 0px 8px ${palette.gray.dark2 + '80'};
    transition: box-shadow 0.6s, background-color 0.6s;
  }
`;

const VideoPlayButton = () => {
  return (
    <div className={playButtonBorderStyling}>
      <StyledButton>
        <Icon size="xlarge" glyph={glyphs.Play.displayName ?? 'Play'} />
      </StyledButton>
    </div>
  );
};

export default VideoPlayButton;
