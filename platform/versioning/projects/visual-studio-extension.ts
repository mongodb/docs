import { defineDocset } from "../define";

export default defineDocset({
	project: "visual-studio-extension",
	displayName: "C# Analyzer",
	prefix: "docs/mongodb-analyzer",
	search: { categoryTitle: "C# Analyzer" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v2.x (current)", stable: true },
		{ name: "v1.x" },
		{ name: "v1.4", active: false },
		{ name: "v1.3", active: false, eol: "download" },
		{ name: "v1.2", active: false, eol: "download" },
		{ name: "v1.1", active: false, eol: "download" },
		{ name: "v1.0", active: false, eol: "download" },
	],
});
