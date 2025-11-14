import { baseBannerStyle } from '@/components/banner/styles/banner-item-style';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

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
