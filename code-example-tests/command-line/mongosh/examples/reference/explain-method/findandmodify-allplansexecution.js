// :snippet-start: findandmodify-allplansexecution
db.movies.explain( "allPlansExecution" ).findAndModify( {
   query: { rated: "PG", year: { $gt: 2000 } },
   sort: { year: 1 },
   update: { $inc: { "imdb.votes": 1 } }
} )
// :snippet-end:
.queryPlanner !== undefined  // :remove:
