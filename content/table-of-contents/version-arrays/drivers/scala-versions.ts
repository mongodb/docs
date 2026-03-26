import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = ['v4.x', 'v5.x', 'upcoming'];
const namedVersions = new Map<string, string>([['v5.x', 'current']]);
const deprecatedVersions = ['v4.x'];

const versions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default versions;
