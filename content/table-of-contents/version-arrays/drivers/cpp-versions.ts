import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = ['v3.x', 'v4.x'];
const namedVersions = new Map<string, string>([['v4.x', 'current']]);

const deprecatedVersions = [''];

const versions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default versions;
