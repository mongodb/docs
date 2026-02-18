import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import type { Root } from '@/types/ast';

export type PageTemplateType =
  | 'blank'
  | 'drivers-index'
  | 'document'
  | 'errorpage'
  | 'feature-not-avail'
  | 'instruqt'
  | 'landing'
  | 'openapi'
  | 'changelog'
  | 'search'
  | 'guide'
  | 'product-landing';

export interface PageContextType {
  fileId?: string;
  template: PageTemplateType | null;
  slug: string;
  tabsMainColumn: boolean | null;
  hasBanner: boolean;
  setHasBanner: (hasBanner: boolean) => void;
  options: Root['options'] | null;
}

export const PageContext = createContext<PageContextType>({
  template: null,
  slug: '',
  tabsMainColumn: null,
  hasBanner: false,
  setHasBanner: () => {},
  options: null,
});

export type PageContextProviderProps = {
  children: ReactNode;
  fileId?: string;
  template: PageTemplateType | null;
  slug: string;
  tabsMainColumn: boolean | null;
  options: Root['options'] | null;
};

export const PageContextProvider = ({
  children,
  fileId,
  template,
  slug,
  tabsMainColumn,
  options,
}: PageContextProviderProps) => {
  const [hasBanner, setHasBanner] = useState(false);

  return (
    <PageContext.Provider value={{ fileId, template, slug, tabsMainColumn, options, hasBanner, setHasBanner }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  return useContext(PageContext);
};
