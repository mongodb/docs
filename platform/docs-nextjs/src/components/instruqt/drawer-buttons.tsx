import Icon from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import { useInstruqt } from '@/context/instruqt-context';

const buttonContainerStyle = css`
  display: flex;
  align-items: center;
  position: absolute;
  right: 17px;
  gap: 0 15px;

  @${theme.screenSize.upToMedium} {
    gap: 0 24px;
  }
`;

const iconStyle = css`
  color: ${palette.white};
  cursor: pointer;
`;

export type DrawerButtonsProps = {
  height: number;
  minHeight: number;
  maxHeight: number;
  defaultHeight: number;
  setHeight: (height: number) => void;
};

const DrawerButtons = ({ height, minHeight, maxHeight, defaultHeight, setHeight }: DrawerButtonsProps) => {
  const { setIsOpen } = useInstruqt();
  const isMinHeight = height === minHeight;
  const isMaxHeight = height === maxHeight;
  const minimizeGlyph = isMinHeight ? 'ArrowUp' : 'Minus';
  const maximizeGlyph = isMaxHeight ? 'FullScreenExit' : 'FullScreenEnter';

  const handleMinimizeDrawer = () => {
    const minimizeTargetHeight = isMinHeight ? defaultHeight : minHeight;
    setHeight(minimizeTargetHeight);
  };

  const handleMaximizeDrawer = () => {
    const maximizeTargetHeight = isMaxHeight ? defaultHeight : maxHeight;
    setHeight(maximizeTargetHeight);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={cx(buttonContainerStyle)}>
      <Icon className={cx(iconStyle)} width={16} height={16} onClick={handleMinimizeDrawer} glyph={minimizeGlyph} />
      <Icon className={cx(iconStyle)} width={24} height={24} onClick={handleMaximizeDrawer} glyph={maximizeGlyph} />
      <Icon className={cx(iconStyle)} width={24} height={24} onClick={handleDrawerClose} glyph="X" />
    </div>
  );
};

export default DrawerButtons;
