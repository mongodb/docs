import { DOTCOM_BASE_URL } from '@/constants';
import type { ASTDocument } from '@/services/db/pages';
import type { DBMetadataDocument } from '@/services/db/snooty-metadata';
import type { TextNode } from '@/types/ast';
import { getSiteTitle } from '@/utils/get-site-title';
import { getPlaintext } from '@/utils/get-plaintext';
import { getNestedValue } from '@/utils/get-nested-value';
import { getLocaleMapping } from '@/utils/locale';
import { getMetaFromDirective } from '@/utils/get-meta-from-directive';
import { assertLeadingSlash } from '@/utils/assert-leading-slash';
import type { Docset, RemoteMetadata } from '@/types/data';
import { assertTrailingSlash } from './assert-trailing-slash';
import { normalizePath } from './normalize-path';
import type { Environments } from './env-config';
import { generateVersionedPrefix } from './generate-versioned-prefix';

const DEFAULT_TWITTER_SITE = '@mongodb';
const metaUrl = `https://www.mongodb.com/docs/assets/meta_generic.png`;

export const getPageMetadata = ({
  pageDoc,
  snootyMetadata,
  docset,
}: {
  pageDoc: ASTDocument;
  snootyMetadata: DBMetadataDocument;
  docset: Docset;
}) => {
  const slug = pageDoc.filename.split('.')[0];
  const lookup = slug === '/' ? 'index' : slug;
  const pageTitle = getPlaintext(getNestedValue(['slugToTitle', lookup], snootyMetadata) as TextNode[]);
  const template = pageDoc.ast?.options?.template;

  const siteTitle = getSiteTitle(snootyMetadata);
  const showDocsLandingTitle = snootyMetadata.project === 'landing' && template === 'landing' && slug === '/';

  const title =
    !siteTitle && !pageTitle
      ? 'MongoDB Documentation'
      : showDocsLandingTitle
      ? 'MongoDB Documentation - Homepage'
      : `${pageTitle ? `${pageTitle} - ` : ''}${siteTitle} - MongoDB Docs`;

  const {
    description,
    robots,
    keywords,
    canonical: metaCanonical,
    twitter,
  } = getMetaFromDirective({ rootNode: pageDoc.ast });

  // Retrieves the canonical URL based on certain situations
  // i.e. eol'd, non-eol'd, snooty.toml or ..metadata:: directive (highest priority)
  const canonical = getCanonicalUrl({ metadata: snootyMetadata, metaCanonical, docset, slug });
  const noIndexing = docset.branches.find((br) => br.gitBranchName === snootyMetadata.branch)?.noIndexing ?? false;
  const nosnippet = !!robots?.includes('nosnippet');
  const noindex = !noIndexing || !!robots?.includes('noindex');

  const metadata = {
    metadataBase: new URL(DOTCOM_BASE_URL),
    title,
    alternates: {
      canonical,
      // Note: languages are handled separately with custom className via getLocaleLinks
    },
    twitter: {
      card: 'summary_large_image',
      site: twitter.site ?? DEFAULT_TWITTER_SITE,
      title: twitter.title ?? title,
      image: twitter.image ?? metaUrl,
      imageAlt: twitter['image-alt'] ?? 'MongoDB logo featuring a green leaf on a dark green background.',
    },
    openGraph: {
      title,
      url: new URL(DOTCOM_BASE_URL), // see todo above
      images: [
        {
          url: metaUrl,
          alt: 'MongoDB logo featuring a green leaf on a dark green background.',
        },
      ],
      type: 'website',
    },
    description,
    keywords,
    canonical,
    robots: {
      index: !noindex,
      nosnippet,
    },
  };

  return metadata;
};

// Generate locale links with custom className for Smartling
export const getLocaleLinks = (pageDoc: ASTDocument) => {
  // Do not remove class. This is used to prevent Smartling from potentially overwriting these links
  const smartlingNoRewriteClass = 'sl_opaque';

  const localeHrefMap = getLocaleMapping(DOTCOM_BASE_URL, assertLeadingSlash(pageDoc.page_path));

  const hrefLangLinks = Object.entries(localeHrefMap).map(([localeCode, href]) => {
    return (
      <link key={localeCode} className={smartlingNoRewriteClass} rel="alternate" hrefLang={localeCode} href={href} />
    );
  });

  const englishHref = localeHrefMap['en-us'] as string;
  if (englishHref) {
    hrefLangLinks.push(
      <link
        key="x-default"
        className={smartlingNoRewriteClass}
        rel="alternate"
        hrefLang="x-default"
        href={englishHref}
      />,
    );
  }

  return hrefLangLinks;
};

const getCanonicalUrl = ({
  metadata,
  metaCanonical,
  docset,
  slug,
}: {
  metadata: RemoteMetadata;
  metaCanonical?: string;
  docset: Docset;
  slug: string;
}) => {
  // Check to see if the canonical is provided from the meta directive
  if (metaCanonical) {
    // a canonical from a directive is highest ranked
    return metaCanonical;
  }

  const urlSlug =
    docset.branches.find((branch) => branch.gitBranchName === metadata.branch)?.urlSlug ?? metadata.branch;
  const env = (process.env.DB_ENV ?? 'dev') as Environments;
  const siteBasePrefix = docset.prefix[getRepoBranchesPrefixEnv(env)];
  const pathPrefix = generateVersionedPrefix(siteBasePrefix, urlSlug);

  // Use default logic assuming there is no canonical provided from the meta directive
  let canonical = `${DOTCOM_BASE_URL}${normalizePath(`${pathPrefix}/${slug === '/' ? '' : slug}`)}`;

  // else we check for EOL
  if (metadata.eol && metadata.canonical) {
    // if a canonical is provided by the writers
    canonical = metadata.canonical;
  }

  canonical = assertTrailingSlash(canonical);
  return canonical.toLowerCase();
};

export const getRepoBranchesPrefixEnv = (env: Environments) => {
  switch (env) {
    case 'dotcomprd':
      return 'dotcomprd';
    case 'production':
      return 'prd';
    case 'dev':
    case 'dotcomstg':
    default:
      return 'dotcomstg';
  }
};
