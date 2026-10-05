import { defineDocset } from "../define";

export default defineDocset({
	project: "scala",
	displayName: "Scala",
	prefix: "docs/languages/scala/scala-driver",
	search: { categoryTitle: "Scala Driver" },
	versions: [
		{ name: "upcoming", noIndexing: true, offlineUrl: "https://www.mongodb.com/docs/offline/scala-upcoming.tar.gz" },
		{ name: "current", label: "v5.x (current)", stable: true },
		{ name: "v5.5", active: false },
		{ name: "v5.4", active: false },
		{ name: "v5.3", active: false },
		{ name: "v5.2", active: false },
		{ name: "v5.1", active: false, eol: "download" },
		{ name: "v5.0", active: false, eol: "download" },
		{ name: "v4.x", active: false, eol: "download" },
	],
});
