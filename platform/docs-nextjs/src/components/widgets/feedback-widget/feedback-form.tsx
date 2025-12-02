import { cx } from '@leafygreen-ui/emotion';
import Loadable from '@loadable/component';
import { createPortal } from 'react-dom';
import useScreenSize from '@/hooks/use-screen-size';
import { type FeedbackViewType, useFeedbackContext } from './context';
import FeedbackCard from '@/components/widgets/feedback-widget/feedback-card';
import RatingView from '@/components/widgets/feedback-widget/views/rating-view';
import SubmittedView from '@/components/widgets/feedback-widget/views/submitted-view';
const CommentView = Loadable(() => import('@/components/widgets/feedback-widget/views/comment-view'));

export type FeedbackContentProps = {
  view: FeedbackViewType;
};

export const FeedbackContent = ({ view }: FeedbackContentProps) => {
  if (view === 'waiting') return null;
  const View = {
    rating: RatingView,
    comment: CommentView,
    submitted: SubmittedView,
  }[view];
  return <View />;
};

export const feedbackId = 'feedback-card';
export const fwFormId = 'feedback-form';

export type FeedbackFormProps = {
  className?: string;
};

const FeedbackForm = ({ className }: FeedbackFormProps) => {
  const { view, detachForm } = useFeedbackContext();
  const { isTabletOrMobile } = useScreenSize();
  const isOpen = view !== 'waiting';

  const renderedComponent = isOpen && (
    <div className={cx(fwFormId, className)} id={feedbackId} hidden={!isOpen}>
      <FeedbackCard isOpen={isOpen}>
        <FeedbackContent view={view} />
      </FeedbackCard>
    </div>
  );

  return isTabletOrMobile || detachForm ? createPortal(renderedComponent, document.body) : renderedComponent;
};

export default FeedbackForm;
