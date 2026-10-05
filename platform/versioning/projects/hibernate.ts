import { defineDocset } from "../define";

export default defineDocset({
	project: "hibernate",
	displayName: "MongoDB Extension for Hibernate ORM",
	prefix: "docs/languages/java/mongodb-hibernate",
	search: { categoryTitle: "MongoDB Extension for Hibernate ORM" },
	versions: [
		{ name: "upcoming", label: "Upcoming", offlineUrl: "https://www.mongodb.comdocs/offline/hibernate-Upcoming.tar.gz" },
		{ name: "current", label: "Current", stable: true, offlineUrl: "https://www.mongodb.comdocs/offline/hibernate-Current.tar.gz" },
	],
});
