import type { ReactNode } from 'react';
import { useRef } from 'react';
import { cx } from '@leafygreen-ui/emotion';
import useClickOutside from '@/hooks/use-click-outside';
import useScreenSize from '@/hooks/use-screen-size';
import { useFeedbackContext } from './context';

export type FeedbackContainerProps = {
  children: ReactNode;
  className?: string;
};

const FeedbackContainer = ({ children, className }: FeedbackContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { abandon, isScreenshotButtonClicked } = useFeedbackContext();
  const { isMobile } = useScreenSize();

  useClickOutside(ref, () => {
    if (!isMobile && !isScreenshotButtonClicked) {
      abandon();
    }
  });

  return (
    <div className={cx(className)} ref={ref} data-testid="feedback-container">
      {children}
    </div>
  );
};

export default FeedbackContainer;
