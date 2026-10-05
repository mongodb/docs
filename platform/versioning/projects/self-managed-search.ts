import { defineDocset } from "../define";

export default defineDocset({
	project: "self-managed-search",
	displayName: "Self-Managed MongoDB Search and Vector Search",
	prefix: "docs/search/self-managed",
	search: { categoryTitle: "Self-Managed MongoDB Search and Vector Search" },
	versions: [
		{ name: "current", label: "v1.x (current)", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/self-managed-search-current.tar.gz" },
		{ name: "upcoming", active: false, noIndexing: true },
	],
});
