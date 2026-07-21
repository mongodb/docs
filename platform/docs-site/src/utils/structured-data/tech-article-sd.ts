import type { PageFacet } from '@/types/data';
import { StructuredData } from './structured-data';

class TechArticleSd extends StructuredData {
  author: { '@type': 'Organization'; name: 'MongoDB Documentation Team' };
  headline: string;
  mainEntity: SoftwareApplication[];
  genre: string[] | undefined;

  constructor({
    headline,
    mainEntity,
    genre,
  }: {
    headline: string;
    mainEntity: SoftwareApplication[];
    genre?: string[];
  }) {
    super('TechArticle');

    this.author = {
      '@type': 'Organization',
      name: 'MongoDB Documentation Team',
    };
    this.headline = headline;
    this.mainEntity = mainEntity;
    if (genre) {
      this.genre = genre;
    }
  }
}

interface SoftwareApplication {
  '@type': 'SoftwareApplication';
  name: string;
  applicationCategory: string;
  offers: {
    price: number;
    priceCurrency: string;
  };
}

interface TechArticleProps {
  mainEntity: SoftwareApplication[];
  headline: string;
  genre?: string[];
}

/**
 * get TechArticle Structured Data from page facets and pageTitle.
 */
export const constructTechArticle = ({ facets, pageTitle }: { facets: PageFacet[]; pageTitle: string }) => {
  const techArticleProps: TechArticleProps = {
    mainEntity: getTargetProductsNames(facets).map((name: string) => ({
      '@type': 'SoftwareApplication',
      name: StructuredData.addCompanyToName(name) as string,
      applicationCategory: 'DeveloperApplication',
      offers: {
        price: 0,
        priceCurrency: 'USD',
      },
    })),
    headline: pageTitle,
  };

  const genres = getGenreNames(facets);
  if (genres.length) {
    techArticleProps['genre'] = genres;
  }

  return new TechArticleSd(techArticleProps);
};

// get display name from facets
function getDisplayName(facet: PageFacet): string {
  return facet.display_name;
}

// extract genre facets
function getGenreNames(facets: PageFacet[]): string[] {
  return facets?.filter((facet) => facet.category === 'genre').map(getDisplayName) || [];
}

// extract target product facets
function getTargetProductsNames(facets: PageFacet[]) {
  // TODO: these products and sub products need version data from facets
  // https://jira.mongodb.org/browse/DOP-5037
  let res: string[] = [];
  const productFacets = facets?.filter((facet) => facet.category === 'target_product') || [];
  for (let index = 0; index < productFacets.length; index++) {
    const productFacet = productFacets[index];
    const subProducts =
      productFacet.sub_facets?.filter((facet) => facet.category === 'sub_product').map(getDisplayName) || [];
    if (subProducts.length) {
      res = res.concat(subProducts);
    } else {
      res.push(getDisplayName(productFacet));
    }
  }

  return res;
}
