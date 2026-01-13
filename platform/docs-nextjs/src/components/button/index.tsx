'use client';

import LeafyButton from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import type { ButtonNode } from '@/types/ast';
import ComponentFactory from '@/components/component-factory';
import type { LinkProps } from '@/components/link';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';

const buttonStyling = css`
  &.button {
    color: #ffffff;
  }
`;

export type ButtonProps = {
  options: ButtonNode['options'];
  argument: ButtonNode['argument'];
  variant?: 'primary';
  darkMode?: boolean;
  rightGlyph?: string;
  size?: 'default' | 'small' | 'large';
};

export type ComponentProps = {
  as?: React.ComponentType<LinkProps>;
  to?: string;
  href?: string;
};

const Button = ({
  argument,
  options: { uri },
  variant = 'primary',
  darkMode: darkModeProp = false,
  size = 'default',
  rightGlyph,
  ...rest
}: ButtonProps) => {
  const { darkMode } = useDarkMode();
  const componentProps: ComponentProps = {};
  if (uri) {
    componentProps.href = uri;
  }

  return (
    <LeafyButton
      className={cx(componentProps.as ? buttonStyling : '', 'button')}
      size={size}
      darkMode={darkModeProp ?? darkMode}
      variant={variant}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        const translatedArgument = event.currentTarget.textContent?.trim() || argument;
        reportAnalytics('CTA Click', {
          position: 'body',
          position_context: `button`,
          label: argument,
          label_text_displayed: translatedArgument,
          scroll_position: currentScrollPosition(),
          tagbook: 'true',
        });
      }}
      rightGlyph={rightGlyph ? <Icon glyph={rightGlyph} /> : undefined}
      {...componentProps}
    >
      {argument.map((child, i) => (
        <ComponentFactory {...rest} nodeData={child} key={i} />
      ))}
    </LeafyButton>
  );
};

export default Button;
