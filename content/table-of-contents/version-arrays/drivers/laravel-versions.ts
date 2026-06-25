import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = ['v4.x', 'current', 'upcoming'];
const namedVersions = new Map<string, string>([]);
const deprecatedVersions = [''];

const versions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default versions;
