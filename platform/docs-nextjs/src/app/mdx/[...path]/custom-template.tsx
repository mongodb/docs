import type { RemoteMetadata, Docset } from '@/types/data';
import { Providers } from './Providers';
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

interface MDXFrontmatter {
  template?: PageTemplateType;
  options?: Record<string, unknown>;
  [key: string]: unknown;
}

interface CustomTemplateProps {
  content: React.ReactNode;
  frontmatter?: MDXFrontmatter;
  path: string[];
  metadata: RemoteMetadata;
}

export const CustomTemplate = ({ content, frontmatter, path, metadata }: CustomTemplateProps) => {
  const template = (frontmatter?.template as PageTemplateType) || 'document';
  const { Template, renderSidenav } = getTemplate(template);
  const slug = path.join('/');
  const pageOptions = {
    template,
    ...(frontmatter?.options || {}),
  };

  return (
    <Providers metadata={metadata}>
      <Header eol={metadata?.eol ?? false} />
      {renderSidenav && <UnifiedSidenav />}
      <div className={layoutStyles['content-container']}>
        <ActionBar template={template} sidenav={true} />
        <Template pageOptions={pageOptions} slug={slug}>
          {content}
        </Template>
      </div>
    </Providers>
  );
};
