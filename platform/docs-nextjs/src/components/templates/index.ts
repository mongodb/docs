import BlankTemplate from './blank';
import type { ReactNode } from 'react';
import DocumentTemplate from './document';
import DriversIndexTemplate from './drivers-index';
import InstruqtTemplate from './instruqt';
import LandingTemplate from './landing';
// import NotFoundTemplate from './NotFound';
// import FeatureNotAvailableTemplate from './FeatureNotAvailable';
import OpenAPITemplate from './openapi';
import type { Root } from '@/types/ast';
// import ProductLandingTemplate from './product-landing';
// import ChangelogTemplate from './changelog';

export type BaseTemplateProps = {
  children: ReactNode;
  slug: string;
  pageOptions?: Root['options'];
  // useChatbot: boolean;
};

export {
  BlankTemplate,
  DocumentTemplate,
  DriversIndexTemplate,
  InstruqtTemplate,
  LandingTemplate,
  // NotFoundTemplate,
  // FeatureNotAvailableTemplate,
  OpenAPITemplate,
  // ProductLandingTemplate,
  // ChangelogTemplate,
};
