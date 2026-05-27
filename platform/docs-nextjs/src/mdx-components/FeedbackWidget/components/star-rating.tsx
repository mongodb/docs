import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import { palette } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useFeedbackContext } from '../context';
import useScreenSize from '@/hooks/use-screen-size';
import { theme } from '@/styles/theme';

const FILLED_STAR_COLOR = palette.green.light1;
const UNFILLED_STAR_COLOR = palette.white;

const starIconStyle = (isHighlighted: boolean) => css`
  color: ${isHighlighted ? FILLED_STAR_COLOR : UNFILLED_STAR_COLOR};
  stroke-width: ${isHighlighted ? 1 : 0.5}px;
  stroke: ${palette.gray.dark2};
  // Ensures that containing divs do not overflow
  display: block;

  // Prevents mousedown events from causing focus styling to appear
  :focus:not(:focus-visible) {
    outline: none;
  }

  // Allows focus styling only on keyboard interaction
  :focus-visible {
    outline-color: ${palette.blue.light1};
    outline-offset: 1px;
    border-radius: 6px;
  }
`;

const Layout = styled.div`
  display: flex;
  gap: ${theme.size.small};
  margin: 10px 0 ${theme.size.default};

  @media ${theme.screenSize.upToLarge} {
    gap: 12px;
  }
`;

const StarContainer = styled.div`
  cursor: pointer;
`;

export const StarRatingLabel = styled.div`
  margin-top: 12px;
`;

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
    <div onClick={onClick} onMouseLeave={onMouseLeave}>
      <StarContainer>
        <Icon
          data-testid={`rating-star${isHighlighted ? '-highlighted' : ''}`}
          className={starIconStyle(isHighlighted)}
          glyph="Favorite"
          size={starSize}
          // Change default viewbox to allow focus outline to be more centered
          viewBox="0 -0.5 16 16"
          onMouseEnter={onMouseEnter}
          tabIndex={0}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
      </StarContainer>
    </div>
  );
};

export type StarRatingProps = {
  className?: string;
  handleRatingSelection?: (rating: number) => void;
  editable?: boolean;
};

const StarRating = ({ className, handleRatingSelection = () => {}, editable = true }: StarRatingProps) => {
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
      <Layout className={className} onMouseLeave={resetHoverStates}>
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
      </Layout>
    </>
  );
};

export default StarRating;
