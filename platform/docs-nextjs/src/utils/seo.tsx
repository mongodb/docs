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

const DEFAULT_TWITTER_SITE = '@mongodb';
const metaUrl = `https://www.mongodb.com/docs/assets/meta_generic.png`;

export const getPageMetadata = ({
  pageDoc,
  snootyMetadata,
}: {
  pageDoc: ASTDocument;
  snootyMetadata: DBMetadataDocument;
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

  const { description, robots, keywords, canonical, twitter } = getMetaFromDirective({ rootNode: pageDoc.ast });

  // TODO: after DOP-6293 version context
  // get robots from reposBranches (robots can be from the branch or from page)
  // also get canonical from reposBranches and docset data

  const metadata = {
    metadataBase: new URL(DOTCOM_BASE_URL),
    title,
    alternates: {
      canonical: new URL(DOTCOM_BASE_URL), // see todo above
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
    canonical, // see todo above
    robots,
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
