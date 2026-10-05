import { defineDocset } from "../define";

export default defineDocset({
	project: "cloud-manager",
	displayName: "Cloud Manager",
	prefix: "docs/cloud-manager",
	search: { categoryTitle: "Cloud Manager" },
	versions: [
		{ name: "main", label: "current", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/cloud-manager-main.tar.gz" },
	],
});
