// :snippet-start: gte-update
db.movies.updateMany(
   { "imdb.rating" : { $gte: 9.5 } },
   { $set: { "highestRated": true } }
)
// :snippet-end: 
