// :snippet-start: find-no-collation-index
db.movies.find( { title: "Les Misèrables" }, { title: 1 , year: 1 } )
// :snippet-end:
