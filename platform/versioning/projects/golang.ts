import { defineDocset } from "../define";

export default defineDocset({
	project: "golang",
	displayName: "Go Driver",
	prefix: "docs/drivers/go",
	search: { categoryTitle: "Go Driver" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v2.x (current)", stable: true },
		{ name: "v1.x" },
		{ name: "v2.4", active: false },
		{ name: "v2.3", active: false },
		{ name: "v2.2", active: false },
		{ name: "v2.1", active: false },
		{ name: "v2.0", active: false },
		{ name: "v1.17", active: false },
		{ name: "v1.16", active: false },
		{ name: "v1.15", active: false },
		{ name: "v1.14", active: false },
		{ name: "v1.13", active: false },
		{ name: "v1.12", active: false },
		{ name: "v1.11", active: false, eol: "download" },
		{ name: "v1.10", active: false, eol: "download" },
		{ name: "v1.9", active: false, eol: "download" },
		{ name: "v1.8", active: false, eol: "download" },
		{ name: "v1.7", active: false, eol: "download" },
	],
});
