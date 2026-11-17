import { defineDocset } from "../define";

export default defineDocset({
	project: "mcp-server",
	displayName: "MCP Server",
	prefix: "docs/mcp-server",
	versions: [
		{ name: "main", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/mcp-server-main.tar.gz" },
	],
});
