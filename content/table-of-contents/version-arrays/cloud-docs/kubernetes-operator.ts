import Versions from "../versions";

// allVersions and deprecatedVersions must be in order: oldest -> newest
const allVersions = ["v1.28", "v1.29", "v1.30", "v1.31", "v1.32", "v1.33"];
const deprecatedVersions = ["v1.27"];
const namedVersions = new Map<string, string>([]);

const kubernetesOperatorVersions = new Versions(allVersions, deprecatedVersions, namedVersions);

export default kubernetesOperatorVersions;
