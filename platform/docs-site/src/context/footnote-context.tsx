'use client';

import { createContext, useContext, useRef, useCallback, type RefObject, type MutableRefObject } from 'react';

/** Reduces a footnote name to characters that are safe in a DOM id / URL fragment. */
const sanitizeName = (name: string): string => name.replace(/[^a-zA-Z0-9_-]/g, '-');

/**
 * Fallback ID allocator for footnotes and references that carry no `name`. Such nodes
 * can't be paired with anything, so a render-order counter is sufficient. IDs are
 * prefixed to keep them out of the namespace used by name-derived IDs.
 */
const getOrCreateId = (
  stableId: string,
  mapRef: RefObject<Map<string, number>>,
  counterRef: MutableRefObject<number>,
): string => {
  const existing = mapRef.current!.get(stableId);
  if (existing !== undefined) return `anon-${existing}`;
  const id = counterRef.current++;
  mapRef.current!.set(stableId, id);
  return `anon-${id}`;
};

interface FootnoteEntry {
  label: number;
  refIds: string[];
}

interface ReferenceResult {
  label: number;
  refId: string;
}

interface FootnoteContextType {
  getOrCreateRefId: (stableId: string, name?: string) => string;
  getOrCreateFootnoteId: (stableId: string, name?: string) => string;
  registerFootnote: (id: string) => number;
  registerReference: (stableId: string, footnoteId: string, preferredRefId?: string) => ReferenceResult;
  getFootnoteData: (id: string) => FootnoteEntry | undefined;
}

const FootnoteContext = createContext<FootnoteContextType | null>(null);

export const useFootnoteContext = () => {
  const context = useContext(FootnoteContext);
  if (!context) throw new Error('useFootnoteContext must be used within a FootnoteProvider');
  return context;
};

interface FootnoteProviderProps {
  children: React.ReactNode;
}

export const FootnoteProvider = ({ children }: FootnoteProviderProps) => {
  // Maps each footnote ID to its display number (e.g. [1]) and the anchor IDs of all references that link to it
  const footnotes = useRef<Map<string, FootnoteEntry>>(new Map());
  // Tracks how many references point to each footnote (for unique back-link anchors like ref-1-1, ref-1-2)
  const refCounters = useRef<Map<string, number>>(new Map());
  // Caches registerReference results to prevent double-registration on re-render
  const registeredRefs = useRef<Map<string, ReferenceResult>>(new Map());
  // Sequential counter for footnote display labels (1, 2, 3…)
  const currentFootnoteNumber = useRef(1);

  // Dedup maps for *unnamed* footnotes/references only. These carry no AST identity, so the
  // two sides can only be paired positionally: the Nth unnamed reference to the Nth unnamed
  // footnote. That requires the parallel counters kept below.
  const refIdByStableId = useRef<Map<string, number>>(new Map());
  const footnoteIdByStableId = useRef<Map<string, number>>(new Map());
  const nextRefId = useRef(1);
  const nextFootnoteId = useRef(1);

  // A *named* footnote and the references pointing at it are paired by `name`, which comes
  // from the AST and is identical on both sides. Deriving the ID from the name rather than
  // from a render-order counter keeps the pairing correct even when one side never renders
  // — e.g. a <FootnoteReference> inside an unselected <ComposableContent>.
  const getOrCreateRefId = useCallback((stableId: string, name?: string) => {
    if (name !== undefined) return sanitizeName(name);
    return getOrCreateId(stableId, refIdByStableId, nextRefId);
  }, []);

  const getOrCreateFootnoteId = useCallback((stableId: string, name?: string) => {
    if (name !== undefined) return sanitizeName(name);
    return getOrCreateId(stableId, footnoteIdByStableId, nextFootnoteId);
  }, []);

  const registerFootnote = useCallback((id: string): number => {
    if (footnotes.current.has(id)) {
      return footnotes.current.get(id)!.label;
    }
    const label = currentFootnoteNumber.current++;
    footnotes.current.set(id, { label, refIds: [] });
    return label;
  }, []);

  const registerReference = useCallback(
    (stableId: string, footnoteId: string, preferredRefId?: string): ReferenceResult => {
      const cached = registeredRefs.current.get(stableId);
      if (cached) return cached;

      // Prefer the anchor derived from the parser-assigned node id, which is unique per
      // occurrence and independent of render order. Only fall back to a counter for MDX
      // generated before the converter began emitting `id`.
      let refId = preferredRefId;
      if (!refId) {
        const count = (refCounters.current.get(footnoteId) ?? 0) + 1;
        refCounters.current.set(footnoteId, count);
        refId = `ref-${footnoteId}-${count}`;
      }

      const entry = footnotes.current.get(footnoteId);
      if (entry) {
        entry.refIds.push(refId);
      } else {
        const label = currentFootnoteNumber.current++;
        footnotes.current.set(footnoteId, { label, refIds: [refId] });
      }

      const label = footnotes.current.get(footnoteId)!.label;
      const result: ReferenceResult = { label, refId };
      registeredRefs.current.set(stableId, result);
      return result;
    },
    [],
  );

  const getFootnoteData = useCallback((id: string): FootnoteEntry | undefined => {
    return footnotes.current.get(id);
  }, []);

  return (
    <FootnoteContext.Provider
      value={{ getOrCreateRefId, getOrCreateFootnoteId, registerFootnote, registerReference, getFootnoteData }}
    >
      {children}
    </FootnoteContext.Provider>
  );
};
