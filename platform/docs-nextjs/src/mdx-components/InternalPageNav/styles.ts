import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

export const navLinkButtonStyle = css`
  background-color: ${palette.gray.light3};
  color: ${palette.black};

  .dark-theme & {
    background-color: ${palette.gray.dark2};
    color: ${palette.white};
  }
`;
