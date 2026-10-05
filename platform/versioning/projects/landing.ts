import { defineDocset } from "../define";

export default defineDocset({
	project: "landing",
	displayName: "MongoDB Documentation",
	prefix: "docs",
	versions: [
		{ name: "main", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/landing-main.tar.gz" },
	],
});
