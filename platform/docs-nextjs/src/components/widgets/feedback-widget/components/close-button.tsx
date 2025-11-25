import { cx, css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton, { Size } from '@leafygreen-ui/icon-button';
import { theme } from '@/styles/theme';
import { CLOSE_BUTTON_ALT_TEXT } from '../constants';

const buttonStyles = css`
  position: absolute !important;
  top: ${theme.size.default};
  right: ${theme.size.default};
  height: ${theme.size.default};
  width: ${theme.size.default};

  @media ${theme.screenSize.upToSmall} {
    top: ${theme.size.default};
    right: ${theme.size.medium};
  }
`;

export type CloseButtonProps = {
  onClick: (event: React.MouseEvent) => void;
  size?: Size;
  className?: string;
};

const CloseButton = ({ onClick, size = Size.Default, className }: CloseButtonProps) => {
  return (
    <IconButton
      aria-label={CLOSE_BUTTON_ALT_TEXT}
      className={cx(buttonStyles, className)}
      onClick={onClick}
      size={size}
    >
      <Icon size={size} glyph="X" />
    </IconButton>
  );
};

export default CloseButton;
