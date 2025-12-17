import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = [
  'v2.19',
  'v2.20',
  'v2.21',
  'v2.22',
  'v2.23',
  'v2.24',
  'v2.25',
  'v2.26',
  'v2.27',
  'v2.28',
  'v2.29',
  'v2.30',
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
const deprecatedVersions = [
  'v2.19',
  'v2.20',
  'v2.21',
  'v2.22',
  'v2.23',
  'v2.24',
  'v2.25',
  'v2.26',
  'v2.27',
  'v2.28',
  'v2.29',
];

const versions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default versions;
