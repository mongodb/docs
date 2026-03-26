import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = ['v5.x', 'upcoming'];
const namedVersions = new Map<string, string>([['v5.x', 'current']]);
const deprecatedVersions = ['v4.10', 'v4.11'];

const versions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default versions;
