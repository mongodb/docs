import { defineDocset } from "../define";

export default defineDocset({
	project: "mongosync",
	displayName: "Mongosync",
	prefix: "docs/mongosync",
	search: { categoryTitle: "Mongosync" },
	versions: [
		{ name: "current", label: "v1.22 (current)", stable: true },
		{ name: "v1.21" },
		{ name: "v1.20" },
		{ name: "v1.19", active: false, eol: "download" },
		{ name: "v1.18", active: false, eol: "download" },
		{ name: "v1.17", active: false, eol: "download" },
		{ name: "v1.16", active: false, eol: "download" },
		{ name: "v1.15", active: false, eol: "download" },
		{ name: "v1.14", active: false, eol: "download" },
		{ name: "v1.13", active: false, eol: "download" },
		{ name: "v1.12", active: false, eol: "download" },
		{ name: "v1.11", active: false, eol: "download" },
		{ name: "v1.10", label: "1.10", active: false, eol: "download" },
		{ name: "v1.9", active: false, eol: "download" },
		{ name: "v1.8", label: "1.8", active: false, eol: "download" },
		{ name: "v1.7", label: "1.7", active: false, eol: "download" },
		{ name: "v0.9", label: "0.9 (Legacy)", active: false, eol: "download" },
	],
});
