import { defineDocset } from "../define";

export default defineDocset({
	project: "search",
	displayName: "MongoDB Search",
	prefix: "docs/search",
	search: { categoryTitle: "Search" },
	versions: [
		{ name: "main", label: "latest stable", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/search-main.tar.gz" },
	],
});
