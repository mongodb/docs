import { Button, ButtonVariant } from '@via-ds/components/button';
import ArrowUpIcon from '@via-ds/icons/ArrowUp';
import FullScreenEnterIcon from '@via-ds/icons/FullScreenEnter';
import FullScreenExitIcon from '@via-ds/icons/FullScreenExit';
import MinusIcon from '@via-ds/icons/Minus';
import XIcon from '@via-ds/icons/X';
import { useInstruqt } from '@/context/instruqt-context';
import styles from './drawer-buttons.module.scss';

export type DrawerButtonsProps = {
  height: number;
  minHeight: number;
  maxHeight: number;
  defaultHeight: number;
  setHeight: (height: number) => void;
};

export const DrawerButtons = ({ height, minHeight, maxHeight, defaultHeight, setHeight }: DrawerButtonsProps) => {
  const { setIsOpen } = useInstruqt();
  const isMinHeight = height === minHeight;
  const isMaxHeight = height === maxHeight;
  const MinimizeIcon = isMinHeight ? ArrowUpIcon : MinusIcon;
  const MaximizeIcon = isMaxHeight ? FullScreenExitIcon : FullScreenEnterIcon;

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
    <div className={styles.buttonContainer}>
      <Button
        aria-label={isMinHeight ? 'Expand lab' : 'Minimize lab'}
        onPress={handleMinimizeDrawer}
        variant={ButtonVariant.Tertiary}
      >
        <MinimizeIcon slot="icon" aria-hidden="true" />
      </Button>
      <Button
        aria-label={isMaxHeight ? 'Exit full screen' : 'Maximize lab'}
        onPress={handleMaximizeDrawer}
        variant={ButtonVariant.Tertiary}
      >
        <MaximizeIcon slot="icon" aria-hidden="true" />
      </Button>
      <Button aria-label="Close lab" onPress={handleDrawerClose} variant={ButtonVariant.Tertiary}>
        <XIcon slot="icon" aria-hidden="true" />
      </Button>
    </div>
  );
};
