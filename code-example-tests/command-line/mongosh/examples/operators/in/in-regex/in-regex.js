// :snippet-start:in-regex
db.movies.find( 
   { plot: { $in: [ /^Alien/ , /sci-fi/ ] } },
   { _id: 0, title: 1, plot: 1 }
)
// :snippet-end:
