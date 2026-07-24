'use client';

import type { ReactNode } from 'react';
import { useMemo, useState, createContext, type Dispatch, type SetStateAction } from 'react';
import Slugger from 'github-slugger';
import useActiveHeading from '@/hooks/use-active-heading';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import type { HeadingOption, TextNode } from '@/types/ast';

export type ActiveSelectorIds = { methodSelector?: string; tab?: string[]; composable?: string };

interface ContentsContextValue {
  activeHeadingId: string | null;
  headingNodes: HeadingOption[];
  showContentsComponent: boolean;
  activeSelectorIds: ActiveSelectorIds;
  setActiveSelectorIds: Dispatch<SetStateAction<ActiveSelectorIds>>;
  slugger: Slugger;
}

const defaultContextValue: ContentsContextValue = {
  activeHeadingId: null,
  headingNodes: [],
  showContentsComponent: true,
  activeSelectorIds: {},
  setActiveSelectorIds: () => {},
  slugger: new Slugger(),
};

const ContentsContext = createContext(defaultContextValue);

export function extractPlainText(nodes: TextNode[]): string {
  return nodes
    .map((node) => {
      if ('value' in node) return (node as TextNode).value ?? '';
      if ('children' in node && Array.isArray((node as unknown as { children: TextNode[] }).children)) {
        return extractPlainText((node as unknown as { children: TextNode[] }).children);
      }
      return '';
    })
    .join('');
}

const ContentsProvider = ({ children, headingNodes }: { children: ReactNode; headingNodes: HeadingOption[] }) => {
  const [activeSelectorIds, setActiveSelectorIds] = useState<ActiveSelectorIds>({});

  // Both sluggers are fresh per page (re-created when headingNodes changes on navigation).
  // tocSlugger normalizes Snooty IDs to match github-slugger output for ToC links.
  // headingSlugger is given to Heading components so their Permalink IDs are generated
  // from the same fresh state, keeping ToC links and heading anchors in sync.
  const normalizedHeadingNodes = useMemo(() => {
    const tocSlugger = new Slugger();
    return headingNodes.map((node) => ({
      ...node,
      id: tocSlugger.slug(extractPlainText(node.title)),
    }));
    // activeSelectorIds.composable is included so the IntersectionObserver
    // re-runs after ComposableTutorial sets its initial selections and the
    // composable heading elements first appear in the DOM.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headingNodes, activeSelectorIds.composable]);

  // headingNodes is listed as a dep so this resets on page navigation even though
  // the factory doesn't consume it directly.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headingSlugger = useMemo(() => new Slugger(), [headingNodes]);

  const activeHeadingId = useActiveHeading(normalizedHeadingNodes);

  const { project } = useSnootyMetadata();
  // The guides site is the only site that takes advantage of headings, but never uses the Contents component
  const showContentsComponent = project !== 'guides';

  return (
    <ContentsContext.Provider
      value={{
        activeHeadingId,
        headingNodes: normalizedHeadingNodes,
        showContentsComponent,
        activeSelectorIds,
        setActiveSelectorIds,
        slugger: headingSlugger,
      }}
    >
      {children}
    </ContentsContext.Provider>
  );
};

export { ContentsContext, ContentsProvider };
