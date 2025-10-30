import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = [
  'v4.10',
  'v4.11',
  'v5.0',
  'v5.1',
  'v5.2',
  'v5.3',
  'v5.4',
  'v5.5',
  'v5.6',
  'v5.7',
];
const namedVersions = new Map<string, string>([
  ['v5.6', 'current'],
  ['v5.7', 'upcoming'],
]);
const deprecatedVersions = ['v4.10', 'v4.11', 'v5.0'];

const versions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default versions;
