import { isBrowser } from '@/utils/is-browser';
import { getPlaintext } from '@/utils/get-plaintext';
import { getNestedValue } from '@/utils/get-nested-value';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { usePageContext } from '@/context/page-context';
import type { ASTNode } from '@/types/ast';
import { RatingView } from '@/components/widgets/feedback-widget/views';
import FeedbackContainer from '@/components/widgets/feedback-widget/feedback-container';
import FeedbackForm from '@/components/widgets/feedback-widget/feedback-form';
import useFeedbackData from '@/components/widgets/feedback-widget/use-feedback-data';
import { FeedbackProvider, useFeedbackContext } from './context';

export type FeedbackRatingProps = {
  className: string;
  classNameContainer?: string;
  position?: 'right column' | 'body';
};

const FeedbackRating = ({ className, classNameContainer, position = 'right column' }: FeedbackRatingProps) => {
  const url = isBrowser ? window.location.href : null;
  const metadata = useSnootyMetadata();
  const { options, slug } = usePageContext();
  const feedbackData = useFeedbackData({
    slug,
    url,
    title:
      getPlaintext(getNestedValue(['slugToTitle', slug === '/' ? 'index' : slug], metadata) as ASTNode[]) ||
      'MongoDB Documentation',
  });

  if (options?.hidefeedback === 'page') {
    return null;
  }

  return (
    <FeedbackProvider page={feedbackData} position={position}>
      <FeedbackContainer className={classNameContainer}>
        <FeedbackForm className={className} />
        <RatingView />
      </FeedbackContainer>
    </FeedbackProvider>
  );
};

export default FeedbackRating;

export { FeedbackProvider, useFeedbackContext, useFeedbackData, FeedbackForm, FeedbackContainer };
