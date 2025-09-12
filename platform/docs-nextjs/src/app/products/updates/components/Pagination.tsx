import { css, cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { Option, Select } from '@leafygreen-ui/select';

interface PaginationProps {
  setCurrentPage: (page: number) => void;
  totalFilteredUpdates: number;
  currentPage: number;
}

export const Pagination = ({ totalFilteredUpdates, setCurrentPage, currentPage }: PaginationProps) => {
  const goBack = () => {
    const previousPage = currentPage - 1;
    setCurrentPage(previousPage);
  };

  const goNext = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  return (
    <div
      className={cx(css`
        display: flex;
      `)}
    >
      <div
        className={cx(css`
          display: flex;
          align-items: center;
          gap: 8px;
        `)}
      >
        <Select
          aria-label="pagination"
          placeholder=""
          size="small"
          dropdownWidthBasis="option"
          value={String(currentPage)}
          allowDeselect={false}
          onChange={(value) => setCurrentPage(Number(value))}
        >
          {Array(totalFilteredUpdates)
            .fill(0)
            .map((_, i) => {
              const page = i + 1;
              return <Option key={`${page}`} value={`${page}`}>{`${page}`}</Option>;
            })}
        </Select>
        <span
          className={cx(css`
            font-size: 13px;
          `)}
        >
          of {totalFilteredUpdates}
        </span>
      </div>
      <div
        className={cx(css`
          display: flex;
          align-items: center;
          margin-left: 5px;
        `)}
      >
        <IconButton aria-label="previous" disabled={currentPage === 1} onClick={goBack}>
          <Icon glyph="ChevronLeft" />
        </IconButton>
        <IconButton aria-label="next" disabled={currentPage === totalFilteredUpdates} onClick={goNext}>
          <Icon glyph="ChevronRight" />
        </IconButton>
      </div>
    </div>
  );
};
