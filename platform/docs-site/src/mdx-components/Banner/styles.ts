import { css } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import { palette } from '@leafygreen-ui/palette';

const baseBannerStyle = css`
  margin: ${theme.size.default} 0;

  /* Add margins below all child elements in the banner */
  & > div > div > * {
    margin: 0 0 12px;
  }

  & > div > div > *:last-child {
    margin: 0;
  }

  /* Remove margins on individual paragraphs */
  p {
    margin: 0;
  }

  /* Force all content to be 13px in banners */
  font-size: ${theme.fontSize.small};

  p,
  a {
    font-size: ${theme.fontSize.small};
  }

  a {
    &:hover {
      text-underline-offset: 3px;
    }
  }
`;

export const videoBannerStyling = css`
  ${baseBannerStyle};
  background-color: ${palette.blue.light3};
  border: 1px solid ${palette.blue.light2};
  color: ${palette.blue.dark2};
  .dark-theme & {
    background-color: ${palette.blue.dark3};
    border: 1px solid ${palette.blue.dark2};
    color: ${palette.blue.light2};
  }
  align-items: center;

  border-radius: 6px;

  display: flex;
  font-size: 14px;
  margin: 24px 0px;
  min-height: 44px;
  padding: 9px 12px 9px 20px;
  position: relative;
  cursor: pointer;

  > p {
    margin-left: 15px;
  }
`;

export const lgIconStyling = css`
  width: 26px;
  min-width: 26px;
  height: 26px;
  background-color: ${palette.blue.light2};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${palette.blue.base};
  border-radius: 20px;
  margin-left: -5px;
`;
