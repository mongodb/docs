import { defineDocset } from "../define";

export default defineDocset({
	project: "meta",
	displayName: "MongoDB Meta Documentation",
	prefix: "docs/meta",
	internalOnly: true,
	versions: [
		{ name: "main", offlineUrl: "https://www.mongodb.com/docs/offline/meta-main.tar.gz" },
	],
});
