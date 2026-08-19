import { Providers } from './Providers';
import { UnifiedSidenav } from '@/mdx-components/UnifiedSidenav';
import type { BaseTemplateProps } from '@/templates';
import type { RemoteMetadata, ClientSiteMetadata, Docset } from '@/types/data';
import type { Environments } from '@/utils/env-config';
import {
  ChangelogTemplate,
  DocumentTemplate,
  LandingTemplate,
  InstruqtTemplate,
  BlankTemplate,
  DriversIndexTemplate,
  FeatureNotAvailableTemplate,
  ProductLandingTemplate,
} from '@/templates';
import { ActionBar } from '@/mdx-components/ActionBar';
import layoutStyles from '@/app/layout.module.scss';
import type { MDXFrontmatter, PageTemplateType } from '@/types/ast';
import { Header } from '@/mdx-components/Header';
import type { ServerSideChangelogData } from '@/types/openapi';
import { getAvailableLanguages } from '@/utils/locale';
import { LocaleHreflangScript } from '@/mdx-utils/locale-hreflang-script';
import { WebVitalsRoute } from '@/mdx-components/WebVitalsRoute';

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

// lookupKeys covers both slugToTitle key variants used across consumers (fileId-derived and page-context-slug-derived).
const selectClientMetadata = (metadata: RemoteMetadata, lookupKeys: string[]): ClientSiteMetadata => {
  const slugToTitle: RemoteMetadata['slugToTitle'] = {};
  for (const key of lookupKeys) {
    if (metadata.slugToTitle?.[key]) {
      slugToTitle[key] = metadata.slugToTitle[key];
    }
  }
  return {
    project: metadata.project,
    branch: metadata.branch,
    eol: metadata.eol,
    openapi_pages: metadata.openapi_pages,
    slugToTitle,
  };
};

interface CustomTemplateProps {
  content: React.ReactNode;
  frontmatter: MDXFrontmatter;
  path: string[];
  metadata: RemoteMetadata;
  docsets: Docset[];
  changelogData?: ServerSideChangelogData;
  env: Environments;
}

export const CustomTemplate = ({
  content,
  frontmatter,
  path,
  changelogData,
  metadata,
  docsets,
  env,
}: CustomTemplateProps) => {
  const template = (frontmatter.template || 'document') as PageTemplateType;
  const { Template, renderSidenav } = getTemplate(template);
  // Prepend 'docs/' so the slug matches TOC node URLs (which use the 'docs/<project>/...' format).
  // The MDX route's URL params don't include the 'docs/' segment.
  // Strip locale prefix if present (e.g. ['zh-cn', 'atlas', '...']) — Smartling-translated pages
  // can trigger a client-side RSC re-fetch with the locale code as the first path segment.
  const localeSet = new Set<string>(getAvailableLanguages(true).map((l) => l.localeCode));
  let slugPath = path;
  if (localeSet.has(path[0])) {
    slugPath = path.slice(1);
    // CDN rewrites can leave 'docs' as the next segment (e.g. ['ko-kr','docs','atlas','...'])
    if (slugPath[0] === 'docs') {
      slugPath = slugPath.slice(1);
    }
  }
  const slug = `docs/${slugPath.join('/')}`;
  const pageOptions = {
    template,
    ...(frontmatter.options || {}),
  };

  const fileIdSlug = (frontmatter.fileId ?? '').split('.')[0];
  const clientMetadata = selectClientMetadata(metadata, [
    fileIdSlug === '/' ? 'index' : fileIdSlug,
    slug === '/' ? 'index' : slug,
  ]);

  return (
    <>
      <LocaleHreflangScript slug={slug} />
      <WebVitalsRoute template={template} slug={slug} />
      <Providers
        metadata={clientMetadata}
        frontmatter={frontmatter}
        slug={slug}
        template={template}
        docsets={docsets}
        changelogData={changelogData}
        env={env}
      >
        <Header eol={metadata?.eol ?? false} />
        <div className={layoutStyles['content-container']}>
          <ActionBar template={template} sidenav={renderSidenav} />
          <Template pageOptions={pageOptions} slug={slug}>
            {content}
          </Template>
        </div>
        {renderSidenav && <UnifiedSidenav />}
      </Providers>
    </>
  );
};
