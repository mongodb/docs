import { defineDocset } from "../define";

export default defineDocset({
	project: "pymongo",
	displayName: "PyMongo",
	prefix: "docs/languages/python/pymongo-driver",
	search: { categoryTitle: "PyMongo Driver" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v4.x (current)", stable: true },
		{ name: "v4.15", active: false },
		{ name: "v4.14", active: false },
		{ name: "v4.13", active: false },
		{ name: "v4.12", active: false },
		{ name: "v4.11", active: false },
		{ name: "v4.10", active: false },
		{ name: "v4.9", active: false },
		{ name: "v4.8", active: false },
		{ name: "v4.7", active: false },
	],
});
