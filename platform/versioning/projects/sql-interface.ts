import { defineDocset } from "../define";

export default defineDocset({
	project: "sql-interface",
	displayName: "SQL Interface",
	prefix: "docs/sql-interface",
	search: { categoryTitle: "SQL Interface" },
	versions: [
		{ name: "main", stable: true },
	],
});
