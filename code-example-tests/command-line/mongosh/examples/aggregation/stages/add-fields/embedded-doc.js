// :snippet-start: add-fields-embedded-doc
db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   { $addFields: { "imdb.certified": true } }
] )
// :snippet-end:
