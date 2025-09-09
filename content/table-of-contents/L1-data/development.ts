import type { TocItem } from "../types";

import DatabaseManualData from "../L2-data/database-manual";
import AtlasStreamingData from "../L2-data/atlas-streaming";
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
    label: "Streaming Data",
    group: true,
    contentSite: "cloud-docs",
    items: AtlasStreamingData
  },
  {
    label: "Release Notes",
    group: true,
    contentSite: "docs",
    items: ReleaseNotesData
  },
];

export default tocData;
