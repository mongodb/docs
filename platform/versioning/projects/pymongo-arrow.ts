import { defineDocset } from "../define";

export default defineDocset({
	project: "pymongo-arrow",
	displayName: "PyMongo Arrow Driver",
	prefix: "docs/languages/python/pymongo-arrow-driver",
	search: { categoryTitle: "PyMongo Arrow Driver" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v1.x (current)", stable: true },
		{ name: "v1.11", active: false },
		{ name: "v1.10", active: false },
		{ name: "v1.9", active: false },
		{ name: "v1.8", active: false },
		{ name: "v1.7", active: false },
		{ name: "v1.6", active: false },
		{ name: "v1.5", active: false },
		{ name: "v1.4", active: false },
		{ name: "v1.3", active: false },
	],
});
