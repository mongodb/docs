import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = ['v2.x', 'v3.x'];
const namedVersions = new Map<string, string>([['v3.x', 'current']]);
const deprecatedVersions = [''];

const versions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default versions;
