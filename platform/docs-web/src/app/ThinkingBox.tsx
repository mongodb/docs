'use client';

import { css, keyframes } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { Icon } from '@leafygreen-ui/icon';

const boxStyle = (darkMode: boolean) => css`
  border: 1px solid ${darkMode ? palette.gray.dark2 : palette.gray.light1};
  border-radius: 12px;
  padding: 16px;
  margin-top: 24px;
`;

const headerStyle = css`
  align-items: flex-start;
  color: ${palette.green.dark1};
  display: flex;
  gap: 8px;
`;

const headerTextStyle = css`
  color: inherit;
  font-size: 13px;
  font-weight: 500;
`;

const dotsStyle = css`
  align-items: center;
  display: inline-flex;
  gap: 1px;
  margin-left: 2px;
`;

const dotShimmer = keyframes`
  0%,
  100% {
    background-position: 300% 0;
    opacity: 0.35;
  }
  50% {
    background-position: 0% 0;
    opacity: 1;
  }
`;

const dotStyle = css`
  background: linear-gradient(
    90deg,
    ${palette.green.dark1} 25%,
    ${palette.green.light1} 50%,
    ${palette.green.dark1} 75%
  );
  background-clip: text;
  background-size: 300% 100%;
  color: transparent;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  -webkit-background-clip: text;
  animation: ${dotShimmer} 1.4s ease-in-out infinite;

  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.4s;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: none;
    color: ${palette.green.dark1};
  }
`;

export const ThinkingBox = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={boxStyle(darkMode)}>
      <div className={headerStyle}>
        <Icon glyph="Sparkle" color={palette.green.dark1} />
        <span className={headerTextStyle} data-testid="thinking-header-text">
          The MongoDB Assistant is thinking
          <span className={dotsStyle} aria-hidden="true">
            <span className={dotStyle} data-testid="thinking-dot">
              .
            </span>
            <span className={dotStyle} data-testid="thinking-dot">
              .
            </span>
            <span className={dotStyle} data-testid="thinking-dot">
              .
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};
