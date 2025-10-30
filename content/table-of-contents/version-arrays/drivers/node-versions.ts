import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = [
  'v6.9',
  'v6.10',
  'v6.11',
  'v6.12',
  'v6.13',
  'v6.14',
  'v6.15',
  'v6.16',
  'v6.17',
  'v6.18',
  'v6.19',
  'v6.20',
];
const namedVersions = new Map<string, string>([
  ['v6.20', 'current'],
  ['v6.21', 'upcoming'],
]);
const deprecatedVersions = ['v6.9'];

const versions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default versions;
