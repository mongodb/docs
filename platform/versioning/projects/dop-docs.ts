import { defineDocset } from "../define";

export default defineDocset({
	project: "dop-docs",
	displayName: "dop-docs",
	prefix: "docs/docs-platform",
	internalOnly: true,
	versions: [
		{ name: "main", label: "current", stable: true, offlineUrl: "https://mongodbcom-cdn.staging.corp.mongodb.com/docs-qa/offline/dop-docs-current.tar.gz" },
	],
});
