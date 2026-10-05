import { defineDocset } from "../define";

export default defineDocset({
	project: "atlas-app-services",
	displayName: "Atlas App Services",
	prefix: "docs/atlas/app-services",
	versions: [
		{ name: "main", label: "Current", active: false, stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/atlas-app-services-master.tar.gz" },
	],
});
