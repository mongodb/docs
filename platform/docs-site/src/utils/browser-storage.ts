import { isBrowser } from './is-browser';

const isValidStorage = isBrowser;

export const setLocalValue = (key: string, value: unknown) => {
  try {
    if (isValidStorage) {
      const prevState = JSON.parse(window.localStorage.getItem('mongodb-docs') || '{}');
      localStorage.setItem('mongodb-docs', JSON.stringify({ ...prevState, [key]: value }));
    }
  } catch {
    console.error('Error setting localStorage value');
  }
};

export const getLocalValue = (key: string) => {
  try {
    if (isValidStorage && JSON.parse(window.localStorage.getItem('mongodb-docs') || '{}')) {
      const docsObj = JSON.parse(window.localStorage.getItem('mongodb-docs') || '{}');
      if (docsObj) {
        return docsObj[key];
      }
    }
    return undefined;
  } catch {
    console.error('Error getting localStorage value');
    return undefined;
  }
};
