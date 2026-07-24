'use client';

import { useEffect, useState } from 'react';
import { isBrowser } from '@/utils/is-browser';

// from https://github.com/streamich/react-use/blob/master/src/useMedia.ts

const useMedia = (query: string, defaultState = false) => {
  const [state, setState] = useState<boolean>(defaultState);

  useEffect(() => {
    if (isBrowser) {
      let mounted = true;
      const mql = window.matchMedia(query);
      const onChange = () => {
        if (!mounted) {
          return;
        }
        setState(!!mql.matches);
      };

      mql.addListener(onChange);
      setState(mql.matches);

      return () => {
        mounted = false;
        mql.removeListener(onChange);
      };
    }
  }, [query]);

  return state;
};

export default useMedia;
