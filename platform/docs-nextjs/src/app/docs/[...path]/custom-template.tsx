import type { ASTDocument } from '@/services/db/pages';
import type { RemoteMetadata, Docset } from '@/types/data';
import ComponentFactory from '@/components/component-factory';
import RootProvider from '@/components/root-provider';
import type { ImageContextType } from '@/context/image-context';
import type { Environments } from '@/utils/env-config';
import type { BaseTemplateProps } from '@/components/templates';
import { DocumentTemplate, OpenAPITemplate } from '@/components/templates';
import ActionBar from '@/components/action-bar';
import layoutStyles from '@/app/layout.module.scss';
import ChangelogTemplate from '@/components/templates/changelog';

type TemplateComponent = React.ComponentType<BaseTemplateProps>;

/** given a snooty template option, returns the appropriate template component and boolean flag for rendering the sidenav */
function getTemplate(templateOption: string): { Template: TemplateComponent; renderSidenav: boolean } {
  let Template;
  let renderSidenav = false;
  switch (templateOption) {
    case 'document':
      renderSidenav = true;
      Template = DocumentTemplate;
      break;
    case 'openapi':
      Template = OpenAPITemplate;
      break;
    case 'changelog':
      Template = ChangelogTemplate;
      renderSidenav = true;
      break;
    default:
      console.warn(`Unknown template option: ${templateOption}. Defaulting to DocumentTemplate.`);
      renderSidenav = true;
      Template = DocumentTemplate;
  }

  return { Template, renderSidenav };
}

interface CustomTemplateProps {
  pageDoc: ASTDocument;
  docsets: Docset[];
  metadata?: RemoteMetadata;
  assets: ImageContextType;
  env: Environments;
}

export const CustomTemplate = ({ pageDoc, metadata, assets, docsets, env }: CustomTemplateProps) => {
  const template = pageDoc.ast.options?.template || 'document';
  const { Template, renderSidenav } = getTemplate(pageDoc.ast.options?.template || 'document');

  return (
    <RootProvider page={pageDoc} metadata={metadata} assets={assets} docsets={docsets} env={env} template={template}>
      {renderSidenav && (
        // TODO: return a sidenav here
        <div
          className={layoutStyles['sidenav-container']}
          style={{
            gridArea: 'sidenav',
            width: '268px',
          }}
        >
          REPLACE WITH SIDENAV
        </div>
      )}
      <div className={layoutStyles['content-container']}>
        <ActionBar template="document" sidenav={true} />
        <Template pageOptions={pageDoc.ast.options} slug={pageDoc.filename}>
          <ComponentFactory nodeData={pageDoc.ast} slug={pageDoc.page_path} key={pageDoc.page_id} />
        </Template>
      </div>
    </RootProvider>
  );
};
