import { css, cx } from '@leafygreen-ui/emotion';
import { Icon } from '@leafygreen-ui/icon';
import { IconButton } from '@leafygreen-ui/icon-button';
import { Option, Select } from '@leafygreen-ui/select';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams || undefined);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const goBack = () => {
    if (currentPage > 1) {
      router.push(createPageURL(currentPage - 1), { scroll: false });
    }
  };

  const goNext = () => {
    if (currentPage < totalPages) {
      router.push(createPageURL(currentPage + 1), { scroll: false });
    }
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
          onChange={(value) => router.push(createPageURL(Number(value)), { scroll: false })}
        >
          {Array(totalPages)
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
          of {totalPages}
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
        <IconButton aria-label="next" disabled={currentPage === totalPages} onClick={goNext}>
          <Icon glyph="ChevronRight" />
        </IconButton>
      </div>
    </div>
  );
};
