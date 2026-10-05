import { defineDocset } from "../define";

export default defineDocset({
	project: "laravel",
	displayName: "Laravel MongoDB",
	prefix: "docs/drivers/php/laravel-mongodb",
	search: { categoryTitle: "Laravel Integration" },
	versions: [
		{ name: "upcoming", noIndexing: true, offlineUrl: "https://www.mongodb.com/docs/offline/laravel-upcoming.tar.gz" },
		{ name: "current", label: "v5.x (current)", stable: true },
		{ name: "v4.x", offlineUrl: "https://www.mongodb.com/docs/offline/laravel-v4.x.tar.gz" },
	],
});
