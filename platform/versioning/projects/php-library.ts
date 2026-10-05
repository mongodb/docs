import { defineDocset } from "../define";

export default defineDocset({
	project: "php-library",
	displayName: "PHP Library",
	prefix: "docs/php-library",
	search: { categoryTitle: "PHP Library" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v2.x (current)", stable: true, offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v2.x.tar.gz" },
		{ name: "v1.x", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.x.tar.gz" },
		{ name: "v1.17", active: false, eol: "download" },
		{ name: "v1.16", active: false, eol: "download" },
		{ name: "v1.15", label: "Version 1.15", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.15.tar.gz" },
		{ name: "v1.13", label: "Version 1.13", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.13.tar.gz" },
		{ name: "v1.12", label: "Version 1.12", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.12.tar.gz" },
		{ name: "v1.11", label: "Version 1.11", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.11.tar.gz" },
		{ name: "v1.10", label: "Version 1.10", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.10.tar.gz" },
		{ name: "v1.9", label: "Version 1.9", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.9.tar.gz" },
		{ name: "v1.8", label: "Version 1.8", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.8.tar.gz" },
		{ name: "v1.7", label: "Version 1.7", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.7.tar.gz" },
		{ name: "v1.6", label: "Version 1.6", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.6.tar.gz" },
		{ name: "v1.5", label: "Version 1.5", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.5.tar.gz" },
		{ name: "v1.4", label: "Version 1.4", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.4.tar.gz" },
		{ name: "v1.3", label: "Version 1.3", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.3.tar.gz" },
		{ name: "v1.2", label: "Version 1.2", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.2.tar.gz" },
		{ name: "v1.1", label: "Version 1.1", active: false, eol: "download", offlineUrl: "https://www.mongodb.com/docs/offline/php-library-v1.1.tar.gz" },
	],
});
