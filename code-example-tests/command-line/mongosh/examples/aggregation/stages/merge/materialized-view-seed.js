// :snippet-start: add-movie
db.movies.insertOne( {
   title: "Grove Test Movie",
   year: 2016,
   imdb: { rating: 7.5, votes: 500 }
} )
// :snippet-end:
