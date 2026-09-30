import type { ReactNode } from 'react';
import { useRef } from 'react';
import { cx } from '@leafygreen-ui/emotion';
import useClickOutside from '@/hooks/use-click-outside';
import { useFeedbackContext } from './context';

export type FeedbackContainerProps = {
  children: ReactNode;
  className?: string;
};

const FeedbackContainer = ({ children, className }: FeedbackContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { exitAndSubmit, isScreenshotButtonClicked, hasSubmitted, view, formRef } = useFeedbackContext();

  // formRef points at the actual rendered card even when it's portaled to
  // document.body on mobile/tablet (feedback-form.tsx) — passing both refs
  // means a tap inside the portaled card still counts as "inside" here.
  useClickOutside([ref, formRef], () => {
    if (!isScreenshotButtonClicked) {
      exitAndSubmit();
    }
  });

  // After a submission, keep showing the "submitted" confirmation, then hide the
  // widget entirely once it is dismissed. It stays hidden until a page reload,
  // so a new submission can't be started without refreshing.
  if (hasSubmitted && view !== 'submitted') {
    return null;
  }

  return (
    <div className={cx(className)} ref={ref} data-testid="feedback-container">
      {children}
    </div>
  );
};

export default FeedbackContainer;
