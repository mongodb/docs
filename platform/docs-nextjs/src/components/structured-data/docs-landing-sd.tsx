import { DOTCOM_BASE_URL, DOTCOM_BASE_PREFIX } from '@/constants';
const BASE_URL = `${DOTCOM_BASE_URL}/${DOTCOM_BASE_PREFIX}`;

import { STRUCTURED_DATA_CLASSNAME } from '@/utils/structured-data/structured-data';

const DocsLandingSD = () => {
  const jsonString = JSON.stringify({
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: 'MongoDB Documentation',
    url: BASE_URL,
    publisher: {
      '@type': 'Organization',
      name: 'MongoDB',
      logo: {
        '@type': 'imageObject',
        url: 'https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png',
      },
    },
    author: 'MongoDB Documentation Team',
    inLanguage: 'English',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://mongodb.com/docs/search/?q={search_term_string}&page=1',
      },
      'query-input': 'required name=search_term_string',
    },
  }).replace(/</g, '\\u003c');

  return (
    <script className={STRUCTURED_DATA_CLASSNAME} type="application/ld+json">
      {jsonString}
    </script>
  );
};

export default DocsLandingSD;
