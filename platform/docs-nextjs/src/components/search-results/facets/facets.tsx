'use client';

import type { FacetOption } from '@/types/data';
import FacetGroup from './facet-group';

const Facets = ({ facets }: { facets: Array<FacetOption> }) => {
  return (
    <div data-testid="facets-container">
      {facets?.length > 0 &&
        facets.map((facetOption) => {
          return <FacetGroup key={facetOption.id} facetOption={facetOption} />;
        })}
    </div>
  );
};

export default Facets;
