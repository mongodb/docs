import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions: string[] = [
  'v1.9',
  'v1.10',
  'v1.11',
  'v1.12',
  'v1.13',
  'v1.14',
  'v1.15',
  'v1.16',
  'v1.17',
  'v1.18',
  'v1.19'
];
const deprecatedVersions: string[] = ['v1.9'];

const namedVersions = new Map<string, string>([['v1.19', 'current']]);

const mongosyncVersions = new Versions(
  allVersions,
  deprecatedVersions,
  namedVersions,
);

export default mongosyncVersions;
