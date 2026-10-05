import { defineDocset } from "../define";

export default defineDocset({
	project: "atlas-architecture",
	displayName: "Atlas Architecture Center",
	prefix: "docs/atlas/architecture",
	search: { categoryTitle: "Atlas Architecture Center" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v20260520 (current)", stable: true },
		{ name: "v20260330", active: false, eol: "download" },
		{ name: "v20260227", active: false, eol: "download" },
		{ name: "v20260204", active: false, eol: "download" },
		{ name: "v20251125", active: false, eol: "download" },
		{ name: "v20250829", active: false, eol: "download" },
		{ name: "v20250604", active: false, eol: "download" },
		{ name: "v20250317", active: false, eol: "download" },
		{ name: "v20250228", active: false, eol: "download" },
	],
});
