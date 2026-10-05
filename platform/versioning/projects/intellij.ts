import { defineDocset } from "../define";

export default defineDocset({
	project: "intellij",
	displayName: "MongoDB for IntelliJ Plugin",
	prefix: "docs/mongodb-intellij",
	search: { categoryTitle: "MongoDB for IntelliJ Plugin" },
	versions: [
		{ name: "main", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/intellij-main.tar.gz" },
	],
});
