db.movies.update(
   { num_mflix_comments: { $lte: 10 } },
   { $set: { featured: true } },
   {
      multi: true,
      writeConcern: { w: 2, j: true, wtimeout: 5000 }
   }
)