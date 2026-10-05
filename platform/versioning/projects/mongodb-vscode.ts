import { defineDocset } from "../define";

export default defineDocset({
	project: "mongodb-vscode",
	displayName: "MongoDB for VS Code",
	prefix: "docs/mongodb-vscode",
	search: { categoryTitle: "VS Code Extension" },
	versions: [
		{ name: "main", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/mongodb-vscode-main.tar.gz" },
	],
});
