import { defineDocset } from "../define";

export default defineDocset({
	project: "mck",
	displayName: "MongoDB Controllers for Kubernetes",
	prefix: "docs/kubernetes",
	search: { categoryTitle: "MongoDB Controllers for Kubernetes" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v1.13.0 (current)", stable: true },
		{ name: "v1.12", label: "v1.12.0" },
		{ name: "v1.11", label: "v1.11.0" },
		{ name: "v1.10", label: "v1.10.0" },
		{ name: "v1.9", label: "v1.9.0" },
		{ name: "v1.8", label: "v1.8.0" },
		{ name: "v1.7", label: "v1.7.0" },
		{ name: "v1.6", label: "v1.6.0" },
		{ name: "v1.5", label: "v1.5.0" },
		{ name: "v1.4", label: "v1.4.0" },
		{ name: "v1.3", label: "v1.3.0" },
		{ name: "v1.2", label: "v1.2.0" },
		{ name: "v1.1", label: "v1.1.0" },
	],
});
