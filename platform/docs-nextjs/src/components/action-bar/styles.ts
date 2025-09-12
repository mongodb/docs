import { css } from '@leafygreen-ui/emotion';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { palette } from '@leafygreen-ui/palette';
import { displayNone } from '@/utils/display-none';

export const ActionBarSearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: inherit;

  @media ${theme.screenSize.mediumAndUp} {
    padding-right: ${theme.size.default};
  }

  @media ${theme.screenSize.upToLarge} {
    max-width: unset;
    justify-content: space-between;
    width: 100%;
  }
`;

interface StyledInputProps {
  sidenav?: boolean;
  mobileSearchActive: boolean;
}

export const StyledInputContainer = styled.div<StyledInputProps>`
  width: 100%;
  max-width: 610px;
  background: inherit;

  div[role='searchbox'] {
    background-color: var(--search-input-background-color);
    width: 100%;
  }

  --search-input-background-color: ${palette.white};
  .dark-theme & {
    --search-input-background-color: ${palette.gray.dark4};
  }

  @media ${theme.screenSize.mediumAndUp} {
    width: ${({ sidenav }) => (sidenav ? '70' : '100')}%;
  }

  ${(props) => {
    return (
      props.mobileSearchActive &&
      `
      display: flex !important;
      position: absolute;
      width: calc(100% - ${theme.size.medium} - ${theme.size.medium});
      z-index: 40;
      max-width: unset;
      left: ${theme.size.medium};
      column-gap: ${theme.size.medium};
      align-items: center;

      form {
        width: 100%;
        margin-right: ${theme.size.medium};
      }
    `
    );
  }}
`;

// Used to ensure dropdown is same width as input
export const StyledSearchBoxRef = styled.div`
  width: 100%;
`;

export const searchInputStyling = ({ mobileSearchActive }: StyledInputProps) => css`
  ${!mobileSearchActive && displayNone.onMedium};

  @media ${theme.screenSize.upToMedium} {
    input[type='search'] {
      font-size: ${theme.fontSize.default};
    }
  }

  ${mobileSearchActive &&
  `
    display: flex !important;
    width: calc(100% - ${theme.size.medium} - ${theme.size.medium});
    z-index: 40;
    max-width: unset;
    background: var(--background-color-primary);
    align-items: center;

    > form {
      width: 100%;
      margin-right: ${theme.size.medium};
    }
  `}
`;

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

export const searchIconStyling = css`
  ${displayNone.onLargerThanMedium};
  float: right;
  justify-content: right;
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
