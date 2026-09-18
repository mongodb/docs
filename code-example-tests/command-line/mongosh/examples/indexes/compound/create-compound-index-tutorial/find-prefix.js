// :snippet-start: find-compound-tutorial-prefix
db.movies.find( { title: "The Godfather" }, { _id: 0, title: 1 } )
// :snippet-end:
