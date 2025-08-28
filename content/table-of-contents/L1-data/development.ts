import type { TocItem } from "../types";

import DatabaseManualData from "../L2-data/database-manual";
import AtlasRealTimeProcessingData from "../L2-data/atlas-real-time-processing";
import ReleaseNotesData from "../L2-data/release-notes";

const tocData: TocItem[] = [
  {
    label: "Database Manual",
    contentSite: "docs",
    group: true,
    versionDropdown: true,
    items: DatabaseManualData
  },
  {
    label: "Atlas Real-Time Processing",
    group: true,
    contentSite: "cloud-docs",
    items: AtlasRealTimeProcessingData
  },
  {
    label: "Release Notes",
    group: true,
    contentSite: "docs",
    items: ReleaseNotesData
  },
];

export default tocData;
