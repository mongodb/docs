import { Button, ButtonVariant, type ButtonProps } from '@via-ds/components/button';
import { Size } from '@via-ds/components/types';
import XIcon from '@via-ds/icons/X';
import { getTranslator } from '@/internationalization/get-translator';
import styles from './close-button.module.scss';

export type CloseButtonProps = {
  onPress: NonNullable<ButtonProps['onPress']>;
};

const CloseButton = ({ onPress }: CloseButtonProps) => {
  const { t } = getTranslator();

  return (
    <Button
      aria-label={t('feedback.close_form')}
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
