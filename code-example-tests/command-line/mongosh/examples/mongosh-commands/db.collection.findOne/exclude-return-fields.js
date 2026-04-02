// :snippet-start: exclude-return-fields
db.movies.findOne(
   { cast: 'Al Pacino' },
   { _id: 0, 'imdb.votes': 0, fullplot: 0 }
)
// :snippet-end: