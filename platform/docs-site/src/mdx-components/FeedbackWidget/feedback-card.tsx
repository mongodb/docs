import type { ReactNode } from 'react';
import { Card } from '@via-ds/components/card';
import useScreenSize from '@/hooks/use-screen-size';
import ProgressBar from './components/page-indicators';
import { CloseButton } from './components/close-button';
import { useFeedbackContext } from './context';
import useNoScroll from '@/hooks/use-no-scroll';
import styles from './feedback-card.module.scss';

export type FeedbackCardProps = {
  isOpen: boolean;
  children: ReactNode;
};

const FeedbackCard = ({ isOpen, children }: FeedbackCardProps) => {
  const { exitAndSubmit } = useFeedbackContext();
  // Ensure FeedbackCard can be fullscreen size
  const { isMobile } = useScreenSize();
  useNoScroll(isMobile);

  const onClose = () => {
    exitAndSubmit();
  };

  return (
    isOpen && (
      <div className={styles.cardContainer}>
        <Card className={styles.card}>
          <CloseButton onPress={onClose} />
          <ProgressBar />
          <div>{children}</div>
        </Card>
      </div>
    )
  );
};

export default FeedbackCard;
