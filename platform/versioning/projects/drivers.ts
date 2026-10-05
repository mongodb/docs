import { defineDocset } from "../define";

export default defineDocset({
	project: "drivers",
	displayName: "MongoDB Drivers",
	prefix: "docs/drivers",
	versions: [
		{ name: "main", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/drivers-main.tar.gz" },
	],
});
