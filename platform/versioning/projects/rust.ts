import { defineDocset } from "../define";

export default defineDocset({
	project: "rust",
	displayName: "Rust Driver",
	prefix: "docs/drivers/rust",
	search: { categoryTitle: "Rust Driver" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v3.x (current)", stable: true },
		{ name: "v2.x" },
		{ name: "v3.4", active: false },
		{ name: "v3.3", active: false },
		{ name: "v3.2", active: false },
		{ name: "v3.1", active: false },
		{ name: "v3.0", active: false },
		{ name: "v2.8", active: false },
		{ name: "v2.7", active: false },
	],
});
