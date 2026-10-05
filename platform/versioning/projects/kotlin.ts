import { defineDocset } from "../define";

export default defineDocset({
	project: "kotlin",
	displayName: "Kotlin Coroutine",
	prefix: "docs/drivers/kotlin/coroutine",
	search: { categoryTitle: "Kotlin Coroutine Driver" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v5.x (current)", stable: true },
		{ name: "v5.5", active: false },
		{ name: "v5.4", active: false },
		{ name: "v5.3", active: false },
		{ name: "v5.2", active: false },
		{ name: "v5.1", active: false },
		{ name: "v5.0", active: false },
		{ name: "v4.11", active: false, eol: "download" },
		{ name: "v4.10", active: false, eol: "download" },
	],
});
