import { isBrowser } from './is-browser';

// Function that returns current scroll position for analytics
export const currentScrollPosition = (): number => {
  if (isBrowser) {
    const percentage = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    return Math.round(percentage / 10) * 10;
  }
  return 0;
};
