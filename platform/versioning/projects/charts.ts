import { defineDocset } from "../define";

export default defineDocset({
	project: "charts",
	displayName: "MongoDB Charts",
	prefix: "docs/charts",
	search: { categoryTitle: "Atlas Charts" },
	versions: [
		{ name: "main", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/charts-main.tar.gz" },
	],
});
