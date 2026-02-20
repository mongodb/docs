import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = ['v5.x'];
const namedVersions = new Map<string, string>([['v5.6', 'current']]);
const deprecatedVersions = [''];

const versions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default versions;
