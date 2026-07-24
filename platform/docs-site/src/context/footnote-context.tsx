'use client';

import { createContext, useContext, useRef, useCallback, type RefObject, type MutableRefObject } from 'react';

const getOrCreateId = (
  stableId: string,
  mapRef: RefObject<Map<string, number>>,
  counterRef: MutableRefObject<number>,
): string => {
  const existing = mapRef.current!.get(stableId);
  if (existing !== undefined) return existing.toString();
  const id = counterRef.current++;
  mapRef.current!.set(stableId, id);
  return id.toString();
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
  registerReference: (stableId: string, footnoteId: string) => ReferenceResult;
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

  // Dedup map: ensures a FootnoteReference gets the same ID across re-renders
  const refIdByStableId = useRef<Map<string, number>>(new Map());
  // Dedup map: ensures a Footnote gets the same ID across re-renders
  const footnoteIdByStableId = useRef<Map<string, number>>(new Map());
  // Next numeric ID for FootnoteReference dedup
  const nextRefId = useRef(1);
  const nextFootnoteId = useRef(1);

  const getOrCreateRefId = useCallback((stableId: string, name?: string) => {
    const key = name !== undefined ? `name:${name}` : stableId;
    return getOrCreateId(key, refIdByStableId, nextRefId);
  }, []);

  const getOrCreateFootnoteId = useCallback((stableId: string, name?: string) => {
    const key = name !== undefined ? `name:${name}` : stableId;
    return getOrCreateId(key, footnoteIdByStableId, nextFootnoteId);
  }, []);

  const registerFootnote = useCallback((id: string): number => {
    if (footnotes.current.has(id)) {
      return footnotes.current.get(id)!.label;
    }
    const label = currentFootnoteNumber.current++;
    footnotes.current.set(id, { label, refIds: [] });
    return label;
  }, []);

  const registerReference = useCallback((stableId: string, footnoteId: string): ReferenceResult => {
    const cached = registeredRefs.current.get(stableId);
    if (cached) return cached;

    const count = (refCounters.current.get(footnoteId) ?? 0) + 1;
    refCounters.current.set(footnoteId, count);
    const refId = `ref-${footnoteId}-${count}`;

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
  }, []);

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
