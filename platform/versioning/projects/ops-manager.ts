import { defineDocset } from "../define";

export default defineDocset({
	project: "ops-manager",
	displayName: "Ops Manager",
	prefix: "docs/ops-manager",
	search: { categoryTitle: "Ops Manager" },
	versions: [
		{ name: "upcoming", label: "Upcoming", noIndexing: true, offlineUrl: "https://www.mongodb.com/docs/offline/ops-manager-upcoming.tar.gz" },
		{ name: "current", label: "Version 9.0 (current)", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/ops-manager-current.tar.gz" },
		{ name: "v8.0", label: "Version 8.0", offlineUrl: "https://www.mongodb.com/docs/offline/ops-manager-v8.0.tar.gz" },
		{ name: "v7.0", label: "Version 7.0", active: false, eol: "link" },
		{ name: "v6.0", label: "Version 6.0", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/ops-manager-v6.0.tar.gz" },
		{ name: "v1.1", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/mms-docs-v1.1.tar.gz" },
		{ name: "v1.2", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/mms-docs-v1.2.tar.gz" },
		{ name: "v1.3", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/mms-docs-v1.3.tar.gz" },
		{ name: "v1.4", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/mms-docs-v1.4.tar.gz" },
		{ name: "v1.5", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/mms-docs-v1.5.tar.gz" },
		{ name: "v1.6", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/mms-docs-v1.6.tar.gz" },
		{ name: "v1.8", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/mms-docs-v1.8.tar.gz" },
		{ name: "v2.0", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/mms-docs-v2.0.tar.gz" },
		{ name: "v3.4", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/mms-docs-v3.4.tar.gz" },
		{ name: "v3.6", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/mms-docs-v3.6.tar.gz" },
		{ name: "v4.0", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/mms-docs-v4.0.tar.gz" },
		{ name: "v4.2", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/mms-docs-v4.2.tar.gz" },
		{ name: "v4.4", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/mms-docs-v4.4.tar.gz" },
		{ name: "v5.0", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/mms-docs-v5.0.tar.gz" },
	],
});
