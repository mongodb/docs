import { defineDocset } from "../define";

export default defineDocset({
	project: "mongoid-railsmdb",
	displayName: "RailsMDB",
	prefix: "docs/languages/ruby/railsmdb",
	search: { categoryTitle: "RailsMDB" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v1.0", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/mongoid-railsmdb-v1.0.tar.gz" },
	],
});
