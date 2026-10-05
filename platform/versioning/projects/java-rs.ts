import { defineDocset } from "../define";

export default defineDocset({
	project: "java-rs",
	displayName: "Java RS",
	prefix: "docs/languages/java/reactive-streams-driver",
	search: { categoryTitle: "Java RS Driver" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v5.x (current)", stable: true },
		{ name: "v5.5", active: false },
		{ name: "v5.4", active: false },
		{ name: "v5.3", active: false },
		{ name: "v5.2", active: false },
		{ name: "v5.1", active: false },
		{ name: "v5.0", active: false },
		{ name: "v4.x", active: false, eol: "download" },
	],
});
