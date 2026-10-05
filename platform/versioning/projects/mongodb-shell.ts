import { defineDocset } from "../define";

export default defineDocset({
	project: "mongodb-shell",
	displayName: "MongoDB Shell",
	prefix: "docs/mongodb-shell",
	search: { categoryTitle: "MongoDB Shell" },
	versions: [
		{ name: "main", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/mongodb-shell-main.tar.gz" },
	],
});
