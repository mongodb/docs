import { css } from '@leafygreen-ui/emotion';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { palette } from '@leafygreen-ui/palette';
import { displayNone } from '@/utils/display-none';

export const ActionsBox = styled('div')`
  display: flex;
  align-items: center;
  column-gap: ${theme.size.default};
  position: relative;
  top: 0;
  margin: 0 ${theme.size.large} 0 ${theme.size.medium};
  justify-self: flex-end;
  grid-column: -2/-1;

  @media ${theme.screenSize.upToLarge} {
    column-gap: 6px;
    margin-right: ${theme.size.medium};
    margin-left: ${theme.size.small};
  }

  @media ${theme.screenSize.upToMedium} {
    margin-left: 1px;
  }
`;

export const overlineStyling = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${palette.gray.dark1};
  text-transform: uppercase;
  text-wrap: nowrap;
  font-weight: 600;
  cursor: pointer;
  ${displayNone.onLargerThanTablet};
  font-size: ${theme.fontSize.tiny};
  padding-right: ${theme.size.large};
  .dark-theme & {
    color: ${palette.gray.light2};
  }

  > svg {
    margin-right: ${theme.size.small};
  }
`;

export const offlineStyling = css`
  @media ${theme.screenSize.largeAndUp} {
    display: none;
  }
`;

const hideOnEnLang = `
  &:not(:lang(EN)) {
    display: none;
  }
`;

export const chatbotButtonStyling = css`
  text-wrap-mode: nowrap;
  ${displayNone.onMobileAndTablet};
  ${hideOnEnLang}
`;

export const chatbotMobileButtonStyling = css`
  ${displayNone.onLargerThanTablet}
  ${hideOnEnLang}
  color: ${palette.green.dark2};

  .dark-theme & {
    color: ${palette.green.dark1};
  }
`;
