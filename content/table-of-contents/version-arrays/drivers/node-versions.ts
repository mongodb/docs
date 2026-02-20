import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = ['v6.x', 'v7.x'];

const namedVersions = new Map<string, string>([['v7.x', 'current']]);

const deprecatedVersions = [''];

const versions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default versions;
