// :snippet-start: limit-movies
db.movies.aggregate([
   { $limit : 5 }
])
// :snippet-end:
