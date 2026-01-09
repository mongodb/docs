'use client';

import type { ReactNode } from 'react';
import { useState, createContext, type Dispatch, type SetStateAction } from 'react';
import useActiveHeading from '@/hooks/use-active-heading';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import type { HeadingNode } from '@/types/ast';

export type ActiveSelectorIds = { methodSelector?: string; tab?: string[] };

interface ContentsContextValue {
  activeHeadingId: string | null;
  headingNodes: HeadingNode[];
  showContentsComponent: boolean;
  activeSelectorIds: ActiveSelectorIds;
  setActiveSelectorIds: Dispatch<SetStateAction<ActiveSelectorIds>>;
}

const defaultContextValue: ContentsContextValue = {
  activeHeadingId: null,
  headingNodes: [],
  showContentsComponent: true,
  activeSelectorIds: {},
  setActiveSelectorIds: () => {},
};

const ContentsContext = createContext(defaultContextValue);

const ContentsProvider = ({ children, headingNodes = [] }: { children: ReactNode; headingNodes: HeadingNode[] }) => {
  const activeHeadingId = useActiveHeading(headingNodes);
  const [activeSelectorIds, setActiveSelectorIds] = useState<ActiveSelectorIds>({});

  const { project } = useSnootyMetadata();
  // The guides site is the only site that takes advantage of headings, but never uses the Contents component
  const showContentsComponent = project !== 'guides';

  return (
    <ContentsContext.Provider
      value={{ activeHeadingId, headingNodes, showContentsComponent, activeSelectorIds, setActiveSelectorIds }}
    >
      {children}
    </ContentsContext.Provider>
  );
};

export { ContentsContext, ContentsProvider };
