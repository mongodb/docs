// :snippet-start: create-collation-compound-index
db.movies.createIndex(
	{ year: 1, metacritic: 1, title: 1 },
	{ collation: { locale: "fr" } }
)
// :snippet-end:

