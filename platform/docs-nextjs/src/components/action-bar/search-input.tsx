'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { css, cx } from '@leafygreen-ui/emotion';
import IconButton from '@leafygreen-ui/icon-button';

import Icon from '@leafygreen-ui/icon';
import { SearchInput as LGSearchInput } from '@leafygreen-ui/search-input';
import { Link } from '@leafygreen-ui/typography';
import useScreenSize from '@/hooks/use-screen-size';
import { theme } from '@/styles/theme';
import { isBrowser } from '@/utils/is-browser';
import { searchIconStyling, searchInputStyling, StyledInputContainer, StyledSearchBoxRef } from './styles';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';

export const PLACEHOLDER_TEXT = `Search MongoDB Docs`;
const PLACEHOLDER_TEXT_MOBILE = 'Search';

interface SearchInputProps {
  className?: string;
  slug?: string;
}

const SearchInput = ({ className }: SearchInputProps) => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(() => searchParams?.get('q') || '');
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mobileSearchActive, setMobileSearchActive] = useState(() => false);
  const router = useRouter();
  const keyPressHandler = useCallback(async (event: KeyboardEvent) => {
    // cmd+k or ctrl+k focuses search bar,
    // unless already focused on an input field
    const holdingCtrlCmd = (navigator.userAgent.includes('Mac') && event.metaKey) || event.ctrlKey;
    if (holdingCtrlCmd && event.key === 'k' && document.activeElement?.tagName.toLowerCase() !== 'input') {
      event.preventDefault();
      inputRef.current?.focus();
      return;
    }
  }, []);

  // adding keyboard shortcuts document wide
  useEffect(() => {
    if (!isBrowser) return;
    document.addEventListener('keydown', keyPressHandler);
    return () => {
      document.removeEventListener('keydown', keyPressHandler);
    };
  }, [keyPressHandler]);

  // focus on mobile open
  useEffect(() => {
    if (mobileSearchActive) {
      inputRef.current?.focus();
    }
  }, [mobileSearchActive]);

  const { isMedium, isMobile } = useScreenSize();

  // reset search input size on screen resize
  useEffect(() => {
    if (!isMedium) {
      setMobileSearchActive(false);
    }
  }, [isMedium]);

  // on init, populate search input field with search params (if any)
  useEffect(() => {
    const searchTerm = searchParams?.get('q');
    if (searchTerm) {
      setSearchValue(searchTerm);
    }
  }, [searchParams]);

  const onSubmit = () => {
    reportAnalytics('Search', {
      position: 'secondary nav',
      label: `search value: ${searchValue}`,
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
    inputRef.current?.blur();
    router.push(`/docs/search/?q=${searchValue}`);
  };

  return (
    <StyledInputContainer className={cx(className)} mobileSearchActive={mobileSearchActive}>
      <StyledSearchBoxRef ref={searchBoxRef}>
        <LGSearchInput
          aria-label={PLACEHOLDER_TEXT}
          className={`sl-search-input ${searchInputStyling({ mobileSearchActive })}`}
          value={searchValue}
          placeholder={isMobile ? PLACEHOLDER_TEXT_MOBILE : PLACEHOLDER_TEXT}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onFocus={() => {
            reportAnalytics('Click', {
              position: 'secondary nav',
              position_context: 'Search bar selected',
              scroll_position: currentScrollPosition(),
              tagbook: 'true',
            });
          }}
          onSubmit={onSubmit}
          ref={inputRef}
        />
      </StyledSearchBoxRef>
      {isMedium && mobileSearchActive && (
        <Link
          className={cx(
            css`
              font-size: ${theme.fontSize.small};
              font-weight: 400;
            `,
          )}
          onClick={() => {
            setSearchValue('');
            setMobileSearchActive(false);
          }}
        >
          Cancel
        </Link>
      )}
      {!mobileSearchActive && (
        <IconButton
          aria-label={PLACEHOLDER_TEXT}
          className={searchIconStyling}
          onClick={() => {
            setMobileSearchActive((state) => !state);
          }}
        >
          <Icon glyph={'MagnifyingGlass'} />
        </IconButton>
      )}
    </StyledInputContainer>
  );
};

export default SearchInput;
