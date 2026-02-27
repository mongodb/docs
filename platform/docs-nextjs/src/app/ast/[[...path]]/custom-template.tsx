import type { ASTDocument } from '@/services/db/pages';
import type { RemoteMetadata, Docset } from '@/types/data';
import ComponentFactory from '@/components/component-factory';
import RootProvider from '@/components/root-provider';
import type { ImageContextType } from '@/context/image-context';
import type { Environments } from '@/utils/env-config';
import { UnifiedSidenav } from '@/components/unified-sidenav/UnifiedSidenav';
import type { BaseTemplateProps } from '@/components/templates';
import {
  ChangelogTemplate,
  DocumentTemplate,
  LandingTemplate,
  OpenAPITemplate,
  InstruqtTemplate,
  BlankTemplate,
  DriversIndexTemplate,
  FeatureNotAvailableTemplate,
} from '@/components/templates';
import ActionBar from '@/components/action-bar';
import layoutStyles from '@/app/layout.module.scss';
import ProductLandingTemplate from '@/components/templates/product-landing';
import type { PageTemplateType } from '@/types/ast';
import type { ServerSideChangelogData } from '@/types/openapi';
import BreadcrumbSd from '@/components/structured-data/breadcrumb-sd';
import Header from '@/components/header';

type TemplateComponent = React.ComponentType<BaseTemplateProps>;

/** given a snooty template option, returns the appropriate template component and boolean flag for rendering the sidenav */
function getTemplate(templateOption: PageTemplateType): {
  Template: TemplateComponent;
  renderSidenav: boolean;
} {
  let Template: TemplateComponent;
  let renderSidenav = false;
  switch (templateOption) {
    case 'document':
      renderSidenav = true;
      Template = DocumentTemplate;
      break;
    case 'product-landing':
      renderSidenav = true;
      Template = ProductLandingTemplate;
      break;
    case 'openapi':
      Template = OpenAPITemplate;
      break;
    case 'changelog':
      Template = ChangelogTemplate;
      renderSidenav = true;
      break;
    case 'instruqt':
      renderSidenav = true;
      Template = InstruqtTemplate;
      break;
    case 'drivers-index':
      renderSidenav = true;
      Template = DriversIndexTemplate;
      break;
    case 'landing':
      Template = LandingTemplate;
      renderSidenav = true;
      break;
    case 'search':
      Template = LandingTemplate;
      renderSidenav = true;
      break;
    case 'blank':
      Template = BlankTemplate;
      break;
    case 'feature-not-avail':
      Template = FeatureNotAvailableTemplate;
      break;
    default:
      console.warn(`Unknown template option: ${templateOption}. Defaulting to DocumentTemplate.`);
      renderSidenav = true;
      Template = DocumentTemplate;
  }

  return { Template, renderSidenav };
}

interface CustomTemplateProps {
  cookies: Record<string, string>;
  pageDoc: ASTDocument;
  docsets: Docset[];
  metadata?: RemoteMetadata;
  assets: ImageContextType;
  changelogData?: ServerSideChangelogData;
  env: Environments;
}

export const CustomTemplate = ({
  cookies,
  pageDoc,
  metadata,
  assets,
  docsets,
  changelogData,
  env,
}: CustomTemplateProps) => {
  const template = pageDoc.ast.options?.template || 'document';
  const { Template, renderSidenav } = getTemplate(pageDoc.ast.options?.template || 'document');
  const slug = pageDoc.filename.split('.')[0];

  const needsBreadcrumbs = template === 'document' || template === undefined;

  return (
    <RootProvider
      cookies={cookies}
      page={pageDoc}
      metadata={metadata}
      assets={assets}
      docsets={docsets}
      env={env}
      changelogData={changelogData}
      template={template}
    >
      {needsBreadcrumbs && <BreadcrumbSd slug={slug} />}
      <Header eol={metadata?.eol ?? false} />
      {renderSidenav && <UnifiedSidenav />}
      <div className={layoutStyles['content-container']}>
        <ActionBar template={template} sidenav={true} />
        <Template pageOptions={pageDoc.ast.options} slug={pageDoc.filename}>
          <ComponentFactory nodeData={pageDoc.ast} slug={pageDoc.page_path} key={pageDoc.page_id} />
        </Template>
      </div>
    </RootProvider>
  );
};
