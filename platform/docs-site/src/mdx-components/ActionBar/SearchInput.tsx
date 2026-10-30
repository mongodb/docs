'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { clsx } from 'clsx';
import { Button, ButtonVariant } from '@via-ds/components/button';
import { SearchField } from '@via-ds/components/search-field';
import MagnifyingGlass from '@via-ds/icons/MagnifyingGlass';
import useScreenSize from '@/hooks/use-screen-size';
import { isBrowser } from '@/utils/is-browser';
import { getCompleteUrl } from '@/utils/url-utils';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import styles from './action-bar.module.scss';

export const PLACEHOLDER_TEXT = `Search MongoDB Docs`;
const PLACEHOLDER_TEXT_MOBILE = 'Search';

interface SearchInputProps {
  className?: string;
  slug?: string;
}

export const SearchInput = ({ className }: SearchInputProps) => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [mobileSearchActive, setMobileSearchActive] = useState(() => false);
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
    window.location.href = `${getCompleteUrl('/docs/site-search/')}?q=${encodeURIComponent(searchValue)}`;
  };

  return (
    <div className={clsx(styles['search-input'], mobileSearchActive && styles['mobile-search-active'], className)}>
      <SearchField
        aria-label={PLACEHOLDER_TEXT}
        className={clsx('sl-search-input', styles['search-field'])}
        value={searchValue}
        placeholder={isMobile ? PLACEHOLDER_TEXT_MOBILE : PLACEHOLDER_TEXT}
        onChange={setSearchValue}
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
      {isMedium && mobileSearchActive && (
        <Button
          variant={ButtonVariant.Tertiary}
          onPress={() => {
            setSearchValue('');
            setMobileSearchActive(false);
          }}
        >
          Cancel
        </Button>
      )}
      {!mobileSearchActive && (
        <Button
          variant={ButtonVariant.Tertiary}
          aria-label={PLACEHOLDER_TEXT}
          className={styles['search-toggle']}
          onPress={() => {
            setMobileSearchActive((state) => !state);
          }}
        >
          <MagnifyingGlass slot="icon" />
        </Button>
      )}
    </div>
  );
};
