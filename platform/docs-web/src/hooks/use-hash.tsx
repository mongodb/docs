'use client';

import { useSyncExternalStore } from 'react';

// Dispatched by `navigate` below after a History API write so `useHash` subscribers can
// react to client-side URL changes that don't emit a native `hashchange`.
const LOCATION_CHANGE_EVENT = 'docs:locationchange';

// Subscribe to every browser source that can change the hash:
//   hashchange: native `<a href="#id">` clicks and manual fragment edits.
//   popstate:   browser back/forward.
//   LOCATION_CHANGE_EVENT: History API writes performed through `navigate` (e.g. adding or
//     REMOVING the hash while preserving query params), which don't fire `hashchange`.
function subscribe(onStoreChange: () => void) {
  window.addEventListener('hashchange', onStoreChange);
  window.addEventListener('popstate', onStoreChange);
  window.addEventListener(LOCATION_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener('hashchange', onStoreChange);
    window.removeEventListener('popstate', onStoreChange);
    window.removeEventListener(LOCATION_CHANGE_EVENT, onStoreChange);
  };
}

function getSnapshot() {
  return window.location.hash ?? '';
}

// The hash is never available during SSR; the client reconciles on hydration.
function getServerSnapshot() {
  return '';
}

/**
 * Update the URL via the History API and notify `useHash` subscribers.
 *
 * Use this instead of calling `window.history.{push,replace}State` directly: a query-only
 * write that adds or removes a fragment does not fire a native `hashchange`, so subscribers
 * would otherwise read a stale hash. Dispatching LOCATION_CHANGE_EVENT here keeps React
 * state in sync without globally patching the browser's History API.
 *
 * Next.js App Router intentionally has no primitive for mutating only the hash/query
 * without a route navigation (`router.replace` re-runs server components and controls
 * scroll), so a raw History write is the appropriate tool for shareable in-page state.
 */
export function navigate(url: string, { replace = false }: { replace?: boolean } = {}) {
  if (typeof window === 'undefined') {
    return;
  }
  if (replace) {
    window.history.replaceState(null, '', url);
  } else {
    window.history.pushState(null, '', url);
  }
  window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));
}

/**
 * Custom hook to get the current URL hash fragment.
 * @returns The current hash string (including the # symbol)
 */
export const useHash = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
