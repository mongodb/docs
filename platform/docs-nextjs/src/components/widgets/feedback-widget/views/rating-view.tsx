import { css, cx } from '@leafygreen-ui/emotion';
import { Label } from '@leafygreen-ui/typography';
import { useFeedbackContext } from '../context';
import StarRating from '../components/star-rating';

const labelStyling = css`
  font-size: 13px;
  font-weight: 500 !important;
  color: --label-color;
`;

const RatingView = () => {
  const { selectInitialRating } = useFeedbackContext();

  return (
    <>
      <Label className={cx(labelStyling)} htmlFor="rating">
        Rate this page
      </Label>
      <StarRating handleRatingSelection={selectInitialRating} />
    </>
  );
};

export default RatingView;
