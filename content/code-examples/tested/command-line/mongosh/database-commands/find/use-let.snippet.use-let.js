db.movies.runCommand( {
   find: db.movies.getName(),
   filter: { $expr: { $eq: [ "$title", "$$targetTitle" ] } },
   let : { targetTitle: "The Godfather" }
} )
