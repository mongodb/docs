import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

const focusBoxShadow = (color: string) => `
  0 0 0 2px ${color}, 
  0 0 0 4px ${palette.blue.light1};
`;

// Theme-specific styles were copied from the original Button component
// to allow pre-rendering for dark mode
export const disabledStyle = css`
  &[aria-disabled='true'] {
    &,
    &:hover,
    &[data-hover='true'],
    &:active,
    &[data-active='true'] {
      background-color: ${palette.gray.light2};
      border-color: ${palette.gray.light1};
      color: ${palette.gray.base};
      box-shadow: none;
      cursor: not-allowed;
    }

    &:focus-visible,
    &[data-focus='true'] {
      color: ${palette.gray.base};
      box-shadow: ${focusBoxShadow(palette.white)};
    }

    // Needs to be nested here to ensure proper cascading
    .dark-theme & {
      &,
      &:hover,
      &[data-hover='true'],
      &:active,
      &[data-active='true'] {
        background-color: ${palette.gray.dark3};
        border-color: ${palette.gray.dark2};
        color: ${palette.gray.dark1};
        box-shadow: none;
        cursor: not-allowed;
      }

      &:focus-visible,
      &[data-focus='true'] {
        color: ${palette.gray.dark1};
        box-shadow: ${focusBoxShadow(palette.black)};
      }
    }
  }
`;
