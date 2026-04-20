// :snippet-start: find-in-operator
db.movies.find( { rated: { $in: [ "G", "PG-13" ] } } )
// :snippet-end:
.sort({ num_mflix_comments: -1, _id: 1 })
.limit(5)
