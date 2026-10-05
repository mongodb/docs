import { defineDocset } from "../define";

export default defineDocset({
	project: "standby-clusters",
	displayName: "Standby Clusters",
	prefix: "docs/standby-clusters",
	internalOnly: true,
	versions: [
		{ name: "main", stable: true, noIndexing: true, offlineUrl: "https://www.mongodb.com/docs/offline/standby-clusters-main.tar.gz" },
	],
});
