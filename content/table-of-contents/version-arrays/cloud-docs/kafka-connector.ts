import Versions from '../versions';

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = ['v1.13', 'v1.14', 'v1.15', 'v1.16', 'v2.0'];
const deprecatedVersions = ['v1.12'];
const namedVersions = new Map<string, string>([
  ['v2.0', 'current'],
  ['v2.1', 'upcoming'],
]);

const kafkaConnectorVersions = new Versions(
  allVersions,
  deprecatedVersions,
  namedVersions,
);

export default kafkaConnectorVersions;
