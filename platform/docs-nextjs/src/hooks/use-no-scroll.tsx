import { useEffect } from 'react';
import noScroll from 'no-scroll';

const useNoScroll = (condition: boolean) => {
  useEffect(() => {
    if (condition) {
      noScroll.on();
      return () => noScroll.off();
    }
  }, [condition]);
};

export default useNoScroll;
