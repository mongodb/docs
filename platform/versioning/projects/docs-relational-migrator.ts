import { defineDocset } from "../define";

export default defineDocset({
	project: "docs-relational-migrator",
	displayName: "Relational Migrator",
	prefix: "docs/relational-migrator",
	search: { categoryTitle: "Relational Migrator" },
	versions: [
		{ name: "main", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/docs-relational-migrator-main.tar.gz" },
	],
});
