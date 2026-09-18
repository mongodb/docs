// :snippet-start: find-compound-tutorial-both-fields
db.movies.find( { title: "The Godfather", metacritic: 100 }, { _id: 0, title: 1 } )
// :snippet-end:
