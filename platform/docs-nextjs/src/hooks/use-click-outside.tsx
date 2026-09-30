import { useEffect } from 'react';

/**
 * This hook fires an onClickOutside handler if all of the given node refs are
 * clicked outside of, or the escape key is pressed.
 * @param {*} refs an array of node refs, all of which must be clicked outside
 * of for the handler to fire. Accepting more than one ref lets a caller cover
 * content that's portaled elsewhere in the DOM (e.g. a modal rendered via
 * createPortal) alongside its own container.
 * @param {*} onClickOutside a callback handler
 */
export default function useClickOutside(refs: React.RefObject<HTMLElement>[], onClickOutside: () => void) {
  useEffect(() => {
    const isOutsideAll = (target: Node) => refs.every((ref) => !ref.current || !ref.current.contains(target));
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Node && isOutsideAll(e.target)) {
        onClickOutside();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      e = e || window.event;
      if (e.key === 'Escape') {
        onClickOutside();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    // Cannot handle ESC on FF https://bugzilla.mozilla.org/show_bug.cgi?id=1443758
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [refs, onClickOutside]);
}
