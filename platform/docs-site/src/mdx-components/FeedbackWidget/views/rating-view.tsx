import { useId } from 'react';
import { Text } from '@via-ds/components/typography';
import { useFeedbackContext } from '../context';
import StarRating from '../components/star-rating';
import styles from './rating-view.module.scss';

const RatingView = () => {
  const { selectInitialRating } = useFeedbackContext();
  const ratingLabelId = `feedback-rating-label-${useId()}`;

  return (
    <>
      {/* Not a <label>: the stars aren't a labelable form control. */}
      <Text elementType="div" className={styles.label} id={ratingLabelId}>
        Rate this page
      </Text>
      <StarRating aria-labelledby={ratingLabelId} handleRatingSelection={selectInitialRating} />
    </>
  );
};

export default RatingView;
