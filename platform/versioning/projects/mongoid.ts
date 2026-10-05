import { defineDocset } from "../define";

export default defineDocset({
	project: "mongoid",
	displayName: "Mongoid",
	prefix: "docs/mongoid",
	search: { categoryTitle: "Mongoid" },
	versions: [
		{ name: "upcoming", noIndexing: true, offlineUrl: "https://www.mongodb.com/docs/offline/mongoid-upcoming.tar.gz" },
		{ name: "current", label: "v9.x (current)", stable: true },
		{ name: "v8.1", active: false, eol: "download" },
	],
});
