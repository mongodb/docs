import { defineDocset } from "../define";

export default defineDocset({
	project: "cloudgov",
	displayName: "MongoDB Atlas for Government",
	prefix: "docs/atlas/government",
	search: { categoryTitle: "Atlas for Government", categoryName: "AtlasGov" },
	versions: [
		{ name: "main", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/cloudgov-main.tar.gz" },
	],
});
