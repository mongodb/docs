import { defineDocset } from "../define";

export default defineDocset({
	project: "database-tools",
	displayName: "MongoDB Database Tools",
	prefix: "docs/database-tools",
	search: { categoryTitle: "Database Tools" },
	versions: [
		{ name: "main", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/database-tools-main.tar.gz" },
	],
});
