db.movies.updateMany(
   { "imdb.rating" : { $gt: 9.5 } },
   { $set: { "highestRated": true } }
)
