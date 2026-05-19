db.movies.find(
   { runtime: { $gt: 1000 },
     $text: { $search: "baseball colorado" } },
   { _id: 0, title: 1, year: 1,
     score: { $meta: "textScore" } }
).sort( { year: 1, score: { $meta: "textScore" } } )
