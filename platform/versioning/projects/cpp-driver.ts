import { defineDocset } from "../define";

export default defineDocset({
	project: "cpp-driver",
	displayName: "C++ Driver",
	prefix: "docs/languages/cpp/cpp-driver",
	search: { categoryTitle: "C++ Driver" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v4.x (current)", stable: true },
		{ name: "v3.x" },
		{ name: "v4.0", active: false },
		{ name: "v3.10", active: false },
	],
});
