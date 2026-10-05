import { defineDocset } from "../define";

export default defineDocset({
	project: "bi-connector",
	displayName: "MongoDB Connector for BI",
	prefix: "docs/bi-connector",
	search: { categoryTitle: "BI Connector" },
	versions: [
		{ name: "current", label: "2.14", active: false, stable: true, eol: "link" },
		{ name: "v2.13", label: "2.13", active: false, eol: "download" },
		{ name: "v2.12", label: "2.12", active: false, eol: "download" },
		{ name: "v2.11", label: "2.11", active: false, eol: "download" },
		{ name: "v2.10", label: "2.10", active: false, eol: "download" },
		{ name: "v2.5", label: "2.5", active: false, eol: "download" },
		{ name: "v2.4", label: "2.4", active: false, eol: "download" },
		{ name: "v2.1", label: "2.1", active: false, eol: "download" },
		{ name: "v2.0", label: "2.0", active: false, eol: "download" },
		{ name: "v2.8", label: "2.8", active: false, eol: "download" },
		{ name: "v2.3", label: "2.3", active: false, eol: "download" },
		{ name: "v2.2", label: "2.2", active: false, eol: "download" },
		{ name: "v2.7", label: "2.7", active: false, eol: "download" },
		{ name: "v2.9", label: "2.9", active: false, eol: "download" },
		{ name: "v2.6", label: "2.6", active: false, eol: "download" },
		{ name: "v1.1", label: "1.1", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/bi-connector-v1.1.tar.gz" },
	],
});
