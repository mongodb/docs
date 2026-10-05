import { defineDocset } from "../define";

export default defineDocset({
	project: "agentengine",
	displayName: "MongoDB Atlas Agent Engine",
	prefix: "docs/agentengine",
	search: { categoryTitle: "Atlas Agent Engine" },
	versions: [
		{ name: "main", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/agentengine-main.tar.gz" },
	],
});
