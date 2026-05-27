'use client';

import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import LeafyButton, { Variant } from '@leafygreen-ui/button';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';

export type ButtonProps = {
  uri: string;
  children: React.ReactNode;
};

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

const Button = ({ uri, children }: ButtonProps) => {
  return (
    <LeafyButton
      className="button"
      variant={Variant.Primary}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        const labelText = event.currentTarget.textContent?.trim() ?? '';
        reportAnalytics('CTA Click', {
          position: 'body',
          position_context: `button`,
          label: labelText,
          label_text_displayed: labelText,
          scroll_position: currentScrollPosition(),
          tagbook: 'true',
        });
      }}
      href={uri}
    >
      {children}
    </LeafyButton>
  );
};

export default Button;
