import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = [
  'v1.9',
  'v1.10',
  'v1.11',
  'v1.12',
  'v1.13',
  'v1.14',
  'v1.15',
  'v1.16',
  'v1.17',
];

const deprecatedVersions: string[] = [];
const namedVersions = new Map<string, string>([['v1.17', 'current']]);

const mongosyncVersions = new Versions(
  allVersions,
  deprecatedVersions,
  namedVersions,
);

export default mongosyncVersions;
