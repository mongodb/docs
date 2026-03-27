db.movies.updateOne(
   { "imdb.rating" : { $gt: 9.5 } },
   { $set: { "highestRated": true } }
)
