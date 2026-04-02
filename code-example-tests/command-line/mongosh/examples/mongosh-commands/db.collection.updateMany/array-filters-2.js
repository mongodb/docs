db.movies.updateMany(
   { ratingDetails: { $exists: true } },
   { $set: { "ratingDetails.$[elem].weight" : 10 } },
   { arrayFilters: [ { "elem.score": { $gte: 8 } } ] }
)
