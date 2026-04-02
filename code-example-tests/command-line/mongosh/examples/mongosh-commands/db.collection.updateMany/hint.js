db.movies.updateMany(
   { "num_mflix_comments": { $lte: 5 }, "rated": "G" }, 
   { $set: { "familyFriendly": true } },
   { hint: { rated: 1 } }
)
