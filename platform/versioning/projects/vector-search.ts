import { defineDocset } from "../define";

export default defineDocset({
	project: "vector-search",
	displayName: "MongoDB Vector Search",
	prefix: "docs/vector-search",
	search: { categoryTitle: "MongoDB Vector Search" },
	versions: [
		{ name: "main", label: "latest stable", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/vector-search.tar.gz" },
	],
});
