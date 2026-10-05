import { defineDocset } from "../define";

export default defineDocset({
	project: "entity-framework",
	displayName: "Entity Framework",
	prefix: "docs/entity-framework",
	search: { categoryTitle: "Entity Framework" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v10.0 (current)", stable: true },
		{ name: "v9.1" },
		{ name: "v9.0" },
		{ name: "v8.4" },
		{ name: "v8.3" },
		{ name: "v8.2" },
		{ name: "v8.1" },
		{ name: "v8.0" },
		{ name: "v7.0", active: false, eol: "download" },
	],
});
