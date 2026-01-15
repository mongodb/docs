import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = [
  'v2.7',
  'v2.8',
  'v3.0',
  'v3.1',
  'v3.2',
  'v3.3',
  'v3.4',
  'v3.5',
  'v3.6',
];
const namedVersions = new Map<string, string>([
  ['v3.5', 'current'],
  ['v3.6', 'upcoming'],
]);
const deprecatedVersions = [''];

const versions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default versions;
