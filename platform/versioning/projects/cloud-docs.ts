import { defineDocset } from "../define";

export default defineDocset({
	project: "cloud-docs",
	displayName: "MongoDB Atlas",
	prefix: "docs/atlas",
	search: { categoryTitle: "Atlas", categoryName: "atlas" },
	versions: [
		{ name: "main", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/cloud-docs-main.tar.gz" },
	],
});
