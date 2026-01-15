import VoyageApiReferenceData from '../L2-data/voyage-api-reference';

import VoyageGetStartedData from '../L2-data/voyage-get-started';
import VoyageManageDeployData from '../L2-data/voyage-manage-deploy';
import VoyageModelsData from '../L2-data/voyage-models';
import VoyageTutorialsData from '../L2-data/voyage-tutorials';
import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'GET STARTED',
    contentSite: 'voyageai',
    group: true,
    items: VoyageGetStartedData,
  },
  {
    label: 'MODELS',
    contentSite: 'voyageai',
    group: true,
    items: VoyageModelsData,
  },
  {
    label: 'TUTORIALS',
    contentSite: 'voyageai',
    group: true,
    items: VoyageTutorialsData,
  },
  {
    label: 'MANAGE & DEPLOY',
    contentSite: 'voyageai',
    group: true,
    items: VoyageManageDeployData,
  },
  {
    label: 'API REFERENCE',
    contentSite: 'voyageai',
    group: true,
    items: VoyageApiReferenceData,
  },
];

export default tocData;
