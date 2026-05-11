// :snippet-start: distinct-values
db.movies.aggregate( [ { $group : { _id : "$rated" } } ] )
// :snippet-end:
