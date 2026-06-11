import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = [
  'v8.0',
  'v8.1',
  'v8.2',
  'v8.3',
  'v8.4',
  'v9.0',
  'v9.1',
  'current',
  'upcoming',
];
const deprecatedVersions: string[] = [];
const namedVersions = new Map<string, string>();

const versions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default versions;
