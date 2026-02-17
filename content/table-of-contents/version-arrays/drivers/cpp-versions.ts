import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = ['v3.10', 'v3.11', 'v4.0', 'v4.1', 'v4.2'];
const namedVersions = new Map<string, string>([
  ['v4.1', 'current'],
  ['v4.2', 'upcoming'],
]);

const deprecatedVersions = [''];

const versions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default versions;
