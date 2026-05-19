db.movies.find( { year: { $in: [1903, 1909] } },
   { _id: 0, title: 1, year: 1 }
)
