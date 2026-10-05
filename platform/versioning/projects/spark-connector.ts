import { defineDocset } from "../define";

export default defineDocset({
	project: "spark-connector",
	displayName: "Spark Connector",
	prefix: "docs/spark-connector",
	search: { categoryTitle: "Spark Connector" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v11.x (current)", stable: true },
		{ name: "v10.x" },
		{ name: "v10.5", active: false },
		{ name: "v10.4", active: false },
		{ name: "v10.3", active: false },
		{ name: "v10.2", active: false, eol: "download" },
		{ name: "v10.1", active: false, eol: "download" },
		{ name: "v10.0", active: false, eol: "download" },
		{ name: "v3.0", active: false, eol: "download" },
		{ name: "v2.4", active: false, eol: "download" },
		{ name: "v2.3", active: false, eol: "download" },
		{ name: "v2.2", active: false, eol: "download" },
		{ name: "v2.1", active: false, eol: "download" },
		{ name: "v2.0", active: false, eol: "download" },
		{ name: "v1.1", active: false, eol: "download" },
	],
});
