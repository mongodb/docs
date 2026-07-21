import { useCallback } from 'react';

/**
 * Handles merging multiple refs into a single ref.
 *
 * Useful for when a component may have a ref on a child element but
 * also needs to allow a ref to be specified outside the component as well.
 */
export const useMergedRef = <RefType>(...refs: (React.Ref<RefType> | undefined)[]) => {
  return useCallback((node: RefType | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<RefType | null>).current = node;
      }
    }
  }, refs);
};
