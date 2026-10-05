import { defineDocset } from "../define";

export default defineDocset({
	project: "django",
	displayName: "Django MongoDB Backend",
	prefix: "docs/languages/python/django-mongodb",
	search: { categoryTitle: "Django MongoDB Backend" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v6.1 (current)", stable: true },
		{ name: "v6.0" },
		{ name: "v5.2" },
		{ name: "v5.1", active: false, eol: "download" },
		{ name: "v5.0", active: false, eol: "download" },
	],
});
