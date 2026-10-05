import { defineDocset } from "../define";

export default defineDocset({
	project: "atlas-operator",
	displayName: "MongoDB Atlas Kubernetes Operator",
	prefix: "docs/atlas/operator",
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v2.17 (current)", stable: true },
		{ name: "v2.16" },
		{ name: "v2.15" },
		{ name: "v2.14" },
		{ name: "v2.13" },
		{ name: "v2.12" },
		{ name: "v2.11" },
		{ name: "v2.10", active: false, eol: "download" },
		{ name: "v2.9", active: false, eol: "download" },
		{ name: "v2.8", active: false, eol: "download" },
		{ name: "v2.7", active: false, eol: "download" },
		{ name: "v2.6", active: false, eol: "download" },
		{ name: "v2.5", active: false, eol: "download" },
		{ name: "v2.4", active: false, eol: "download" },
		{ name: "v2.3", active: false, eol: "download" },
		{ name: "v2.2", active: false, eol: "download" },
		{ name: "v2.1", active: false, eol: "download" },
		{ name: "v2.0", active: false, eol: "download" },
		{ name: "v1.9", active: false, eol: "download" },
	],
});
