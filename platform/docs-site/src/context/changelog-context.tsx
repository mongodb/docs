import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import type { ServerSideChangelogData } from '@/types/openapi';

const ChangelogDataContext = createContext<ServerSideChangelogData | undefined>(undefined);

export const ChangelogDataProvider = ({
  children,
  changelogData,
}: {
  children: ReactNode;
  changelogData?: ServerSideChangelogData;
}) => <ChangelogDataContext.Provider value={changelogData}>{children}</ChangelogDataContext.Provider>;

export const useChangelogData = () => {
  const context = useContext(ChangelogDataContext);
  if (context === undefined) {
    throw new Error('useChangelogData must be used within a ChangelogDataProvider');
  }
  return context;
};
