import { StructuredData } from './structured-data';

export class WebSiteSd extends StructuredData {
  name: string;
  url: string;
  publisher: object;
  author: string;
  inLanguage: string;
  potentialAction: object;

  constructor() {
    super('WebSite');
    this.name = 'MongoDB Documentation';
    this.url = 'https://www.mongodb.com/docs/';
    this.publisher = {
      '@type': 'Organization',
      name: 'MongoDB',
      logo: {
        '@type': 'ImageObject',
        url: 'https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png',
      },
    };
    this.author = 'MongoDB Documentation Team';
    this.inLanguage = 'English';
    this.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.mongodb.com/docs/site-search/?q={search_term_string}&page=1',
      },
      'query-input': 'required name=search_term_string',
    };
  }
}

export const websiteSd = new WebSiteSd().toString();
