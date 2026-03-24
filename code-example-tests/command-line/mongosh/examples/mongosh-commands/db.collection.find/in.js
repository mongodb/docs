// :snippet-start: in-example
db.movies.find( {
   $and: [
      { genres: { $in: [ "News", "Talk-Show" ] } },
      { genres: { $in: [ "History", "Western" ] } }
   ]},
   { title: 1, genres: 1, year: 1 }
)
// :snippet-end: