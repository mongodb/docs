import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import { clsx } from 'clsx';
import FavoriteIcon from '@via-ds/icons/Favorite';
import { useFeedbackContext } from '../context';
import useScreenSize from '@/hooks/use-screen-size';
import styles from './star-rating.module.scss';

export type StarProps = {
  isHighlighted: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onBlur?: () => void;
};

const Star = ({ isHighlighted, onClick, onMouseEnter, onMouseLeave, onFocus, onKeyDown, onBlur }: StarProps) => {
  const { isTabletOrMobile } = useScreenSize();
  const starSize = isTabletOrMobile ? 32 : 24;

  return (
    <div className={styles.starContainer} onClick={onClick} onMouseLeave={onMouseLeave}>
      <FavoriteIcon
        data-testid={`rating-star${isHighlighted ? '-highlighted' : ''}`}
        className={clsx(styles.star, isHighlighted && styles.highlighted)}
        size={starSize}
        // Change default viewbox to allow focus outline to be more centered
        viewBox="0 -0.5 16 16"
        onMouseEnter={onMouseEnter}
        tabIndex={0}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export type StarRatingProps = {
  className?: string;
  handleRatingSelection?: (rating: number) => void;
  editable?: boolean;
  /** Id of the element labelling the star group. */
  'aria-labelledby'?: string;
};

const StarRating = ({
  className,
  handleRatingSelection = () => {},
  editable = true,
  'aria-labelledby': ariaLabelledBy,
}: StarRatingProps) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [lastHoveredRating, setLastHoveredRating] = useState<number | null>(null);
  const { selectedRating } = useFeedbackContext();

  const hoverStar = (ratingValue: number) => {
    setHoveredRating(ratingValue);
    setLastHoveredRating(ratingValue);
  };

  const handleMouseLeaveStar = () => {
    setHoveredRating(lastHoveredRating);
  };

  const resetHoverStates = () => {
    setHoveredRating(null);
    setLastHoveredRating(null);
  };

  const handleKeyDown = (e: KeyboardEvent, ratingValue: number) => {
    const validKeys = ['Enter', 'Space'];
    if (validKeys.includes(e.code)) {
      e.preventDefault();
      handleRatingSelection(ratingValue);
    }
  };

  return (
    <>
      <div
        className={clsx(styles.layout, className)}
        onMouseLeave={resetHoverStates}
        role={ariaLabelledBy ? 'group' : undefined}
        aria-labelledby={ariaLabelledBy}
      >
        {[1, 2, 3, 4, 5].map((ratingValue) => {
          let isHighlighted = false;
          if (hoveredRating) isHighlighted = hoveredRating >= ratingValue;
          else if (selectedRating) isHighlighted = selectedRating >= ratingValue;

          const eventProps = editable
            ? {
                onMouseEnter: () => hoverStar(ratingValue),
                onMouseLeave: () => handleMouseLeaveStar(),
                onFocus: () => hoverStar(ratingValue),
                onBlur: () => resetHoverStates(),
                onClick: () => handleRatingSelection(ratingValue),
                onKeyDown: (e: KeyboardEvent) => handleKeyDown(e, ratingValue),
              }
            : {};

          return <Star key={ratingValue} isHighlighted={isHighlighted} {...eventProps} />;
        })}
      </div>
    </>
  );
};

export default StarRating;
