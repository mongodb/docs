import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = ['v6.0', 'v7.0', 'v8.0', 'v8.1', 'v8.2', 'v8.3'];
const deprecatedVersions = ['v6.0', 'v8.1'];
const namedVersions = new Map<string, string>([
  ['v8.2', 'manual'],
  ['v8.3', 'upcoming'],
]);

const manualVersions = new Versions(
  allVersions,
  deprecatedVersions,
  namedVersions,
);

export default manualVersions;
