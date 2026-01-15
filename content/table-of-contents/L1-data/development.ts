import DatabaseManualData from "../L2-data/database-manual";
import AtlasStreamingData from "../L2-data/atlas-streaming";
import AIMLData from "../L2-data/ai-ml";
import ReleaseNotesData from "../L2-data/release-notes";
import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Database Manual',
    contentSite: 'docs',
    group: true,
    versionDropdown: true,
    items: DatabaseManualData,
  },
  {
    label: "Build AI Applications",
    contentSite: "docs",
    group: true,
    items: AIMLData
  },
  {
    label: 'Streaming Data',
    group: true,
    contentSite: 'cloud-docs',
    items: AtlasStreamingData,
  },
  {
    label: 'Release Notes',
    group: true,
    contentSite: 'docs',
    items: ReleaseNotesData,
  },
];

export default tocData;
