import Versions from "../versions";

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = ["v1.13", "v1.14", "v1.15"];
const deprecatedVersions = ["v1.12"];
const namedVersions = new Map<string, string>([
  ["v1.15", "current"],
  ["v1.16", "upcoming"],
]);

const kafkaConnectorVersions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default kafkaConnectorVersions;
