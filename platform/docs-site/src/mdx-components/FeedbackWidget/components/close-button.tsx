import { Button, ButtonVariant, type ButtonProps } from '@via-ds/components/button';
import { Size } from '@via-ds/components/types';
import XIcon from '@via-ds/icons/X';
import { CLOSE_BUTTON_ALT_TEXT } from '../constants';
import styles from './close-button.module.scss';

export type CloseButtonProps = {
  onPress: NonNullable<ButtonProps['onPress']>;
};

const CloseButton = ({ onPress }: CloseButtonProps) => {
  return (
    <Button
      aria-label={CLOSE_BUTTON_ALT_TEXT}
      className={styles.closeButton}
      onPress={onPress}
      size={Size.Small}
      variant={ButtonVariant.Tertiary}
    >
      <XIcon slot="icon" aria-hidden="true" />
    </Button>
  );
};

export { CloseButton };
