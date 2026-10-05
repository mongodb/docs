import { defineDocset } from "../define";

export default defineDocset({
	project: "kotlin-sync",
	displayName: "Kotlin Sync Driver",
	prefix: "docs/languages/kotlin/kotlin-sync-driver",
	search: { categoryTitle: "Kotlin Sync Driver" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v5.x (current)", stable: true },
		{ name: "v5.5", active: false },
		{ name: "v5.4", active: false },
		{ name: "v5.3", active: false },
		{ name: "v5.2", active: false },
		{ name: "v5.1", active: false },
		{ name: "v5.0", active: false },
	],
});
