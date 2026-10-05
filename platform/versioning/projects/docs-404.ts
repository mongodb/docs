import { defineDocset } from "../define";

export default defineDocset({
	project: "docs-404",
	displayName: "docs-404",
	prefix: "docs/404",
	internalOnly: true,
	versions: [
		{ name: "main", label: "master", offlineUrl: "https://www.mongodb.com/docs/offline/docs-404-main.tar.gz" },
	],
});
