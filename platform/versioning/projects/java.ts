import { defineDocset } from "../define";

export default defineDocset({
	project: "java",
	displayName: "Java Sync Driver",
	prefix: "docs/drivers/java/sync",
	search: { categoryTitle: "Java Sync Driver" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v5.x (current)", stable: true },
		{ name: "v5.5", active: false },
		{ name: "v5.4", active: false },
		{ name: "v5.3", active: false },
		{ name: "v5.2", active: false },
		{ name: "v5.1", active: false },
		{ name: "v5.0", active: false },
		{ name: "v4.11", active: false, eol: "download" },
		{ name: "v4.10", active: false, eol: "download" },
		{ name: "v4.9", active: false, eol: "download" },
		{ name: "v4.8", active: false, eol: "download" },
		{ name: "v4.7", active: false, eol: "download" },
		{ name: "v4.6", active: false, eol: "download" },
		{ name: "v4.5", active: false, eol: "download" },
		{ name: "v4.4", active: false, eol: "download" },
		{ name: "v4.3", active: false, eol: "download" },
	],
});
