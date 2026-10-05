import { defineDocset } from "../define";

export default defineDocset({
	project: "compass",
	displayName: "MongoDB Compass",
	prefix: "docs/compass",
	search: { categoryTitle: "Compass" },
	versions: [
		{ name: "main", label: "latest stable", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/compass-main.tar.gz" },
	],
});
