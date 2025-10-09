'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to get the current URL hash fragment
 * @returns The current hash string (including the # symbol)
 */
export const useHash = () => {
  const [hash, setHash] = useState('');

  useEffect(() => {
    // Set initial hash value on client side
    if (typeof window !== 'undefined') {
      setHash(window.location.hash ?? '');
    }

    // Listen for hash changes
    const handleHashChange = () => {
      setHash(window.location.hash ?? '');
    };

    window.addEventListener('hashchange', handleHashChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return hash;
};
