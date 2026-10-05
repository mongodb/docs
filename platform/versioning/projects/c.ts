import { defineDocset } from "../define";

export default defineDocset({
	project: "c",
	displayName: "C Driver",
	prefix: "docs/languages/c/c-driver",
	search: { categoryTitle: "C Driver" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v2.x (current)", stable: true },
		{ name: "v1.x" },
		{ name: "v2.1", active: false },
		{ name: "v2.0", active: false },
		{ name: "v1.29", active: false },
		{ name: "v1.28", active: false },
		{ name: "v1.27", active: false },
		{ name: "v1.26", active: false },
	],
});
