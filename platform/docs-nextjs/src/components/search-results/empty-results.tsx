import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { H3 } from '@leafygreen-ui/typography';
import NoResults from '@/components/svg/no-results';

export const EMPTY_STATE_HEIGHT = '166px';
const MAX_WIDTH = '637px';

const EmptyStateContainer = css`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  grid-column-gap: 5px;
  font-family: 'Euclid Circular A';
  letter-spacing: 0.5px;
  margin: 0 auto;
  max-width: ${MAX_WIDTH};
`;

const NoResultText = css`
  padding-left: 56px;
  padding-top: 20px;
`;

const SupportingText = css`
  color: ${palette.gray.dark1};
  font-size: 13px;
  font-family: Euclid Circular A;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin-top: 13px;

  .dark-theme & {
    color: ${palette.gray.light2};
  }
`;

const EmptyResults = () => {
  return (
    <div className={cx(EmptyStateContainer)}>
      <NoResults />
      <div className={cx(NoResultText)}>
        <H3>No results found</H3>
        <p className={cx(SupportingText)}>
          We weren’t able to find any results for your query. Try adjusting your keywords to find what you’re looking
          for.
        </p>
      </div>
    </div>
  );
};

export default EmptyResults;
