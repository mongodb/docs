db.movies.explain( "allPlansExecution" ).findAndModify( {
   query: { rated: "PG", year: { $gt: 2000 } },
   sort: { year: 1 },
   update: { $inc: { "imdb.votes": 1 } }
} )
