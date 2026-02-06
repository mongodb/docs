db.runCommand( {
   update: "movies",
   updates: [
      { q: { $expr: { $eq: [ "$title", "$$movieTitle" ] } },
         u: [ { $set: { franchise: "$$franchiseName" } } ],
         c: { movieTitle: "The Godfather", franchiseName: "The Godfather Trilogy" } }
      ]
} )
