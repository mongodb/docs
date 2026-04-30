(
  // :snippet-start: ne-update
  db.movies.updateMany(
     { "imdb.rating": { $ne: 9.3 } },
     { $set: { "highestRated": false } }
  )
  // :snippet-end:
  ,
  db.movies.findOne(
     { highestRated: false },
     { _id: 0, highestRated: 1 }
  )
)
