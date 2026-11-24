import { useId } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { useFeedbackContext } from '../context';
import StarRating from '../components/star-rating';

const labelStyling = css`
  font-size: 13px;
  font-weight: 500 !important;
  color: --label-color;
`;

const RatingView = () => {
  const { selectInitialRating } = useFeedbackContext();
  const ratingLabelId = `feedback-rating-label-${useId()}`;

  return (
    <>
      {/* Not a <label>: the stars aren't a labelable form control. */}
      <div className={cx(labelStyling)} id={ratingLabelId}>
        Rate this page
      </div>
      <StarRating aria-labelledby={ratingLabelId} handleRatingSelection={selectInitialRating} />
    </>
  );
};

export default RatingView;
