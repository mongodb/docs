'use client';

import { useEffect, useState, useContext } from 'react';

import { TabHashContext } from '@/context/tabs-hash-context';
import { TabContext } from '@/context/tabs-context';

// Hook that scrolls the current ref element into view
// if it is the same as the current location's hash.
// This is required on elements with id attribute
// to overcome DOM tree being pushed down by rehydrated content
// ie. saved tabbed content from local storage
const useHashAnchor = (id: string, ref: HTMLElement | null) => {
  const [hash, setHash] = useState<string>('');
  const { setActiveTabToHashTab } = useContext(TabHashContext);
  const { selectors, setInitialTabs, setLanguageSelectorTab } = useContext(TabContext);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Set hash only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHash(window.location.hash ?? '');
    }
  }, []);

  useEffect(() => {
    if (!initialLoad || !hash || hasScrolled) return;
    setInitialLoad(false);

    const hashId = hash?.slice(1);
    if (id !== hashId || !ref) {
      return;
    }

    if (setActiveTabToHashTab) {
      // If within tab, force correct tabs to be open
      setLanguageSelectorTab();
      setActiveTabToHashTab();
    } else {
      // Otherwise, ensure default and local storage-found tabs are selected
      setInitialTabs();
    }

    const startTime = Date.now();
    const timeout = 5000;

    const checkAndScroll = () => {
      if (!ref) return;

      if (ref.scrollHeight > 0 && typeof window !== 'undefined') {
        const y = ref.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y });
        setHasScrolled(true);
        return;
      }

      if (Date.now() - startTime < timeout) {
        requestAnimationFrame(checkAndScroll);
      }
    };

    checkAndScroll();
  }, [
    hash,
    id,
    ref,
    selectors,
    hasScrolled,
    initialLoad,
    setActiveTabToHashTab,
    setInitialTabs,
    setLanguageSelectorTab,
  ]);
};

export default useHashAnchor;
