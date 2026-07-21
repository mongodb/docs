import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
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
  options: Root['options'] | null;
}

export const PageContext = createContext<PageContextType>({
  template: null,
  slug: '',
  tabsMainColumn: null,
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
  return (
    <PageContext.Provider value={{ fileId, template, slug, tabsMainColumn, options }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  return useContext(PageContext);
};
